---
id: size-position
version: "0.5.1"
type: command
category: execute
subcategory: position-management
created: 2025-05-15
updated: 2025-05-15
status: ACTIVE
required_parameters: ["symbol", "direction", "entry", "stop"]
optional_parameters: ["setup", "conviction", "account_size", "max_risk_percent"]
related_commands: ["add-position", "list-positions", "update-position", "close-position"]
example: "/size-position AAPL long entry=225.50 stop=223.80 setup=bull-flag conviction=high"
---

# Position Sizing Command (`/size-position`)

## Purpose

Calculate appropriate position size based on risk parameters, setup type, and conviction level, ensuring optimal capital allocation while respecting risk limits. This command helps traders determine the precise number of shares or contracts to trade based on their risk tolerance and the characteristics of the specific trading opportunity.

## Command Syntax

```
/size-position [symbol] [direction] entry=[price] stop=[price] [setup] [conviction] [account_size] [max_risk_percent]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `symbol` | Yes | - | Stock/instrument symbol |
| `direction` | Yes | - | "long" or "short" |
| `entry` | Yes | - | Planned entry price |
| `stop` | Yes | - | Planned stop loss level |
| `setup` | No | "standard" | Setup type (affects sizing rules) |
| `conviction` | No | "medium" | Conviction level (high/medium/low) |
| `account_size` | No | $100,000 | Total account size |
| `max_risk_percent` | No | 1% | Maximum risk as percentage |

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
   - High-probability setups (failed-breakdown, character-change): 1.0
   - Medium-probability setups (bull-flag, bear-flag, pullback): 0.8
   - Speculative setups (day-after-trade, earnings-reaction): 0.6

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

## Response Format

The command returns a detailed position sizing recommendation with alternatives and rationale:

```json
{
  "symbol": "string",
  "direction": "long/short",
  "entry": "number",
  "stop": "number",
  "riskPerShare": "number",
  "sizing": {
    "recommended": {
      "size": "number",
      "unit": "shares/contracts",
      "riskAmount": "number",
      "riskPercent": "number"
    },
    "alternatives": [
      {
        "name": "conservative",
        "size": "number",
        "riskAmount": "number",
        "riskPercent": "number"
      },
      {
        "name": "aggressive",
        "size": "number",
        "riskAmount": "number",
        "riskPercent": "number"
      }
    ],
    "scaling": {
      "component1": {"percent": "75%", "shares": "number"},
      "component2": {"percent": "15%", "shares": "number"},
      "component3": {"percent": "10%", "shares": "number"}
    }
  },
  "adjustments": {
    "convictionMultiplier": "number",
    "setupTypeMultiplier": "number",
    "riskLimitAdjustment": "boolean"
  },
  "notes": ["sizing rationale and considerations"]
}
```

## Display Format

The command also provides a human-readable display format:

```markdown
# Position Sizing: $SYMBOL ($DIRECTION)

## Trade Parameters
- Entry: $ENTRY
- Stop: $STOP 
- Risk Per Share: $RISK_PER_SHARE
- Setup: $SETUP
- Conviction: $CONVICTION

## Recommended Position
- Size: $SIZE shares
- Risk Amount: $RISK_AMOUNT ($RISK_PERCENT of account)
- R-Multiple Value: $1R = $R_VALUE

## Alternative Sizes
- Conservative: $CONSERVATIVE_SIZE shares ($CONSERVATIVE_RISK_AMOUNT risk)
- Aggressive: $AGGRESSIVE_SIZE shares ($AGGRESSIVE_RISK_AMOUNT risk)

## 75/15/10 Scaling Components
- Initial Position (75%): $COMPONENT1_SHARES shares
- First Target Position (15%): $COMPONENT2_SHARES shares
- Runner Position (10%): $COMPONENT3_SHARES shares

## Sizing Notes
$NOTES
```

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
    max_risk_percent = 1
  } = params;
  
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
  
  // Apply setup type multiplier
  const setupTypeMultipliers = {
    // High probability setups
    'failed-breakdown': 1.0,
    'character-change': 1.0,
    // Medium probability setups
    'bull-flag': 0.8,
    'bear-flag': 0.8,
    'pullback': 0.8,
    // Speculative setups
    'day-after-trade': 0.6,
    'earnings-reaction': 0.6,
    // Default
    'standard': 0.8
  };
  const setupTypeMultiplier = setupTypeMultipliers[setup] || 0.8;
  
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
  
  if (setupTypeMultiplier === 1.0) {
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
  
  // Prepare response
  return {
    symbol,
    direction,
    entry: entryPrice,
    stop: stopPrice,
    riskPerShare,
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
      traditionalCore: {
        size: traditionalCoreSize
      }
    },
    adjustments: {
      convictionMultiplier,
      setupTypeMultiplier,
      riskLimitAdjustment
    },
    notes
  };
}
```

