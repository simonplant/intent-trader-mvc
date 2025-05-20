---
id: plan-v0.5.2
title: Intent Trader v0.5.2 – Canonical Schema, System Refactor & Command Interface Enhancement
description: Foundation release to define canonical schema, unify prompt metadata, validate runtime state, remove legacy assets, and improve command interfaces
author: Simon Plant
version: 0.3.0
release: 0.5.2
created: 2025-05-20
updated: 2025-05-20
category: system
status: final
tags: [schema, prompts, refactor, validation, claude-compatibility, command-interface]
requires: [system/schemas/trading-intent.schema.json, system/runtime/plugin-registry.json]
outputs: [system/state/trade-plan-state.json, system/state/my-positions.json, system/state/command-presets.json]
input_format: markdown
output_format: markdown
ai_enabled: true
---

# Intent Trader Plan v0.5.2 — Canonical Schema, System Refactor & Command Interface Enhancement

## Purpose

This foundational release standardizes schemas, prompt metadata, and runtime files while also enhancing the command interface for improved usability. It minimizes tech debt, shrinks prompt sizes for Claude compatibility, prepares the system for fast iteration in v0.5.3 and v0.5.4, and reduces friction in day-to-day operations through command interface improvements.

---

## Core Deliverables

### 1. Canonical Schema

- [ ] Define `system/schemas/trading-intent.schema.json`
  - Supports trade ideas, positions, execution logs, session state, and behavioral metadata
  - Use `schemaVersion`, `id`, `source` on all major objects
  - Limit to ≤ 4 nested levels for Claude compatibility

### 2. Prompt Alignment

- [ ] Standardize front matter across all prompt files using `front-matter-template.md`
- [ ] Enforce presence of: `id`, `title`, `version`, `release`, `requires`, `inputs`, `outputs`, `examples`
- [ ] Normalize layout sections: Purpose, Inputs, Output, Prompt Logic, Example
- [ ] Strip all emojis and decorative Unicode

### 3. File + Command Cleanup

- [ ] Remove deprecated or unused prompts and scripts
- [ ] Collapse prompt variants (e.g. `create-plan-alt`)
- [ ] Apply one-file-per-intent enforcement
- [ ] Remove markdown fluff, visual art, comments, emoji

### 4. Repo Hygiene + Restructure

- [ ] Move planning and docs (`plan-v*.md`, `backlog.md`) to `/docs/` or separate repo
- [ ] Archive logs and session replays to `/archive/`
- [ ] Final structure:

```
/prompts/
  /plan/
  /review/
  /focus/
  /execute/
  /conviction/
  /manage/
  /utilities/       # New directory for command utilities
/system/
  /schemas/
  /state/
  /runtime/
  /model/
/tests/
  validate-prompts.test.js
  schema-roundtrip.test.js
  command-helpers.test.js    # New test for command helpers
/scripts/
/docs/
  /guides/                   # New guides directory
/archive/
```

### 5. Claude Optimization

- [ ] Limit all prompt and schema files to ~20K tokens max
- [ ] Compact all examples, remove bloat
- [ ] Avoid large inline JSON unless necessary
- [ ] Use simple field names and flat structures

### 6. Schema Enforcement & Validation

- [ ] Implement `validateOutput()` hook in runtime
- [ ] Add test suite: `tests/validate-prompts.test.js`
  - Validate output examples from all prompts
  - Ensure conformance to schema
- [ ] Lock schema version references in all state files
- [ ] Add recovery defaults for partially corrupted state

### 7. Command Interface Enhancements

- [ ] Command Helpers Framework (5 Points)
  - Implement `/build-command` helper for template generation
  - Create command shortcuts for high-frequency commands
  - Update command registry to support shortcuts

- [ ] Parameter Management System (8 Points)
  - Enhance plugin registry with parameter metadata
  - Implement default parameter handling
  - Create parameter validation feedback system

- [ ] Command Preset System (5 Points)
  - Design preset storage and retrieval system
  - Implement preset management commands
  - Add preset suggestions to command documentation

- [ ] Form-Based Input Interface (5 Points)
  - Create `/form` command for interactive input
  - Design multi-turn form interaction
  - Implement form state management

- [ ] Integration and Documentation (3 Points)
  - Update command documentation with shortcuts and presets
  - Create quick reference card for command helpers
  - Add user guides for command interface features

---

## Implementation Phases

### Phase 1: Setup Orchestration Framework
- [ ] Create `wip/refinement-plan.md` as central todo list
- [ ] Define task templates for common refactoring patterns
- [ ] Establish workflow states and transition criteria
- [ ] Set up artifact storage for working copies
- [ ] Create progress tracking mechanism
- [ ] Add command interface improvements to refinement plan

### Phase 2: Initial Assessment and Prioritization
- [ ] Analyze file sizes to identify largest files
- [ ] Catalog all files requiring front matter standardization
- [ ] Identify deprecated or redundant files
- [ ] Map documentation that can be externalized
- [ ] Create prioritized task backlog
- [ ] Assess current command usage patterns and pain points

### Phase 3: Schema Definition and Validation
- [ ] Create canonical schema in `system/schemas/trading-intent.schema.json`
- [ ] Implement validation utilities for schema
- [ ] Test schema with existing state files

