---
id: replay-engine
version: "1.0.0"
type: learning
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: MEDIUM
requiresConfirmation: true
---

# 🔁 AI Replay Engine

Reconstructs trading sessions using trade logs and compares actual execution with blueprint plan and cognitive state.

## 🔢 Inputs

- `trade-log.json`
- `blueprint-state.json` (from morning blueprint)
- `status` transitions (during session)
- `cognitiveState` snapshots (optional)

## 🧭 Evaluation Metrics

- **Entry Timing**: How close was actual entry to planned level?
- **Exit Discipline**: Did trader exit early, late, or as planned?
- **Missed Opportunity Index**: How many setups were valid but ignored?
- **Cognitive Interference**: Was performance degraded during high load?

## 🧠 Output

```json
{
  "replayScore": 82,
  "entryDeviation": 2.5,
  "exitPrecision": -3.5,
  "missedSetups": ["trendBreakShort"],
  "adjustments": [
    "Prioritize primary setups under load > 6",
    "Reduce cognitive branching in morning blueprint"
  ]
}
```

## 📎 References
- `logs/trade-log.json`
- `system/schemas/blueprint.schema.json`
- `system/cognitive/state-tracking.md`
