# 🧠 Intent Trader Developer Handbook

This handbook brings together all key components of the Intent Trader system for contributors or future maintainers.

---

## System Design

- Schema-first architecture
- Plugin registry + dispatcher
- Prompt routing via runtime-agent
- ChatGPT-compatible command interface

---

## Runtime Files

- `system/systemops/runtime-agent.md` – prompt identity + dispatch layer
- `system/systemops/command-map.md` – commands and triggers
- `state/session-manifest.json` – holds session phase + context

---

## Prompt Stack

Stored in:
- `prompts/premarket/`
- `prompts/intraday/`
- `prompts/postmarket/`
- `prompts/system/`

Each prompt includes:
- Metadata frontmatter
- Inputs/outputs
- Test vector

---

## Plugin Stack

Registered in:
- `system/systemops/plugin-registry.json`

Dispatcher:
- `system/systemops/plugin-dispatcher.js`

Add plugins with:
- `how-to/add-a-plugin.md`

---

## Reconciliation Tools

- `replay-runner.js` + `replay-summary.json`
- `compare-execution.md` + `missed-trades.md`
- `improvement-feedback.md` (adaptive blueprint updates)
