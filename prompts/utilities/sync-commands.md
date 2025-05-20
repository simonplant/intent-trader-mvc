---
id: sync-commands
title: Command Consistency Validator
description: Validates command map, plugin registry, and validators — with optional drift remediation
author: Intent Trader Team
version: 0.3.1
release: 0.5.1
created: 2025-05-20
updated: 2025-05-20
category: system
status: stable
tags: [sync, validator, scaffolding, integrity]
requires: [system/runtime/command-map.md, system/runtime/plugin-registry.json, system/runtime/validator.md]
outputs: [logs/sync-drift.json]
input_format: command
output_format: json
ai_enabled: true
---

# Command Synchronization Validator

## Modes

- `/sync-commands`
  → Dry-run validator (read-only; no writes)

- `/sync-commands --fix`
  → Detects drift and auto-generates missing components using `/scaffold-command`

---

## Drift Detection Criteria

A command is considered out-of-sync if:
- It appears in `command-map.md` but not in `plugin-registry.json`
- It has no entry in `validator.md`
- It lacks a prompt implementation file in `prompts/{phase}/{command-name}.md`

---

## Fix Mode Behavior (`--fix`)

When run in fix mode:
1. Identifies all commands with missing components
2. Uses `command-map.md` as source of truth
3. Runs `/scaffold-command` behind the scenes
4. Generates:
   - Plugin registry patch
   - Validator patch
   - Prompt template (if missing)
   - Entry stubs for `command-reference.md`, `commands.md`, and `release-notes.md`
5. Writes these to:
   - `logs/sync-drift.json` (preview)
   - Optionally inserts patches if `--apply` is passed

---

## Example Usage

```bash
/sync-commands                    # dry-run
/sync-commands --fix              # generate patch blocks
/sync-commands --fix --apply      # patch files immediately (requires confirmation)


⸻

Output Structure

{
  "status": "drift-detected",
  "drift": [
    {
      "command": "status",
      "missing": ["plugin-registry", "validator"],
      "scaffolded": {
        "pluginRegistryEntry": "...",
        "validatorEntry": "...",
        "promptFile": "EXISTS"
      }
    }
  ],
  "patchLog": "logs/sync-drift.json",
  "autoFixMode": true
}


⸻

Error Handling
	•	If scaffold-command fails for any entry, logs it under errors
	•	Never overwrites existing files unless --apply is explicitly set

---

## ✅ 2. SOP Patch: Section 5 – Maintain Sync

Replace the current section with:

5. Maintain Sync

Use /sync-commands to validate command infrastructure consistency.
• Dry-run mode (default) checks:
• Missing plugin registry or validator entries
• Orphaned files or undocumented commands
• Version inconsistencies
• Fix mode (--fix) auto-generates missing pieces using /scaffold-command:
• Missing plugin registry and validator entries
• Missing prompt files
• Outputs suggested patches to logs/sync-drift.json
• Apply mode (--fix --apply) writes changes directly to disk after validation

Example:

/sync-commands --fix            # Detect and scaffold missing entries
/sync-commands --fix --apply    # Apply all safe patches automatically

This allows teams to sync drifted systems quickly while preserving manual control.
