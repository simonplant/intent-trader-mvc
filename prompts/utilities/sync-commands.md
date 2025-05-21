---
id: sync-commands
title: Command Synchronization Validator
description: Enforces alignment between command-map.md and all runtime systems: plugin registry, validators, routing, docs, and prompt files
author: Intent Trader Team
version: 0.5.0
release: 0.5.2
created: 2025-05-21
updated: 2025-05-21
category: system
status: stable
tags: [sync, validator, scaffolding, drift-detection, enforcement]
requires:
  [
    system/runtime/command-map.md,
    system/runtime/plugin-registry.json,
    system/runtime/runtime-agent.md,
    system/runtime/validator.md,
    prompts/**,
    system/commands.md,
    docs/runtime/command-reference.md,
    INSTALL.md,
    README.md
  ]
outputs: [logs/sync-drift.json]
input_format: command
output_format: json
ai_enabled: true
---

# Command Synchronization Validator

## Modes

- `/sync-commands`
  Perform a **read-only drift audit** from `command-map.md` to:

  - `plugin-registry.json`
  - `runtime-agent.md`
  - `validator.md`
  - `prompts/**`
  - `system/commands.md`
  - `docs/runtime/command-reference.md`
  - `INSTALL.md`
  - `README.md`

- `/sync-commands --fix`
  Identify and scaffold missing components using `/scaffold-command`. All scaffolding is written to a patch preview file.

- `/sync-commands --fix --apply`
  Applies safe patches automatically (requires user confirmation unless explicitly called).

---

## Drift Detection Criteria

A command is considered **drifted** if any of the following are true:

| Check                  | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| `plugin-registry`      | Command missing from `plugin-registry.json` or incorrect phase/type |
| `runtime-agent`        | Missing from `runtime-agent.md`                                     |
| `validator`            | Absent or out-of-date validation block in `validator.md`            |
| `prompt`               | Missing expected handler at `prompts/{phase}/{command-name}.md`     |
| `commands.md`          | Missing from system-wide command listing                            |
| `command-reference.md` | Not referenced in `docs/runtime/command-reference.md`               |
| `INSTALL.md`           | Omitted from runtime enforcement notes                              |
| `README.md`            | Missing from public docs if core/system command                     |

---

## Output Format

```json
{
  "status": "drift-detected",
  "drift": [
    {
      "command": "reload-active-logic",
      "missing": [
        "plugin-registry",
        "validator",
        "README.md"
      ],
      "scaffolded": {
        "pluginRegistryEntry": "...",
        "validatorBlock": "...",
        "promptExists": true
      }
    }
  ],
  "patchLog": "logs/sync-drift.json",
  "autoFixMode": true,
  "errors": []
}


⸻

Fix Mode Behavior (--fix)
	1.	Uses command-map.md as the source of truth
	2.	Detects and documents missing components in all runtime files
	3.	Automatically scaffolds missing:
	•	Plugin registry blocks
	•	Validator rules
	•	Prompt file stubs
	•	Command map declarations
	•	Docs and README anchors
	4.	Writes to logs/sync-drift.json
	5.	Only applies patches on --apply

⸻

Error Handling
	•	Any failure to scaffold will be logged as:

{ "command": "status", "error": "Failed to scaffold validator block: Reason" }

	•	Never overwrites existing files unless explicitly instructed

⸻

Use in CI Enforcement

Run /sync-commands --fix before merge to detect drift.
Run /sync-commands --fix --apply during deploy or dev sync.

⸻

SOP: Maintain Command Integrity
	•	command-map.md is the canonical source of truth.
	•	All runtime components must stay aligned or the system enters soft-failure mode.
	•	Manual patches are allowed, but must be reflected in future command-map entries or will be flagged as drift.

⸻

Example

/sync-commands               # dry-run audit
/sync-commands --fix         # detect + scaffold drift patches
/sync-commands --fix --apply # apply patches directly
```
