# Morning Call Processor - Implementation Specification

## Overview

The Morning Call Processor is a specialized component designed to parse and extract structured data from DP morning call transcripts. This document provides the technical specification for implementing this critical component of Intent Trader.

## Core Functionality

The Morning Call Processor will:

1. Parse raw transcript text from DP morning calls
2. Identify distinct content sections using natural language markers
3. Extract structured data for each identified section
4. Classify conviction levels based on language patterns
5. Extract technical levels and moving average relationships
6. Identify focus trade ideas with complete parameters
7. Detect day-after-trade opportunities
8. Output standardized structured data for use in trade planning

## Component Architecture

### Section Identification

```
Input: Raw transcript text
Output: Mapped sections with text content

Algorithm:
1. Identify market context introduction (futures status, key movers)
2. Locate earnings discussion markers ("reported", "beat", "miss", etc.)
3. Find analyst action patterns ("upgraded", "downgraded", "price target")
4. Identify focus ticker sections (conviction phrases + ticker symbols)
5. Locate technical level discussion ("levels", "support", "resistance", "MA")
6. Identify DAT opportunities ("day after trade", "earnings reaction")
7. Extract strategic commentary sections
```

### Conviction Classification

```
Input: Text containing ticker discussion
Output: Structured conviction assessment

Conviction Phrases:
- High: "love it", "focus idea", "very viable", "absolutely crushing", "monster"
- Medium: "viable", "like it", "worth a look", "interesting", "decent setup"
- Low: "might work", "if it pulls back", "keep an eye on", "could be okay"
- Negative: "not interested", "be careful", "avoid", "too extended"

Algorithm:
1. Identify ticker symbol and surrounding context
2. Extract explicit conviction phrases
3. Consider proximity qualifiers (very, really, etc.)
4. Assess directional clarity (definitive vs. conditional)
5. Evaluate specificity of parameters (exact vs. vague)
6. Assign standardized conviction level
7. Include verbatim phrases that led to classification
```

### Technical Level Extraction

```
Input: Text containing level discussion
Output: Structured technical levels

Level Types:
- Support/Resistance: Direct numerical values
- Moving Averages: 8-day, 10-day, 21-day, 50-day, 100-day, 200-day
- Pivot Points: Specified pivots or inflection points
- Recent Highs/Lows: Historical points of significance
- Character Change Levels: Points where price character might shift

Algorithm:
1. Identify ticker or index symbol
2. Extract numerical values preceded by level indicators
3. Classify level type based on context
4. Order levels appropriately (ascending/descending)
5. Associate moving averages with current values
6. Identify relative strength of levels (primary/secondary)
7. Extract verbatim level description
```

### Focus Idea Extraction

```
Input: Text containing trade ideas
Output: Structured focus trade ideas

Idea Components:
- Ticker: Stock symbol
- Direction: Long/short bias
- Conviction: Classified conviction level
- Entry Parameters: Price levels or conditions
- Exit Parameters: Targets and stops
- Catalysts: Events or reasons driving the trade
- Technical Context: Supporting technical factors

Algorithm:
1. Identify ticker symbol in focus idea context
2. Determine directional bias from context
3. Extract entry parameters (price levels or zones)
4. Identify stop levels (explicit or implied)
5. Extract target levels or profit expectations
6. Classify conviction using Conviction Classifier
7. Extract supporting rationale or catalysts
8. Associate with relevant technical levels
```

### DAT Opportunity Detection

```
Input: Text containing day-after-trade discussion
Output: Structured DAT opportunities

DAT Patterns:
- Post-Earnings: Response to earnings report
- News Reaction: Response to significant news
- Analyst Action: Response to upgrades/downgrades
- Technical Break: Response to technical level breach

Algorithm:
1. Identify "day after" or post-event context markers
2. Extract ticker symbol and event type
3. Determine directional bias (continuation or reversal)
4. Assess conviction level using modified classifier
5. Extract entry parameters if specified
6. Identify supporting rationale
7. Flag time sensitivity if indicated
```

## Input Processing

The processor will handle various input formats:

1. **Raw Transcript**: Complete morning call text
2. **Pre-sectioned Text**: Text already divided by section
3. **Audio Transcript**: Text generated from audio recording
4. **Partial Transcript**: Incomplete morning call requiring context inference

Input preprocessing will:
- Normalize text formatting
- Handle special characters and symbols
- Correct common transcription errors
- Standardize ticker symbol formats
- Process numerical representations consistently

## Output Schema

The output will adhere to the following schema structure:

```json
{
  "processorVersion": "string",
  "processedAt": "datetime",
  "transcript": {
    "date": "date",
    "source": "string",
    "rawText": "string"
  },
  "marketContext": {
    "futures": {
      "es": {"value": number, "change": number},
      "nq": {"value": number, "change": number},
      "ym": {"value": number, "change": number}
    },
    "keyMovers": [
      {
        "ticker": "string",
        "direction": "up|down",
        "magnitude": "string",
        "reason": "string"
      }
    ],
    "keyCatalysts": ["string"],
    "sentiment": "string"
  },
  "earningsReports": [
    {
      "ticker": "string",
      "result": "beat|miss|mixed",
      "revenueBeat": boolean,
      "epsBeat": boolean,
      "guidance": "raised|lowered|maintained|none",
      "reaction": "string",
      "priceAction": "string",
      "rawText": "string"
    }
  ],
  "analystActions": [
    {
      "ticker": "string",
      "firm": "string",
      "action": "upgrade|downgrade|initiate|reiterate",
      "oldRating": "string",
      "newRating": "string",
      "oldTarget": number,
      "newTarget": number,
      "rawText": "string"
    }
  ],
  "focusIdeas": [
    {
      "ticker": "string",
      "direction": "long|short",
      "conviction": {
        "level": "high|medium|low|neutral|negative",
        "phrases": ["string"],
        "confidence": number
      },
      "entryParameters": {
        "type": "price|pullback|breakout",
        "zone": {"min": number, "max": number},
        "condition": "string"
      },
      "exitParameters": {
        "stopLoss": number,
        "target": number,
        "timeStop": "string"
      },
      "rationale": "string",
      "technical": {
        "keyLevels": [{"value": number, "type": "string"}],
        "movingAverages": {"ma8": number, "ma10": number, "ma21": number}
      },
      "rawText": "string"
    }
  ],
  "datOpportunities": [
    {
      "ticker": "string",
      "event": "earnings|news|analyst|technical",
      "direction": "long|short",
      "conviction": {
        "level": "high|medium|low",
        "phrases": ["string"]
      },
      "entryParameters": {
        "type": "string",
        "condition": "string"
      },
      "rationale": "string",
      "rawText": "string"
    }
  ],
  "technicalLevels": {
    "indices": {
      "es": {
        "support": [{"value": number, "strength": "primary|secondary"}],
        "resistance": [{"value": number, "strength": "primary|secondary"}],
        "pivot": number,
        "movingAverages": {"ma8": number, "ma10": number, "ma21": number}
      },
      "spx": {/* same structure as ES */},
      "qqq": {/* same structure as ES */}
    },
    "stocks": [
      {
        "ticker": "string",
        "support": [{"value": number, "strength": "primary|secondary"}],
        "resistance": [{"value": number, "strength": "primary|secondary"}],
        "movingAverages": {"ma8": number, "ma10": number, "ma21": number},
        "characterChange": {
          "signal": "string",
          "level": number,
          "direction": "bullish|bearish"
        },
        "rawText": "string"
      }
    ]
  },
  "marketPhilosophy": {
    "approach": "string",
    "keyThemes": ["string"],
    "rawText": "string"
  },
  "processingMetadata": {
    "confidenceScore": number,
    "missingSections": ["string"],
    "ambiguities": [
      {
        "section": "string",
        "issue": "string",
        "resolution": "string"
      }
    ]
  }
}
```

## Implementation Approach

### Phase 1: Basic Section Identification
- Implement core section identification
- Extract basic market context
- Identify earnings and analyst actions
- Create simple conviction classification

### Phase 2: Focus Idea Extraction
- Implement comprehensive conviction classification
- Extract complete focus idea parameters
- Detect DAT opportunities
- Link ideas to supporting technical context

### Phase 3: Technical Analysis
- Implement technical level extraction
- Detect moving average relationships
- Identify character change signals
- Extract chart pattern references

### Phase 4: Integration & Refinement
- Implement complete schema output
- Add confidence scoring
- Handle edge cases and ambiguities
- Optimize for different transcript formats

## Usage Example

```javascript
// Example usage in system
const morningCallProcessor = require('./morning-call-processor');

// Process complete transcript
const result = await morningCallProcessor.process(transcriptText, {
  includeRawText: true,
  confidenceThreshold: 0.7,
  dateContext: '2025-05-15'
});

// Extract focus ideas only
const focusIdeas = await morningCallProcessor.extractFocusIdeas(transcriptText);

// Extract technical levels for specific ticker
const levels = await morningCallProcessor.extractLevels(transcriptText, {
  ticker: 'AAPL'
});
```

## Testing Strategy

The Morning Call Processor will be tested against:

1. **Historical Transcripts**: Validate against known morning calls
2. **Synthetic Examples**: Test edge cases and unusual formats
3. **Modified Transcripts**: Test robustness with intentional errors
4. **Partial Transcripts**: Test with incomplete information
5. **Real-time Processing**: Test with freshly generated transcripts

Test metrics will include:
- Section identification accuracy
- Conviction classification precision
- Technical level extraction accuracy
- Focus idea completeness
- Processing time performance

## Integration Points

The Morning Call Processor will integrate with:

1. **Command Router**: Via `/analyze-call` command
2. **Trade Plan Generator**: For creating unified trade plans
3. **Technical Analysis Engine**: For validation and enrichment
4. **Watchlist Manager**: For adding focus ideas to watchlist
5. **Historical Database**: For training and analysis
