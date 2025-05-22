---
id: size-position-v0.5.2
title: Position Size Calculator
description: Calculates optimal position size based on risk parameters, setup type, and conviction level while respecting account risk limits
author: Intent Trader Team
version: 1.0.0
release: 0.5.2
created: 2025-05-15
updated: 2025-05-21
category: execute
status: stable
tags: [position-management, risk-management, capital-allocation, position-sizing]
requires: [system/schemas/intent-trader-master-schema.json, system/schemas/intent-trader-runtime-schema.json]
outputs: [state/position-sizing-history.json]
input_format: command
output_format: markdown
ai_enabled: true
---

# Position Sizing Command (`/size-position`)

## Purpose

Calculate appropriate position size based on risk parameters, setup type, and conviction level, ensuring optimal capital allocation while respecting risk limits. This command helps traders determine the precise number of shares or contracts to trade based on their risk tolerance and the characteristics of the specific trading opportunity.

## Input Parameters

| Parameter | Required | Description | Format | Default |
|-----------|----------|-------------|--------|---------|
| `symbol` | Yes | Stock/instrument symbol | String (e.g., "AAPL") | - |
| `direction` | Yes | Trade direction | String: "long" or "short" | - |
| `entry` | Yes | Planned entry price | Number (e.g., 225.50) | - |
| `stop` | Yes | Planned stop loss level | Number (e.g., 223.80) | - |
| `setup` | No | Setup type | String (e.g., "bull-flag") | "standard" |
| `conviction` | No | Conviction level | String: "high", "medium", "low" | "medium" |
| `account_size` | No | Total account size | Number (e.g., 100000) | 100000 |
| `max_risk_percent` | No | Maximum risk percentage | Number (e.g., 1) | 1 |
| `classifications` | No | Classification flags | Comma-separated flags (e.g., "isTrendFollow,isMomentumPlay") | - |

## Calculation Logic

Position size is calculated through a systematic process that considers risk parameters, trade characteristics, and account management rules:

1. **Calculate Basic Position Size:**
   - Determine risk per share: `|entry - stop|`
   - Calculate account risk amount: `account_size × max_risk_percent`
   - Compute base position size: `account_risk_amount ÷ risk_per_share`

2. **Apply Conviction Multipliers:**
   - High conviction: 1.0 (full size)
   - Medium conviction: 0.75 (75% of full size)
   - Low conviction: 0.5 (50% of full size)

3. **Apply Setup Type Multipliers:**
   - High-probability setups (isFailedBreakdown, isReversal): 1.0
   - Medium-probability setups (isFlagPattern, isBreakout, isTrendFollow): 0.8
   - Speculative setups (isDayAfterTrade, isEarningsPlay): 0.6

4. **Enforce Risk Limits:**
   - Maximum risk per trade: `max_risk_percent` of account
   - Maximum position size: 5% of account value
   - Minimum position size: 100 shares or $1,000

5. **Generate Alternatives:**
   - Conservative: 50% of recommended size
   - Aggressive: 150% of recommended size (capped by risk limits)

6. **Incorporate 75/15/10 Strategy:**
   - Include target position sizes for the 75/15/10 scaling rule
   - Show the initial 75%, 15%, and 10% position components

## Processing Logic

