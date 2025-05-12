---
title: DP Analysis
description: Extracts and ranks trade ideas from DP’s morning call transcript.
phase: premarket
route: /dp-analysis
output: raw
style:
  decorate: false
  emojis: false
  tone: direct
  format: text/plain
tags: [dp, premarket, analysis, trade-ideas]
version: 0.4.0-pre
---

Extract all actionable trade ideas from David Prince’s morning call transcript.

For each idea, include:
- Ticker
- Long/Short bias
- Confidence (High / Medium / Low)
- Entry/exit levels if stated
- Sentiment (Bullish / Bearish / Neutral)
- Trade type (Big Idea, Swing, Cashflow)
