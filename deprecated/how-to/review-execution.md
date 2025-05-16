# 📉 How To: Review Execution vs. Plan

This guide explains how to perform postmarket reconciliation using trade logs, replay engine, and Mancini blueprint alignment.

---

## 1. Log Your Executed and Missed Trades

Use:
- `prompts/postmarket/compare-execution.md`
- `prompts/postmarket/missed-trades.md`

Log output into:
```
logs/trade-log.json
```

---

## 2. Run Replay Engine

```bash
node system/learning/replay-runner.js
```

This generates:
```
logs/replay-summary.json
```

---

## 3. Compare Plan vs. Performance

Use:
- `prompts/postmarket/analyze-plan-vs-execution.md`
- `logs/session-manifest.json` (for expected setups)

Output insights:
- Entry/exit deviation
- Missed setups (Mancini vs reality)
- Load or hesitation-based errors

---

## 4. Adapt Blueprint and Prompts

Use:
- `system/learning/improvement-feedback.md`

Apply suggestions to:
- Future blueprint structure
- Prompt stack changes (e.g. entry confidence, reset timing)
