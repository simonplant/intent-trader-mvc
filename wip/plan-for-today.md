# May 15, 2025 — Tactical Work Session Plan

## Goal: Freeze entity and command structure before implementation

## Finalize Entity Schemas
- [ ] Validate all schema names, types, and relationships
- [ ] Create JSON schema stubs for: Morning Call, Newsletter, Plan, Position, Trade Log, Performance Summary
- [ ] Remove or archive duplicate files (e.g., `domain-model-completion-plan copy.md`)

## Domain Model Cleanup
- [ ] Confirm attribute completeness in `domain-model.md`
- [ ] Resolve MA crossover definitions (short vs long)
- [ ] Define order status + partial fill handling
- [ ] Clarify runner logic and committed risk state

## Command Catalog Cleanup
- [ ] Remove any deprecated, implied, or not-to-be-used commands
- [ ] Validate param lists (`status`, `filter`, `next steps`, etc.)
- [ ] Confirm every command routes to a defined schema and response

## Planning Cleanup
- [ ] Delete or archive outdated WIP docs and unused TODOs
- [ ] Merge `README.md` into top-level summary aligned to new v0.5.1 plan
- [ ] Trim `project-tracker.md` to only reflect current phases and components

## Implementation Prep
- [ ] Scaffold prompts for: `/analyze-dp`, `/extract-focus`, `/create-plan`
- [ ] Create input stubs from past DP and Mancini examples
- [ ] Outline test sequence: Plan → Position → Review

## Output Artifacts (by EOD)
- [ ] Canonical markdown versions of all schema + catalog files
- [ ] JSON schema definitions ready for version control
- [ ] Snapshot of `project-tracker.md` with checklist updates