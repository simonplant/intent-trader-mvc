/**
 * Migration Utilities for Intent Trader Schema
 * 
 * This file contains utilities to migrate the following state files:
 * 1. trade-plan-state.json -> canonical tradePlan schema
 * 2. my-positions.json -> canonical tradePosition schema
 * 
 * Features:
 * - Field mapping from legacy to canonical schema
 * - Validation against canonical schema
 * - Rollback capability
 * - Transformation logging
 * - Idempotent operation
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
 * Checks if boolean flags exist in legacy data structure
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
  
  // Check for day-after-trade in tradeType
  if (source.tradeType === 'day-after-trade') {
    classifications.isDayAfterTrade = true;
  }
  
  // Look for keywords in technical context or notes fields
  const textFields = [
    source.technicalContext,
    source.notes,
    source.management
  ].filter(Boolean).join(' ').toLowerCase();
  
  if (/breakout/.test(textFields)) classifications.isBreakout = true;
  if (/reversal/.test(textFields)) classifications.isReversal = true;
  if (/flag pattern|bull flag|bear flag/.test(textFields)) classifications.isFlagPattern = true;
  if (/failed breakdown/.test(textFields)) classifications.isFailedBreakdown = true;
  if (/earnings/.test(textFields)) classifications.isEarningsPlay = true;
  if (/trend|following trend/.test(textFields)) classifications.isTrendFollow = true;
  if (/range|range bound/.test(textFields)) classifications.isRangePlay = true;
  if (/gap fill|filling gap/.test(textFields)) classifications.isGapFill = true;
  if (/momentum/.test(textFields)) classifications.isMomentumPlay = true;
  
  return classifications;
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
    const planId = generateCanonicalId('plan', legacyPlan.date);
    
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
  if (legacyLevelFramework.indices) {
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
  if (legacyLevelFramework.stocks) {
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
  if (legacyTradeIdeas.primary) {
    legacyTradeIdeas.primary.forEach((idea, index) => {
      const ideaId = generateCanonicalId('idea', `${parentId}-${idea.ticker}`, `${index + 1}`);
      
      canonicalIdeas.push(migrateTradeIdea(idea, ideaId, 'primary', 'high'));
    });
  }
  
  // Process secondary ideas
  if (legacyTradeIdeas.secondary) {
    legacyTradeIdeas.secondary.forEach((idea, index) => {
      const ideaId = generateCanonicalId('idea', `${parentId}-${idea.ticker}`, `${index + 1}`);
      
      canonicalIdeas.push(migrateTradeIdea(idea, ideaId, 'secondary', 'medium'));
    });
  }
  
  // Process watchlist ideas
  if (legacyTradeIdeas.watchlist) {
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
  if (legacyScenarios.primaryScenario) {
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
  if (legacyScenarios.alternativeScenarios) {
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
    generateCanonicalId('pos', `${legacyPosition.symbol}-${new Date().toISOString().split('T')[0]}`);
  
  // Extract symbol from complex option symbols
  let symbol = legacyPosition.symbol;
  // Handle option symbols like "SPX 22-May-25 5870P"
  if (symbol.includes(' ')) {
    symbol = symbol.split(' ')[0];
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
      shares: legacyPosition.size?.unit === 'shares' ? legacyPosition.size.initial : null,
      contracts: legacyPosition.size?.unit === 'contracts' ? legacyPosition.size.initial : null
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
    classifications: {
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
    },
    isRunner: false,
    isCorePosition: legacyPosition.trade_type === 'swing' || false
  };
  
  // Extract trade type classification
  if (legacyPosition.trade_type) {
    if (legacyPosition.trade_type === 'day') {
      canonicalPosition.classifications.isRangePlay = true;
    } else if (legacyPosition.trade_type === 'swing') {
      canonicalPosition.classifications.isTrendFollow = true;
    }
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
 * Main migration function that runs both migrations
 * @param {Object} options - Migration options
 * @returns {boolean} - Overall success status
 */
function runMigration(options = {}) {
  const tradePlanInputPath = options.tradePlanInput || './trade-plan-state.json';
  const tradePlanOutputPath = options.tradePlanOutput || './trade-plan-state.canonical.json';
  const positionsInputPath = options.positionsInput || './my-positions.json';
  const positionsOutputPath = options.positionsOutput || './my-positions.canonical.json';
  const logPath = options.logPath || './migration.log.json';
  
  console.log('Starting schema migration...');
  
  let tradePlanSuccess = true;
  let positionsSuccess = true;
  
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
  
  // Write log
  log.printSummary();
  log.writeToFile(logPath);
  
  return tradePlanSuccess && positionsSuccess;
}

// If this script is run directly (not imported)
if (require.main === module) {
  const options = {
    tradePlanInput: process.argv[2] || './trade-plan-state.json',
    tradePlanOutput: process.argv[3] || './trade-plan-state.canonical.json',
    positionsInput: process.argv[4] || './my-positions.json',
    positionsOutputPath: process.argv[5] || './my-positions.canonical.json',
    logPath: process.argv[6] || './migration.log.json'
  };
  
  const success = runMigration(options);
  process.exit(success ? 0 : 1);
}

module.exports = {
  migrateTradePlan,
  migratePositions,
  runMigration
};
