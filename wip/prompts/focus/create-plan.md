---
id: create-plan
title: Unified Trade Plan Generator
description: Generates a comprehensive trade plan integrating analyst inputs, technical levels, and risk parameters
author: Intent Trader Team
version: 1.0.0
release: 0.5.1
created: 2025-05-15
updated: 2025-05-15
category: premarket
status: stable
tags: [premarket, plan, integration, unified-plan, trade-ideas]
requires: [prompts/plan/analyze-dp.md, prompts/focus/conviction-classifier.md]
outputs: [tradePlan]
input_format: json
output_format: markdown
ai_enabled: true
---

# Unified Trade Plan Generator

This component generates a comprehensive trade plan from processed analyst inputs, integrating market context, focus ideas, and technical levels into an actionable trading strategy document.

## Purpose

The Unified Trade Plan Generator serves as the synthesis engine for the Intent Trader workflow, transforming raw analyst inputs into a cohesive trading strategy. It provides:

1. **Market Framework**: Overall directional bias, market mode assessment, and character analysis
2. **Level Integration**: Hierarchical price level structure with consensus strength scoring
3. **Prioritized Opportunities**: Trade ideas ranked by conviction and technical confirmation
4. **Scenario Planning**: Conditional market scenarios with triggers and strategic responses
5. **Execution Framework**: Risk allocation, position sizing, and management protocols

This unified plan provides a clear, actionable roadmap for the trading day, ensuring all setups align with risk parameters and market conditions.

## Input Parameters

- `dpAnalysis` (required): Processed DP morning call analysis
  - Output from `/analyze-dp` command
  - Must contain marketContext, focusIdeas, and levels
- `manciniAnalysis` (optional): Processed Mancini newsletter analysis
  - Similar structure to DP analysis
  - Used for level integration and consensus scoring
- `date` (optional): Trading date (default: current date)
- `accountSize` (optional): Trading account size for risk calculations (default: from preferences)
- `maxRiskPercent` (optional): Maximum daily risk as percentage (default: 1%)
- `mode` (optional): Explicit market mode override (default: auto-detect)
  - Supported values: "Mode 1", "Mode 2", "auto"
- `spxOffset` (optional): ES to SPX conversion offset (default: 20)
- `template` (optional): Plan template to use (default: "standard")
  - Supported values: "standard", "compact", "detailed"

## Output Format

The component produces a comprehensive trade plan in markdown format with these key sections:

1. **Market Framework**: Overall market assessment and context
2. **Level Framework**: Integrated price levels with consensus strength
3. **Priority Trade Ideas**: Ranked opportunities with complete parameters
4. **Scenario Planning**: Conditional market scenarios with responses
5. **Execution Framework**: Risk allocation and management protocols
6. **Preparation Checklist**: Pre-trading tasks and readiness verification

## Processing Logic

The Unified Trade Plan Generator applies the following integration methodology:

### 1. Market Assessment

The system analyzes market context to determine:

- **Overall Bias**: Directional inclination (bullish/bearish/neutral)
- **Mode Classification**: Mode 1 (trend) vs. Mode 2 (range/trap)
- **Character Status**: Consolidation, breakout, trending, etc.
- **Volatility Assessment**: Current volatility regime and implications

This assessment provides the strategic foundation for the entire trading plan, influencing setup selection, risk allocation, and management protocols.

### 2. Level Integration

The system creates a unified level framework by:

1. **Level Normalization**:
   - Standardizing level formats (precision, notation)
   - Converting futures levels to index levels (ES → SPX) when needed
   - Aligning support/resistance classifications

2. **Consensus Strength Calculation**:
   - Identifying overlapping levels from multiple sources
   - Calculating consensus strength based on source agreement
   - Applying historical significance weighting
   - Creating a hierarchical structure (major/minor)

3. **Level Organization**:
   - Arranging levels in ascending/descending order
   - Grouping levels into zones when appropriate
   - Linking related levels across instruments

4. **Technical Context Integration**:
   - Incorporating moving average relationships
   - Adding historical interaction data
   - Providing level-specific notes and context

### 3. Setup Prioritization

The system prioritizes trade opportunities through:

