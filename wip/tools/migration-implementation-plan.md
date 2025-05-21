# Intent Trader State Files Migration Implementation Plan

## 1. Current State Files Analysis

After examining the provided state files, I can see the current structure and the necessary transformations to migrate them to the canonical schema v0.5.2.

### 1.1 trade-plan-state.json

**Current Structure:**
- Wrapped in a `tradePlan` object
- Contains sections: marketFramework, levelFramework, tradeIdeas, scenarioPlanning, riskManagement
- tradeIdeas divided into primary, secondary, and watchlist
- Classifications are subjective text descriptions

**Key Migration Needs:**
- Flatten the structure by removing the outer `tradePlan` wrapper
- Add required base fields (schemaVersion, id, source, timestamp) to all objects
- Transform classifications into boolean flags
- Consolidate tradeIdeas into a single array with category property
- Create proper nesting with clear object boundaries

### 1.2 my-positions.json

**Current Structure:**
- Contains a `positions` array with position objects
- Each position has id, symbol, direction, entry, risk, targets, size, etc.
- Complex option symbols like "SPX 22-May-25 5870P"
- Status values: "active", "closed", etc.

**Key Migration Needs:**
- Move from array in `positions` to top-level array
- Add required base fields to each position
- Extract base symbols from complex option symbols
- Transform entry details into canonical format
- Convert statuses to canonical enum values ("active" → "open")
- Extract classifications from trade_type and notes

### 1.3 moderator-positions.json (Additional Source)

**Current Structure:**
- Array of position objects with simplified fields
- Contains fields not in my-positions.json (entry_type, contracts, owner)
- Different status handling
- Position times in notes field

**Key Migration Needs:**
- Understand how to integrate or reference moderator positions
- Extract classification data from entry_type field
- Determine if this is reference material or needs conversion

### 1.4 session-manifest.json (Additional Context)

**Current Structure:**
- Session metadata with information about the current trading session
- Contains plan info, position counts, active plugins
- Runtime and phase information

**Key Migration Needs:**
- Consider using this for conversation-context.json creation
- Extract active plan and session information
- Understand plugin registry for conversation context

## 2. Canonical Schema Requirements

Based on the intent-trader-master-schema.json, all objects must:

1. Include the **baseObject** fields:
   - schemaVersion: "0.5.2"
   - id: Unique identifier following pattern
   - source: System origin
   - timestamp: ISO 8601 format

2. Follow the **nested structure limit** (max 3 levels)

3. Use **boolean classification flags** instead of text descriptions:
   - isBreakout, isReversal, isFlagPattern, etc.

4. Standardize **field naming conventions**:
   - Consistent camelCase for all properties
   - Avoid abbreviations and ambiguous names

## 3. Implementation Plan

### 3.1 trade-plan-state.json Migration

1. **Create Base Structure:**
   ```javascript
   const canonicalPlan = {
     schemaVersion: "0.5.2",
     id: `plan-${legacyPlan.date.replace(/-/g, "")}`,
     source: "system",
     timestamp: legacyPlan.timestamp || new Date().toISOString(),
     date: legacyPlan.date,
     // ... other fields to be migrated
   };
   ```

2. **Transform Market Framework:**
   - Create base object structure for marketFramework
   - Map bias, biasCondition, mode, etc. directly
   - Transform catalysts and keyMovers to array format if needed

3. **Transform Level Framework:**
   - Create base object structure for levelFramework
   - Transform price levels for indices into canonical format
   - Convert stock levels to array format
   - Standardize strength values ("High" → "strong")

4. **Consolidate Trade Ideas:**
   - Create a single array for all trade ideas
   - Add `category` property based on source array
   - Add `priority` based on category (primary=1, secondary=2, watchlist=3)
   - Extract classification flags from tradeType and technicalContext
   - Create conviction objects with level and phrases
   - Map entry and exit parameters to canonical structure

5. **Transform Scenario Planning:**
   - Convert to array format
   - Map scenario details to canonical structure
   - Extract type and targets

6. **Transform Risk Management:**
   - Map risk parameters to canonical structure
   - Calculate values like accountSize if missing

### 3.2 my-positions.json Migration

1. **Extract Positions Array:**
   - Transform from `positions` property to top-level array

2. **Process Each Position:**
   - Add required base fields
   - Extract base symbol from complex option symbols
   - Map entry details to canonical structure
   - Convert status values ("active" → "open")
   - Extract shares/contracts from size object
   - Create classification flags based on trade_type and notes
   - Set conviction level based on notes or default to medium

3. **Handle Special Fields:**
   - Map risk.stop to stop
   - Handle history in notes or discard if not needed
   - Set exit fields to null for active positions

### 3.3 transaction-log.json Migration (Creating if needed)

