/**
 * Enhanced Migration Utilities for Intent Trader Schema v0.5.2
 * 
 * This file extends the existing migration utilities to handle all required state files:
 * 1. trade-plan-state.json -> canonical tradePlan schema
 * 2. my-positions.json -> canonical tradePosition schema
 * 3. transaction-log.json -> canonical tradeLog schema 
 * 4. conversation-context.json -> new file with conversationContext schema
 * 
 * Features:
 * - Field mapping from legacy to canonical schema
 * - Validation against canonical schema
 * - Rollback capability
 * - Transformation logging
 * - Classification extraction from text
 * - Complex option symbol handling
 */

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Load schemas
const CANONICAL_SCHEMA_PATH = './intent-trader-master-schema.json';
const canonicalSchema = JSON.parse(fs.readFileSync(CANONICAL_SCHEMA_PATH, 'utf8'));

// Initialize validator
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validateTradePlan = ajv.compile(canonicalSchema.definitions.tradePlan);
const validateTradePosition = ajv.compile(canonicalSchema.definitions.tradePosition);
const validateConversationContext = ajv.compile(canonicalSchema.definitions.conversationContext);

// Logging utility
const log = {
  transformations: [],
  errors: [],
  warnings: [],
  
  logTransformation(sourceFile, sourceField, targetField, description) {
    this.transformations.push({
      timestamp: new Date().toISOString(),
      sourceFile,
      sourceField,
      targetField,
      description
    });
  },
  
  logError(sourceFile, error) {
    this.errors.push({
      timestamp: new Date().toISOString(),
      sourceFile,
      error
    });
  },
  
  logWarning(sourceFile, warning) {
    this.warnings.push({
      timestamp: new Date().toISOString(),
      sourceFile,
      warning
    });
  },
  
  printSummary() {
    console.log(`Migration Summary:
- ${this.transformations.length} transformations
- ${this.errors.length} errors
- ${this.warnings.length} warnings`);
    
    if (this.errors.length > 0) {
      console.log('\nErrors:');
      this.errors.forEach(err => console.log(`- ${err.sourceFile}: ${err.error}`));
    }
    
    if (this.warnings.length > 0) {
      console.log('\nWarnings:');
      this.warnings.forEach(warn => console.log(`- ${warn.sourceFile}: ${warn.warning}`));
    }
  },
  
  writeToFile(logFilePath) {
    const logData = {
      timestamp: new Date().toISOString(),
      transformations: this.transformations,
      errors: this.errors,
      warnings: this.warnings
    };
    
    fs.writeFileSync(logFilePath, JSON.stringify(logData, null, 2));
    console.log(`Log written to ${logFilePath}`);
  }
};

/**
 * Backup a file before migration
 * @param {string} filePath - Path to the file to backup
 * @returns {string} - Path to the backup file
 */
function backupFile(filePath) {
  const backupPath = `${filePath}.bak.${Date.now()}`;
  fs.copyFileSync(filePath, backupPath);
  console.log(`Backup created at ${backupPath}`);
  return backupPath;
}

/**
 * Restore a file from backup
 * @param {string} backupPath - Path to the backup file
 * @param {string} originalPath - Path to restore to
 */
function restoreBackup(backupPath, originalPath) {
  fs.copyFileSync(backupPath, originalPath);
  console.log(`Restored from backup ${backupPath} to ${originalPath}`);
}

/**
 * Generate a canonical ID based on type and unique identifier
 * @param {string} type - Type prefix (e.g., 'plan', 'pos')
 * @param {string} identifier - Unique identifier (e.g., date, symbol)
 * @param {string} [sequence] - Optional sequence number
 * @returns {string} - Canonical ID
 */
function generateCanonicalId(type, identifier, sequence = '') {
  // Clean identifier to ensure it follows pattern
  const cleanIdentifier = identifier.replace(/[^a-zA-Z0-9-]/g, '-');
  
  if (sequence) {
    return `${type}-${cleanIdentifier}-${sequence}`;
  }
  return `${type}-${cleanIdentifier}`;
}

/**
 * Create a base object that all schema objects inherit from
 * @param {string} source - Source system
 * @param {string} id - Unique identifier
 * @returns {Object} - Base object with required fields
 */
function createBaseObject(source, id) {
  return {
    schemaVersion: "0.5.2",
    id: id,
    source: source,
    timestamp: new Date().toISOString(),
    origin: {
      sourceCommand: "/migrate-schema",
      createdBy: "schema-migrator"
    }
  };
}

/**
 * Enhanced classification extraction
 * @param {Object} source - Source object with potential classification text
 * @returns {Object} - Classifications object with boolean flags
 */
