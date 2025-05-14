---
id: chart-analysis
version: "1.0.0"
type: prompt
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: MEDIUM
requiresConfirmation: true
---

# 📈 Chart Analysis Prompt

This prompt analyzes real-time chart data to recognize patterns and evaluate trading implications based on blueprint levels and technical taxonomy.

## 🔢 Inputs

- **Symbol**: (e.g., SPX)
- **Timeframe**: (e.g., 2min, 15min)
- **Price & Volume Data**
- **Known Levels**: From blueprint + Mancini integration
- **Mancini Annotations**: Gap, reclaim, trend break

## ⚙️ Analysis Logic

1. Match pattern structures from `pattern-recognition.md`
2. Rank levels using `level-significance.md`
3. Overlay Mancini annotations and reactions
4. Return pattern match and decision support object

## 📤 Output Format

```json
{
  "patterns": [
    {
      "type": "Failed Breakout",
      "direction": "bearish",
      "reliability": 8,
      "trigger": "Break above 4510.25 rejected on volume spike"
    }
  ],
  "keyLevels": [
    {"price": 4500.00, "type": "support", "significance": 8},
    {"price": 4512.00, "type": "resistance", "significance": 9}
  ],
  "significance": {
    "highlighted": "4512.00 likely short trigger on next test",
    "riskZone": "4500.00 break triggers flush to 4480s"
  },
  "tradingImplications": [
    "Bias short below 4510.25 unless breakout confirmed",
    "Watch 4500.00 as base or breakdown"
  ]
}
```

## 🧪 Test Input:

```json
{
  "symbol": "SPX",
  "timeframe": "2min",
  "priceData": [4510.25, 4505.75, 4508.00, 4502.50],
  "volume": [12000, 10500, 13000, 15000],
  "levels": [
    {"price": 4512.00, "type": "resistance", "significance": 9},
    {"price": 4500.00, "type": "support", "significance": 8}
  ],
  "manciniAnnotations": ["gapFill", "failedBreak"]
}
```

## 📎 References

- `system/technical-framework/pattern-recognition.md`
- `system/technical-framework/level-significance.md`
- `system/technical-framework/mancini-integration.md`
- `prompts/premarket/morning-blueprint.md`
