---
id: sync-commands
title: Command System Synchronization
description: Validates that all command definitions are consistent across system files
author: Intent Trader Team
version: 0.1.0
release: 0.5.2
created: 2025-05-21
updated: 2025-05-21
category: utility
status: beta
tags: [utility, automation, validation, commands, sync]
requires: [system/runtime/command-map.md, system/runtime/plugin-registry.json, docs/command-reference.md]
outputs: []
input_format: command
output_format: json
ai_enabled: true
---

# Command System Synchronization

This system command validates that all command definitions are consistent across all Intent Trader system files and identifies discrepancies.

## Command Purpose

The `/sync-commands` utility ensures command definitions are consistent across the Intent Trader system by validating all command references and checking for inconsistencies or orphaned files. It can optionally fix common issues automatically.

## Parameters

- `fix` (optional): Automatically fix discrepancies where possible (default: false)
- `verbose` (optional): Show detailed report of all checks (default: false)

## Processing Steps

1. Load all relevant system files:
   - `system/runtime/command-map.md`
   - `system/runtime/plugin-registry.json`
   - `docs/command-reference.md`
   - `system/commands.md`
   - `system/runtime/runtime-agent.md`
   - Implementation files in `prompts/` directory

2. Extract and parse command definitions from each file:
   - Command map routes
   - Plugin registry entries
   - Command reference documentation
   - Runtime agent supported commands
   - Command implementation front matter

3. Perform consistency checks:
   - All commands in `system/runtime/command-map.md` are present in `system/runtime/plugin-registry.json`
   - All commands in `system/runtime/plugin-registry.json` have a corresponding file at `entryPoint`
   - All commands in `docs/command-reference.md` match those in `system/runtime/command-map.md`
   - All commands in `system/commands.md` match those in `system/runtime/command-map.md`
   - All file paths are consistent between `system/runtime/command-map.md` and `system/runtime/plugin-registry.json`
   - All commands share the same phase assignment across files
   - All command types in `system/runtime/plugin-registry.json` match those in front matter
   - All version numbers are consistent or newer in implementation files

4. Detect orphaned files or commands:
   - Command files not referenced in `system/runtime/command-map.md` or `system/runtime/plugin-registry.json`
   - Commands in `system/runtime/command-map.md` or `system/runtime/plugin-registry.json` without implementation files
   - Commands in `system/runtime/runtime-agent.md` not present in other files
   - Commands missing from `docs/command-reference.md` or `system/commands.md`

5. Apply fixes if requested:
   - Update `system/runtime/runtime-agent.md` supported commands list from `system/runtime/command-map.md`
   - Align file paths between `system/runtime/command-map.md` and `system/runtime/plugin-registry.json`
   - Add missing registry entries for commands found in `system/runtime/command-map.md`
   - Standardize phase naming across files
   - Update missing entries in `docs/command-reference.md` and `system/commands.md`

6. Generate comprehensive report

## Output Format

```json
{
  "success": true,
  "command": "sync-commands",
  "result": {
    "commandsAnalyzed": 15,
    "inconsistenciesFound": 3,
    "orphanedFiles": 1,
    "fixesApplied": 2,
    "details": [
      {
        "type": "inconsistency",
        "command": "example-command",
        "issue": "Phase mismatch: 'utility' vs 'utilities'",
        "fixed": true
      },
      {
        "type": "orphan",
        "command": "old-command",
        "issue": "Command implementation found at prompts/review/old-command.md but not referenced in registry",
        "fixed": false
      },
      {
        "type": "missing",
        "command": "new-command",
        "issue": "Command referenced in command-map.md but implementation file not found",
        "fixed": false
      }
    ]
  },
  "message": "Command sync completed. 3 issues found, 2 fixed automatically."
}
```

## Consistency Check Details

### Required Consistency Rules

1. **Registry-Map Consistency**: All commands in the command map must have a corresponding entry in the plugin registry with matching:
   - Command ID
   - Phase assignment
   - File path reference

2. **Implementation Existence**: All commands in the registry must have an existing implementation file at the specified path

3. **Documentation Coverage**: All commands in the map/registry should be documented in:
   - `docs/command-reference.md`
   - `system/commands.md`

4. **Phase Consistency**: The phase assigned in the registry must match the phase in:
   - Command map
   - Implementation file front matter
   - Directory structure

5. **Type Consistency**: The command type in the registry must match the type in the implementation file front matter

6. **Version Alignment**: Version numbers should be consistent or implementation files should have newer versions than registry entries

### Fix Operations

When `fix` parameter is true, the system will attempt to correct these issues:

1. Update `system/runtime/runtime-agent.md` supported commands list from `system/runtime/command-map.md`
2. Align file paths between `system/runtime/command-map.md` and `system/runtime/plugin-registry.json`
3. Add missing registry entries for commands found in `system/runtime/command-map.md`
4. Standardize phase naming across files
5. Update command reference entries in `docs/command-reference.md` and `system/commands.md` from implementation file front matter

## Error Handling

- Report file access errors
- Report parsing errors for each file type
- Provide detailed diagnostics for each inconsistency
- Skip fixes that could result in data loss