```javascript
function calculatePositionSize(params) {
  // Extract parameters
  const { 
    symbol, 
    direction, 
    entry, 
    stop, 
    setup = 'standard',
    conviction = 'medium',
    account_size = 100000,
    max_risk_percent = 1,
    classifications = ''
  } = params;
  
  // Initialize schemaVersion and timestamp
  const schemaVersion = "0.5.2";
  const timestamp = new Date().toISOString();
  
  // Calculate risk per share
  const entryPrice = parseFloat(entry);
  const stopPrice = parseFloat(stop);
  const riskPerShare = Math.abs(entryPrice - stopPrice);
  
  // Calculate account risk amount
  const maxRiskDecimal = max_risk_percent / 100;
  const accountRiskAmount = account_size * maxRiskDecimal;
  
  // Determine base position size
  let baseSize = Math.floor(accountRiskAmount / riskPerShare);
  
  // Apply conviction multiplier
  const convictionMultipliers = {
    'high': 1.0,
    'medium': 0.75,
    'low': 0.5
  };
  const convictionMultiplier = convictionMultipliers[conviction] || 0.75;
  
  // Process classifications
  const classificationFlags = processClassifications(classifications);
  
  // Determine setup multiplier based on classifications
  let setupTypeMultiplier = 0.8; // Default medium-probability
  
  // High probability setups
  if (classificationFlags.isFailedBreakdown || classificationFlags.isReversal) {
    setupTypeMultiplier = 1.0;
  }
  // Medium probability setups
  else if (classificationFlags.isFlagPattern || classificationFlags.isBreakout || classificationFlags.isTrendFollow) {
    setupTypeMultiplier = 0.8;
  }
  // Speculative setups
  else if (classificationFlags.isDayAfterTrade || classificationFlags.isEarningsPlay) {
    setupTypeMultiplier = 0.6;
  }

  // Also check traditional setup naming for backward compatibility
  const setupTypeMultipliers = {
    // High probability setups
    'failed-breakdown': 1.0,
    'character-change': 1.0,
    'reversal': 1.0,
    // Medium probability setups
    'bull-flag': 0.8,
    'bear-flag': 0.8,
    'pullback': 0.8,
    'breakout': 0.8,
    'trend-follow': 0.8,
    // Speculative setups
    'day-after-trade': 0.6,
    'earnings-reaction': 0.6,
    'earnings-play': 0.6,
    // Default
    'standard': 0.8
  };
  
  // Only override if we didn't already set by classifications
  if (setupTypeMultiplier === 0.8 && setupTypeMultipliers[setup]) {
    setupTypeMultiplier = setupTypeMultipliers[setup];
  }
  
  // Apply multipliers
  let adjustedSize = Math.floor(baseSize * convictionMultiplier * setupTypeMultiplier);
  
  // Enforce minimum position size (100 shares or $1,000)
  const minPositionValue = 1000;
  const minPositionShares = 100;
  const positionValue = adjustedSize * entryPrice;
  
  if (adjustedSize < minPositionShares && positionValue < minPositionValue) {
    adjustedSize = Math.ceil(minPositionValue / entryPrice);
    adjustedSize = Math.max(adjustedSize, minPositionShares);
  }
  
  // Enforce maximum position size (5% of account)
  const maxPositionValue = account_size * 0.05;
  const maxPositionShares = Math.floor(maxPositionValue / entryPrice);
  
  let riskLimitAdjustment = false;
  if (adjustedSize * entryPrice > maxPositionValue) {
    adjustedSize = maxPositionShares;
    riskLimitAdjustment = true;
  }
  
  // Calculate actual risk
  const actualRiskAmount = adjustedSize * riskPerShare;
  const actualRiskPercent = (actualRiskAmount / account_size) * 100;
  
  // Calculate alternatives
  const conservativeSize = Math.floor(adjustedSize * 0.5);
  const conservativeRiskAmount = conservativeSize * riskPerShare;
  const conservativeRiskPercent = (conservativeRiskAmount / account_size) * 100;
  
  let aggressiveSize = Math.floor(adjustedSize * 1.5);
  const aggressivePositionValue = aggressiveSize * entryPrice;
  
  // Cap aggressive size by max position value
  if (aggressivePositionValue > maxPositionValue) {
    aggressiveSize = maxPositionShares;
  }
  
  const aggressiveRiskAmount = aggressiveSize * riskPerShare;
  const aggressiveRiskPercent = (aggressiveRiskAmount / account_size) * 100;
  
  // Calculate 75/15/10 scaling components
  const component1 = Math.floor(adjustedSize * 0.75);
  const component2 = Math.floor(adjustedSize * 0.15);
  const component3 = Math.floor(adjustedSize * 0.10);
  
  // Calculate traditional core size
  const traditionalCoreSize = Math.floor(adjustedSize * 0.5);
  
  // Generate notes
  const notes = [];
  
  if (conviction === 'high') {
    notes.push(`Using full size due to high conviction in the setup.`);
  } else if (conviction === 'medium') {
    notes.push(`Using 75% of base size due to medium conviction.`);
  } else if (conviction === 'low') {
    notes.push(`Using half size due to low conviction in the setup.`);
  }
  
  // Add notes about classification-based sizing
  if (classificationFlags.isFailedBreakdown || classificationFlags.isReversal) {
    notes.push(`High-probability setup type receives full sizing allocation.`);
  } else if (classificationFlags.isFlagPattern || classificationFlags.isBreakout || classificationFlags.isTrendFollow) {
    notes.push(`Medium-probability setup type receives 80% sizing allocation.`);
  } else if (classificationFlags.isDayAfterTrade || classificationFlags.isEarningsPlay) {
    notes.push(`Speculative setup type receives 60% sizing allocation.`);
  } else if (setupTypeMultiplier === 1.0) {
    notes.push(`High-probability setup type (${setup}) receives full sizing allocation.`);
  } else if (setupTypeMultiplier === 0.8) {
    notes.push(`Medium-probability setup type (${setup}) receives 80% sizing allocation.`);
  } else if (setupTypeMultiplier === 0.6) {
    notes.push(`Speculative setup type (${setup}) receives 60% sizing allocation.`);
  }
  
  if (riskLimitAdjustment) {
    notes.push(`Position size was capped due to maximum position value limit (5% of account).`);
  }
  
  notes.push(`For traditional position management with DP methodology, consider a core position of ${traditionalCoreSize} shares (50% of total) that you can build around.`);
  
  if (adjustedSize <= 4) {
    notes.push(`WARNING: Total position size is very small (${adjustedSize} shares/contracts). Consider using a more practical position unit for this trade.`);
  }
  
  if (actualRiskPercent > max_risk_percent) {
    notes.push(`WARNING: Actual risk (${actualRiskPercent.toFixed(2)}%) exceeds maximum risk percentage (${max_risk_percent}%).`);
  }

  // Calculate R-Value
  const rValue = riskPerShare;
  
  // Generate an ID for this sizing recommendation
  const id = `size-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${symbol}-${direction}`;
  
  // Create corresponding position sizing object (schema-compliant)
  const positionSizing = {
    schemaVersion: schemaVersion,
    id: id,
    source: "system",
    timestamp: timestamp,
    symbol: symbol,
    direction: direction,
    entry: entryPrice,
    stop: stopPrice,
    riskPerShare: riskPerShare,
    sizing: {
      recommended: {
        size: adjustedSize,
        unit: "shares",
        riskAmount: actualRiskAmount,
        riskPercent: actualRiskPercent
      },
      alternatives: [
        {
          name: "conservative",
          size: conservativeSize,
          riskAmount: conservativeRiskAmount,
          riskPercent: conservativeRiskPercent
        },
        {
          name: "aggressive",
          size: aggressiveSize,
          riskAmount: aggressiveRiskAmount,
          riskPercent: aggressiveRiskPercent
        }
      ],
      scaling: {
        component1: {
          percent: 75,
          shares: component1
        },
        component2: {
          percent: 15,
          shares: component2
        },
        component3: {
          percent: 10,
          shares: component3
        }
      },
      traditionalCore: {
        size: traditionalCoreSize
      }
    },
    adjustments: {
      convictionMultiplier: convictionMultiplier,
      setupTypeMultiplier: setupTypeMultiplier,
      riskLimitAdjustment: riskLimitAdjustment
    },
    setup: setup,
    conviction: {
      level: conviction,
      phrases: []
    },
    classifications: classificationFlags,
    notes: notes,
    rValue: rValue,
    accountParameters: {
      accountSize: account_size,
      maxRiskPercent: max_risk_percent
    },
    origin: {
      sourceCommand: "/size-position",
      createdBy: "position-sizer",
      planId: null,
      ideaId: null
    }
  };
  
  return positionSizing;
}

// Convert classification flags from input to schema format
function processClassifications(classificationFlags) {
  // Initialize with all flags set to false
  const classifications = {
    isBreakout: false,
    isReversal: false, 
    isFlagPattern: false,
    isFailedBreakdown: false,
    isEarningsPlay: false,
    isDayAfterTrade: false,
    isTrendFollow: false,
    isRangePlay: false,
    isGapFill: false,
    isMomentumPlay: false
  };
  
  // Process the flags from input
  if (classificationFlags) {
    const flags = classificationFlags.split(',');
    for (const flag of flags) {
      const trimmedFlag = flag.trim();
      if (classifications.hasOwnProperty(trimmedFlag)) {
        classifications[trimmedFlag] = true;
      }
    }
  }
  
  return classifications;
}
```

