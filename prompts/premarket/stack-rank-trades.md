---
title: Stack Rank Trades
description: Ranks trade ideas by confidence, setup quality, and alignment with plan.
phase: premarket
route: /stack-rank-trades
output: raw
style:
  decorate: false
  emojis: false
  tone: direct
  format: text/plain
tags: [ranking, premarket, planning]
version: 0.4.0-pre
---

Input: A list of trade ideas from DP and Mancini.

Output: A prioritized list ordered by:
- Confidence
- Setup clarity (levels defined)
- Market alignment
- Trade type: big-idea > swing > cashflow

Return in clean table format.
