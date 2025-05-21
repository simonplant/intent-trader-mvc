---
id: create-plan-v0.5.2
title: Unified Trade Plan Generator
description: Generates a comprehensive trade plan from analyst inputs and caches it to state storage
author: Intent Trader Team
version: 1.0.1
release: 0.5.2
created: 2025-05-20
updated: 2025-05-20
category: premarket
status: stable
tags: [premarket, planning, trade-plan, schema, dp-analysis, mancini-analysis]
requires: [system/schemas/intent-trader-master-schema.json, system/schemas/intent-trader-runtime-schema.json]
outputs: [state/current-trade-plan.json]
input_format: command
output_format: markdown
ai_enabled: true
---

# Unified Trade Plan Generator

## Purpose
The `/create-plan` command generates a comprehensive trade plan from processed analyst inputs, integrating market context, focus ideas, and technical levels into an actionable trading strategy document. It then saves this plan to a persistent state file for reference by other commands throughout the trading day.

## Input Parameters

| Parameter | Required | Description | Format | Default |
|-----------|----------|-------------|--------|---------|
| `dpAnalysis` | No | Processed DP morning call analysis | Object | (From system state) |
| `manciniAnalysis` | No | Processed Mancini newsletter analysis | Object | (From system state) |
| `date` | No | Trading date | String (ISO format) | Current date |
| `accountSize` | No | Trading account size for risk calculations | Number | 100000 |
| `maxRiskPercent` | No | Maximum daily risk as percentage | Number (0-10) | 1 |
| `mode` | No | Market mode override | String: "Mode 1", "Mode 2", "auto" | "auto" |
| `template` | No | Output format template | String: "standard", "compact", "detailed" | "standard" |

## Processing Logic

1. **Data Acquisition**
   - Retrieve the DP analysis from state if not provided
   - Process any Mancini analysis if available
   - Validate inputs and verify required data is present

2. **Market Framework Analysis**
   - Determine overall market bias from context
   - Classify market mode (Mode 1 vs. Mode 2)
   - Evaluate market character and conditions
   - Identify key catalysts and events
   - Create a `marketFramework` object compliant with the canonical schema

3. **Level Integration**
   - Normalize and standardize level formats
   - Calculate consensus strength for overlapping levels
   - Create hierarchical level structure
   - Organize levels for major indices and key stocks
   - Create a `levelFramework` object compliant with the canonical schema

4. **Trade Idea Prioritization**
   - Rank trade opportunities by conviction and technical validation
   - Categorize into primary, secondary, and watchlist opportunities
   - Calculate complete risk parameters and targets
   - Add technical context and management protocols
   - Create `tradeIdea` objects compliant with the canonical schema

5. **Scenario Planning**
   - Develop primary and alternative market scenarios
   - Assign probability assessments to each scenario
   - Define trigger conditions and expected outcomes
   - Create strategic responses for each scenario
   - Generate scenario objects for the trade plan

6. **Risk Management Framework**
   - Calculate daily risk budget based on account size
   - Allocate risk across priority trade ideas
   - Define position sizing guidance
   - Establish management protocols
   - Create riskManagement object for the trade plan

7. **Schema Validation**
   - Validate all created objects against the runtime schema
   - Ensure comprehensive compliance with the master schema
   - Verify required fields, relationships, and constraints
   - Apply data type validation and constraint checking

8. **Cache Trade Plan to State**
   - Convert the generated plan to a structured JSON format
   - Save to `state/current-trade-plan.json`
   - Include complete trade ideas, levels, and risk parameters
   - Add metadata and generation timestamp

9. **Format Response**
   - Generate readable markdown output for display
   - Include all plan sections in appropriate detail
   - Add confirmation of plan caching

## Implementation Details

### Schema Usage
This command implements the dual-schema approach of Intent Trader v0.5.2:
- **Master Schema**: Used as the reference for complete object structure and relationships
- **Runtime Schema**: Used for efficient validation and runtime operations

### Object Creation Process
1. Initialize a new `tradePlan` object with base properties
2. Create and validate the `marketFramework` object
3. Create and validate the `levelFramework` object
4. Generate and validate individual `tradeIdea` objects
5. Create scenario and risk management components
6. Assemble the complete plan with proper relationships
7. Validate against the runtime schema
8. Cache to state storage

