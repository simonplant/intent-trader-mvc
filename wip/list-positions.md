---
id: list-positions-v0.5.2
title: List Positions Command
description: Displays all active trading positions with current status and performance metrics
author: Intent Trader Team
version: 1.0.1
release: 0.5.2
created: 2025-05-15
updated: 2025-05-21
category: manage
status: stable
tags: [position-management, trade-tracking, reporting, performance-metrics]
requires: [system/schemas/intent-trader-master-schema.json, system/schemas/intent-trader-runtime-schema.json]
outputs: []
input_format: command
output_format: markdown
ai_enabled: true
---

# Position Manager: List Positions

## Purpose
The `/list-positions` command displays active trading positions from the specified position tracking files, showing their current status and performance metrics. It provides flexible filtering, sorting, and formatting options to help traders monitor their positions effectively.

## Input Parameters

| Parameter | Required | Description | Format | Default |
|-----------|----------|-------------|--------|---------|
| `owner` | No | Position owner to display | String: "me", "moderator", "all" | "me" |
| `status` | No | Filter positions by status | String: "active", "all" | "active" |
| `sort` | No | Sort order for positions | String: "entry", "p&l", "symbol", "risk" | "entry" |
| `format` | No | Output display format | String: "detailed", "summary" | "summary" |
| `filter` | No | Filter by classification | String: comma-separated flags | None |

## Processing Logic

1. **Load Position Data**
   - Based on owner parameter, load from:
     - "me": `state/my-positions.json`
     - "moderator": `state/ic-moderator-positions.json`
     - "all": Both files
   - Filter by status if specified

2. **Apply Classification Filters**
   - If filter parameter is provided, filter positions by classification flags
   - Support multiple classification flags with AND/OR logic
   - Example: `filter=isBreakout,isMomentumPlay` filters for positions with either classification

3. **Update Position Values**
   - Calculate current P&L for each position
   - Calculate risk metrics
   - Determine target status

4. **Sort Positions**
   - Apply requested sorting method
   - Calculate aggregate metrics
   - Group by specified criteria (if applicable)

5. **Format Output**
   - Generate response in requested format
   - Include summary statistics
   - Format numbers for readability

## Response Format

### Summary Format (Default)

```
📊 POSITIONS: {TOTAL_COUNT} | Risk: ${TOTAL_RISK} | P&L: ${TOTAL_PNL}

{SYMBOL} ({DIRECTION}) | ${CURRENT_PRICE} | ${PNL} ({PNL_PERCENTAGE}%) | Size: {CURRENT_SIZE} | Stop: ${STOP_PRICE} | Owner: {OWNER}
{SYMBOL} ({DIRECTION}) | ${CURRENT_PRICE} | ${PNL} ({PNL_PERCENTAGE}%) | Size: {CURRENT_SIZE} | Stop: ${STOP_PRICE} | Owner: {OWNER}
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
Classifications: {ACTIVE_CLASSIFICATIONS}
Notes: {NOTES}

[Additional positions follow the same format]
```

## Example Usage

```
/list-positions owner=all status=active format=summary
```

```
/list-positions owner=me filter=isMomentumPlay,isTrendFollow sort=p&l format=detailed
```

## Example Response

```
📊 POSITIONS: 4 | Risk: $1,450.00 | P&L: $875.50

AAPL (LONG) | $227.25 | +$175.00 (+0.78%) | Size: 100 | Stop: $223.80 | Owner: me
MSFT (LONG) | $415.75 | +$325.50 (+1.6%) | Size: 50 | Stop: $409.30 | Owner: me
SPY (SHORT) | $499.25 | +$375.00 (+1.5%) | Size: 50 | Stop: $507.75 | Owner: moderator
QQQ (LONG) | $441.35 | +$0.00 (0.0%) | Size: 75 | Stop: $438.50 | Owner: moderator
```

## Implementation Details

### Position Loading and Filtering

