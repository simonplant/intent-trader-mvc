---
id: analyze-chart-v0.5.2
title: Schema-Compliant Chart Analysis Tool
description: Analyzes chart images for patterns and trading opportunities using the canonical schema
author: Intent Trader Team
version: 1.0.0
release: 0.5.2
created: 2025-05-15
updated: 2025-05-21
category: utilities
status: stable
tags: [analysis, chart, patterns, technical-analysis, utilities, schema-validation]
requires: [system/schemas/intent-trader-master-schema.json, system/schemas/intent-trader-runtime-schema.json, system/technical-framework/pattern-recognition.md, system/technical-framework/level-significance.md, system/technical-framework/mancini-integration.md, system/chart-visual-legend.md]
outputs: [state/chart-analysis.json]
input_format: image
output_format: json
ai_enabled: true
---

# Schema-Compliant Chart Analysis Tool

## Purpose
The `/analyze-chart` command processes chart images to identify key patterns, support/resistance levels, and trading opportunities using the canonical schema defined in Intent Trader v0.5.2. It produces structured analysis that integrates with the trade planning process, ensuring all technical patterns and levels conform to the standardized boolean classification system and level framework structure.

## Input Parameters

| Parameter | Required | Description | Format | Default |
|-----------|----------|-------------|--------|---------|
| `image` | Yes | Chart image to analyze | Image | - |
| `symbol` | No | Ticker symbol for additional context | String | (Auto-detected) |
| `timeframe` | No | Chart timeframe | String: "1m", "5m", "15m", "30m", "1h", "daily", "weekly" | "auto-detect" |
| `focus` | No | Analysis focus | String: "support-resistance", "patterns", "entries", "review", "comprehensive" | "comprehensive" |
| `context` | No | Additional market context information | String | "" |
| `validateSchema` | No | Validate output against schema | Boolean | true |
| `includeInPlan` | No | Include analysis in current plan | Boolean | false |

## Processing Logic

### 1. Image Analysis
- Process the chart image using computer vision techniques
- Extract price data, indicators, and patterns
- Detect candlestick formations and price action clues
- Identify drawn annotations and levels on the chart
- Determine timeframe if not specified

### 2. Technical Level Extraction
- Identify key support and resistance levels
- Detect moving averages and their relationships
- Identify pivot points, daily ranges, and key levels
- Calculate confluence zones of multiple levels
- Create a schema-compliant `levelFramework` object

### 3. Pattern Recognition
- Apply pattern recognition algorithms to identify setups
- Classify patterns using the boolean classification system
- Validate pattern completeness and reliability
- Determine pattern significance and historical reliability
- Create schema-compliant pattern classifications

### 4. Trade Setup Evaluation
- Determine potential entry and exit parameters
- Calculate risk/reward metrics for identified opportunities
- Evaluate conviction levels for potential setups
- Integrate with existing trade ideas when possible
- Generate schema-compliant `tradeIdea` objects

### 5. Focus-Specific Analysis
- Customize analysis based on the focus parameter
- Prioritize relevant information for the selected focus
- Adjust detail level according to the selected focus
- Generate appropriate visualizations for the focus

### 6. Schema Validation
- Validate all generated objects against the runtime schema
- Ensure complete compliance with master schema structure
- Verify required fields, relationships, and constraints
- Apply data type validation and constraint checking

### 7. Output Generation
- Format JSON response with all analysis components
- Include generated objects in schema-compliant structure
- Add metadata about analysis confidence and completeness
- Generate visual annotations for reference

## Response Format

The command returns a JSON object with the following structure:

