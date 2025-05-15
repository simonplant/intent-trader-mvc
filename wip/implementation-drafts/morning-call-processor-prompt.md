# Morning Call Processor Implementation Prompt

This document provides a comprehensive prompt to implement the Morning Call Processor for Intent Trader, focusing on extracting structured data from DP morning call transcripts.

## System Context

You are implementing the Morning Call Processor for Intent Trader, an AI trading assistant. This processor extracts structured data from DP morning call transcripts, identifying market context, focus trade ideas, technical levels, and other key components.

## Processor Objectives

1. Identify distinct sections within morning call transcripts
2. Extract structured data for each identified section
3. Classify conviction levels based on language patterns
4. Extract technical levels and moving average relationships
5. Identify focus trade ideas with complete parameters
6. Detect day-after-trade opportunities
7. Output standardized structured data for use in trade planning

## Implementation Requirements

### Section Identification

You must identify these common sections in DP morning calls:

1. **Market Context**: Information about futures, indices, and overall market conditions
   - Typically appears at the beginning of the call
   - Contains references to index futures (ES, NQ, YM)
   - Often mentions percentage or point movements
   - May reference cryptocurrency or commodities

2. **Earnings Reports**: Discussion of recent earnings announcements
   - Contains company tickers followed by earnings results
   - Includes terms like "beat", "miss", "guidance", "raised/lowered targets"
   - May include commentary on stock price reaction
   - Often grouped together in a distinct section

3. **Analyst Actions**: Coverage of upgrades, downgrades, and price target changes
   - Contains phrases like "upgraded to", "downgraded to", "price target"
   - Mentions specific analyst firms (Morgan Stanley, Goldman Sachs, etc.)
   - Includes rating changes (buy, hold, sell, overweight, etc.)
   - Often presented in a list format

4. **Focus Trade Ideas**: Specific stocks DP is watching with directional bias
   - Contains ticker symbols with specific commentary
   - Includes conviction indicators ("love it", "very viable", etc.)
   - May mention entry levels, targets, or stops
   - Often contains personal position disclosure
   - May reference "day after trade" opportunities

5. **Technical Levels**: Key price points for indices or stocks
   - Contains specific numerical values for support/resistance
   - References moving averages (8-day, 10-day, 21-day, etc.)
   - May mention "pivot points" or "key levels"
   - Often presented as a list near the end of the call

6. **Market Philosophy**: Strategic approach and broader context
   - More general trading advice or market observations
   - May reference longer-term trends or conditions
   - Often more reflective or educational in tone
   - May appear at the end of the call

### Entity Extraction

You must extract these key entities from the transcript:

1. **Market Status**
   - Overall market direction and sentiment
   - Key index movements and percentages
   - Major catalysts or news events
   - Futures performance

2. **Ticker Mentions**
   - Stock symbols referenced in the call
   - Associated commentary and context
   - Directional bias (bullish/bearish)
   - Specific price levels mentioned

3. **Earnings Data**
   - Companies reporting earnings
   - Beat/miss assessment
   - Guidance information
   - Stock price reaction

4. **Analyst Actions**
   - Stock affected by analyst action
   - Firm issuing the action
   - Action type (upgrade, downgrade, initiation)
   - Old and new ratings/targets

5. **Price Levels**
   - Support and resistance levels
   - Moving average values
   - Pivot points
   - Gap areas

6. **Trade Setups**
   - Entry criteria
   - Stop loss levels
   - Target levels
   - Setup type

### Conviction Classification

You must classify DP's conviction level based on language patterns:

1. **High Conviction**
   - "love it"
   - "very viable"
   - "focus idea"
   - "definitely a buyer"
   - "i am a buyer"
   - "high conviction"
   - "definitely"
   - "absolutely"

2. **Medium Conviction**
   - "viable"
   - "interesting"
   - "worth a look"
   - "watching"
   - "could be a good"
   - "probably"
   - "likely"

3. **Low Conviction**
   - "might work"
   - "could be okay"
   - "keeping an eye on"
   - "possibly"
   - "might"
   - "if it pulls back"

4. **Negative Conviction**
   - "not interested"
   - "would avoid"
   - "don't like"
   - "staying away"
   - "be careful"
   - "not looking to"

