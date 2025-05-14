---
id: compare-execution
version: "1.0.0"
type: prompt
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: MEDIUM
requiresConfirmation: true
---

# 📊 Execution Review Prompt

Compares actual trade performance vs. blueprint plan to surface discipline gaps and learning opportunities.

## 🔢 Inputs

- Setup ID
- Planned vs. actual entries/exits
- Status outcome
- Cognitive state at time of trade

## 📤 Output Format

```json
{
  "executionDeviation": {
    "entry": 2.5,
    "exit": -3.75
  },
  "disciplineGrade": "B",
  "comments": "Entry was late by 2.5 pts, exit was early due to fatigue. Load score was moderate.",
  "improvementActions": ["Practice tiered entry", "Confirm confidence before trimming early"]
}
```

## 🧪 Test Input:

```json
{
  "setupId": "gapFillLong",
  "entryPlan": 4495.50,
  "actualEntry": 4498.00,
  "plannedExit": 4510.75,
  "actualExit": 4507.00,
  "status": "COMPLETED",
  "cognitiveState": {
    "load": 5.8,
    "decisionQuality": "DEGRADED"
  }
}
```

## 📎 References

- `prompts/intraday/status-update.md`
- `system/blueprints/structure.md`
- `system/cognitive/state-tracking.md`
