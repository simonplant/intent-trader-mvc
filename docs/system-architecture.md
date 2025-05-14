# 🏛️ Intent Trader System Architecture

This document provides a high-level overview of the Intent Trader system: its components, interactions, and runtime execution model.

---

## 🔧 Key Components

| Component                   | Description                                                  |
|----------------------------|--------------------------------------------------------------|
| `prompts/`                 | Modular prompts by phase (premarket, intraday, postmarket)   |
| `system/`                  | Core logic: schema, blueprints, cognitive engine, dispatcher |
| `state/session-manifest.json` | Tracks current phase, blueprint ID, and active plugins  |
| `logs/`                    | Captures trade outcomes, replay, and test session data       |
| `plugin-registry.json`     | Registers runtime plugins with phase-specific execution       |
| `plugin-dispatcher.js`     | Executes all plugins for a given phase                       |
| `replay-runner.js`         | Scores actual trades vs. plan                                |

---

## 🔁 Runtime Workflow

1. Load session context from `state/session-manifest.json`
2. User invokes commands like `/status update` or `/replay`
3. Prompt or plugin runs based on `command-map.md`
4. Output is logged to `logs/` and/or triggers blueprint or cognitive updates

---

## 🧠 Design Principles

- Schema-first
- Prompt modularity
- Testable via replay + linter
- Human-in-the-loop alignment (emotional state + discipline)
