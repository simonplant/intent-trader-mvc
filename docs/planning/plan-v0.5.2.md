---
id: plan-v0.5.2
title: Intent Trader v0.5.2 – Canonical Schema & Prompt Refactor
release: 0.5.2
status: final
release: 2025-05-20
category: foundations
author: Intent Trader Team
tags: [schema, prompts, refactor, validation, system-state]
---

# Intent Trader Plan v0.5.2 — Canonical Schema & Prompt Refactor

## Purpose

This release establishes the foundational schema and file structure for all future work. It enforces alignment across all prompt input/output, system state files, and runtime tooling.

---

## Milestone Objective

**“All prompts and state files are schema-valid and structurally aligned. The system is clean, reliable, and maintainable.”**

---

## Phase 1: Canonical Schema Definition

| File | Purpose |
|------|---------|
| `system/schemas/trading-intent.schema.json` | Master schema for trade plan, positions, session, and journaling |
| `system/validation/schema-validator.js` | Runtime utility to validate state files and prompt outputs |
| `system/state/*.json` | Moved from `state/`, now structured and validated |
| `prompts/plan/analyze-dp.md` | Emits schema-conformant ideas from DP transcript |
| `prompts/plan/analyze-mancini.md` | Emits schema-conformant ideas from Mancini letter |
| `prompts/focus/create-plan.md` | Builds unified trade plan from analyst data |
| `prompts/review/log-session.md` | Logs trade activity, plan alignment, and emotion |
| `prompts/execute/add-position.md` | Writes to `system/state/my-positions.json` using schema |
| `prompts/manage/list-positions.md` | Reads and formats live position data |
| `system/sop.md` | Defines daily PFEMRC workflow and schema checkpoints |
| `system/runtime/command-map.md` | Ensures schema-aware routing for prompt execution |

---

## Phase 2: Prompt Refactor and Codebase Cleanup

- [ ] Update front matter in all prompts to include `requires: [system/schemas/trading-intent.schema.json]`
- [ ] Remove deprecated prompts and unused utilities
- [ ] Collapse repeated logic into centralized routines
- [ ] Target: 30–50% reduction in file volume and duplication
- [ ] Ensure every prompt has a clear input/output model aligned to schema

---

## Phase 3: State Alignment and Validation

- [ ] Migrate all state files to `system/state/*.json`
- [ ] Validate state files after each session using `schema-validator.js`
- [ ] Lock schema version to prevent breaking changes during runtime
- [ ] Enable recovery from partial/corrupt state using schema fallback defaults

---

## Deliverables

| Output | Description |
|--------|-------------|
| `system/schemas/trading-intent.schema.json` | Unified schema for all state and prompt output |
| `system/state/trade-plan-state.json` | Schema-aligned daily plan |
| `system/state/my-positions.json` | Active + closed trades |
| `system/state/session-manifest.json` | Session metadata and market bias |
| `system/state/transaction-log.json` | Execution and system action log |

---

## Release Outcome

- Prompts and runtime files conform to a single canonical data structure
- Codebase reduced and simplified
- Ready for v0.5.3 performance benchmarking and trade comparison work

---

## Notes

This version supersedes earlier split variants of 0.5.2 (including Mancini-specific modules) and now serves as the foundation for all future system behavior.
