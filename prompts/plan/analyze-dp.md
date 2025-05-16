---
id: analyze-dp
title: Morning Call Processor
description: Analyzes DP morning call transcripts to extract actionable trading information
author: Intent Trader Team
version: 0.2.0
release: 0.5.1
created: 2025-05-15
updated: 2025-05-15
category: premarket
status: stable
tags: [premarket, analysis, dp, morning-call]
requires: [prompts/focus/conviction-classifier.md]
outputs: [marketContext, focusIdeas, levels]
input_format: text
output_format: json
ai_enabled: true
---

# Morning Call Processor

This prompt analyzes DP morning call transcripts to extract structured data including market context, focus trade ideas, and key technical levels. It transforms conversational analyst commentary into actionable trading information that can be used to create a unified trade plan.

## Purpose

The Morning Call Processor serves as the first phase of the Intent Trader workflow, extracting actionable insights from DP's market analysis and trade ideas. It identifies:

1. **Market Context** - Overall market sentiment, futures status, key movers, and catalysts
2. **Focus Trade Ideas** - Specific stocks with directional bias and conviction levels
3. **Technical Levels** - Key support/resistance points and moving averages
4. **Day-After-Trade (DAT) Opportunities** - Post-event trading setups

The structured output enables downstream components to prioritize opportunities, create trading plans, and validate ideas with technical analysis.

## Input Parameters

- `transcript` (required): The text of DP's morning call
  - Must be a non-empty string
  - Minimum length: 100 characters (typical paragraph)
  - Should contain recognizable market commentary and/or ticker mentions
- `includeRaw` (optional): Whether to include raw text in the output (default: false)
- `minConfidence` (optional): Minimum confidence threshold for extraction (default: 0.7)
  - Range: 0.0-1.0
  - Recommended: 0.5-0.8
- `requireSections` (optional): Array of required sections that must be found (default: [])
  - If specified and sections not found, returns error
- `partialResults` (optional): Whether to return partial results if processing fails (default: true)
  - If true, returns successfully processed sections even if others fail

## Output Format

The command produces a structured object with the following sections:

```json
{
  "processorVersion": "1.0.0",
  "processedAt": "2025-05-15T10:00:00Z",
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
  "focusIdeas": [
    {
      "ticker": "string",
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
      "isDayAfterTrade": "boolean",
      "tradeDuration": "cashflow/day/swing/long-term",
      "frequency": "number", // how many times mentioned in call
      "isFavorite": "boolean" // indicates if it's DP's favorite trade of the day
    }
  ],
  "levels": {
    "indices": {
      "es": {
        "support": [{"value": "number", "notes": "string"}],
        "resistance": [{"value": "number", "notes": "string"}]
      },
      "spx": {
        "support": [{"value": "number", "notes": "string"}],
        "resistance": [{"value": "number", "notes": "string"}]
      }
    },
    "stocks": [
      {
        "ticker": "string",
        "levels": {
          "support": [{"value": "number", "notes": "string"}],
          "resistance": [{"value": "number", "notes": "string"}]
        },
        "movingAverages": {"ma8": "number", "ma21": "number"}
      }
    ]
  },
  "processingMetadata": {
    "status": "success|partial_success|failure",
    "confidenceScore": "number",
    "sectionsCaptured": ["string"],
    "missingSections": ["string"],
    "warnings": ["string"],
    "errorMessages": ["string"],
    "processingStats": {
      "transcriptLength": "number",
      "tickersIdentified": "number",
      "processingTimeMs": "number"
    },
    "fallbacksUsed": ["string"] // indicates if any fallback strategies were employed
  }
}
```

## Error Handling

The processor handles various error conditions and edge cases:

### Input Validation Errors
- **Empty or Missing Transcript**: Returns error with status "failure" and appropriate message
- **Transcript Too Short**: Returns error if below minimum length with guidance
- **Invalid Parameters**: Returns warning and applies default values

```json
{
  "processorVersion": "1.0.0",
  "processedAt": "2025-05-15T10:00:00Z",
  "processingMetadata": {
    "status": "failure",
    "errorMessages": ["Transcript validation failed: Must be at least 100 characters"],
    "processingStats": {
      "transcriptLength": 45,
      "tickersIdentified": 0,
      "processingTimeMs": 12
    },
    "suggestions": [
      "Ensure transcript includes complete morning call content",
      "Check for truncation in source material",
      "Consider using preformatted transcript if available"
    ]
  }
}
```

