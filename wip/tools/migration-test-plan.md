# Migration Test Plan

This document outlines a comprehensive test plan for the schema migration utilities, ensuring they correctly transform the `trade-plan-state.json` and `my-positions.json` files to comply with the canonical schema while preserving all data.

## 1. Test Environment Setup

### Prerequisites
- Node.js 14.x or higher
- Required npm packages installed (`ajv`, `ajv-formats`, `uuid`)
- Original state files and canonical schema files
- Test directory structure:
  ```
  tests/
  ├── schemas/
  │   ├── intent-trader-master-schema.json
  │   └── intent-trader-runtime-schema.json
  ├── fixtures/
  │   ├── trade-plan-state.json
  │   ├── my-positions.json
  │   ├── edge-cases/
  │   │   ├── empty-plan.json
  │   │   ├── minimal-positions.json
  │   │   └── invalid-data.json
  ├── expected/
  │   ├── trade-plan-canonical.json
  │   └── positions-canonical.json
  └── output/  # Directory for test outputs
  ```

### Setup Script
```javascript
// setup-test-env.js
const fs = require('fs');
const path = require('path');

// Create test directories
const dirs = [
  'tests/schemas',
  'tests/fixtures',
  'tests/fixtures/edge-cases',
  'tests/expected',
  'tests/output'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Copy schema files and test fixtures
const filesToCopy = [
  { src: './intent-trader-master-schema.json', dest: './tests/schemas/intent-trader-master-schema.json' },
  { src: './intent-trader-runtime-schema.json', dest: './tests/schemas/intent-trader-runtime-schema.json' },
  { src: './trade-plan-state.json', dest: './tests/fixtures/trade-plan-state.json' },
  { src: './my-positions.json', dest: './tests/fixtures/my-positions.json' }
];

filesToCopy.forEach(file => {
  fs.copyFileSync(file.src, file.dest);
});

console.log('Test environment setup complete');
```

## 2. Test Cases

### 2.1 Standard Migration Tests

#### TC-1: Trade Plan Migration - Complete
- **Purpose**: Verify complete migration of trade plan with all sections
- **Input**: `tests/fixtures/trade-plan-state.json`
- **Expected**: Valid canonical trade plan with all data preserved

#### TC-2: Position Migration - Complete
- **Purpose**: Verify complete migration of positions with different types
- **Input**: `tests/fixtures/my-positions.json`
- **Expected**: Valid canonical positions with all data preserved

#### TC-3: End-to-End Migration - Both Files
- **Purpose**: Test complete migration process for both files
- **Input**: Both state files from fixtures
- **Expected**: Both files successfully migrated and validated

### 2.2 Data Preservation Tests

#### TC-4: Trade Ideas Data Preservation
- **Purpose**: Verify all trade ideas and their data are preserved
- **Test Steps**:
  1. Count trade ideas in original file
  2. Migrate trade plan
  3. Count ideas in migrated file
  4. Compare key values (symbols, directions, prices) between original and migrated

#### TC-5: Position Data Preservation
- **Purpose**: Verify all position data is preserved
- **Test Steps**:
  1. Compare entry prices, sizes, and status between original and migrated positions
  2. Verify no data loss during transformation

### 2.3 Edge Case Tests

#### TC-6: Empty/Minimal Trade Plan
- **Purpose**: Test migration with minimal trade plan data
- **Input**: `tests/fixtures/edge-cases/empty-plan.json` (with only required fields)
- **Expected**: Valid canonical plan with defaults for missing fields

#### TC-7: Minimal Positions
- **Purpose**: Test migration with minimal position data
- **Input**: `tests/fixtures/edge-cases/minimal-positions.json`
- **Expected**: Valid canonical positions with defaults for missing fields

#### TC-8: Invalid Data Types
- **Purpose**: Test validation and rollback with invalid data types
- **Input**: `tests/fixtures/edge-cases/invalid-data.json` (containing invalid types)
- **Expected**: Migration failure, validation errors logged, original files preserved

#### TC-9: Complex Option Symbols
- **Purpose**: Test handling of complex option symbols in positions
- **Input**: Modified positions file with complex option symbols
- **Expected**: Proper extraction of base symbols, details preserved in notes

