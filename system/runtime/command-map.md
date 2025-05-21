---
id: command-map
title: Intent Trader Command Map
description: Mapping of command routes to execution handlers
author: Intent Trader Team
version: 0.4.3
release: 0.5.2
created: 2025-05-16
updated: 2025-05-21
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

| Command                | Description                                       | Phase   | Input Required                         | File Path                                |
| ---------------------- | ------------------------------------------------- | ------- | -------------------------------------- | ---------------------------------------- |
| **PLAN PHASE**         |
| `/clean-dp-transcript` | Clean DP morning call transcript                  | plan    | transcript                             | prompts/plan/clean-dp-transcript.md      |
| `/analyze-dp`          | Process DP morning call                           | plan    | Transcript text                        | prompts/plan/analyze-dp.md               |
| `/summarize-mancini`   | Extract structured data from Mancini's newsletter | plan    | Newsletter text                        | prompts/plan/summarize-mancini.md        |
| `/analyze-mancini`     | Process Mancini newsletter summary                | plan    | Summary JSON from `/summarize-mancini` | prompts/plan/analyze-mancini.md          |
| **FOCUS PHASE**        |
| `/create-plan`         | Generate unified trade plan                       | focus   | None (uses analyzed call)              | prompts/focus/create-plan.md             |
| **EXECUTE PHASE**      |
| `/size-position`       | Calculate position size                           | execute | Symbol, entry, stop                    | prompts/execute/size-position.md         |
| `/add-position`        | Track new position                                | execute | Symbol and position details            | prompts/manage/add-position.md           |
| **MANAGE PHASE**       |
| `/update-position`     | Update position details                           | manage  | Symbol and updated metrics             | prompts/manage/update-position.md        |
| `/close-position`      | Close position and record outcome                 | manage  | Symbol and exit details                | prompts/manage/close-position.md         |
| `/list-positions`      | Show current positions                            | manage  | Optional filters                       | prompts/manage/list-positions.md         |
| **REVIEW PHASE**       |
| `/log-session`         | Record complete session data                      | review  | Date, conditions                       | prompts/review/log-session.md            |
| **UTILITIES**          |
| `/analyze-chart`       | Analyze chart patterns and levels                 | utility | Chart image, optional parameters       | prompts/utilities/analyze-chart.md       |
| **SYSTEM COMMANDS**    |
| `/help`                | Show available commands                           | system  | Optional command name                  | system/commands.md                       |
| `/status`              | Show current trading session state                | system  | None                                   | prompts/utilities/status.md              |
| `/reload-active-logic` | Flush context and reload runtime logic            | system  | none                                   | prompts/utilities/reload-active-logic.md |
| `/scaffold-command`    | Generate boilerplate for new commands             | system  | command-name, phase, type, description | prompts/utilities/scaffold-command.md    |
| `/sync-commands`       | Validate and sync command references              | system  | [fix], [verbose]                       | prompts/utilities/sync-commands.md       |
