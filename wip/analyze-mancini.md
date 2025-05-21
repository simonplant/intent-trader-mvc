---
id: analyze-mancini
title: Mancini Newsletter Analyzer
description: Analyzes Adam Mancini's ES Futures newsletter to generate actionable trade ideas and level frameworks
author: Intent Trader Team
version: 1.0.0
release: 0.5.2
created: 2025-05-19
updated: 2025-05-21
category: plan
status: active
tags: [plan, mancini, es-futures, analysis, trade-ideas]
requires: [system/schemas/intent-trader-master-schema.json, system/schemas/intent-trader-runtime-schema.json]
outputs: [state/mancini-analysis.json]
input_format: json
output_format: json
ai_enabled: true
---

# Mancini Newsletter Analyzer

## Purpose

The Mancini Newsletter Analyzer converts summarized data from Adam Mancini's ES Futures newsletter into structured, schema-compliant trade ideas and market analyses. It serves as a critical component in the Intent Trader workflow by:

1. **Market Mode Analysis**: Determining if the market is in Mode 1 (trending) or Mode 2 (range/trap)
2. **Level Framework Generation**: Creating a hierarchical structure of support/resistance levels
3. **Trade Idea Generation**: Producing actionable trade ideas from Mancini's analysis
4. **Scenario Planning**: Developing probability-weighted scenarios for different market conditions
5. **Runner Management**: Providing position management recommendations

This component outputs analysis in a format optimized for direct integration with the `/create-plan` command, following the canonical schema structure defined in Intent Trader v0.5.2.

## Usage

```
/analyze-mancini summary='{...}'
```

Pass the JSON output from the `/summarize-mancini-newsletter` command to this analyzer.

## Input Format

The component expects input in this structure (output from the summarizer):

```json
{
  "date": "2025-05-19",
  "title": "Newsletter title",
  "market_assessment": {
    "mode": "Mode 1/Mode 2",
    "bias": "bullish/bearish/neutral",
    "key_characteristic": "string",
    "context_notes": "string"
  },
  "levels": {
    "support": [...],
    "resistance": [...],
    "zones": [...],
    "key_decision_point": 5905
  },
  "failed_breakdowns": [...],
  "scenarios": {
    "bull_case": {...},
    "bear_case": {...}
  },
  "runner_management": {...},
  "trading_strategy": {...},
  "traps": {...},
  "raw_sections": {...}
}
```

## Processing Logic

The analyzer processes the summarized newsletter data in several stages:

### 1. Input Validation and Preparation

- Validates input JSON against expected format
- Extracts core components for analysis
- Standardizes date and timestamp formats
- Generates unique IDs for all created objects
- Sets up schema version and metadata

### 2. Market Framework Analysis

- Creates a schema-compliant `marketFramework` object
- Maps Mancini's market mode to canonical schema format
- Converts directional bias to enum value
- Calculates mode confidence based on language strength
- Extracts market character and catalysts
- Sets required base object properties:
  - `schemaVersion`
  - `id`
  - `source`
  - `timestamp`

### 3. Level Framework Analysis

- Creates a schema-compliant `levelFramework` object
- Processes support and resistance levels
- Converts level significance to schema strength values
- Structures indices levels for ES and SPX
- Sets key decision point
- Builds zones from consolidated information
- Sets required base object properties

### 4. Failed Breakdown Identification

- Analyzes failed breakdown setups from Mancini's analysis
- Maps to boolean classification flags in the schema
- Creates schema-compliant trade idea objects
- Sets `isFailedBreakdown: true` for applicable setups
- Provides complete idea parameters with:
  - Entry conditions
  - Exit parameters
  - Risk management
  - Conviction assessment

### 5. Scenario Planning

- Creates schema-compliant scenario objects
- Maps Mancini's bull/bear cases to scenarios
- Calculates probability percentages
- Determines risk-reward ratios
- Sets trigger conditions and targets
- Organizes by conviction level

### 6. Trade Idea Generation

- Creates schema-compliant `tradeIdea` objects
- Categorizes into primary and secondary ideas
- Applies appropriate boolean classification flags
- Sets conviction levels based on Mancini's language
- Provides complete parameters:
  - Entry zone and conditions
  - Stop loss and targets
  - Risk metrics
  - Setup classification

### 7. Schema Compliance Validation

- Validates all created objects against runtime schema
- Ensures compliance with master schema requirements
- Verifies required fields are present and valid
- Confirms boolean classification flags are properly set
- Validates enum values against allowed options

