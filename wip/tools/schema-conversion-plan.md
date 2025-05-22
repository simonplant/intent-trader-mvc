# Schema Conversion Plan for Intent Trader Prompts

## Overview

This document outlines the step-by-step process for converting existing prompt files to use the canonical schema (`intent-trader-master-schema.json`) and its runtime variant (`trading-intent.runtime.json`). The goal is to standardize all data structures across the Intent Trader system, reduce ambiguity, and ensure LLM compatibility.

## General Conversion Guidelines

1. **Front Matter Updates**
   - Add `requires: [
  "system/schemas/intent-trader-master-schema.json",
  "system/schemas/intent-trader-runtime-schema.json"
]` to all prompt front matter
   - Update version to match schema version (0.5.2)
   - Add appropriate schema tags

2. **Input/Output Format Standardization**
   - Replace custom JSON structures with canonical schema objects
   - Ensure all objects include `schemaVersion`, `id`, and `source` fields
   - Use exact field names as defined in the schema

3. **Schema Reference Integration**
   - Add schema reference section to prompt instructions
   - Replace hard-coded structure definitions with schema references
   - Update examples to use schema-compliant objects

4. **Boolean Classification Conversion**
   - Replace text-based classifications with boolean flags
   - Convert ambiguous enums to clear boolean properties
   - Use `is` prefix for classification flags (e.g., `isBreakout`, `isReversal`)

5. **Format Validation Guidelines**
   - Add validation instructions where applicable
   - Reference maximum nesting depth (3 levels for runtime schema)
   - Include schema version checks

## Prompt-Specific Conversion Plans

### 1. analyze-dp.md

**Current Structure:**
```json
{
  "processorVersion": "1.0.0",
  "marketContext": {...},
  "focusIdeas": [
    {
      "ticker": "string",
      "direction": "long/short",
      "conviction": {...},
      "entryParameters": {...},
      "exitParameters": {...},
      "rationale": "string",
      "isDayAfterTrade": "boolean",
      "tradeDuration": "cashflow/day/swing/long-term",
      "frequency": "number",
      "isFavorite": "boolean"
    }
  ],
  "levels": {...},
  "processingMetadata": {...}
}
```

**Converted Structure:**
```json
{
  "schemaVersion": "0.5.2",
  "id": "dp-analysis-20250520",
  "source": "dp",
  "timestamp": "2025-05-20T08:30:00Z",
  "marketContext": {
    "futures": {"status": "string", "catalysts": ["string"]},
    "indices": {
      "dow": {"direction": "string", "change": "string"},
      "nasdaq": {"direction": "string", "change": "string"}
    },
    "keyMovers": [
      {
        "ticker": "string",
        "direction": "string",
        "magnitude": "string",
        "reason": "string"
      }
    ],
    "sentiment": "string"
  },
  "tradeIdeas": [
    {
      "schemaVersion": "0.5.2",
      "id": "idea-dp-20250520-TEM-01",
      "source": "dp",
      "timestamp": "2025-05-20T08:30:00Z",
      "symbol": "string",
      "direction": "long/short",
      "conviction": {
        "level": "focus-trade/high/medium/low/negative",
        "phrases": ["string"]
      },
      "entryParameters": {
        "zone": {"min": "number", "max": "number"},
        "condition": "string"
      },
      "exitParameters": {
        "stopLoss": "number",
        "target": "number"
      },
      "rationale": "string",
      "tradeDuration": "cashflow/day/swing/position/long-term",
      "frequency": "number",
      "isFavorite": "boolean",
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
      }
    }
  ],
  "levelFramework": {
    "indices": {
      "es": {
        "support": [{"price": "number", "notes": "string"}],
        "resistance": [{"price": "number", "notes": "string"}]
      },
      "spx": {
        "support": [{"price": "number", "notes": "string"}],
        "resistance": [{"price": "number", "notes": "string"}]
      }
    },
    "stocks": [
      {
        "ticker": "string",
        "levels": {
          "support": [{"price": "number", "notes": "string"}],
          "resistance": [{"price": "number", "notes": "string"}]
        },
        "movingAverages": {"ma8": "number", "ma21": "number"}
      }
    ]
  },
  "processingMetadata": {
    "status": "success|partial_success|failure",
    "confidenceScore": "number",
    "sectionsCaptured": ["string"],
    "missingSections": ["string"]
  },
  "origin": {
    "sourceCommand": "/analyze-dp",
    "createdBy": "dp-analyzer"
  }
}
```

**Key Changes:**
- Added schema version, ID, source, and timestamp fields
- Renamed `focusIdeas` to `tradeIdeas` to match schema
- Each trade idea now includes its own schema version, ID, source, and timestamp
- Added comprehensive `classifications` object with boolean flags
- Renamed `levels` to `levelFramework` to match schema
- Standardized enumeration values to match schema

### 2. analyze-mancini.md