function extractClassifications(source) {
  const classifications = {
    isBreakout: false,
    isReversal: false,
    isFlagPattern: false,
    isFailedBreakdown: false,
    isEarningsPlay: false,
    isDayAfterTrade: false,
    isTrendFollow: false,
    isRangePlay: false,
    isGapFill: false,
    isMomentumPlay: false
  };
  
  // Check for trade types
  if (source.tradeType === 'day-after-trade') {
    classifications.isDayAfterTrade = true;
  } else if (source.tradeType === 'swing') {
    classifications.isTrendFollow = true;
  } else if (source.tradeType === 'day') {
    classifications.isRangePlay = true;
  } else if (source.tradeType === 'pullback') {
    classifications.isReversal = true;
  } else if (source.trade_type === 'swing') {
    classifications.isTrendFollow = true;
  } else if (source.trade_type === 'day') {
    classifications.isRangePlay = true;
  }
  
  // Check entry_type for moderator positions
  if (source.entry_type === 'call' || source.entry_type === 'put') {
    classifications.isMomentumPlay = true;
  }
  
  // Extract from all text fields
  const textFields = [
    source.technicalContext,
    source.notes,
    source.management,
    source.entry?.condition
  ].filter(Boolean).join(' ').toLowerCase();
  
  // Expanded pattern matching
  if (/breakout|breaking out|breaks? (above|below)|breaking (above|below)/.test(textFields)) classifications.isBreakout = true;
  if (/reversal|reversed|reversing|pullback|retracement/.test(textFields)) classifications.isReversal = true;
  if (/flag pattern|bull flag|bear flag|pennant/.test(textFields)) classifications.isFlagPattern = true;
  if (/failed breakdown|failed break|false breakdown/.test(textFields)) classifications.isFailedBreakdown = true;
  if (/earnings|er |after earnings|pre-earnings|post-earnings/.test(textFields)) classifications.isEarningsPlay = true;
  if (/day-after|day after|dat /.test(textFields)) classifications.isDayAfterTrade = true;
  if (/trend|following trend|uptrend|downtrend|trending/.test(textFields)) classifications.isTrendFollow = true;
  if (/range|range bound|consolidation|between support and resistance/.test(textFields)) classifications.isRangePlay = true;
  if (/gap fill|filling gap|fill the gap|gap down|gap up/.test(textFields)) classifications.isGapFill = true;
  if (/momentum|moving fast|continuation|strong move/.test(textFields)) classifications.isMomentumPlay = true;
  
  return classifications;
}

/**
 * Extract base symbol from complex option symbol
 * @param {string} complexSymbol - Complex option symbol
 * @returns {string} - Base symbol
 */
function extractBaseSymbol(complexSymbol) {
  // Handle option symbols like "SPX 22-May-25 5870P"
  const parts = complexSymbol.split(' ');
  return parts[0]; // Get the base symbol
}

/**
 * Extract option details from complex symbol
 * @param {string} complexSymbol - Complex option symbol
 * @returns {Object} - Option details
 */
function extractOptionDetails(complexSymbol) {
  const parts = complexSymbol.split(' ');
  if (parts.length === 1) {
    return { type: null, expiry: null, strike: null };
  }
  
  // Extract option type (call/put)
  const lastPart = parts[parts.length - 1];
  const type = lastPart.endsWith('C') || lastPart.endsWith('c') ? 'call' :
               lastPart.endsWith('P') || lastPart.endsWith('p') ? 'put' : null;
  
  // Extract expiry
  const expiry = parts.length > 2 ? parts[1] : null;
  
  // Extract strike
  const strikePart = parts.length > 2 ? parts[2] : parts[1];
  const strike = strikePart.replace(/[Cc]$|[Pp]$/, '');
  
  return { type, expiry, strike };
}

/**
 * Map a conviction string to canonical conviction object
 * @param {string} convictionString - Conviction level as string
 * @returns {Object} - Conviction object
 */
function mapConviction(convictionString) {
  if (!convictionString) {
    return { level: "medium" }; // Default
  }
  
  // Ensure conviction is in allowed values
  const validLevels = ["focus-trade", "high", "medium", "low", "negative"];
  let level = convictionString.toLowerCase();
  
  if (!validLevels.includes(level)) {
    level = "medium"; // Default to medium if not recognized
  }
  
  return {
    level: level,
    phrases: [convictionString] // Store original phrase
  };
}

/**
 * Convert legacy trade duration to canonical format
 * @param {string} legacyType - Legacy trade type
 * @returns {string} - Canonical trade duration
 */
function mapTradeDuration(legacyType) {
  const durationMap = {
    'day': 'day',
    'day-after-trade': 'day',
    'swing': 'swing',
    'options': 'day', // Default options to day
    'pullback': 'swing', // Default pullback to swing
    'scalp': 'cashflow'
  };
  
  return durationMap[legacyType] || 'swing'; // Default to swing
}

/**
 * Map legacy position status to canonical status
 * @param {string} legacyStatus - Legacy status
 * @returns {string} - Canonical status
 */
