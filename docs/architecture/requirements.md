# ✅ Intent Trader Requirements Reference

This document maps the Intent Trader system across functional, behavioral, and runtime dimensions.

---

## 🎯 Functional Use Cases

| Goal                              | Feature/Prompt                        |
|-----------------------------------|---------------------------------------|
| Generate daily plan               | `morning-blueprint.md`               |
| Track intraday setups             | `status-update.md`                   |
| React to real-time trade alerts   | `validate-trade-intent.md`           |
| Capture missed trades             | `missed-trades.md`                   |
| Run full replay after market      | `replay-runner.js`                   |
| Score vs blueprint and update     | `improvement-feedback.md`            |
| Run end-to-end daily session      | `tests/full-session-test.md`         |

---

## 🧠 Behavioral Requirements

| Scenario                          | Trigger / Command                   |
|-----------------------------------|-------------------------------------|
| New VTF trade idea                | `/validate trade`                   |
| Cognitive fatigue                 | `/cognitive reset`                  |
| Internal impulse idea             | `/log intent` + `/status update`    |
| Mic commentary                    | `/chart analysis`                   |
| Rejection at level                | `/status update` + `/compare execution` |
| Regret after trade                | `/missed-trades.md` or journaling   |

---

## 🧪 Testing + Validation

- All output must conform to schemas in `system/schemas/`
- Test vector required in each prompt
- Prompts registered in `/prompts/` must pass lint
- Replay output must be generated every close

