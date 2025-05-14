---
id: mancini-integration
version: "1.0.0"
type: technical
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: MEDIUM
requiresConfirmation: true
---

# 📐 Mancini Level Integration

Incorporates Adam Mancini's ES futures blueprint into the Intent Trader system.

## Inputs

- ES level blueprint from Mancini email
- Daily level map with support/resistance calls
- Pattern annotations (gap, trendline, key break, etc.)

## Mapping Process

1. Translate ES level to SPX with offset (e.g., -30 pts)
2. Annotate each level:
   - `type`: support, resistance, pivot
   - `label`: breakout, failed test, reclaim
   - `source`: "Mancini"

## Output

Structured level list used in:
- `blueprint.levels`
- `chart-analysis.md`