function mapPositionStatus(legacyStatus) {
  const statusMap = {
    'active': 'open',
    'closed': 'closed',
    'pending': 'open',
    'partial': 'partial'
  };
  
  return statusMap[legacyStatus] || 'open';
}

/**
 * Migrate trade-plan-state.json to canonical tradePlan schema
 * @param {string} inputPath - Path to input file
 * @param {string} outputPath - Path to output file
 * @returns {boolean} - Success status
 */
function migrateTradePlan(inputPath, outputPath) {
  console.log(`Migrating trade plan from ${inputPath} to ${outputPath}`);
  
  try {
    // Create backup
    const backupPath = backupFile(inputPath);
    
    // Read input file
    const tradePlanData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    
    if (!tradePlanData.tradePlan) {
      throw new Error('Invalid trade plan structure: missing tradePlan object');
    }
    
    const legacyPlan = tradePlanData.tradePlan;
    
    // Generate canonical ID
    const planId = generateCanonicalId('plan', legacyPlan.date.replace(/-/g, ''));
    
    // Create base canonical plan
    const canonicalPlan = {
      ...createBaseObject('system', planId),
      date: legacyPlan.date,
      marketFramework: migrateMarketFramework(legacyPlan.marketFramework, planId),
      levelFramework: migrateLevelFramework(legacyPlan.levelFramework, planId),
      tradeIdeas: migrateTradeIdeas(legacyPlan.tradeIdeas, planId),
      scenarioPlanning: migrateScenarios(legacyPlan.scenarioPlanning, planId),
      riskManagement: migrateRiskManagement(legacyPlan.riskManagement, planId),
      metadata: {
        generatedFrom: legacyPlan.metadata?.generatedFrom ? [legacyPlan.metadata.generatedFrom] : [],
        generationTimestamp: legacyPlan.metadata?.generationTimestamp || legacyPlan.timestamp,
        updatedTimestamp: new Date().toISOString()
      }
    };
    
    // Validate the migrated plan
    const isValid = validateTradePlan(canonicalPlan);
    
    if (!isValid) {
      const errors = validateTradePlan.errors;
      log.logError(inputPath, `Validation failed: ${JSON.stringify(errors)}`);
      restoreBackup(backupPath, inputPath);
      return false;
    }
    
    // Write output
    fs.writeFileSync(outputPath, JSON.stringify(canonicalPlan, null, 2));
    log.logTransformation(inputPath, 'tradePlan', 'tradePlan', 'Migrated trade plan to canonical schema');
    
    console.log(`Successfully migrated trade plan to ${outputPath}`);
    return true;
  } catch (error) {
    log.logError(inputPath, `Migration failed: ${error.message}`);
    console.error(`Error migrating trade plan: ${error.message}`);
    return false;
  }
}

/**
 * Migrate market framework to canonical schema
 * @param {Object} legacyMarketFramework - Legacy market framework
 * @param {string} parentId - Parent plan ID
 * @returns {Object} - Canonical market framework
 */
function migrateMarketFramework(legacyMarketFramework, parentId) {
  const frameworkId = generateCanonicalId('framework-market', parentId);
  
  const canonicalFramework = {
    ...createBaseObject('system', frameworkId),
    bias: legacyMarketFramework.bias || 'neutral',
    biasCondition: legacyMarketFramework.biasCondition || '',
    mode: legacyMarketFramework.mode || 'Mode 1',
    modeConfidence: legacyMarketFramework.modeConfidence || 50,
    character: legacyMarketFramework.character || '',
    catalysts: Array.isArray(legacyMarketFramework.catalysts) ? 
      legacyMarketFramework.catalysts : 
      [legacyMarketFramework.catalysts].filter(Boolean),
    keyMovers: []
  };
  
  // Add key movers if available
  if (legacyMarketFramework.keyMovers) {
    canonicalFramework.keyMovers = legacyMarketFramework.keyMovers.map(mover => ({
      ticker: mover.ticker,
      direction: mover.direction || 'up',
      magnitude: mover.magnitude || 'moderate',
      reason: mover.reason || ''
    }));
  }
  
  log.logTransformation(
    'trade-plan-state.json', 
    'marketFramework', 
    'marketFramework', 
    'Migrated market framework to canonical schema'
  );
  
  return canonicalFramework;
}

/**
 * Migrate level framework to canonical schema
 * @param {Object} legacyLevelFramework - Legacy level framework
 * @param {string} parentId - Parent plan ID
 * @returns {Object} - Canonical level framework
 */