```javascript
function listPositions(owner, status, sort, format, filter) {
  // Default values
  owner = owner || "me";
  status = status || "active";
  sort = sort || "entry";
  format = format || "summary";
  
  // Validate parameters
  if (!["me", "moderator", "all"].includes(owner)) {
    return {
      success: false,
      error: "Owner must be 'me', 'moderator', or 'all'"
    };
  }
  
  if (!["active", "all"].includes(status)) {
    return {
      success: false,
      error: "Status must be 'active' or 'all'"
    };
  }
  
  if (!["entry", "p&l", "symbol", "risk"].includes(sort)) {
    return {
      success: false,
      error: "Sort must be 'entry', 'p&l', 'symbol', or 'risk'"
    };
  }
  
  if (!["detailed", "summary"].includes(format)) {
    return {
      success: false,
      error: "Format must be 'detailed' or 'summary'"
    };
  }
  
  // Load positions
  let positions = [];
  let myPositions = [];
  let moderatorPositions = [];
  
  try {
    if (owner === "me" || owner === "all") {
      myPositions = JSON.parse(fs.readFileSync("state/my-positions.json", 'utf8'));
      myPositions.forEach(p => p.owner = "me");
      positions = positions.concat(myPositions);
    }
    
    if (owner === "moderator" || owner === "all") {
      moderatorPositions = JSON.parse(fs.readFileSync("state/ic-moderator-positions.json", 'utf8'));
      moderatorPositions.forEach(p => p.owner = "moderator");
      positions = positions.concat(moderatorPositions);
    }
  } catch (e) {
    // Handle case where file doesn't exist
    if (positions.length === 0) {
      return {
        success: false,
        error: `No position data found for ${owner}. Use /add-position to create positions.`
      };
    }
  }
  
  // Filter by status
  if (status === "active") {
    positions = positions.filter(p => p.status === "open" || p.status === "partial");
  }
  
  // Filter by classification if specified
  if (filter) {
    const filters = filter.split(',').map(f => f.trim());
    positions = positions.filter(p => {
      // At least one filter must match
      return filters.some(f => {
        return p.classifications && p.classifications[f] === true;
      });
    });
  }
  
  // If no positions match criteria
  if (positions.length === 0) {
    return {
      success: true,
      positions: [],
      message: "No positions found matching the specified criteria"
    };
  }
  
  // Calculate current metrics for each position
  positions.forEach(p => {
    // Use current price if available, otherwise use entry price
    const currentPrice = p.currentPrice || p.entry.price;
    
    // Calculate P&L
    const size = p.entry.shares || p.entry.contracts;
    const pnl = p.direction === "long"
      ? (currentPrice - p.entry.price) * size
      : (p.entry.price - currentPrice) * size;
    
    const pnlPercentage = p.direction === "long"
      ? ((currentPrice - p.entry.price) / p.entry.price) * 100
      : ((p.entry.price - currentPrice) / p.entry.price) * 100;
    
    // Calculate risk if stop is set
    let risk = null;
    if (p.stop) {
      risk = p.direction === "long"
        ? (p.entry.price - p.stop) * size
        : (p.stop - p.entry.price) * size;
    }
    
    // Add calculated metrics
    p.calculatedMetrics = {
      currentPrice: currentPrice,
      pnl: pnl,
      pnlPercentage: pnlPercentage,
      risk: risk
    };
    
    // Determine unit type
    p.unit = p.entry.shares ? "shares" : "contracts";
  });
  
  // Sort positions
  switch (sort) {
    case "entry":
      positions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      break;
    case "p&l":
      positions.sort((a, b) => b.calculatedMetrics.pnl - a.calculatedMetrics.pnl);
      break;
    case "symbol":
      positions.sort((a, b) => a.symbol.localeCompare(b.symbol));
      break;
    case "risk":
      // Sort by risk, but put null risk (no stop) at the end
      positions.sort((a, b) => {
        if (a.calculatedMetrics.risk === null) return 1;
        if (b.calculatedMetrics.risk === null) return -1;
        return b.calculatedMetrics.risk - a.calculatedMetrics.risk;
      });
      break;
  }
  
  // Calculate aggregate metrics
  const totalValue = positions.reduce((sum, p) => {
    const size = p.entry.shares || p.entry.contracts;
    return sum + (p.entry.price * size);
  }, 0);
  
  const totalRisk = positions.reduce((sum, p) => {
    return sum + (p.calculatedMetrics.risk || 0);
  }, 0);
  
  const totalPnl = positions.reduce((sum, p) => {
    return sum + p.calculatedMetrics.pnl;
  }, 0);
  
  const totalPnlPercentage = (totalPnl / totalValue) * 100;
  
  // Format numbers
  const formatCurrency = num => {
    if (num === null) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };
  
  const formatPercent = num => {
    if (num === null) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num / 100);
  };
  
  // Format output
  const result = {
    success: true,
    positions: positions,
    metrics: {
      totalCount: positions.length,
      activeCount: positions.filter(p => p.status === "open").length,
      totalValue: totalValue,
      totalRisk: totalRisk,
      totalPnl: totalPnl,
      totalPnlPercentage: totalPnlPercentage
    }
  };
  
  return result;
}

// Helper function to format positions for display
function formatPositionsOutput(result, format) {
  if (!result.success) {
    return `Error: ${result.error}`;
  }
  
  const { positions, metrics } = result;
  
  if (positions.length === 0) {
    return result.message || "No positions found.";
  }
  
  // Format numbers
  const formatCurrency = num => {
    if (num === null || num === undefined) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };
  
  const formatNumber = num => {
    if (num === null || num === undefined) return "N/A";
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(num);
  };
  
  const formatPercent = num => {
    if (num === null || num === undefined) return "N/A";
    const prefix = num > 0 ? "+" : "";
    return `${prefix}${formatNumber(num)}%`;
  };
  
  if (format === "summary") {
    let output = `📊 POSITIONS: ${metrics.totalCount} | Risk: ${formatCurrency(metrics.totalRisk)} | P&L: ${formatCurrency(metrics.totalPnl)}\n\n`;
    
    positions.forEach(p => {
      const metrics = p.calculatedMetrics;
      const size = p.entry.shares || p.entry.contracts;
      
      output += `${p.symbol} (${p.direction.toUpperCase()}) | ${formatCurrency(metrics.currentPrice)} | `;
      output += `${formatCurrency(metrics.pnl)} (${formatPercent(metrics.pnlPercentage)}) | `;
      output += `Size: ${formatNumber(size)} | `;
      output += `Stop: ${p.stop ? formatCurrency(p.stop) : "N/A"} | `;
      output += `Owner: ${p.owner}\n`;
    });
    
    return output.trim();
    
  } else if (format === "detailed") {
    let output = `📊 CURRENT POSITIONS: ${metrics.totalCount} (${metrics.activeCount} active)\n\n`;
    output += `Total Exposure: ${formatCurrency(metrics.totalValue)}\n`;
    output += `Total Risk: ${formatCurrency(metrics.totalRisk)}\n`;
    output += `Unrealized P&L: ${formatCurrency(metrics.totalPnl)} (${formatPercent(metrics.totalPnlPercentage)})\n\n`;
    output += `----- POSITIONS -----\n\n`;
    
    positions.forEach(p => {
      const metrics = p.calculatedMetrics;
      const size = p.entry.shares || p.entry.contracts;
      const initialSize = p.entry.initialShares || p.entry.initialContracts || size;
      
      output += `Symbol: ${p.symbol} (${p.direction.toUpperCase()})\n`;
      output += `ID: ${p.id}\n`;
      output += `Owner: ${p.owner}\n`;
      output += `Status: ${p.status}\n`;
      output += `Entry: ${formatCurrency(p.entry.price)} at ${new Date(p.timestamp).toISOString()}\n`;
      output += `Current: ${formatCurrency(metrics.currentPrice)} (${formatCurrency(metrics.pnl)}, ${formatPercent(metrics.pnlPercentage)})\n`;
      output += `Size: ${formatNumber(size)}/${formatNumber(initialSize)} ${p.unit}\n`;
      output += `Stop: ${p.stop ? formatCurrency(p.stop) : "N/A"}${p.stop ? ` (Risk: ${formatCurrency(metrics.risk)})` : ""}\n`;
      
      // Display targets if available
      if (p.targets && p.targets.length > 0) {
        output += "Targets:\n";
        p.targets.forEach((target, i) => {
          const status = p.targetStatus && p.targetStatus[i] ? p.targetStatus[i] : "pending";
          output += `  ${i + 1}. ${formatCurrency(target)} - ${status}\n`;
        });
      }
      
      output += `Setup: ${p.setup || "N/A"}\n`;
      output += `Strategy: ${p.strategy || "N/A"}\n`;
      
      // Display active classifications
      const activeClasses = p.classifications ? 
        Object.entries(p.classifications)
          .filter(([_, value]) => value === true)
          .map(([key, _]) => key)
        : [];
        
      output += `Classifications: ${activeClasses.length > 0 ? activeClasses.join(", ") : "None"}\n`;
      output += `Notes: ${p.notes || "None"}\n\n`;
    });
    
    return output.trim();
  }
}
```

## Error Handling

The command implements comprehensive error handling for various failure cases:

- Invalid owner parameter: "Error: Owner must be 'me', 'moderator', or 'all'"
- Invalid status parameter: "Error: Status must be 'active' or 'all'"
- Invalid sort parameter: "Error: Sort must be 'entry', 'p&l', 'symbol', or 'risk'"
- Invalid format parameter: "Error: Format must be 'detailed' or 'summary'"
- No positions found: "No positions found matching the specified criteria"
- File not found: "No position data found for {OWNER}. Use /add-position to create positions."

## Command Integration

The `/list-positions` command integrates with these other system components:

- Uses `intent-trader-master-schema.json` for object structure validation
- Reads position data from `state/my-positions.json` and `state/ic-moderator-positions.json`
- Works with position data added by `/add-position` and modified by `/update-position`
- Uses classification flags to enable Boolean filtering of positions
- Provides current position status for trading decisions
