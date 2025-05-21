---
id: status
title: /status Command Handler
description: Returns current session state from session-manifest.json
author: Intent Trader System
version: 0.1.0
created: 2025-05-20
category: runtime
status: stable
tags: [command, status]
requires: [state/session-manifest.json]
input_format: none
output_format: markdown
ai_enabled: true
---

# /status

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