function migrateLevelFramework(legacyLevelFramework, parentId) {
  const frameworkId = generateCanonicalId('framework-level', parentId);
  
  const canonicalFramework = {
    ...createBaseObject('system', frameworkId),
    indices: {},
    stocks: [],
    zones: [],
    keyDecisionPoint: null
  };
  
  // Process indices
  if (legacyLevelFramework && legacyLevelFramework.indices) {
    // ES levels
    if (legacyLevelFramework.indices.es) {
      canonicalFramework.indices.es = {
        support: legacyLevelFramework.indices.es.support.map(level => ({
          price: level.level,
          notes: level.notes || '',
          type: level.type?.toLowerCase() || 'major',
          strength: level.consensus?.toLowerCase() === 'high' ? 'strong' : 
                   level.consensus?.toLowerCase() === 'medium' ? 'moderate' : 'weak'
        })),
        resistance: legacyLevelFramework.indices.es.resistance.map(level => ({
          price: level.level,
          notes: level.notes || '',
          type: level.type?.toLowerCase() || 'major',
          strength: level.consensus?.toLowerCase() === 'high' ? 'strong' : 
                   level.consensus?.toLowerCase() === 'medium' ? 'moderate' : 'weak'
        }))
      };
    }
    
    // SPX levels
    if (legacyLevelFramework.indices.spx) {
      canonicalFramework.indices.spx = {
        support: legacyLevelFramework.indices.spx.support.map(level => ({
          price: level.level,
          notes: level.notes || '',
          type: level.type?.toLowerCase() || 'major',
          strength: level.consensus?.toLowerCase() === 'high' ? 'strong' : 
                   level.consensus?.toLowerCase() === 'medium' ? 'moderate' : 'weak'
        })),
        resistance: legacyLevelFramework.indices.spx.resistance.map(level => ({
          price: level.level,
          notes: level.notes || '',
          type: level.type?.toLowerCase() || 'major',
          strength: level.consensus?.toLowerCase() === 'high' ? 'strong' : 
                   level.consensus?.toLowerCase() === 'medium' ? 'moderate' : 'weak'
        }))
      };
    }
  }
  
  // Process stocks
  if (legacyLevelFramework && legacyLevelFramework.stocks) {
    Object.keys(legacyLevelFramework.stocks).forEach(ticker => {
      const stock = legacyLevelFramework.stocks[ticker];
      
      canonicalFramework.stocks.push({
        ticker: ticker,
        levels: {
          support: stock.support.map(level => ({
            price: level.level,
            notes: level.notes || '',
            type: level.type?.toLowerCase() || 'support',
            strength: level.consensus?.toLowerCase() === 'high' ? 'strong' : 
                     level.consensus?.toLowerCase() === 'medium' ? 'moderate' : 'weak'
          })),
          resistance: stock.resistance.map(level => ({
            price: level.level,
            notes: level.notes || '',
            type: level.type?.toLowerCase() || 'resistance',
            strength: level.consensus?.toLowerCase() === 'high' ? 'strong' : 
                     level.consensus?.toLowerCase() === 'medium' ? 'moderate' : 'weak'
          }))
        },
        movingAverages: {
          ma8: stock.movingAverages?.ma8,
          ma21: stock.movingAverages?.ma21
        }
      });
    });
  }
  
  log.logTransformation(
    'trade-plan-state.json', 
    'levelFramework', 
    'levelFramework', 
    'Migrated level framework to canonical schema'
  );
  
  return canonicalFramework;
}

/**
 * Migrate trade ideas to canonical schema
 * @param {Object} legacyTradeIdeas - Legacy trade ideas
 * @param {string} parentId - Parent plan ID
 * @returns {Array} - Array of canonical trade ideas
 */
function migrateTradeIdeas(legacyTradeIdeas, parentId) {
  const canonicalIdeas = [];
  
  // Process primary ideas
  if (legacyTradeIdeas && legacyTradeIdeas.primary) {
    legacyTradeIdeas.primary.forEach((idea, index) => {
      const ideaId = generateCanonicalId('idea', `${parentId}-${idea.ticker}`, `${index + 1}`);
      
      canonicalIdeas.push(migrateTradeIdea(idea, ideaId, 'primary', 'high'));
    });
  }
  
  // Process secondary ideas
  if (legacyTradeIdeas && legacyTradeIdeas.secondary) {
    legacyTradeIdeas.secondary.forEach((idea, index) => {
      const ideaId = generateCanonicalId('idea', `${parentId}-${idea.ticker}`, `${index + 1}`);
      
      canonicalIdeas.push(migrateTradeIdea(idea, ideaId, 'secondary', 'medium'));
    });
  }
  
  // Process watchlist ideas
  if (legacyTradeIdeas && legacyTradeIdeas.watchlist) {
    legacyTradeIdeas.watchlist.forEach((idea, index) => {
      const ideaId = generateCanonicalId('idea', `${parentId}-${idea.ticker}`, `${index + 1}`);
      
      canonicalIdeas.push(migrateTradeIdea(idea, ideaId, 'watchlist', 'low'));
    });
  }
  
  log.logTransformation(
    'trade-plan-state.json', 
    'tradeIdeas', 
    'tradeIdeas', 
    `Migrated ${canonicalIdeas.length} trade ideas to canonical schema`
  );
  
  return canonicalIdeas;
}

