---
id: plugin-registry
version: "1.0.0"
type: system
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: MEDIUM
requiresConfirmation: false
---

# 🔌 Plugin Registry Specification

Defines the modular plugin architecture for IntentOS-based execution of Intent Trader.

## Plugin Metadata Schema

```json
{
  "id": "replay-engine",
  "type": "module",
  "version": "1.0.0",
  "entryPoint": "system/learning/replay-runner.js",
  "dependsOn": ["logs/trade-log.json", "system/schemas/blueprint.schema.json"],
  "provides": ["replay-score", "trade-feedback"],
  "phase": "postmarket"
}
```

## Plugin Types

- `module`: executable script with side effects
- `analyzer`: returns structured objects
- `transform`: alters blueprint or state
- `report`: logs data or writes output

## Lifecycle Support

- `phase`: premarket, intraday, postmarket
- `invocation`: manual | scheduled | triggered

## Example Plugin Entries

| ID              | Phase      | Type     | Entry Point                              |
|------------------|------------|----------|-------------------------------------------|
| replay-engine    | postmarket | analyzer | system/learning/replay-runner.js          |
| chart-analysis   | intraday   | analyzer | prompts/intraday/chart-analysis.md        |
| blueprint-engine | premarket  | transform| prompts/premarket/morning-blueprint.md    |
