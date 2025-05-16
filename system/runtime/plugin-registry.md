---
id: plugin-registry
title: Plugin Registry Documentation
description: Documentation for the plugin architecture of Intent Trader
author: Intent Trader Team
version: 0.1.0
release: 0.5.1
created: 2025-05-16
updated: 2025-05-16
category: system
status: stable
tags: [system, plugins, registry, architecture]
requires: [system/runtime/plugin-registry.json]
outputs: []
input_format: none
output_format: markdown
ai_enabled: false
---

# Plugin Registry Specification

Defines the modular plugin architecture for Intent Trader's command execution system.

## Plugin Metadata Schema

```json
{
  "id": "command-name",         // Command identifier (without the slash)
  "type": "analyzer|action|calculator|transform|report|system",
  "version": "0.5.1",           // Version number
  "entryPoint": "path/to/file.md", // Relative path to command implementation
  "phase": "premarket|intraday|postmarket|any", // Trading session phase
  "dependsOn": []               // Array of dependency command IDs
}
```

## Plugin Types

- `analyzer`: Processes information and returns structured analysis
- `action`: Performs an action that changes system state
- `calculator`: Computes values based on inputs
- `transform`: Converts data from one format to another
- `report`: Generates human-readable reports
- `system`: Core system functionality

## Lifecycle Support

### Phase Definitions
- `premarket`: Commands for morning preparation (Plan and Focus phases)
- `intraday`: Commands for active trading (Execute and Manage phases)
- `postmarket`: Commands for end-of-day review (Review phase)
- `any`: Commands available in any phase

## Current Registry Contents

Intent Trader v0.5.1 includes the following commands:

### Plan Phase Commands
- `analyze-dp`: Process DP morning call
- `create-plan`: Generate unified trade plan

### Focus Phase Commands
- `extract-focus`: Extract high-conviction trade ideas
- `extract-levels`: Extract key technical levels

### Execute Phase Commands
- `add-position`: Track new position
- `size-position`: Calculate position size
- `list-positions`: Show current positions

### Manage Phase Commands
- `update-position`: Update position details
- `close-position`: Close position and record outcome

### Review Phase Commands
- `log-session`: Record complete session data

### System Commands
- `help`: Show available commands
- `status`: Show current trading session state

## Future Commands (v0.5.2)

The following commands are planned for v0.5.2:

- `analyze-mancini`: Process Mancini newsletter
- `adjust-stop`: Modify stop loss level
- `trim-position`: Execute partial exit
- `manage-runner`: Apply runner management protocol
- `run-debrief`: Comprehensive session analysis
- `mode-detect`: Determine market mode

## Plugin Organization

The plugin system is organized around the cognitive workflow:
- **Plan → Focus → Execute → Manage → Review**

This structure ensures that plugins naturally support the trading process from preparation to execution to review.
