---
id: analyze-dp-v0.5.2
title: Dow Pivot Analysis System
description: Analyzes market conditions and generates schema-compliant trade ideas using the Dow Pivot methodology
author: Intent Trader Team
version: 1.0.0
release: 0.5.2
created: 2025-05-15
updated: 2025-05-21
category: premarket
status: stable
tags: [premarket, analysis, dow-pivot, morning-call, schema-validation]
requires: [system/schemas/intent-trader-master-schema.json, system/schemas/intent-trader-runtime-schema.json, prompts/focus/conviction-classifier.md]
outputs: [state/trade-ideas.json, state/market-analysis.json]
input_format: text
output_format: json
ai_enabled: true
---

# Dow Pivot Analysis System

## Purpose
The `/analyze-dp` command applies the Dow Pivot analysis methodology to market commentary and price data, generating schema-compliant trade ideas that follow the canonical structure defined in the Intent Trader master schema. It extracts market context, identifies key technical levels, and produces actionable trade ideas with proper classification and conviction assessment.

## Input Parameters

| Parameter | Required | Description | Format | Default |
|-----------|----------|-------------|--------|---------|
| `transcript` | Yes | Market analysis text (Morning call, commentary) | String | - |
| `includeEducation` | No | Include educational content on Dow Pivot methodology | Boolean | false |
| `analyzeMarketStructure` | No | Include detailed market structure analysis | Boolean | true |
| `confidenceThreshold` | No | Minimum confidence for idea inclusion | Number (0.0-1.0) | 0.6 |
| `maxIdeas` | No | Maximum number of ideas to generate | Number (1-20) | 10 |
| `validateSchema` | No | Validate output against runtime schema | Boolean | true |

## Processing Logic

### 1. Input Preprocessing
- Validate input transcript for required content
- Normalize text formatting and ticker symbols
- Extract temporal markers for context (premarket, intraday, post-market)
- Apply sentiment analysis to gauge overall market tone

### 2. Market Framework Analysis
- Determine overall market bias (bullish, bearish, neutral)
- Evaluate market conditions using Dow Pivot framework
- Classify market mode (Mode 1 trending vs. Mode 2 range/trap)
- Identify key catalysts and market movers
- Generate schema-compliant `marketFramework` object

### 3. Technical Level Extraction
- Extract key support and resistance levels
- Identify Pivot Points, Daily Levels, and Key Moving Averages
- Calculate confluence zones where multiple levels align
- Determine strength and significance of each level
- Create schema-compliant `levelFramework` object

### 4. Trade Idea Generation
- Identify potential setup opportunities based on Dow Pivot methodology
- Apply conviction classification to potential ideas
- Calculate risk parameters and reward targets
- Apply proper boolean classification flags
- Generate schema-compliant `tradeIdea` objects

### 5. Schema Validation
- Validate all generated objects against the runtime schema
- Ensure comprehensive compliance with master schema structure
- Verify required fields, relationships, and constraints
- Apply field validation and constraint checking

### 6. Output Generation
- Format JSON response with market framework, levels, and ideas
- Include metadata about analysis confidence and coverage
- Add educational content if requested
- Return a properly structured response

## Response Format

The command returns a JSON object with the following structure:

