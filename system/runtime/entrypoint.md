---
id: entrypoint
title: Intent Trader EntryPoint
description: System initialization and bootstrap loader
author: Intent Trader Team
version: 0.2.1
release: 0.5.1
created: 2025-05-16
updated: 2025-05-16
category: system
status: stable
tags: [system, initialization, bootstrap]
requires: [state/session-manifest.json, system/runtime/command-map.md]
outputs: []
input_format: none
output_format: json
ai_enabled: false
---

# Intent Trader EntryPoint

This file bootstraps the Intent Trader system, loads the session context, and initializes the command routing infrastructure.

## Initialization Sequence

1. **Hard Bind Runtime Routing**

Load and permanently bind the runtime control layer:

```json
{
  "runtime_bound": true,
  "entrypoint": "system/runtime/runtime-agent.md",
  "command_map": "system/runtime/command-map.md",
  "plugin_registry": "system/runtime/plugin-registry.json"
}
```

2. **Determine Trading Phase**:
   - Extract `currentPhase` from session manifest
   - Validate market session phase (premarket, intraday, postmarket)
   - Load phase-appropriate commands

3. **Initialize State**:
   - Load position tracking files
   - Verify state file integrity
   - Initialize empty state if needed

## Trading Session Phases

Intent Trader operates within a structured trading day:

| Phase     | Cognitive Workflow | Time Frame        | Primary Commands                              |
|-----------|-------------------|-------------------|-----------------------------------------------|
| premarket | Plan, Focus       | Before market open | `/analyze-dp`, `/analyze-mancini-preprocessor`, `/analyze-mancini`, `/create-plan`, `/extract-focus`, `/extract-levels` |
| intraday  | Execute, Manage   | During market hours| `/add-position`, `/size-position`, `/update-position`, `/close-position`, `/list-positions` |
| postmarket| Review            | After market close | `/log-session` |
| utilities | Any               | Any time          | `/analyze-chart` |

## State Management

The system maintains state across these files:

- `state/session-manifest.json` - Session phase and metadata
- `state/my-positions.json` - Personal position tracking
- `state/moderator-positions.json` - IC moderator position tracking
- `state/trade-plan-state.json` - Current trade plan

## Command Routing Logic

When a command is received:

1. Match against `command-map.md` entries
2. Verify command is valid for current phase
3. Validate parameters using `validator.md` rules
4. Find plugin entry point from `plugin-registry.json`
5. Execute command via `plugin-dispatcher.js`
6. Return result or error

## System Status

The system provides current system state:

{
  "system": {
    "version": "0.5.1",
    "phase": "intraday",
    "sessionStarted": "2025-05-16T09:30:00Z"
  },
  "positions": {
    "active": 2,
    "closed": 1,
    "totalRisk": "$1,200"
  },
  "plan": {
    "created": "2025-05-16T09:15:00Z",
    "focusIdeas": 3,
    "technicalLevels": 12
  }
}

## Cognitive Workflow Support

The system is structured around the cognitive workflow:
- **Plan**: Morning call analysis and context-building
- **Focus**: Opportunity identification and prioritization
- **Execute**: Trade entry and position initiation
- **Manage**: Active position management
- **Review**: Performance analysis and learning

## Initialization Command

To initialize Intent Trader:

Please read and load ALL files from this ZIP archive.
Use system/runtime/runtime-agent.md as the routing layer for commands.
Use system/runtime/command-map.md to map valid commands.
Use state/session-manifest.json to determine the current session phase.
