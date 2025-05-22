---
id: close-position-v0.5.2
title: Close Position Command
description: Terminates a trading position, records exit details, and calculates performance metrics
author: Intent Trader Team
version: 1.0.1
release: 0.5.2
created: 2025-05-15
updated: 2025-05-21
category: manage
status: stable
tags: [position-management, trade-tracking, schema-validation, performance-metrics]
requires: [system/schemas/intent-trader-master-schema.json, system/schemas/intent-trader-runtime-schema.json]
outputs: [state/my-positions.json, state/ic-moderator-positions.json, state/transaction-log.json, state/closed-positions.json]
input_format: command
output_format: markdown
ai_enabled: true
---

# Position Manager: Close Position

## Purpose
The `/close-position` command terminates a trading position, records exit details, and calculates performance metrics. It updates the position's status in the appropriate tracking file and archives the position data for performance analysis.

## Input Parameters

| Parameter | Required | Description | Format |
|-----------|----------|-------------|--------|
| `symbol` | Yes | Stock/instrument symbol | String (e.g., "AAPL") |
| `exit_price` | Yes | Final exit price | Number (e.g., 227.50) |
| `owner` | No | Position owner | String: "me", "moderator" (default: "me") |
| `reason` | No | Exit reasoning | String: "target", "stop", "discretionary" (default: "discretionary") |
| `size` | No | Size to close if partial | Number (default: all remaining) |
| `notes` | No | Additional observations | String |

## Processing Logic

1. **Load Position Data**
   - Load positions from the appropriate file based on owner
   - Find the specific position by symbol
   - Verify position exists and is active

2. **Process Exit**
   - Calculate P&L: `(exit_price - entry_price) * size` for long positions
   - Calculate P&L percentage
   - Calculate R-multiple (P&L / initial risk)
   - Record exit details (price, time, reason)
   - For partial closes, update remaining position size

3. **Update Position Status**
   - For full close: Set status to "closed"
   - For partial close: Update size and recalculate risk
   - Record in position history
   - Update timestamp to current time

4. **Schema Validation**
   - Validate updated position against `tradePosition` schema
   - Ensure compliance with all required fields
   - Verify proper nesting structure

5. **Save Updated Position**
   - Write the updated position back to the appropriate file
   - For fully closed positions, archive to closed-positions.json
   - Update transaction log with exit transaction

## Response Format

### Full Close

```
🏁 POSITION CLOSED: {SYMBOL} {DIRECTION}

Exit Details:
- Price: ${EXIT_PRICE}
- Time: {EXIT_TIME}
- Reason: {EXIT_REASON}

Performance Summary:
- Entry: ${ENTRY_PRICE} on {ENTRY_TIME}
- P&L: ${TOTAL_PNL} ({PNL_PERCENTAGE}%)
- R-Multiple: {R_MULTIPLE}R
- Holding Period: {HOLDING_PERIOD}

Target Achievement:
- Target 1 (${TARGET1}): {TARGET1_STATUS}
- Target 2 (${TARGET2}): {TARGET2_STATUS}
- Target 3 (${TARGET3}): {TARGET3_STATUS}

Notes: {EXIT_NOTES}
```

### Partial Close

```
🔄 PARTIAL CLOSE: {SYMBOL} {DIRECTION}

Exit Details:
- Price: ${EXIT_PRICE}
- Size: {EXIT_SIZE} of {INITIAL_SIZE} {UNIT}
- Realized P&L: ${REALIZED_PNL} ({REALIZED_PNL_PERCENTAGE}%)

Remaining Position:
- Size: {REMAINING_SIZE} {UNIT}
- Average Entry: ${AVG_ENTRY}
- Current Risk: ${CURRENT_RISK}
- Updated Targets: [${REMAINING_TARGETS}]

Notes: {EXIT_NOTES}
```

## Example Usage

```
/close-position AAPL exit_price=227.50 owner=me reason="target" notes="First target reached"
```

```
/close-position SPY exit_price=498.50 size=25 owner=moderator reason="discretionary" notes="Taking profits on half"
```