```json
{
  "metadata": {
    "analyzerVersion": "1.0.0",
    "timestamp": "2025-05-21T08:30:00Z",
    "confidence": 0.85,
    "coverage": 0.92,
    "sourceLength": 2456,
    "processedSections": ["market context", "technical levels", "trade setups"],
    "warnings": []
  },
  "marketFramework": {
    "schemaVersion": "0.5.2",
    "id": "framework-market-20250521",
    "source": "dp",
    "timestamp": "2025-05-21T08:30:00Z",
    "bias": "bullish",
    "biasCondition": "above 5900, neutral below",
    "mode": "Mode 1",
    "modeConfidence": 75,
    "character": "Strong trending day with acceptance above recent range",
    "catalysts": ["Fed minutes release", "Strong retail earnings"],
    "keyMovers": [
      {
        "ticker": "AAPL",
        "direction": "up",
        "magnitude": "strong",
        "reason": "Product announcement"
      }
    ],
    "origin": {
      "sourceCommand": "/analyze-dp",
      "createdBy": "dp-analyzer"
    }
  },
  "levelFramework": {
    "schemaVersion": "0.5.2",
    "id": "framework-level-20250521",
    "source": "dp",
    "timestamp": "2025-05-21T08:30:00Z",
    "indices": {
      "es": {
        "support": [
          {
            "price": 5890,
            "notes": "Previous resistance now support",
            "type": "major",
            "strength": "strong"
          }
        ],
        "resistance": [
          {
            "price": 5930,
            "notes": "Recent high",
            "type": "major",
            "strength": "moderate"
          }
        ]
      },
      "spx": {
        "support": [],
        "resistance": []
      }
    },
    "stocks": [
      {
        "ticker": "AAPL",
        "levels": {
          "support": [
            {
              "price": 215.50,
              "notes": "Gap fill level",
              "type": "major",
              "strength": "strong"
            }
          ],
          "resistance": [
            {
              "price": 225.00,
              "notes": "Psychological level",
              "type": "psychological",
              "strength": "moderate"
            }
          ]
        },
        "movingAverages": {
          "ma8": 212.35,
          "ma21": 205.80
        }
      }
    ],
    "zones": [],
    "keyDecisionPoint": 5900,
    "origin": {
      "sourceCommand": "/analyze-dp",
      "createdBy": "dp-analyzer"
    }
  },
  "tradeIdeas": [
    {
      "schemaVersion": "0.5.2",
      "id": "idea-dp-20250521-AAPL-01",
      "source": "dp",
      "timestamp": "2025-05-21T08:30:00Z",
      "symbol": "AAPL",
      "direction": "long",
      "conviction": {
        "level": "high",
        "phrases": ["strong bullish setup", "favorite for today"]
      },
      "entryParameters": {
        "zone": {
          "min": 215.50,
          "max": 217.25
        },
        "condition": "pullback to support zone on lighter volume",
        "strategy": "limit"
      },
      "exitParameters": {
        "stopLoss": 212.80,
        "target": 225.00,
        "strategy": "Scale out: 50% at first target, 30% at second, let 20% run",
        "trimLevels": [
          {
            "price": 220.00,
            "percentage": 50
          },
          {
            "price": 225.00,
            "percentage": 30
          }
        ]
      },
      "rationale": "Strong bullish price action with support at 8-day MA and recent gap, targeting psychological resistance at 225",
      "tradeDuration": "swing",
      "setup": "pullback-entry",
      "status": "active",
      "confirmationStatus": "confirmed",
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
        "isMomentumPlay": true
      },
      "positionSizing": {
        "recommendation": "full",
        "reasoning": "High conviction setup with clear risk parameters and strong trend alignment"
      },
      "risk": {
        "plannedRMultiple": 2.2
      },
      "priority": 1,
      "category": "primary",
      "frequency": 3,
      "isFavorite": true,
      "origin": {
        "sourceCommand": "/analyze-dp",
        "createdBy": "dp-analyzer"
      }
    }
  ],
  "education": {
    "dowPivotMethodology": "The Dow Pivot methodology focuses on identifying key market structure elements including...",
    "tradingPrinciples": ["Trade in the direction of the trend", "Look for pullbacks to value in uptrends", "..."],
    "marketModeExplanation": "Mode 1 markets exhibit trending behavior with directional momentum, while Mode 2 markets..."
  }
}
```

## The Dow Pivot Analysis Methodology

The Dow Pivot methodology is a comprehensive framework for market analysis that incorporates multiple elements:

### 1. Market Structure Analysis
- **Trend Identification**: Determining if the market is in an uptrend, downtrend, or range
- **Mode Classification**: Distinguishing between trending (Mode 1) and ranging/trap (Mode 2) markets
- **Market Character**: Evaluating the quality and behavior of price action
- **Momentum Assessment**: Gauging the strength and persistence of directional movement

### 2. Setup Pattern Recognition
- **Flag Patterns**: Consolidation after impulse moves
- **Breakouts/Breakdowns**: Price moving decisively through significant levels
- **Reversals**: Changes in trend direction at key levels
- **Failed Moves**: Rejected breakouts/breakdowns that create opportunities in the opposite direction
- **Gap Fills**: Price returning to fill prior session gaps

### 3. Technical Level Analysis
- **Support/Resistance**: Key price levels where price has reacted previously
- **Moving Averages**: Dynamic support/resistance, particularly 8-day and 21-day
- **Pivot Points**: Daily and weekly pivot levels
- **Volume Profile**: Areas of high/low volume participation
- **Prior Swing Highs/Lows**: Previous significant turning points

### 4. Conviction Assessment
- **Clarity of Setup**: How well-defined the pattern appears
- **Risk Parameters**: Clearly identifiable stop placement
- **Reward Potential**: Reasonable targets with favorable risk-reward
- **Trend Alignment**: Setup aligned with overall market direction
- **Volume Confirmation**: Volume behavior supporting the anticipated move

## Example Usage

```
/analyze-dp transcript="Morning call text goes here..." includeEducation=true analyzeMarketStructure=true
```

## Output Structure

