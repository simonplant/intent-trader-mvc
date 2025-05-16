---
command: add-position
version: 1.0.0
phase: manage
domain: position-management
description: Add a new trading position to the tracking system
author: Intent Trader Team
date: 2025-05-15
---

# Position Manager: Add Position

## Purpose
The `/add-position` command creates and registers a new trading position in the Intent Trader system, storing it in the appropriate position tracking file based on the owner parameter.

## Input Parameters

| Parameter | Required | Description | Format |
|-----------|----------|-------------|--------|
| `symbol` | Yes | Stock/instrument symbol | String (e.g., "AAPL") |
| `direction` | Yes | Trade direction | String: "long" or "short" |
| `entry` | Yes | Entry price | Number (e.g., 225.50) |
| `size` | Yes | Position size | Number (e.g., 100) |
| `stop` | Yes | Initial stop loss | Number (e.g., 223.80) |
| `targets` | Yes | Profit targets | Comma-separated numbers (e.g., "227.50,229.00,232.00") |
| `setup` | No | Setup type | String (e.g., "bull-flag") |
| `strategy` | No | Trading strategy | String: "dp" or "mancini" (default: "dp") |
| `trade_type` | No | Type of trade | String: "day", "swing", "core" (default: "day") |
| `owner` | No | Position owner | String: "me", "moderator" (default: "me") |
| `notes` | No | Trade reasoning | String |

## Processing Logic

1. **Validate Inputs**
   - Check required parameters
   - Validate numeric values and direction
   - Ensure targets align with direction

2. **Create Position Object**
   - Generate unique ID: `{SYMBOL}-{DATE}-{COUNTER}`
   - Calculate risk metrics
   - Format targets based on strategy
   - Set initial status to "active"

3. **Store Position**
   - Determine storage location based on owner:
     - "me": `state/my-positions.json`
     - "moderator": `state/ic-moderator-positions.json`
   - Add position to appropriate file
   - Create file if it doesn't exist

## Response Format

```
📋 POSITION ADDED: {SYMBOL} {DIRECTION}

ID: {POSITION_ID}
Entry: ${ENTRY_PRICE}
Size: {SIZE} {UNIT}
Stop: ${STOP_PRICE} (-${RISK_AMOUNT}, {RISK_PERCENT}%)

🎯 Targets:
1. ${TARGET1} (+${TARGET1_GAIN})
2. ${TARGET2} (+${TARGET2_GAIN})
3. ${TARGET3} (+${TARGET3_GAIN})

Setup: {SETUP_TYPE}
Strategy: {STRATEGY}
Owner: {OWNER}
Notes: {TRADE_NOTES}

✅ Position saved to {FILE_PATH}
```

## Example Usage

```
/add-position AAPL long entry=225.50 size=100 stop=223.80 targets=227.50,229.00,232.00 setup=bull-flag strategy=mancini owner=me notes="Breaking out of bull flag pattern"
```

## Position Structure

```json
{
  "id": "AAPL-20250515-001",
  "symbol": "AAPL",
  "direction": "long",
  "entry": {
    "price": 225.50,
    "time": "2025-05-15T10:30:00Z",
    "condition": "Breaking out of bull flag pattern"
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
    {"price": 227.50, "status": "pending"},
    {"price": 229.00, "status": "pending"},
    {"price": 232.00, "status": "pending"}
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
  "owner": "me",
  "notes": "Breaking out of bull flag pattern"
}
```

## Error Handling

- Missing parameters: "Error: Required parameter '{PARAM}' is missing"
- Invalid direction: "Error: Direction must be 'long' or 'short'"
- Invalid price: "Error: '{PARAM}' must be a valid number"
- Invalid target direction: "Error: Targets must be above entry price for long positions"
- Storage error: "Error: Failed to save position to {FILE_PATH}"