**Current Structure:**
```json
{
  "date": "2025-05-19",
  "source": "mancini",
  "mode": "Mode 1/Mode 2",
  "bias": "bullish/bearish/neutral",
  "modeConfidence": 85,
  "character": "string",
  "levels": {...},
  "traps": {...},
  "scenarios": [...],
  "runner_trim_targets": [...],
  "comments": "string",
  "catalysts": ["string"],
  "tradeIdeas": {
    "primary": [...],
    "secondary": [...]
  },
  "riskManagement": {...},
  "detailed_assessment": {...}
}
```

**Converted Structure:**
```json
{
  "schemaVersion": "0.5.2",
  "id": "mancini-analysis-20250520",
  "source": "mancini",
  "timestamp": "2025-05-20T07:30:00Z",
  "marketFramework": {
    "bias": "bullish/bearish/neutral/neutral-to-bullish/neutral-to-bearish",
    "biasCondition": "string",
    "mode": "Mode 1/Mode 2",
    "modeConfidence": "number",
    "character": "string",
    "catalysts": ["string"]
  },
  "levelFramework": {
    "indices": {
      "es": {
        "support": [{"price": "number", "notes": "string", "type": "major/minor/psychological", "strength": "strong/moderate/weak"}],
        "resistance": [{"price": "number", "notes": "string", "type": "major/minor/psychological", "strength": "strong/moderate/weak"}]
      },
      "spx": {
        "support": [{"price": "number", "notes": "string", "type": "major/minor/psychological", "strength": "strong/moderate/weak"}],
        "resistance": [{"price": "number", "notes": "string", "type": "major/minor/psychological", "strength": "strong/moderate/weak"}]
      }
    },
    "zones": [
      {
        "min": "number",
        "max": "number",
        "notes": "string",
        "type": "entry/profit/stop/decision/consolidation"
      }
    ],
    "keyDecisionPoint": "number"
  },
  "scenarioPlanning": [
    {
      "type": "long/short/neutral",
      "conviction": "high/medium/low",
      "trigger": "string",
      "targets": ["number"],
      "stop": "number",
      "risk_reward": "number",
      "probability": "number",
      "description": "string"
    }
  ],
  "tradeIdeas": [
    {
      "schemaVersion": "0.5.2",
      "id": "idea-mancini-20250520-ES-01",
      "source": "mancini",
      "timestamp": "2025-05-20T07:30:00Z",
      "symbol": "string",
      "direction": "long/short",
      "setup": "string",
      "conviction": {
        "level": "focus-trade/high/medium/low/negative"
      },
      "entryParameters": {
        "zone": {"min": "number", "max": "number"},
        "condition": "string"
      },
      "exitParameters": {
        "stopLoss": "number",
        "target": "number"
      },
      "rationale": "string",
      "tradeDuration": "cashflow/day/swing/position/long-term",
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
      "priority": "number"
    }
  ],
  "riskManagement": {
    "positionSizing": "string",
    "stopPlacement": "string",
    "trailStrategy": "string"
  },
  "origin": {
    "sourceCommand": "/analyze-mancini",
    "createdBy": "mancini-analyzer"
  }
}
```

**Key Changes:**
- Added schema version, ID, and timestamp fields
- Renamed `mode` and `bias` section to `marketFramework`
- Expanded level framework with type and strength attributes
- Standardized `scenarioPlanning` structure
- Converted trade ideas to array of schema-compliant objects
- Added comprehensive `classifications` object with boolean flags
- Renamed snake_case properties to camelCase

### 3. create-plan.md

**Current Cached Structure:**
```json
{
  "tradePlan": {
    "date": "2025-05-15",
    "timestamp": "2025-05-15T07:45:00Z",
    "marketFramework": {...},
    "levelFramework": {...},
    "tradeIdeas": {
      "primary": [...],
      "secondary": [...],
      "watchlist": [...]
    },
    "scenarioPlanning": {...},
    "riskManagement": {...},
    "managementProtocol": {...},
    "metadata": {...}
  }
}
```

