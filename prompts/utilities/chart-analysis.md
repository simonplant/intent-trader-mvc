---
id: analyze-chart
title: Chart Analysis Tool
description: Analyzes chart images for patterns and trading opportunities
author: Intent Trader Team
version: 0.3.1
release: 0.5.1
created: 2025-05-15
updated: 2025-05-16
category: utilities
status: stable
tags: [analysis, chart, patterns, technical-analysis, utilities]
requires: [system/technical-framework/pattern-recognition.md, system/technical-framework/level-significance.md, system/technical-framework/mancini-integration.md, system/chart-visual-legend.md]
outputs: [chartAnalysis]
input_format: image
output_format: json
ai_enabled: true
---

# Chart Analysis Command

This command analyzes chart images to identify key patterns, levels, and trading opportunities across different timeframes. It can be used during any trading phase for setup validation, execution decisions, or post-trade review.

## Command Syntax

```
/analyze-chart [image] symbol=SYMBOL timeframe=TIMEFRAME focus=FOCUS context="CONTEXT" format=FORMAT
```

## Parameters

- `image` (required): Chart image to analyze
- `symbol` (optional): Ticker symbol for additional context
- `timeframe` (optional): Chart timeframe (e.g., "1m", "5m", "daily") (default: auto-detect)
- `focus` (optional): Analysis focus (e.g., "support-resistance", "patterns", "entries", "review") (default: comprehensive)
- `context` (optional): Additional market context information
- `format` (optional): Output format (default: structured)

## Parameter Handling

```javascript
// Process input parameters
function processParameters(params) {
  const defaults = {
    timeframe: "auto-detect",
    focus: "comprehensive",
    format: "structured"
  };

  // Merge defaults with provided parameters
  return {...defaults, ...params};
}
```

## RSI Analysis

A key component of analysis following DP's methodology is RSI assessment, with emphasis on ticker-specific historical ranges rather than standard 30/70 thresholds:

### Ticker-Specific RSI Ranges

RSI must be evaluated within the context of each ticker's specific behavior patterns:

| Condition | Interpretation | Trade Implication |
|-----------|----------------|-------------------|
| **Below ticker's historical low RSI** | Extremely oversold for this specific instrument | Strong bullish reversal potential |
| **Above ticker's historical high RSI** | Extremely overbought for this specific instrument | Strong bearish reversal potential |
| **RSI at midpoint of ticker's range** | Neutral momentum | No strong edge from RSI alone |

### RSI Applications in DP's Method

- **Ticker-Specific Threshold Identification**: Analyze the specific ticker's historical RSI ranges to establish appropriate oversold/overbought levels
- **Multi-Timeframe Confirmation**: RSI signals strongest when aligned across multiple timeframes
- **RSI Divergence**: Price making new highs/lows while RSI fails to confirm often signals reversal
- **RSI as Confirmation**: Use as secondary confirmation for other technical signals, not standalone
- **Range-Bound vs. Trending**: RSI behavior differs in trending vs. range-bound environments
- **Sector Comparison**: Compare ticker's RSI to sector peers for relative strength/weakness

### Examples from DP's Commentary

- "AAPL at 28 RSI is extreme for this name - historically bottoms around 30"
- "TSLA RSI hitting 85 - this has been a sell signal 9 of last 10 times"
- "SPY with positive RSI divergence on this pullback to support"
- "NVDA still under 50 RSI even with the rally - shows potential for further upside"

This ticker-specific approach to RSI is essential for accurate analysis and should be integrated with other technical signals.

## Momentum Assessment: 21 SMA Traffic Light System

A key component of the analysis is the custom 21 SMA "traffic light" system, inspired by Scott Redler's momentum principles. This system provides an immediate visual reference for market momentum and trade entry timing:

### Traffic Light States

| Color | Condition | Momentum Interpretation | Trade Bias |
|-------|-----------|-------------------------|------------|
| **Green** | Price > 8 SMA AND Price > 21 SMA | Strong bullish momentum | Long bias, look for pullbacks to 8 SMA for entries |
| **Yellow** | Price between 8 SMA and 21 SMA | Transitional/neutral momentum | Reduced position size, cautious entries |
| **Red** | Price < 8 SMA AND Price < 21 SMA | Strong bearish momentum | Short bias, look for bounces to 8 SMA for entries |

