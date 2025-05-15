# Intent Trader: Master Prompt Instructions

This document contains self-contained prompt templates for implementing each component of the Intent Trader MVP. Each template is designed to be run in a fresh conversation to generate a specific implementation file.

---

## PLAN Phase Implementation

### 1. Morning Call Processor Implementation

```
# Morning Call Processor Implementation

## Context
I'm building an AI-assisted trading system called Intent Trader. The system needs to process DP morning call transcripts to extract actionable trading information. I need you to implement the core processor for this functionality.

## Implementation Requirements

Create a complete implementation for the `/analyze-dp` command that can:
1. Parse DP morning call transcripts
2. Extract market context (futures, sentiment, key movers)
3. Identify high-conviction trade ideas
4. Extract key technical levels
5. Determine analyst sentiment

The implementation should follow this structure:
- Front matter with metadata
- Clear purpose statement
- Input/output schemas
- Processing logic
- Template formats
- Example usage

## Output Structure

The output should follow this schema:
```json
{
  "marketContext": {
    "futures": {"status": "string", "catalysts": ["string"]},
    "indices": {"dow": {"direction": "string", "change": "string"}, "nasdaq": {"direction": "string", "change": "string"}},
    "keyMovers": [{"ticker": "string", "direction": "string", "magnitude": "string", "reason": "string"}],
    "sentiment": "string"
  },
  "focusIdeas": [
    {
      "ticker": "string",
      "direction": "long/short",
      "conviction": {"level": "high/medium/low", "phrases": ["string"]},
      "entryParameters": {"zone": {"min": "number", "max": "number"}, "condition": "string"},
      "exitParameters": {"stopLoss": "number", "target": "number"},
      "rationale": "string"
    }
  ],
  "levels": {
    "indices": {
      "es": {"support": [{"value": "number"}], "resistance": [{"value": "number"}]},
      "spx": {"support": [{"value": "number"}], "resistance": [{"value": "number"}]}
    },
    "stocks": [
      {
        "ticker": "string",
        "levels": {"support": [{"value": "number"}], "resistance": [{"value": "number"}]},
        "movingAverages": {"ma8": "number", "ma21": "number"}
      }
    ]
  }
}
```

## Sample Input for Testing

```
Good morning. Futures are a bit lower as we await this morning's CPI. The Dow is leading to the downside after UNH suspends guidance for 2025. The CEO steps down and it's getting crushed. United Health down 40 points this morning. Again, they suspend guidance and the CEO steps down. That takes the Dow down over 200.

NASDAQ very much better down 10-15 points. It was down about 60-70 early morning, but it's rallied back. Bitcoin rallies about 2,000 points off yesterday's lows. That might partially be due to Coinbase being added to the S&P, and Coinbase is up almost 10% this morning, traded as high as 230, I believe, probably 226, 227 at this very moment, 10% that's Coinbase being added to the S&P.

Now for some ideas. I love TEM right now, in the 60-62 range, this looks like a great entry point for a swing trade. I'm looking to add more to my HOOD position if it gets to 56, I remain very bullish on this name. For a short idea, BABA could be a decent day-after-trade if it gets to its 21-day MA around 121, might be worth a speculative short.

CRWV is also interesting on any pullback, viable swing trade opportunity there. AMD could work around 115, might be worth trying some calls. TSLA is only interesting to me near the 8-day MA, which is around 309, would not chase.

Looking at levels, ES support is around 5900, which has trapped several times now, with 5850 as major support if that fails. Resistance at 5926, which is the top of the bull flag, then 5945, with a measured move target around 5970 if we break out. SPX levels are about 20 points higher.
```

## Implementation Deliverable

Please create the complete implementation as an artifact suitable for the file path:
`prompts/premarket/analyze-dp.md`

The implementation should include:
1. Proper frontmatter
2. Clear purpose statement and description
3. Input parameter definitions
4. Complete processing logic explanation
5. Output format specification
6. Example usage
7. Test vector

The implementation should be optimized for extracting high-conviction trade ideas and key levels, with accuracy prioritized over comprehensiveness for the MVP.
```

### 2. Conviction Classification Implementation

