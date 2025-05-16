---
id: missed-trades
version: "1.0.0"
type: prompt
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: HIGH
requiresConfirmation: true
---

# Missed Trade Logging Prompt

Logs missed A+ setups, cognitive or execution reasons, and recommended changes.

## Inputs

- Setup ID and trigger
- Was opportunity seen or not?
- Reason missed
- Cognitive state and distractions

## Output Format

```json
{
  "grade": "Missed A+ Setup",
  "cause": "Cognitive overload and distractions",
  "recommendations": [
    "Mute Discord during active setup watch",
    "Limit to one active trade at a time",
    "Trigger midday reset if load > 7"
  ]
}
```

## Test Input:

```json
{
  "setupId": "trendBreakShort",
  "level": 4475.00,
  "triggerObserved": true,
  "reasonMissed": "cognitive overload",
  "cognitiveState": {
    "load": 8.4,
    "decisionQuality": "COMPROMISED",
    "distractions": ["discord chat", "other trade open"]
  }
}
```

## References

- `system/blueprints/generation.md`
- `system/cognitive/adaptation-matrix.md`
- `prompts/intraday/cognitive-reset.md`