### Processing Errors
- **Section Identification Failure**: Returns partial results for identified sections with warnings
- **Ticker Extraction Failure**: Attempts fallback extraction or returns available tickers with warning
- **Level Parsing Errors**: Validates numerical ranges and returns valid levels with warnings for invalid ones

### Critical Section Missing
- **No Market Context**: Attempts alternative patterns to extract basic context, adds warning
- **No Focus Ideas**: Searches for any ticker mentions with surrounding context, adds warning
- **Both Critical Sections Missing**: Returns failure unless `partialResults` is true

### Conviction Classifier Failure
- **Classifier Unavailable**: Uses simplified internal classification based on pattern matching
- **Classification Errors**: Returns ideas with lower confidence scores and appropriate warnings
- **No Classification Possible**: Assigns "low" conviction with indication of fallback use

### Value Validation
- **Unrealistic Price Levels**: Validates levels against reasonable ranges for the ticker
- **Inconsistent Levels**: Ensures support < resistance, fixes ordering if needed with warning
- **Missing Numerical Values**: Sets to null rather than guessing with explanation

## Example Error Response with Partial Results

```json
{
  "processorVersion": "1.0.0",
  "processedAt": "2025-05-15T10:00:00Z",
  "marketContext": {
    "futures": {"status": "lower", "catalysts": ["awaiting CPI"]},
    "indices": {
      "dow": {"direction": "down", "change": "over 200 points"}
    },
    "sentiment": "cautious"
  },
  "focusIdeas": [],
  "levels": {},
  "processingMetadata": {
    "status": "partial_success",
    "confidenceScore": 0.45,
    "sectionsCaptured": ["market context"],
    "missingSections": ["focus ideas", "technical levels"],
    "warnings": ["Unable to identify focus ideas section", "Conviction classifier unavailable"],
    "errorMessages": ["Focus idea extraction failed: No ticker symbols identified"],
    "processingStats": {
      "transcriptLength": 520,
      "tickersIdentified": 0,
      "processingTimeMs": 87
    },
    "fallbacksUsed": ["simplified market context extraction"]
  }
}
```

## Processing Logic

The Morning Call Processor follows this analysis approach:

### 1. Input Validation

- Verify transcript is provided and is non-empty
- Check minimum transcript length (100 characters)
- Validate optional parameters are in correct format
- Return appropriate error if validation fails with guidance on requirements

### 2. Preprocessing

- Normalize whitespace and formatting
- Standardize ticker symbols (uppercase without $ prefix)
- Handle special characters and abbreviations
- Divide text into logical sections based on content patterns
- Create a ticker mention count to track frequency throughout the call
- Initialize a sector and theme tracking system

### 3. Section Identification

- **Market Context Section**: Usually appears at the beginning discussing futures, indices
- **Analyst Actions Section**: Contains "upgrade," "downgrade," "price target" language
- **Focus Ideas Section**: Includes ticker symbols with conviction language
- **Technical Levels Section**: Contains numerical values for support/resistance
- **Market Philosophy Section**: General trading approach and broader context
- **If critical sections not found**: Apply fallback extraction strategies using broader patterns
- **Minimum viable section requirement**: At least one of Market Context or Focus Ideas must be identifiable

### 4. Market Context Extraction

- Identify futures status and direction
- Extract index movements with magnitude
- Identify key movers with reasons
- Determine overall market sentiment
- Identify important catalysts or events
- **Error handling**: If parsing fails, provide partial results with appropriate status indicators

### 5. Focus Ideas Extraction

- Identify ticker symbols in focus
- Determine directional bias (long/short)
- Use `conviction-classifier.md` to determine conviction level
- **Fallback handling**: If conviction classifier fails, use simplified internal classification
- Identify trade duration (cashflow/day, swing, long-term)
- Extract entry parameters (price levels or conditions)
- Extract exit parameters and strategies (targets, stops, scaling approaches)
- Count frequency of mentions throughout the call
- Identify day-after-trade opportunities
- Capture trading rationale
- Identify if the idea is a "favorite" or top priority trade
- Extract position sizing recommendations (full, half, small, etc.)
- Assess risk level based on context and language
- Identify correlated trade ideas or sector themes
- Extract any historical context about similar setups

### 6. Technical Level Extraction

- Identify index levels (ES, SPX, etc.)
- Classify levels as support or resistance
- Extract moving average values
- Extract context or notes about levels
- Calculate relative significance of levels
- **Validation**: Apply reasonable bounds checking to extracted values
- **Consistency checking**: Ensure support < resistance where both are provided

