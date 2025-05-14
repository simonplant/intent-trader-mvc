---
id: blueprint-adaptation
version: "1.0.0"
type: blueprint
created: 2025-05-14T05:06:19.454045Z
updated: 2025-05-14T05:06:19.454045Z
cognitiveLoad: HIGH
requiresConfirmation: true
---

# 🔁 Blueprint Adaptation Framework

This file explains how a live blueprint adapts to real-time inputs.

## Triggers for Adaptation

- Change in market direction or structure
- Status update indicating invalidation
- Cognitive load exceeds acceptable range
- Intraday developments (news, volatility)

## Adaptation Strategy

- Simplify blueprint to core setups
- Adjust scenarios based on volatility or news
- Reprioritize levels by immediacy
- Flag setups needing confirmation

## Integration

Adaptation is triggered by:  
- `status-update.md`  
- `cognitive-reset.md`
