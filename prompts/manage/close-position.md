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
The `/close-position` command terminates a trading position, records exit details, and calculates performance metrics.

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

4. **Save Updated Position**
   - Write the updated position back to the appropriate file
   - Archive closed positions if needed

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

## Error Handling

- Position not found: "Error: No active position found for symbol '{SYMBOL}' owned by {OWNER}"
- Invalid exit price: "Error: Exit price must be a valid number"
- Invalid size: "Error: Exit size cannot exceed current position size: {CURRENT_SIZE}"
- Already closed: "Error: Position for {SYMBOL} is already closed"
- Storage error: "Error: Failed to save closed position to {FILE_PATH}"
