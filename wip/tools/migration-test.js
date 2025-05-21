/**
 * Migration Test Script for Intent Trader Schema Migration
 * 
 * This script tests the migration utilities against the provided test files.
 * It validates that the migration produces schema-compliant outputs and
 * that data is properly preserved during the migration process.
 */

const fs = require('fs');
const path = require('path');
const { 
  migrateTradePlan, 
  migratePositions, 
  createTransactionLog, 
  createConversationContext,
  runMigration 
} = require('./migration-utilities');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Load schema
const canonicalSchema = JSON.parse(fs.readFileSync('./intent-trader-master-schema.json', 'utf8'));

// Initialize validator
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validateTradePlan = ajv.compile(canonicalSchema.definitions.tradePlan);
const validateTradePosition = ajv.compile(canonicalSchema.definitions.tradePosition);
const validateConversationContext = ajv.compile(canonicalSchema.definitions.conversationContext);

// Test configuration
const config = {
  testDir: './test',
  inputDir: './test/input',
  outputDir: './test/output',
  expectedDir: './test/expected',
  logDir: './test/logs',
  inputFiles: {
    tradePlan: 'trade-plan-state.json',
    positions: 'my-positions.json',
    sessionManifest: 'session-manifest.json'
  },
  outputFiles: {
    tradePlan: 'trade-plan-state.canonical.json',
    positions: 'my-positions.canonical.json',
    transactionLog: 'transaction-log.canonical.json',
    conversationContext: 'conversation-context.json'
  },
  logFile: 'migration-test.log.json'
};

// Test results
const testResults = {
  testName: 'Schema Migration Test',
  timestamp: new Date().toISOString(),
  totalTests: 0,
  passed: 0,
  failed: 0,
  tests: []
};

/**
 * Setup test environment
 */
