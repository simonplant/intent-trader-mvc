---
id: improvement-feedback
version: "1.0.0"
type: learning
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: HIGH
requiresConfirmation: true
---

# Adaptive Feedback Mapping

Uses replay engine output to adapt prompts, blueprints, and status protocols for better execution next session.

## Mappings

| Signal | Action |
|--------|--------|
| Entry deviation > 3pts | Trigger earlier alerts in `status-update.md` |
| Repeated early exits | Add timing confidence prompt |
| Load > 7 → multiple invalid trades | Simplify morning blueprint |
| Missed A+ setup | Add execution alert at `marketMode: intraday` |

## Output Format

```json
{
  "blueprintChanges": ["Trim scenarios to top 2 during high load"],
  "promptUpdates": ["Add entry timing rationale to morning-blueprint.md"],
  "statusChanges": ["Flag setups to review if entry missed twice"]
}
```

## References

- `system/learning/replay-engine.md`
- `system/cognitive/adaptation-matrix.md`
- `prompts/postmarket/compare-execution.md`
- `prompts/postmarket/missed-trades.md`
