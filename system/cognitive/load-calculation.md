---
id: cognitive-load-calculation
version: "1.0.0"
type: cognitive
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: HIGH
requiresConfirmation: true
---

# 📈 Cognitive Load Calculation

Defines how the `load` score is calculated from various metrics.

## Scoring Formula

```text
load = (stressLevel * 0.3) + (decisionFatigue * 0.3) + (contextSwitching * 0.2) + (volatility * 0.2)
```

- All inputs normalized on a scale from 0 to 10
- Final score is rounded to nearest 0.5
- Thresholds:
  - 0–3.5 = LOW
  - 4–6.5 = MEDIUM
  - 7–10 = HIGH

## Inputs

- `stressLevel`: self or AI-assessed
- `decisionFatigue`: based on prompt behavior
- `contextSwitching`: number of setup changes or tab switches
- `volatility`: market-derived signal

## Output

- `load` value (1–10)
- `resetRecommended` boolean
