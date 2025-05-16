---
command: update-position
version: 1.0.0
phase: manage
domain: position-management
description: Update an existing position with new information
author: Intent Trader Team
date: 2025-05-15
---

# Position Manager: Update Position

## Purpose
The `/update-position` command modifies an existing trading position with new information such as stop levels, partial exits, or price updates.

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

3. **Save Updated Position**
   - Write updated position back to the appropriate file
   - Maintain position history

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

## Error Handling

- Position not found: "Error: No active position found for symbol '{SYMBOL}' owned by {OWNER}"
- Invalid action: "Error: '{ACTION}' is not a valid update action"
- Missing parameters: "Error: '{PARAM}' is required for '{ACTION}' updates"
- Invalid values: "Error: Stop must be below entry price for long positions"
- Storage error: "Error: Failed to save updated position to {FILE_PATH}"