#### TC-10: Missing IDs
- **Purpose**: Test ID generation for records missing IDs
- **Input**: Modified positions file with some missing IDs
- **Expected**: Valid canonical IDs generated following the pattern

### 2.4 Classification Transformation Tests

#### TC-11: Trade Plan Classification Transformation
- **Purpose**: Verify subjective classifications are properly converted to boolean flags
- **Test Steps**:
  1. Create trade plan with various classification texts
  2. Migrate and verify boolean flags are correctly set
  3. Check for proper extraction from description fields

#### TC-12: Position Classification Transformation
- **Purpose**: Verify position classifications are properly extracted
- **Test Steps**:
  1. Create positions with various trade types and notes
  2. Migrate and verify classification flags are correctly set

### 2.5 Validation Tests

#### TC-13: Schema Validation - Trade Plan
- **Purpose**: Verify migrated trade plan validates against canonical schema
- **Test Steps**:
  1. Migrate trade plan
  2. Validate against canonical schema using Ajv
  3. Verify no validation errors

#### TC-14: Schema Validation - Positions
- **Purpose**: Verify migrated positions validate against canonical schema
- **Test Steps**:
  1. Migrate positions
  2. Validate each position against canonical schema
  3. Verify no validation errors

#### TC-15: Field Type Validation
- **Purpose**: Verify field types match schema requirements
- **Test Steps**:
  1. Check all required types (string, number, boolean, etc.)
  2. Verify date formats conform to ISO 8601
  3. Verify enum values are within allowed options

### 2.6 Rollback Tests

#### TC-16: Trade Plan Rollback
- **Purpose**: Verify rollback functionality for trade plan migration
- **Test Steps**:
  1. Force validation failure
  2. Check that original file is restored
  3. Verify file contents match original

#### TC-17: Positions Rollback
- **Purpose**: Verify rollback functionality for positions migration
- **Test Steps**:
  1. Force validation failure
  2. Check that original file is restored
  3. Verify file contents match original

### 2.7 Idempotency Tests

#### TC-18: Trade Plan Idempotency
- **Purpose**: Verify migration can be safely re-run
- **Test Steps**:
  1. Run migration once
  2. Run migration again on already migrated file
  3. Verify no duplication or corruption

#### TC-19: Positions Idempotency
- **Purpose**: Verify positions migration can be safely re-run
- **Test Steps**:
  1. Run migration once
  2. Run migration again on already migrated files
  3. Verify no duplication or corruption

### 2.8 Performance Tests

#### TC-20: Large Trade Plan Performance
- **Purpose**: Test migration performance with large trade plan
- **Input**: Trade plan with 100+ trade ideas
- **Test Steps**:
  1. Measure migration time
  2. Verify memory usage remains reasonable
  3. Check all data is preserved

#### TC-21: Large Positions List Performance
- **Purpose**: Test migration performance with many positions
- **Input**: Positions file with 100+ positions
- **Test Steps**:
  1. Measure migration time
  2. Verify memory usage remains reasonable
  3. Check all data is preserved

## 3. Test Execution Plan

### 3.1 Automated Test Suite

Create an automated test suite using a testing framework (e.g., Jest, Mocha):

```javascript
// test-runner.js
const { migrateTradePlan, migratePositions } = require('../migration-utilities');
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Load schemas
const canonicalSchema = JSON.parse(fs.readFileSync('./tests/schemas/intent-trader-master-schema.json', 'utf8'));

// Initialize validator
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validateTradePlan = ajv.compile(canonicalSchema.definitions.tradePlan);
const validateTradePosition = ajv.compile(canonicalSchema.definitions.tradePosition);

// Test utilities
function compareObjects(original, migrated, keyPaths) {
  const results = { matches: 0, mismatches: [] };
  
  keyPaths.forEach(keyPath => {
    const originalValue = getNestedValue(original, keyPath);
    const migratedValue = getNestedValue(migrated, keyPath);
    
    if (originalValue === migratedValue) {
      results.matches++;
    } else {
      results.mismatches.push({
        keyPath,
        originalValue,
        migratedValue
      });
    }
  });
  
  return results;
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : undefined, obj);
}

// Run tests
async function runTests() {
  console.log('Running migration test suite...');
  
  // TC-1: Trade Plan Migration - Complete
  console.log('\nTC-1: Trade Plan Migration - Complete');
  const tradePlanInput = './tests/fixtures/trade-plan-state.json';
  const tradePlanOutput = './tests/output/trade-plan-canonical.json';
  
  const tradePlanSuccess = migrateTradePlan(tradePlanInput, tradePlanOutput);
  console.log(`Migration success: ${tradePlanSuccess}`);
  
  if (tradePlanSuccess) {
    const migratedPlan = JSON.parse(fs.readFileSync(tradePlanOutput, 'utf8'));
    const isValid = validateTradePlan(migratedPlan);
    console.log(`Validation success: ${isValid}`);
    
    if (!isValid) {
      console.error('Validation errors:', validateTradePlan.errors);
    }
  }
  
  // Additional tests...
}

runTests().catch(console.error);
```

