---
command: add-position
version: 1.0.0
phase: execute
domain: position-management
description: Add a new trading position to the tracking system
author: Intent Trader Team
date: 2025-05-15
---

# Position Manager: Add Position

## Purpose
The `/add-position` command creates and registers a new trading position in the Intent Trader system. It captures essential trade parameters including entry price, size, stop loss, and profit targets while calculating initial risk metrics. This command is the foundation of the position management system and begins the lifecycle tracking of a trade.

## Input Parameters

| Parameter | Required | Description | Format |
|-----------|----------|-------------|--------|
| `symbol` | Yes | Stock/instrument symbol | String (e.g., "AAPL") |
| `direction` | Yes | Trade direction | String: "long" or "short" |
| `entry` | Yes | Entry price | Number (e.g., 225.50) |
| `size` | Yes | Position size | Number (e.g., 100) |
| `stop` | Yes | Initial stop loss | Number (e.g., 223.80) |
| `targets` | Yes | Profit targets | Comma-separated numbers (e.g., "227.50,229.00,232.00") |
| `unit` | No | Position unit type | String: "shares" or "contracts" (default: "shares") |
| `setup` | No | Setup type | String (e.g., "bull-flag", "failed-breakdown") |
| `strategy` | No | Trading strategy | String: "dp" or "mancini" (default: "dp") |
| `trade_type` | No | Type of trade | String: "day", "swing", "core" (default: "day") |
| `notes` | No | Trade reasoning | String |

## Processing Logic

1. **Validate Input Parameters**
   - Check that all required parameters are provided
   - Verify that entry, size, stop, and targets are valid numbers
   - Confirm that direction is either "long" or "short"
   - Validate that targets are appropriate for the direction (above entry for long, below for short)

2. **Generate Position ID**
   - Create a unique identifier using the format: `{SYMBOL}-{DATE}-{COUNTER}`
   - Example: "AAPL-20250515-001"

3. **Calculate Risk Metrics**
   - Compute initial risk amount:
     - For long positions: `(entry - stop) * size`
     - For short positions: `(stop - entry) * size`
   - Calculate risk percentage: `initialRisk / (entry * size) * 100`

4. **Format Targets with Status**
   - Parse targets string into array of target objects
   - Assign target allocation based on trading system:
     - For Mancini strategy positions: Apply 75/15/10 rule (75% first target, 15% second target, 10% runner)
     - For DP strategy positions: Create targets without predefined exit sizes (for level-based exits)
   - Set all target statuses to "pending"

5. **Create Position Object**
   - Assemble complete position object with all required fields
   - Set status to "active"
   - Set current price equal to entry price initially
   - Initialize P&L values to zero

6. **Store Position Data**
   - Add position to the active positions list
   - Update system state to reflect new position

7. **Verify Trade Plan Alignment**
   - Check if position matches any planned trades from the unified trade plan
   - Flag any deviations from the plan

## Output Format

The command returns a confirmation with the created position details in the following format:

```
📋 POSITION ADDED: {SYMBOL} {DIRECTION}

ID: {POSITION_ID}
Entry: ${ENTRY_PRICE}
Size: {SIZE} {UNIT}
Stop: ${STOP_PRICE} (-${RISK_AMOUNT}, {RISK_PERCENT}%)

🎯 Targets:
1. ${TARGET1} (+${TARGET1_GAIN}, {TARGET1_GAIN_PERCENT}%) - Exit {TARGET1_PERCENTAGE}%
2. ${TARGET2} (+${TARGET2_GAIN}, {TARGET2_GAIN_PERCENT}%) - Exit {TARGET2_PERCENTAGE}%
3. ${TARGET3} (+${TARGET3_GAIN}, {TARGET3_GAIN_PERCENT}%) - Exit {TARGET3_PERCENTAGE}%

Setup: {SETUP_TYPE}
Notes: {TRADE_NOTES}

✅ Position tracking activated
```

## Example Usage