### Phase 4: Prompt Alignment and Cleanup
- [ ] Create front matter template
- [ ] Apply template to all prompt files
- [ ] Remove deprecated prompts
- [ ] Optimize prompts for Claude compatibility

### Phase 5: Repository Restructuring
- [ ] Move planning docs to appropriate directories
- [ ] Archive old logs and replays
- [ ] Reorganize file structure according to plan

### Phase 6: Runtime Validation Implementation
- [ ] Implement `validateOutput()` hook
- [ ] Add schema validation to runtime
- [ ] Create recovery mechanisms for corrupted state

### Phase 7: Command Interface Improvements
- [ ] Implement command shortcuts for high-frequency commands
- [ ] Create `/build-command` helper
- [ ] Enhance plugin registry with parameter metadata
- [ ] Implement default parameter handling
- [ ] Design preset storage and retrieval system
- [ ] Implement preset management commands
- [ ] Create `/form` command for interactive input
- [ ] Update documentation with command interface improvements

### Phase 8: System-Wide Validation
- [ ] Verify all commands function correctly
- [ ] Test critical workflows end-to-end
- [ ] Validate schema implementations
- [ ] Check front matter consistency
- [ ] Verify file size reduction achievements
- [ ] Test command interface improvements with real workflows

---

## File Updates Required

### New Files
- `prompts/utilities/build-command.md` - Command builder implementation
- `prompts/utilities/form-command.md` - Form-based input implementation
- `prompts/utilities/preset-command.md` - Preset management implementation
- `state/command-presets.json` - Preset storage
- `docs/guides/command-helpers.md` - User guide for command interface features
- `tests/command-helpers.test.js` - Tests for command interface features

### Modified Files
- `system/runtime/command-map.md` - Add shortcuts and new commands
- `system/runtime/plugin-registry.json` - Add parameter metadata and shortcuts
- `system/runtime/runtime-agent.md` - Implement shortcut expansion
- `system/runtime/validator.md` - Update validation with parameter metadata
- `system/commands.md` - Document shortcuts and command helpers
- `docs/command-reference.md` - Update with shortcuts and presets

---

## Command Enhancements Examples

### Command Shortcuts
```markdown
| Shortcut | Command | Description |
|----------|---------|-------------|
| `/sp` | `/size-position` | Calculate position size |
| `/ap` | `/add-position` | Add new position |
| `/lp` | `/list-positions` | List current positions |
| `/up` | `/update-position` | Update position details |
| `/cp` | `/close-position` | Close position and log results |
| `/rp` | `/run-preset` | Execute saved command preset |
```

### Command Builder Output
```
Copy and customize this command:

/size-position AAPL long entry=225.50 stop=223.80 setup=bull-flag conviction=high

Parameters:
- symbol: Stock/instrument symbol (required)
- direction: "long" or "short" (required)
- entry: Planned entry price (required)
- stop: Planned stop loss level (required)
- setup: Setup type (default: standard)
  Options: bull-flag, bear-flag, pullback, breakout, day-after-trade
- conviction: Conviction level (default: medium)
  Options: high, medium, low
- account_size: Total account size (default: 100000)
- max_risk_percent: Maximum risk as percentage (default: 1)
```

### Command Preset Example
```json
{
  "presets": [
    {
      "name": "analyze-yesterday",
      "command": "analyze-performance",
      "parameters": {
        "date": "YESTERDAY",
        "mode": "comprehensive"
      },
      "description": "Run comprehensive performance analysis for yesterday's trades"
    },
    {
      "name": "quick-long",
      "command": "add-position",
      "parameters": {
        "direction": "long",
        "stop": "ENTRY * 0.98",
        "setup": "bull-flag",
        "targets": "ENTRY * 1.02, ENTRY * 1.05, ENTRY * 1.08"
      },
      "description": "Quick long position with standard 2% stop and tiered targets"
    }
  ]
}
```

---

## Success Criteria

| Area | Target Outcome |
|------|----------------|
| Schema | All state and prompt outputs validate against canonical schema |
| Prompts | Front matter aligned, structurally consistent |
| Size | Files are Claude-optimized and lean |
| Runtime | Output validation enforced in execution |
| Cleanup | Legacy prompts, emoji, and noise removed |
| Structure | Repo separated into runtime, archive, and docs cleanly |
| Command Input | Significantly reduced friction for complex commands |
| Parameter Management | Intelligent defaults reduce required input |
| Preset System | Common command sequences can be executed with one command |
| Form Interface | Complex commands can be built step-by-step |
| Documentation | Clear documentation of shortcuts, presets, and form usage |

---

## Future Benefits

These improvements lay groundwork for more complex features in subsequent versions:

- **v0.5.3 Benefit**: Simplified schema and command interfaces will make performance analysis more accessible and consistent
- **v0.5.4 Benefit**: Canonical schema enables mindset modeling, while presets provide a foundation for DP-style command templates

---

## Notes

This release combines both canonical schema implementation and command interface improvements. The schema work ensures runtime integrity, prompt reusability, and Claude reliability, while the command interface enhancements reduce friction in day-to-day operations and set the stage for more sophisticated interactions in future releases.
