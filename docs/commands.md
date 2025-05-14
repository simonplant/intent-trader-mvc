# 🧾 Intent Trader Command Reference

This file documents all prompt-level, plugin, and CLI commands for the Intent Trader runtime system.

---

## 🔧 CLI Commands (Node Dispatcher)

| Command                                           | Description                                       |
|--------------------------------------------------|---------------------------------------------------|
| `node system/systemops/plugin-dispatcher.js premarket` | Run all premarket plugins                   |
| `node system/systemops/plugin-dispatcher.js intraday`  | Run all intraday plugins                    |
| `node system/systemops/plugin-dispatcher.js postmarket`| Run all postmarket plugins                  |
| `node system/learning/replay-runner.js`          | Run replay engine manually                      |

---

## 💬 Slash Commands (ChatGPT / Promptsmith)

Use these after uploading `intent-trader.zip` and loading `runtime-agent.md`:

### 🔁 Global

- `/run-phase <phase>` — executes all plugins/prompts for `premarket`, `intraday`, or `postmarket`
- `/help` — show all valid commands from command-map.md

### ☀️ Premarket

- `/blueprint new` — run `morning-blueprint.md`
- `/summarize levels` — output level list from source map
- `/simplify blueprint` — trigger adaptation or scenario reduction

### 🔁 Intraday

- `/status update` — run `status-update.md` for active setup
- `/chart analysis` — run `chart-analysis.md`
- `/cognitive reset` — check cognitive state and reset plan
- `/midday reset` — run `midday-reset.md`

### 📉 Postmarket

- `/replay` — run replay-runner.js + generate feedback
- `/compare execution` — run `compare-execution.md`
- `/missed trades` — run `missed-trades.md`
- `/analyze performance` — run `analyze-plan-vs-execution.md`
- `/feedback` — apply feedback via `improvement-feedback.md`