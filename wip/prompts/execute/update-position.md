## Position Status Values

The position can have the following status values:

- `active`: Normal active position
- `partial`: Position that has been partially exited
- `runner`: Position in Mancini runner management mode (after 2nd target)
- `closed`: Completely closed position
- `stopped`: Position that has been stopped out
- `scaling`: Position that is being built through multiple entries
- `pending`: Position with orders placed but not yet executed
- `core`: DP core position being maintained
- `trading`: Position component being actively traded around a core---
command: update-position
version: 1.0.0
phase: manage
domain: position-management
description: Update an existing position with new information or parameters
author: Intent Trader Team
date: 2025-05-15
---

# Position Manager: Update Position

## Purpose
The `/update-position` command modifies an existing trading position with new information or parameters. It supports various update actions including moving stops, recording partial exits, adjusting targets, and updating current prices. This command is central to the active management of positions throughout the trading day and implements key risk management protocols like the 75/15/10 rule.

## Input Parameters

| Parameter | Required | Description | Format |
|-----------|----------|-------------|--------|
| `symbol` | Yes | Stock/instrument symbol | String (e.g., "AAPL") |
| `action` | Yes | Update action type | String (see action types below) |
| `value` | Yes | New parameter value | Number or String (depends on action) |
| `size` | Conditional | Size for partial exit | Number (required for partial-exit) |
| `price` | Conditional | Price for updates | Number (required for certain actions) |
| `target_index` | Conditional | Target index to update | Number (required for adjust-target) |
| `notes` | No | Update reasoning | String |

### Valid Action Types

| Action | Description | Required Parameters |
|--------|-------------|---------------------|
| `move-stop` | Update stop loss level | value (new stop price) |
| `partial-exit` | Record a partial position exit | value (exit price), size (quantity exited) |
| `adjust-target` | Modify target price | value (new target price), target_index |
| `update-price` | Update current market price | value (current price) |
| `hit-target` | Mark a target as reached | target_index |
| `add-target` | Add a new profit target | value (target price) |
| `change-status` | Update position status | value (new status) |
| `add-notes` | Append additional notes | value (note text) |
| `scale-in` | Add to existing position | value (entry price), size (added quantity) |
| `core-adjustment` | Adjust core position size | value (new core size) |
| `level-reached` | Mark a DP level as reached | value (level price) |

## Processing Logic

1. **Validate Input Parameters**
   - Check that all required parameters are provided
   - Verify that the specified position exists in the system
   - Validate that action is a supported update type
   - Ensure that action-specific required parameters are present

2. **Retrieve Position Data**
   - Load the current position data based on the symbol
   - Store original state for comparison and history tracking

3. **Process Update Based on Action**

   a. **move-stop**
      - Update stop price in risk object
      - Recalculate risk metrics based on current position size
      - Validate stop direction (below entry for long, above for short)

   b. **partial-exit**
      - If Mancini strategy: Verify exit aligns with 75/15/10 rule targets
      - If DP strategy: Process based on level reached or trading around core method
      - Update current position size by subtracting exited quantity
      - Record exit in position history
      - Calculate realized P&L for exited portion
      - If appropriate, mark corresponding target as "hit"

   c. **adjust-target**
      - Validate target index exists
      - Update target price
      - Recompute potential gain for the target
      - Ensure target direction aligns with position direction

   d. **update-price**
      - Set current price to specified value
      - Recalculate unrealized P&L and P&L percentage
      - Check if current price has hit any targets or stop

   e. **hit-target**
      - Mark the specified target as "hit"
      - Calculate the implied exit quantity based on target percentage
      - Update position size if not already updated
      - Record the target achievement in position history

   f. **add-target**
      - Create new target object
      - Assign appropriate percentage based on remaining targets
      - Add to targets array
      - Rebalance percentages if needed

   g. **change-status**
      - Update position status to specified value
      - Validate status is a supported type
      - Record status change in position history

   h. **add-notes**
      - Append new notes to existing notes
      - Include timestamp with the new note

   i. **scale-in**
      - Add to position size
      - Recalculate average entry price
      - Update risk calculations
      - Record scaling in position history
      
   j. **core-adjustment** (DP strategy only)
      - Adjust core position size
      - Recalculate trading position size (total size - core size)
      - Update risk calculations
      - Record core adjustment in position history
      
   k. **level-reached** (DP strategy only)
      - Mark a DP level as reached
      - Record the level interaction in position history
      - Trigger appropriate alerts or actions based on level significance

