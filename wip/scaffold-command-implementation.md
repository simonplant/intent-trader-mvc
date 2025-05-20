---
id: scaffold-command
title: Command Scaffold Implementation
description: Implementation for command scaffolding and synchronization
author: Intent Trader Team
version: 0.1.0
release: 0.5.2
created: 2025-05-21
updated: 2025-05-21
category: system
status: beta
tags: [system, automation, scaffolding, commands]
requires: [system/templates/front-matter-template.md, system/runtime/command-map.md, system/runtime/plugin-registry.json]
outputs: [prompts/system/scaffold-command.md, prompts/system/sync-commands.md]
input_format: none
output_format: markdown
ai_enabled: true
---

# Command Scaffold and Sync Implementation

This master prompt controls the implementation of two key automation commands for the Intent Trader system:
1. `/scaffold-command` - Generates boilerplate for new commands
2. `/sync-commands` - Validates and synchronizes command references across all files

## 1. `/scaffold-command` Implementation

### Purpose
Creates standardized boilerplate for new commands across all required files to ensure consistency and reduce errors.

### Command Structure
```
/scaffold-command <command-name> <phase> <type> [description]
```

### Parameters
- `command-name`: Base name without the slash (e.g., "analyze-chart")
- `phase`: One of "plan", "focus", "execute", "manage", "review", "utility", "system"
- `type`: One of "analyzer", "action", "calculator", "transform", "report", "system", "preprocessor"
- `description` (optional): Brief description of command purpose

### Implementation

#### 1. Command File Template (`prompts/{phase}/{command-name}.md`)
```md
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
- `param1`: Description of parameter 1
- `param2`: Description of parameter 2

## Processing Steps
1. First processing step
2. Second processing step
3. Final processing step

## Output Format
```json
{
  "success": true,
  "command": "{command-name}",
  "result": {
    "key1": "value1",
    "key2": "value2"
  },
  "message": "Operation completed successfully"
}
```

## Error Handling
- Handle parameter validation errors
- Handle processing errors
- Handle state errors
```

#### 2. Plugin Registry Entry (`plugin-registry.json`)
```json
{
  "id": "{command-name}",
  "type": "{type}",
  "version": "0.1.0",
  "entryPoint": "prompts/{phase}/{command-name}.md",
  "phase": "{phase}",
  "dependsOn": []
}
```

#### 3. Command Map Entry (`command-map.md`)
```
| `/{command-name}` | {description} | {phase} | {required parameters} | prompts/{phase}/{command-name}.md |
```

#### 4. Command Reference Entry (`command-reference.md`)
```md
#### `/{command-name} [param1] [param2]`

**Purpose:** {description}

**Parameters:**
* `param1` (required): Description of parameter 1
* `param2` (optional): Description of parameter 2

**Output:**
* Description of output 1
* Description of output 2

**Implementation:**
* Implementation detail 1
* Implementation detail 2

**File Location:**
* `prompts/{phase}/{command-name}.md`

**Example:**
/{command-name} param1="value1" param2="value2"
```

#### 5. Release Notes Entry (`release-notes.md`)
```md
- Added `/{command-name}` command for {description}
```

### Implementation Steps
1. Parse command input
2. Load templates
3. Replace template variables
4. Output to console or files as requested
5. Verify command doesn't already exist
6. Provide preview option before writing files

---

## 2. `/sync-commands` Implementation

### Purpose
Validates that all command definitions are consistent across all system files and identifies discrepancies.

### Command Structure
```
/sync-commands [fix] [verbose]
```

### Parameters
- `fix` (optional): Automatically fix discrepancies where possible
- `verbose` (optional): Show detailed report of all checks

### Implementation

#### 1. Consistency Checks
- All commands in `command-map.md` are present in `plugin-registry.json`
- All commands in `plugin-registry.json` have a corresponding file at `entryPoint`
- All commands in `command-reference.md` match those in `command-map.md`
- All file paths are consistent between `command-map.md` and `plugin-registry.json`
- All commands share the same phase assignment across files
- All command types in `plugin-registry.json` match those in front matter
- All version numbers are consistent or newer in implementation files

#### 2. Orphan Detection
- Find command files not referenced in `command-map.md` or `plugin-registry.json`
- Find commands in `command-map.md` or `plugin-registry.json` without implementation files
- Find commands in `runtime-agent.md` not present in other files

#### 3. Fix Operations (with `fix` parameter)
- Update `runtime-agent.md` supported commands list from `command-map.md`
- Align file paths between `command-map.md` and `plugin-registry.json`
- Add missing registry entries for commands found in `command-map.md`
- Standardize phase naming across files

#### 4. Output Format
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
      }
    ]
  },
  "message": "Command sync completed. 3 issues found, 2 fixed automatically."
}
```

### Implementation Steps
1. Load all relevant system files
2. Parse and extract command definitions
3. Compare definitions across files
4. Generate inconsistency report
5. Apply fixes if requested
6. Output results

---

## Implementation Plan

1. Create the prompt files:
   - `prompts/system/scaffold-command.md`
   - `prompts/system/sync-commands.md`

2. Add entries to:
   - `plugin-registry.json`
   - `command-map.md`
   - `command-reference.md`

3. Update `runtime-agent.md` to include these system commands

4. Test with sample invocations

This implementation will provide robust tooling to maintain consistency across the Intent Trader command system.