1. **Conviction-Based Ranking**:
   - Using standardized conviction levels from classifier
   - Applying source credibility weighting
   - Factoring historical accuracy by setup type

2. **Technical Validation**:
   - Confirming alignment with level structure
   - Verifying pattern completion status
   - Assessing risk/reward ratios

3. **Categorical Organization**:
   - Primary opportunities (high conviction, technically confirmed)
   - Secondary opportunities (medium conviction or awaiting confirmation)
   - Watchlist (lower conviction or early-stage setups)

4. **Risk-Compatibility Assessment**:
   - Evaluating correlation between setups
   - Ensuring compatibility with daily risk budget
   - Balancing directional exposure

### 4. Scenario Generation

The system creates conditional scenario branches by:

1. **Probability Assessment**:
   - Analyzing current market structure
   - Evaluating technical pattern completion
   - Assessing historical precedents
   - Incorporating analyst confidence levels

2. **Trigger Identification**:
   - Defining specific price levels that activate scenarios
   - Establishing volume or time conditions
   - Creating confirmatory signal requirements

3. **Response Framework Development**:
   - Mapping setup activations to scenarios
   - Outlining risk adjustments for each scenario
   - Providing execution guidance and priority shifts

4. **Outcome Projection**:
   - Generating price targets for each scenario
   - Estimating timeline and volatility expectations
   - Identifying significant levels within each path

### 5. Risk Allocation

The system creates a comprehensive risk framework by:

1. **Daily Risk Budget Calculation**:
   - Determining maximum acceptable daily loss
   - Allocating risk across primary opportunities
   - Reserving capacity for reactive opportunities

2. **Position Sizing Guidance**:
   - Calculating optimal size based on stop placement
   - Scaling size by conviction level
   - Accounting for correlated positions
   - Applying volatility-based adjustments

3. **Risk Distribution Rules**:
   - Maximum exposure per setup type
   - Maximum directional bias allocation
   - Maximum correlation group allocations
   - Reserve requirements

### 6. Execution Framework

The system generates a detailed execution framework with:

1. **Entry Protocol**:
   - Required confirmation criteria
   - Order type recommendations
   - Tiered entry approach when appropriate
   - Time-based entry considerations

2. **Management Protocol**:
   - Standard 75/15/10 profit-taking rule
   - Stop adjustment methodology
   - Scale-out targets and rationale
   - Runner management guidelines

3. **Exit Protocol**:
   - Time-based exit considerations
   - Technical invalidation criteria
   - Profit protection guidelines
   - Re-entry conditions

## Error Handling

The generator handles various error conditions and edge cases:

### Input Validation Errors
- **Missing Required Analysis**: Returns error if DP analysis is missing
- **Malformed Input**: Validates input structure and returns appropriate errors
- **Invalid Parameters**: Returns warning and applies default values

### Processing Errors
- **Insufficient Level Data**: Creates framework from available levels with warning
- **Missing Conviction Data**: Applies default classification with warning
- **Mode Classification Failure**: Falls back to "Mode 2" (safer, range-based approach)

### Integration Conflicts
- **Conflicting Market Bias**: Resolves based on technical evidence, noting conflict
- **Diverging Level Structure**: Maintains both structures with lower consensus strength
- **Incompatible Setups**: Flags potential conflicts in risk allocation

### Recovery Strategies
- **Partial Processing**: Returns successfully processed sections with status indicators
- **Graceful Degradation**: Falls back to simpler templates when complete information unavailable
- **Reasonable Defaults**: Applies standard values for management protocols when specific guidance absent

## Plan Formats

The generator supports multiple output formats to accommodate different user preferences and workflow phases:

### Standard Format (Default)
- Comprehensive trading plan with all sections
- Balanced level of detail for quick reference
- Tabular layouts for key data
- Approximately 3-5 pages of content

### Compact Format
- Abbreviated version focused on essentials
- Optimized for mobile viewing
- Minimal explanatory text
- Approximately 1-2 pages of content

### Detailed Format
- Maximum information with extended analysis
- Comprehensive technical justifications
- Expanded scenario planning
- Detailed management protocols
- Approximately 5-8 pages of content