/**
 * Migrate a single trade idea to canonical schema
 * @param {Object} legacyIdea - Legacy trade idea
 * @param {string} ideaId - Generated idea ID
 * @param {string} category - Idea category
 * @param {string} defaultConviction - Default conviction level
 * @returns {Object} - Canonical trade idea
 */
function migrateTradeIdea(legacyIdea, ideaId, category, defaultConviction) {
  const canonicalIdea = {
    ...createBaseObject(legacyIdea.source?.toLowerCase() || 'system', ideaId),
    symbol: legacyIdea.ticker,
    direction: legacyIdea.direction.toLowerCase(),
    conviction: mapConviction(legacyIdea.conviction || defaultConviction),
    entryParameters: {
      zone: legacyIdea.entry ? {
        min: legacyIdea.entry.min || null,
        max: legacyIdea.entry.max || null
      } : null,
      condition: legacyIdea.entry?.condition || '',
      strategy: 'limit' // Default
    },
    exitParameters: {
      stopLoss: legacyIdea.risk?.stop || null,
      target: legacyIdea.targets && legacyIdea.targets.length > 0 ? 
        legacyIdea.targets[0].price : null,
      strategy: legacyIdea.management || '',
      trimLevels: []
    },
    rationale: legacyIdea.technicalContext || '',
    tradeDuration: mapTradeDuration(legacyIdea.tradeType),
    setup: legacyIdea.ticker.toLowerCase().includes('spy') || legacyIdea.ticker.toLowerCase().includes('spx') ? 
      'index-trade' : legacyIdea.tradeType || '',
    status: 'active',
    confirmationStatus: 'unconfirmed',
    classifications: extractClassifications(legacyIdea),
    positionSizing: {
      recommendation: legacyIdea.risk?.riskAllocation >= 1 ? 'full' :
                      legacyIdea.risk?.riskAllocation >= 0.75 ? 'half' :
                      legacyIdea.risk?.riskAllocation >= 0.5 ? 'third' :
                      legacyIdea.risk?.riskAllocation >= 0.25 ? 'quarter' : 'small',
      reasoning: ''
    },
    risk: {
      plannedRMultiple: legacyIdea.targets && legacyIdea.targets.length > 0 && legacyIdea.risk?.stopPercent ?
        (legacyIdea.targets[0].percent / legacyIdea.risk.stopPercent) : null
    },
    priority: category === 'primary' ? 1 : category === 'secondary' ? 2 : 3,
    category: category,
    isFavorite: legacyIdea.conviction?.toLowerCase() === 'high' || false
  };
  
  // Add trim levels if available
  if (legacyIdea.targets && legacyIdea.targets.length > 0) {
    canonicalIdea.exitParameters.trimLevels = legacyIdea.targets
      .filter(target => target.price && target.exitSize)
      .map(target => ({
        price: target.price,
        percentage: target.exitSize
      }));
  }
  
  return canonicalIdea;
}

/**
 * Migrate scenarios to canonical schema
 * @param {Object} legacyScenarios - Legacy scenarios
 * @param {string} parentId - Parent plan ID
 * @returns {Array} - Array of canonical scenarios
 */
function migrateScenarios(legacyScenarios, parentId) {
  const canonicalScenarios = [];
  
  // Primary scenario
  if (legacyScenarios && legacyScenarios.primaryScenario) {
    canonicalScenarios.push({
      type: legacyScenarios.primaryScenario.description.toLowerCase().includes('bear') ? 'short' :
            legacyScenarios.primaryScenario.description.toLowerCase().includes('bull') ? 'long' : 'neutral',
      conviction: 'high',
      trigger: legacyScenarios.primaryScenario.trigger || '',
      targets: [], // No targets in primary scenario typically
      stop: null,
      risk_reward: null,
      probability: legacyScenarios.primaryScenario.probability || 50,
      description: legacyScenarios.primaryScenario.description || ''
    });
  }
  
  // Alternative scenarios
  if (legacyScenarios && legacyScenarios.alternativeScenarios) {
    legacyScenarios.alternativeScenarios.forEach(scenario => {
      canonicalScenarios.push({
        type: scenario.name.toLowerCase().includes('bear') ? 'short' :
              scenario.name.toLowerCase().includes('bull') ? 'long' : 'neutral',
        conviction: scenario.probability > 25 ? 'medium' : 'low',
        trigger: scenario.trigger || '',
        targets: [], // No specific targets in scenarios typically
        stop: null,
        risk_reward: null,
        probability: scenario.probability || 25,
        description: scenario.description || ''
      });
    });
  }
  
  log.logTransformation(
    'trade-plan-state.json', 
    'scenarioPlanning', 
    'scenarioPlanning', 
    `Migrated ${canonicalScenarios.length} scenarios to canonical schema`
  );
  
  return canonicalScenarios;
}