```json
{
  "schemaVersion": "0.5.2",
  "id": "analysis-chart-20250521-AAPL-01",
  "source": "system",
  "timestamp": "2025-05-21T10:30:00Z",
  "metadata": {
    "analyzedImage": "chart-20250521-AAPL-5m.png",
    "confidence": 0.85,
    "timeframe": "5m",
    "symbol": "AAPL",
    "focus": "patterns",
    "analysisDate": "2025-05-21"
  },
  "marketContext": {
    "bias": "bullish",
    "character": "Strong trending action with volume confirmation",
    "notes": "Breaking out of bull flag consolidation pattern"
  },
  "levelFramework": {
    "schemaVersion": "0.5.2",
    "id": "levels-chart-20250521-AAPL-01",
    "source": "system",
    "timestamp": "2025-05-21T10:30:00Z",
    "stocks": [
      {
        "ticker": "AAPL",
        "levels": {
          "support": [
            {
              "price": 215.50,
              "notes": "Prior resistance now support",
              "type": "major",
              "strength": "strong"
            },
            {
              "price": 210.75,
              "notes": "8-day MA level",
              "type": "key",
              "strength": "moderate"
            }
          ],
          "resistance": [
            {
              "price": 225.00,
              "notes": "Psychological level",
              "type": "psychological",
              "strength": "moderate"
            },
            {
              "price": 220.50,
              "notes": "Intraday high",
              "type": "minor",
              "strength": "weak"
            }
          ]
        },
        "movingAverages": {
          "ma8": 210.75,
          "ma21": 205.80,
          "ma50": 198.42,
          "ma200": 185.75
        }
      }
    ],
    "zones": [
      {
        "min": 215.50,
        "max": 217.25,
        "notes": "Entry zone",
        "type": "entry"
      },
      {
        "min": 212.80,
        "max": 215.50,
        "notes": "Stop zone",
        "type": "stop"
      }
    ],
    "origin": {
      "sourceCommand": "/analyze-chart",
      "createdBy": "chart-analyzer"
    }
  },
  "patternAnalysis": {
    "tradeIdea": {
      "schemaVersion": "0.5.2",
      "id": "idea-chart-20250521-AAPL-01",
      "source": "system",
      "timestamp": "2025-05-21T10:30:00Z",
      "symbol": "AAPL",
      "direction": "long",
      "conviction": {
        "level": "high",
        "phrases": ["strong pattern confirmation", "high volume breakout"]
      },
      "entryParameters": {
        "zone": {
          "min": 215.50,
          "max": 217.25
        },
        "condition": "pullback to 8-day MA with decreasing volume",
        "strategy": "limit"
      },
      "exitParameters": {
        "stopLoss": 212.80,
        "target": 225.00,
        "strategy": "Scale out 50% at first target, 30% at second, trail remainder",
        "trimLevels": [
          {
            "price": 220.50,
            "percentage": 50
          },
          {
            "price": 225.00,
            "percentage": 30
          }
        ]
      },
      "rationale": "Bullish flag breakout with increasing volume and MA support",
      "tradeDuration": "swing",
      "setup": "flag-breakout",
      "status": "active",
      "confirmationStatus": "confirmed",
      "classifications": {
        "isBreakout": true,
        "isReversal": false,
        "isFlagPattern": true,
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
        "reasoning": "High conviction pattern with clear risk parameters"
      },
      "risk": {
        "plannedRMultiple": 2.4
      },
      "origin": {
        "sourceCommand": "/analyze-chart",
        "createdBy": "chart-analyzer"
      }
    },
    "patternEvidence": [
      {
        "type": "volume",
        "description": "Increasing volume on breakout candle",
        "significance": 8,
        "location": {
          "candle": 34,
          "timestamp": "2025-05-21T10:15:00Z"
        }
      },
      {
        "type": "priceAction",
        "description": "Clean break of resistance at 215.50",
        "significance": 9,
        "location": {
          "candle": 32,
          "timestamp": "2025-05-21T10:05:00Z"
        }
      },
      {
        "type": "indicator",
        "description": "RSI showing strength at 65, not overbought",
        "significance": 7,
        "location": {
          "candle": 34,
          "timestamp": "2025-05-21T10:15:00Z"
        }
      }
    ]
  },
  "momentumAssessment": {
    "trafficLightStatus": "Green",
    "interpretation": "Strong bullish momentum - price above both 8 and 21 SMAs",
    "recentTransition": "Yellow to Green (5 bars ago)",
    "tradeBias": "Long bias, look for pullbacks to 8 SMA for entries",
    "conviction": "High - traffic light aligned with price action and volume"
  },
  "rsiAssessment": {
    "currentValue": 65,
    "tickerSpecificRange": {
      "historical": {"low": 30, "high": 75},
      "interpretation": "Showing strength but not overbought for this ticker",
      "extremeStatus": "Neutral (normal range: 30-75)"
    },
    "divergence": {
      "detected": false,
      "type": null,
      "significance": null
    }
  },
  "priceReferencePoints": {
    "yesterdaysHigh": 216.25,
    "yesterdaysLow": 212.50,
    "currentPosition": "Above yH (bullish)",
    "openingBehavior": "Opened inside range, broke above yH at 10:05am",
    "pivotPoints": {
      "pp": 214.38,
      "r1": 217.12,
      "r2": 219.87,
      "r3": 222.60,
      "s1": 211.62,
      "s2": 208.87,
      "s3": 206.12
    },
    "keyPivotReactions": "Bounce off PP (214.38) at 9:45am created bullish momentum"
  },
  "maRelationships": {
    "alignment": "Bullish - 8 > 21 > 50 > 200",
    "crossovers": "Recent 8/21 bullish cross (3 days ago)",
    "price": "Trading above all major MAs",
    "compression": "Low - MAs well separated indicating clear trend"
  },
  "vwapAnalysis": {
    "dailyVwap": "Price above VWAP (bullish intraday bias)",
    "anchoredVwap": "Above January AVWAP (maintaining long-term bullish structure)",
    "intersections": "VWAP supported price at 9:30am"
  },
  "tradingImplications": [
    "Bullish flag breakout with volume confirmation",
    "Green traffic light confirms bullish momentum",
    "Above yH confirms bullish price structure",
    "MA alignment strongly bullish",
    "RSI showing strength but not extreme",
    "Clean risk parameters with support zone"
  ],
  "relatedSetups": [
    {
      "name": "Bull flag breakout",
      "similarity": 0.92,
      "reference": "system/setups/bull-flag-breakout.md"
    },
    {
      "name": "Momentum continuation",
      "similarity": 0.78,
      "reference": "system/setups/momentum-continuation.md"
    }
  ],
  "recommendations": {
    "primary": "Enter long on pullback to 215.50-217.25 zone",
    "alternates": [
      "Aggressive entry with partial position at market",
      "Scale in on micro-pullbacks within uptrend"
    ],
    "cautions": [
      "Watch volume on pullback - should decrease",
      "Maintain stop below 212.80 support zone",
      "Target partial profits at 220.50 and 225.00"
    ]
  },
  "origin": {
    "sourceCommand": "/analyze-chart",
    "createdBy": "chart-analyzer"
  }
}
```