## Level Strength Classification

The system classifies level strength using this framework:

| Strength | Description | Sources | Historical Validation | Current Context |
|----------|-------------|---------|----------------------|-----------------|
| **Major** | Primary S/R with high significance | Multiple | Strong prior reactions | Key decision point |
| **Significant** | Important levels with good reliability | Single/Multiple | Several tests | Active influence |
| **Minor** | Secondary levels with moderate impact | Single | Limited testing | Context-dependent |
| **Provisional** | Newly formed or untested levels | Single | None/Limited | Potential influence |

## Trade Idea Classification

The system classifies trade ideas using these categories:

1. **Primary Opportunities**
   - High conviction (standardized classifier)
   - Strong technical alignment
   - Clear risk parameters
   - Favorable risk/reward ratio

2. **Secondary Opportunities**
   - Medium conviction
   - Awaiting technical confirmation
   - Complete but conditional risk parameters
   - Reasonable risk/reward ratio

3. **Watchlist Opportunities**
   - Lower conviction
   - Early pattern development
   - Incomplete risk parameters
   - To be monitored for potential upgrade

## Market Mode Assessment

The system classifies market mode using these criteria:

### Mode 1 (Trend Day)
- **Characteristics**: Directional momentum, limited pullbacks, expanded range
- **Trading Approach**: Trade with the trend, look for continuation setups
- **Risk Parameters**: Can use wider stops, larger size on pullbacks
- **Management Protocol**: Look for extended targets, trail runners aggressively

### Mode 2 (Range/Trap Day)
- **Characteristics**: Consolidation, false breakouts, compressed range
- **Trading Approach**: Trade reversals at extremes, avoid chasing breakouts
- **Risk Parameters**: Use tighter stops, smaller position sizes
- **Management Protocol**: Take profits quickly, be cautious with runners

## Risk Allocation Framework

The system applies this risk allocation methodology:

### Daily Risk Budget
- Maximum daily risk: 1% of account (default, configurable)
- Distribution:
  - 60% allocated to primary opportunities
  - 30% reserved for secondary opportunities
  - 10% kept as reserve/buffer

### Position Sizing Formula
```
Position Size = (Account Size × Risk Allocation) ÷ (Entry Price - Stop Loss)
```

### Conviction-Based Adjustments
- High Conviction: 100% of calculated size
- Medium Conviction: 75% of calculated size
- Low Conviction: 50% of calculated size

### Correlated Risk Controls
- Maximum exposure to correlated assets: 150% of single position risk
- Maximum directional bias: 70% of daily risk budget
- Maximum sector exposure: 50% of daily risk budget

## Position Management Protocol

The system implements the standardized 75/15/10 management rule:

### Profit Taking Structure
- **First Target (T1)**: Exit 75% of position at initial target
- **Second Target (T2)**: Exit 15% of position at extended target
- **Final Target (T3)**: Exit final 10% at trailing stop or extended target

### Stop Management
- **Initial Stop**: Set at technical invalidation point
- **Breakeven Stop**: Move stop to entry after T1 is reached
- **Trailing Stop**: Implement for runner portion (final 10%)

### Mode-Based Adjustments
- **Mode 1**: Trail runners further with wider stops
- **Mode 2**: Take profits more aggressively, tighter trailing stops

## Example Usage

```
/create-plan --dpAnalysis=<output from analyze-dp> --maxRiskPercent=1.5 --mode=auto
```

## Test Vector

