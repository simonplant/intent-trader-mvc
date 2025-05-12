---
title: Validate Trade
description: Validates a proposed trade against current plan, market context, and system rules.
phase: intraday
route: /validate-trade
output: raw
style:
  decorate: false
  emojis: false
  tone: direct
  format: text/plain
tags: [validation, intraday, execution, compliance]
version: 0.4.0-pre
---

Use this prompt before executing any trade.

Checklist:
- Is this trade in the plan?
- Does it align with current price/volume context?
- Is the confidence level appropriate for the size?
- Are stop and target levels defined?
- Is this trade emotion-free and well-timed?

Return verdict: VALID / REJECTED
With rationale and reminders if rejected.
