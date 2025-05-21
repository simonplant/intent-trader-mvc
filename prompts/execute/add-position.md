---
id: add-position-v0.5.2
title: Position Management System
description: Creates and registers new trading positions in the Intent Trader system with schema validation
author: Intent Trader Team
version: 1.0.1
release: 0.5.2
created: 2025-05-15
updated: 2025-05-20
category: manage
status: stable
tags: [position-management, trade-tracking, schema-validation, risk-assessment]
requires: [system/schemas/intent-trader-master-schema.json, system/schemas/intent-trader-runtime-schema.json]
outputs: [state/my-positions.json, state/ic-moderator-positions.json, state/transaction-log.json]
input_format: command
output_format: markdown
ai_enabled: true
---

# Position Manager: Add Position

## Purpose
The `/add-position` command creates and registers a new trading position in the Intent Trader system, storing it in the appropriate position tracking file based on the owner parameter. Each position is created following the canonical `tradePosition` schema with proper inheritance from the `baseObject` type.

## Input Parameters

| Parameter | Required | Description | Format | Default |
|-----------|----------|-------------|--------|---------|
| `symbol` | Yes | Stock/instrument symbol | String (e.g., "AAPL") | - |
| `direction` | Yes | Trade direction | String: "long" or "short" | - |
| `entry` | Yes | Entry price | Number (e.g., 225.50) | - |
| `size` | Yes | Position size | Number (e.g., 100) | - |
| `stop` | Yes | Initial stop loss | Number (e.g., 223.80) | - |
| `targets` | Yes | Profit targets | Comma-separated numbers (e.g., "227.50,229.00,232.00") | - |
| `setup` | No | Setup type | String (e.g., "bull-flag") | - |
| `strategy` | No | Trading strategy | String: "dp" or "mancini" | "dp" |
| `trade_type` | No | Type of trade | String: "day", "swing", "core" | "day" |
| `owner` | No | Position owner | String: "me", "moderator" | "me" |
| `notes` | No | Trade reasoning | String | - |
| `classifications` | No | Classification flags | Comma-separated flags (e.g., "isTrendFollow,isMomentumPlay") | - |

## Processing Logic

1. **Input Validation**
   - Validate all required parameters
   - Verify numeric values are within valid ranges
   - Ensure symbol, direction, and other string inputs are valid
   - Validate targets align with trade direction (higher for long, lower for short)

2. **Schema Object Creation**
   - Generate unique position ID: `pos-{YYYYMMDD}-{SYMBOL}-{XX}`
   - Initialize `tradePosition` object with required `baseObject` properties
   - Create nested entry, exit, risk, and classification parameters
   - Calculate risk metrics and RR ratio
   - Apply proper classification boolean flags
   - Set initial status to "open"
   - Add origin tracking with source command and creator

3. **Position Storage**
   - Determine storage location based on owner:
     - "me": `state/my-positions.json`
     - "moderator": `state/ic-moderator-positions.json`
   - Create file with empty array if it doesn't exist
   - Load existing positions if file exists
   - Add new position to array and save
   - Update transaction log with entry transaction

4. **Schema Validation**
   - Validate position object against runtime schema
   - Ensure compliance with master schema structure
   - Verify all required fields and proper nesting
   - Confirm proper boolean classifications

## Response Format

```
📋 POSITION ADDED: {SYMBOL} {DIRECTION}

ID: {POSITION_ID}
Entry: ${ENTRY_PRICE} on {ENTRY_DATE}
Size: {SIZE} {UNIT}
Stop: ${STOP_PRICE} (-${RISK_AMOUNT}, {RISK_PERCENT}%)

🎯 Targets:
1. ${TARGET1} (+${TARGET1_GAIN}, {TARGET1_PERCENT}%)
2. ${TARGET2} (+${TARGET2_GAIN}, {TARGET2_PERCENT}%)
3. ${TARGET3} (+${TARGET3_GAIN}, {TARGET3_PERCENT}%)

Setup: {SETUP_TYPE}
Strategy: {STRATEGY}
Trade Type: {TRADE_TYPE}
Owner: {OWNER}
Classifications: {CLASSIFICATION_LIST}

Notes: {TRADE_NOTES}

✅ Position saved to {FILE_PATH}
✅ Transaction logged to state/transaction-log.json
```