**Input**:
```json
{
  "dpAnalysis": {
    "marketContext": {
      "futures": {"status": "slightly lower", "catalysts": ["awaiting CPI"]},
      "indices": {
        "dow": {"direction": "down", "change": "over 200 points", "reason": "UNH impact"},
        "nasdaq": {"direction": "down", "change": "10-15 points", "note": "rallied from earlier lows"}
      },
      "keyMovers": [
        {
          "ticker": "UNH",
          "direction": "down",
          "magnitude": "40 points",
          "reason": "suspended guidance for 2025 and CEO stepping down"
        },
        {
          "ticker": "COIN",
          "direction": "up",
          "magnitude": "10%",
          "price": "226-227",
          "reason": "being added to S&P"
        }
      ],
      "sentiment": "mixed, cautious ahead of CPI"
    },
    "focusIdeas": [
      {
        "ticker": "TEM",
        "direction": "long",
        "conviction": {"level": "high", "phrases": ["love TEM right now"]},
        "entryParameters": {"zone": {"min": 60, "max": 62}, "condition": "current range"},
        "exitParameters": {"stopLoss": 58, "target": 68},
        "rationale": "great entry point for a swing trade"
      },
      {
        "ticker": "HOOD",
        "direction": "long",
        "conviction": {"level": "high", "phrases": ["looking to add more", "remain very bullish"]},
        "entryParameters": {"zone": {"min": 56, "max": 56}, "condition": "if it gets to 56"},
        "exitParameters": {"stopLoss": 53, "target": 62},
        "rationale": "remain very bullish on this name"
      },
      {
        "ticker": "BABA",
        "direction": "short",
        "conviction": {"level": "medium", "phrases": ["could be a decent day-after-trade", "might be worth a speculative short"]},
        "entryParameters": {"zone": {"min": 121, "max": 121}, "condition": "if it gets to its 21-day MA around 121"},
        "exitParameters": {"stopLoss": 124, "target": 115},
        "rationale": "day-after-trade opportunity"
      },
      {
        "ticker": "CRWV",
        "direction": "long",
        "conviction": {"level": "medium", "phrases": ["interesting on any pullback", "viable swing trade"]},
        "entryParameters": {"zone": {"min": null, "max": null}, "condition": "on any pullback"},
        "exitParameters": {"stopLoss": null, "target": null},
        "rationale": "viable swing trade opportunity"
      },
      {
        "ticker": "AMD",
        "direction": "long",
        "conviction": {"level": "medium", "phrases": ["could work", "might be worth trying some calls"]},
        "entryParameters": {"zone": {"min": 115, "max": 115}, "condition": "around 115"},
        "exitParameters": {"stopLoss": 112, "target": 120},
        "rationale": "worth trying some calls"
      },
      {
        "ticker": "TSLA",
        "direction": "long",
        "conviction": {"level": "low", "phrases": ["only interesting near the 8-day MA", "would not chase"]},
        "entryParameters": {"zone": {"min": 309, "max": 309}, "condition": "near the 8-day MA"},
        "exitParameters": {"stopLoss": 305, "target": 315},
        "rationale": "only interesting near the 8-day MA"
      }
    ],
    "levels": {
      "indices": {
        "es": {
          "support": [
            {"value": 5900, "type": "support", "notes": "trapped several times now"},
            {"value": 5850, "type": "support", "notes": "major support if 5900 fails"}
          ],
          "resistance": [
            {"value": 5926, "type": "resistance", "notes": "top of the bull flag"},
            {"value": 5945, "type": "resistance", "notes": "secondary resistance"},
            {"value": 5970, "type": "resistance", "notes": "measured move target if we break out"}
          ]
        },
        "spx": {
          "support": [
            {"value": 5920, "type": "support", "notes": "comparable to ES 5900"},
            {"value": 5870, "type": "support", "notes": "major support if 5920 fails"}
          ],
          "resistance": [
            {"value": 5946, "type": "resistance", "notes": "top of the bull flag"},
            {"value": 5965, "type": "resistance", "notes": "secondary resistance"},
            {"value": 5990, "type": "resistance", "notes": "measured move target if we break out"}
          ]
        }
      },
      "stocks": [
        {
          "ticker": "TSLA",
          "levels": {
            "support": [{"value": 300, "type": "support"}],
            "resistance": [{"value": 320, "type": "resistance"}]
          },
          "movingAverages": {"ma8": 309, "ma21": 300}
        },
        {
          "ticker": "AMD",
          "levels": {
            "support": [{"value": 112, "type": "support"}],
            "resistance": [{"value": 120, "type": "resistance"}]
          },
          "movingAverages": {"ma8": 117, "ma21": 115}
        }
      ]
    }
  },
  "date": "2025-05-15",
  "accountSize": 100000,
  "maxRiskPercent": 1,
  "mode": "auto",
  "spxOffset": 20,
  "template": "standard"
}
```

