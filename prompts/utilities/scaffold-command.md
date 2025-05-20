---
id: scaffold-command
title: Command Scaffold Generator
description: Generates standardized boilerplate for new commands across all required files with optional silent mode
author: Intent Trader Team
version: 0.3.2
release: 0.5.1
created: 2025-05-21
updated: 2025-05-21
category: utility
status: stable
tags: [utility, automation, scaffolding, commands]
requires: [system/templates/front-matter-template.md, system/runtime/command-map.md, system/runtime/plugin-registry.json]
outputs: [logs/scaffold-errors.json]
input_format: command
output_format: json
ai_enabled: true
---

# Command Scaffold Generator

## Command Purpose

The /scaffold-command utility automates the creation of new command implementations by generating all required boilerplate files and entries in the command registry system. It ensures consistency across the Intent Trader system and reduces manual errors during command creation.

---

## Parameters

- command-name (required): Name without slash (e.g., "analyze-chart")
- phase (required unless inferred): One of: plan, focus, execute, manage, review, utility, system
- type (required unless inferred): One of: analyzer, action, calculator, transform, report, system, preprocessor
- description (optional): Brief description
- mode (optional): `json` for silent API use (default: interactive)
- force (optional): `true` to overwrite existing files (default: false)

---

## Invocation Modes

- Interactive: `/scaffold-command analyze-chart plan analyzer`
- Programmatic: `/scaffold-command status --phase=system --type=report --mode=json --force=false`

---

## Output Format (JSON mode)

{
  "commandName": "status",
  "scaffolded": {
    "pluginRegistryEntry": "JSON block...",
    "validatorEntry": "JSON block...",
    "commandMapEntry": "Markdown block...",
    "referenceEntry": "Markdown block...",
    "commandsEntry": "Markdown block...",
    "releaseNotesEntry": "Markdown block...",
    "promptFile": "EXISTS | GENERATED"
  },
  "errors": [],
  "warnings": [],
  "success": true
}

---

## Generated Artifacts

### 1. Prompt Implementation

---
id: {command-name}
title: {Title Case Command Name}
description: {description or "Command for {command-name}"}
author: Intent Trader Team
version: 0.1.0
release: {current-release}
created: {current-date}
updated: {current-date}
category: command
status: beta
tags: [command, {phase}, {type}]
requires: []
outputs: []
input_format: command
output_format: json
ai_enabled: true
---

# {Title Case Command Name}

## Command Purpose
{description}

## Parameters
- param1: Description
- param2: Description

## Processing Steps
1. Step 1
2. Step 2

## Output Format
{
  "success": true,
  "command": "{command-name}",
  "result": { "key1": "value1" },
  "message": "Completed"
}

---

### 2. Plugin Registry Entry

{
  "id": "{command-name}",
  "type": "{type}",
  "version": "0.1.0",
  "entryPoint": "prompts/{phase}/{command-name}.md",
  "phase": "{phase}",
  "dependsOn": []
}

---

### 3. Command Map Entry

| /{command-name} | {description} | {phase} | {required parameters} | prompts/{phase}/{command-name}.md |

---

### 4. Command Reference Entry

#### /{command-name} [param1] [param2]

**Purpose:** {description}

**Parameters:**
- param1: Required
- param2: Optional

**Output:**
- Description 1
- Description 2

**Location:** `prompts/{phase}/{command-name}.md`

---

### 5. Commands.md Entry

### /{command-name} [param1] [param2]

**Purpose:**
{description}

**Parameters:**
- param1
- param2

**Output:**
- Description 1
- Description 2

**Usage Example:**
/{command-name} param1="value1" param2="value2"

---

### 6. Release Notes Entry

- Added /{command-name} command for {description}

---

## Error Handling

- If phase or type missing and cannot be inferred, log to `logs/scaffold-errors.json`
- If file exists and `force=false`, skip generation and return `EXISTS`
- Always return full structured output in `--mode=json`

---

## Internal Use by `/sync-commands`

- Supports headless execution with full patch output
- Used to fill missing plugin, map, or validator entries
- Does not write files unless explicitly requested

---