### 7. Day-After-Trade (DAT) Detection

The processor identifies DAT opportunities by looking for:
- Explicit "DAT" or "day after trade" mentions
- References to earnings reactions
- News events with expected follow-through
- Specific price action predictions after events

### 8. Post-Processing

- Validate extracted data for consistency
- Assign confidence scores to extractions
- Identify missing sections or gaps
- Format output according to schema
- Add processing metadata with status information
- Include any warnings or error messages for partial successes

## Example Usage

```
/analyze-dp [transcript text]
```

## Test Vector

**Input**:
```
Good morning. Futures are a bit lower as we await this morning's CPI. The Dow is leading to the downside after UNH suspends guidance for 2025. The CEO steps down and it's getting crushed. United Health down 40 points this morning. Again, they suspend guidance and the CEO steps down. That takes the Dow down over 200.

NASDAQ very much better down 10-15 points. It was down about 60-70 early morning, but it's rallied back. Bitcoin rallies about 2,000 points off yesterday's lows. That might partially be due to Coinbase being added to the S&P, and Coinbase is up almost 10% this morning, traded as high as 230, I believe, probably 226, 227 at this very moment, 10% that's Coinbase being added to the S&P.

Now for some ideas. I love TEM right now, in the 60-62 range, this looks like a great entry point for a swing trade. I'm looking to add more to my HOOD position if it gets to 56, I remain very bullish on this name. For a short idea, BABA could be a decent day-after-trade if it gets to its 21-day MA around 121, might be worth a speculative short.

CRWV is also interesting on any pullback, viable swing trade opportunity there. AMD could work around 115, might be worth trying some calls. TSLA is only interesting to me near the 8-day MA, which is around 309, would not chase.

Looking at levels, ES support is around 5900, which has trapped several times now, with 5850 as major support if that fails. Resistance at 5926, which is the top of the bull flag, then 5945, with a measured move target around 5970 if we break out. SPX levels are about 20 points higher.
```

