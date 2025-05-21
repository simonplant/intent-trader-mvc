---
id: update-position-v0.5.2
title: Update Position Command
description: Updates existing trading positions with new information such as stop levels, partial exits, or price updates
author: Intent Trader Team
version: 1.0.1
release: 0.5.2
created: 2025-05-15
updated: 2025-05-21
category: manage
status: stable
tags: [position-management, trade-tracking, schema-validation, risk-assessment]
requires: [system/schemas/intent-trader-master-schema.json, system/schemas/intent-trader-runtime-schema.json]
outputs: [state/my-positions.json, state/ic-moderator-positions.json, state/transaction-log.json]
input_format: command
output_format: markdown
ai_enabled: true
---

# Position Manager: Update Position

## Purpose
The `/update-position` command modifies an existing trading position with new information such as stop levels, partial exits, or price updates. It ensures all updates maintain schema compliance while tracking position history.

## Input Parameters

| Parameter | Required | Description | Format |
|-----------|----------|-------------|--------|
| `symbol` | Yes | Stock/instrument symbol | String (e.g., "AAPL") |
| `action` | Yes | Update action type | String (see actions below) |
| `value` | Yes | New parameter value | Number or String (depends on action) |
| `size` | Conditional | Size for partial exit | Number (required for partial-exit) |
| `owner` | No | Position owner | String: "me", "moderator" (default: "me") |
| `notes` | No | Update reasoning | String |

### Valid Action Types

| Action | Description | Required Parameters |
|--------|-------------|---------------------|
| `move-stop` | Update stop loss level | value (new stop price) |
| `partial-exit` | Record a partial position exit | value (exit price), size (quantity exited) |
| `update-price` | Update current market price | value (current price) |
| `hit-target` | Mark a target as reached | value (target index) |
| `add-notes` | Append additional notes | value (note text) |
| `change-status` | Update position status | value (new status) |

## Processing Logic

1. **Load Position Data**
   - Load positions from the appropriate file based on owner
   - Find the specific position by symbol
   - Verify position exists and is active

2. **Process Update**
   - Apply the requested action to the position
   - Calculate updated metrics (P&L, risk)
   - Record update in position history

3. **Schema Validation**
   - Validate updated position against `tradePosition` schema
   - Ensure compliance with all required fields
   - Verify proper nesting structure

4. **Save Updated Position**
   - Write updated position back to the appropriate file
   - Update transaction log if relevant (e.g., partial exits)

## Response Format

```
🔄 POSITION UPDATED: {SYMBOL} {DIRECTION}

Update Type: {ACTION}
{ACTION_SPECIFIC_DETAILS}

----- CURRENT POSITION STATUS -----

Entry: ${ENTRY_PRICE} | Current: ${CURRENT_PRICE} 
P&L: ${PNL} ({PNL_PERCENTAGE}%)
Size: {CURRENT_SIZE}/{INITIAL_SIZE} {UNIT}
Stop: ${STOP_PRICE} (Risk: ${RISK_AMOUNT})

🎯 Targets:
1. ${TARGET1} - {TARGET1_STATUS}
2. ${TARGET2} - {TARGET2_STATUS}
3. ${TARGET3} - {TARGET3_STATUS}

Update Notes: {UPDATE_NOTES}
```

### Action-Specific Output Details

#### move-stop
```
Previous Stop: ${OLD_STOP}
New Stop: ${NEW_STOP}
Risk Change: ${RISK_DIFFERENCE}
```

#### partial-exit
```
Exit Price: ${EXIT_PRICE}
Quantity: {EXIT_SIZE} {UNIT}
Realized P&L: ${REALIZED_PNL}
Remaining Position: {CURRENT_SIZE} {UNIT}
```

## Example Usage

```
/update-position AAPL move-stop value=224.50 owner=me notes="Moving stop to breakeven"
```

```
/update-position SPY partial-exit value=499.50 size=25 owner=moderator notes="Taking partial profits"
```

## Example Response

```
🔄 POSITION UPDATED: AAPL LONG

Update Type: move-stop
Previous Stop: $223.80
New Stop: $224.50
Risk Change: -$70.00 (-41.2%)

----- CURRENT POSITION STATUS -----

Entry: $225.50 | Current: $227.25
P&L: +$175.00 (+0.78%)
Size: 100/100 shares
Stop: $224.50 (Risk: $100.00)

🎯 Targets:
1. $227.50 - pending
2. $229.00 - pending
3. $232.00 - pending

Update Notes: Moving stop to breakeven
```

## Implementation Details

### Position Update Logic

