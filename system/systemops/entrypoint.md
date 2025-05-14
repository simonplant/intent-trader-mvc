---
id: entrypoint
version: "1.0.0"
type: system
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: LOW
requiresConfirmation: false
---

# 🚀 Promptsmith Runtime EntryPoint

This file bootstraps the session context for Promptsmith and loads all critical execution state from the manifest.

## ✅ Load First:
- `state/session-manifest.json`
- Determine current `phase`
- Route to valid prompts or plugin stack

## 🧩 Use Cases

| Phase        | Triggered Components                              |
|--------------|---------------------------------------------------|
| premarket    | `morning-blueprint`, `chart-analysis`             |
| intraday     | `status-update`, `cognitive-reset`, `midday-reset`|
| postmarket   | `compare-execution`, `missed-trades`, `replay`    |

## ☁️ Session State Management

Stored in: `state/session-manifest.json`  
Use this to:
- Validate blueprint alignment
- Check number of active setups
- Monitor load and trigger resets