### Application in Trading

- **Green Light**: Aggressive long entries on pullbacks to 8 SMA, wider stops acceptable
- **Yellow Light**: Reduced size, tighter stops, preference for quick trades
- **Red Light**: Aggressive short entries on bounces to 8 SMA, wider stops acceptable

### Transitional States

- **Green to Yellow**: Early warning of momentum slowdown, consider taking partial profits
- **Yellow to Red**: Confirmation of momentum shift, consider establishing short positions
- **Red to Yellow**: Early indication of bearish momentum easing, prepare for possible long setup
- **Yellow to Green**: Confirmation of bullish momentum, look for long entries

This traffic light system is a primary filter for all trade decisions and carries significant weight in the analysis.

## Key Price Reference Points

### Yesterday's High (yH) and Yesterday's Low (yL)

Yesterday's high and low levels are critical reference points used extensively by Inner Circle and DP to define price strength and market direction:

| Reference | Significance | Trade Interpretation |
|-----------|--------------|----------------------|
| **Above yH** | Bullish price strength | Confirms upward momentum, potential for continuation |
| **Below yL** | Bearish price weakness | Confirms downward momentum, potential for continuation |
| **Between yH/yL** | Range-bound or indecision | Look for breakout/breakdown from range |
| **Failed yH Break** | Bearish reversal signal | Potential short opportunity on rejection |
| **Failed yL Break** | Bullish reversal signal | Potential long opportunity on rejection |

### Application in Trading

- **Opening above yH**: Bullish bias, look for pullbacks to prior resistance turned support
- **Opening below yL**: Bearish bias, look for bounces to prior support turned resistance
- **Trading inside yH/yL range**: Reduced position size, range trading approach
- **Breaking yH after 2pm**: "2pm Rule" - often significant for next day continuation
- **Breaking yL after 2pm**: "2pm Rule" - often significant for next day continuation

### Pivot Points

Pivot points function as price magnets, providing both attraction and rejection zones:

| Pivot | Significance | Behavior |
|-------|--------------|----------|
| **PP (Pivot Point)** | Primary reference | Central inflection point, price magnet |
| **S1, S2, S3** | Support levels | Increasingly stronger support zones |
| **R1, R2, R3** | Resistance levels | Increasingly stronger resistance zones |

### Pivot Point Reactions

- **Rejection at pivot**: Often creates reversal opportunity
- **Break and retest**: Failed retest of pivot after break often significant continuation signal
- **Overextension**: Move beyond S3 or R3 often indicates exhaustion
- **Clustering**: Multiple pivots in close proximity create higher significance zones
- **Time at pivot**: Extended time spent at pivot point increases probability of breakout/breakdown

These price reference points are essential components of the analysis and trade decision process.

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

## Analysis Logic

The analysis process follows these steps:

1. **Image Processing**:
   - Extract chart data from image
   - Identify timeframe if not specified
   - Detect price and volume patterns
   - Recognize moving averages and indicators using visual legend
   - Identify yH, yL, and pivot points on chart
   - Extract RSI values if present

2. **RSI Assessment**:
   - Identify current RSI value
   - Determine ticker-specific historical RSI ranges
   - Evaluate oversold/overbought conditions relative to ticker's history
   - Detect potential RSI divergences with price action
   - Compare RSI across multiple timeframes if available
   - Assess RSI trend direction

3. **Price Reference Analysis**:
   - Determine price position relative to yH and yL
   - Identify pivot point interactions (attraction/rejection)
   - Assess opening behavior relative to yH/yL
   - Evaluate failed breaks of yH/yL
   - Determine pivot point clusters and key reaction zones

4. **Momentum Assessment**:
   - Determine 21 SMA traffic light status (Green/Yellow/Red)
   - Evaluate recent transitions between states
   - Identify momentum alignment with longer-term trend
   - Assess trade timing based on traffic light state
   - Cross-reference momentum with yH/yL position
   - Confirm with RSI readings

5. **Pattern Recognition**:
   - Match pattern structures from `pattern-recognition.md`
   - Identify key formations (support/resistance, trends, reversals)
   - Calculate reliability scores for identified patterns
   - Analyze MA alignment patterns:
     - Stacked Bullish: 8 > 21 > 34 > 50 > 100 > 200 (Strong uptrend)
     - Stacked Bearish: 8 < 21 < 34 < 50 < 100 < 200 (Strong downtrend)
     - Bull Cross: Faster MA crosses above slower MA
     - Bear Cross: Faster MA crosses below slower MA
     - Death Cross: 50 SMA crosses below 200 SMA
     - Golden Cross: 50 SMA crosses above 200 SMA