```
/add-position AAPL long entry=225.50 size=100 stop=223.80 targets=227.50,229.00,232.00 setup=bull-flag strategy=mancini notes="Breaking out of bull flag pattern with strong volume"
```

```
/add-position AAPL long entry=225.50 size=100 stop=223.80 targets=227.50,229.00,232.00 setup=focus-idea strategy=dp trade_type=core notes="DP focus idea from morning call, trading around core position"
```

## Example Response

```
📋 POSITION ADDED: AAPL LONG

ID: AAPL-20250515-001
Entry: $225.50
Size: 100 shares
Stop: $223.80 (-$170.00, 0.75%)

🎯 Targets:
1. $227.50 (+$200.00, 0.89%) - Exit 75%
2. $229.00 (+$350.00, 1.55%) - Exit 15%
3. $232.00 (+$650.00, 2.88%) - Exit 10%

Setup: bull-flag
Notes: Breaking out of bull flag pattern with strong volume

✅ Position tracking activated
```

## Position Object Format

The command creates and stores a position object with the following structure:

```json
{
  "id": "AAPL-20250515-001",
  "symbol": "AAPL",
  "direction": "long",
  "entry": {
    "price": 225.50,
    "time": "2025-05-15T10:30:00Z",
    "condition": "Breaking out of bull flag pattern with strong volume"
  },
  "current": {
    "price": 225.50,
    "pnl": 0,
    "pnlPercent": 0
  },
  "risk": {
    "stop": 223.80,
    "initialRisk": 170.00,
    "riskPercent": 0.75
  },
  "targets": [
    {"price": 227.50, "percentage": 75, "status": "pending"},
    {"price": 229.00, "percentage": 15, "status": "pending"},
    {"price": 232.00, "percentage": 10, "status": "pending"}
  ],
  "size": {
    "initial": 100,
    "current": 100,
    "unit": "shares"
  },
  "status": "active",
  "setup": "bull-flag",
  "strategy": "mancini",
  "trade_type": "day",
  "notes": "Breaking out of bull flag pattern with strong volume"
}
```

For DP strategy positions using the "trading around a core" method:

```json
{
  "id": "AAPL-20250515-002",
  "symbol": "AAPL",
  "direction": "long",
  "entry": {
    "price": 225.50,
    "time": "2025-05-15T10:30:00Z",
    "condition": "DP focus idea from morning call, trading around core position"
  },
  "current": {
    "price": 225.50,
    "pnl": 0,
    "pnlPercent": 0
  },
  "risk": {
    "stop": 223.80,
    "initialRisk": 170.00,
    "riskPercent": 0.75
  },
  "targets": [
    {"price": 227.50, "percentage": null, "status": "pending"},
    {"price": 229.00, "percentage": null, "status": "pending"},
    {"price": 232.00, "percentage": null, "status": "pending"}
  ],
  "size": {
    "initial": 100,
    "current": 100,
    "core": 50,
    "trading": 50,
    "unit": "shares"
  },
  "status": "active",
  "setup": "focus-idea",
  "strategy": "dp",
  "trade_type": "core",
  "notes": "DP focus idea from morning call, trading around core position"
}
```

## Error Handling

The command will return specific error messages for various invalid inputs:

- Missing required parameters: "Error: Required parameter '{PARAM}' is missing"
- Invalid direction: "Error: Direction must be 'long' or 'short'"
- Invalid price format: "Error: '{PARAM}' must be a valid number"
- Invalid target direction: "Error: Targets must be above entry price for long positions"
- Invalid stop direction: "Error: Stop must be below entry price for long positions"

## Implementation Notes

- The command supports both trading methodologies:
  - **Mancini Strategy**: Implements the 75/15/10 rule for profit-taking with runner management
  - **DP Strategy**: Supports "trading around a core" method with level-based exits and flexible target management
- For DP core trades, the system tracks both the core position and the trading position separately
- The unique ID generation ensures each position can be tracked throughout its lifecycle
- The system records the exact time of position creation for accurate performance tracking
- Risk calculations provide immediate visibility into trade exposure
- The position object structure supports all subsequent position management operations