## Example Usage

```
/add-position AAPL long entry=225.50 size=100 stop=223.80 targets=227.50,229.00,232.00 setup=bull-flag strategy=mancini trade_type=swing owner=me notes="Breaking out of bull flag pattern" classifications=isFlagPattern,isTrendFollow
```

## Position Object Structure

```json
{
  "schemaVersion": "0.5.2",
  "id": "pos-20250520-AAPL-01",
  "source": "manual",
  "timestamp": "2025-05-20T10:30:00Z",
  "symbol": "AAPL",
  "direction": "long",
  "entry": {
    "price": 225.50,
    "date": "2025-05-20",
    "shares": 100,
    "contracts": null
  },
  "stop": 223.80,
  "target": 232.00,
  "setup": "bull-flag",
  "status": "open",
  "exitDate": null,
  "exitPrice": null,
  "profit": {
    "amount": null,
    "percent": null,
    "rMultiple": null
  },
  "notes": "Breaking out of bull flag pattern",
  "conviction": {
    "level": "medium",
    "phrases": ["bull flag breakout"]
  },
  "classifications": {
    "isBreakout": false,
    "isReversal": false,
    "isFlagPattern": true,
    "isFailedBreakdown": false,
    "isEarningsPlay": false,
    "isDayAfterTrade": false,
    "isTrendFollow": true,
    "isRangePlay": false,
    "isGapFill": false,
    "isMomentumPlay": false
  },
  "isRunner": false,
  "isCorePosition": false,
  "origin": {
    "sourceCommand": "/add-position",
    "createdBy": "position-tracker",
    "ideaId": null,
    "planId": "plan-20250520"
  }
}
```

## Transaction Log Entry Structure

```json
{
  "id": "tx-20250520-AAPL-01",
  "schemaVersion": "0.5.2",
  "type": "entry",
  "symbol": "AAPL",
  "direction": "long",
  "timestamp": "2025-05-20T10:30:00Z",
  "source": "manual-execution",
  "price": 225.50,
  "quantity": 100,
  "amount": 22550.00,
  "positionId": "pos-20250520-AAPL-01",
  "planId": "plan-20250520",
  "notes": "Entry execution for bull-flag setup"
}
```

## Implementation Details

### Schema Validation Methods

The command implements the following validation functions to ensure schema compliance:

```javascript
// Validate position object against runtime schema
function validatePosition(position) {
  // Verify required baseObject fields
  const baseFields = ["schemaVersion", "id", "source", "timestamp"];
  for (const field of baseFields) {
    if (!position[field]) {
      return {
        valid: false,
        errors: [`Missing required baseObject field: ${field}`]
      };
    }
  }

  // Verify required position fields
  const positionFields = ["symbol", "direction", "entry"];
  for (const field of positionFields) {
    if (!position[field]) {
      return {
        valid: false,
        errors: [`Missing required tradePosition field: ${field}`]
      };
    }
  }

  // Verify entry object
  if (!position.entry.price || !position.entry.date) {
    return {
      valid: false,
      errors: ["Entry object missing required fields: price and date"]
    };
  }

  // Validate enum values
  if (!["long", "short"].includes(position.direction)) {
    return {
      valid: false,
      errors: [`Invalid direction: ${position.direction}`]
    };
  }

  // Validate status
  if (position.status && !["open", "closed", "partial", "stopped", "target"].includes(position.status)) {
    return {
      valid: false,
      errors: [`Invalid status: ${position.status}`]
    };
  }

  return { valid: true };
}
```

### Classification Handling

The command processes classification flags from string inputs into boolean schema properties:

```javascript
// Convert classification flags from input to schema format
function processClassifications(classificationFlags) {
  // Initialize with all flags set to false
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
  
  // Process the flags from input
  if (classificationFlags) {
    const flags = classificationFlags.split(',');
    for (const flag of flags) {
      const trimmedFlag = flag.trim();
      if (classifications.hasOwnProperty(trimmedFlag)) {
        classifications[trimmedFlag] = true;
      }
    }
  }
  
  return classifications;
}
```

