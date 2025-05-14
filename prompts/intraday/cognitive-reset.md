---
id: cognitive-reset
version: "1.0.0"
type: prompt
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: HIGH
requiresConfirmation: true
---

# 🛠️ Intraday Cognitive Reset Prompt

This prompt is triggered when trader load exceeds threshold or cognitive degradation is detected.

## 🔢 Inputs

- Full `cognitive-load.schema.json` state object
- Current attention allocation and disruptions
- Decision quality and fatigue indicators

## 🧭 Prompt Function

1. Confirm overload or emotional distress
2. Guide through reset protocol steps
3. Refocus user on one setup
4. Recommend blueprint or trade changes
5. Return updated `cognitive-load` object with post-reset metrics

## 🧪 Test Input:
```json
{
  "load": 8.2,
  "attentionAllocation": {
    "trade-003": 0.6,
    "market-monitoring": 0.3,
    "other": 0.1
  },
  "decisionQuality": "DEGRADED",
  "focusAreas": ["trade-003", "key-levels"],
  "distractions": ["multiple-setups", "news-events"]
}
```

## ✅ Expected Output:
```json
{
  "resetRecommended": true,
  "stepsTaken": [
    "Pause input",
    "Self rating",
    "4-4-8 breathing",
    "Refocus on primary setup",
    "Confirm load drop"
  ],
  "newFocus": ["trade-003"],
  "cognitiveState": {
    "load": 4.5,
    "decisionQuality": "OPTIMAL",
    "resetRecommended": false
  }
}
```

## 📎 References

- `system/protocols/cognitive-reset.md`
- `system/cognitive/adaptation-matrix.md`
- `prompts/intraday/status-update.md`