```
# Conviction Classification Implementation

## Context
I'm building an AI-assisted trading system called Intent Trader. The system needs a component that can classify the conviction level of trade ideas based on language patterns in analyst commentary. I need you to implement this component.

## Implementation Requirements

Create a complete implementation for the conviction classification system that can:
1. Recognize language patterns indicating conviction levels
2. Classify phrases into high/medium/low conviction categories
3. Assign standardized conviction levels with confidence scores
4. Handle DP-specific terminology and phrasing

The implementation should follow this structure:
- Front matter with metadata
- Clear purpose statement
- Pattern recognition rules
- Classification logic
- Pattern-to-confidence mappings
- Example usage

## Conviction Pattern Maps

The system should recognize these patterns:

**High Conviction**:
- "love it", "love this"
- "very viable"
- "focus idea"
- "definitely a buyer"
- "i am a buyer"
- "high conviction"
- "definitely"
- "absolutely"

**Medium Conviction**:
- "viable"
- "interesting"
- "worth a look"
- "watching"
- "could be a good"
- "probably"
- "likely"

**Low Conviction**:
- "might work"
- "could be okay"
- "keeping an eye on"
- "possibly"
- "might"
- "if it pulls back"

**Negative Conviction**:
- "not interested"
- "would avoid"
- "don't like"
- "staying away"
- "be careful"
- "not looking to"

## Sample Input for Testing

```
"I love TEM right now, in the 60-62 range, this looks like a great entry point for a swing trade."

"I'm looking to add more to my HOOD position if it gets to 56, I remain very bullish on this name."

"For a short idea, BABA could be a decent day-after-trade if it gets to its 21-day MA around 121, might be worth a speculative short."

"CRWV is also interesting on any pullback, viable swing trade opportunity there."

"AMD could work around 115, might be worth trying some calls."

"TSLA is only interesting to me near the 8-day MA, which is around 309, would not chase."
```

## Implementation Deliverable

Please create the complete implementation as an artifact suitable for the file path:
`system/focus/conviction-classifier.md`

The implementation should include:
1. Proper frontmatter
2. Clear purpose statement and description
3. Complete pattern recognition rules
4. Classification algorithm explanation
5. Confidence scoring methodology
6. Example processing results
7. Integration instructions

The implementation should be optimized for accurately identifying high-conviction trade ideas, with robustness to handle variations in phrasing.
```

### 3. Unified Trade Plan Generator Implementation

```
# Unified Trade Plan Generator Implementation

## Context
I'm building an AI-assisted trading system called Intent Trader. The system needs to generate a comprehensive trade plan based on processed analyst inputs. I need you to implement the core generator for this functionality.

## Implementation Requirements

Create a complete implementation for the `/create-plan` command that can:
1. Generate a unified trade plan from processed analyst inputs
2. Format the plan with market overview, trade ideas, and levels
3. Prioritize trade ideas by conviction level
4. Include key technical levels and moving averages
5. Provide execution notes and risk guidance

The implementation should follow this structure:
- Front matter with metadata
- Clear purpose statement
- Input/output schemas
- Processing logic
- Template formats
- Example usage

## Input Structure

The command should take input in this format:
```json
{
  "marketContext": {
    "futures": {"status": "string", "catalysts": ["string"]},
    "indices": {"dow": {"direction": "string", "change": "string"}, "nasdaq": {"direction": "string", "change": "string"}},
    "keyMovers": [{"ticker": "string", "direction": "string", "magnitude": "string", "reason": "string"}],
    "sentiment": "string"
  },
  "focusIdeas": [
    {
      "ticker": "string",
      "direction": "long/short",
      "conviction": {"level": "high/medium/low", "phrases": ["string"]},
      "entryParameters": {"zone": {"min": "number", "max": "number"}, "condition": "string"},
      "exitParameters": {"stopLoss": "number", "target": "number"},
      "rationale": "string"
    }
  ],
  "levels": {
    "indices": {
      "es": {"support": [{"value": "number"}], "resistance": [{"value": "number"}]},
      "spx": {"support": [{"value": "number"}], "resistance": [{"value": "number"}]}
    },
    "stocks": [
      {
        "ticker": "string",
        "levels": {"support": [{"value": "number"}], "resistance": [{"value": "number"}]},
        "movingAverages": {"ma8": "number", "ma21": "number"}
      }
    ]
  }
}
```

## Output Format

The command should produce a formatted markdown plan like this:
```markdown
# Unified Daily Trade Plan — [DATE]

## Market Overview
- **Futures**: [status]
- **Sentiment**: [assessment]
- **Key Context**: [important information]

---

## DP Trade Ideas (Sorted by Conviction)

