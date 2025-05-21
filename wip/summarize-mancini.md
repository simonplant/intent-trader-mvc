---
id: summarize-mancini
title: Mancini Newsletter Summarizer
description: Extracts structured data from Mancini's newsletters to prepare for analysis
author: Intent Trader Team
version: 1.0.0
release: 0.5.2
created: 2025-05-19
updated: 2025-05-21
category: plan
status: active
tags: [plan, mancini, es-futures, preprocessing, extraction]
requires: [system/schemas/intent-trader-runtime-schema.json]
outputs: [state/mancini-summary.json]
input_format: text
output_format: json
ai_enabled: true
---

# Mancini Newsletter Summarizer

## Purpose

The Mancini Newsletter Summarizer extracts structured data from Adam Mancini's ES Futures newsletters, processing raw content into a standardized JSON format. This component serves as the first step in the Intent Trader workflow for Mancini analysis, preparing data for subsequent processing by the `/analyze-mancini` command.

## Usage

```
/summarize-mancini-newsletter content='[newsletter content]'
```

Pass the raw newsletter content to this command for extraction and summarization.

## Processing Logic

This component performs the following operations:

1. **Content Extraction**: Isolates key information from the newsletter
2. **Structural Analysis**: Identifies market assessment, levels, and setups
3. **Data Standardization**: Converts to a consistent format
4. **Schema Preparation**: Organizes data for later schema conversion
5. **Noise Reduction**: Removes boilerplate and repetitive content

## Output Format

The component produces JSON output following this structure:

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
    "support": [
      {"price": 5860, "significance": "major"},
      {"price": 5880, "significance": "moderate"}
    ],
    "resistance": [
      {"price": 5945, "significance": "major"},
      {"price": 5970, "significance": "moderate"}
    ],
    "zones": [
      {"min": 5860, "max": 5880, "type": "support"},
      {"min": 5945, "max": 5970, "type": "resistance"}
    ],
    "key_decision_point": 5905
  },
  "failed_breakdowns": [
    {
      "level": 5860,
      "direction": "long",
      "condition": "Entry above 5880 after failure",
      "target": 5945,
      "stop": 5865,
      "notes": "Multiple tests of support with strong rejection"
    }
  ],
  "scenarios": {
    "bull_case": {
      "trigger": "reclaim 5905",
      "targets": [5945, 5970],
      "stop": 5890,
      "confidence": "high",
      "probability": 65
    },
    "bear_case": {
      "trigger": "fail below 5880",
      "targets": [5860, 5840],
      "stop": 5895,
      "confidence": "medium",
      "probability": 55
    }
  },
  "runner_management": {
    "trim_targets": [5945, 5970],
    "current_runners": [
      {"entry": 5880, "current_stop": 5860, "target": 5945}
    ],
    "trail_strategy": "Trail to breakeven after 50% of target reached"
  },
  "trading_strategy": {
    "primary_setup": "Failed Breakdown",
    "risk_parameters": {
      "stop_placement": "Place stops 15 points below key support for longs",
      "position_sizing": "Risk 0.5% per trade for primary setups"
    }
  },
  "traps": {
    "failed_breakdowns": [5860]
  },
  "catalysts": ["FOMC minutes tomorrow", "Option expiration Friday"],
  "raw_sections": {
    "market_structure": "string",
    "levels": "string",
    "setups": "string",
    "scenarios": "string"
  }
}
```

## Extraction Guidelines

### Key Elements to Extract

1. **Current Market Regime & Structure** (5-10% of summary)
   * Current directional bias (bullish/bearish/neutral) with specific supporting evidence
   * Key pattern formations with exact price boundaries (flags, channels, consolidations)
   * Recent structural developments that changed market character (breakouts, failures)
   * Institutional behavior indicators (accumulation zones, distribution patterns)
   * Context of current move within larger timeframe perspective

2. **Recent Price Action Analysis** (5-10% of summary)
   * Significant price movements since previous newsletter with exact levels
   * Critical tests of support/resistance with outcomes and implications
   * Multiple tests of key levels showing strengthening/weakening
   * Volume patterns or institutional footprints at key decision points
   * Failed moves that produced significant reversals

3. **Recent Trading Setups & Activity** (25-30% of summary)
   * Actual setups that triggered with precise entry zones, management decisions, and results
   * Failed Breakdowns with exact flush levels, recovery points, and subsequent movement
   * Author's executed trades with entry prices, exit timing, position sizing and outcomes
   * Multi-tested levels showing institutional accumulation patterns
   * Profit-taking levels and percentages implemented for each discussed trade

4. **Next Session Trading Plan** (45-50% of summary)
   * 3-5 most critical levels to monitor with exact prices and significance
   * Primary support/resistance zones with distinction between major/minor
   * Specific setup conditions being monitored with precise trigger points
   * Bull case scenario with entry conditions and level-to-level targets
   * Bear case scenario with breakdown levels and target zones
   * Special conditions affecting the next session (OPEX, economic reports)
   * Current positions being carried and their management plan

5. **Notable Trading Examples or Education** (0-5% of summary)
   * Only include if the newsletter contains unique examples not covered previously
   * Practical applications of core strategies with measurable outcomes
   * New variations of setups with distinguishing characteristics

### Content to Exclude

* Methodology explanations that repeat in every issue
* Standard housekeeping notices
* Generic trading philosophy statements
* Extensive lists of minor support/resistance levels
* Boilerplate setup explanations
* Generic warnings about prediction vs. reaction
* Standard trade management reminders

## Implementation Details

### Mancini Method Extraction Focus

The summarizer should focus on extracting information related to:

1. **Market Mode Assessment**
   * Mode 1 (trending) vs. Mode 2 (range/trap) classification
   * Directional bias (bullish, bearish, neutral)
   * Key market characteristics and context

2. **Level Framework**
   * Primary support and resistance levels
   * Key decision points separating bull/bear cases
   * Zones of interest (consolidation, decision, etc.)
   * Structural significance of levels

3. **Failed Breakdown Setups**
   * Level where breakdown occurred
   * Recovery points and entry conditions
   * Target projections
   * Stop placement
   * Notes on setup quality or significance

4. **Trading Scenarios**
   * Bull case with triggers, targets, and stops
   * Bear case with triggers, targets, and stops
   * Probability assessment
   * Conviction level for each scenario

5. **Runner Management**
   * Current runner positions
   * Trailing stop methodology
   * Trim targets

## Integration Notes

The summarized output serves as input to the `/analyze-mancini` command, which transforms this data into schema-compliant objects. This two-step approach:

1. Separates extraction concerns from schema implementation
2. Allows for flexible handling of newsletter format variations
3. Provides a clean boundary between raw content and structured data
4. Creates an intermediate format for diagnostic purposes

For optimal results:
- Extract exact prices whenever possible
- Capture complete contextual information for setups
- Include all relevant market structure details
- Preserve directional language for sentiment analysis

## Example Usage

```
/summarize-mancini-newsletter content='[paste full newsletter content here]'
```

After running the summarizer, the output can be passed to the analyzer:

```
/analyze-mancini summary='[output from summarizer]'
```

The analyzer will then convert this intermediate format into schema-compliant objects for use in the Intent Trader system.