---
id: plan-v0.5.2
title: Intent Trader v0.5.2 – Canonical Schema & System Refactor
description: Foundation release to define canonical schema, unify prompt metadata, validate runtime state, and remove legacy assets
author: Simon Plant
version: 0.2.1
release: 0.5.2
created: 2025-05-20
updated: 2025-05-20
category: system
status: final
tags: [schema, prompts, refactor, validation, claude-compatibility]
requires: [system/schemas/trading-intent.schema.json]
outputs: [system/state/trade-plan-state.json, system/state/my-positions.json]
input_format: markdown
output_format: markdown
ai_enabled: true
---

# Intent Trader Plan v0.5.2 — Canonical Schema & System Refactor

## Purpose

This foundational release standardizes schemas, prompt metadata, and runtime files. It minimizes tech debt, shrinks prompt sizes for Claude compatibility, and prepares the system for fast iteration in v0.5.3 and v0.5.4.

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

/prompts/
/plan/
/review/
/focus/
/execute/
/conviction/
/manage/
/system/
/schemas/
/state/
/runtime/
/model/
/tests/
validate-prompts.test.js
schema-roundtrip.test.js
/scripts/
/docs/
/archive/

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

---

## Success Criteria

| Area        | Target Outcome                                                  |
|-------------|-----------------------------------------------------------------|
| Schema      | All state and prompt outputs validate against canonical schema |
| Prompts     | Front matter aligned, structurally consistent                  |
| Size        | Files are Claude-optimized and lean                            |
| Runtime     | Output validation enforced in execution                        |
| Cleanup     | Legacy prompts, emoji, and noise removed                       |
| Structure   | Repo separated into runtime, archive, and docs cleanly         |

---

## Notes

This release is mandatory before benchmarking (v0.5.3) or mindset modeling (v0.5.4). It ensures runtime integrity, prompt reusability, schema validation, and Claude reliability for forward velocity.