### Day-After-Trade (DAT) Detection

Identify potential day-after-trade opportunities with these characteristics:

1. **Post-Earnings DAT**
   - Stock mentioned after reporting earnings
   - Commentary on price reaction ("up/down X%")
   - Directional bias for continued movement
   - Often mentioned as a "day after trade" or "DAT"

2. **Post-News DAT**
   - Stock mentioned after significant news
   - Commentary on price reaction to the news
   - Expectations for continued movement
   - References to the catalyst event

### Character Change Recognition

Detect references to price character changes with these indicators:

1. **Character Change Signals**
   - Explicit mention of "character change"
   - Discussion of behavior shift in price action
   - References to pattern changes
   - Indications of trend reversals or continuations

2. **Technical Triggers**
   - Breaking or reclaiming key levels
   - Moving average crossovers or tests
   - Volume pattern shifts
   - Momentum indicator changes

## Output Schema

Your analysis should produce output conforming to this schema:

```json
{
  "processorVersion": "1.0",
  "processedAt": "ISO datetime",
  "date": "Call date",
  "marketContext": {
    "futures": {
      "es": {"value": "number", "change": "number or string"},
      "nq": {"value": "number", "change": "number or string"},
      "ym": {"value": "number", "change": "number or string"}
    },
    "keyMovers": [
      {
        "ticker": "symbol",
        "direction": "up/down",
        "magnitude": "value",
        "reason": "explanation"
      }
    ],
    "keyCatalysts": ["catalyst1", "catalyst2"],
    "sentiment": "overall market sentiment",
    "cryptoStatus": {"bitcoin": "value/change", "ethereum": "value/change"}
  },
  "earningsReports": [
    {
      "ticker": "symbol",
      "result": "beat/miss/mixed",
      "revenueBeat": true/false,
      "epsBeat": true/false,
      "guidance": "raised/lowered/maintained/none",
      "reaction": "price reaction",
      "rawText": "original text"
    }
  ],
  "analystActions": [
    {
      "ticker": "symbol",
      "firm": "analyst firm",
      "action": "upgrade/downgrade/initiate/reiterate",
      "oldRating": "previous rating",
      "newRating": "new rating",
      "oldTarget": "number or null",
      "newTarget": "number or null",
      "rawText": "original text"
    }
  ],
  "focusIdeas": [
    {
      "ticker": "symbol",
      "direction": "long/short",
      "conviction": {
        "level": "high/medium/low/negative",
        "phrases": ["conviction phrases"],
        "confidence": "number 0-1"
      },
      "entryParameters": {
        "type": "price/pullback/breakout",
        "zone": {"min": "number", "max": "number"},
        "condition": "condition description"
      },
      "exitParameters": {
        "stopLoss": "number or null",
        "target": "number or null",
        "timeStop": "time-based exit or null"
      },
      "rationale": "trade reasoning",
      "technical": {
        "keyLevels": [{"value": "number", "type": "support/resistance"}],
        "movingAverages": {"ma8": "number", "ma10": "number", "ma21": "number"}
      },
      "isDayAfterTrade": true/false,
      "characterChange": {
        "mentioned": true/false,
        "direction": "bullish/bearish",
        "description": "change description"
      },
      "rawText": "original text"
    }
  ],
  "technicalLevels": {
    "indices": {
      "es": {
        "support": [{"value": "number", "strength": "description"}],
        "resistance": [{"value": "number", "strength": "description"}],
        "pivot": "number or null",
        "movingAverages": {"ma8": "number", "ma10": "number", "ma21": "number"}
      },
      "spx": {"similar structure"},
      "qqq": {"similar structure"}
    },
    "stocks": [
      {
        "ticker": "symbol",
        "support": [{"value": "number", "strength": "description"}],
        "resistance": [{"value": "number", "strength": "description"}],
        "movingAverages": {"ma8": "number", "ma10": "number", "ma21": "number"},
        "characterChange": {
          "mentioned": true/false,
          "direction": "bullish/bearish",
          "description": "change description"
        },
        "rawText": "original text"
      }
    ]
  },
  "marketPhilosophy": {
    "approach": "strategic approach",
    "keyThemes": ["theme1", "theme2"],
    "rawText": "original text"
  },
  "processingMetadata": {
    "confidenceScore": "number 0-1",
    "missingSections": ["section names"],
    "ambiguities": [
      {
        "section": "section name",
        "issue": "description of the issue",
        "resolution": "how it was handled"
      }
    ]
  }
}
```

