---
id: plugin-registry
title: Plugin Registry Documentation
description: Documentation for the plugin architecture of Intent Trader
author: Intent Trader Team
version: 0.1.2
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
- `plan`: Commands for morning analysis and market context development, typically run before market open
- `focus`: Commands for opportunity identification and trade plan creation, usually completed before trading begins
- `execute`: Commands for trade entry and position initialization during active market hours
- `manage`: Commands for active position management and adjustment throughout the trading session
- `review`: Commands for performance analysis and session evaluation, typically run after market close
- `coach`: Commands for skill development, pattern recognition, and trading improvement over time
- `any`: Commands available in any phase of the trading workflow

## Current Registry Contents

Intent Trader v0.5.1 includes the following commands:

### Plan Phase Commands
- `analyze-dp`: Process DP morning call transcript comprehensively, extracting all key components and insights
- `analyze-mancini-preprocessor`: Preprocess Mancini's long newsletter content for detailed analysis in a two-stage process
- `analyze-mancini`: Process Mancini newsletter comprehensively, extracting levels, setups, and trade plan

### Focus Phase Commands
- `create-plan`: Generate comprehensive unified trade plan integrating multiple analyst inputs
- `extract-focus`: Extract high-conviction trade ideas from analyst commentary
- `extract-levels`: Extract market levels from analyst source with precision and hierarchy

### Execute Phase Commands
- `size-position`: Calculate appropriate position size based on risk parameters
- `add-position`: Add a new trading position to tracking system

### Manage Phase Commands
- `update-position`: Update an existing position with new information or parameters
- `close-position`: Close a position and record the outcome
- `list-positions`: Display all current positions with status and management information

### Review Phase Commands
- `log-session`: Create a comprehensive log entry for a complete trading session, including trades, market conditions, and performance analysis

### Utilities Commands
- `analyze-chart`: Analyze a chart image to identify key patterns, levels, and trading opportunities across different timeframes

## Plugin Organization

The plugin system is organized around the cognitive workflow:
- **Plan → Focus → Execute → Manage → Review**
