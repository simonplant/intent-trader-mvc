# Migration Utilities Documentation

This document provides comprehensive documentation for the Intent Trader schema migration utilities, which convert existing state files to the canonical schema format.

## Overview

The migration utilities transform two key state files in the Intent Trader system:

1. **trade-plan-state.json** → Canonical `tradePlan` schema
2. **my-positions.json** → Canonical `tradePosition` schema

These migration utilities ensure data integrity during the transition while preserving all existing data values and trade content.

## Migration Process

### Prerequisites

The migration utilities require:

- Node.js 14.x or higher
- The following npm packages:
  - `ajv` (for schema validation)
  - `ajv-formats` (for additional format validations)
  - `uuid` (for ID generation)
- Access to both source and canonical schema files

### Installation

1. Install required dependencies:

```bash
npm install ajv ajv-formats uuid
```

2. Place the migration script in your project directory.

### Usage

Run the migration using the following command:

```bash
node migration-utilities.js [tradePlanInput] [tradePlanOutput] [positionsInput] [positionsOutput] [logPath]
```

Parameters:
- `tradePlanInput`: Path to input trade-plan-state.json (default: ./trade-plan-state.json)
- `tradePlanOutput`: Path to output canonical trade plan (default: ./trade-plan-state.canonical.json)
- `positionsInput`: Path to input my-positions.json (default: ./my-positions.json)
- `positionsOutput`: Path to output canonical positions (default: ./my-positions.canonical.json)
- `logPath`: Path to output log file (default: ./migration.log.json)

Example:
```bash
node migration-utilities.js ./data/trade-plan-state.json ./data/trade-plan-canonical.json ./data/my-positions.json ./data/positions-canonical.json ./logs/migration.log.json
```

### Programmatic Usage

You can also use the migration utilities programmatically:

```javascript
const { migrateTradePlan, migratePositions, runMigration } = require('./migration-utilities');

// Migrate individual files
const tradePlanSuccess = migrateTradePlan('./trade-plan-state.json', './trade-plan-canonical.json');
const positionsSuccess = migratePositions('./my-positions.json', './positions-canonical.json');

// Or run complete migration
const options = {
  tradePlanInput: './trade-plan-state.json',
  tradePlanOutput: './trade-plan-canonical.json',
  positionsInput: './my-positions.json',
  positionsOutput: './positions-canonical.json',
  logPath: './migration.log.json'
};

const success = runMigration(options);
```

## Detailed Functionality

### 1. Trade Plan Migration

The `migrateTradePlan` function performs the following operations:

1. **Backup**: Creates a timestamped backup of the original file
2. **Parse**: Reads and parses the legacy trade plan
3. **Transform**: Maps each section to the canonical structure:
   - Generates unique IDs for each object
   - Adds required schema fields
   - Transforms nested structures to comply with 3-level nesting limit
   - Converts subjective classifications into boolean flags
4. **Validate**: Validates the migrated plan against the canonical schema
5. **Save**: Writes the canonical trade plan to the output file
6. **Rollback**: Restores from backup if validation fails

### 2. Positions Migration

The `migratePositions` function performs the following operations:

1. **Backup**: Creates a timestamped backup of the original file
2. **Parse**: Reads and parses the legacy positions
3. **Transform**: Maps each position to the canonical structure:
   - Generates unique IDs (or preserves existing IDs)
   - Adds required schema fields
   - Standardizes entry, stop, and target fields
   - Converts classifications into boolean flags
4. **Validate**: Validates each position against the canonical schema
5. **Save**: Writes the canonical positions to the output file
6. **Rollback**: Restores from backup if validation fails

### 3. Logging and Auditing

The migration utilities include comprehensive logging:

1. **Transformation Logging**: Records each field transformation
2. **Error Logging**: Captures validation errors with details
3. **Warning Logging**: Notes potential issues or missing data
4. **Summary Generation**: Provides an overview of the migration process
5. **Log File Output**: Saves detailed logs to a JSON file

## Key Transformations

### Trade Plan Transformations

1. **Base Object Creation**:
   - Addition of `schemaVersion`, `id`, `source`, and `timestamp`
   - Creation of `origin` object with migration metadata

2. **Market Framework**:
   - Conversion of market bias to canonical enum values
   - Transformation of key movers to structured objects
   - Addition of required fields for market mode and character

3. **Level Framework**:
   - Transformation of price levels to canonical format
   - Conversion of level types and strengths to enum values
   - Structured organization of indices, stocks, and zones

4. **Trade Ideas**:
   - Consolidation of primary, secondary, and watchlist ideas into a single array
   - Creation of structured entry and exit parameters
   - Extraction of classification flags from text fields
   - Conversion of conviction to object with level and phrases

5. **Scenarios**:
   - Transformation of scenario planning to canonical array format
   - Extraction of type, conviction, and probabilities
   - Structured organization of triggers and targets

### Position Transformations

1. **Base Object Creation**:
   - Addition of `schemaVersion`, `id`, `source`, and `timestamp`
   - Creation of `origin` object with migration metadata

2. **Symbol Processing**:
   - Extraction of base symbols from complex option symbols
   - Preservation of option details in notes field

3. **Entry Structuring**:
   - Organization of entry details into a structured object
   - Proper handling of shares vs. contracts
   - Conversion of timestamps to date strings

4. **Classification Extraction**:
   - Conversion of trade types to appropriate classification flags
   - Analysis of notes for additional classification information
   - Default values for missing classifications