### Market Framework Object
This schema-compliant object contains overall market analysis:
- Directional bias (bullish, bearish, neutral)
- Market mode assessment with confidence
- Market character description
- Key catalysts and market movers

### Level Framework Object
This schema-compliant object includes technical level analysis:
- Support and resistance for indices (ES, SPX)
- Individual stock level analysis
- Moving average values
- Key decision points

### Trade Idea Objects
Each identified opportunity is represented as a schema-compliant trade idea object:
- Symbol and direction
- Conviction assessment
- Entry parameters (zone, condition, strategy)
- Exit parameters (stop, targets, management approach)
- Classification using boolean flags
- Position sizing recommendations
- Risk metrics and priority ranking

## Implementation Details

### Schema Validation Functions

The system implements validation functions to ensure all objects comply with the schemas:

```javascript
// Validate trade idea against runtime schema
function validateTradeIdea(idea) {
  // Check required fields
  const requiredFields = ["schemaVersion", "id", "source", "timestamp", "symbol", "direction", "conviction"];
  const missingFields = requiredFields.filter(field => !idea[field]);
  
  if (missingFields.length > 0) {
    return {
      valid: false,
      errors: [`Missing required fields: ${missingFields.join(', ')}`]
    };
  }
  
  // Validate conviction
  if (!idea.conviction.level || !["focus-trade", "high", "medium", "low", "negative"].includes(idea.conviction.level)) {
    return {
      valid: false,
      errors: ["Invalid conviction level"]
    };
  }
  
  // Validate direction
  if (!["long", "short"].includes(idea.direction)) {
    return {
      valid: false,
      errors: [`Invalid direction: ${idea.direction}`]
    };
  }
  
  // Additional validations...
  
  return { valid: true };
}

// Generate valid ID based on schema pattern
function generateId(type, date, symbol, sequence = '01') {
  const dateStr = date.replace(/-/g, '');
  return `${type}-dp-${dateStr}-${symbol}-${sequence}`;
}
```

### Classification Handling

The system uses boolean flags for classification consistent with the schema:

```javascript
// Convert text-based classifications to boolean flags
function createClassifications(setup, context) {
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
  
  // Set appropriate flags based on analysis
  if (setup.includes("breakout")) classifications.isBreakout = true;
  if (setup.includes("reversal")) classifications.isReversal = true;
  if (setup.includes("flag")) classifications.isFlagPattern = true;
  if (setup.includes("failed breakdown")) classifications.isFailedBreakdown = true;
  if (context.includes("earnings")) classifications.isEarningsPlay = true;
  if (context.includes("day after")) classifications.isDayAfterTrade = true;
  if (context.includes("trend")) classifications.isTrendFollow = true;
  if (context.includes("range")) classifications.isRangePlay = true;
  if (context.includes("gap fill")) classifications.isGapFill = true;
  if (context.includes("momentum")) classifications.isMomentumPlay = true;
  
  return classifications;
}
```

### Integration with Conviction Classifier

The system leverages the conviction classifier module for standardized assessment:

```javascript
// Analyze conviction from context
async function determineConviction(context, symbol) {
  try {
    // Call the conviction-classifier module
    const result = await convictionClassifier.analyze(context, symbol);
    
    return {
      level: result.level,
      phrases: result.phrases || []
    };
  } catch (error) {
    // Fallback classification if module unavailable
    console.warn("Conviction classifier unavailable, using fallback method");
    return fallbackConvictionClassifier(context, symbol);
  }
}

// Fallback conviction classifier
function fallbackConvictionClassifier(context, symbol) {
  // Simplified pattern-matching approach
  const focusPatterns = ["focus trade", "top idea", "favorite", "must watch"];
  const highPatterns = ["high conviction", "strong setup", "really like"];
  const mediumPatterns = ["decent setup", "worth watching", "interesting"];
  const lowPatterns = ["speculative", "small position", "lower conviction"];
  const negativePatterns = ["avoid", "stay away", "not interested"];
  
  // Extract relevant context around symbol
  const symbolContext = extractSymbolContext(context, symbol);
  
  // Determine level based on pattern matching
  let level = "low"; // Default
  let matchedPhrases = [];
  
  if (patternMatch(symbolContext, negativePatterns)) {
    level = "negative";
    matchedPhrases = findMatches(symbolContext, negativePatterns);
  } else if (patternMatch(symbolContext, focusPatterns)) {
    level = "focus-trade";
    matchedPhrases = findMatches(symbolContext, focusPatterns);
  } else if (patternMatch(symbolContext, highPatterns)) {
    level = "high";
    matchedPhrases = findMatches(symbolContext, highPatterns);
  } else if (patternMatch(symbolContext, mediumPatterns)) {
    level = "medium";
    matchedPhrases = findMatches(symbolContext, mediumPatterns);
  } else {
    matchedPhrases = findMatches(symbolContext, lowPatterns);
  }
  
  return {
    level: level,
    phrases: matchedPhrases
  };
}
```

