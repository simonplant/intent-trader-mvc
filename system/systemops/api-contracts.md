---
id: api-contracts
version: "1.0.0"
type: system
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: HIGH
requiresConfirmation: false
---

# 📡 API Contracts for Plugin Execution

Defines input/output contracts for major plugin categories.

## 🔁 Replay Engine

- **Input**: `logs/trade-log.json`
- **Output**:
```json
[
  {
    "setupId": "gapFillLong",
    "replayScore": 90,
    "feedback": ["late entry", "early exit"]
  }
]
```

## 📊 Chart Analyst

- **Input**:
```json
{
  "symbol": "SPX",
  "priceData": [...],
  "levels": [...]
}
```

- **Output**:
```json
{
  "patterns": ["failed breakout"],
  "levelSignificance": [4510, 4500],
  "bias": "bearish"
}
```

## 🧠 Cognitive Reset Trigger

- **Input**: `cognitive-load.schema.json` object
- **Output**: 
```json
{
  "resetRecommended": true
}
```

## 🧩 Integration

Each plugin must define:
- `inputSchema`
- `outputSchema`
- `expectedSideEffects`
- `dataSource` and `dataTarget`
