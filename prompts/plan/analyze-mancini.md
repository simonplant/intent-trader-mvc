---
id: analyze-mancini
title: Mancini Newsletter Analyzer
description: Analyzes Mancini newsletters to extract actionable trading strategies
author: Intent Trader Team
version: 0.4.0
release: 0.5.1
created: 2025-05-15
updated: 2025-05-19
category: plan
status: active
tags: [plan, mancini, es-futures, levels, failed-breakdown, mode]
requires: [prompts/plan/summarize-mancini-newsletter.md]
outputs: [manciniAnalysis]
input_format: json
output_format: json
ai_enabled: true
---

# Mancini Newsletter Analyzer

This component analyzes the summarized data from Adam Mancini's ES Futures newsletter to produce actionable trading strategies and level frameworks for the Intent Trader system.

## Purpose

The Mancini Newsletter Analyzer serves as the core analysis engine for Mancini's ES Futures insights within the Intent Trader workflow. It systematically processes:

1. **Market Mode Assessment**: Understanding if we're in Mode 1 (trending) or Mode 2 (range/trap)
2. **Level Framework Analysis**: Evaluating support/resistance significance and hierarchies
3. **Failed Breakdown Opportunities**: Identifying specific setups with entry conditions and targets
4. **Scenario Planning**: Analyzing bull/bear cases and their probability
5. **Runner Management**: Providing position management recommendations
6. **Trading Strategy**: Developing an actionable plan based on current market conditions

This component translates Mancini's analysis into a structured trading approach integrated with the Intent Trader system.

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

## Output Format

The component produces a comprehensive analysis optimized for integration with the `/create-plan` command:

```json
{
  "date": "2025-05-19",
  "source": "mancini",
  "mode": "Mode 1/Mode 2",
  "bias": "bullish/bearish/neutral",
  "modeConfidence": 85,
  "character": "Consolidation in bull flag pattern",
  "levels": {
    "support": [5860, 5880, 5905],
    "resistance": [5945, 5970, 6000],
    "keyDecisionPoint": 5905
  },
  "traps": {
    "failed_breakdowns": [5860],
    "fakeouts": ["above 5970"]
  },
  "scenarios": [
    {
      "type": "long",
      "conviction": "high/medium/low",
      "trigger": "reclaim 5905",
      "targets": [5945, 5970],
      "stop": 5890,
      "risk_reward": 2.75,
      "probability": 65
    },
    {
      "type": "short",
      "conviction": "high/medium/low",
      "trigger": "fail below 5880",
      "targets": [5860, 5840],
      "stop": 5895,
      "risk_reward": 2.33,
      "probability": 55
    }
  ],
  "runner_trim_targets": [5970, 6000],
  "comments": "Bullish regime intact if 5905 reclaimed. Failed breakdowns below 5880 may be playable.",
  "catalysts": ["FOMC minutes tomorrow", "Option expiration Friday"],
  "tradeIdeas": {
    "primary": [
      {
        "setup": "Failed Breakdown",
        "ticker": "ES",
        "direction": "long",
        "entry": "Above 5880 after failure",
        "target": 5945,
        "stop": 5865,
        "conviction": "high",
        "notes": "Multiple tests of support with strong rejection"
      }
    ],
    "secondary": [
      {
        "setup": "Range Fade",
        "ticker": "ES",
        "direction": "short",
        "entry": "Rejection at 5970",
        "target": 5905,
        "stop": 5985,
        "conviction": "medium",
        "notes": "Prior resistance zone with volume"
      }
    ]
  },
  "riskManagement": {
    "positionSizing": "Risk 0.5% per trade for primary setups",
    "stopPlacement": "Place stops 15 points below key support for longs",
    "trailStrategy": "Trail to breakeven after 50% of target reached"
  },
  "detailed_assessment": {
    "market_structure": {
      "key_characteristic": "string",
      "volatility_expectation": "high/medium/low",
      "context_notes": "string"
    },
    "level_framework": {
      "key_decision_point": 5905,
      "support_zones": [
        {
          "min": 5860,
          "max": 5880,
          "type": "major/minor",
          "context": "string"
        }
      ],
      "resistance_zones": [
        {
          "min": 5945,
          "max": 5970,
          "type": "major/minor",
          "context": "string"
        }
      ]
    },
    "failed_breakdown_setups": [
      {
        "level": 5860,
        "direction": "long/short",
        "condition": "string",
        "target": 5905,
        "stop": 5845,
        "probability": "high/medium/low",
        "notes": "string"
      }
    ],
    "scenario_probabilities": {
      "bull_case": 60,
      "bear_case": 40
    },
    "runner_management": {
      "current_runners": [
        {
          "entry": 5880,
          "current_stop": 5860,
          "target": 5945
        }
      ],
      "trail_strategy": "string"
    },
    "trading_approach": {
      "primary_setup": "string",
      "risk_parameters": {
        "stop_placement": "string",
        "key_risks": ["string"]
      }
    }
  }
}
```

