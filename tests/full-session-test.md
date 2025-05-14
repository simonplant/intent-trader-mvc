---
id: full-session-test
version: "1.0.0"
type: test
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: MEDIUM
requiresConfirmation: false
---

# Full Intent Trader Simulation (E2E Test)

This test simulates a full trading day using actual schema-valid inputs and tracked output per phase.

---

## Premarket: Morning Blueprint

**Input**: `marketContext`, `levels`, `cognitiveState`

**Expected**: Valid `blueprint.schema.json` output
Prompt: `prompts/premarket/morning-blueprint.md`

---

## Intraday: Status Update + Chart

**Input**:
- Setup ID from blueprint
- Current price + level test
- `cognitive-load.schema.json`

**Expected**:
- Valid `status.schema.json`
- Chart output with pattern detection
Prompts:
- `prompts/intraday/status-update.md`
- `prompts/intraday/chart-analysis.md`
- `prompts/intraday/cognitive-reset.md`

---

## Postmarket: Execution Logging

**Input**: Actual trades, missed setups

**Expected**:
- Trade log entries to `logs/trade-log.json`
- Prompt logs from:
  - `compare-execution.md`
  - `missed-trades.md`

---

## Replay + Learning

Run: `system/learning/replay-runner.js`

**Expected**:
- `replay-summary.json` with deviations + feedback
- Feed into `improvement-feedback.md`

---

## Coverage Checklist

- [x] Blueprint schema validated
- [x] Status and cognitive responses logged
- [x] Chart pattern analyzed
- [x] Replay metrics scored
- [x] Feedback generated
