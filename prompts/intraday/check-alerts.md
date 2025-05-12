---
title: Check Alerts
description: Checks if any preset levels, news, or moderator alerts have triggered.
phase: intraday
route: /check-alerts
output: raw
style:
  decorate: false
  emojis: false
  tone: direct
  format: text/plain
tags: [alerts, triggers, real-time]
version: 0.4.0-pre
---

Scan:
- Mancini levels (via plan or tweet)
- DP levels
- MA levels (8d, 21d, 34d, 50d, 100d, 200d)
- VTF mod alerts

Return:
- Triggered items
- Current price context
- Trade validity at this time