**Expected Output**:
```markdown
# Unified Daily Trade Plan — May 15, 2025

## Market Framework
- **Overall Bias**: Neutral to slightly bearish below 5926, bullish above
- **Mode Classification**: Mode 2 (range/trap day) - 80% confidence
- **Character Status**: Consolidation in bull flag pattern
- **Key Catalysts**: CPI data (awaiting release), UNH guidance suspension

---

## Level Framework

### ES Futures
**Support Levels:**
| Level | Type     | Consensus | Notes                                    |
|-------|----------|-----------|------------------------------------------|
| 5900  | Major    | High      | Trapped several times, key support zone  |
| 5850  | Major    | High      | Major support if 5900 fails              |

**Resistance Levels:**
| Level | Type     | Consensus | Notes                                    |
|-------|----------|-----------|------------------------------------------|
| 5926  | Major    | High      | Top of the bull flag pattern             |
| 5945  | Significant| Medium  | Secondary resistance                     |
| 5970  | Target   | Medium    | Measured move target if we break out     |

### SPX Index (ES +20)
**Support Levels:**
| Level | Type     | Consensus | Notes                                    |
|-------|----------|-----------|------------------------------------------|
| 5920  | Major    | High      | Equivalent to ES 5900, key support       |
| 5870  | Major    | High      | Major support if 5920 breaks             |

**Resistance Levels:**
| Level | Type     | Consensus | Notes                                    |
|-------|----------|-----------|------------------------------------------|
| 5946  | Major    | High      | Top of bull flag pattern                 |
| 5965  | Significant| Medium  | Secondary resistance                     |
| 5990  | Target   | Medium    | Measured move target on breakout         |

---

## Priority Trade Ideas (Sorted by Conviction)

### Primary Opportunities

#### 1. TEM LONG - Swing Trade (High Conviction)
- **Entry Parameters**: Buy between 60-62 (current range)
- **Stop Placement**: 58 (-6.5% from entry midpoint)
- **Targets**:
  - T1 (75%): 65 (+5.7% from entry midpoint)
  - T2 (15%): 68 (+9.7% from entry midpoint)
  - T3 (10%): Trail from 68
- **Risk Allocation**: Full position size (1R)
- **Management Protocol**: Standard 75/15/10 rule
- **Technical Context**: Entry zone aligned with 8-day and 10-day MAs
- **Source Attribution**: DP focus trade

#### 2. HOOD LONG - Swing Trade (High Conviction)
- **Entry Parameters**: Buy at 56 (pullback to support)
- **Stop Placement**: 53 (-5.4% from entry)
- **Targets**:
  - T1 (75%): 59 (+5.4% from entry)
  - T2 (15%): 62 (+10.7% from entry)
  - T3 (10%): Trail from 62
- **Risk Allocation**: 0.75-1R position size
- **Management Protocol**: Standard 75/15/10 rule
- **Technical Context**: Entry aligned with 8-day MA
- **Source Attribution**: DP existing position, looking to add

### Secondary Opportunities

#### 3. BABA SHORT - Day-After-Trade (Medium Conviction)
- **Entry Parameters**: Short at 121 (approaching 21-day MA)
- **Stop Placement**: 124 (+2.5% from entry)
- **Targets**:
  - T1 (75%): 118 (-2.5% from entry)
  - T2 (15%): 115 (-5.0% from entry)
  - T3 (10%): Trail from 115
- **Risk Allocation**: 0.5-0.75R position size (speculative)
- **Management Protocol**: Tighter stop due to DAT volatility
- **Technical Context**: Post-earnings reaction trade
- **Source Attribution**: DP DAT idea

#### 4. AMD LONG - Options Trade (Medium Conviction)
- **Entry Parameters**: Buy calls with price around 115
- **Stop Placement**: 112 (-2.6% from entry)
- **Targets**:
  - T1 (75%): 117.5 (+2.2% from entry)
  - T2 (15%): 120 (+4.3% from entry)
  - T3 (10%): Trail from 120
- **Risk Allocation**: 0.5R position size (options only)
- **Management Protocol**: Consider time decay in management
- **Technical Context**: Entry near 21-day MA (115), 8-day MA at 117
- **Source Attribution**: DP options idea

### Watchlist Opportunities

#### 5. CRWV LONG - Swing Trade (Medium Conviction)
- **Watch for**: Pullback opportunity after earnings
- **Potential Entry**: To be determined based on price action
- **Source Attribution**: DP viable setup on pullback

#### 6. TSLA LONG - Pullback Trade (Low Conviction)
- **Watch for**: Pullback to 8-day MA around 309
- **Risk Parameters**: Stop below 305, target 315+
- **Notes**: Avoid chasing, only enter at specified level
- **Source Attribution**: DP low conviction idea

---

## Scenario Planning

### Primary Scenario (60% probability): Continued Consolidation
- **Description**: Market continues to consolidate in the 5900-5926 range (ES)
- **Trigger Conditions**: Failed breakouts/breakdowns at range extremes
- **Expected Outcome**: Multiple tests of range boundaries with eventual resolution
- **Strategic Response**:
  - Focus on range extremes for reversal trades
  - Prioritize TEM and HOOD as non-index trades
  - Use smaller position sizes due to Mode 2 conditions
  - Take partial profits quickly on index-related trades

### Bear Case (25% probability): Break Below 5900
- **Description**: ES breaks and holds below 5900 support
- **Trigger Conditions**: Decisive break below 5900 with follow-through
- **Expected Outcome**: Test of 5850 major support level
- **Strategic Response**:
  - Add to BABA short position on confirmation
  - Reduce size or exit TEM and HOOD longs
  - Look for short entries on index tests of 5900 from below
  - Adjust daily risk budget down to 0.75%

### Bull Case (15% probability): Breakout Above 5926
- **Description**: ES breaks above 5926 bull flag resistance
- **Trigger Conditions**: Strong volume breakout above 5926 with acceptance
- **Expected Outcome**: Measured move toward 5970 target
- **Strategic Response**:
  - Hold TEM and HOOD longs with wider targets
  - Exit or avoid BABA short
  - Look for entries in AMD on strength
  - Consider adding to longs on successful retest of 5926

---

## Execution Framework

### Risk Management
- **Daily Risk Budget**: 1% of account ($1,000)
- **Primary Opportunity Allocation**:
  - TEM: Up to $400 risk (0.4% account)
  - HOOD: Up to $300 risk (0.3% account)
- **Secondary Opportunity Allocation**:
  - BABA: Up to $200 risk (0.2% account)
  - AMD: Up to $100 risk (0.1% account)
- **Reserve**: $0 remaining (full allocation)

### Position Management
- **Entry Confirmation Requirements**:
  - Price within specified entry zone
  - Volume confirmation when applicable
  - Pattern completion (if pattern-based)
  - Mode-appropriate timing

- **Standard Management Protocol (75/15/10 Rule)**:
  1. Exit 75% of position at first target (T1)
  2. Move stop to breakeven after T1 is reached
  3. Exit 15% of position at second target (T2)
  4. Trail stop for remaining 10% runner portion

- **Mode 2 Adjustments**:
  - Consider taking profits more aggressively (80/20/0 split)
  - Use tighter trailing stops for runners
  - Be cautious with breakout trades
  - Be prepared for false breaks at range extremes

---

## Preparation Checklist
- Review CPI impact (if released) before executing trades
- Verify actual levels in market match planned levels
- Set alerts at key decision points (5900, 5926 for ES)
- Prepare for volatility around UNH news developments
- Pre-define position sizes for all primary opportunities
- Mentally rehearse response to each scenario
```

