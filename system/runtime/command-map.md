---
id: command-map
title: Intent Trader Command Map
description: Mapping of command routes to execution handlers
author: Intent Trader Team
version: 0.1.0
release: 0.5.1
created: 2025-05-16
updated: 2025-05-16
category: system
status: stable
tags: [system, routing, commands]
requires: [system/runtime/plugin-registry.json]
outputs: []
input_format: none
output_format: markdown
ai_enabled: false
---

# Intent Trader Command Map

This file defines the routing and execution logic for all Intent Trader commands.

## Command Structure

| Command              | Description                                       | Phase        | Input Required                        | File Path                      |
|----------------------|---------------------------------------------------|--------------|--------------------------------------|--------------------------------|
| **PLAN PHASE**                                                                                                              |
| `/analyze-dp`        | Process DP morning call                           | plan         | Transcript text                       | prompts/plan/analyze-dp.md     |
| `/create-plan`       | Generate unified trade plan                       | plan         | None (uses analyzed call)             | prompts/focus/create-plan.md   |
| **FOCUS PHASE**                                                                                                             |
| `/extract-focus`     | Extract high-conviction trade ideas               | focus        | Source (dp), min_conviction           | prompts/focus/extract-focus.md |
| `/extract-levels`    | Extract key technical levels                      | focus        | Source (dp), indices                  | prompts/focus/extract-levels.md|
| **EXECUTE PHASE**                                                                                                           |
| `/add-position`      | Track new position                                | execute      | Symbol and position details           | prompts/manage/add-position.md |
| `/size-position`     | Calculate position size                           | execute      | Symbol, entry, stop                   | prompts/execute/size-position.md|
| `/list-positions`    | Show current positions                            | execute      | Optional filters                      | prompts/manage/list-positions.md|
| **MANAGE PHASE**                                                                                                            |
| `/update-position`   | Update position details                           | manage       | Symbol and updated metrics            | prompts/manage/update-position.md|
| `/close-position`    | Close position and record outcome                 | manage       | Symbol and exit details               | prompts/manage/close-position.md|
| **REVIEW PHASE**                                                                                                            |
| `/log-session`       | Record complete session data                      | review       | Date, conditions                      | prompts/execute/log-session.md |
| **SYSTEM COMMANDS**                                                                                                         |
| `/help`              | Show available commands                           | system       | Optional command name                 | system/commands.md             |
| `/status`            | Show current trading session state                | system       | None                                  | system/runtime/entrypoint.md   |

## Phase Triggers

| Phase        | Command                | Triggered Components                              |
|--------------|------------------------|---------------------------------------------------|
| premarket    | `/run-phase premarket` | `analyze-dp`, `create-plan`                       |
| intraday     | `/run-phase intraday`  | Position management commands                      |
| postmarket   | `/run-phase postmarket`| `log-session`                                     |

## Reserved for v0.5.2

The following commands are planned for v0.5.2 but not implemented in the MVP:

| Command              | Description                                       | Phase        | Status                             |
|----------------------|---------------------------------------------------|--------------|-----------------------------------|
| `/analyze-mancini`   | Process Mancini newsletter                        | plan         | Planned for v0.5.2                |
| `/adjust-stop`       | Modify stop loss level                            | manage       | Planned for v0.5.2                |
| `/trim-position`     | Execute partial exit                              | manage       | Planned for v0.5.2                |
| `/manage-runner`     | Apply runner management protocol                  | manage       | Planned for v0.5.2                |
| `/run-debrief`       | Comprehensive session analysis                    | review       | Planned for v0.5.2                |
| `/mode-detect`       | Determine market mode                             | plan         | Planned for v0.5.2                |