### 8. Response Generation

- Assembles complete analysis response
- Structures data for `/create-plan` compatibility
- Includes all required objects and relationships
- Formats output in JSON format

## Object Generation Details

### Market Framework Object

The analyzer creates a `marketFramework` object with the following structure:

```json
{
  "schemaVersion": "0.5.2",
  "id": "framework-market-mancini-20250519",
  "source": "mancini",
  "timestamp": "2025-05-19T09:00:00Z",
  "bias": "neutral-to-bullish",
  "biasCondition": "bullish above 5905, bearish below 5880",
  "mode": "Mode 2",
  "modeConfidence": 85,
  "character": "Consolidation in bull flag pattern",
  "catalysts": ["FOMC minutes tomorrow", "Option expiration Friday"],
  "keyMovers": [],
  "origin": {
    "sourceCommand": "/analyze-mancini",
    "createdBy": "mancini-analyzer"
  }
}
```

### Level Framework Object

The analyzer creates a `levelFramework` object with the following structure:

```json
{
  "schemaVersion": "0.5.2",
  "id": "framework-level-mancini-20250519",
  "source": "mancini",
  "timestamp": "2025-05-19T09:00:00Z",
  "indices": {
    "es": {
      "support": [
        {
          "price": 5860,
          "notes": "Multiple tests showing strong support",
          "type": "major",
          "strength": "strong"
        },
        {
          "price": 5880,
          "notes": "Recent consolidation low",
          "type": "major",
          "strength": "moderate"
        }
      ],
      "resistance": [
        {
          "price": 5945,
          "notes": "Recent swing high",
          "type": "major",
          "strength": "strong"
        },
        {
          "price": 5970,
          "notes": "Previous high",
          "type": "major",
          "strength": "moderate"
        }
      ]
    },
    "spx": {
      "support": [
        {
          "price": 5870,
          "notes": "SPX equivalent to ES 5860",
          "type": "major",
          "strength": "strong"
        },
        {
          "price": 5890,
          "notes": "SPX equivalent to ES 5880",
          "type": "major",
          "strength": "moderate"
        }
      ],
      "resistance": [
        {
          "price": 5955,
          "notes": "SPX equivalent to ES 5945",
          "type": "major",
          "strength": "strong"
        },
        {
          "price": 5980,
          "notes": "SPX equivalent to ES 5970",
          "type": "major",
          "strength": "moderate"
        }
      ]
    }
  },
  "stocks": [],
  "zones": [
    {
      "min": 5860,
      "max": 5880,
      "notes": "Key support zone",
      "type": "support"
    },
    {
      "min": 5945,
      "max": 5970,
      "notes": "Key resistance zone",
      "type": "resistance"
    }
  ],
  "keyDecisionPoint": 5905,
  "origin": {
    "sourceCommand": "/analyze-mancini",
    "createdBy": "mancini-analyzer"
  }
}
```

### Trade Idea Objects

The analyzer creates `tradeIdea` objects with the following structure:

```json
{
  "schemaVersion": "0.5.2",
  "id": "idea-mancini-20250519-ES-01",
  "source": "mancini",
  "timestamp": "2025-05-19T09:00:00Z",
  "symbol": "ES",
  "direction": "long",
  "conviction": {
    "level": "high",
    "phrases": ["strong conviction", "primary setup"]
  },
  "entryParameters": {
    "zone": {
      "min": 5880,
      "max": 5885
    },
    "condition": "Above 5880 after failure",
    "strategy": "limit"
  },
  "exitParameters": {
    "stopLoss": 5865,
    "target": 5945,
    "strategy": "Scale out at targets",
    "trimLevels": [
      {
        "price": 5945,
        "percentage": 50
      },
      {
        "price": 5970,
        "percentage": 50
      }
    ]
  },
  "rationale": "Multiple tests of support with strong rejection",
  "tradeDuration": "swing",
  "setup": "Failed Breakdown",
  "status": "active",
  "confirmationStatus": "unconfirmed",
  "classifications": {
    "isBreakout": false,
    "isReversal": false,
    "isFlagPattern": false,
    "isFailedBreakdown": true,
    "isEarningsPlay": false,
    "isDayAfterTrade": false,
    "isTrendFollow": false,
    "isRangePlay": false,
    "isGapFill": false,
    "isMomentumPlay": false
  },
  "positionSizing": {
    "recommendation": "full",
    "reasoning": "High conviction Mancini setup"
  },
  "risk": {
    "plannedRMultiple": 4.0
  },
  "priority": 1,
  "category": "primary",
  "isFavorite": true,
  "origin": {
    "sourceCommand": "/analyze-mancini",
    "createdBy": "mancini-analyzer"
  }
}
```