### Validation Steps
- All objects must be valid against both the master and runtime schemas
- Required fields must be present with appropriate values
- Field types must match schema definitions
- Enum values must be selected from valid options
- Classifications must use the boolean flag system
- IDs must follow the canonical pattern

## Response Format

The command returns the complete trade plan in markdown format and confirms it has been cached:

```
# Unified Daily Trade Plan — [DATE]

## Market Framework
- **Overall Bias**: [BIAS_DESCRIPTION] ([BIAS] per schema)
- **Mode Classification**: [MODE] ([CONFIDENCE]% confidence)
- **Character Status**: [CHARACTER_DESCRIPTION]
- **Key Catalysts**: [CATALYST_LIST]

## Level Framework
[DETAILED_LEVEL_STRUCTURE]

## Priority Trade Ideas
[PRIORITIZED_TRADE_IDEAS]

## Scenario Planning
[SCENARIO_DESCRIPTIONS]

## Execution Framework
[RISK_AND_EXECUTION_GUIDANCE]

## Preparation Checklist
[CHECKLIST_ITEMS]

Plan successfully cached to state/current-trade-plan.json for use by other commands.
```

## Example Usage

```
/create-plan maxRiskPercent=1.5 mode=auto
```

## Example Response

```
# Unified Daily Trade Plan — May 20, 2025

## Market Framework
- **Overall Bias**: Neutral to slightly bearish below 5926, bullish above (neutral-to-bearish per schema)
- **Mode Classification**: Mode 2 (range/trap day) - 80% confidence
- **Character Status**: Consolidation in bull flag pattern
- **Key Catalysts**: CPI data (awaiting release), UNH guidance suspension

## Level Framework
### ES Futures
- Support:
  - 5900 (STRONG): Trapped several times, key support zone
  - 5850 (STRONG): Major support if 5900 fails
- Resistance:
  - 5926 (STRONG): Top of the bull flag pattern
  - 5945 (MODERATE): Secondary resistance
  - 5970 (MODERATE): Measured move target if we break out

### SPX
- Support:
  - 5920 (STRONG): Equivalent to ES 5900, key support
  - 5870 (STRONG): Major support if 5920 breaks
- Resistance:
  - 5946 (STRONG): Top of bull flag pattern
  - 5965 (MODERATE): Secondary resistance 
  - 5990 (MODERATE): Measured move target on breakout

### Key Stocks
- TSLA:
  - Support: 300 (MODERATE): Key psychological level
  - Resistance: 320 (MODERATE): Recent swing high
  - MAs: 8-day @ 309, 21-day @ 300
- AMD:
  - Support: 112 (MODERATE): Recent consolidation low
  - Resistance: 120 (MODERATE): Recent swing high
  - MAs: 8-day @ 117, 21-day @ 115

### Key Decision Point: 5926

## Priority Trade Ideas

### Primary Focus Trades
1. **TEM LONG** (High Conviction)
   - Entry Zone: 60-62 (current range)
   - Stop: 58
   - Target: 65
   - Strategy: Limit entry, standard 75/15/10 rule
   - Rationale: Entry zone aligned with 8-day and 10-day MAs
   - Classification: Trend Follow, Momentum Play
   - Position Size: Full (High conviction focus trade)
   - Planned R-Multiple: 2.5

2. **HOOD LONG** (High Conviction)
   - Entry Zone: 56 (pullback to support)
   - Stop: 53
   - Target: 59
   - Strategy: Limit entry, standard 75/15/10 rule
   - Rationale: Entry aligned with 8-day MA
   - Classification: Trend Follow
   - Position Size: Half (High conviction but slightly higher risk profile)
   - Planned R-Multiple: 2.0

### Secondary Trades
1. **BABA SHORT** (Medium Conviction)
   - Entry Zone: 121 (approaching 21-day MA)
   - Stop: 124
   - Target: 118
   - Strategy: Tighter stop due to DAT volatility
   - Rationale: Post-earnings reaction trade
   - Classification: Earnings Play, Day After Trade
   - Position Size: Third (Medium conviction with higher volatility)
   - Planned R-Multiple: 1.6

2. **AMD LONG** (Medium Conviction)
   - Entry Zone: 115 (price around 115)
   - Stop: 112
   - Target: 117.5
   - Strategy: Consider time decay in management
   - Rationale: Entry near 21-day MA (115), 8-day MA at 117
   - Classification: Reversal, Range Play
   - Position Size: Quarter (Medium conviction range play)
   - Planned R-Multiple: 1.8

### Watchlist
1. **CRWD LONG** (Medium Conviction)
   - Condition: Pullback opportunity after earnings
   - Rationale: Viable setup on pullback
   - Classification: Earnings Play
   - Position Size: Quarter (Speculative earnings-related play)

2. **TSLA LONG** (Low Conviction)
   - Entry Zone: 309 (Pullback to 8-day MA around 309)
   - Stop: 305
   - Target: 315
   - Rationale: Avoid chasing, only enter at specified level
   - Classification: Reversal
   - Position Size: Small (Low conviction pullback play)
   - Planned R-Multiple: 1.5

## Scenario Planning

1. **Base Case: Continued Consolidation** (60% probability)
   - Trigger: Failed breakouts/breakdowns at range extremes
   - Description: Multiple tests of range boundaries with eventual resolution
   - Type: Neutral
   - Conviction: High

2. **Bear Case: Test of Major Support** (25% probability)
   - Trigger: Decisive break below 5900 with follow-through
   - Target: 5850
   - Stop: 5926
   - Risk-Reward: 1.4
   - Description: Test of 5850 major support level
   - Type: Short
   - Conviction: Medium

3. **Bull Case: Measured Move Higher** (15% probability)
   - Trigger: Strong volume breakout above 5926 with acceptance
   - Target: 5970
   - Stop: 5900
   - Risk-Reward: 1.7
   - Description: Measured move toward 5970 target
   - Type: Long
   - Conviction: Low

## Execution Framework

- **Account Size**: $100,000
- **Max Daily Risk**: 1.0% ($1,000)
- **Position Sizing**: Risk 0.5% on primary setups, 0.25% on secondary
- **Stop Placement**: Place stops below key support for longs, above key resistance for shorts
- **Trail Strategy**: Trail to breakeven after first target reached, trail with ATR for runners

## Preparation Checklist
- [ ] Review CPI data release when available
- [ ] Monitor UNH reaction after guidance suspension
- [ ] Set alerts at key decision point: 5926
- [ ] Monitor trade ideas for trigger conditions
- [ ] Prepare order templates for primary trade ideas

Plan successfully cached to state/current-trade-plan.json for use by other commands.
```

