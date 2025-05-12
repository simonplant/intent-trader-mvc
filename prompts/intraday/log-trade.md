---
title: Log Trade
description: Captures a manually executed trade with rationale and system metadata.
phase: intraday
route: /log-trade
output: raw
style:
  decorate: false
  emojis: false
  tone: direct
  format: text/plain
tags: [logging, execution, tracking]
version: 0.4.0-pre
---

Log format:
- Ticker and contract (e.g. TSLA 5/17 170P @ 2.70)
- Trade type (big-idea, swing, cashflow)
- Entry price, size
- Confidence level
- Stop and target
- Reason and source (DP, Mancini, mod)