## Integration with `/create-plan`

The analyzer outputs are specifically structured to integrate with the `/create-plan` command:

1. **Market Framework Integration**:
   - `bias`, `biasCondition`, `mode`, and `modeConfidence` fields match the schema
   - `character` describes market character status
   - `catalysts` list key market events

2. **Level Framework Integration**:
   - `indices.es.support`, `indices.es.resistance` structures match the schema
   - Each level includes `price`, `notes`, `type`, and `strength`
   - `keyDecisionPoint` identifies critical decision thresholds

3. **Trade Idea Integration**:
   - Each idea is a complete, schema-compliant object
   - Boolean classification flags identify Mancini setups
   - All required fields are present and valid
   - Each idea includes proper `origin` tracking

4. **Scenario Planning Integration**:
   - Scenarios provide detailed conditionals for plan integration
   - Each includes `probability` and `risk_reward` calculations
   - Trigger conditions define scenario boundaries

## Output Format

The component produces JSON output following this structure:

```json
{
  "date": "2025-05-19",
  "source": "mancini",
  "marketFramework": {
    "schemaVersion": "0.5.2",
    "id": "framework-market-mancini-20250519",
    "source": "mancini",
    "timestamp": "2025-05-19T09:00:00Z",
    "bias": "neutral-to-bullish",
    "biasCondition": "bullish above 5905, bearish below 5880",
    "mode": "Mode 2",
    "modeConfidence": 85,
    "character": "Consolidation in bull flag pattern",
    "catalysts": ["FOMC minutes tomorrow", "Option expiration Friday"],
    "keyMovers": [],
    "origin": {
      "sourceCommand": "/analyze-mancini",
      "createdBy": "mancini-analyzer"
    }
  },
  "levelFramework": {
    "schemaVersion": "0.5.2",
    "id": "framework-level-mancini-20250519",
    "source": "mancini",
    "timestamp": "2025-05-19T09:00:00Z",
    "indices": {
      "es": {
        "support": [
          {
            "price": 5860,
            "notes": "Multiple tests showing strong support",
            "type": "major",
            "strength": "strong"
          },
          {
            "price": 5880,
            "notes": "Recent consolidation low",
            "type": "major",
            "strength": "moderate"
          }
        ],
        "resistance": [
          {
            "price": 5945,
            "notes": "Recent swing high",
            "type": "major",
            "strength": "strong"
          },
          {
            "price": 5970,
            "notes": "Previous high",
            "type": "major",
            "strength": "moderate"
          }
        ]
      },
      "spx": {
        "support": [
          {
            "price": 5870,
            "notes": "SPX equivalent to ES 5860",
            "type": "major",
            "strength": "strong"
          },
          {
            "price": 5890,
            "notes": "SPX equivalent to ES 5880",
            "type": "major",
            "strength": "moderate"
          }
        ],
        "resistance": [
          {
            "price": 5955,
            "notes": "SPX equivalent to ES 5945",
            "type": "major",
            "strength": "strong"
          },
          {
            "price": 5980,
            "notes": "SPX equivalent to ES 5970",
            "type": "major",
            "strength": "moderate"
          }
        ]
      }
    },
    "stocks": [],
    "zones": [
      {
        "min": 5860,
        "max": 5880,
        "notes": "Key support zone",
        "type": "support"
      },
      {
        "min": 5945,
        "max": 5970,
        "notes": "Key resistance zone",
        "type": "resistance"
      }
    ],
    "keyDecisionPoint": 5905,
    "origin": {
      "sourceCommand": "/analyze-mancini",
      "createdBy": "mancini-analyzer"
    }
  },
  "tradeIdeas": [
    {
      "schemaVersion": "0.5.2",
      "id": "idea-mancini-20250519-ES-01",
      "source": "mancini",
      "timestamp": "2025-05-19T09:00:00Z",
      "symbol": "ES",
      "direction": "long",
      "conviction": {
        "level": "high",
        "phrases": ["strong conviction", "primary setup"]
      },
      "entryParameters": {
        "zone": {
          "min": 5880,
          "max": 5885
        },
        "condition": "Above 5880 after failure",
        "strategy": "limit"
      },
      "exitParameters": {
        "stopLoss": 5865,
        "target": 5945,
        "strategy": "Scale out at targets",
        "trimLevels": [
          {
            "price": 5945,
            "percentage": 50
          },
          {
            "price": 5970,
            "percentage": 50
          }
        ]
      },
      "rationale": "Multiple tests of support with strong rejection",
      "tradeDuration": "swing",
      "setup": "Failed Breakdown",
      "status": "active",
      "confirmationStatus": "unconfirmed",
      "classifications": {
        "isBreakout": false,
        "isReversal": false,
        "isFlagPattern": false,
        "isFailedBreakdown": true,
        "isEarningsPlay": false,
        "isDayAfterTrade": false,
        "isTrendFollow": false,
        "isRangePlay": false,
        "isGapFill": false,
        "isMomentumPlay": false
      },
      "positionSizing": {
        "recommendation": "full",
        "reasoning": "High conviction Mancini setup"
      },
      "risk": {
        "plannedRMultiple": 4.0
      },
      "priority": 1,
      "category": "primary",
      "isFavorite": true,
      "origin": {
        "sourceCommand": "/analyze-mancini",
        "createdBy": "mancini-analyzer"
      }
    },
    {
      "schemaVersion": "0.5.2",
      "id": "idea-mancini-20250519-ES-02",
      "source": "mancini",
      "timestamp": "2025-05-19T09:00:00Z",
      "symbol": "ES",
      "direction": "short",
      "conviction": {
        "level": "medium",
        "phrases": ["secondary opportunity"]
      },
      "entryParameters": {
        "zone": {
          "min": 5967,
          "max": 5973
        },
        "condition": "Rejection at 5970",
        "strategy": "limit"
      },
      "exitParameters": {
        "stopLoss": 5985,
        "target": 5905,
        "strategy": "Scale out approach",
        "trimLevels": [
          {
            "price": 5945,
            "percentage": 30
          },
          {
            "price": 5905,
            "percentage": 70
          }
        ]
      },
      "rationale": "Prior resistance zone with volume",
      "tradeDuration": "day",
      "setup": "Range Fade",
      "status": "active",
      "confirmationStatus": "unconfirmed",
      "classifications": {
        "isBreakout": false,
        "isReversal": false,
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
        "recommendation": "half",
        "reasoning": "Medium conviction range play"
      },
      "risk": {
        "plannedRMultiple": 2.33
      },
      "priority": 2,
      "category": "secondary",
      "isFavorite": false,
      "origin": {
        "sourceCommand": "/analyze-mancini",
        "createdBy": "mancini-analyzer"
      }
    }
  ],
  "scenarios": [
    {
      "type": "long",
      "conviction": "high",
      "trigger": "reclaim 5905",
      "targets": [5945, 5970],
      "stop": 5890,
      "risk_reward": 2.75,
      "probability": 65,
      "description": "Bull Case: Break above key decision point leads to test of resistance levels"
    },
    {
      "type": "short",
      "conviction": "medium",
      "trigger": "fail below 5880",
      "targets": [5860, 5840],
      "stop": 5895,
      "risk_reward": 2.33,
      "probability": 55,
      "description": "Bear Case: Break below support triggers further downside"
    }
  ],
  "riskManagement": {
    "positionSizing": "Risk 0.5% per trade for primary setups",
    "stopPlacement": "Place stops 15 points below key support for longs",
    "trailStrategy": "Trail to breakeven after 50% of target reached"
  },
  "comments": "Bullish regime intact if 5905 reclaimed. Failed breakdowns below 5880 may be playable.",
  "timestamp": "2025-05-19T09:00:00Z",
  "schemaVersion": "0.5.2",
  "id": "mancini-analysis-20250519",
  "source": "mancini",
  "origin": {
    "sourceCommand": "/analyze-mancini",
    "createdBy": "mancini-analyzer"
  }
}
```

