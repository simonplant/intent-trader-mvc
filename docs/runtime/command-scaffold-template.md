---
id: command-scaffold-template
title: Command Scaffold Template
description: Template for generating new command boilerplate
author: Intent Trader Team
version: 0.1.0
release: 0.5.2
created: 2025-05-21
updated: 2025-05-21
category: template
status: stable
tags: [template, commands, scaffolding]
requires: []
outputs: []
input_format: none
output_format: markdown
ai_enabled: false
---

# Command Scaffold Template

This template defines the structure for generating new command files and entries across the Intent Trader system.

## Command Implementation Template

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

## Plugin Registry Entry Template

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

## Command Map Entry Template

```markdown
| `/{command-name}` | {description} | {phase} | {required parameters} | prompts/{phase}/{command-name}.md |
```

## Command Reference Entry Template

```markdown
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

## Commands.md Entry Template

```markdown
### `/{command-name} [param1] [param2]`

**Purpose:**
{description}

**Parameters:**
- `param1` (required): Description of parameter 1
- `param2` (optional): Description of parameter 2

**Output:**
- Description of output 1
- Description of output 2

**Usage Example:**
/{command-name} param1="value1" param2="value2"
```

## Release Notes Entry Template

```markdown
- Added `/{command-name}` command for {description}
```

## Template Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{command-name}` | Command identifier without slash | analyze-chart |
| `{Title Case Command Name}` | Title-cased name for headings | Analyze Chart |
| `{description}` | Brief description of command purpose | Analyze chart patterns and signals |
| `{current-release}` | Current system release version | 0.5.2 |
| `{current-date}` | Current date in YYYY-MM-DD format | 2025-05-21 |
| `{phase}` | Command workflow phase | plan, focus, execute, manage, review, utility, system |
| `{type}` | Command functional type | analyzer, action, calculator, transform, report, system, preprocessor |
| `{required parameters}` | Command parameters list | symbol, timeframe, [type] |