### 3.2 Manual Test Procedure

1. Prepare test files according to test cases
2. Run the migration utilities with various inputs
3. Verify outputs match expected results
4. Check log files for expected transformations

### 3.3 Test Execution Sequence

1. Run setup script to prepare test environment
2. Execute automated test suite
3. Perform manual verification of edge cases
4. Document test results

## 4. Test Data Preparation

### 4.1 Standard Test Data

Use existing production-like data:
- Complete trade plan with multiple sections
- Multiple positions of different types (stocks, options)

### 4.2 Edge Case Test Data

Create the following test fixtures:

1. **Empty Plan**:
```json
{
  "tradePlan": {
    "date": "2025-05-15",
    "timestamp": "2025-05-15T07:45:00Z",
    "marketFramework": {},
    "levelFramework": {},
    "tradeIdeas": {
      "primary": [],
      "secondary": [],
      "watchlist": []
    }
  }
}
```

2. **Minimal Positions**:
```json
{
  "positions": [
    {
      "symbol": "AAPL",
      "direction": "long",
      "entry": {
        "price": 200
      },
      "status": "active"
    }
  ]
}
```

3. **Invalid Data**:
```json
{
  "positions": [
    {
      "symbol": 123,  // Invalid type (should be string)
      "direction": "INVALID_DIRECTION",  // Invalid enum value
      "entry": "not_an_object"  // Invalid type (should be object)
    }
  ]
}
```

### 4.3 Classification Test Data

Create test data with various classification texts:
- Trade plans with subjective descriptions
- Positions with different trade types and notes

## 5. Validation Methodology

### 5.1 Automated Validation

1. **Schema Validation**:
   - Use Ajv to validate against canonical schema
   - Check for type errors, missing required fields, and invalid enum values

2. **Data Preservation Validation**:
   - Compare key values between original and migrated data
   - Count records to ensure none are lost

3. **Classification Validation**:
   - Verify boolean flags match expected values based on input text

### 5.2 Manual Validation

1. **Visual Inspection**:
   - Compare key sections in original and migrated files
   - Verify structure matches canonical schema format

2. **Field Mapping Verification**:
   - Check that fields are mapped to the correct canonical locations
   - Verify transformations are applied correctly

3. **Log Inspection**:
   - Review log files for expected transformations
   - Check for appropriate warnings and errors

## 6. Reporting

### 6.1 Test Result Format

For each test case:
- **Test ID**: (e.g., TC-1)
- **Test Name**: Brief description
- **Status**: Pass/Fail
- **Issues**: Description of any issues encountered
- **Notes**: Additional observations

### 6.2 Test Summary Report

Generate a summary report with:
- Total tests executed
- Pass/fail counts
- Critical issues identified
- Recommendations for resolution

## 7. Acceptance Criteria

The migration utilities are considered successfully implemented when:

1. All test cases pass with no critical issues
2. Both migrated files validate against the canonical schema
3. All data is preserved during migration
4. All field mappings follow the documented transformation rules
5. Edge cases are handled gracefully
6. Rollback functionality works correctly
7. Migration process is idempotent (can be run multiple times safely)

## 8. Test Completion

Upon successful completion of all tests, the migration utilities will be ready for deployment. Final deliverables include:

1. Migration utility code
2. Test results documentation
3. Migration documentation
4. Field mapping document

The test plan ensures that the migration utilities meet all requirements and maintain data integrity during the schema transition.