| # | Ticker | Level(s)     | Action              | Conviction | Sizing       | Duration | Sentiment |
|---|--------|--------------|---------------------|------------|--------------|----------|-----------|
| 1 | TICK   | 00–00        | [action]            | High       | [size]       | [time]   | [sent]    |
| 2 | TICK   | 00           | [action]            | High       | [size]       | [time]   | [sent]    |
| 3 | TICK   | 00 (00d MA)  | [action]            | Med-High   | [size]       | [time]   | [sent]    |

---

## Key Levels

### Support Zones

| Level | Type     | Notes                                    |
|-------|----------|------------------------------------------|
| 0000  | Major    | [significance]                           |
| 0000  | Minor    | [context]                                |

### Resistance Zones

| Level | Type     | Notes                                    |
|-------|----------|------------------------------------------|
| 0000  | Major    | [significance]                           |
| 0000  | Minor    | [context]                                |

---

## Moving Averages (Levels-Check Summary)

| Ticker | 8d MA | 21d MA | Price     | Notes                         |
|--------|-------|--------|-----------|-------------------------------|
| SPX    | ~0000 | ~0000  | 0000.00   | [relationship]                |
| TICK   | ~000  | ~000   | 000.00    | [relationship]                |

---

## Execution Notes

- [key focus points]
- [risk notes]
- [management protocol]
```

## Sample Input for Testing

```json
{
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
        "support": [{"value": 300, "type": "support"}],
        "resistance": [{"value": 320, "type": "resistance"}],
        "movingAverages": {"ma8": 309, "ma21": 300}
      },
      {
        "ticker": "AMD",
        "support": [{"value": 112, "type": "support"}],
        "resistance": [{"value": 120, "type": "resistance"}],
        "movingAverages": {"ma8": 117, "ma21": 115}
      }
    ]
  }
}
```

## Implementation Deliverable

Please create the complete implementation as an artifact suitable for the file path:
`prompts/premarket/create-plan.md`

The implementation should include:
1. Proper frontmatter
2. Clear purpose statement and description
3. Input parameter definitions
4. Complete processing logic explanation
5. Output format specification
6. Example usage
7. Test vector

The implementation should be optimized for creating clear, actionable trade plans with effective prioritization of opportunities by conviction.
```

---

## FOCUS Phase Implementation

### 4. Trade Idea Extractor Implementation

```
# Trade Idea Extractor Implementation

## Context
I'm building an AI-assisted trading system called Intent Trader. The system needs to extract and prioritize high-conviction trade ideas from processed analyst inputs. I need you to implement this component.

## Implementation Requirements

Create a complete implementation for the `/extract-focus` command that can:
1. Extract high-conviction trade ideas from processed analyst data
2. Filter ideas based on minimum conviction level
3. Prioritize opportunities by conviction
4. Present complete setup parameters
5. Include technical context and rationale

The implementation should follow this structure:
- Front matter with metadata
- Clear purpose statement
- Input/output schemas
- Processing logic
- Template formats
- Example usage

## Input Structure

The command should take input from the output of the `/analyze-dp` command, focusing on the `focusIdeas` array.

## Output Format

The command should produce a prioritized list of trade ideas in this format:

```json
{
  "filteredIdeas": [
    {
      "ticker": "string",
      "direction": "long/short",
      "conviction": {"level": "high/medium/low", "phrases": ["string"]},
      "entryParameters": {"zone": {"min": "number", "max": "number"}, "condition": "string"},
      "exitParameters": {"stopLoss": "number", "target": "number"},
      "rationale": "string",
      "priority": "number"
    }
  ],
  "summary": {
    "totalIdeas": "number",
    "filteredCount": "number",
    "convictionBreakdown": {
      "high": "number",
      "medium": "number",
      "low": "number"
    }
  }
}
```

## Sample Input for Testing

```json
{
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
  ]
}
```

## Implementation Deliverable

Please create the complete implementation as an artifact suitable for the file path:
`prompts/premarket/extract-focus.md`

The implementation should include:
1. Proper frontmatter
2. Clear purpose statement and description
3. Input parameter definitions
4. Complete processing logic explanation
5. Output format specification
6. Example usage
7. Test vector

The implementation should be optimized for accurately extracting and prioritizing high-conviction trade ideas from the analyst inputs.
```

### 5. Level Extractor Implementation