## Schema Validation Functions

The implementation includes several validation functions to ensure schema compliance:

```javascript
// Validate object against schema
function validateAgainstSchema(object, schemaType) {
  const schema = getSchemaForType(schemaType);
  const requiredProps = getRequiredProperties(schema);
  
  // Check required properties
  for (const prop of requiredProps) {
    if (object[prop] === undefined) {
      return {
        valid: false,
        error: `Missing required property: ${prop}`
      };
    }
  }
  
  // Validate enum values
  for (const [prop, value] of Object.entries(object)) {
    const enumValues = getEnumValuesForProperty(schema, prop);
    if (enumValues && !enumValues.includes(value)) {
      return {
        valid: false,
        error: `Invalid enum value for ${prop}: ${value}`
      };
    }
  }
  
  return { valid: true };
}

// Generate valid ID
function generateId(type, date, symbol = null, sequence = '01') {
  const dateStr = date.replace(/-/g, '');
  
  if (symbol) {
    return `idea-mancini-${dateStr}-${symbol}-${sequence}`;
  }
  
  return `mancini-analysis-${dateStr}`;
}

// Create a properly structured trade idea
function createTradeIdea(params) {
  const {
    date,
    symbol,
    direction,
    setup,
    conviction,
    entry,
    target,
    stop,
    sequence,
    notes
  } = params;
  
  // Create classifications object with all flags defaulted to false
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
  
  // Set appropriate classification flag based on setup
  switch (setup.toLowerCase()) {
    case 'failed breakdown':
      classifications.isFailedBreakdown = true;
      break;
    case 'range fade':
      classifications.isRangePlay = true;
      break;
    case 'breakout':
      classifications.isBreakout = true;
      break;
    case 'trend follow':
      classifications.isTrendFollow = true;
      break;
    case 'reversal':
      classifications.isReversal = true;
      break;
  }
  
  // Create a valid trade idea object
  const tradeIdea = {
    schemaVersion: "0.5.2",
    id: generateId('idea', date, symbol, sequence),
    source: "mancini",
    timestamp: `${date}T09:00:00Z`,
    symbol,
    direction,
    conviction: {
      level: conviction,
      phrases: []
    },
    entryParameters: {
      zone: {
        min: entry,
        max: entry
      },
      condition: "",
      strategy: "limit"
    },
    exitParameters: {
      stopLoss: stop,
      target: target,
      strategy: "Scale out at targets",
      trimLevels: []
    },
    rationale: notes || "",
    tradeDuration: "swing",
    setup,
    status: "active",
    confirmationStatus: "unconfirmed",
    classifications,
    positionSizing: {
      recommendation: getPositionSizeForConviction(conviction),
      reasoning: `${conviction} conviction ${setup} setup`
    },
    risk: {
      plannedRMultiple: calculateRMultiple(target, entry, stop)
    },
    priority: getPriorityForConviction(conviction),
    category: getCategoryForConviction(conviction),
    isFavorite: conviction === "high",
    origin: {
      sourceCommand: "/analyze-mancini",
      createdBy: "mancini-analyzer"
    }
  };
  
  return tradeIdea;
}

// Helper functions for trade idea creation
function getPositionSizeForConviction(conviction) {
  switch (conviction) {
    case "high": return "full";
    case "medium": return "half";
    case "low": return "quarter";
    default: return "quarter";
  }
}

function calculateRMultiple(target, entry, stop) {
  if (!target || !entry || !stop) return null;
  const risk = Math.abs(entry - stop);
  const reward = Math.abs(target - entry);
  return parseFloat((reward / risk).toFixed(2));
}

function getPriorityForConviction(conviction) {
  switch (conviction) {
    case "high": return 1;
    case "medium": return 2;
    case "low": return 3;
    default: return 3;
  }
}

function getCategoryForConviction(conviction) {
  switch (conviction) {
    case "high": return "primary";
    case "medium": return "secondary";
    case "low": return "watchlist";
    default: return "watchlist";
  }
}
```