```javascript
function updatePosition(symbol, action, value, size, owner, notes) {
  // Load positions
  const positionsPath = owner === "moderator" 
    ? "state/ic-moderator-positions.json"
    : "state/my-positions.json";
  
  const positions = JSON.parse(fs.readFileSync(positionsPath, 'utf8'));
  
  // Find the position
  const position = positions.find(p => p.symbol === symbol && p.status === "open");
  if (!position) {
    return {
      success: false,
      error: `No active position found for symbol '${symbol}' owned by ${owner}`
    };
  }
  
  // Store original values for history
  const update = {
    timestamp: new Date().toISOString(),
    action: action,
    value: value,
    size: size,
    notes: notes,
    previousValues: {}
  };
  
  // Process the update action
  switch (action) {
    case "move-stop":
      update.previousValues.stop = position.stop;
      position.stop = parseFloat(value);
      break;
      
    case "partial-exit":
      if (!size) {
        return {
          success: false,
          error: "Size is required for partial-exit action"
        };
      }
      
      // Calculate realized P&L
      const exitPrice = parseFloat(value);
      const exitSize = parseFloat(size);
      const entryPrice = position.entry.price;
      const pnl = position.direction === "long"
        ? (exitPrice - entryPrice) * exitSize
        : (entryPrice - exitPrice) * exitSize;
      
      // Update position size
      update.previousValues.size = position.entry.shares || position.entry.contracts;
      const newSize = update.previousValues.size - exitSize;
      
      if (position.entry.shares) {
        position.entry.shares = newSize;
      } else {
        position.entry.contracts = newSize;
      }
      
      // Log transaction
      logTransaction({
        type: "partial-exit",
        symbol: position.symbol,
        direction: position.direction,
        price: exitPrice,
        quantity: exitSize,
        amount: exitPrice * exitSize,
        positionId: position.id,
        pnl: pnl,
        notes: notes || "Partial exit"
      });
      
      break;
    
    case "update-price":
      // Just store current price in history, doesn't change position
      update.previousValues.currentPrice = position.currentPrice || position.entry.price;
      position.currentPrice = parseFloat(value);
      break;
      
    case "hit-target":
      const targetIndex = parseInt(value) - 1;
      if (targetIndex < 0 || targetIndex > 2) {
        return {
          success: false,
          error: "Target index must be 1, 2, or 3"
        };
      }
      
      // Update target status in position
      if (!position.targetStatus) {
        position.targetStatus = ["pending", "pending", "pending"];
      }
      
      update.previousValues.targetStatus = [...position.targetStatus];
      position.targetStatus[targetIndex] = "hit";
      break;
      
    case "add-notes":
      update.previousValues.notes = position.notes;
      position.notes = position.notes 
        ? `${position.notes}\n${value}`
        : value;
      break;
      
    case "change-status":
      const validStatuses = ["open", "closed", "partial", "stopped", "target"];
      if (!validStatuses.includes(value)) {
        return {
          success: false,
          error: `Invalid status: ${value}. Must be one of: ${validStatuses.join(", ")}`
        };
      }
      
      update.previousValues.status = position.status;
      position.status = value;
      break;
      
    default:
      return {
        success: false,
        error: `'${action}' is not a valid update action`
      };
  }
  
  // Add update to history
  if (!position.history) {
    position.history = [];
  }
  position.history.push(update);
  
  // Validate updated position against schema
  const validation = validatePosition(position);
  if (!validation.valid) {
    return {
      success: false,
      error: `Position validation failed: ${validation.errors.join(", ")}`
    };
  }
  
  // Save updated positions
  fs.writeFileSync(positionsPath, JSON.stringify(positions, null, 2));
  
  return {
    success: true,
    position: position,
    update: update
  };
}

// Helper function to log transaction
function logTransaction(transaction) {
  const txLogPath = "state/transaction-log.json";
  let txLog;
  
  try {
    txLog = JSON.parse(fs.readFileSync(txLogPath, 'utf8'));
  } catch (e) {
    // Initialize new log if file doesn't exist
    txLog = {
      schemaVersion: "0.5.2",
      id: `log-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`,
      source: "system",
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().slice(0, 10),
      entries: []
    };
  }
  
  // Create transaction entry
  const txEntry = {
    id: `tx-${transaction.positionId}-${transaction.type}-${txLog.entries.length + 1}`,
    schemaVersion: "0.5.2",
    type: transaction.type,
    symbol: transaction.symbol,
    direction: transaction.direction,
    timestamp: new Date().toISOString(),
    source: "manual-execution",
    price: transaction.price,
    quantity: transaction.quantity,
    amount: transaction.amount,
    positionId: transaction.positionId,
    pnl: transaction.pnl,
    notes: transaction.notes
  };
  
  // Add transaction to log
  txLog.entries.push(txEntry);
  
  // Save updated log
  fs.writeFileSync(txLogPath, JSON.stringify(txLog, null, 2));
  
  return txEntry.id;
}

// Schema validation function
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

## Error Handling

The command implements comprehensive error handling for various failure cases:

- Position not found: "Error: No active position found for symbol '{SYMBOL}' owned by {OWNER}"
- Invalid action: "Error: '{ACTION}' is not a valid update action"
- Missing parameters: "Error: '{PARAM}' is required for '{ACTION}' updates"
- Invalid values: "Error: Stop must be below entry price for long positions"
- Schema validation failure: "Error: Position validation failed: {VALIDATION_ERRORS}"
- Storage error: "Error: Failed to save updated position to {FILE_PATH}"

## Command Integration

The `/update-position` command integrates with these other system components:

- Uses `intent-trader-master-schema.json` for object structure validation
- Updates `state/my-positions.json` or `state/ic-moderator-positions.json`
- Updates `state/transaction-log.json` with partial exit transactions
- Connects with other position commands via shared position data
- Maintains history of all position updates