## Example: Full Trade Idea Generation

```javascript
// Generate a complete trade idea
function generateTradeIdea(symbol, context, marketFramework) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timestamp = now.toISOString();
  
  // Extract direction from context
  const direction = determineDirection(context, symbol);
  
  // Determine conviction level
  const conviction = determineConviction(context, symbol);
  
  // Extract setup type and context
  const setup = extractSetupType(context, symbol);
  
  // Create classification flags
  const classifications = createClassifications(setup, context);
  
  // Extract price levels
  const levels = extractPriceLevels(context, symbol);
  
  // Create the idea object
  const idea = {
    schemaVersion: "0.5.2",
    id: generateId("idea", dateStr, symbol),
    source: "dp",
    timestamp: timestamp,
    symbol: symbol,
    direction: direction,
    conviction: conviction,
    entryParameters: {
      zone: {
        min: levels.entryMin,
        max: levels.entryMax
      },
      condition: levels.entryCondition,
      strategy: "limit"
    },
    exitParameters: {
      stopLoss: levels.stopLoss,
      target: levels.target,
      strategy: levels.exitStrategy || "",
      trimLevels: createTrimLevels(levels)
    },
    rationale: extractRationale(context, symbol),
    tradeDuration: determineDuration(context, symbol),
    setup: setup,
    status: "active",
    confirmationStatus: "unconfirmed",
    classifications: classifications,
    positionSizing: {
      recommendation: determineSizing(conviction.level, classifications),
      reasoning: generateSizingRationale(conviction.level, classifications)
    },
    risk: {
      plannedRMultiple: calculateRMultiple(levels.entryMax || levels.entryMin, levels.stopLoss, levels.target)
    },
    priority: determinePriority(conviction.level, marketFramework),
    category: determineCategory(conviction.level, marketFramework),
    frequency: countMentions(context, symbol),
    isFavorite: conviction.level === "focus-trade",
    origin: {
      sourceCommand: "/analyze-dp",
      createdBy: "dp-analyzer"
    }
  };
  
  // Validate and return
  const validation = validateTradeIdea(idea);
  if (!validation.valid) {
    console.warn(`Invalid trade idea for ${symbol}: ${validation.errors.join(', ')}`);
  }
  
  return idea;
}
```

## Integration with Other Commands

The analyzed output integrates with these system components:
- `/create-plan`: Uses the trade ideas and market framework for plan creation
- `/add-position`: Validates potential trades against the generated ideas
- `/size-position`: Leverages the trade ideas for position sizing recommendations
- `/calculate-levels`: Uses the extracted levels for further technical analysis
- `/focus-ideas`: Filters and prioritizes ideas based on conviction and setup quality

## Error Handling

The system implements robust error handling for various scenarios:

### Input Validation
- Empty transcript: "Error: Transcript is required and cannot be empty"
- Insufficient content: "Error: Transcript too short (minimum 100 characters required)"
- Invalid parameters: "Warning: Invalid confidenceThreshold value (0.95), using default (0.6)"

### Processing Errors
- Market framework extraction failure: "Error: Could not determine market framework from transcript"
- Level extraction issues: "Warning: Limited level data extracted, analysis may be incomplete"
- Idea generation failures: "Warning: Unable to generate ideas for [AAPL, MSFT] due to insufficient context"

### Schema Validation
- Invalid objects: "Error: Generated object fails schema validation: [validation errors]"
- Missing required fields: "Error: Missing required fields in trade idea: [field list]"
- Invalid field values: "Error: Invalid values detected: conviction.level 'extreme' not in allowed values"

## Implementation Notes

The refactored command implements several key improvements over the previous version:

1. **Schema Compliance**: All generated objects (marketFramework, levelFramework, tradeIdea) comply with the canonical schema structure
2. **Boolean Classifications**: Uses proper boolean flags for classification rather than text-based categories
3. **Validation Logic**: Implements robust validation against both master and runtime schemas
4. **Conviction Integration**: Uses the standard conviction classification system with appropriate fallbacks
5. **Rich Market Structure Analysis**: Enhances the Dow Pivot methodology with structured market framework analysis
6. **Educational Content**: Optionally includes Dow Pivot educational material for user reference
7. **Standard Front Matter**: Follows the organization-wide front matter template
8. **Dual Schema Support**: Works with both the master and runtime schemas as required

The implementation preserves all existing Dow Pivot analysis capabilities while enhancing the output with structured, schema-compliant objects that can be seamlessly integrated with other system components.