**Expected Output**:
```json
{
  "processorVersion": "1.0.0",
  "processedAt": "2025-05-15T10:00:00Z",
  "marketContext": {
    "futures": {
      "status": "lower",
      "catalysts": ["awaiting CPI"]
    },
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
    "sentiment": "cautious, awaiting CPI data"
  },
  "focusIdeas": [
    {
      "ticker": "TEM",
      "direction": "long",
      "conviction": {
        "level": "focus-trade",
        "phrases": ["love TEM right now"]
      },
      "entryParameters": {
        "zone": {"min": 60, "max": 62},
        "condition": "current range"
      },
      "exitParameters": {
        "stopLoss": null,
        "target": null,
        "strategy": "Swing trade - likely hold for multiple days"
      },
      "rationale": "great entry point for a swing trade",
      "isDayAfterTrade": false,
      "tradeDuration": "swing",
      "frequency": 1,
      "isFavorite": true,
      "positionSizing": {
        "recommendation": "full position",
        "reasoning": "High conviction swing trade in current range"
      },
      "risk": {
        "level": "medium",
        "factors": ["No specified stop loss", "Focus trade with clear entry zone"]
      },
      "relatedIdeas": [],
      "historicalContext": null
    },
    {
      "ticker": "HOOD",
      "direction": "long",
      "conviction": {
        "level": "high",
        "phrases": ["looking to add more", "remain very bullish"]
      },
      "entryParameters": {
        "zone": {"min": 56, "max": 56},
        "condition": "if it gets to 56"
      },
      "exitParameters": {
        "stopLoss": null,
        "target": null,
        "strategy": "Add to existing position on pullback"
      },
      "rationale": "remain very bullish on this name",
      "isDayAfterTrade": false,
      "tradeDuration": "swing",
      "frequency": 1,
      "isFavorite": false,
      "positionSizing": {
        "recommendation": "add to existing position",
        "reasoning": "Adding to an already established position on pullback"
      },
      "risk": {
        "level": "medium",
        "factors": ["Adding to existing position", "Specific entry level"]
      },
      "relatedIdeas": [],
      "historicalContext": null
    },
    {
      "ticker": "BABA",
      "direction": "short",
      "conviction": {
        "level": "medium",
        "phrases": ["could be a decent day-after-trade", "might be worth a speculative short"]
      },
      "entryParameters": {
        "zone": {"min": 121, "max": 121},
        "condition": "if it gets to its 21-day MA"
      },
      "exitParameters": {
        "stopLoss": null,
        "target": null,
        "strategy": "Day trade - likely same-day exit"
      },
      "rationale": "day-after-trade opportunity",
      "isDayAfterTrade": true,
      "tradeDuration": "day",
      "frequency": 1,
      "isFavorite": false,
      "positionSizing": {
        "recommendation": "speculative sizing",
        "reasoning": "Medium conviction DAT with speculative nature"
      },
      "risk": {
        "level": "high",
        "factors": ["Speculative short", "DAT strategy", "No defined stop"]
      },
      "relatedIdeas": [],
      "historicalContext": null
    },
    {
      "ticker": "CRWV",
      "direction": "long",
      "conviction": {
        "level": "medium",
        "phrases": ["interesting on any pullback", "viable swing trade"]
      },
      "entryParameters": {
        "zone": {"min": null, "max": null},
        "condition": "on any pullback"
      },
      "exitParameters": {
        "stopLoss": null,
        "target": null,
        "strategy": "Swing trade entry on pullback"
      },
      "rationale": "viable swing trade opportunity",
      "isDayAfterTrade": false,
      "tradeDuration": "swing",
      "frequency": 1,
      "isFavorite": false,
      "positionSizing": {
        "recommendation": "half position",
        "reasoning": "Medium conviction with undefined entry level"
      },
      "risk": {
        "level": "medium",
        "factors": ["Undefined entry zone", "Medium conviction"]
      },
      "relatedIdeas": [],
      "historicalContext": null
    },
    {
      "ticker": "AMD",
      "direction": "long",
      "conviction": {
        "level": "medium",
        "phrases": ["could work", "might be worth trying some calls"]
      },
      "entryParameters": {
        "zone": {"min": 115, "max": 115},
        "condition": "around 115"
      },
      "exitParameters": {
        "stopLoss": null,
        "target": null,
        "strategy": "Options trade - calls rather than shares"
      },
      "rationale": "worth trying some calls",
      "isDayAfterTrade": false,
      "tradeDuration": "day",
      "frequency": 1,
      "isFavorite": false,
      "positionSizing": {
        "recommendation": "small options position",
        "reasoning": "Medium conviction with options suggestion"
      },
      "risk": {
        "level": "high",
        "factors": ["Options trade", "Medium conviction", "No defined target"]
      },
      "relatedIdeas": [],
      "historicalContext": null
    },
    {
      "ticker": "TSLA",
      "direction": "long",
      "conviction": {
        "level": "low",
        "phrases": ["only interesting near the 8-day MA", "would not chase"]
      },
      "entryParameters": {
        "zone": {"min": 309, "max": 309},
        "condition": "near the 8-day MA"
      },
      "exitParameters": {
        "stopLoss": null,
        "target": null,
        "strategy": "Only enter at specific technical level"
      },
      "rationale": "only interesting near the 8-day MA",
      "isDayAfterTrade": false,
      "tradeDuration": "day",
      "frequency": 1,
      "isFavorite": false,
      "positionSizing": {
        "recommendation": "small position",
        "reasoning": "Low conviction with highly conditional entry"
      },
      "risk": {
        "level": "high",
        "factors": ["Low conviction", "Specific technical entry only", "Would not chase"]
      },
      "relatedIdeas": [],
      "historicalContext": null
    }
  ],
  "levels": {
    "indices": {
      "es": {
        "support": [
          {"value": 5900, "notes": "trapped several times now"},
          {"value": 5850, "notes": "major support if 5900 fails"}
        ],
        "resistance": [
          {"value": 5926, "notes": "top of the bull flag"},
          {"value": 5945, "notes": "secondary resistance"},
          {"value": 5970, "notes": "measured move target if we break out"}
        ]
      },
      "spx": {
        "support": [
          {"value": 5920, "notes": "comparable to ES 5900"},
          {"value": 5870, "notes": "major support if 5920 fails"}
        ],
        "resistance": [
          {"value": 5946, "notes": "top of the bull flag"},
          {"value": 5965, "notes": "secondary resistance"},
          {"value": 5990, "notes": "measured move target if we break out"}
        ]
      }
    },
    "stocks": [
      {
        "ticker": "TSLA",
        "levels": {},
        "movingAverages": {"ma8": 309}
      },
      {
        "ticker": "BABA",
        "levels": {},
        "movingAverages": {"ma21": 121}
      }
    ]
  },
  "processingMetadata": {
    "confidenceScore": 0.85,
    "sectionsCaptured": ["market context", "focus ideas", "technical levels"],
    "missingSections": []
  }
}
```

