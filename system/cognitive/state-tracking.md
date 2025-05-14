---
id: cognitive-state-tracking
version: "1.0.0"
type: cognitive
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: MEDIUM
requiresConfirmation: true
---

# 🧠 Cognitive State Tracking

Tracks the trader's current cognitive state using quantifiable metrics.

## Metrics Tracked

- `load`: score from 1 to 10
- `decisionQuality`: OPTIMAL, DEGRADED, COMPROMISED
- `attentionAllocation`: % distribution across focus areas
- `focusAreas`: key mental priorities
- `distractions`: internal or external interruptions

## Input Sources

- Self-reported check-ins
- Prompt behavior (hesitation, retyping, stalling)
- Trade frequency + speed
- Status transitions with high emotional load

## Cognitive State Object

Validated by: `cognitive-load.schema.json`
