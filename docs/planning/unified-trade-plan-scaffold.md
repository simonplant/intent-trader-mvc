# Unified Trade Plan Generator Implementation

## Context
I'm building an AI-assisted trading system called Intent Trader. The system needs to generate a comprehensive trade plan that integrates insights from multiple analyst sources (primarily DP and Mancini) into a single, actionable strategy document. This Unified Trade Plan represents the trader's synthesized view and prioritized approach to the trading session.

## Implementation Requirements

Create a complete implementation for the `/create-plan` command that can:
1. Generate a unified trade plan from processed analyst inputs (DP and Mancini)
2. Integrate level frameworks with consensus strength scoring
3. Prioritize trade ideas based on conviction and confirmation
4. Incorporate market mode/character analysis for strategic context
5. Develop conditional scenario branches with triggers and responses
6. Create a risk allocation framework aligned with setup types
7. Generate an execution sequence with management protocols
8. Produce a comprehensive, well-formatted plan document

The implementation should follow this structure:
- Front matter with metadata
- Clear purpose statement
- Input/output schemas
- Integration methodology for DP and Mancini inputs
- Level integration algorithm
- Setup prioritization system
- Scenario generation logic
- Risk allocation framework
- Position management protocol
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

## Market Framework
- **Overall Bias**: [direction and context]
- **Mode Classification**: [Mode 1/Mode 2 with confidence]
- **Character Status**: [consolidation/trending/etc]
- **Key Catalysts**: [important events/data]
- **Sector Landscape**: [strong/weak sectors]

---

## Level Framework

### ES Futures
**Support Levels:**
| Level | Type     | Consensus | Notes                                    |
|-------|----------|-----------|------------------------------------------|
| 0000  | Major    | High      | [significance, source attribution]       |
| 0000  | Minor    | Medium    | [context, recent activity]               |

**Resistance Levels:**
| Level | Type     | Consensus | Notes                                    |
|-------|----------|-----------|------------------------------------------|
| 0000  | Major    | High      | [significance, source attribution]       |
| 0000  | Minor    | Medium    | [context, recent activity]               |

**Moving Averages:**
- 8-day MA: ~0000 (relationship to price)
- 21-day MA: ~0000 (relationship to price)
- 50-day MA: ~0000 (relationship to price)

[Similar sections for SPX and other key indices]

---

## Priority Trade Ideas (Sorted by Conviction)

### Primary Opportunities

#### 1. [TICKER] [DIRECTION] - [SETUP TYPE] (High Conviction)
- **Entry Parameters**: [zone and conditions]
- **Stop Placement**: [level and rationale]
- **Targets**: 
  - T1 (75%): [price level]
  - T2 (15%): [price level]
  - T3 (10%): [price level]
- **Risk Allocation**: [position size guidance]
- **Management Protocol**: [including 75/15/10 rule]
- **Technical Context**: [MA relationships, character state]
- **Source Attribution**: [DP/Mancini/Consensus]

[2-3 more primary opportunities]

### Secondary Opportunities
[2-4 secondary opportunities with less detail]

### Watchlist
[Brief list of tickers to monitor with conditions]

---

## Scenario Planning

### Primary Scenario (X% probability)
- **Description**: [expected market behavior]
- **Trigger Conditions**: [specific conditions that confirm this scenario]
- **Expected Outcome**: [projections and targets]
- **Strategic Response**: [how to trade this scenario]

### Bear Case (Y% probability)
[Similar structure to Primary Scenario]

### Bull Case (Z% probability)
[Similar structure to Primary Scenario]

---

## Execution Framework

### Prioritized Sequence
1. [First priority action]
2. [Second priority action]
3. [Third priority action]

### Risk Management
- **Daily Risk Budget**: [maximum risk exposure]
- **Correlated Risk Rules**: [handling similar positions]
- **Mode-Based Adjustments**: [risk modifications based on mode]

### Position Management
- **Entry Confirmation**: [required criteria]
- **Stop Management**: [protocols for adjusting stops]
- **Profit Taking**: [standardized 75/15/10 approach]
- **Runner Management**: [handling the final 10%]

---

## Preparation Checklist
- [Key preparation items]
- [Pre-market tasks]
- [System readiness checks]
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
1. Proper frontmatter with metadata
2. Clear purpose statement and description
3. Input parameter definitions
4. Complete processing logic that addresses:
   - Level integration with consensus strength calculation
   - Conviction classification and prioritization
   - Mode and character integration
   - Scenario generation with conditional logic
   - Risk allocation framework aligned with conviction
   - Execution sequence generation
5. Output format specification with detailed template
6. Example usage demonstrations
7. Test vector with sample processing

The implementation should be optimized for:
1. Effectively integrating the unique strengths of both DP and Mancini methodologies
2. Creating a clear, hierarchical level structure with consensus scoring
3. Prioritizing opportunities based on both conviction and technical validation
4. Developing a cohesive strategy with conditional scenarios
5. Establishing consistent position management protocols (75/15/10 rule)
6. Producing a highly actionable trading plan that serves as the central framework for the trading day
