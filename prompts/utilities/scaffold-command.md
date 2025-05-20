---
id: scaffold-command
title: Command Scaffold Generator
description: Generates standardized boilerplate for new commands across all required files
author: Intent Trader Team
version: 0.2.1
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

This system command creates standardized boilerplate for new commands across all required Intent Trader system files to ensure consistency and reduce errors.

## Command Purpose

The /scaffold-command utility automates the creation of new command implementations by generating all required boilerplate files and entries in the command registry system. It ensures consistency across the Intent Trader system and reduces manual errors during command creation.

## Parameters

- command-name (required): Base name without the slash (e.g., "analyze-chart")
- phase (required): One of "plan", "focus", "execute", "manage", "review", "utility", "system"
- type (required): One of "analyzer", "action", "calculator", "transform", "report", "system", "preprocessor"
- description (optional): Brief description of command purpose

## Validation Rules

- If any required param is missing, return:
  { "error": "Missing required parameters. Usage: /scaffold-command [command-name] [phase] [type] \"description\"" }
- Log error to: logs/scaffold-errors.json
- Validate that phase and type are one of the accepted values
- If phase is omitted: default to "system"
- If type is omitted: default to "report"

## Processing Steps

1. Validate input parameters against allowed values
2. Generate command file template for prompts/{phase}/{command-name}.md
3. Generate plugin registry entry for plugin-registry.json
4. Generate command map entry for command-map.md
5. Generate command reference entry for command-reference.md
6. Generate commands list entry for commands.md
7. Generate release notes entry for release-notes.md
8. Return all generated templates with file paths for manual insertion or direct file writing

## Template Generation Logic

### 1. Command File Template

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
- param1: Description of parameter 1
- param2: Description of parameter 2

## Processing Steps
1. First processing step
2. Second processing step
3. Final processing step

## Output Format
{
  "success": true,
  "command": "{command-name}",
  "result": {
    "key1": "value1",
    "key2": "value2"
  },
  "message": "Operation completed successfully"
}

## Error Handling
- Handle parameter validation errors
- Handle processing errors
- Handle state errors

### 2. Plugin Registry Entry

{
  "id": "{command-name}",
  "type": "{type}",
  "version": "0.1.0",
  "entryPoint": "prompts/{phase}/{command-name}.md",
  "phase": "{phase}",
  "dependsOn": []
}

### 3. Command Map Entry

| /{command-name} | {description} | {phase} | {required parameters} | prompts/{phase}/{command-name}.md |

### 4. Command Reference Entry

#### /{command-name} [param1] [param2]

Purpose: {description}

Parameters:
- param1 (required): Description of parameter 1
- param2 (optional): Description of parameter 2

Output:
- Description of output 1
- Description of output 2

Implementation:
- Implementation detail 1
- Implementation detail 2

File Location: prompts/{phase}/{command-name}.md

Example:
/{command-name} param1="value1" param2="value2"

### 5. Commands.md Entry

### /{command-name} [param1] [param2]

Purpose: {description}

Parameters:
- param1 (required): Description of parameter 1
- param2 (optional): Description of parameter 2

Output:
- Description of output 1
- Description of output 2

Usage Example:
/{command-name} param1="value1" param2="value2"

### 6. Release Notes Entry

- Added /{command-name} command for {description}

## Output Format

{
  "success": true,
  "command": "scaffold-command",
  "result": {
    "commandName": "{command-name}",
    "phase": "{phase}",
    "type": "{type}",
    "templates": {
      "commandFile": {
        "path": "prompts/{phase}/{command-name}.md",
        "content": "..."
      },
      "pluginRegistryEntry": {
        "path": "system/runtime/plugin-registry.json",
        "content": "..."
      },
      "commandMapEntry": {
        "path": "system/runtime/command-map.md",
        "content": "..."
      },
      "commandReferenceEntry": {
        "path": "docs/command-reference.md",
        "content": "..."
      },
      "commandsEntry": {
        "path": "system/commands.md",
        "content": "..."
      },
      "releaseNotesEntry": {
        "path": "release-notes.md",
        "content": "..."
      }
    }
  },
  "message": "Command scaffold templates generated successfully. Add these to the appropriate files."
}

## Error Handling

- Validate phase is one of the allowed values
- Validate type is one of the allowed values
- Check that command name doesn't already exist in the registry
- Ensure command name follows naming convention
- Log any error output to logs/scaffold-errors.json