5. **Status Mapping**:
   - Conversion of legacy status values to canonical enum values
   - Proper handling of active, closed, and partial positions

## Before and After Examples

### Trade Plan Example

#### Before (Legacy Format):
```json
{
  "tradePlan": {
    "date": "2025-05-15",
    "marketFramework": {
      "bias": "neutral-to-bearish",
      "biasCondition": "below 5926, bullish above"
    },
    "tradeIdeas": {
      "primary": [
        {
          "ticker": "TEM",
          "direction": "long",
          "conviction": "high",
          "tradeType": "swing"
        }
      ]
    }
  }
}
```

#### After (Canonical Format):
```json
{
  "schemaVersion": "0.5.2",
  "id": "plan-20250515",
  "source": "system",
  "timestamp": "2025-05-20T15:30:00Z",
  "date": "2025-05-15",
  "marketFramework": {
    "schemaVersion": "0.5.2",
    "id": "framework-market-plan-20250515",
    "source": "system",
    "timestamp": "2025-05-20T15:30:00Z",
    "bias": "neutral-to-bearish",
    "biasCondition": "below 5926, bullish above",
    "mode": "Mode 1",
    "modeConfidence": 50,
    "character": "",
    "catalysts": [],
    "keyMovers": []
  },
  "tradeIdeas": [
    {
      "schemaVersion": "0.5.2",
      "id": "idea-plan-20250515-TEM-1",
      "source": "system",
      "timestamp": "2025-05-20T15:30:00Z",
      "symbol": "TEM",
      "direction": "long",
      "conviction": {
        "level": "high",
        "phrases": ["high"]
      },
      "tradeDuration": "swing",
      "status": "active",
      "confirmationStatus": "unconfirmed",
      "classifications": {
        "isBreakout": false,
        "isReversal": false,
        "isFlagPattern": false,
        "isFailedBreakdown": false,
        "isEarningsPlay": false,
        "isDayAfterTrade": false,
        "isTrendFollow": true,
        "isRangePlay": false,
        "isGapFill": false,
        "isMomentumPlay": false
      },
      "category": "primary",
      "priority": 1,
      "isFavorite": true
    }
  ]
}
```

### Position Example

#### Before (Legacy Format):
```json
{
  "positions": [
    {
      "id": "SQQQ-20250520-001",
      "symbol": "SQQQ",
      "direction": "long",
      "entry": {
        "price": 23.915,
        "time": "2025-05-20T11:29:00Z"
      },
      "size": {
        "initial": 500,
        "current": 500,
        "unit": "shares"
      },
      "status": "active",
      "trade_type": "swing"
    }
  ]
}
```

#### After (Canonical Format):
```json
[
  {
    "schemaVersion": "0.5.2",
    "id": "SQQQ-20250520-001",
    "source": "manual",
    "timestamp": "2025-05-20T15:30:00Z",
    "symbol": "SQQQ",
    "direction": "long",
    "entry": {
      "price": 23.915,
      "date": "2025-05-20",
      "shares": 500,
      "contracts": null
    },
    "stop": null,
    "target": null,
    "setup": "",
    "status": "open",
    "exitDate": null,
    "exitPrice": null,
    "profit": {
      "amount": null,
      "percent": null,
      "rMultiple": null
    },
    "notes": "",
    "conviction": {
      "level": "medium"
    },
    "classifications": {
      "isBreakout": false,
      "isReversal": false,
      "isFlagPattern": false,
      "isFailedBreakdown": false,
      "isEarningsPlay": false,
      "isDayAfterTrade": false,
      "isTrendFollow": true,
      "isRangePlay": false,
      "isGapFill": false,
      "isMomentumPlay": false
    },
    "isRunner": false,
    "isCorePosition": true
  }
]
```

## Testing and Validation

### Test Cases

1. **Complete Migration Test**:
   - Test with full trade plan and multiple positions
   - Verify all fields are properly mapped
   - Confirm validation against canonical schema passes

2. **Empty/Missing Field Test**:
   - Test with missing optional fields
   - Ensure appropriate defaults are applied
   - Verify required fields are properly generated

3. **Invalid Data Test**:
   - Test with invalid data types
   - Confirm validation errors are properly caught
   - Verify rollback functionality restores original files

4. **Edge Case Test**:
   - Test with empty arrays and objects
   - Test with unusual or unexpected values
   - Verify graceful handling of edge cases

### Validation Methodology

The utilities use a multi-stage validation approach:

1. **Pre-Validation**: Check input files for basic structure
2. **Transformation Validation**: Verify each field conversion
3. **Schema Validation**: Validate against canonical JSON schema
4. **Consistency Validation**: Check for internal consistency

## Troubleshooting

### Common Issues

1. **Schema Validation Errors**:
   - Check log file for specific validation errors
   - Verify input data matches expected format
   - Ensure any custom transformations preserve required fields

2. **Missing Dependencies**:
   - Install required npm packages
   - Check Node.js version (14.x+ required)

3. **Permissions Issues**:
   - Ensure write permissions for output files
   - Check read permissions for input files and schemas

### Recovery Process

If migration fails:

1. Check log file for specific errors
2. Restore from automatic backup if necessary
3. Fix identified issues in input data or code
4. Re-run migration utility

## Conclusion

The migration utilities provide a robust way to transform existing trade-plan-state.json and my-positions.json files to the canonical schema format while preserving all data and ensuring compatibility with the new system architecture. The utilities handle the complex mapping requirements, validation, and provide safeguards against data loss.