## Response Templates

### JSON Response

```json
{
  "symbol": "{{symbol}}",
  "direction": "{{direction}}",
  "entry": {{entry}},
  "stop": {{stop}},
  "riskPerShare": {{riskPerShare}},
  "sizing": {
    "recommended": {
      "size": {{sizing.recommended.size}},
      "unit": "{{sizing.recommended.unit}}",
      "riskAmount": {{sizing.recommended.riskAmount}},
      "riskPercent": {{sizing.recommended.riskPercent}}
    },
    "alternatives": [
      {
        "name": "conservative",
        "size": {{sizing.alternatives[0].size}},
        "riskAmount": {{sizing.alternatives[0].riskAmount}},
        "riskPercent": {{sizing.alternatives[0].riskPercent}}
      },
      {
        "name": "aggressive",
        "size": {{sizing.alternatives[1].size}},
        "riskAmount": {{sizing.alternatives[1].riskAmount}},
        "riskPercent": {{sizing.alternatives[1].riskPercent}}
      }
    ],
    "traditionalCore": {
      "size": {{Math.floor(sizing.recommended.size * 0.5)}}
    }
  },
  "adjustments": {
    "convictionMultiplier": {{adjustments.convictionMultiplier}},
    "setupTypeMultiplier": {{adjustments.setupTypeMultiplier}},
    "riskLimitAdjustment": {{adjustments.riskLimitAdjustment}}
  },
  "notes": [
    {{#each notes}}
    "{{this}}"{{#unless @last}},{{/unless}}
    {{/each}}
  ]
}
```

### Markdown Response

```markdown
# Position Sizing: ${{symbol}} ({{direction}})

## Trade Parameters
- Entry: ${{entry}}
- Stop: ${{stop}} 
- Risk Per Share: ${{riskPerShare}}
- Setup: {{setup}}
- Conviction: {{conviction}}

## Recommended Position
- Size: {{sizing.recommended.size}} shares
- Risk Amount: ${{sizing.recommended.riskAmount.toFixed(2)}} ({{sizing.recommended.riskPercent.toFixed(2)}}% of account)
- R-Multiple Value: $1R = ${{riskPerShare.toFixed(2)}}

## Alternative Sizes
- Conservative: {{sizing.alternatives[0].size}} shares (${{sizing.alternatives[0].riskAmount.toFixed(2)}} risk)
- Aggressive: {{sizing.alternatives[1].size}} shares (${{sizing.alternatives[1].riskAmount.toFixed(2)}} risk)

## Position Management Considerations
- **Total Position**: {{sizing.recommended.size}} shares
- **Traditional Core Position**: {{Math.floor(sizing.recommended.size * 0.5)}} shares (50% for scaling in/out)
- **Options/Higher-Priced Instruments**: Consider whole-unit increments for appropriate scaling

## Sizing Notes
{{#each notes}}
- {{this}}
{{/each}}
```

## Example Usage

### Command:
```
/size-position AAPL long entry=225.50 stop=223.80 setup=bull-flag conviction=high account_size=100000 max_risk_percent=1
```

### Response:
```
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

## Position Management Considerations
- **Total Position**: 470 shares
- **Traditional Core Position**: 235 shares (50% for scaling in/out)
- **Options/Higher-Priced Instruments**: Consider whole-unit increments for appropriate scaling

## Sizing Notes
- Using full size due to high conviction in the setup.
- Medium-probability setup type (bull-flag) receives 80% sizing allocation.
- For traditional position management with DP methodology, consider a core position of 235 shares (50% of total) that you can build around.

```

## Test Vector

### Input:
```
/size-position AAPL long entry=225.50 stop=223.80 setup=bull-flag conviction=high
```

### Expected Output:
A position sizing recommendation for AAPL with approximately 470 shares, risk amount around $800, and complete sizing alternatives and notes.

## Integration with Other Components

This command is designed to be used in conjunction with:

1. **Trade Plan** (`/create-plan`): Use position sizing after identifying high-conviction setups
2. **Position Management** (`/add-position`): Apply sizing recommendations when entering new positions
3. **Risk Management**: Ensure positions respect overall risk allocation rules
4. **DP Trading Methodology**: Support for building around a core position

## Advanced Considerations

- **Market Volatility**: During high volatility periods, consider using the conservative sizing option
- **Correlated Positions**: Reduce size when trading multiple correlated instruments
- **Position Building**: For trending markets, consider staged entries with the scaling components
- **Market Mode**: In Mode 2 (ranging) markets, favor conservative sizing
- **Account Drawdown**: Automatically reduce sizing when approaching daily loss limits

## References

- Risk management principles from Trading System Charter
- Capital allocation rules from Trading Capital Profile
- 75/15/10 position management protocol
- Default account parameters: $100,000 base capital, 1% max risk per trade