## Implementation Approach

When implementing the Morning Call Processor, follow these guidelines:

1. **Preprocessing**
   - Normalize text (standardize whitespace, fix typos)
   - Convert ticker mentions to consistent format
   - Resolve relative dates and times
   - Handle special characters and formatting

2. **Section Identification**
   - Use marker phrases to identify section boundaries
   - Analyze paragraph structure and content
   - Look for clustering of related information
   - Use positional information (beginning, middle, end)

3. **Entity Extraction**
   - Use pattern matching for structured data (numbers, tickers)
   - Apply context-sensitive extraction for related information
   - Maintain relationships between entities
   - Preserve original text for verification

4. **Conviction Assessment**
   - Identify phrases indicating conviction
   - Consider proximity and modifiers
   - Evaluate certainty and emphasis
   - Assign standardized levels with confidence scores

5. **Post-Processing**
   - Validate numerical values for reasonableness
   - Ensure structural integrity of the output
   - Calculate confidence scores for extractions
   - Flag ambiguities or low-confidence elements

## Example Implementation

Here is how you should approach processing a transcript excerpt:

**Input Excerpt:**
```
Futures are a bit lower as we await this morning's CPI. The Dow is leading to the downside after UNH suspends guidance for 2025. The CEO steps down and it's getting crushed. United Health down 40 points this morning. Again, they suspend guidance and the CEO steps down. That takes the Dow down over 200.

NASDAQ very much better down 10-15 points. It was down about 60-70 early morning, but it's rallied back. Bitcoin rallies about 2,000 points off yesterday's lows. That might partially be due to Coinbase being added to the S&P, and Coinbase is up almost 10% this morning, traded as high as 230, I believe, probably 226, 227 at this very moment, 10% that's Coinbase being added to the S&P.
```

**Processing Steps:**
1. Identify this as part of the Market Context section
2. Extract information about futures status
3. Identify key movers (UNH, Coinbase)
4. Recognize catalysts (CPI, UNH guidance suspension, Coinbase S&P addition)
5. Extract numerical data (UNH down 40 points, Dow down 200, Bitcoin up 2,000)
6. Determine market sentiment (mixed, with weakness in Dow, strength in crypto)

**Output for this Section:**
```json
{
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
    "crypto": {
      "bitcoin": {"direction": "up", "change": "2,000 points", "context": "from yesterday's lows"}
    },
    "keyCatalysts": ["CPI report", "UNH guidance suspension", "Coinbase S&P addition"],
    "sentiment": "mixed, weakness in Dow offset by strength in crypto/Coinbase"
  }
}
```

## Performance Expectations

Your implementation should:

1. Accurately identify 90%+ of sections correctly
2. Extract 85%+ of mentioned tickers with correct context
3. Correctly classify conviction levels with 80%+ accuracy
4. Structure all extracted data according to the specified schema
5. Provide confidence scores that correlate with extraction accuracy
6. Flag ambiguities or uncertain extractions appropriately
7. Include relevant raw text for verification purposes

## Error Handling

When encountering ambiguities or unclear information:

1. Make a reasonable inference based on context
2. Assign an appropriate confidence score reflecting uncertainty
3. Include the ambiguity in the processingMetadata.ambiguities array
4. Preserve the original text for reference
5. Use null for truly missing values rather than making unfounded guesses
6. Document the resolution approach taken

## Implementation Notes

- The processor should focus on extracting structured data without adding external information
- When uncertain about a classification, err on the side of lower conviction levels
- Numerical values should be extracted as numbers when used for price levels
- Preserve original phrasing for qualitative assessments
- Flag any missing expected sections in the processingMetadata
- Maintain logical relationships between related entities
- Ensure that all ticker symbols are standardized to uppercase without $ prefix

Your implementation should be able to process any DP morning call transcript and produce consistent, structured output that can be used for trade planning and integration with other analyst inputs.