## Cache Structure

The command caches the trade plan in a structured JSON format at `state/current-trade-plan.json` that fully complies with the canonical schema:

```json
{
  "schemaVersion": "0.5.2",
  "id": "plan-20250520",
  "source": "system",
  "timestamp": "2025-05-20T08:45:00Z",
  "date": "2025-05-20",
  "marketFramework": {
    "schemaVersion": "0.5.2",
    "id": "framework-market-20250520",
    "source": "system",
    "timestamp": "2025-05-20T08:45:00Z",
    "bias": "neutral-to-bearish",
    "biasCondition": "below 5926, bullish above",
    "mode": "Mode 2",
    "modeConfidence": 80,
    "character": "Consolidation in bull flag pattern",
    "catalysts": ["CPI data (awaiting release)", "UNH guidance suspension"],
    "keyMovers": [
      {
        "ticker": "UNH",
        "direction": "down",
        "magnitude": "strong",
        "reason": "Guidance suspension"
      },
      {
        "ticker": "TSLA",
        "direction": "up",
        "magnitude": "moderate",
        "reason": "Technical breakout"
      }
    ],
    "origin": {
      "sourceCommand": "/create-plan",
      "createdBy": "plan-generator"
    }
  },
  "levelFramework": {
    "schemaVersion": "0.5.2",
    "id": "framework-level-20250520",
    "source": "system",
    "timestamp": "2025-05-20T08:45:00Z",
    "indices": {
      "es": {
        "support": [
          {
            "price": 5900,
            "notes": "Trapped several times, key support zone",
            "type": "major",
            "strength": "strong"
          },
          {
            "price": 5850,
            "notes": "Major support if 5900 fails",
            "type": "major",
            "strength": "strong"
          }
        ],
        "resistance": [
          {
            "price": 5926,
            "notes": "Top of the bull flag pattern",
            "type": "major",
            "strength": "strong"
          },
          {
            "price": 5945,
            "notes": "Secondary resistance",
            "type": "major",
            "strength": "moderate"
          },
          {
            "price": 5970,
            "notes": "Measured move target if we break out",
            "type": "key",
            "strength": "moderate"
          }
        ]
      },
      "spx": {
        "support": [
          {
            "price": 5920,
            "notes": "Equivalent to ES 5900, key support",
            "type": "major",
            "strength": "strong"
          },
          {
            "price": 5870,
            "notes": "Major support if 5920 breaks",
            "type": "major",
            "strength": "strong"
          }
        ],
        "resistance": [
          {
            "price": 5946,
            "notes": "Top of bull flag pattern",
            "type": "major",
            "strength": "strong"
          },
          {
            "price": 5965,
            "notes": "Secondary resistance",
            "type": "key",
            "strength": "moderate"
          },
          {
            "price": 5990,
            "notes": "Measured move target on breakout",
            "type": "key",
            "strength": "moderate"
          }
        ]
      }
    },
    "stocks": [
      {
        "ticker": "TSLA",
        "levels": {
          "support": [
            {
              "price": 300,
              "notes": "Key psychological level",
              "type": "major",
              "strength": "moderate"
            }
          ],
          "resistance": [
            {
              "price": 320,
              "notes": "Recent swing high",
              "type": "major",
              "strength": "moderate"
            }
          ]
        },
        "movingAverages": {
          "ma8": 309,
          "ma21": 300
        }
      },
      {
        "ticker": "AMD",
        "levels": {
          "support": [
            {
              "price": 112,
              "notes": "Recent consolidation low",
              "type": "major",
              "strength": "moderate"
            }
          ],
          "resistance": [
            {
              "price": 120,
              "notes": "Recent swing high",
              "type": "major",
              "strength": "moderate"
            }
          ]
        },
        "movingAverages": {
          "ma8": 117,
          "ma21": 115
        }
      }
    ],
    "zones": [],
    "keyDecisionPoint": 5926,
    "origin": {
      "sourceCommand": "/create-plan",
      "createdBy": "plan-generator"
    }
  },
  "tradeIdeas": [
    {
      "schemaVersion": "0.5.2",
      "id": "idea-plan-20250520-TEM-01",
      "source": "system",
      "timestamp": "2025-05-20T08:45:00Z",
      "symbol": "TEM",
      "direction": "long",
      "conviction": {
        "level": "high",
        "phrases": ["high conviction"]
      },
      "entryParameters": {
        "zone": {
          "min": 60,
          "max": 62
        },
        "condition": "current range",
        "strategy": "limit"
      },
      "exitParameters": {
        "stopLoss": 58,
        "target": 65,
        "strategy": "Standard 75/15/10 rule",
        "trimLevels": [
          {
            "price": 65,
            "percentage": 75
          },
          {
            "price": 68,
            "percentage": 15
          }
        ]
      },
      "rationale": "Entry zone aligned with 8-day and 10-day MAs",
      "tradeDuration": "swing",
      "setup": "continuation",
      "status": "active",
      "confirmationStatus": "confirmed",
      "classifications": {
        "isBreakout": false,
        "isReversal": false,
        "isFlagPattern": false,
        "isFailedBreakdown": false,
        "isEarningsPlay": false,
        "isDayAfterTrade": false,
        "isTrendFollow": true,
        "isRangePlay": false,
        "isGapFill": false,
        "isMomentumPlay": true
      },
      "positionSizing": {
        "recommendation": "full",
        "reasoning": "High conviction focus trade"
      },
      "risk": {
        "plannedRMultiple": 2.5
      },
      "priority": 1,
      "category": "primary",
      "isFavorite": true,
      "origin": {
        "sourceCommand": "/create-plan",
        "createdBy": "plan-generator"
      }
    },
    {
      "schemaVersion": "0.5.2",
      "id": "idea-plan-20250520-HOOD-01",
      "source": "system",
      "timestamp": "2025-05-20T08:45:00Z",
      "symbol": "HOOD",
      "direction": "long",
      "conviction": {
        "level": "high",
        "phrases": ["high conviction"]
      },
      "entryParameters": {
        "zone": {
          "min": 56,
          "max": 56
        },
        "condition": "pullback to support",
        "strategy": "limit"
      },
      "exitParameters": {
        "stopLoss": 53,
        "target": 59,
        "strategy": "Standard 75/15/10 rule",
        "trimLevels": [
          {
            "price": 59,
            "percentage": 75
          },
          {
            "price": 62,
            "percentage": 15
          }
        ]
      },
      "rationale": "Entry aligned with 8-day MA",
      "tradeDuration": "swing",
      "setup": "pullback-entry",
      "status": "active",
      "confirmationStatus": "unconfirmed",
      "classifications": {
        "isBreakout": false,
        "isReversal": false,
        "isFlagPattern": false,
        "isFailedBreakdown": false,
        "isEarningsPlay": false,
        "isDayAfterTrade": false,
        "isTrendFollow": true,
        "isRangePlay": false,
        "isGapFill": false,
        "isMomentumPlay": false
      },
      "positionSizing": {
        "recommendation": "half",
        "reasoning": "High conviction but slightly higher risk profile"
      },
      "risk": {
        "plannedRMultiple": 2.0
      },
      "priority": 1,
      "category": "primary",
      "isFavorite": true,
      "origin": {
        "sourceCommand": "/create-plan",
        "createdBy": "plan-generator"
      }
    },
    {
      "schemaVersion": "0.5.2",
      "id": "idea-plan-20250520-BABA-01",
      "source": "system",
      "timestamp": "2025-05-20T08:45:00Z",
      "symbol": "BABA",
      "direction": "short",
      "conviction": {
        "level": "medium",
        "phrases": ["medium conviction"]
      },
      "entryParameters": {
        "zone": {
          "min": 121,
          "max": 121
        },
        "condition": "approaching 21-day MA",
        "strategy": "limit"
      },
      "exitParameters": {
        "stopLoss": 124,
        "target": 118,
        "strategy": "Tighter stop due to DAT volatility",
        "trimLevels": [
          {
            "price": 118,
            "percentage": 75
          },
          {
            "price": 115,
            "percentage": 15
          }
        ]
      },
      "rationale": "Post-earnings reaction trade",
      "tradeDuration": "day",
      "setup": "day-after-earnings",
      "status": "active",
      "confirmationStatus": "unconfirmed",
      "classifications": {
        "isBreakout": false,
        "isReversal": false,
        "isFlagPattern": false,
        "isFailedBreakdown": false,
        "isEarningsPlay": true,
        "isDayAfterTrade": true,
        "isTrendFollow": false,
        "isRangePlay": false,
        "isGapFill": false,
        "isMomentumPlay": false
      },
      "positionSizing": {
        "recommendation": "third",
        "reasoning": "Medium conviction with higher volatility"
      },
      "risk": {
        "plannedRMultiple": 1.6
      },
      "priority": 2,
      "category": "secondary",
      "isFavorite": false,
      "origin": {
        "sourceCommand": "/create-plan",
        "createdBy": "plan-generator"
      }
    },
    {
      "schemaVersion": "0.5.2",
      "id": "idea-plan-20250520-AMD-01",
      "source": "system",
      "timestamp": "2025-05-20T08:45:00Z",
      "symbol": "AMD",
      "direction": "long",
      "conviction": {
        "level": "medium",
        "phrases": ["medium conviction"]
      },
      "entryParameters": {
        "zone": {
          "min": 115,
          "max": 115
        },
        "condition": "price around 115",
        "strategy": "limit"
      },
      "exitParameters": {
        "stopLoss": 112,
        "target": 117.5,
        "strategy": "Consider time decay in management",
        "trimLevels": [
          {
            "price": 117.5,
            "percentage": 75
          },
          {
            "price": 120,
            "percentage": 15
          }
        ]
      },
      "rationale": "Entry near 21-day MA (115), 8-day MA at 117",
      "tradeDuration": "day",
      "setup": "ma-bounce",
      "status": "active",
      "confirmationStatus": "unconfirmed",
      "classifications": {
        "isBreakout": false,
        "isReversal": true,
        "isFlagPattern": false,
        "isFailedBreakdown": false,
        "isEarningsPlay": false,
        "isDayAfterTrade": false,
        "isTrendFollow": false,
        "isRangePlay": true,
        "isGapFill": false,
        "isMomentumPlay": false
      },
      "positionSizing": {
        "recommendation": "quarter",
        "reasoning": "Medium conviction range play"
      },
      "risk": {
        "plannedRMultiple": 1.8
      },
      "priority": 2,
      "category": "secondary",
      "isFavorite": false,
      "origin": {
        "sourceCommand": "/create-plan",
        "createdBy": "plan-generator"
      }
    },
    {
      "schemaVersion": "0.5.2",
      "id": "idea-plan-20250520-CRWD-01",
      "source": "system",
      "timestamp": "2025-05-20T08:45:00Z",
      "symbol": "CRWD",
      "direction": "long",
      "conviction": {
        "level": "medium",
        "phrases": ["medium conviction"]
      },
      "entryParameters": {
        "zone": {
          "min": null,
          "max": null
        },
        "condition": "Pullback opportunity after earnings",
        "strategy": "limit"
      },
      "exitParameters": {
        "stopLoss": null,
        "target": null,
        "strategy": "",
        "trimLevels": []
      },
      "rationale": "Viable setup on pullback",
      "tradeDuration": "swing",
      "setup": "earnings-related",
      "status": "pending",
      "confirmationStatus": "unconfirmed",
      "classifications": {
        "isBreakout": false,
        "isReversal": false,
        "isFlagPattern": false,
        "isFailedBreakdown": false,
        "isEarningsPlay": true,
        "isDayAfterTrade": false,
        "isTrendFollow": false,
        "isRangePlay": false,
        "isGapFill": false,
        "isMomentumPlay": false
      },
      "positionSizing": {
        "recommendation": "quarter",
        "reasoning": "Speculative earnings-related play"
      },
      "risk": {
        "plannedRMultiple": null
      },
      "priority": 3,
      "category": "watchlist",
      "isFavorite": false,
      "origin": {
        "sourceCommand": "/create-plan",
        "createdBy": "plan-generator"
      }
    },
    {
      "schemaVersion": "0.5.2",
      "id": "idea-plan-20250520-TSLA-01",
      "source": "system",
      "timestamp": "2025-05-20T08:45:00Z",
      "symbol": "TSLA",
      "direction": "long",
      "conviction": {
        "level": "low",
        "phrases": ["low conviction"]
      },
      "entryParameters": {
        "zone": {
          "min": 309,
          "max": 309
        },
        "condition": "Pullback to 8-day MA around 309",
        "strategy": "limit"
      },
      "exitParameters": {
        "stopLoss": 305,
        "target": 315,
        "strategy": "",
        "trimLevels": [
          {
            "price": 315,
            "percentage": 100
          }
        ]
      },
      "rationale": "Avoid chasing, only enter at specified level",
      "tradeDuration": "day",
      "setup": "pullback",
      "status": "pending",
      "confirmationStatus": "unconfirmed",
      "classifications": {
        "isBreakout": false,
        "isReversal": true,
        "isFlagPattern": false,
        "isFailedBreakdown": false,
        "isEarningsPlay": false,
        "isDayAfterTrade": false,
        "isTrendFollow": false,
        "isRangePlay": false,
        "isGapFill": false,
        "isMomentumPlay": false
      },
      "positionSizing": {
        "recommendation": "small",
        "reasoning": "Low conviction pullback play"
      },
      "risk": {
        "plannedRMultiple": 1.5
      },
      "priority": 3,
      "category": "watchlist",
      "isFavorite": false,
      "origin": {
        "sourceCommand": "/create-plan",
        "createdBy": "plan-generator"
      }
    }
  ],
  "scenarioPlanning": [
    {
      "type": "neutral",
      "conviction": "high",
      "trigger": "Failed breakouts/breakdowns at range extremes",
      "targets": [],
      "stop": null,
      "risk_reward": null,
      "probability": 60,
      "description": "Continued Consolidation: Multiple tests of range boundaries with eventual resolution"
    },
    {
      "type": "short",
      "conviction": "medium",
      "trigger": "Decisive break below 5900 with follow-through",
      "targets": [5850],
      "stop": 5926,
      "risk_reward": 1.4,
      "probability": 25,
      "description": "Bear Case: Test of 5850 major support level"
    },
    {
      "type": "long",
      "conviction": "low",
      "trigger": "Strong volume breakout above 5926 with acceptance",
      "targets": [5970],
      "stop": 5900,
      "risk_reward": 1.7,
      "probability": 15,
      "description": "Bull Case: Measured move toward 5970 target"
    }
  ],
  "riskManagement": {
    "accountSize": 100000,
    "maxRiskPercent": 1.0,
    "dailyRiskAmount": 1000,
    "positionSizing": "Risk 0.5% on primary setups, 0.25% on secondary",
    "stopPlacement": "Place stops below key support for longs, above key resistance for shorts",
    "trailStrategy": "Trail to breakeven after first target reached, trail with ATR for runners"
  },
  "metadata": {
    "generatedFrom": ["dp-analysis-20250520", "mancini-analysis-20250520"],
    "generationTimestamp": "2025-05-20T08:45:00Z",
    "updatedTimestamp": "2025-05-20T08:45:00Z"
  },
  "origin": {
    "sourceCommand": "/create-plan",
    "createdBy": "plan-generator"
  }
}
```