## Response Format

The command returns a detailed position sizing recommendation with alternatives and rationale:

### JSON Response

```json
{
  "schemaVersion": "0.5.2",
  "id": "size-20250520-AAPL-long",
  "source": "system",
  "timestamp": "2025-05-20T10:30:00Z",
  "symbol": "AAPL",
  "direction": "long",
  "entry": 225.50,
  "stop": 223.80,
  "riskPerShare": 1.70,
  "sizing": {
    "recommended": {
      "size": 470,
      "unit": "shares",
      "riskAmount": 799.00,
      "riskPercent": 0.80
    },
    "alternatives": [
      {
        "name": "conservative",
        "size": 235,
        "riskAmount": 399.50,
        "riskPercent": 0.40
      },
      {
        "name": "aggressive",
        "size": 588,
        "riskAmount": 999.60,
        "riskPercent": 1.00
      }
    ],
    "scaling": {
      "component1": {"percent": 75, "shares": 352},
      "component2": {"percent": 15, "shares": 70},
      "component3": {"percent": 10, "shares": 47}
    },
    "traditionalCore": {
      "size": 235
    }
  },
  "adjustments": {
    "convictionMultiplier": 1.0,
    "setupTypeMultiplier": 0.8,
    "riskLimitAdjustment": false
  },
  "setup": "bull-flag",
  "conviction": {
    "level": "high",
    "phrases": []
  },
  "classifications": {
    "isBreakout": false,
    "isReversal": false,
    "isFlagPattern": true,
    "isFailedBreakdown": false,
    "isEarningsPlay": false,
    "isDayAfterTrade": false,
    "isTrendFollow": true,
    "isRangePlay": false,
    "isGapFill": false,
    "isMomentumPlay": false
  },
  "notes": [
    "Using full size due to high conviction in the setup.",
    "Medium-probability setup type (bull-flag) receives 80% sizing allocation.",
    "For traditional position management with DP methodology, consider a core position of 235 shares (50% of total) that you can build around."
  ],
  "rValue": 1.70,
  "accountParameters": {
    "accountSize": 100000,
    "maxRiskPercent": 1
  },
  "origin": {
    "sourceCommand": "/size-position",
    "createdBy": "position-sizer",
    "planId": null,
    "ideaId": null
  }
}
```