6. **Level Analysis**:
   - Rank levels using `level-significance.md` and level hierarchy
   - Identify major and minor support/resistance zones
   - Determine level clusters and interaction points
   - Analyze VWAP relationships:
     - Price > VWAP: Bullish intraday bias
     - Price < VWAP: Bearish intraday bias
     - Price = VWAP: Fair value reversion point
     - AVWAP Test: Key historical reference test
     - VWAP + AVWAP intersections: Potential reclaim/flush triggers

7. **Context Integration**:
   - Incorporate symbol-specific information if provided
   - Apply market context if provided
   - Overlay Mancini annotations and reactions if available
   - Consider price-MA relationships:
     - Price > All MAs: Strong bullish momentum
     - Price < All MAs: Strong bearish momentum
     - Price between MAs: Transitional or consolidation phase
     - MA Compression: Directional uncertainty, pending resolution
     - MA Expansion: Trending environment, clear direction

8. **Focus-Specific Analysis**:
   - Support-Resistance: Emphasize key levels and clusters
   - Patterns: Prioritize pattern identification and validation
   - Entries: Focus on optimal entry points and execution strategy, with emphasis on traffic light status, yH/yL position, and RSI extremes
   - Review: Analyze potential improvements and alternatives

## Focus Types

### Support-Resistance Focus

Emphasizes identification and ranking of key price levels:
- Major and minor support/resistance levels
- Level clusters and interaction zones
- Historical significance and reaction strength
- Level hierarchy and classification
- Interaction of levels with traffic light status
- Pivot point attraction/rejection zones
- yH/yL break and retest patterns
- RSI extreme levels as potential reversal zones

### Patterns Focus

Emphasizes detection and validation of chart patterns:
- Classic chart patterns (flags, triangles, head & shoulders)
- Candlestick patterns (engulfing, doji, hammers)
- Momentum patterns (divergences, overbought/oversold)
- Pattern completion percentages and reliability scores
- MA alignment patterns and crossovers
- Pattern reliability in context of current traffic light state
- yH/yL break patterns and pivot point reactions
- RSI divergence patterns

### Entries Focus

Emphasizes optimal trade entry strategy:
- Entry trigger identification based on traffic light status, yH/yL position, and RSI readings
- Stop placement recommendations
- Risk/reward calculation
- Position sizing suggestions
- Setup alignment with existing trade plan
- VWAP and MA relationships for entry timing
- Scale-in/scale-out strategies based on momentum transitions
- Pivot point reactions as entry triggers
- 2pm rule application for yH/yL breaks
- RSI reversal signals at ticker-specific extremes

### Review Focus

Emphasizes post-trade analysis for learning:
- Optimal entry and exit points
- Missed opportunities analysis
- Pattern validation accuracy
- Alternative scenario analysis
- Learning opportunities and improvements
- MA and VWAP relationship significance
- Effectiveness of traffic light system in guiding trade decisions
- yH/yL and pivot point signal analysis
- RSI signal effectiveness assessment

## Output Format