## Schema Validation Functions

The implementation includes the following validation functions to ensure schema compliance:

```javascript
// Validate object against runtime schema
function validateObject(object, schemaType) {
  // Check required fields based on schema type
  const requiredFields = getRequiredFields(schemaType);
  const missingFields = requiredFields.filter(field => !object[field]);
  
  if (missingFields.length > 0) {
    return {
      valid: false,
      errors: [`Missing required fields: ${missingFields.join(', ')}`]
    };
  }
  
  // Validate enum values
  const enumFields = getEnumFields(schemaType);
  const enumErrors = [];
  
  for (const field of enumFields) {
    if (object[field] && !isValidEnumValue(field, object[field])) {
      enumErrors.push(`Invalid value for ${field}: ${object[field]}`);
    }
  }
  
  if (enumErrors.length > 0) {
    return {
      valid: false,
      errors: enumErrors
    };
  }
  
  // Validate field types
  const typeErrors = validateFieldTypes(object, schemaType);
  if (typeErrors.length > 0) {
    return {
      valid: false,
      errors: typeErrors
    };
  }
  
  return { valid: true };
}

// Generate valid ID based on schema pattern
function generateId(type, date, symbol = null, sequence = '01') {
  const dateStr = date.replace(/-/g, '');
  
  if (symbol) {
    return `${type}-${dateStr}-${symbol}-${sequence}`;
  }
  
  return `${type}-${dateStr}`;
}

// Check if a trade idea is valid
function validateTradeIdea(idea) {
  return validateObject(idea, 'tradeIdea');
}

// Check if a level framework is valid
function validateLevelFramework(framework) {
  return validateObject(framework, 'levelFramework');
}

// Check if a market framework is valid
function validateMarketFramework(framework) {
  return validateObject(framework, 'marketFramework');
}

// Check if a trade plan is valid
function validateTradePlan(plan) {
  return validateObject(plan, 'tradePlan');
}
```

