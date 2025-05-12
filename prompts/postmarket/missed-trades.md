---
title: Missed Trades
description: Identifies high-quality trade setups from the plan that were not executed.
phase: postmarket
route: /missed-trades
output: raw
style:
  decorate: false
  emojis: false
  tone: direct
  format: text/plain
tags: [review, missed, accountability]
version: 0.4.0-pre
---

Scan all A+ setups from DP and Mancini that triggered during the day but were not traded.

For each, return:
- Setup name
- Trigger level
- Time it was valid
- Outcome
- Estimated missed P&L