## Example Usage

To analyze a Mancini newsletter:

1. First, use the summarizer to process the raw newsletter:

```
/summarize-mancini-newsletter
```

2. Then pass the summarized output to the analyzer:

```
/analyze-mancini summary='{
  "date": "2025-05-19",
  "title": "ES Futures Companion",
  "market_assessment": {
    "mode": "Mode 2",
    "bias": "neutral-to-bullish",
    "key_characteristic": "Consolidation in bull flag pattern",
    "context_notes": "Multiple tests of support showing strength"
  },
  "levels": {
    "support": [
      {"price": 5860, "significance": "major"},
      {"price": 5880, "significance": "moderate"}
    ],
    "resistance": [
      {"price": 5945, "significance": "major"},
      {"price": 5970, "significance": "moderate"}
    ],
    "key_decision_point": 5905
  },
  "failed_breakdowns": [
    {
      "level": 5860,
      "direction": "long",
      "condition": "Entry above 5880 after failure",
      "target": 5945,
      "stop": 5865,
      "notes": "Multiple tests of support with strong rejection"
    }
  ],
  "scenarios": {
    "bull_case": {
      "trigger": "reclaim 5905",
      "targets": [5945, 5970],
      "stop": 5890,
      "confidence": "high",
      "probability": 65
    },
    "bear_case": {
      "trigger": "fail below 5880",
      "targets": [5860, 5840],
      "stop": 5895,
      "confidence": "medium",
      "probability": 55
    }
  },
  "runner_management": {
    "trim_targets": [5945, 5970],
    "current_runners": [
      {"entry": 5880, "current_stop": 5860, "target": 5945}
    ],
    "trail_strategy": "Trail to breakeven after 50% of target reached"
  },
  "trading_strategy": {
    "primary_setup": "Failed Breakdown",
    "risk_parameters": {
      "stop_placement": "Place stops 15 points below key support for longs",
      "position_sizing": "Risk 0.5% per trade for primary setups"
    }
  },
  "traps": {
    "failed_breakdowns": [5860]
  },
  "catalysts": ["FOMC minutes tomorrow", "Option expiration Friday"]
}'
```

