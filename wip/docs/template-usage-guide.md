# Intent Trader Schema Template Usage Guide

This guide explains how to use the provided templates to create new state files for the Intent Trader v0.5.2 system.

## Basic Template Usage

1. **Copy the template file** to create a new file with an appropriate name (e.g., `trade-plan-state.json`, `my-positions.json`).
2. **Replace placeholder values** such as:
   - `YYYYMMDD` with the actual date (e.g., `20250521`)
   - `SYMBOL` with the actual ticker symbol (e.g., `AAPL`)
   - `XX` with a sequence number (e.g., `01`, `02`)
   - Timestamps with actual ISO 8601 formatted timestamps (e.g., `2025-05-21T09:30:00Z`)
3. **Fill in required data** specific to your use case.
4. **Validate** the file against the canonical schema before use.

## Template-Specific Instructions

### Trade Plan Template

The trade plan template provides the basic structure for a daily trading plan:

1. Update all date-related fields with the current date.
2. Fill in the market framework section with the current market bias, mode, and catalysts.
3. Add support and resistance levels to the level framework.
4. Insert trade ideas using the trade idea template.
5. Define scenarios based on market conditions.
6. Adjust risk management parameters if needed.

Example of adding a support level:
```json
"support": [
  {
    "price": 5900,
    "notes": "Previous day's low",
    "type": "major",
    "strength": "strong"
  }
]
```

### Position Template

The position template provides the structure for adding new trading positions:

1. Update the ID with the current date and symbol.
2. Fill in entry details including price, date, and quantity (either shares or contracts).
3. Set stop and target prices.
4. Set appropriate classification flags to `true` based on the setup.
5. Update notes with relevant details.

For option positions:
- Use `contracts` instead of `shares`.
- Include option details (expiration, strike, type) in the notes field.

### Transaction Log Template

The transaction log template is used to track all trading activities:

1. Create a new log for each trading day.
2. Add entry transactions when opening positions.
3. Add exit transactions when closing positions.
4. Ensure all transactions reference valid position IDs.

Example transaction types:
- `entry`: Opening a new position
- `exit`: Closing a position
- `partial_exit`: Taking partial profits
- `stop_out`: Position stopped out
- `target_hit`: Position reached target

### Conversation Context Template

The conversation context template maintains state for the natural language interface:

1. Initialize at the start of each trading session.
2. Set the active plan and session IDs.
3. Update the focused symbols list based on the plan.
4. The system will automatically populate command and intent history.

## Field Descriptions

### Common Fields

- `schemaVersion`: Always set to "0.5.2"
- `id`: Unique identifier following the pattern specified
- `source`: Origin system (e.g., "manual", "system", "dp")
- `timestamp`: ISO 8601 formatted timestamp

### Classifications

Set appropriate classification flags to `true` based on the trade setup:

- `isBreakout`: Trade involves a breakout pattern
- `isReversal`: Trade involves a reversal pattern
- `isFlagPattern`: Trade involves a flag pattern
- `isFailedBreakdown`: Trade involves a failed breakdown pattern
- `isEarningsPlay`: Trade is related to earnings announcement
- `isDayAfterTrade`: Trade is a day-after-earnings play
- `isTrendFollow`: Trade follows the existing trend
- `isRangePlay`: Trade plays a range-bound pattern
- `isGapFill`: Trade targets filling a gap
- `isMomentumPlay`: Trade follows strong momentum

## Best Practices

1. Always include all required fields, even if null.
2. Use the boolean classification system rather than text descriptions.
3. Maintain a maximum of 3-level nesting depth.
4. Use consistent naming conventions.
5. Include meaningful IDs that convey date, symbol, and sequence information.
6. Ensure related objects reference each other correctly through IDs.

## Schema Validation

Before using the generated state files, validate them against the canonical schema to ensure compliance:

1. Use a JSON schema validator tool.
2. Reference the `intent-trader-master-schema.json` file.
3. Fix any validation errors before deployment.

## Example Workflow

1. At the start of a trading day:
   - Create a new trade plan using the trade plan template.
   - Initialize a new conversation context.
   - Initialize an empty transaction log.

2. When adding a new trade idea:
   - Use the trade idea template.
   - Add it to the trade plan's `tradeIdeas` array.

3. When entering a position:
   - Create a new position using the position template.
   - Add an entry transaction to the transaction log.
   - Update the conversation context with the new focused symbol.

4. When exiting a position:
   - Update the position with exit details.
   - Add an exit transaction to the transaction log.
   - Update profit calculations.
