---
command: list-positions
version: 1.0.0
phase: manage
domain: position-management
description: Show all current positions with status
author: Intent Trader Team
date: 2025-05-15
---

# Position Manager: List Positions

## Purpose
The `/list-positions` command displays active trading positions from the specified position tracking file, showing their current status and performance metrics.

## Input Parameters

| Parameter | Required | Description | Format | Default |
|-----------|----------|-------------|--------|---------|
| `owner` | No | Position owner to display | String: "me", "moderator", "all" | "me" |
| `status` | No | Filter positions by status | String: "active", "all" | "active" |
| `sort` | No | Sort order for positions | String: "entry", "p&l", "symbol", "risk" | "entry" |
| `format` | No | Output display format | String: "detailed", "summary" | "summary" |

## Processing Logic

1. **Load Position Data**
   - Based on owner parameter, load from:
     - "me": `state/my-positions.json`
     - "moderator": `state/ic-moderator-positions.json`
     - "all": Both files
   - Filter by status if specified

2. **Update Position Values**
   - Calculate current P&L for each position
   - Calculate risk metrics
   - Determine target status

3. **Sort Positions**
   - Apply requested sorting method
   - Calculate aggregate metrics

4. **Format Output**
   - Generate response in requested format

## Response Format

### Summary Format (Default)

```
📊 POSITIONS: {TOTAL_COUNT} | Risk: ${TOTAL_RISK} | P&L: ${TOTAL_PNL}

{SYMBOL} ({DIRECTION}) | ${CURRENT_PRICE} | ${PNL} ({PNL_PERCENTAGE}%) | Size: {CURRENT_SIZE} | Stop: ${STOP_PRICE}
{SYMBOL} ({DIRECTION}) | ${CURRENT_PRICE} | ${PNL} ({PNL_PERCENTAGE}%) | Size: {CURRENT_SIZE} | Stop: ${STOP_PRICE}
[Additional positions in same format]
```

### Detailed Format

```
📊 CURRENT POSITIONS: {TOTAL_COUNT} ({ACTIVE_COUNT} active)

Total Exposure: ${TOTAL_VALUE}
Total Risk: ${TOTAL_RISK} ({RISK_PERCENTAGE}% of account)
Unrealized P&L: ${TOTAL_PNL} ({PNL_PERCENTAGE}%)

----- POSITIONS -----

Symbol: {SYMBOL} ({DIRECTION})
ID: {POSITION_ID}
Owner: {OWNER}
Status: {STATUS}
Entry: ${ENTRY_PRICE} at {ENTRY_TIME}
Current: ${CURRENT_PRICE} (${PNL}, {PNL_PERCENTAGE}%)
Size: {CURRENT_SIZE}/{INITIAL_SIZE} {UNIT}
Stop: ${STOP_PRICE} (Risk: ${RISK_AMOUNT})
Targets: 
  1. ${TARGET1} - {TARGET1_STATUS}
  2. ${TARGET2} - {TARGET2_STATUS}
  3. ${TARGET3} - {TARGET3_STATUS}
Setup: {SETUP_TYPE}
Strategy: {STRATEGY}
Notes: {NOTES}

[Additional positions follow the same format]
```

## Example Usage

```
/list-positions owner=all status=active format=summary
```

## Example Response

```
📊 POSITIONS: 4 | Risk: $1,450.00 | P&L: $875.50

AAPL (LONG) | $227.25 | +$175.00 (+0.78%) | Size: 100 | Stop: $223.80 | Owner: me
MSFT (LONG) | $415.75 | +$325.50 (+1.6%) | Size: 50 | Stop: $409.30 | Owner: me
SPY (SHORT) | $499.25 | +$375.00 (+1.5%) | Size: 50 | Stop: $507.75 | Owner: moderator
QQQ (LONG) | $441.35 | +$0.00 (0.0%) | Size: 75 | Stop: $438.50 | Owner: moderator
```

## Error Handling

- Invalid owner parameter: "Error: Owner must be 'me', 'moderator', or 'all'"
- Invalid status parameter: "Error: Status must be 'active' or 'all'"
- Invalid sort parameter: "Error: Sort must be 'entry', 'p&l', 'symbol', or 'risk'"
- Invalid format parameter: "Error: Format must be 'detailed' or 'summary'"
- No positions found: "No positions found matching the specified criteria"
- File not found: "No position data found for {OWNER}. Use /add-position to create positions."