## Implementation Notes

The Unified Trade Plan Generator integrates multiple analyst inputs to create a comprehensive trading strategy document. It prioritizes:

1. **Actionable Structure**: Clear organization with specific price levels, risk parameters, and management guidelines.

2. **Risk-First Planning**: Built around a risk allocation framework to protect capital while pursuing opportunities.

3. **Scenario-Based Strategy**: Conditional plans that adapt to changing market conditions.

4. **Integrated Analysis**: Combines technical levels, conviction assessment, and market mode for a complete view.

5. **Management Protocol**: Standardized 75/15/10 rule with mode-specific adjustments.

The implementation is optimized for premarket planning, providing structure for the entire trading day.

## Integration Details

### DP-Mancini Integration Strategy

When both analyst sources are available, the plan generator:

1. **Adopts Mancini's Level Precision**: Uses exact levels with major/minor classification
2. **Enhances with DP's Context**: Adds character assessment and market sentiment
3. **Uses DP's Focus Ideas**: Prioritizes specific tickers with conviction classification
4. **Applies Mancini's Management Rules**: Implements 75/15/10 approach systematically
5. **Combines Scenario Analysis**: Creates comprehensive conditional branches

### Dynamic Mode Assessment

The implementation determines market mode using:

1. **Range Analysis**: Current range versus historical average
2. **Volatility Metrics**: VIX and short-term volatility readings
3. **Price Character**: Trending versus consolidating behavior
4. **Analyst Indications**: Direct mode references in analyst commentary