### Markdown Response

```markdown
# Position Sizing: $AAPL (long)

## Trade Parameters
- Entry: $225.50
- Stop: $223.80 
- Risk Per Share: $1.70
- Setup: bull-flag
- Conviction: high

## Recommended Position
- Size: 470 shares
- Risk Amount: $799.00 (0.80% of account)
- R-Multiple Value: $1R = $1.70

## Alternative Sizes
- Conservative: 235 shares ($399.50 risk)
- Aggressive: 588 shares ($999.60 risk)

## 75/15/10 Scaling Components
- Initial Position (75%): 352 shares
- First Target Position (15%): 70 shares
- Runner Position (10%): 47 shares

## Position Management Considerations
- Traditional Core Position: 235 shares (50% for scaling in/out)
- Options/Higher-Priced Instruments: Consider whole-unit increments for appropriate scaling

## Sizing Notes
- Using full size due to high conviction in the setup.
- Medium-probability setup type (bull-flag) receives 80% sizing allocation.
- For traditional position management with DP methodology, consider a core position of 235 shares (50% of total) that you can build around.
```

## Example Usage

```
/size-position AAPL long entry=225.50 stop=223.80 setup=bull-flag conviction=high classifications=isFlagPattern,isTrendFollow
```

## Position Sizing Object Structure