## Processing Logic

The analyzer processes the summarized newsletter data in several stages:

### 1. Market Mode Analysis

Evaluates the market mode (Mode 1/2) and directional bias:
- Mode 1: Trending market with directional momentum
- Mode 2: Range-bound or trap-prone market
- Determines if the bias is bullish, bearish, or neutral based on context
- Assesses volatility expectations and key market characteristics

### 2. Level Framework Analysis

Processes the level structure to identify:
- Key decision points that separate bull/bear scenarios
- Primary support and resistance levels with significance
- Zones of interest (consolidation, decision, etc.)
- Hierarchical relationship between levels
- SPX equivalents for ES levels (approximate +/- 10x)

### 3. Failed Breakdown Identification

Analyzes Failed Breakdown setups:
- Confirms specific levels where breakdowns failed
- Determines entry conditions and triggers
- Establishes target projections and stop placements
- Assesses probability of success
- Identifies directional bias (typically long)

### 4. Scenario Planning

Develops actionable trading scenarios:
- Bull case with triggers, targets, and stops
- Bear case with triggers, targets, and stops
- Probability assessment for each scenario
- Required market conditions for scenario activation
- Key levels to monitor for scenario progression

### 5. Runner Management

Provides position management guidance:
- Current runner positions and management
- Trailing stop methodology
- Target projections for existing positions
- Trim levels for partial position reduction
- Runner addition conditions if applicable

### 6. Trading Strategy Development

Creates an integrated trading approach:
- Primary setup types to focus on
- Risk parameters and position sizing
- Key levels for entry and exit decisions
- Specific setups to monitor
- Overall strategic approach based on market mode

### 7. Result Integration

Consolidates analysis into a structured output optimized for `/create-plan` integration:
- Core framework with field names matching `create-plan` expectations
- Adds `modeConfidence` for mode classification
- Includes `character` for market character description
- Structures `tradeIdeas` into primary/secondary categories
- Adds risk management parameters
- Includes catalyst information
- Calculates risk-reward ratios and probability percentages

## Integration with `/create-plan`

The analyzer outputs are specifically structured to integrate with the `/create-plan` command:

1. **Market Framework Integration**:
   - `mode` and `bias` directly feed into the market framework section
   - `modeConfidence` provides confidence percentage for mode classification
   - `character` describes market character status
   - `catalysts` list key market events affecting trading

2. **Level Framework Integration**:
   - `levels` structure feeds directly into the level integration process
   - `keyDecisionPoint` identifies critical price thresholds
   - Level organization matches the hierarchical level structure required

3. **Trade Idea Integration**:
   - `tradeIdeas` section with `primary` and `secondary` categories
   - Each idea includes complete risk parameters, targets, and conviction levels
   - Conviction scores help with trade prioritization

4. **Scenario Planning Integration**:
   - `scenarios` provide detailed conditionals for scenario planning
   - Each includes `probability` and `risk_reward` for assessment
   - Trigger conditions define clear scenario boundaries

5. **Risk Management Integration**:
   - Stop levels for each scenario feed risk calculations
   - `riskManagement` section provides position sizing guidance
   - Trail strategies inform management protocols

This structural alignment ensures seamless data flow from Mancini analysis into the unified trade plan.

## Example Usage

To analyze a Mancini newsletter:

1. First use the summarizer to process the raw newsletter:

```
/summarize-mancini-newsletter
```

2. Then pass the summarized output to the analyzer:

```
/analyze-mancini summary='{"date":"2025-05-19","title":"ES Futures Companion","market_assessment":{"mode":"Mode 2","bias":"bullish"},"levels":{"support":[{"price":5860,"significance":"major"}],"resistance":[{"price":5945,"significance":"significant"}],"key_decision_point":5905},"failed_breakdowns":[{"level":5860,"direction":"long","target":5905}],"scenarios":{"bull_case":{"trigger":"reclaim 5905","targets":[5945,5970]},"bear_case":{"trigger":"fail below 5880","targets":[5860,5840]}},"runner_management":{"current_runners":[{"entry":5880,"current_stop":5860}]},"trading_strategy":{"approach":"play the range"},"traps":{"failed_breakdowns":[5860]}}'
```

## Implementation Notes

This component provides:
- Simplified integration with the Intent Trader system
- Clean, structured output for algorithmic trading
- Detailed assessment for human review
- Consistent format for historical analysis
- Actionable trade scenarios with precise parameters

For optimal results:
- Always use the complete output from the summarizer
- Include all available sections in the input
- The analyzer will handle missing sections gracefully
- The output is designed for both algorithmic and human consumption

---

**Note to Implementation Team:**
- This redesigned component eliminates the preprocessor dependency
- The summarizer and analyzer work as a two-step process
- Both components maintain compatibility with existing integration points
- The approach provides better scalability and maintainability
- The command interface remains consistent with the Intent Trader system
