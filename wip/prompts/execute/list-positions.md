---
command: list-positions
version: 1.0.0
phase: manage
domain: position-management
description: Show all current positions with status and performance metrics
author: Intent Trader Team
date: 2025-05-15
---

# Position Manager: List Positions

## Purpose
The `/list-positions` command displays all active trading positions with their current status, performance metrics, and management information. It provides a comprehensive view of the trader's current market exposure, helping them monitor positions, assess risk, and make informed management decisions throughout the trading day.

## Input Parameters

| Parameter | Required | Description | Format | Default |
|-----------|----------|-------------|--------|---------|
| `status` | No | Filter positions by status | String: "active", "pending", "all" | "active" |
| `sort` | No | Sort order for positions | String: "entry", "p&l", "symbol", "risk" | "entry" |
| `format` | No | Output display format | String: "detailed", "summary", "visual" | "detailed" |

## Processing Logic

1. **Retrieve Position Data**
   - Load all positions from the system state
   - Filter positions based on the status parameter:
     - "active": Only show positions with status "active"
     - "pending": Only show positions with status "pending"
     - "all": Show all positions regardless of status

2. **Update Current Values**
   - For each position, retrieve the current market price
   - Calculate current P&L:
     - For long positions: `(current_price - entry_price) * current_size`
     - For short positions: `(entry_price - current_price) * current_size`
   - Calculate P&L percentage: `P&L / (entry_price * initial_size) * 100`

3. **Calculate Aggregate Metrics**
   - Compute total position value across all positions
   - Determine total risk exposure: sum of `(current_price - stop) * current_size` for all active positions
   - Calculate total unrealized P&L across all positions
   - Determine largest gain and loss positions

4. **Apply Sorting**
   - Sort the position list according to the sort parameter:
     - "entry": Sort by entry timestamp (oldest first)
     - "p&l": Sort by current P&L (highest first)
     - "symbol": Sort alphabetically by ticker symbol
     - "risk": Sort by risk exposure (highest first)

5. **Format Output**
   - Generate the appropriate display format based on the format parameter:
     - "detailed": Comprehensive position information including all metrics
     - "summary": Condensed view with essential information only
     - "visual": Enhanced formatting with visual indicators of performance

## Output Format

### Detailed Format

```
📊 CURRENT POSITIONS: {TOTAL_COUNT} ({ACTIVE_COUNT} active)

Total Exposure: ${TOTAL_VALUE}
Total Risk: ${TOTAL_RISK} ({RISK_PERCENTAGE}% of account)
Unrealized P&L: ${TOTAL_PNL} ({PNL_PERCENTAGE}%)

----- POSITIONS -----

Symbol: {SYMBOL} ({DIRECTION})
ID: {POSITION_ID}
Status: {STATUS}
Entry: ${ENTRY_PRICE} at {ENTRY_TIME}
Current: ${CURRENT_PRICE} (${PNL}, {PNL_PERCENTAGE}%)
Size: {CURRENT_SIZE}/{INITIAL_SIZE} {UNIT}
Stop: ${STOP_PRICE} (Risk: ${RISK_AMOUNT})
Targets: 
  1. ${TARGET1} - {TARGET1_STATUS} (Exit {TARGET1_PERCENTAGE}%)
  2. ${TARGET2} - {TARGET2_STATUS} (Exit {TARGET2_PERCENTAGE}%)
  3. ${TARGET3} - {TARGET3_STATUS} (Exit {TARGET3_PERCENTAGE}%)
Setup: {SETUP_TYPE}
Notes: {NOTES}

[Additional positions follow the same format]
```

### Summary Format

```
📊 POSITIONS: {TOTAL_COUNT} | Risk: ${TOTAL_RISK} | P&L: ${TOTAL_PNL}

{SYMBOL} ({DIRECTION}) | ${CURRENT_PRICE} | ${PNL} ({PNL_PERCENTAGE}%) | Size: {CURRENT_SIZE} | Stop: ${STOP_PRICE}
{SYMBOL} ({DIRECTION}) | ${CURRENT_PRICE} | ${PNL} ({PNL_PERCENTAGE}%) | Size: {CURRENT_SIZE} | Stop: ${STOP_PRICE}
[Additional positions in same format]
```

### Visual Format

```
📊 POSITION DASHBOARD

🟢 Profitable: {PROFIT_COUNT} | 🔴 Losing: {LOSS_COUNT} | ⚪ Breakeven: {EVEN_COUNT}
Total P&L: ${TOTAL_PNL} ({PNL_PERCENTAGE}%) | Risk Exposure: ${TOTAL_RISK}

{SYMBOL} {DIRECTION} | Entry: ${ENTRY} | Current: ${CURRENT}
[▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░] {PNL_PERCENTAGE}% | Size: {SIZE} | Stop: ${STOP}
Targets: ${TARGET1}(75%) - ${TARGET2}(15%) - ${TARGET3}(10%)

[Additional positions with visual indicators]
```

## Example Usage

```
/list-positions status=active sort=p&l format=summary
```

## Example Response

```
📊 POSITIONS: 4 | Risk: $1,450.00 | P&L: $875.50 (1.2%)

AAPL (LONG) | $227.25 | +$175.00 (+0.78%) | Size: 100 | Stop: $223.80
MSFT (LONG) | $415.75 | +$325.50 (+1.6%) | Size: 50 | Stop: $409.30
SPY (SHORT) | $499.25 | +$375.00 (+1.5%) | Size: 50 | Stop: $507.75
QQQ (LONG) | $441.35 | +$0.00 (0.0%) | Size: 75 | Stop: $438.50
```

## Error Handling

The command will return specific error messages for various issues:

- Invalid status parameter: "Error: Status must be 'active', 'pending', or 'all'"
- Invalid sort parameter: "Error: Sort must be 'entry', 'p&l', 'symbol', or 'risk'"
- Invalid format parameter: "Error: Format must be 'detailed', 'summary', or 'visual'"
- No positions found: "No positions matching the specified criteria"

## Position Status Indicators

The command uses the following status indicators when displaying positions:

- Active: Regular position being actively managed
- Pending: Position with orders placed but not yet executed
- Partial: Position that has been partially closed
- Scaling: Position with multiple entry tranches
- Runner: Position in extended management after initial targets hit
- Closed: Completely exited position (only shown when status=all)

## Implementation Notes

- The command automatically refreshes current prices when displayed
- P&L calculations include commissions and fees if tracked by the system
- The visual format uses proportional indicators to show performance relative to targets
- The system will highlight positions requiring immediate attention (e.g., approaching stop or target)
- Risk exposure calculations consider current position size after any partial exits
- Total risk exposure includes correlation effects between related positions
- The command integrates with the 75/15/10 rule framework to show progress toward target exits