When `mode` is set to "auto" (default), the system determines mode algorithmically, while explicit mode settings override this analysis.

### Risk Allocation Algorithm

The risk allocation framework follows this methodology:

```javascript
function calculateRiskAllocation(focusIdeas, maxRiskPercent, accountSize) {
  // Total risk budget
  const totalRiskBudget = accountSize * (maxRiskPercent / 100);

  // Segregate ideas by conviction
  const highConvictionIdeas = focusIdeas.filter(idea => idea.conviction.level === 'high');
  const mediumConvictionIdeas = focusIdeas.filter(idea => idea.conviction.level === 'medium');
  const lowConvictionIdeas = focusIdeas.filter(idea => idea.conviction.level === 'low');

  // Allocate risk by conviction tier
  const highConvictionBudget = totalRiskBudget * 0.6;
  const mediumConvictionBudget = totalRiskBudget * 0.3;
  const lowConvictionBudget = totalRiskBudget * 0.1;

  // Calculate per-idea allocations
  const highAllocation = highConvictionIdeas.length > 0 ?
    highConvictionBudget / highConvictionIdeas.length : 0;
  const mediumAllocation = mediumConvictionIdeas.length > 0 ?
    mediumConvictionBudget / mediumConvictionIdeas.length : 0;
  const lowAllocation = lowConvictionIdeas.length > 0 ?
    lowConvictionBudget / lowConvictionIdeas.length : 0;

  // Create allocation map
  const allocationMap = {};

  highConvictionIdeas.forEach(idea => {
    allocationMap[idea.ticker] = {
      maxRiskAmount: highAllocation,
      maxRiskPercent: (highAllocation / accountSize) * 100,
      ratioBasis: 1.0
    };
  });

  mediumConvictionIdeas.forEach(idea => {
    allocationMap[idea.ticker] = {
      maxRiskAmount: mediumAllocation,
      maxRiskPercent: (mediumAllocation / accountSize) * 100,
      ratioBasis: 0.75
    };
  });

  lowConvictionIdeas.forEach(idea => {
    allocationMap[idea.ticker] = {
      maxRiskAmount: lowAllocation,
      maxRiskPercent: (lowAllocation / accountSize) * 100,
      ratioBasis: 0.5
    };
  });

  return {
    totalRiskBudget,
    allocationMap,
    summary: {
      highConvictionBudget,
      mediumConvictionBudget,
      lowConvictionBudget,
      highConvictionCount: highConvictionIdeas.length,
      mediumConvictionCount: mediumConvictionIdeas.length,
      lowConvictionCount: lowConvictionIdeas.length
    }
  };
}
```

## Related Components

The Unified Trade Plan Generator works closely with:
- `prompts/plan/analyze-dp.md` - For processing morning call transcripts
- `prompts/focus/conviction-classifier.md` - For standardized conviction assessment
- `prompts/focus/extract-focus.md` - For isolating high-conviction opportunities
- `prompts/focus/extract-levels.md` - For detailed level analysis

It provides input to:
- `prompts/manage/add-position.md` - For executing the plan
- `prompts/manage/list-positions.md` - For tracking positions against the plan
- `prompts/review/compare-execution.md` - For evaluating plan adherence