/**
 * Migrate risk management to canonical schema
 * @param {Object} legacyRiskManagement - Legacy risk management
 * @param {string} parentId - Parent plan ID
 * @returns {Object} - Canonical risk management
 */
function migrateRiskManagement(legacyRiskManagement, parentId) {
  const canonicalRiskManagement = {
    accountSize: legacyRiskManagement?.dailyRiskBudget?.amount ? 
      (legacyRiskManagement.dailyRiskBudget.amount / legacyRiskManagement.dailyRiskBudget.percent) * 100 : 100000,
    maxRiskPercent: legacyRiskManagement?.dailyRiskBudget?.percent || 1,
    dailyRiskAmount: legacyRiskManagement?.dailyRiskBudget?.amount || 1000,
    positionSizing: '',
    stopPlacement: '',
    trailStrategy: ''
  };
  
  log.logTransformation(
    'trade-plan-state.json', 
    'riskManagement', 
    'riskManagement', 
    'Migrated risk management to canonical schema'
  );
  
  return canonicalRiskManagement;
}

/**
 * Migrate my-positions.json to canonical tradePosition schema
 * @param {string} inputPath - Path to input file
 * @param {string} outputPath - Path to output file
 * @returns {boolean} - Success status
 */
function migratePositions(inputPath, outputPath) {
  console.log(`Migrating positions from ${inputPath} to ${outputPath}`);
  
  try {
    // Create backup
    const backupPath = backupFile(inputPath);
    
    // Read input file
    const positionsData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    
    if (!positionsData.positions || !Array.isArray(positionsData.positions)) {
      throw new Error('Invalid positions structure: missing positions array');
    }
    
    // Migrate each position
    const canonicalPositions = positionsData.positions.map(legacyPosition => {
      return migratePosition(legacyPosition);
    });
    
    // Validate each position
    let validationFailed = false;
    canonicalPositions.forEach((position, index) => {
      const isValid = validateTradePosition(position);
      
      if (!isValid) {
        const errors = validateTradePosition.errors;
        log.logError(inputPath, `Validation failed for position ${index}: ${JSON.stringify(errors)}`);
        validationFailed = true;
      }
    });
    
    if (validationFailed) {
      restoreBackup(backupPath, inputPath);
      return false;
    }
    
    // Write output
    fs.writeFileSync(outputPath, JSON.stringify(canonicalPositions, null, 2));
    log.logTransformation(inputPath, 'positions', 'positions', `Migrated ${canonicalPositions.length} positions to canonical schema`);
    
    console.log(`Successfully migrated positions to ${outputPath}`);
    return true;
  } catch (error) {
    log.logError(inputPath, `Migration failed: ${error.message}`);
    console.error(`Error migrating positions: ${error.message}`);
    return false;
  }
}

/**
 * Migrate a single position to canonical schema
 * @param {Object} legacyPosition - Legacy position
 * @returns {Object} - Canonical position
 */
function migratePosition(legacyPosition) {
  // Extract direction (defaulting to "long")
  const direction = legacyPosition.direction?.toLowerCase() || 'long';
  
  // Generate position ID
  const positionId = legacyPosition.id || 
    generateCanonicalId('pos', `${legacyPosition.symbol}-${new Date().toISOString().split('T')[0].replace(/-/g, '')}`);
  
  // Extract symbol from complex option symbols
  let symbol = legacyPosition.symbol;
  let optionDetails = null;
  
  // Handle option symbols like "SPX 22-May-25 5870P"
  if (symbol.includes(' ')) {
    optionDetails = extractOptionDetails(symbol);
    symbol = extractBaseSymbol(symbol);
  }
  
  // Determine if position has contracts or shares
  let shares = null;
  let contracts = null;
  
  if (legacyPosition.size?.unit === 'shares') {
    shares = legacyPosition.size.initial;
  } else if (legacyPosition.size?.unit === 'contracts') {
    contracts = legacyPosition.size.initial;
  }
  
  // Create canonical position
  const canonicalPosition = {
    ...createBaseObject('manual', positionId),
    symbol: symbol,
    direction: direction,
    entry: {
      price: legacyPosition.entry?.price || 0,
      date: legacyPosition.entry?.time ? 
        new Date(legacyPosition.entry.time).toISOString().split('T')[0] : 
        new Date().toISOString().split('T')[0],
      shares: shares,
      contracts: contracts
    },
    stop: legacyPosition.risk?.stop || null,
    target: null, // Legacy doesn't seem to have a direct target field
    setup: '', // Legacy doesn't have setup information
    status: mapPositionStatus(legacyPosition.status),
    exitDate: null, // Legacy doesn't seem to have exit date
    exitPrice: null, // Legacy doesn't seem to have exit price
    profit: {
      amount: null,
      percent: null,
      rMultiple: null
    },
    notes: legacyPosition.notes || '',
    conviction: {
      level: 'medium' // Default
    },
    classifications: extractClassifications(legacyPosition),
    isRunner: false,
    isCorePosition: legacyPosition.trade_type === 'swing' || false
  };
  
  // Add option details to notes if present
  if (optionDetails && optionDetails.type) {
    const optionStr = `${optionDetails.type === 'call' ? 'Call' : 'Put'} option: ${optionDetails.expiry} ${optionDetails.strike}`;
    canonicalPosition.notes = canonicalPosition.notes ? 
      `${canonicalPosition.notes}; ${optionStr}` : optionStr;
  }
  
  log.logTransformation(
    'my-positions.json', 
    `positions[${legacyPosition.id || legacyPosition.symbol}]`, 
    `tradePosition[${positionId}]`, 
    'Migrated position to canonical schema'
  );
  
  return canonicalPosition;
}