```
# Level Extractor Implementation

## Context
I'm building an AI-assisted trading system called Intent Trader. The system needs to extract key price levels from processed analyst inputs. I need you to implement this component.

## Implementation Requirements

Create a complete implementation for the `/extract-levels` command that can:
1. Extract key price levels from processed analyst data
2. Organize levels by index/symbol and type (support/resistance)
3. Include context and significance for each level
4. Present a hierarchical level structure
5. Provide moving average relationships where available

The implementation should follow this structure:
- Front matter with metadata
- Clear purpose statement
- Input/output schemas
- Processing logic
- Template formats
- Example usage

## Input Structure

The command should take input from the output of the `/analyze-dp` command, focusing on the `levels` object.

## Output Format

The command should produce a structured level framework in this format:

```json
{
  "indexLevels": {
    "es": {
      "support": [
        {"value": "number", "type": "major/minor", "notes": "string", "significance": "number"}
      ],
      "resistance": [
        {"value": "number", "type": "major/minor", "notes": "string", "significance": "number"}
      ]
    },
    "spx": {
      "support": [],
      "resistance": []
    }
  },
  "stockLevels": {
    "TICK": {
      "support": [],
      "resistance": [],
      "movingAverages": {"ma8": "number", "ma21": "number", "ma50": "number"}
    }
  },
  "summary": {
    "keyZones": ["value ranges that appear significant"],
    "majorLevels": ["most significant individual levels"]
  }
}
```

## Sample Input for Testing

```json
{
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
        "support": [{"value": 300, "type": "support"}],
        "resistance": [{"value": 320, "type": "resistance"}],
        "movingAverages": {"ma8": 309, "ma21": 300}
      },
      {
        "ticker": "AMD",
        "support": [{"value": 112, "type": "support"}],
        "resistance": [{"value": 120, "type": "resistance"}],
        "movingAverages": {"ma8": 117, "ma21": 115}
      }
    ]
  }
}
```

## Implementation Deliverable

Please create the complete implementation as an artifact suitable for the file path:
`prompts/premarket/extract-levels.md`

The implementation should include:
1. Proper frontmatter
2. Clear purpose statement and description
3. Input parameter definitions
4. Complete processing logic explanation
5. Output format specification
6. Example usage
7. Test vector

The implementation should be optimized for accurately extracting and organizing key price levels with appropriate context and significance.
```

---

## EXECUTE Phase Implementation

### 6. Position Manager Implementation

