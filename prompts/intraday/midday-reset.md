---
id: midday-reset
version: "1.0.0"
type: prompt
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: MEDIUM
requiresConfirmation: true
---

# 🔄 Midday Blueprint Reset Prompt

This prompt reassesses trade plan and status near midday based on cognitive and market conditions.

## 🔢 Inputs

- Time of day
- Number of active or marginal setups
- Recent volatility or news events
- Current `cognitive-load.schema.json` state
- Number of recent status changes

## 🧭 Prompt Function

1. Summarize state of market and mental load
2. Recommend simplifying blueprint or exiting marginal trades
3. Perform midpoint self-check and reorientation
4. Return blueprint simplification or exit actions

## 🧪 Test Input:
```json
{
  "time": "11:00",
  "activeSetups": 4,
  "load": 6.8,
  "statusChanges": 5,
  "marketVolatility": "elevated"
}
```

## ✅ Expected Output:
```json
{
  "recommendations": [
    "Simplify blueprint to top 1-2 setups",
    "Trim or exit marginal positions",
    "Mark setups needing confirmation",
    "Perform cognitive self-check"
  ],
  "updatedLoadEstimate": 5.5
}
```

## 📎 References

- `system/cognitive/adaptation-matrix.md`
- `system/cognitive/state-tracking.md`
- `prompts/intraday/status-update.md`
