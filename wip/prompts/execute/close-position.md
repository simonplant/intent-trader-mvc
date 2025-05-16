---
command: close-position
version: 1.0.0
phase: manage
domain: position-management
description: Close a position and record the outcome
author: Intent Trader Team
date: 2025-05-15
---

# Position Manager: Close Position

## Purpose
The `/close-position` command terminates the lifecycle of a trading position, records the final exit details, calculates performance metrics, and prepares the trade data for analysis. This command completes the position management cycle, triggering the transition from active management to performance review.

## Input Parameters

| Parameter | Required | Description | Format |
|-----------|----------|-------------|--------|
| `symbol` | Yes | Stock/instrument symbol | String (e.g., "AAPL") |
| `exit_price` | Yes | Final exit price | Number (e.g., 227.50) |
| `exit_time` | No | Exit timestamp | ISO datetime (default: current time) |
| `reason` | No | Exit reasoning | String: "target", "stop", "discretionary", "time", "signal" (default: "discretionary") |
| `notes` | No | Additional observations | String |
| `size` | No | Size to close if partial | Number (default: all remaining) |

## Processing Logic

1. **Validate Input Parameters**
   - Check that all required parameters are provided
   - Verify that the specified position exists and is active
   - Validate that exit price is a valid number
   - If partial close requested, verify size does not exceed remaining position

2. **Retrieve Position Data**
   - Load the current position data based on the symbol
   - Retrieve all position history and update records
   - Get original trade plan details if available
   - Identify the trading strategy (Mancini or DP)

3. **Calculate Final Performance Metrics**
   - **Full Close Scenario:**
     - Calculate total P&L: `final_value - initial_value`
     - Determine P&L percentage: `P&L / initial_value * 100`
     - Calculate R-multiple: `P&L / initial_risk`
     - Compute holding period: `exit_time - entry_time`
     - Determine max favorable excursion (MFE): highest unrealized P&L
     - Determine max adverse excursion (MAE): lowest unrealized P&L
   
   - **Partial Close Scenario for Mancini Strategy:**
     - Calculate P&L for closed portion: `(exit_price - avg_entry) * exit_size`
     - Update remaining position size
     - Recalculate risk metrics for remaining position
     - Determine if partial close aligns with a specific target
     - Apply runner management if appropriate (after 2nd target)
     
   - **Partial Close Scenario for DP Strategy:**
     - For core positions: Track if closing the trading portion or adjusting the core
     - For level-based exits: Record the level that triggered the exit
     - Calculate P&L for closed portion
     - Update position state based on trading around core methodology

4. **Record Exit Details**
   - Store exit price, time, and reason
   - For full close, set position status to "closed"
   - For partial close, update position status appropriately based on strategy
   - Record exit in position history with timestamp

5. **Analyze Trade Performance**
   - Compare actual exit to planned targets/levels
   - Evaluate adherence to risk management rules
   - Assess overall trade quality
   - Identify key decision points

6. **Prepare Review Data**
   - Compile comprehensive trade data for review phase
   - Calculate performance metrics for trading journal
   - Generate initial trade lessons based on outcome
   - Prepare data for debrief session

7. **Update System State**
   - Remove position from active positions list (if fully closed)
   - Update system risk exposure metrics
   - Adjust available trading capital
   - Update trade history repository

## Output Format

The command returns a comprehensive close confirmation with performance metrics:

```
🏁 POSITION CLOSED: {SYMBOL} {DIRECTION}

Exit Details:
- Price: ${EXIT_PRICE}
- Time: {EXIT_TIME}
- Reason: {EXIT_REASON}
- Notes: {EXIT_NOTES}

Performance Summary:
- Entry: ${ENTRY_PRICE} on {ENTRY_TIME}
- P&L: ${TOTAL_PNL} ({PNL_PERCENTAGE}%)
- R-Multiple: {R_MULTIPLE}R
- Holding Period: {HOLDING_PERIOD}
- Max Favorable: ${MFE} ({MFE_PERCENTAGE}%)
- Max Adverse: ${MAE} ({MAE_PERCENTAGE}%)

Target Achievement:
- Target 1 (${TARGET1}): {TARGET1_STATUS}
- Target 2 (${TARGET2}): {TARGET2_STATUS}
- Target 3 (${TARGET3}): {TARGET3_STATUS}

Trade Plan Adherence:
- Entry: {ENTRY_ADHERENCE}
- Risk Management: {RISK_ADHERENCE}
- Exit Execution: {EXIT_ADHERENCE}
- Overall: {OVERALL_ADHERENCE}

Initial Notes: {INITIAL_NOTES}
```

### Partial Close Format

For partial closes, the output includes additional information:

```
🔄 PARTIAL CLOSE: {SYMBOL} {DIRECTION}

Exit Details:
- Price: ${EXIT_PRICE}
- Size: {EXIT_SIZE} of {INITIAL_SIZE} {UNIT}
- Realized P&L: ${REALIZED_PNL} ({REALIZED_PNL_PERCENTAGE}%)

Remaining Position:
- Size: {REMAINING_SIZE} {UNIT}
- Average Entry: ${AVG_ENTRY}
- Current Risk: ${CURRENT_RISK} ({RISK_PERCENTAGE}%)
- Updated Targets:
  1. ${TARGET1} - {TARGET1_STATUS} (Exit {TARGET1_PERCENTAGE}%)
  2. ${TARGET2} - {TARGET2_STATUS} (Exit {TARGET2_PERCENTAGE}%)
  3. ${TARGET3} - {TARGET3_STATUS} (Exit {TARGET3_PERCENTAGE}%)

Target Reached: {TARGET_REACHED}
```

## Example Usage

```
/close-position AAPL exit_price=227.50 reason="target" notes="First target reached, cleanly executed"
```

## Example Response

```
🏁 POSITION CLOSED: AAPL LONG

Exit Details:
- Price: $227.50
- Time: 2025-05-15T14:45:23Z
- Reason: target
- Notes: First target reached, cleanly executed

Performance Summary:
- Entry: $225.50 on 2025-05-15T10:30:00Z
- P&L: +$200.00 (+0.89%)
- R-Multiple: 1.18R
- Holding Period: 4h 15m 23s
- Max Favorable: $227.75 (+1.00%)
- Max Adverse: $224.80 (-0.31%)

Target Achievement:
- Target 1 ($227.50): Hit
- Target 2 ($229.00): Missed
- Target 3 ($232.00): Missed

Trade Plan Adherence:
- Entry: Aligned with plan
- Risk Management: Maintained initial stop
- Exit Execution: Exited at planned target
- Overall: Strong adherence

Initial Notes: Breaking out of bull flag pattern with strong volume
```

## Partial Close Example

```
/close-position AAPL exit_price=227.50 size=75 reason="target" notes="Taking profit at first target on 75% of position"
```

```
🔄 PARTIAL CLOSE: AAPL LONG

Exit Details:
- Price: $227.50
- Size: 75 of 100 shares
- Realized P&L: +$150.00 (+0.89%)

Remaining Position:
- Size: 25 shares
- Average Entry: $225.50
- Current Risk: $42.50 (0.75%)
- Updated Targets:
  1. $227.50 - hit (Exit 75%)
  2. $229.00 - pending (Exit 15%)
  3. $232.00 - pending (Exit 10%)

Target Reached: Target 1 Complete (75% exit)
```

## Error Handling

The command will return specific error messages for various issues:

- Position not found: "Error: No active position found for symbol '{SYMBOL}'"
- Invalid exit price: "Error: Exit price must be a valid number"
- Invalid size: "Error: Exit size cannot exceed current position size: {CURRENT_SIZE}"
- Already closed: "Error: Position for {SYMBOL} is already closed"
- Invalid reason: "Error: Reason must be one of: 'target', 'stop', 'discretionary', 'time', 'signal'"

## Exit Reason Types

The command supports the following exit reason types:

- `target`: Position closed at a planned profit target
- `stop`: Position stopped out at stop loss level
- `discretionary`: Discretionary exit based on trader decision
- `time`: Time-based exit (holding period completed)
- `signal`: Exit based on technical signal or indicator
- `scale`: Scaling out of position
- `character`: Exit due to character change
- `news`: Exit due to news or event
- `error`: Exit due to error or mistake

## Trade Plan Adherence Assessment

The close-position command evaluates trade execution against the original plan:

1. **Entry Adherence**
   - Measures how closely the entry matched the planned entry zone
   - Evaluates entry timing relative to recommended conditions
   - Assesses entry execution quality

2. **Risk Management Adherence**
   - Evaluates stop loss placement and adjustments
   - Assesses position sizing relative to plan
   - Measures target spacing and appropriateness

3. **Exit Execution Adherence**
   - Evaluates exit timing and price
   - Assesses profit-taking strategy implementation
   - Measures adherence to 75/15/10 rule

4. **Overall Adherence**
   - Composite score of all adherence metrics
   - Categorized as "Strong", "Moderate", or "Poor"
   - Includes specific improvement recommendations

## Implementation Notes

- The close-position command supports both trading methodologies:
  - **Mancini Strategy**: Supports the 75/15/10 rule with target-based exits and runner management
  - **DP Strategy**: Handles "trading around a core" with level-based exits and core position management
- For positions with multiple partial exits, the system tracks cumulative performance
- The trade plan adherence assessment promotes disciplined trading habits
- All trade data is preserved for review phase analysis
- The command checks for target/level achievement before closing to maintain accurate records
- When appropriate, the system will provide preliminary trade lessons based on outcome
- The close-position command integrates with the log-trade system to streamline the review process
- For DP core positions, the command distinguishes between closing the trading portion and adjusting the core position