```
# Position Manager Implementation

## Context
I'm building an AI-assisted trading system called Intent Trader. The system needs to track and manage trading positions. I need you to implement the core position management commands.

## Implementation Requirements

Create complete implementations for these position management commands:

1. `/add-position [symbol]`: Add a new trading position to tracking system
2. `/list-positions`: Show all current positions with status
3. `/update-position [symbol]`: Update an existing position with new information
4. `/close-position [symbol]`: Close a position and record the outcome

The implementations should follow this structure:
- Front matter with metadata
- Clear purpose statement
- Input/output schemas
- Processing logic
- Template formats
- Example usage

## Position Data Structure

Each position should have this structure:
```json
{
  "id": "string", // unique identifier
  "symbol": "string", // ticker symbol
  "direction": "long/short", // trade direction
  "entry": {
    "price": "number", // entry price
    "time": "timestamp", // entry time
    "condition": "string" // entry context
  },
  "current": {
    "price": "number", // current price
    "pnl": "number", // current P&L
    "pnlPercent": "number" // percentage gain/loss
  },
  "risk": {
    "stop": "number", // stop loss level
    "initialRisk": "number", // initial risk amount
    "riskPercent": "number" // risk as percentage
  },
  "targets": [
    {"price": "number", "percentage": "number", "status": "pending/hit/missed"}
  ],
  "size": {
    "initial": "number", // initial position size
    "current": "number", // current position size
    "unit": "shares/contracts" // position unit
  },
  "status": "active/closed/pending", // position status
  "setup": "string", // setup type
  "notes": "string" // additional notes
}
```

## Command: /add-position

Create a command to add a new position with these parameters:
- `symbol` (required): Stock/instrument symbol
- `direction` (required): "long" or "short"
- `entry` (required): Entry price
- `size` (required): Position size
- `stop` (required): Initial stop loss
- `targets` (required): Profit targets (comma-separated)
- `setup` (optional): Setup type
- `notes` (optional): Trade reasoning

## Command: /list-positions

Create a command to list all positions with these parameters:
- `status` (optional): Filter by status (active, pending, all) (default: active)
- `sort` (optional): Sort order (entry, p&l, ticker) (default: entry)
- `format` (optional): Output format (detailed, summary, visual) (default: detailed)

## Command: /update-position

Create a command to update a position with these parameters:
- `symbol` (required): Stock/instrument symbol
- `action` (required): Update action ("move-stop", "partial-exit", "adjust-target", etc.)
- `value` (required): New parameter value
- `size` (conditional): Size for partial exit (required for partial-exit)
- `notes` (optional): Update reasoning

## Command: /close-position

Create a command to close a position with these parameters:
- `symbol` (required): Stock/instrument symbol
- `exit_price` (required): Exit price
- `exit_time` (optional): Exit timestamp (default: current time)
- `reason` (optional): Exit reasoning
- `notes` (optional): Additional observations

## Sample Position Data for Testing

```json
{
  "id": "AAPL-20250515-001",
  "symbol": "AAPL",
  "direction": "long",
  "entry": {
    "price": 225.50,
    "time": "2025-05-15T10:30:00Z",
    "condition": "Breakout above resistance"
  },
  "current": {
    "price": 227.25,
    "pnl": 1.75,
    "pnlPercent": 0.78
  },
  "risk": {
    "stop": 223.80,
    "initialRisk": 1.70,
    "riskPercent": 0.75
  },
  "targets": [
    {"price": 227.50, "percentage": 75, "status": "pending"},
    {"price": 229.00, "percentage": 15, "status": "pending"},
    {"price": 232.00, "percentage": 10, "status": "pending"}
  ],
  "size": {
    "initial": 100,
    "current": 100,
    "unit": "shares"
  },
  "status": "active",
  "setup": "bull-flag",
  "notes": "Breaking out of bull flag pattern with strong volume"
}
```

## Implementation Deliverable

Please create the complete implementations as artifacts suitable for these file paths:
- `prompts/intraday/add-position.md`
- `prompts/intraday/list-positions.md`
- `prompts/intraday/update-position.md`
- `prompts/intraday/close-position.md`

Each implementation should include:
1. Proper frontmatter
2. Clear purpose statement and description
3. Input parameter definitions
4. Complete processing logic explanation
5. Output format specification
6. Example usage
7. Test vector

The implementations should be optimized for efficiently tracking and managing active positions throughout the trading day.
```

### 7. Position Sizing Implementation

```
# Position Sizing Implementation

## Context
I'm building an AI-assisted trading system called Intent Trader. The system needs to calculate appropriate position sizes based on risk parameters and setup type. I need you to implement this component.

## Implementation Requirements

Create a complete implementation for the `/size-position` command that can:
1. Calculate optimal position size based on risk parameters
2. Apply different sizing rules based on setup type
3. Factor in conviction level for size scaling
4. Enforce maximum risk limits
5. Provide alternative sizing options

The implementation should follow this structure:
- Front matter with metadata
- Clear purpose statement
- Input/output schemas
- Processing logic
- Template formats
- Example usage

## Input Parameters

The command should take these parameters:
- `symbol` (required): Stock/instrument symbol 
- `direction` (required): "long" or "short"
- `entry` (required): Planned entry price
- `stop` (required): Planned stop loss
- `setup` (optional): Setup type (affects sizing rules)
- `conviction` (optional): Conviction level (affects size scaling)
- `account_size` (optional): Total account size (default from preferences)
- `max_risk_percent` (optional): Maximum risk as percentage (default: 1%)

## Output Format

The command should produce sizing recommendations in this format:

```json
{
  "symbol": "string",
  "direction": "long/short",
  "entry": "number",
  "stop": "number",
  "riskPerShare": "number",
  "sizing": {
    "recommended": {
      "size": "number",
      "unit": "shares/contracts",
      "riskAmount": "number",
      "riskPercent": "number"
    },
    "alternatives": [
      {
        "name": "conservative",
        "size": "number",
        "riskAmount": "number",
        "riskPercent": "number"
      },
      {
        "name": "aggressive",
        "size": "number",
        "riskAmount": "number",
        "riskPercent": "number"
      }
    ]
  },
  "adjustments": {
    "convictionMultiplier": "number",
    "setupTypeMultiplier": "number",
    "riskLimitAdjustment": "boolean"
  },
  "notes": ["sizing rationale and considerations"]
}
```

## Sizing Rules

The sizing calculation should follow these rules:

1. **Basic Risk Formula**: 
   ```
   Position Size = Account Risk Amount / Risk Per Share
   ```
   
   Where:
   - Account Risk Amount = Account Size × Max Risk Percent
   - Risk Per Share = |Entry Price - Stop Loss|

2. **Conviction Multipliers**:
   - High Conviction: 1.0 (full size)
   - Medium Conviction: 0.75 (75% of full size)
   - Low Conviction: 0.5 (50% of full size)

3. **Setup Type Multipliers**:
   - High-probability setups (Failed Breakdown, etc.): 1.0
   - Medium-probability setups (Pullback, etc.): 0.8
   - Speculative setups (Day-After-Trade, etc.): 0.6

4. **Risk Limits**:
   - Maximum risk per trade: 1% of account (default)
   - Maximum position size: 5% of account value
   - Minimum position size: 100 shares or $1,000

## Sample Input for Testing

```
Symbol: AAPL
Direction: long
Entry: 225.50
Stop: 223.80
Setup: bull-flag
Conviction: high
Account Size: $100,000
Max Risk Percent: 1%
```

## Implementation Deliverable

Please create the complete implementation as an artifact suitable for the file path:
`prompts/intraday/size-position.md`

The implementation should include:
1. Proper frontmatter
2. Clear purpose statement and description
3. Input parameter definitions
4. Complete calculation logic explanation
5. Output format specification
6. Example usage
7. Test vector

The implementation should be optimized for calculating position sizes that respect risk parameters while adjusting for setup characteristics and conviction level.
```

