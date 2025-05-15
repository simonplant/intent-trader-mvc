---
id: analyze-dp
title: Morning Call Processor
description: Analyzes DP morning call transcripts to extract actionable trading information
author: Intent Trader Team
version: 1.0.0
release: 0.5.1
created: 2025-05-15
updated: 2025-05-15
category: premarket
status: stable
tags: [premarket, analysis, dp, morning-call]
requires: [system/focus/conviction-classifier.md]
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
- `includeRaw` (optional): Whether to include raw text in the output (default: false)
- `minConfidence` (optional): Minimum confidence threshold for extraction (default: 0.7)

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
        "level": "big-idea/high/medium/low/negative",
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
      "frequency": "number" // how many times mentioned in call
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
    "confidenceScore": "number",
    "sectionsCaptured": ["string"],
    "missingSections": ["string"]
  }
}
```

## Processing Logic

The Morning Call Processor follows this analysis approach:

### 1. Preprocessing

- Normalize whitespace and formatting
- Standardize ticker symbols (uppercase without $ prefix)
- Handle special characters and abbreviations
- Divide text into logical sections based on content patterns
- Create a ticker mention count to track frequency throughout the call

### 2. Section Identification

- **Market Context Section**: Usually appears at the beginning discussing futures, indices
- **Analyst Actions Section**: Contains "upgrade," "downgrade," "price target" language
- **Focus Ideas Section**: Includes ticker symbols with conviction language
- **Technical Levels Section**: Contains numerical values for support/resistance
- **Market Philosophy Section**: General trading approach and broader context

### 3. Market Context Extraction

- Identify futures status and direction
- Extract index movements with magnitude
- Identify key movers with reasons
- Determine overall market sentiment
- Identify important catalysts or events

### 4. Focus Ideas Extraction

- Identify ticker symbols in focus
- Determine directional bias (long/short)
- Classify conviction level using language patterns and emotional cues
- Identify trade duration (cashflow/day, swing, long-term)
- Extract entry parameters (price levels or conditions)
- Extract exit parameters where available
- Count frequency of mentions throughout the call
- Identify day-after-trade opportunities
- Capture trading rationale
- Identify any sizing recommendations

### 5. Technical Level Extraction

- Identify index levels (ES, SPX, etc.)
- Classify levels as support or resistance
- Extract moving average values
- Extract context or notes about levels
- Calculate relative significance of levels

### 6. Conviction Classification

The processor uses a sophisticated framework to classify conviction levels based on DP's language patterns, emotional cues, and contextual signals:

**Big Idea (Highest Conviction)**:
- Emotional language: "love it," "home run," "killing it," "slam dunk," "must-have"
- Excitement indicators: "huge opportunity," "can't miss this one"
- Focus designation: "focus idea for the day," "focus trade"
- Multiple mentions of the same ticker throughout the call
- Clear thesis with immediate catalyst
- High emotion and certainty in language
- "this is the one" or similar exclusivity phrases

**High Conviction**:
- "very viable"
- "definitely a buyer"
- "remain very bullish"
- "excited about this"
- Clear price levels or targets with conviction
- "strong setup"
- "high conviction"
- "looking good here"
- Strong directional bias without extreme emotional cues

**Medium Conviction**:
- "viable"
- "interesting"
- "worth a look"
- "watching"
- "decent setup"
- Specific entry/exit levels but limited emotional engagement
- "could work"
- "on the radar"
- "makes sense here"

**Low Conviction**:
- "might work"
- "could be okay"
- "if it pulls back"
- "keeping an eye on"
- "possibly"
- "only interesting near"
- Highly conditional language
- Emphasis on specific short-term levels rather than thesis
- "maybe"
- "not excited, but..."

**Negative Conviction**:
- "not interested"
- "would avoid"
- "don't like"
- "staying away"
- "too extended"
- "wouldn't chase"
- "be careful with"
- "don't see the opportunity"
- "too risky"

The processor also considers:
- **Frequency of mentions**: Multiple references to the same trade idea throughout the call increase the conviction level
- **Position context**: Mentions of personal position ("I'm in this," "I own this") often indicate higher conviction
- **Duration markers**: References to trade timeframe (day trade, swing trade, long-term) provide additional context
- **Sizing cues**: Any explicit references to position sizing can signal conviction level

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
        "level": "big-idea",
        "phrases": ["love TEM right now"]
      },
      "entryParameters": {
        "zone": {"min": 60, "max": 62},
        "condition": "current range"
      },
      "exitParameters": {
        "stopLoss": null,
        "target": null
      },
      "rationale": "great entry point for a swing trade",
      "isDayAfterTrade": false,
      "tradeDuration": "swing",
      "frequency": 1
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
        "target": null
      },
      "rationale": "remain very bullish on this name",
      "isDayAfterTrade": false,
      "tradeDuration": "swing",
      "frequency": 1
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
        "target": null
      },
      "rationale": "day-after-trade opportunity",
      "isDayAfterTrade": true,
      "tradeDuration": "day",
      "frequency": 1
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
        "target": null
      },
      "rationale": "viable swing trade opportunity",
      "isDayAfterTrade": false,
      "tradeDuration": "swing",
      "frequency": 1
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
        "target": null
      },
      "rationale": "worth trying some calls",
      "isDayAfterTrade": false,
      "tradeDuration": "day",
      "frequency": 1
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
        "target": null
      },
      "rationale": "only interesting near the 8-day MA",
      "isDayAfterTrade": false,
      "tradeDuration": "day",
      "frequency": 1
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

2. **Conviction-Based Classification**: Uses a comprehensive phrase library to determine the conviction level behind each trade idea.

3. **Technical Level Integration**: Extracts numerical price levels and classifies them properly as support or resistance.

4. **DAT Opportunity Detection**: Specifically identifies day-after-trade opportunities, which have a different timing profile.

5. **Confidence Scoring**: Provides metadata about the extraction quality to inform downstream consumers.

## Limitations and Edge Cases

The processor handles these common challenges:

1. **Ambiguous Language**: When DP uses ambiguous or mixed conviction language, the processor errs on the side of lower conviction.

2. **Missing Parameters**: When stop loss or target levels aren't specified, they're set to null rather than guessed.

3. **Complex Levels**: When level discussions include ranges or multiple conditions, the processor captures the primary numeric value and notes the context.

4. **Partial Transcripts**: Can process incomplete transcripts, but will note missing sections in the metadata.

5. **Mixed Sentiment**: When market sentiment contains both positive and negative elements, the processor indicates this mixed nature.

## Related Components

This processor works closely with:
- `system/focus/conviction-classifier.md` - For standardized conviction classification
- `prompts/premarket/create-plan.md` - Consumes the output to generate a unified plan
- `prompts/premarket/extract-focus.md` - Uses the focus ideas for prioritization
- `prompts/premarket/extract-levels.md` - Leverages the level data for technical analysis