1. **Initialize Structure:**
   - If file exists, load and transform
   - If not, create minimal structure based on position history

2. **Transform Each Transaction:**
   - Add required base fields
   - Map transaction details to canonical format
   - Link to positions by ID where applicable

### 3.4 conversation-context.json Creation

1. **Initialize Base Structure:**
   ```javascript
   const conversationContext = {
     schemaVersion: "0.5.2",
     id: `context-${new Date().toISOString().split('T')[0].replace(/-/g, "")}`,
     source: "system",
     timestamp: new Date().toISOString(),
     // ... other fields
   };
   ```

2. **Extract Current Context:**
   - Set activePlan from session-manifest
   - Initialize empty arrays for focusedSymbols, recentCommands, intentHistory
   - Set systemState based on currentPhase in session-manifest

## 4. Implementation Details

### 4.1 Extension of migration-utilities.js

```javascript
/**
 * Migrate transaction-log.json to canonical tradeLog schema
 * @param {string} inputPath - Path to input file
 * @param {string} outputPath - Path to output file
 * @returns {boolean} - Success status
 */
function migrateTransactionLog(inputPath, outputPath) {
  console.log(`Migrating transaction log from ${inputPath} to ${outputPath}`);
  
  try {
    // Create backup if file exists
    let backupPath;
    if (fs.existsSync(inputPath)) {
      backupPath = backupFile(inputPath);
      
      // Read input file
      const logData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
      
      // Transform to canonical format
      const canonicalLog = transformTransactionLog(logData);
      
      // Validate
      // Write output
    } else {
      // Create new transaction log based on position history
      const positionsData = JSON.parse(fs.readFileSync('./my-positions.json', 'utf8'));
      const canonicalLog = createTransactionLogFromPositions(positionsData.positions);
      
      // Validate
      // Write output
    }
    
    return true;
  } catch (error) {
    log.logError(inputPath, `Migration failed: ${error.message}`);
    console.error(`Error migrating transaction log: ${error.message}`);
    if (backupPath) {
      restoreBackup(backupPath, inputPath);
    }
    return false;
  }
}

/**
 * Create conversation-context.json with initial state
 * @param {string} outputPath - Path to output file
 * @param {Object} sessionManifest - Session manifest data
 * @returns {boolean} - Success status
 */
function createConversationContext(outputPath, sessionManifest) {
  console.log(`Creating conversation context at ${outputPath}`);
  
  try {
    const contextId = `context-${new Date().toISOString().split('T')[0].replace(/-/g, "")}`;
    
    // Create context object
    const conversationContext = {
      schemaVersion: "0.5.2",
      id: contextId,
      source: "system",
      timestamp: new Date().toISOString(),
      activePlan: sessionManifest?.plan?.timestamp ? 
        `plan-${sessionManifest.plan.timestamp.split('T')[0].replace(/-/g, "")}` : null,
      activeSession: sessionManifest?.sessionId ? 
        `session-${sessionManifest.sessionId}` : null,
      focusedSymbols: extractFocusSymbols(sessionManifest),
      recentCommands: [],
      intentHistory: [],
      systemState: mapPhaseToState(sessionManifest?.currentPhase || "ready")
    };
    
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
```

### 4.2 Classification Extraction Enhancement

Improve the existing classification extraction to handle additional patterns:

```javascript
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
```

### 4.3 Handle Complex Option Symbols

Improve symbol handling for options:

```javascript
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
```

## 5. Testing and Validation Plan

### 5.1 Unit Tests

1. **Schema Validation Tests:**
   - Validate each transformed object against canonical schema
   - Test required field presence and format
   - Validate enum values are within allowed options

2. **Classification Tests:**
   - Test extraction of classifications from different sources
   - Verify correct boolean flag setting

3. **Symbol Handling Tests:**
   - Test extraction of base symbols from option symbols
   - Verify correct handling of complex symbols

### 5.2 Integration Tests

1. **End-to-End Migration Tests:**
   - Verify complete migration process works for all files
   - Check data preservation across transformations

2. **Rollback Tests:**
   - Force validation failures to verify rollback works
   - Check file integrity after rollback

3. **Complex Data Tests:**
   - Test with various edge cases (empty arrays, null values)
   - Verify handling of missing optional fields

### 5.3 Manual Verification

1. **Field Inspection:**
   - Compare original and migrated values for key fields
   - Verify nested objects are correctly structured

2. **Log Analysis:**
   - Review transformation logs for expected operations
   - Check warnings and errors for unusual conditions

3. **Visual Verification:**
   - Visually compare original and migrated files
   - Verify structure matches canonical schema visualization

## 6. Migration Execution Plan

### 6.1 Preparation

1. **Setup Environment:**
   - Install required dependencies (ajv, ajv-formats, uuid)
   - Copy schema files to working directory

