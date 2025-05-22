---
id: status
title: /status Command Handler
description: Returns current session state from session-manifest.json
author: Intent Trader System
version: 0.3.2
release: 0.5.2
created: 2025-05-20
updated: 2025-05-21
category: system
status: stable
tags: [command, status, runtime]
requires: [system/state/session-manifest.json]
outputs: [logs/runtime-init.log]
input_format: none
output_format: markdown
ai_enabled: true
---

# System Status

Runtime boot: [status]
Runtime root: [RUNTIME_ROOT]
Commands loaded: [count]
Active command map: [command-map]
Session manifest: [session-state]
Emoji enforcement: [status]
Audit logging: [active|inactive]
Session metadata: [`state/session-manifest.json`]

Awaiting your next instruction...

## Output

Trading:

- `currentPhase`
- `market.openTime`, `market.closeTime`, `currentStatus`
- `plan.focusIdeas`
- `positions.totalRisk`

System:

- `plugins.active`
- Display current session metadata by parsing `state/session-manifest.json`.

## Example Output

```json
{
  "sessionId": "2025-05-20",
  "currentPhase": "intraday",
  "market": {
    "openTime": "2025-05-20T13:30:00Z",
    "closeTime": "2025-05-20T20:00:00Z",
    "currentStatus": "open"
  },
  "plan": {
    "focusIdeas": ["SPX reclaim 5905", "QQQ long 503–501"]
  },
  "positions": {
    "totalRisk": 0
  },
  "plugins": {
    "active": ["analyze-dp", "analyze-mancini"]
  }
}
```