## RSI Assessment

A key component of analysis following DP's methodology is RSI assessment, with emphasis on ticker-specific historical ranges rather than standard 30/70 thresholds:

### Ticker-Specific RSI Ranges

RSI must be evaluated within the context of each ticker's specific behavior patterns:

| Condition | Interpretation | Trade Implication |
|-----------|----------------|-------------------|
| **Below ticker's historical low RSI** | Extremely oversold for this specific instrument | Strong bullish reversal potential |
| **Above ticker's historical high RSI** | Extremely overbought for this specific instrument | Strong bearish reversal potential |
| **RSI at midpoint of ticker's range** | Neutral momentum | No strong edge from RSI alone |

### RSI Applications in Schema-Compliant Analysis

- **Ticker-Specific Threshold Identification**: Analyze the specific ticker's historical RSI ranges
- **Multi-Timeframe Confirmation**: RSI signals strongest when aligned across multiple timeframes
- **RSI Divergence**: Price making new highs/lows while RSI fails to confirm
- **RSI as Confirmation**: Use as secondary confirmation for other technical signals
- **Range-Bound vs. Trending**: RSI behavior differs in trending vs. range-bound environments
- **Sector Comparison**: Compare ticker's RSI to sector peers for relative strength/weakness

## Momentum Assessment: 21 SMA Traffic Light System

The schema-compliant analysis integrates the traffic light system based on 8/21 SMA relationship:

### Traffic Light States

| Color | Condition | Momentum Interpretation | Trade Bias |
|-------|-----------|-------------------------|------------|
| **Green** | Price > 8 SMA AND Price > 21 SMA | Strong bullish momentum | Long bias, look for pullbacks to 8 SMA |
| **Yellow** | Price between 8 SMA and 21 SMA | Transitional/neutral momentum | Reduced position size, cautious entries |
| **Red** | Price < 8 SMA AND Price < 21 SMA | Strong bearish momentum | Short bias, look for bounces to 8 SMA |

### Application in Trading

- **Green Light**: Aligns with `isTrendFollow: true` and `isMomentumPlay: true` classifications
- **Yellow Light**: More cautious positioning, often relates to `isRangePlay: true`
- **Red Light**: Aligns with bearish classifications and setups

## Classification Implementation

The chart analysis uses the standard boolean classification system from the schema:

```javascript
// Convert pattern recognition to boolean flags
function createClassifications(patterns) {
  // Initialize all classification flags to false
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
  
  // Set appropriate flags based on detected patterns
  for (const pattern of patterns) {
    switch (pattern.type) {
      case "breakout":
        classifications.isBreakout = true;
        break;
      case "reversal":
        classifications.isReversal = true;
        break;
      case "flag":
      case "bull-flag":
      case "bear-flag":
        classifications.isFlagPattern = true;
        break;
      case "failed-breakdown":
        classifications.isFailedBreakdown = true;
        break;
      case "earnings-related":
        classifications.isEarningsPlay = true;
        break;
      case "day-after-earnings":
        classifications.isDayAfterTrade = true;
        break;
      case "trend-following":
        classifications.isTrendFollow = true;
        break;
      case "range-bound":
        classifications.isRangePlay = true;
        break;
      case "gap-fill":
        classifications.isGapFill = true;
        break;
      case "momentum":
        classifications.isMomentumPlay = true;
        break;
    }
  }
  
  return classifications;
}
```

## Level Framework Implementation

The chart analysis creates a schema-compliant `levelFramework` object:

```javascript
// Generate a level framework from chart analysis
function createLevelFramework(symbol, levels, movingAverages, zones) {
  const now = new Date();
  const timestamp = now.toISOString();
  const dateStr = now.toISOString().split('T')[0];
  
  // Create stock level structure
  const stockLevels = {
    ticker: symbol,
    levels: {
      support: levels.support.map(level => ({
        price: level.price,
        notes: level.description || "",
        type: mapLevelType(level.type),
        strength: mapLevelStrength(level.strength)
      })),
      resistance: levels.resistance.map(level => ({
        price: level.price,
        notes: level.description || "",
        type: mapLevelType(level.type),
        strength: mapLevelStrength(level.strength)
      }))
    },
    movingAverages: {
      ma8: movingAverages.ma8 || null,
      ma21: movingAverages.ma21 || null,
      ma50: movingAverages.ma50 || null,
      ma200: movingAverages.ma200 || null
    }
  };
  
  // Create zones structure
  const mappedZones = zones.map(zone => ({
    min: zone.min,
    max: zone.max,
    notes: zone.description || "",
    type: zone.type
  }));
  
  // Create the framework object
  return {
    schemaVersion: "0.5.2",
    id: `levels-chart-${dateStr.replace(/-/g, '')}-${symbol}-01`,
    source: "system",
    timestamp: timestamp,
    stocks: [stockLevels],
    zones: mappedZones,
    origin: {
      sourceCommand: "/analyze-chart",
      createdBy: "chart-analyzer"
    }
  };
}

// Map level types to schema values
function mapLevelType(type) {
  const typeMap = {
    major: "major",
    minor: "minor",
    psychological: "psychological",
    key: "key",
    vwap: "vwap",
    pivot: "pivot"
  };
  
  return typeMap[type] || "minor";
}

// Map level strengths to schema values
function mapLevelStrength(strength) {
  const strengthMap = {
    strong: "strong",
    moderate: "moderate",
    weak: "weak"
  };
  
  return strengthMap[strength] || "moderate";
}
```

## Trade Idea Generation

The chart analysis creates schema-compliant `tradeIdea` objects:

```javascript
// Generate a trade idea from chart analysis
function createTradeIdea(symbol, direction, patterns, levels, context) {
  const now = new Date();
  const timestamp = now.toISOString();
  const dateStr = now.toISOString().split('T')[0];
  
  // Determine conviction level
  const conviction = determineConviction(patterns, context);
  
  // Create classifications
  const classifications = createClassifications(patterns);
  
  // Extract entry parameters
  const entryZone = extractEntryZone(levels, direction);
  
  // Extract exit parameters
  const exitParams = extractExitParameters(levels, direction, entryZone);
  
  // Determine trade duration
  const duration = determineDuration(patterns, context);
  
  // Create the idea object
  return {
    schemaVersion: "0.5.2",
    id: `idea-chart-${dateStr.replace(/-/g, '')}-${symbol}-01`,
    source: "system",
    timestamp: timestamp,
    symbol: symbol,
    direction: direction,
    conviction: conviction,
    entryParameters: {
      zone: {
        min: entryZone.min,
        max: entryZone.max
      },
      condition: entryZone.condition || "",
      strategy: entryZone.strategy || "limit"
    },
    exitParameters: {
      stopLoss: exitParams.stopLoss,
      target: exitParams.target,
      strategy: exitParams.strategy || "",
      trimLevels: exitParams.trimLevels || []
    },
    rationale: generateRationale(patterns, context, direction),
    tradeDuration: duration,
    setup: determineSetupType(patterns),
    status: "active",
    confirmationStatus: determineConfirmationStatus(patterns),
    classifications: classifications,
    positionSizing: {
      recommendation: determineSizing(conviction, classifications),
      reasoning: generateSizingRationale(conviction, classifications)
    },
    risk: {
      plannedRMultiple: calculateRMultiple(entryZone.max || entryZone.min, exitParams.stopLoss, exitParams.target)
    },
    origin: {
      sourceCommand: "/analyze-chart",
      createdBy: "chart-analyzer"
    }
  };
}

// Determine conviction from patterns
function determineConviction(patterns, context) {
  // Calculate conviction score based on pattern strength, completion, volume, etc.
  let score = 0;
  let phrases = [];
  
  for (const pattern of patterns) {
    score += pattern.strength || 0;
    
    if (pattern.strength >= 8) {
      phrases.push(`strong ${pattern.type} confirmation`);
    }
    
    if (pattern.volume === "increasing") {
      score += 2;
      phrases.push("increasing volume");
    }
    
    if (pattern.completed) {
      score += 2;
    }
  }
  
  // Determine level based on score
  let level = "low";
  if (score >= 15) {
    level = "high";
  } else if (score >= 10) {
    level = "medium";
  }
  
  // Return conviction object
  return {
    level: level,
    phrases: phrases.slice(0, 2) // Limit to 2 phrases
  };
}
```

## Schema Validation

```javascript
// Validate object against schema
function validateSchema(object, type) {
  // Check required fields
  const requiredFields = getRequiredFields(type);
  const missingFields = requiredFields.filter(field => !object[field]);
  
  if (missingFields.length > 0) {
    return {
      valid: false,
      errors: [`Missing required fields: ${missingFields.join(', ')}`]
    };
  }
  
  // Check enum values
  const enumFields = getEnumFields(type);
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
  
  return { valid: true };
}

// Get required fields based on schema type
function getRequiredFields(type) {
  const fieldMap = {
    'tradeIdea': ['schemaVersion', 'id', 'source', 'timestamp', 'symbol', 'direction', 'conviction'],
    'levelFramework': ['schemaVersion', 'id', 'source', 'timestamp'],
    'analysis': ['schemaVersion', 'id', 'source', 'timestamp', 'metadata', 'levelFramework', 'patternAnalysis']
  };
  
  return fieldMap[type] || [];
}

// Check if a value is valid for an enum field
function isValidEnumValue(field, value) {
  const enumMap = {
    'direction': ['long', 'short'],
    'conviction.level': ['focus-trade', 'high', 'medium', 'low', 'negative'],
    'tradeDuration': ['cashflow', 'day', 'swing', 'position', 'long-term'],
    'status': ['active', 'pending', 'triggered', 'invalidated', 'completed'],
    'confirmationStatus': ['unconfirmed', 'confirmed', 'rejected', 'modified'],
    'positionSizing.recommendation': ['full', 'half', 'third', 'quarter', 'small', 'speculative']
  };
  
  if (!enumMap[field]) {
    return true;
  }
  
  return enumMap[field].includes(value);
}
```

## Focus Types

The command supports different focus modes with specialized outputs:

### Support-Resistance Focus

Emphasizes identification and ranking of key price levels:
- Detailed level framework with complete support/resistance structure
- Level rankings and confluence zones
- Level clusters and interactions
- Historical significance and reactions
- MA relationships with price levels
- Pivot points and key reference levels

### Patterns Focus

Emphasizes detection and validation of chart patterns:
- Detailed classification using the boolean system
- Pattern completion percentage
- Volume confirmation analysis
- Pattern reliability statistics
- MA alignments and crossovers
- Complete trade idea generation

### Entries Focus

Emphasizes optimal trade entry strategy:
- Entry zone optimization
- Stop placement recommendations
- Risk/reward calculations
- Position sizing recommendations
- Entry trigger conditions
- MA and VWAP relationships for timing
- Pattern alignment with existing trade plan

### Review Focus

Emphasizes post-trade analysis for learning:
- Execution quality assessment
- Pattern validation accuracy
- Alternative scenario analysis
- Learning opportunities and improvements
- MA and VWAP signal effectiveness
- Traffic light system validation
- Entry and exit optimization

## Integration with Other Commands

The chart analysis integrates with:

- `/create-plan`: Can include chart analysis in the trade plan
- `/add-position`: Uses chart analysis for entry parameters
- `/update-position`: Validates management decisions against chart patterns
- `/run-debrief`: Reviews trading performance against chart signals

## Examples

### Example 1: Pattern Analysis on 5-minute Chart
```
/analyze-chart [attached 5-minute SPY chart] timeframe=5m focus=patterns
```

### Example 2: Support/Resistance Analysis on Daily Chart
```
/analyze-chart [attached daily AAPL chart] focus=support-resistance
```

### Example 3: Entry Analysis with Market Context
```
/analyze-chart [attached 2-minute ES chart] focus=entries context="Failed breakdown potential after FOMC"
```

### Example 4: Review Analysis with Integration into Plan
```
/analyze-chart [attached 15-minute NVDA chart] focus=review includeInPlan=true
```

## Chart Visual Legend

The system utilizes a standardized visual legend for interpreting chart elements:

### Moving Averages (SMA) Interpretation

| Color        | Period | Significance                                         |
|--------------|--------|------------------------------------------------------|
| **Cyan**     | 8 SMA  | Short-term price momentum; also used for ES OI lines |
| **Traffic Light** | 21 SMA | Green: Bullish (Price > 8 & 21)<br>Yellow: Neutral<br>Red: Bearish (Price < 8 & 21) |
| **Mid Blue** | 34 SMA | Medium-term price trend                              |
| **Navy Blue**| 50 SMA | Classic support/resistance MA                        |
| **Orange**   | 100 SMA| Longer-term MA; structural level                     |
| **Red**      | 200 SMA| Institutional trend level                            |

### VWAP & Volatility Indicators

- **Thin Yellow Line**: Intraday VWAP
- **Long-Dashed Yellow Line**: Anchored VWAP (AVWAP) from significant date
- **Grey Bands**: Keltner Channels (volatility envelope)

### Structural Indicators

- **Dotted Horizontal Lines**: Pivot Points (S3 – S2 – S1 – PP – R1 – R2 – R3)
- **White Trendlines**: Manually drawn support/resistance or patterns
- **Short-Dotted White Lines**: Significant price levels (prior highs/lows, gaps)
- **Cyan Bars/Lines**: May represent Open Interest walls on ES futures

### Level Hierarchy for Support/Resistance Evaluation

1. **Major Pivots**: Significant swing highs/lows on daily+ timeframes
2. **Yesterday's High/Low (yH/yL)**: Critical daily reference points
3. **200 SMA**: Strongest institutional reference
4. **Pivot Points**: Price magnets and reference levels (PP, S1-S3, R1-R3)
5. **Anchored VWAP**: Long-term fair value from key date
6. **100/50 SMAs**: Strong institutional references
7. **Daily VWAP**: Intraday fair value
8. **34/21/8 SMAs**: Short-term trend indicators
9. **Round Numbers**: Psychological levels (e.g., 4500, 4550)

## Error Handling

- Missing Image: "Error: Chart image is required"
- Invalid Focus: "Error: Invalid focus. Must be one of: support-resistance, patterns, entries, review, comprehensive"
- Invalid Timeframe: "Warning: Unrecognized timeframe format. Will attempt auto-detection."
- Schema Validation Failure: "Error: Generated objects do not comply with schema: [VALIDATION_ERRORS]"
- Symbol Detection Failure: "Warning: Could not detect symbol from chart. Please specify using the symbol parameter."

## Implementation Notes

The refactored chart analysis command implements several improvements over the previous version:

1. **Schema Compliance**: All generated objects (levelFramework, tradeIdea, patternAnalysis) comply with the canonical schema structure
2. **Boolean Classifications**: Uses proper boolean flags for pattern classification
3. **Level Framework Integration**: Generates level framework objects that match the trade plan structure
4. **Schema Validation**: Validates all outputs against the runtime schema
5. **Traffic Light System**: Maintains the traffic light momentum system with schema-compatible output
6. **RSI Assessment**: Preserves the ticker-specific RSI analysis within the schema structure
7. **Focus-Based Analysis**: Maintains the specialized focus modes with schema-compliant outputs
8. **Standardized Front Matter**: Follows the organization-wide front matter template
9. **Version Compatibility**: Uses the 0.5.2 version tags and structures
10. **Integration Points**: Provides proper linkage to trade ideas and plans via IDs

The implementation maintains all existing technical analysis capabilities while ensuring all outputs conform to the canonical schema structure.