## Integration with Other Commands

The cached trade plan is used by:

- `/add-position`: Verifies alignment with plan before creating positions
- `/list-positions`: Compares actual positions against plan
- `/update-position`: Validates management decisions against plan guidelines
- `/size-position`: Uses risk allocations from plan for sizing recommendations
- `/run-debrief`: Evaluates trading performance against original plan

## Error Handling

- Missing DP Analysis: "Error: No DP analysis found. Run /analyze-dp first."
- Invalid Risk Percentage: "Error: Maximum risk percentage must be between 0.1 and 10."
- Invalid Mode: "Error: Mode must be 'Mode 1', 'Mode 2', or 'auto'."
- Cache Write Failure: "Warning: Failed to cache trade plan. Proceed with caution."
- Schema Validation Failure: "Error: Generated plan does not comply with schema: [VALIDATION_ERRORS]"

## Implementation Notes

- The command automatically retrieves analysis data if not provided directly
- Risk allocations scale based on conviction level and account size
- Mode detection is algorithmic but can be overridden manually
- The cache includes the complete plan data, not just a summary
- Each plan generation overwrites the previous cached plan
- The implementation follows a risk-first approach to trade planning
- All objects are validated against both the master and runtime schemas
- The runtime schema is used for efficient validation operations
- The master schema defines the complete requirements for all objects
- Schema-compliant objects use consistent naming conventions and boolean classifications
- Trade ideas include both required and optional fields as defined in the schemas
