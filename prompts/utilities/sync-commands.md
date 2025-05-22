---
id: sync-commands
title: Command Synchronization Validator
description: Enforces alignment between command-map.md and all runtime systems: plugin registry, validators, routing, docs, and prompt files
author: Intent Trader Team
version: 0.5.3
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

- `/sync-commands --diff`
  Shows proposed patch diff without applying.

- `/sync-commands --continue`
  Runs audit and scaffolding without halting on first error.

- `/sync-commands --strict`
  Treats empty or malformed blocks (e.g. validator) as drift.

- `/sync-commands --skip-cache`
  Ignores drift cache and forces full re-evaluation.

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
      "command": "sync-commands",
      "missing": [
        "plugin-registry",
        "runtime-agent",
        "validator",
        "commands.md",
        "command-reference.md",
        "INSTALL.md",
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
```

---

## Fix Mode Behavior (`--fix`, `--apply`, `--diff`)

1. Uses `command-map.md` as the source of truth.
2. Detects and documents missing or malformed components.
3. Scaffolds:

   - Plugin registry entries
   - Validator blocks
   - Prompt file stubs (if missing)
   - Routing table lines in `runtime-agent.md`
   - Entries in `system/commands.md`, `INSTALL.md`, `README.md`, and `command-reference.md`

4. Writes output to `logs/sync-drift.json`
5. If `--apply` is passed, will attempt to patch all files unless locked.
6. Patch diff can be viewed via `--diff` before commit.

---

## Error Handling

- All errors are logged with precise reason.
- No file is overwritten unless `--apply` is explicitly passed.
- Errors do **not halt execution** if `--continue` is passed.

---

## Annotations (inside `command-map.md`)

You may explicitly mark any command with the following:

```yaml
sync: false # skip sync/enforcement for this command
```

---

## Use in CI Enforcement

- Run `/sync-commands --fix` pre-merge to detect drift.
- Run `/sync-commands --fix --apply` during deployment.
- Use `--diff` in preview pipelines.

---

## SOP: Maintain Command Integrity

- `command-map.md` is the **single source of truth**.
- All other runtime and documentation artifacts must stay aligned.
- Manual drift is allowed only if flagged with `sync: false`.
- Unacknowledged drift will be flagged on every CI pass until resolved.