```json
{
  "analysis": {
    "symbol": "SPY",
    "timeframe": "5m",
    "focus": "patterns",
    "analysisDate": "2025-05-16T14:30:00Z"
  },
  "rsiAssessment": {
    "currentValue": 32,
    "tickerSpecificRange": {
      "historical": {"low": 28, "high": 72},
      "interpretation": "Approaching oversold for this ticker",
      "extremeStatus": "Near oversold (normal range: 28-72)"
    },
    "divergence": {
      "detected": true,
      "type": "Positive (price making lower lows, RSI making higher lows)",
      "significance": "Moderate - needs confirmation"
    },
    "multitimeframe": {
      "status": "Oversold on 5m and 15m, neutral on hourly",
      "alignment": "Mixed - short-term oversold, longer-term neutral"
    }
  },
  "priceReferencePoints": {
    "yesterdaysHigh": 452.75,
    "yesterdaysLow": 448.50,
    "currentPosition": "Below yL (bearish)",
    "openingBehavior": "Opened inside range, broke below yL at 10:15am",
    "pivotPoints": {
      "pp": 450.60,
      "r1": 453.25,
      "r2": 455.80,
      "r3": 458.40,
      "s1": 448.10,
      "s2": 445.50,
      "s3": 443.00
    },
    "keyPivotReactions": "Rejection at PP (450.60) at 11:30am created bearish momentum"
  },
  "momentumAssessment": {
    "trafficLightStatus": "Red",
    "interpretation": "Bearish momentum - price below both 8 and 21 SMAs",
    "recentTransition": "Yellow to Red (4 bars ago)",
    "tradeBias": "Short bias, look for bounces to 8 SMA for entries",
    "conviction": "High - traffic light aligned with price action and volume"
  },
  "patterns": [
    {
      "type": "Failed Breakout",
      "direction": "bearish",
      "reliability": 8,
      "trigger": "Break above 451.25 rejected on volume spike",
      "confirmation": "Close below previous resistance at 450.75",
      "momentumAlignment": "Aligned with Red traffic light (bearish)"
    }
  ],
  "keyLevels": [
    {"price": 450.00, "type": "support", "significance": 8},
    {"price": 451.75, "type": "resistance", "significance": 9}
  ],
  "maRelationships": {
    "alignment": "Mixed - 8 & 21 bearish, 50 & 200 bullish",
    "crossovers": "Recent 8/21 bearish cross",
    "price": "Trading below 8 & 21, above 50 & 200 SMAs",
    "compression": "Low - MAs well separated indicating clear trend"
  },
  "vwapAnalysis": {
    "dailyVwap": "Price below VWAP (bearish intraday bias)",
    "anchoredVwap": "Above January AVWAP (maintaining long-term bullish structure)",
    "intersections": "None significant in timeframe"
  },
  "significance": {
    "highlighted": "451.75 likely short trigger on next test",
    "riskZone": "450.00 break triggers flush to 448.50"
  },
  "tradingImplications": [
    "Bias short below 451.25 unless breakout confirmed",
    "Watch 450.00 as base or breakdown",
    "Volume profile suggests institutional selling at upper levels",
    "Red traffic light confirms bearish momentum - prioritize short entries",
    "Below yL confirms bearish price weakness",
    "PP rejection reinforces bearish bias",
    "RSI approaching ticker-specific oversold levels - caution on adding new shorts"
  ],
  "recommendations": {
    "direction": "short",
    "entry": "451.25 (bounce to 8 SMA)",
    "stop": 452.50,
    "targets": [449.75, 448.50, 447.25],
    "conviction": "high - aligned with traffic light status and yL break",
    "timeframe": "intraday",
    "sizeAdjustment": "Full size appropriate (red traffic light + below yL)",
    "pivotReference": "Target 1 aligns with S1 (448.10)",
    "rsiConsideration": "Consider taking partial profits if RSI reaches 28 (extreme oversold for SPY)"
  },
  "relatedSetups": [
    {
      "name": "Failed breakout",
      "similarity": 0.85,
      "reference": "system/setups/failed-breakout.md"
    }
  ]
}
```

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

### Example 4: Review Analysis of Missed Opportunity
```
/analyze-chart [attached 15-minute chart] focus=review symbol=NVDA context="Missed this setup yesterday"
```

## Error Handling

```javascript
// Handle common error conditions
function validateInput(params) {
  const errors = [];

  if (!params.image) {
    errors.push("Chart image is required");
  }

  if (params.focus && !["support-resistance", "patterns", "entries", "review", "comprehensive"].includes(params.focus)) {
    errors.push(`Invalid focus: ${params.focus}. Valid options: support-resistance, patterns, entries, review, comprehensive`);
  }

  if (params.timeframe && !["1m", "2m", "5m", "15m", "30m", "1h", "4h", "daily", "weekly", "auto-detect"].includes(params.timeframe)) {
    errors.push(`Warning: Unrecognized timeframe format: ${params.timeframe}. Will attempt auto-detection.`);
  }

  return errors;
}
```

## Dependencies

- `system/technical-framework/pattern-recognition.md`
- `system/technical-framework/level-significance.md`
- `system/technical-framework/mancini-integration.md`
- `system/chart-visual-legend.md`
- `prompts/premarket/morning-blueprint.md`