### ID Generation Function

```javascript
// Generate a unique position ID
function generatePositionId(symbol, date) {
  const formattedDate = date.replace(/-/g, '');
  
  // Load existing positions to find next sequence number
  const existingPositions = loadPositions();
  
  // Find positions with the same symbol and date
  const matchingPositions = existingPositions.filter(p => 
    p.id.includes(`pos-${formattedDate}-${symbol}`)
  );
  
  // Determine next sequence number
  const sequence = matchingPositions.length + 1;
  const sequenceFormatted = sequence < 10 ? `0${sequence}` : `${sequence}`;
  
  return `pos-${formattedDate}-${symbol}-${sequenceFormatted}`;
}
```

### Transaction Log Integration

```javascript
// Log a transaction entry for the position
function logTransaction(position) {
  // Generate transaction ID
  const dateStr = position.entry.date.replace(/-/g, '');
  const txId = `tx-${dateStr}-${position.symbol}-01`;
  
  // Create transaction object
  const transaction = {
    id: txId,
    schemaVersion: "0.5.2",
    type: "entry",
    symbol: position.symbol,
    direction: position.direction,
    timestamp: position.timestamp,
    source: "manual-execution",
    price: position.entry.price,
    quantity: position.entry.shares || position.entry.contracts,
    amount: position.entry.price * (position.entry.shares || position.entry.contracts),
    positionId: position.id,
    planId: position.origin.planId || null,
    notes: `Entry execution for ${position.setup || 'trading'} setup`
  };
  
  // Load existing log
  const txLogPath = "state/transaction-log.json";
  let txLog;
  
  try {
    txLog = JSON.parse(fs.readFileSync(txLogPath, 'utf8'));
  } catch (e) {
    // Initialize new log if file doesn't exist
    txLog = {
      schemaVersion: "0.5.2",
      id: `log-${dateStr}`,
      source: "system",
      timestamp: new Date().toISOString(),
      date: position.entry.date,
      entries: [],
      origin: {
        sourceCommand: "/add-position",
        createdBy: "position-tracker"
      }
    };
  }
  
  // Add transaction to log
  txLog.entries.push(transaction);
  
  // Save updated log
  fs.writeFileSync(txLogPath, JSON.stringify(txLog, null, 2));
  
  return txId;
}
```

## Command Integration

The `/add-position` command integrates with these other system components:

- Uses `intent-trader-master-schema.json` for object structure definition
- Uses `intent-trader-runtime-schema.json` for runtime validation
- Updates `state/my-positions.json` or `state/ic-moderator-positions.json`
- Updates `state/transaction-log.json` with entry transaction
- Connects with plan data via `planId` reference
- Provides position data for `/list-positions` and `/update-position` commands

## Error Handling

The command implements comprehensive error handling for various failure cases:

- Missing parameters: "Error: Required parameter '{PARAM}' is missing"
- Invalid direction: "Error: Direction must be 'long' or 'short'"
- Invalid price: "Error: '{PARAM}' must be a valid number"
- Invalid target direction: "Error: Targets must be above entry price for long positions"
- Target count insufficient: "Error: Please specify at least one target price"
- Schema validation failure: "Error: Position validation failed: {VALIDATION_ERRORS}"
- Storage error: "Error: Failed to save position to {FILE_PATH}"
- Transaction log error: "Warning: Failed to log transaction, but position was saved"

## Implementation Notes

This implementation follows the dual-schema approach established in the refactored create-plan.md:

1. The position object structure follows the master schema with proper inheritance from baseObject
2. All required fields are implemented with appropriate nesting
3. Boolean classifications replace text-based classifications
4. Transaction logging is implemented with consistent references
5. Runtime schema validation ensures compliance before storage
6. Standardized front matter matches the template format
7. Examples demonstrate real-world trading scenarios
8. All existing functionality is preserved while implementing the canonical schema
