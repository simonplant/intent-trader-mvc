---
id: command-routes-update-sop
title: Commands & Routes System Maintenance SOP
description: Standard operating procedure for updating the command system in Intent Trader
author: Intent Trader Team
version: 0.3.0
release: 0.5.2
created: 2025-05-16
updated: 2025-05-21
category: system
status: stable
tags: [sop, commands, maintenance, updates, system]
requires: []
outputs: []
input_format: none
output_format: markdown
ai_enabled: false
---

# Command System Maintenance SOP – Intent Trader

This SOP governs the full lifecycle of command creation, routing, documentation, and deprecation within the Intent Trader runtime system. It has been streamlined for speed, automation, and repeatability.

---

## 1. Scope and Structure

The following file groups must remain synchronized:

### 1.1 Documentation
* `docs/command-reference.md`
* `system/commands.md`

### 1.2 Routing and Runtime
* `system/runtime/command-map.md`
* `system/runtime/plugin-registry.json`
* `system/runtime/runtime-agent.md`
* `system/runtime/validator.md`
* `system/runtime/entrypoint.md`

### 1.3 Implementation
* `prompts/{phase}/{command-name}.md`

### 1.4 State
* `state/{relevant-files}.json`

---

## 2. Add a New Command (Recommended Path)

### Step 1: Run Scaffold Generator

Use or simulate:

```bash
/scaffold-command example-command plan analyzer
```

This creates all required boilerplate in memory:
* Markdown prompt front matter
* Plugin registry block
* Command map row
* Reference documentation
* Changelog snippet

### Step 2: Review & Apply Files

Paste each scaffolded block into its corresponding file:
* `prompts/plan/example-command.md`
* `plugin-registry.json`
* `command-map.md`
* `command-reference.md`
* `commands.md`
* `release-notes.md`

### Step 3: Confirm Runtime Integration

Run:

```bash
/reload-active-logic
```

This rebuilds the runtime routing and ensures recognition.

---

## 3. Modify Existing Command

* Edit `prompts/{phase}/{command}.md`
* Bump version and date in front matter
* Update registry and map with changed metadata
* Validate with `/sync-commands`

---

## 4. Deprecate or Remove Command

* Tag status as `deprecated` in front matter and `command-reference.md`
* Log migration path if applicable
* Remove from routing map and plugin registry when removed
* Archive or clean implementation file

---

## 5. Maintain Sync

Run `/sync-commands` to:
* Verify all commands have correct plugin and map entries
* Catch orphaned or undocumented commands
* Check version consistency

---

## 6. Release Checklist

Before tagging a new release:
* [ ] All changed files committed
* [ ] Commands updated in map, registry, and docs
* [ ] `/reload-active-logic` executed without error
* [ ] `/sync-commands` passes validation

---

## 7. Required Front Matter

All command files must include front matter according to our standard template:
* Reference: `system/templates/front-matter-template.md`
* Ensure all required fields are completed
* Maintain consistent version numbering
* Update the creation/modification dates

---

## 8. Troubleshooting

Common issues and solutions:
* **Command not found**: Verify entry in command-map.md and plugin-registry.json
* **Parameter validation errors**: Check validator.md for parameter rules
* **Execution failures**: Ensure entryPoint path in plugin-registry.json is correct
* **File sync issues**: Run `/sync-commands` to identify mismatches

---

## Notes
* All scaffold templates are maintained in `docs/runtime/command-scaffold-template.md`
* When updating templates, ensure all reference file sections remain aligned