**Converted Structure:**
```json
{
  "schemaVersion": "0.5.2",
  "id": "trade-plan-20250520",
  "source": "system",
  "timestamp": "2025-05-20T08:45:00Z",
  "date": "2025-05-20",
  "marketFramework": {
    "bias": "bullish/bearish/neutral/neutral-to-bullish/neutral-to-bearish",
    "biasCondition": "string",
    "mode": "Mode 1/Mode 2",
    "modeConfidence": "number",
    "character": "string",
    "catalysts": ["string"],
    "keyMovers": [
      {
        "ticker": "string",
        "direction": "string",
        "magnitude": "string",
        "reason": "string"
      }
    ]
  },
  "levelFramework": {
    "indices": {
      "es": {
        "support": [{"price": "number", "notes": "string", "type": "major/minor/psychological", "strength": "strong/moderate/weak"}],
        "resistance": [{"price": "number", "notes": "string", "type": "major/minor/psychological", "strength": "strong/moderate/weak"}]
      },
      "spx": {
        "support": [{"price": "number", "notes": "string", "type": "major/minor/psychological", "strength": "strong/moderate/weak"}],
        "resistance": [{"price": "number", "notes": "string", "type": "major/minor/psychological", "strength": "strong/moderate/weak"}]
      }
    },
    "stocks": [
      {
        "ticker": "string",
        "levels": {
          "support": [{"price": "number", "notes": "string"}],
          "resistance": [{"price": "number", "notes": "string"}]
        },
        "movingAverages": {"ma8": "number", "ma21": "number"}
      }
    ],
    "zones": [
      {
        "min": "number",
        "max": "number",
        "notes": "string",
        "type": "entry/profit/stop/decision/consolidation"
      }
    ],
    "keyDecisionPoint": "number"
  },
  "tradeIdeas": [
    {
      "schemaVersion": "0.5.2",
      "id": "idea-plan-20250520-SYMBOL-01",
      "source": "system",
      "timestamp": "2025-05-20T08:45:00Z",
      "symbol": "string",
      "direction": "long/short",
      "conviction": {
        "level": "focus-trade/high/medium/low/negative"
      },
      "entryParameters": {
        "zone": {"min": "number", "max": "number"},
        "condition": "string",
        "strategy": "market/limit/scaled/test-position/all-in"
      },
      "exitParameters": {
        "stopLoss": "number",
        "target": "number",
        "strategy": "string",
        "trimLevels": [
          {
            "price": "number",
            "percentage": "number"
          }
        ]
      },
      "rationale": "string",
      "tradeDuration": "cashflow/day/swing/position/long-term",
      "setup": "string",
      "status": "active",
      "confirmationStatus": "unconfirmed/confirmed/rejected/modified",
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
      "positionSizing": {
        "recommendation": "full/half/third/quarter/small/speculative",
        "reasoning": "string"
      },
      "priority": "number",
      "category": "primary/secondary/watchlist"
    }
  ],
  "scenarioPlanning": [
    {
      "type": "long/short/neutral",
      "conviction": "high/medium/low",
      "trigger": "string",
      "targets": ["number"],
      "stop": "number",
      "risk_reward": "number",
      "probability": "number",
      "description": "string"
    }
  ],
  "riskManagement": {
    "accountSize": "number",
    "maxRiskPercent": "number",
    "dailyRiskAmount": "number",
    "positionSizing": "string",
    "stopPlacement": "string",
    "trailStrategy": "string"
  },
  "metadata": {
    "generatedFrom": ["string"],
    "generationTimestamp": "2025-05-20T08:45:00Z",
    "updatedTimestamp": "2025-05-20T08:45:00Z"
  },
  "origin": {
    "sourceCommand": "/create-plan",
    "createdBy": "plan-generator"
  }
}
```

**Key Changes:**
- Added schema version, ID, source, and timestamp fields
- Flattened structure by removing outer `tradePlan` wrapper
- Converted trade ideas from categories to array with category field
- Added comprehensive `classifications` object with boolean flags
- Normalized all field names to match canonical schema
- Added required origin information

## Implementation Workflow

For each prompt file that needs conversion:

1. **Update Front Matter**
   - Add schema requirement
   - Update version and tags

2. **Update Examples**
   - Replace old examples with schema-compliant ones
   - Ensure all examples use proper fields

3. **Update Processing Logic**
   - Modify extraction and processing to match schema structure
   - Add validation against schema requirements
   - Update error handling for schema validation

4. **Update Output Structure**
   - Ensure all output fields match canonical schema
   - Add required schema fields to output objects

5. **Add Schema Reference**
   - Add appropriate schema reference sections
   - Include validation instructions

## Schema Reference Example

Add this section to each prompt file:

```markdown
## Schema Reference

This component uses the Intent Trader canonical schema (v0.5.2) for all data structures. All objects must include:

- `schemaVersion`: "0.5.2"
- `id`: Unique identifier
- `source`: Origin system ("dp", "mancini", "system", etc.)
- `timestamp`: ISO timestamp of creation

Trade ideas follow the tradeIdea schema with these required fields:
- `symbol`: Ticker symbol
- `direction`: "long" or "short"
- `conviction.level`: One of "focus-trade", "high", "medium", "low", "negative"

Level data follows the levelFramework schema with specific formats for indices and stocks.

Classifications use boolean flags for unambiguous categorization:
- `isBreakout`: true/false
- `isReversal`: true/false
- `isFlagPattern`: true/false
- etc.

Maximum nesting depth is 3 levels for Claude compatibility.
```

## Testing Procedure

For each converted prompt:

1. **Schema Validation**
   - Validate output against canonical schema
   - Verify all required fields are present
   - Check for proper nesting depth

2. **Functional Testing**
   - Test with sample input
   - Verify correct classification mapping
   - Check integration with dependent components

3. **Documentation**
   - Update example output in documentation
   - Add schema version to example requirements
