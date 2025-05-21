---
id: entrypoint
title: Intent Trader EntryPoint
description: System bootstrap loader for full runtime activation
author: Intent Trader Team
version: 0.4.1
release: 0.5.2
created: 2025-05-19
updated: 2025-05-21
category: system
status: stable
tags: [system, initialization, bootstrap]
requires:
  [
    system/runtime/runtime-agent.md,
    system/runtime/command-map.md,
    system/runtime/plugin-dispatcher.js,
    system/runtime/plugin-registry.json,
    system/runtime/validator.md,
    system/state/session-manifest.json,
    system/state/my-positions.json,
    system/state/moderator-positions.json,
    system/state/trade-plan-state.json,
    system/state/transaction-log.json,
  ]
outputs: [logs/trade-log.json]
input_format: json
output_format: markdown
ai_enabled: false
---

# Intent Trader EntryPoint

This file executes system initialization and binds the runtime environment for Intent Trader. It must be run **before any command execution**.

---

## ✅ Initialization Payload

```json
{
  "runtime": {
    "bound": true,
    "entrypoint": "system/runtime/runtime-agent.md",
    "commandMap": "system/runtime/command-map.md",
    "pluginDispatcher": "system/runtime/plugin-dispatcher.js",
    "pluginRegistry": "system/runtime/plugin-registry.json",
    "validator": "system/runtime/validator.md"
  },
  "state": {
    "sessionManifest": "system/state/session-manifest.json",
    "myPositions": "system/state/my-positions.json",
    "moderatorPositions": "system/state/moderator-positions.json",
    "tradePlan": "system/state/trade-plan-state.json",
    "transactionLog": "system/state/transaction-log.json"
  },
  "schemas": {
    "base": "system/schemas/intent-trader-master-schema.json",
    "runtime": "system/schemas/intent-trader-runtime-schema.json"
  },
  "audit": {
    "logFile": "logs/trade-log.json",
    "loggingEnabled": true
  },
  "emojiEnforcement": {
    "enabled": true,
    "linter": "system/runtime/validator.md"
  },
  "status": "Runtime initialized. Commands loaded. Session manifest valid. Awaiting your next instruction."
}


⸻

✅ System Status Report

Component	Status
Runtime Routing	✅ Bound
Commands Loaded	✅ Loaded
Session State	✅ Valid
Plugin Support	✅ Active
Audit Logging	✅ Enabled
Emoji Enforcement	✅ Enforced


⸻

Cognitive Phases

Phase	Commands Group	Purpose
Plan	plan/*	Build trade ideas
Focus	focus/*	Prioritize entries
Execute	execute/*	Enter/manage trades
Review	review/*	Log performance
Utilities	utilities/*	Diagnostics, cleanup


⸻

Final Instruction

Intent Trader is now initialized and ready to process commands via runtime-agent.md.

To test:
	•	Run /list-commands
	•	Check logs/trade-log.json for activity
	•	Confirm session-manifest.json updates
```