---

## MANAGE Phase Implementation

### 8. Runner Management Implementation

```
# Runner Management Implementation

## Context
I'm building an AI-assisted trading system called Intent Trader. The system needs to manage the "runner" portion of trades (the last 10% of a position held for extended targets). I need you to implement this component.

## Implementation Requirements

Create a complete implementation for the `/manage-runner` command that can:
1. Track and manage the runner portion of a position
2. Calculate appropriate trailing stop levels
3. Adjust target extensions based on price action
4. Provide management guidance for optimal runner handling

The implementation should follow this structure:
- Front matter with metadata
- Clear purpose statement
- Input/output schemas
- Processing logic
- Template formats
- Example usage

## Input Parameters

The command should take these parameters:
- `symbol` (required): Stock/instrument symbol
- `action` (optional): Specific runner action (adjust-stop, evaluate, target) (default: evaluate)
- `value` (conditional): New parameter value (required for adjust-stop, target)
- `price` (optional): Current price (default: fetch current)
- `mode` (optional): Market mode (Mode 1/Mode 2) for dynamic management

## Output Format

The command should produce runner management guidance in this format:

```json
{
  "symbol": "string",
  "runnerStatus": {
    "originalPosition": "number",
    "currentSize": "number",
    "entryPrice": "number",
    "currentPrice": "number",
    "currentPnL": "number",
    "pnlPercent": "number"
  },
  "stopManagement": {
    "currentStop": "number",
    "recommendedStop": "number",
    "trailingMethod": "string",
    "stopAdjustmentRationale": "string"
  },
  "targetManagement": {
    "originalTarget": "number",
    "extendedTarget": "number",
    "extensionRationale": "string"
  },
  "managementGuidance": {
    "action": "hold/tighten/exit",
    "rationale": "string",
    "considerations": ["string"]
  },
  "notes": ["management considerations and context"]
}
```

## Runner Management Rules

The runner management should follow the 75/15/10 rule system:
1. First 75% of position exits at the first target
2. Next 15% exits at the second target
3. Final 10% is the "runner" held for extended targets

For trailing stops, use these guidelines:
1. In Mode 1 (trend day): Wider trailing stop at 1.5-2x ATR
2. In Mode 2 (range day): Tighter trailing stop at 1x ATR
3. After hitting secondary target: Trail behind significant swing lows/highs
4. Fixed percentage trailing: 3-4% for volatile stocks, 1-2% for stable stocks

## Sample Input for Testing

```
Symbol: AAPL
Action: evaluate
Current Price: 230.50
Original Position: 100 shares
Current Runner Size: 10 shares
Entry Price: 225.50
Current Stop: 228.00
Original Target: 232.00
Mode: Mode 1
```

## Implementation Deliverable

Please create the complete implementation as an artifact suitable for the file path:
`prompts/intraday/manage-runner.md`

The implementation should include:
1. Proper frontmatter
2. Clear purpose statement and description
3. Input parameter definitions
4. Complete processing logic explanation
5. Output format specification
6. Example usage
7. Test vector

The implementation should be optimized for effectively managing the runner portion of trades to maximize gains while protecting profits.
```