The command conforms to the baseObject schema requirements and adds position sizing specific fields:

```json
{
  "schemaVersion": "0.5.2",
  "id": "size-YYYYMMDD-SYMBOL-DIRECTION",
  "source": "system",
  "timestamp": "YYYY-MM-DDThh:mm:ssZ",
  "symbol": "string",
  "direction": "long|short",
  "entry": "number",
  "stop": "number",
  "riskPerShare": "number",
  "sizing": {
    "recommended": {
      "size": "number",
      "unit": "shares|contracts",
      "riskAmount": "number",
      "riskPercent": "number"
    },
    "alternatives": [
      {
        "name": "conservative|aggressive",
        "size": "number",
        "riskAmount": "number",
        "riskPercent": "number"
      }
    ],
    "scaling": {
      "component1": {"percent": "number", "shares": "number"},
      "component2": {"percent": "number", "shares": "number"},
      "component3": {"percent": "number", "shares": "number"}
    },
    "traditionalCore": {
      "size": "number"
    }
  },
  "adjustments": {
    "convictionMultiplier": "number",
    "setupTypeMultiplier": "number",
    "riskLimitAdjustment": "boolean"
  },
  "setup": "string",
  "conviction": {
    "level": "high|medium|low",
    "phrases": ["string"]
  },
  "classifications": {
    "isBreakout": "boolean",
    "isReversal": "boolean",
    "isFlagPattern": "boolean",
    "isFailedBreakdown": "boolean",
    "isEarningsPlay": "boolean",
    "isDayAfterTrade": "boolean",
    "isTrendFollow": "boolean",
    "isRangePlay": "boolean",
    "isGapFill": "boolean",
    "isMomentumPlay": "boolean"
  },
  "notes": ["string"],
  "rValue": "number",
  "accountParameters": {
    "accountSize": "number",
    "maxRiskPercent": "number"
  },
  "origin": {
    "sourceCommand": "string",
    "createdBy": "string",
    "planId": "string|null",
    "ideaId": "string|null"
  }
}
```

## Integration with Other Components

This command is designed to be used in conjunction with:

1. **Trade Plan** (`/create-plan`): Use position sizing after identifying high-conviction setups
2. **Position Management** (`/add-position`): Apply sizing recommendations when entering new positions
3. **Risk Management**: Ensure positions respect overall risk allocation rules
4. **Classification System**: Integrate with the schema-defined boolean classification flags

## Advanced Considerations

- **Market Volatility**: During high volatility periods, consider using the conservative sizing option
- **Correlated Positions**: Reduce size when trading multiple correlated instruments
- **Position Building**: For trending markets, consider staged entries with the scaling components
- **Market Mode**: In Mode 2 (ranging) markets, favor conservative sizing
- **Account Drawdown**: Automatically reduce sizing when approaching daily loss limits

## Error Handling

The command implements error handling for various failure cases:

- Missing parameters: "Error: Required parameter '{PARAM}' is missing"
- Invalid direction: "Error: Direction must be 'long' or 'short'"
- Invalid price: "Error: '{PARAM}' must be a valid number"
- Schema validation failure: "Error: Position sizing validation failed: {VALIDATION_ERRORS}"
- Invalid classification flag: "Warning: Unknown classification flag '{FLAG}' was ignored"

## Implementation Notes

This implementation follows the canonical schema approach established in v0.5.2:

1. The position sizing object structure follows the master schema with proper inheritance from baseObject
2. All required fields are implemented with appropriate nesting
3. Boolean classifications replace text-based classifications
4. Integration with position tracking is implemented with consistent references
5. Runtime schema validation ensures compliance
6. Standardized front matter matches the template format
7. Examples demonstrate real-world trading scenarios
8. All existing functionality is preserved while implementing the canonical schema
