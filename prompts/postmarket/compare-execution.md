---
title: Compare Execution
description: Compares planned trade ideas vs actual executed trades for alignment.
phase: postmarket
route: /compare-execution
output: raw
style:
  decorate: false
  emojis: false
  tone: direct
  format: text/plain
tags: [execution, plan, comparison]
version: 0.4.0-pre
---

For each executed trade:
- Was it in the plan?
- Was size appropriate?
- Was it taken at the right time?

Return list of aligned and unaligned trades.