---

## REVIEW Phase Implementation

### 9. Trade Logger Implementation

```
# Trade Logger Implementation

## Context
I'm building an AI-assisted trading system called Intent Trader. The system needs to log completed trades with performance details and learning points. I need you to implement this component.

## Implementation Requirements

Create a complete implementation for the `/log-trade` command that can:
1. Create structured records of completed trades
2. Calculate performance metrics
3. Assess plan adherence
4. Identify key learnings
5. Contribute to pattern recognition

The implementation should follow this structure:
- Front matter with metadata
- Clear purpose statement
- Input/output schemas
- Processing logic
- Template formats
- Example usage

## Input Parameters

The command should take these parameters:
- `symbol` (required): Stock/instrument symbol
- `template` (optional): Log template to use (default: standard)
- `details` (optional): Additional details to include
- `format` (optional): Output format (default: detailed)

## Output Format

The command should produce a trade log entry in this format:

```json
{
  "tradeId": "string",
  "date": "date",
  "symbol": "string",
  "direction": "long/short",
  "entry": {
    "price": "number",
    "time": "timestamp",
    "condition": "string"
  },
  "exit": {
    "price": "number",
    "time": "timestamp",
    "reason": "string"
  },
  "performance": {
    "pnl": "number",
    "pnlPercent": "number",
    "rMultiple": "number",
    "holdTime": "duration"
  },
  "setup": {
    "type": "string",
    "conviction": "string",
    "quality": "string"
  },
  "planAdherence": {
    "entryAdherence": "string",
    "exitAdherence": "string",
    "sizeAdherence": "string",
    "overallAdherence": "score/10"
  },
  "execution": {
    "entryQuality": "string",
    "exitQuality": "string",
    "managementQuality": "string",
    "overallExecution": "score/10"
  },
  "learnings": [
    {
      "category": "string",
      "observation": "string",
      "actionItem": "string"
    }
  ],
  "context": {
    "marketConditions": "string",
    "sectorPerformance": "string",
    "relativeStrength": "string"
  },
  "notes": "string"
}
```

## Trade Log Template

The logged trade should be formatted as:

```markdown
# Trade Log: [SYMBOL] [DIRECTION] - [DATE]

## Trade Details
- **Symbol**: [symbol]
- **Direction**: [long/short]
- **Setup**: [setup type]
- **Conviction**: [conviction level]

## Entry & Exit
- **Entry**: [price] at [time] - [condition]
- **Exit**: [price] at [time] - [reason]
- **Hold Time**: [duration]

## Performance
- **P&L**: [amount] ([percent]%)
- **R-Multiple**: [value]R

## Plan Adherence
- **Entry Adherence**: [assessment]
- **Exit Adherence**: [assessment]
- **Size Adherence**: [assessment]
- **Overall Adherence**: [score]/10

## Execution Quality
- **Entry Quality**: [assessment]
- **Exit Quality**: [assessment]
- **Management Quality**: [assessment]
- **Overall Execution**: [score]/10

## Key Learnings
1. [learning point 1]
2. [learning point 2]
3. [learning point 3]

## Context
- **Market Conditions**: [description]
- **Sector Performance**: [description]
- **Relative Strength**: [description]

## Notes
[additional notes]
```

## Sample Input for Testing

```
Symbol: AAPL
Direction: long
Entry Price: 225.50
Entry Time: 2025-05-15T10:30:00Z
Entry Condition: Breakout above resistance
Exit Price: 230.25
Exit Time: 2025-05-15T14:45:00Z
Exit Reason: Target reached
Initial Stop: 223.80
Setup Type: bull-flag
Conviction: high
Plan Entry: 225.00-226.00
Plan Exit: 230.00
Plan Size: 100 shares
Actual Size: 100 shares
Market Conditions: Bullish trend day
Notes: Strong volume on breakout, managed well
```

## Implementation Deliverable

Please create the complete implementation as an artifact suitable for the file path:
`prompts/postmarket/log-trade.md`

The implementation should include:
1. Proper frontmatter
2. Clear purpose statement and description
3. Input parameter definitions
4. Complete processing logic explanation
5. Output format specification
6. Example usage
7. Test vector

The implementation should be optimized for comprehensive trade logging with meaningful performance metrics and learning points.
```