## Implementation Details

The Morning Call Processor is designed to handle the natural language variations in DP's conversational style. It uses pattern recognition to identify key sections and extracts structured information using contextual clues.

The implementation focuses on:

1. **Accuracy over Completeness**: Prioritizes correctly identifying high-conviction trade ideas and key levels, even if some secondary information is missed.

2. **Conviction-Based Classification**: Uses the Conviction Classification System to determine the conviction level behind each trade idea.

3. **Technical Level Integration**: Extracts numerical price levels and classifies them properly as support or resistance.

4. **DAT Opportunity Detection**: Specifically identifies day-after-trade opportunities, which have a different timing profile.

5. **Confidence Scoring**: Provides metadata about the extraction quality to inform downstream consumers.

6. **Robust Error Handling**: Includes comprehensive validation and fallback strategies to handle various failure modes.

7. **Graceful Degradation**: Returns partial results when complete processing isn't possible, rather than failing entirely.

## Robust Extraction Strategies

### Ticker Symbol Identification
The processor uses multiple approaches to identify ticker symbols:

1. **Pattern-Based Recognition**:
   - Standard uppercase 1-5 character patterns (e.g., AAPL, MSFT, SPX)
   - Common index patterns (ES, NQ, RTY, SPX, QQQ)
   - Dollar-prefixed patterns ($AAPL, $ES)

2. **Context-Based Extraction**:
   - Recognition of phrases like "looking at", "trading in", "focus on" before tickers
   - Identification of price discussions associated with potential tickers
   - Pattern matching for common stock discussion formats

3. **Fallback Methods**:
   - If standard recognition fails, apply broader pattern matching
   - Extract capitalized words near price values
   - Identify words frequently referenced in typical stock discussion contexts

### Handling Ambiguous Section Boundaries

When section boundaries are unclear:

1. **Overlapping Windows Analysis**:
   - Scan text using overlapping windows to identify section markers
   - Calculate confidence scores for potential section boundaries
   - Use context clues to disambiguate

2. **Marker-Based Fallbacks**:
   - Use key phrase markers as section anchors (e.g., "looking at levels", "for ideas")
   - Identify paragraph breaks as potential section transitions
   - Look for changes in discussion topic as section indicators

3. **Fuzzy Matching**:
   - Apply fuzzy matching for section identification when clear markers aren't present
   - Use keyword density analysis to identify topic clusters
   - Employ sentence structure analysis to identify shifts in discourse

## Minimum Viable Processing Requirements

For the processor to function effectively, at minimum it needs:

1. **Basic Text Requirements**:
   - At least 100 characters of coherent text
   - At least one identifiable market reference or ticker symbol
   - Some form of sentiment or directional indication

2. **Critical Content Elements**:
   - Either market context OR focus ideas must be identifiable
   - Some indication of directional bias (bullish/bearish/neutral)
   - For ticker-specific analysis, at least one recognizable ticker

3. **Quality Thresholds**:
   - Minimum confidence score of 0.4 for inclusion in results
   - At least 30% of the transcript must be parseable
   - Must contain at least one complete analytical thought or idea

## Integration with Conviction Classifier

The processor integrates with the conviction classifier as follows:

1. **Primary Integration Path**:
   - Extract ticker-specific text with surrounding context
   - Pass to conviction classifier with appropriate parameters
   - Incorporate classification results into focus idea structure

2. **Fallback Integration**:
   - If conviction classifier unavailable: Use simplified internal classification
   - If classification fails: Assign default "low" conviction with warning
   - If partial classification: Use available results and note missing elements

3. **Error Handling**:
   - Catch and log classification errors
   - Apply fallback classification when needed
   - Include classifier status in processing metadata

## Related Components

This processor works closely with:
- `prompts/focus/conviction-classifier.md` - For standardized conviction classification
- `prompts/focus/create-plan.md` - Consumes the output to generate a unified plan
- `prompts/focus/extract-focus.md` - Uses the focus ideas for prioritization
- `prompts/focus/extract-levels.md` - Leverages the level data for technical analysis

When the conviction classifier is unavailable, the processor can still operate with reduced functionality through its internal fallback classification mechanisms.