2. **Backup Current Files:**
   - Create timestamped backups of all state files
   - Save in separate backup directory

### 6.2 Migration Steps

1. **Extend Migration Utilities:**
   - Add transaction log migration function
   - Add conversation context creation function
   - Enhance classification extraction

2. **Execute Migration:**
   - Run migration for trade-plan-state.json
   - Run migration for my-positions.json
   - Run migration for transaction-log.json (or create if needed)
   - Create conversation-context.json

3. **Validate Results:**
   - Validate all migrated files against canonical schema
   - Check for unexpected data loss
   - Review logs for any issues

### 6.3 Post-Migration

1. **Generate Migration Report:**
   - Document all transformations performed
   - Note any issues encountered
   - Provide statistics on converted objects

2. **Update Related Components:**
   - Update any code dependent on old schema structures
   - Alert users to new schema version
   - Document API changes if applicable

## 7. Detailed Conversion Mapping

### 7.1 Trade Plan Field Mapping

| Legacy Path | Canonical Path | Transformation |
|-------------|---------------|----------------|
| tradePlan.date | date | Direct mapping |
| tradePlan.timestamp | timestamp | Direct mapping |
| tradePlan.marketFramework.bias | marketFramework.bias | Direct mapping |
| tradePlan.marketFramework.biasCondition | marketFramework.biasCondition | Direct mapping |
| tradePlan.marketFramework.mode | marketFramework.mode | Direct mapping |
| tradePlan.marketFramework.modeConfidence | marketFramework.modeConfidence | Direct mapping |
| tradePlan.marketFramework.character | marketFramework.character | Direct mapping |
| tradePlan.marketFramework.catalysts | marketFramework.catalysts | Ensure array format |
| tradePlan.levelFramework.indices.*.support[].level | levelFramework.indices.*.support[].price | Property rename |
| tradePlan.levelFramework.indices.*.support[].type | levelFramework.indices.*.support[].type | Lowercase conversion |
| tradePlan.levelFramework.indices.*.support[].consensus | levelFramework.indices.*.support[].strength | Map: High→strong, Medium→moderate, Low→weak |
| tradePlan.tradeIdeas.primary[].ticker | tradeIdeas[].symbol | Property rename + category="primary" |
| tradePlan.tradeIdeas.primary[].conviction | tradeIdeas[].conviction.level | Convert to object with level property |
| tradePlan.tradeIdeas.primary[].tradeType | tradeIdeas[].tradeDuration | Map values to canonical duration |
| tradePlan.tradeIdeas.primary[].entry | tradeIdeas[].entryParameters | Property rename + restructure |
| tradePlan.tradeIdeas.primary[].risk.stop | tradeIdeas[].exitParameters.stopLoss | Property path change |
| tradePlan.tradeIdeas.primary[].targets[0].price | tradeIdeas[].exitParameters.target | Use first target as main target |
| tradePlan.tradeIdeas.primary[].technicalContext | tradeIdeas[].rationale | Property rename |
| tradePlan.tradeIdeas.primary[] | tradeIdeas[].classifications | Extract from text fields |
| tradePlan.scenarioPlanning.primaryScenario | scenarioPlanning[0] | First item in array, high conviction |
| tradePlan.scenarioPlanning.alternativeScenarios[] | scenarioPlanning[1+] | Remaining items in array |
| tradePlan.riskManagement.dailyRiskBudget | riskManagement.dailyRiskAmount | Direct mapping of amount |
| tradePlan.riskManagement.dailyRiskBudget.percent | riskManagement.maxRiskPercent | Direct mapping |
| tradePlan.metadata.accountSize | riskManagement.accountSize | Direct mapping |

### 7.2 Position Field Mapping

| Legacy Path | Canonical Path | Transformation |
|-------------|---------------|----------------|
| positions[].id | id | Direct mapping or generate if missing |
| positions[].symbol | symbol | Extract base symbol from complex symbols |
| positions[].direction | direction | Direct mapping, ensure lowercase |
| positions[].entry.price | entry.price | Direct mapping |
| positions[].entry.time | entry.date | Convert ISO timestamp to date string |
| positions[].size.initial | entry.shares/entry.contracts | Map based on size.unit |
| positions[].size.unit | entry.shares/entry.contracts | Determine which field to populate |
| positions[].risk.stop | stop | Direct mapping |
| positions[].status | status | Map: active→open, closed→closed, etc. |
| positions[].trade_type | classifications.* | Extract boolean flags |
| positions[].notes | notes | Direct mapping |
| N/A | conviction.level | Default to "medium" |
| positions[].trade_type=="swing" | isCorePosition | True if swing trade |
| N/A | isRunner | Default to false |
| positions[].history | N/A | Not directly mapped in canonical schema |