function setupTestEnv() {
  console.log('Setting up test environment...');
  
  // Create test directories
  [config.testDir, config.inputDir, config.outputDir, config.expectedDir, config.logDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // Copy input files to test directory
  fs.copyFileSync(
    `./${config.inputFiles.tradePlan}`, 
    `${config.inputDir}/${config.inputFiles.tradePlan}`
  );
  
  fs.copyFileSync(
    `./${config.inputFiles.positions}`, 
    `${config.inputDir}/${config.inputFiles.positions}`
  );
  
  if (fs.existsSync(`./${config.inputFiles.sessionManifest}`)) {
    fs.copyFileSync(
      `./${config.inputFiles.sessionManifest}`, 
      `${config.inputDir}/${config.inputFiles.sessionManifest}`
    );
  }
  
  console.log('Test environment setup complete');
}

/**
 * Run a single test and record results
 * @param {string} testName - Test name
 * @param {Function} testFn - Test function
 * @param {Array} args - Arguments for test function
 */
function runTest(testName, testFn, args) {
  console.log(`Running test: ${testName}`);
  testResults.totalTests++;
  
  try {
    const result = testFn(...args);
    
    if (result) {
      console.log(`✅ Test passed: ${testName}`);
      testResults.passed++;
      testResults.tests.push({
        name: testName,
        status: 'passed',
        message: 'Test passed successfully'
      });
    } else {
      console.error(`❌ Test failed: ${testName}`);
      testResults.failed++;
      testResults.tests.push({
        name: testName,
        status: 'failed',
        message: 'Test function returned false'
      });
    }
  } catch (error) {
    console.error(`❌ Test failed with error: ${testName}`);
    console.error(error);
    testResults.failed++;
    testResults.tests.push({
      name: testName,
      status: 'failed',
      message: `Test threw an error: ${error.message}`,
      error: error.stack
    });
  }
}

/**
 * Test if file exists
 * @param {string} filePath - Path to check
 * @returns {boolean} - Whether file exists
 */
function testFileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Test if file validates against schema
 * @param {string} filePath - Path to file
 * @param {Function} validateFn - Validation function
 * @returns {boolean} - Whether file is valid
 */
function testFileValidates(filePath, validateFn) {
  if (!fs.existsSync(filePath)) {
    return false;
  }
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Handle array of positions vs single object
  if (Array.isArray(data)) {
    return data.every(item => validateFn(item));
  } else {
    return validateFn(data);
  }
}

/**
 * Count objects in file
 * @param {string} filePath - Path to file
 * @param {string} [objectPath] - Optional path to array in object
 * @returns {number} - Count of objects
 */
function countObjects(filePath, objectPath) {
  if (!fs.existsSync(filePath)) {
    return 0;
  }
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (objectPath) {
    // Navigate to nested path
    const parts = objectPath.split('.');
    let current = data;
    
    for (const part of parts) {
      if (current[part] === undefined) {
        return 0;
      }
      current = current[part];
    }
    
    return Array.isArray(current) ? current.length : 0;
  } else {
    return Array.isArray(data) ? data.length : 1;
  }
}

/**
 * Compare key fields between two files
 * @param {string} file1 - Path to first file
 * @param {string} file2 - Path to second file
 * @param {string} keyPath1 - Path to key in first file
 * @param {string} keyPath2 - Path to key in second file
 * @returns {boolean} - Whether keys match
 */
function compareKeyFields(file1, file2, keyPath1, keyPath2) {
  if (!fs.existsSync(file1) || !fs.existsSync(file2)) {
    return false;
  }
  
  const data1 = JSON.parse(fs.readFileSync(file1, 'utf8'));
  const data2 = JSON.parse(fs.readFileSync(file2, 'utf8'));
  
  // Extract values from paths
  function getValueFromPath(obj, path) {
    const parts = path.split('.');
    let current = obj;
    
    for (const part of parts) {
      if (current[part] === undefined) {
        return undefined;
      }
      current = current[part];
    }
    
    return current;
  }
  
  const value1 = getValueFromPath(data1, keyPath1);
  const value2 = getValueFromPath(data2, keyPath2);
  
  return JSON.stringify(value1) === JSON.stringify(value2);
}

/**
 * Run all tests
 */
function runAllTests() {
  console.log('Running all migration tests...');
  
  // Test 1: Migrate trade plan
  runTest(
    'TC-1: Trade Plan Migration - Complete',
    migrateTradePlan,
    [
      `${config.inputDir}/${config.inputFiles.tradePlan}`,
      `${config.outputDir}/${config.outputFiles.tradePlan}`
    ]
  );
  
  // Test 2: Validate trade plan schema
  if (testFileExists(`${config.outputDir}/${config.outputFiles.tradePlan}`)) {
    runTest(
      'TC-2: Trade Plan Schema Validation',
      testFileValidates,
      [
        `${config.outputDir}/${config.outputFiles.tradePlan}`,
        validateTradePlan
      ]
    );
  }
  
  // Test 3: Migrate positions
  runTest(
    'TC-3: Position Migration - Complete',
    migratePositions,
    [
      `${config.inputDir}/${config.inputFiles.positions}`,
      `${config.outputDir}/${config.outputFiles.positions}`
    ]
  );
  
  // Test 4: Validate positions schema
  if (testFileExists(`${config.outputDir}/${config.outputFiles.positions}`)) {
    runTest(
      'TC-4: Position Schema Validation',
      testFileValidates,
      [
        `${config.outputDir}/${config.outputFiles.positions}`,
        validateTradePosition
      ]
    );
  }
  
  // Test 5: Create transaction log
  runTest(
    'TC-5: Transaction Log Creation',
    createTransactionLog,
    [
      `${config.outputDir}/${config.outputFiles.transactionLog}`,
      `${config.inputDir}/${config.inputFiles.positions}`
    ]
  );
  
  // Test 6: Create conversation context
  runTest(
    'TC-6: Conversation Context Creation',
    createConversationContext,
    [
      `${config.outputDir}/${config.outputFiles.conversationContext}`,
      `${config.inputDir}/${config.inputFiles.sessionManifest}`
    ]
  );
  
  // Test 7: Validate conversation context schema
  if (testFileExists(`${config.outputDir}/${config.outputFiles.conversationContext}`)) {
    runTest(
      'TC-7: Conversation Context Schema Validation',
      testFileValidates,
      [
        `${config.outputDir}/${config.outputFiles.conversationContext}`,
        validateConversationContext
      ]
    );
  }
  
  // Test 8: Data preservation - Trade ideas count
  if (testFileExists(`${config.inputDir}/${config.inputFiles.tradePlan}`) && 
      testFileExists(`${config.outputDir}/${config.outputFiles.tradePlan}`)) {
    const originalIdeasCount = 
      countObjects(`${config.inputDir}/${config.inputFiles.tradePlan}`, 'tradePlan.tradeIdeas.primary') +
      countObjects(`${config.inputDir}/${config.inputFiles.tradePlan}`, 'tradePlan.tradeIdeas.secondary') +
      countObjects(`${config.inputDir}/${config.inputFiles.tradePlan}`, 'tradePlan.tradeIdeas.watchlist');
    
    const migratedIdeasCount = countObjects(`${config.outputDir}/${config.outputFiles.tradePlan}`, 'tradeIdeas');
    
    runTest(
      'TC-8: Data Preservation - Trade Ideas Count',
      () => originalIdeasCount === migratedIdeasCount,
      []
    );
  }
  
  // Test 9: Data preservation - Positions count
  if (testFileExists(`${config.inputDir}/${config.inputFiles.positions}`) && 
      testFileExists(`${config.outputDir}/${config.outputFiles.positions}`)) {
    const originalPositionsCount = countObjects(`${config.inputDir}/${config.inputFiles.positions}`, 'positions');
    const migratedPositionsCount = countObjects(`${config.outputDir}/${config.outputFiles.positions}`);
    
    runTest(
      'TC-9: Data Preservation - Positions Count',
      () => originalPositionsCount === migratedPositionsCount,
      []
    );
  }
  
  // Test 10: Key field preservation - Market bias
  if (testFileExists(`${config.inputDir}/${config.inputFiles.tradePlan}`) && 
      testFileExists(`${config.outputDir}/${config.outputFiles.tradePlan}`)) {
    runTest(
      'TC-10: Key Field Preservation - Market Bias',
      compareKeyFields,
      [
        `${config.inputDir}/${config.inputFiles.tradePlan}`,
        `${config.outputDir}/${config.outputFiles.tradePlan}`,
        'tradePlan.marketFramework.bias',
        'marketFramework.bias'
      ]
    );
  }
  
  // Write test results
  fs.writeFileSync(
    `${config.logDir}/${config.logFile}`,
    JSON.stringify(testResults, null, 2)
  );
  
  console.log('\nTest Summary:');
  console.log(`Total tests: ${testResults.totalTests}`);
  console.log(`Passed: ${testResults.passed}`);
  console.log(`Failed: ${testResults.failed}`);
  console.log(`Results written to ${config.logDir}/${config.logFile}`);
}

// Main execution
setupTestEnv();
runAllTests();