## Implementation Notes

This component follows the dual-schema approach of Intent Trader v0.5.2:

1. **Master Schema Integration**:
   - Uses the canonical schema for complete object structure
   - Implements proper inheritance from baseObject
   - Ensures all objects comply with comprehensive requirements
   - Follows the defined patterns for classification using boolean flags
   - Maintains schema-compliant ID formats

2. **Runtime Schema Usage**:
   - Implements flat structure for Claude compatibility
   - Maintains schema limit of 3 levels nesting
   - Validates objects against runtime schema for efficiency
   - Ensures proper field types and values

3. **Boolean Classifications**:
   - Replaces all text-based classifications with boolean flags
   - Uses schema-defined flags for Mancini setups:
     - `isFailedBreakdown`
     - `isRangePlay`
     - `isBreakout`
     - `isTrendFollow`
     - `isReversal`
   - Ensures zero-ambiguity in classification implementation

4. **Schema-Compliant Objects**:
   - All objects include required baseObject properties
   - All fields use camelCase naming convention
   - All enum values are selected from valid options
   - All relationships maintain appropriate hierarchy

The component maintains educational content on the Mancini Method while providing schema-compliant output for use in the Intent Trader system.

## Educational: The Mancini Method

### Overview
Adam Mancini's ES Futures analysis focuses on understanding market structure, identifying key levels, and recognizing specific setups that have high probability outcomes. The Mancini Method classifies the market into two primary modes:

- **Mode 1**: Trending market with directional momentum
- **Mode 2**: Range-bound or trap-prone market

### Failed Breakdown Setup
The Failed Breakdown setup is a signature Mancini pattern that occurs when:
1. Price breaks below a key support level
2. The breakdown fails to continue lower
3. Price reclaims the level that was broken
4. This failed breakdown becomes a long entry trigger

This setup works particularly well in Mode 2 markets where false breakouts and breakdowns are common. The failed move creates a vacuum effect in the opposite direction, often leading to powerful moves.

### Level Framework
Mancini's level framework establishes hierarchical support/resistance levels:
- **Major Levels**: Significant structural points with multiple tests
- **Decision Points**: Levels that separate bull/bear scenarios
- **Zones**: Areas where price may consolidate or make decisions

### Key Characteristics
Important characteristics of Mancini setups:
1. **Multiple Tests**: A level becomes stronger with repeated tests
2. **Context**: The same level has different significance in Mode 1 vs. Mode 2
3. **Volume**: Failed breakdowns with high volume rejections have better success rates
4. **Invalidation**: Clear stop levels define where the setup is no longer valid

This analyzer captures these key aspects of the Mancini Method while translating them into schema-compliant trade ideas and market assessments for the Intent Trader system.

## Integration with Intent Trader System

The Mancini Newsletter Analyzer is part of the Intent Trader workflow:

1. **Input Stream**: Raw newsletter content
2. **Processing**: 
   - `/summarize-mancini-newsletter` extracts key data
   - `/analyze-mancini` converts to schema-compliant objects
3. **Output Usage**:
   - `/create-plan` integrates with DP analysis
   - Scenarios feed into plan scenario planning
   - Trade ideas are added to the unified trade plan
   - Level framework enriches the global level structure

This modular approach ensures:
- Clean separation of extraction and analysis
- Schema compliance at all stages
- Seamless integration with other components
- Preservation of educational content