/**
 * Create conversation-context.json with initial state
 * @param {string} outputPath - Path to output file
 * @param {string} [sessionManifestPath] - Optional path to session-manifest.json
 * @returns {boolean} - Success status
 */
function createConversationContext(outputPath, sessionManifestPath) {
  console.log(`Creating conversation context at ${outputPath}`);
  
  try {
    let sessionManifest = null;
    if (sessionManifestPath && fs.existsSync(sessionManifestPath)) {
      sessionManifest = JSON.parse(fs.readFileSync(sessionManifestPath, 'utf8'));
    }
    
    const contextId = `context-${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;
    
    // Create context object
    const conversationContext = {
      schemaVersion: "0.5.2",
      id: contextId,
      source: "system",
      timestamp: new Date().toISOString(),
      activePlan: sessionManifest?.plan?.timestamp ? 
        `plan-${sessionManifest.plan.timestamp.split('T')[0].replace(/-/g, '')}` : null,
      activeSession: sessionManifest?.sessionId ? 
        `session-${sessionManifest.sessionId}` : null,
      focusedSymbols: extractFocusSymbols(sessionManifest),
      recentCommands: [],
      intentHistory: [],
      systemState: mapPhaseToState(sessionManifest?.currentPhase || "ready")
    };
    
    // Validate
    const isValid = validateConversationContext(conversationContext);
    
    if (!isValid) {
      const errors = validateConversationContext.errors;
      log.logError(outputPath, `Validation failed: ${JSON.stringify(errors)}`);
      return false;
    }
    
    // Write output
    fs.writeFileSync(outputPath, JSON.stringify(conversationContext, null, 2));
    log.logTransformation(
      'new-file', 
      'conversation-context.json', 
      'conversationContext', 
      'Created new conversation context file'
    );
    
    console.log(`Successfully created conversation context at ${outputPath}`);
    return true;
  } catch (error) {
    log.logError(outputPath, `Creation failed: ${error.message}`);
    console.error(`Error creating conversation context: ${error.message}`);
    return false;
  }
}

/**
 * Extract focus symbols from session manifest
 * @param {Object} sessionManifest - Session manifest
 * @returns {Array} - Array of symbols
 */
function extractFocusSymbols(sessionManifest) {
  if (!sessionManifest?.plan?.focusIdeas || !Array.isArray(sessionManifest.plan.focusIdeas)) {
    return [];
  }
  
  // Extract symbols from focus ideas
  return sessionManifest.plan.focusIdeas
    .map(idea => {
      // Extract first word as symbol
      const match = idea.match(/^(\w+)/);
      return match ? match[1] : null;
    })
    .filter(Boolean);
}

/**
 * Map session phase to system state
 * @param {string} phase - Session phase
 * @returns {string} - System state
 */
function mapPhaseToState(phase) {
  const phaseMap = {
    'premarket': 'planning',
    'intraday': 'trading',
    'postmarket': 'reviewing',
    'after_hours': 'analyzing'
  };
  
  return phaseMap[phase] || 'ready';
}

/**
 * Create a transaction log from positions if one doesn't exist
 * @param {string} outputPath - Path to output file
 * @param {string} positionsPath - Path to positions file
 * @returns {boolean} - Success status
 */
function createTransactionLog(outputPath, positionsPath) {
  console.log(`Creating transaction log at ${outputPath}`);
  
  try {
    // Read positions
    const positionsData = JSON.parse(fs.readFileSync(positionsPath, 'utf8'));
    
    if (!positionsData.positions || !Array.isArray(positionsData.positions)) {
      throw new Error('Invalid positions structure: missing positions array');
    }
    
    const logId = `log-${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;
    
    // Create transaction log
    const transactionLog = {
      schemaVersion: "0.5.2",
      id: logId,
      source: "system",
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      entries: []
    };
    
    // Add entry transactions from positions
    positionsData.positions.forEach(position => {
      if (position.history && position.history.length > 0) {
        position.history.forEach(historyItem => {
          if (historyItem.action === 'created') {
            transactionLog.entries.push({
          timestamp: position.entry?.time || new Date().toISOString(),
          text: `Entered ${position.symbol} ${position.direction} position at ${position.entry?.price || 'unknown price'}`,
          type: 'trade',
          relatedId: position.id
        });
      }
    });
    
    // Write output
    fs.writeFileSync(outputPath, JSON.stringify(transactionLog, null, 2));
    log.logTransformation(
      'new-file', 
      'transaction-log.json', 
      'transactionLog', 
      'Created new transaction log file'
    );
    
    console.log(`Successfully created transaction log at ${outputPath}`);
    return true;
  } catch (error) {
    log.logError(outputPath, `Creation failed: ${error.message}`);
    console.error(`Error creating transaction log: ${error.message}`);
    return false;
  }
}

/**
 * Main migration function that runs all migrations
 * @param {Object} options - Migration options
 * @returns {boolean} - Overall success status
 */
function runMigration(options = {}) {
  const tradePlanInputPath = options.tradePlanInput || './trade-plan-state.json';
  const tradePlanOutputPath = options.tradePlanOutput || './trade-plan-state.canonical.json';
  const positionsInputPath = options.positionsInput || './my-positions.json';
  const positionsOutputPath = options.positionsOutput || './my-positions.canonical.json';
  const transactionLogOutputPath = options.transactionLogOutput || './transaction-log.canonical.json';
  const sessionManifestPath = options.sessionManifestPath || './session-manifest.json';
  const conversationContextOutputPath = options.conversationContextOutput || './conversation-context.json';
  const logPath = options.logPath || './migration.log.json';
  
  console.log('Starting schema migration...');
  
  let tradePlanSuccess = true;
  let positionsSuccess = true;
  let transactionLogSuccess = true;
  let conversationContextSuccess = true;
  
  // Migrate trade plan
  if (fs.existsSync(tradePlanInputPath)) {
    tradePlanSuccess = migrateTradePlan(tradePlanInputPath, tradePlanOutputPath);
    console.log(`Trade plan migration ${tradePlanSuccess ? 'successful' : 'failed'}`);
  } else {
    log.logWarning('migration', `Trade plan file not found at ${tradePlanInputPath}`);
    console.warn(`Trade plan file not found at ${tradePlanInputPath}`);
    tradePlanSuccess = false;
  }
  
  // Migrate positions
  if (fs.existsSync(positionsInputPath)) {
    positionsSuccess = migratePositions(positionsInputPath, positionsOutputPath);
    console.log(`Positions migration ${positionsSuccess ? 'successful' : 'failed'}`);
  } else {
    log.logWarning('migration', `Positions file not found at ${positionsInputPath}`);
    console.warn(`Positions file not found at ${positionsInputPath}`);
    positionsSuccess = false;
  }
  
  // Create transaction log
  transactionLogSuccess = createTransactionLog(transactionLogOutputPath, positionsInputPath);
  console.log(`Transaction log creation ${transactionLogSuccess ? 'successful' : 'failed'}`);
  
  // Create conversation context
  conversationContextSuccess = createConversationContext(conversationContextOutputPath, sessionManifestPath);
  console.log(`Conversation context creation ${conversationContextSuccess ? 'successful' : 'failed'}`);
  
  // Write log
  log.printSummary();
  log.writeToFile(logPath);
  
  return tradePlanSuccess && positionsSuccess && transactionLogSuccess && conversationContextSuccess;
}

// If this script is run directly (not imported)
if (require.main === module) {
  const options = {
    tradePlanInput: process.argv[2] || './trade-plan-state.json',
    tradePlanOutput: process.argv[3] || './trade-plan-state.canonical.json',
    positionsInput: process.argv[4] || './my-positions.json',
    positionsOutput: process.argv[5] || './my-positions.canonical.json',
    transactionLogOutput: process.argv[6] || './transaction-log.canonical.json',
    sessionManifestPath: process.argv[7] || './session-manifest.json',
    conversationContextOutput: process.argv[8] || './conversation-context.json',
    logPath: process.argv[9] || './migration.log.json'
  };
  
  const success = runMigration(options);
  process.exit(success ? 0 : 1);
}

module.exports = {
  migrateTradePlan,
  migratePositions,
  createTransactionLog,
  createConversationContext,
  runMigration
};    timestamp: historyItem.time || position.entry?.time || new Date().toISOString(),
              text: historyItem.details || `Entered ${position.symbol} ${position.direction} position`,
              type: 'trade',
              relatedId: position.id
            });
          }
        });
      } else {
        // No history, create entry from position data
        transactionLog.entries.push({
          