---
title: Sizing Rules
description: Provides capital allocation guidance based on trade type and confidence.
phase: system
route: /sizing-rules
output: raw
style:
  decorate: false
  emojis: false
  tone: direct
  format: text/plain
tags: [risk, sizing, rules, capital]
version: 0.4.1
---

Sizing guide:

- Big Idea (DP-style): $66K max, full conviction only
- Swing Trade: $33K default, can build in tiers
- Cashflow Trade: $10–15K max, fast in/out
- Default Cooldown Rule: Pause after $2.5K loss
- Weekly Red Flag: If weekly loss > $5K, go flat next day

Enforce these through all validation and planning prompts.