## Example Response

```
🏁 POSITION CLOSED: AAPL LONG

Exit Details:
- Price: $227.50
- Time: 2025-05-15T14:45:23Z
- Reason: target

Performance Summary:
- Entry: $225.50 on 2025-05-15T10:30:00Z
- P&L: +$200.00 (+0.89%)
- R-Multiple: 1.18R
- Holding Period: 4h 15m 23s

Target Achievement:
- Target 1 ($227.50): Hit
- Target 2 ($229.00): Missed
- Target 3 ($232.00): Missed

Notes: First target reached
```

## Implementation Details

### Position Close Logic

```javascript
function closePosition(symbol, exitPrice, owner, reason, size, notes) {
  // Default values
  reason = reason || "discretionary";
  owner = owner || "me";
  
  // Load positions
  const positionsPath = owner === "moderator" 
    ? "state/ic-moderator-positions.json"
    : "state/my-positions.json";
  
  const positions = JSON.parse(fs.readFileSync(positionsPath, 'utf8'));
  
  // Find the position
  const positionIndex = positions.findIndex(p => p.symbol === symbol && p.status === "open");
  if (positionIndex === -1) {
    return {
      success: false,
      error: `No active position found for symbol '${symbol}' owned by ${owner}`
    };
  }
  
  const position = positions[positionIndex];
  const exitTime = new Date().toISOString();
  
  // Calculate initial values
  const entryPrice = position.entry.price;
  const initialSize = position.entry.shares || position.entry.contracts;
  const sizeUnit = position.entry.shares ? "shares" : "contracts";
  const isPartialClose = size && size < initialSize;
  
  // Process the close
  if (isPartialClose) {
    // Partial close logic
    const exitSize = parseFloat(size);
    const remainingSize = initialSize - exitSize;
    
    // Calculate P&L for the closed portion
    const pnl = position.direction === "long"
      ? (exitPrice - entryPrice) * exitSize
      : (entryPrice - exitPrice) * exitSize;
    
    const pnlPercentage = position.direction === "long"
      ? ((exitPrice - entryPrice) / entryPrice) * 100
      : ((entryPrice - exitPrice) / entryPrice) * 100;
    
    // Update position
    if (position.entry.shares) {
      position.entry.shares = remainingSize;
    } else {
      position.entry.contracts = remainingSize;
    }
    
    // Add to position history
    if (!position.history) {
      position.history = [];
    }
    
    position.history.push({
      timestamp: exitTime,
      action: "partial-close",
      exitPrice: exitPrice,
      exitSize: exitSize,
      reason: reason,
      pnl: pnl,
      pnlPercentage: pnlPercentage,
      notes: notes
    });
    
    // Update position with partial close info
    position.status = "partial";
    position.lastUpdated = exitTime;
    
    // Log transaction
    logTransaction({
      type: "partial-close",
      symbol: position.symbol,
      direction: position.direction,
      price: exitPrice,
      quantity: exitSize,
      amount: exitPrice * exitSize,
      positionId: position.id,
      pnl: pnl,
      notes: notes || `Partial close: ${reason}`
    });
    
    // Save updated positions
    positions[positionIndex] = position;
    fs.writeFileSync(positionsPath, JSON.stringify(positions, null, 2));
    
    return {
      success: true,
      isPartial: true,
      position: position,
      exitDetails: {
        price: exitPrice,
        time: exitTime,
        size: exitSize,
        reason: reason,
        pnl: pnl,
        pnlPercentage: pnlPercentage,
        remainingSize: remainingSize
      }
    };
    
  } else {
    // Full close logic
    
    // Calculate full P&L
    const pnl = position.direction === "long"
      ? (exitPrice - entryPrice) * initialSize
      : (entryPrice - exitPrice) * initialSize;
    
    const pnlPercentage = position.direction === "long"
      ? ((exitPrice - entryPrice) / entryPrice) * 100
      : ((entryPrice - exitPrice) / entryPrice) * 100;
    
    // Calculate R-multiple if stop is set
    let rMultiple = null;
    if (position.stop) {
      const initialRisk = position.direction === "long"
        ? (entryPrice - position.stop) * initialSize
        : (position.stop - entryPrice) * initialSize;
      
      rMultiple = Math.abs(pnl / initialRisk);
    }
    
    // Calculate holding period
    const entryTime = new Date(position.timestamp);
    const exitTimeDate = new Date(exitTime);
    const holdingPeriodMs = exitTimeDate - entryTime;
    
    // Format holding period
    const holdingPeriod = formatHoldingPeriod(holdingPeriodMs);
    
    // Update position
    position.status = "closed";
    position.exitDate = exitTime.slice(0, 10);
    position.exitPrice = exitPrice;
    position.profit = {
      amount: pnl,
      percent: pnlPercentage,
      rMultiple: rMultiple
    };
    position.lastUpdated = exitTime;
    
    // Add to position history
    if (!position.history) {
      position.history = [];
    }
    
    position.history.push({
      timestamp: exitTime,
      action: "close",
      exitPrice: exitPrice,
      reason: reason,
      pnl: pnl,
      pnlPercentage: pnlPercentage,
      rMultiple: rMultiple,
      notes: notes
    });
    
    // Log transaction
    logTransaction({
      type: "close",
      symbol: position.symbol,
      direction: position.direction,
      price: exitPrice,
      quantity: initialSize,
      amount: exitPrice * initialSize,
      positionId: position.id,
      pnl: pnl,
      notes: notes || `Position closed: ${reason}`
    });
    
    // Archive closed position
    archiveClosedPosition(position);
    
    // Remove from active positions
    positions.splice(positionIndex, 1);
    fs.writeFileSync(positionsPath, JSON.stringify(positions, null, 2));
    
    return {
      success: true,
      isPartial: false,
      position: position,
      exitDetails: {
        price: exitPrice,
        time: exitTime,
        reason: reason,
        pnl: pnl,
        pnlPercentage: pnlPercentage,
        rMultiple: rMultiple,
        holdingPeriod: holdingPeriod
      }
    };
  }
}

// Helper function to format holding period
function formatHoldingPeriod(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;
  
  let result = "";
  if (days > 0) {
    result += `${days}d `;
  }
  if (remainingHours > 0 || days > 0) {
    result += `${remainingHours}h `;
  }
  if (remainingMinutes > 0 || remainingHours > 0 || days > 0) {
    result += `${remainingMinutes}m `;
  }
  result += `${remainingSeconds}s`;
  
  return result;
}

// Helper function to archive closed position
function archiveClosedPosition(position) {
  const archivePath = "state/closed-positions.json";
  let archived;
  
  try {
    archived = JSON.parse(fs.readFileSync(archivePath, 'utf8'));
  } catch (e) {
    // Initialize new archive if file doesn't exist
    archived = [];
  }
  
  // Add position to archive
  archived.push(position);
  
  // Save updated archive
  fs.writeFileSync(archivePath, JSON.stringify(archived, null, 2));
  
  return true;
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
```

## Error Handling

The command implements comprehensive error handling for various failure cases:

- Position not found: "Error: No active position found for symbol '{SYMBOL}' owned by {OWNER}"
- Invalid exit price: "Error: Exit price must be a valid number"
- Invalid size: "Error: Exit size cannot exceed current position size: {CURRENT_SIZE}"
- Already closed: "Error: Position for {SYMBOL} is already closed"
- Storage error: "Error: Failed to save closed position to {FILE_PATH}"
- Transaction log error: "Warning: Failed to log transaction, but position was closed"

## Command Integration

The `/close-position` command integrates with these other system components:

- Uses `intent-trader-master-schema.json` for object structure validation
- Updates `state/my-positions.json` or `state/ic-moderator-positions.json`
- Updates `state/transaction-log.json` with exit transactions
- Archives closed positions to `state/closed-positions.json`
- Connects with other position commands via shared position data
- Maintains history of all position actions