### 10. Session Debrief Implementation

```
# Session Debrief Implementation

## Context
I'm building an AI-assisted trading system called Intent Trader. The system needs to provide end-of-day trading session analysis and performance review. I need you to implement this component.

## Implementation Requirements

Create a complete implementation for the `/run-debrief` command that can:
1. Generate a comprehensive end-of-day trading session analysis
2. Evaluate plan execution and decision quality
3. Calculate session performance metrics
4. Identify patterns and learning opportunities
5. Provide preparation guidance for the next trading day

The implementation should follow this structure:
- Front matter with metadata
- Clear purpose statement
- Input/output schemas
- Processing logic
- Template formats
- Example usage

## Input Parameters

The command should take these parameters:
- `focus` (optional): Specific areas to emphasize (default: all)
- `date` (optional): Session date (default: today)
- `format` (optional): Output format (default: detailed)

## Output Format

The command should produce a session debrief in this format:

```markdown
# Trading Session Debrief - [DATE]

## Session Summary
- **Overall Performance**: [P&L summary]
- **Trades Executed**: [count] trades ([wins] wins, [losses] losses)
- **Win Rate**: [percentage]%
- **Average R**: [value]
- **Largest Win**: [amount] ([symbol])
- **Largest Loss**: [amount] ([symbol])

## Plan Execution
- **Plan Adherence**: [score]/10
- **Setup Quality**: [assessment]
- **Decision Quality**: [assessment]
- **Management Quality**: [assessment]
- **Areas of Strength**: [areas]
- **Areas for Improvement**: [areas]

## Market Analysis
- **Market Conditions**: [description]
- **Key Levels Tested**: [levels]
- **Analyst Alignment**: [how trades aligned with analyst recommendations]
- **Mode Assessment**: [Mode 1/2 accuracy]

## Pattern Recognition
- **Execution Patterns**: [patterns identified]
- **Time-of-Day Patterns**: [time-based patterns]
- **Setup Performance**: [which setups worked best]
- **Psychological Patterns**: [behavioral observations]

## Key Learnings
1. [learning point 1]
2. [learning point 2]
3. [learning point 3]

## Next Day Preparation
- **Focus Areas**: [what to focus on]
- **Adjustment Recommendations**: [changes to make]
- **Potential Opportunities**: [setups to watch]
- **Risk Management Considerations**: [risk guidance]

## Notes
[additional notes]
```

## Sample Input for Testing

```
Date: 2025-05-15
Trades: [
  {
    "symbol": "AAPL",
    "direction": "long",
    "entry": {"price": 225.50, "time": "2025-05-15T10:30:00Z"},
    "exit": {"price": 230.25, "time": "2025-05-15T14:45:00Z"},
    "performance": {"pnl": 4.75, "pnlPercent": 2.11, "rMultiple": 2.8},
    "setup": {"type": "bull-flag", "conviction": "high"}
  },
  {
    "symbol": "MSFT",
    "direction": "long",
    "entry": {"price": 410.75, "time": "2025-05-15T11:15:00Z"},
    "exit": {"price": 408.50, "time": "2025-05-15T13:30:00Z"},
    "performance": {"pnl": -2.25, "pnlPercent": -0.55, "rMultiple": -0.9},
    "setup": {"type": "pullback", "conviction": "medium"}
  }
]
Plan Adherence: 8/10
Market Conditions: Bullish trend day, Mode 1
Key Levels: ES 5900 support held, 5926 resistance broken
Psychological Notes: Managed winners well, cut loss quickly on MSFT
```

## Implementation Deliverable

Please create the complete implementation as an artifact suitable for the file path:
`prompts/postmarket/run-debrief.md`

The implementation should include:
1. Proper frontmatter
2. Clear purpose statement and description
3. Input parameter definitions
4. Complete processing logic explanation
5. Output format specification
6. Example usage
7. Test vector

The implementation should be optimized for comprehensive session analysis with meaningful insights and actionable recommendations for improvement.
```

---

## Usage Instructions

To use these prompt templates:

1. **Identify the component to implement** from the `plan-for-today.md` file
2. **Copy the corresponding prompt** from this document
3. **Paste it into a new conversation** with Claude or another AI assistant
4. **Generate the implementation** as an artifact
5. **Save the artifact** to the appropriate file path
6. **Update `plan-for-today.md`** to mark the component as complete

Each prompt is self-contained with all the context, requirements, and test data needed to implement that component.
