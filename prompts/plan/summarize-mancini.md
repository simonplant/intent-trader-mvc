---
id: summarize-mancini
title: Mancini Newsletter Preprocessor
description: Extracts structured data from Mancini's newsletters to prepare for analysis
author: Intent Trader Team
version: 0.2.0
release: 0.5.2
created: 2025-05-19
updated: 2025-05-19
category: plan
status: planned
tags: [plan, mancini, es-futures, preprocessing, extraction]
requires: []
outputs: [preprocessedManciniData]
input_format: text
output_format: markdown
ai_enabled: true
---
===
Trading Newsletter Extraction and Summarization Prompt

Please analyze this trading newsletter and create a concise yet comprehensive summary of 2-4 pages (approximately 1,000-1,800 words). Focus only on essential, non-repetitive information relevant to current market conditions and upcoming trading opportunities.

SUMMARY FORMAT:
Produce a well-structured document with clear section headers, bullet points for scannability, and occasional tables for level comparisons where appropriate. The final output should be immediately actionable for trading decisions without requiring reference to the original newsletter.

KEY ELEMENTS TO EXTRACT:

1. **Current Market Regime & Structure** (15-20% of summary)
   * Current directional bias (bullish/bearish/neutral) with specific supporting evidence
   * Key pattern formations with exact price boundaries (flags, channels, consolidations)
   * Recent structural developments that changed market character (breakouts, failures)
   * Institutional behavior indicators (accumulation zones, distribution patterns)
   * Context of current move within larger timeframe perspective

2. **Recent Price Action Analysis** (20-25% of summary)
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

4. **⭐ Next Session Trading Plan** (25-30% of summary)
   * 3-5 most critical levels to monitor with exact prices and significance
   * Primary support/resistance zones with distinction between major/minor
   * Specific setup conditions being monitored with precise trigger points
   * Bull case scenario with entry conditions and level-to-level targets
   * Bear case scenario with breakdown levels and target zones
   * Special conditions affecting the next session (OPEX, economic reports)
   * Current positions being carried and their management plan

5. **Notable Trading Examples or Education** (5-10% of summary)
   * Only include if the newsletter contains unique examples not covered previously
   * Practical applications of core strategies with measurable outcomes
   * New variations of setups with distinguishing characteristics

EXCLUDE:
* Methodology explanations that repeat in every issue
* Standard housekeeping notices
* Generic trading philosophy statements
* Extensive lists of minor support/resistance levels
* Boilerplate setup explanations
* Generic warnings about prediction vs. reaction
* Standard trade management reminders

⭐ HIGHLIGHT SECTION:
At the end of the summary, include a highlighted "Tomorrow's Focus" section that identifies the 2-3 most immediately actionable items for the next trading session, including:
1. Primary levels to watch with exact numbers
2. Specific setup conditions with entry triggers
3. Key risk management considerations
4. Timing considerations if mentioned

The final output should be approximately 1,000-1,800 words (2-4 pages) and provide a trader with everything needed to understand current market conditions and actionable trade opportunities without referencing the original newsletter.