4. **Update Timestamp**
   - Record the time of position update

5. **Store Updated Position**
   - Save the modified position data
   - Update system state to reflect changes

## Output Format

The command returns a confirmation with the updated position details:

```
🔄 POSITION UPDATED: {SYMBOL} {DIRECTION}

Update Type: {ACTION}
{ACTION_SPECIFIC_DETAILS}

----- CURRENT POSITION STATUS -----

ID: {POSITION_ID}
Status: {STATUS}
Entry: ${ENTRY_PRICE}
Current: ${CURRENT_PRICE} (${PNL}, {PNL_PERCENTAGE}%)
Size: {CURRENT_SIZE}/{INITIAL_SIZE} {UNIT}
Stop: ${STOP_PRICE} (Risk: ${RISK_AMOUNT}, {RISK_PERCENT}%)

🎯 Targets:
1. ${TARGET1} - {TARGET1_STATUS} (Exit {TARGET1_PERCENTAGE}%)
2. ${TARGET2} - {TARGET2_STATUS} (Exit {TARGET2_PERCENTAGE}%)
3. ${TARGET3} - {TARGET3_STATUS} (Exit {TARGET3_PERCENTAGE}%)

Update Notes: {UPDATE_NOTES}
```

### Action-Specific Output Details

Different actions will display specific information:

#### move-stop
```
Previous Stop: ${OLD_STOP}
New Stop: ${NEW_STOP}
Risk Change: ${RISK_DIFFERENCE} ({RISK_PERCENT_CHANGE}%)
```

#### partial-exit
```
Exit Price: ${EXIT_PRICE}
Quantity: {EXIT_SIZE} {UNIT}
Realized P&L: ${REALIZED_PNL} ({REALIZED_PNL_PERCENT}%)
Remaining Position: {CURRENT_SIZE} {UNIT}
Target Status: {TARGET_REACHED}
```

#### adjust-target
```
Target #{TARGET_INDEX}:
Previous: ${OLD_TARGET}
New: ${NEW_TARGET}
Potential Gain: ${POTENTIAL_GAIN} ({POTENTIAL_GAIN_PERCENT}%)
```

## Example Usage

```
/update-position AAPL move-stop value=224.50 notes="Moving stop to breakeven after first target hit"
```

## Example Response

```
🔄 POSITION UPDATED: AAPL LONG

Update Type: move-stop
Previous Stop: $223.80
New Stop: $224.50
Risk Change: -$70.00 (-41.2%)

----- CURRENT POSITION STATUS -----

ID: AAPL-20250515-001
Status: active
Entry: $225.50
Current: $227.25 (+$175.00, +0.78%)
Size: 100/100 shares
Stop: $224.50 (Risk: $100.00, 0.44%)

🎯 Targets:
1. $227.50 - pending (Exit 75%)
2. $229.00 - pending (Exit 15%)
3. $232.00 - pending (Exit 10%)

Update Notes: Moving stop to breakeven after first target hit
```

## Error Handling

The command will return specific error messages for various issues:

- Position not found: "Error: No active position found for symbol '{SYMBOL}'"
- Invalid action: "Error: '{ACTION}' is not a valid update action"
- Missing parameters: "Error: '{PARAM}' is required for '{ACTION}' updates"
- Invalid target index: "Error: Target index {INDEX} does not exist"
- Invalid stop direction: "Error: Stop must be below entry price for long positions"
- Invalid size: "Error: Exit size cannot exceed current position size"

## Implementation Notes

- The update-position command maintains a comprehensive history of all position updates
- Each update action is designed to support both trading methodologies:
  - **Mancini Strategy**: Implements the 75/15/10 rule and runner management
  - **DP Strategy**: Supports "trading around a core" and level-based exits
- The system enforces validation to prevent errors in position management
- The command integrates with the risk management framework to track exposure changes
- All P&L calculations include the effects of partial exits and scaling
- The system prompts for confirmations on critical actions like moving stops lower
- For DP core positions, the command supports specialized actions for core vs. trading position management
