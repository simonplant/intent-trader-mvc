---
id: morning-blueprint
version: "1.0.0"
type: prompt
created: 2025-05-14T05:30:28.393018Z
updated: 2025-05-14T05:30:28.393018Z
cognitiveLoad: MEDIUM
requiresConfirmation: true
---

# Morning Blueprint Generation Prompt

This prompt generates the daily Intent Trader blueprint based on premarket context, technical levels, and trader state.

## Inputs

- **Market Context**
  - Previous day's close
  - Overnight range and news
  - Economic events or catalysts
- **Technical Levels**
  - Support, resistance, pivot zones
  - Volatility or gap zones
- **Cognitive State**
  - Load score
  - Focus areas and distractions

## Processing Steps

1. Normalize and summarize market context.
2. Rank technical levels by expected significance.
3. Identify valid setups based on structure and context.
4. Assign confidence and scenarios (bullish, bearish, neutral).
5. Return a validated `blueprint.schema.json` object.

## Output Format

```json
{
  "date": "2025-05-13",
  "marketContext": {
    "previousClose": 4500.25,
    "gapDirection": "up",
    "keyEvents": ["CPI Report", "NVDA Earnings"]
  },
  "levels": [
    {"price": 4510.75, "type": "resistance", "significance": 8},
    {"price": 4500.25, "type": "pivot", "significance": 9},
    {"price": 4490.50, "type": "support", "significance": 7}
  ],
  "setups": [
    {
      "id": "gapFillLong",
      "conditions": "Gap up with moderate pre-market volume",
      "entry": 4495.50,
      "targets": [4500.25, 4510.75],
      "stop": 4490.50,
      "timeWindow": "First hour"
    }
  ],
  "scenarios": {
    "bullish": "Break above 4510.75 targets 4525",
    "bearish": "Break below 4490.50 targets 4475",
    "neutral": "Range between 4490.50–4510.75"
  }
}
```

## Test Vector

**Input:**
```json
{
  "previousClose": 4500.25,
  "overnightRange": [4490.50, 4510.75],
  "keyEvents": ["CPI Report", "NVDA Earnings"],
  "gapDirection": "up",
  "preMarketVolume": "moderate",
  "cognitiveState": {
    "load": 5,
    "focusAreas": ["gapFill", "overnightHigh"]
  }
}
```

**Expected Output:**
Returns a valid blueprint object with:
- Simplified setups if cognitive load is moderate or higher
- Ranked levels with significance field
- At least 1-2 scenarios based on current structure

## References

- `system/blueprints/structure.md`
- `system/blueprints/generation.md`
- `system/blueprints/extraction-source-map.json`
