---
id: status-update
version: "1.0.0"
type: prompt
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: MEDIUM
requiresConfirmation: true
---

# 📍 Intraday Status Update Prompt

This prompt updates the current status of a tracked trade idea, integrating technical, cognitive, and position data.

## 🔢 Inputs

- **Position Info**
  - setupId
  - symbol
  - entry, stop, target
  - current price
- **Market Data**
  - Level tested, broken, or respected
  - Volume behavior
  - Time of day
- **Cognitive State**
  - Trader stress, fatigue, attention
  - Cognitive load score
  - Confidence or clarity drop

## ⚙️ Update Logic

1. Match setupId from blueprint
2. Evaluate technical trigger conditions
3. Assess cognitive factors
4. Transition to next valid state based on triggers
5. Return valid `status.schema.json` object

## 📤 Output Format

```json
{
  "id": "trade-001",
  "setupId": "gapFillLong",
  "status": "PENDING",
  "currentPrice": 4493.75,
  "entryDistance": 1.75,
  "entryConditionsMet": false,
  "nextActions": [
    "Monitor price approach to 4495.50",
    "Check volume confirmation"
  ],
  "notes": "Waiting for entry conditions, volume needs to confirm"
}
```

## 🧪 Test Vector

**Input:**
```json
{
  "setupId": "gapFillLong",
  "symbol": "SPX",
  "entry": 4495.50,
  "stop": 4490.50,
  "target": 4510.75,
  "currentPrice": 4493.75,
  "levelTested": "pivot",
  "volume": "moderate",
  "cognitiveState": {
    "load": 6.5,
    "decisionQuality": "DEGRADED",
    "distractions": ["alerts", "news"]
  }
}
```

**Expected Output:**
- Returns updated status as `PENDING`
- Includes rationale for not entering yet
- Lists specific next actions and focus areas

## 📎 References

- `system/status-tracking/framework.md`
- `system/status-tracking/transitions.md`
- `system/status-tracking/visualization.md`
- `system/workflows/status-update-cycle.md`
