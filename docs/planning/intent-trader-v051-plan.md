---
id: intent-trader-v051-plan
version: "0.5.1"
type: plan
created: 2025-05-15
updated: 2025-05-15
status: ACTIVE
---

# Intent Trader v0.5.1 Implementation Plan

This document defines the finalized scope, architecture, and implementation strategy for Intent Trader v0.5.1. It rationalizes all legacy documents, synchronizes with the domain model, and removes deprecated or non-standard commands.

---

## Primary Objectives

1. **Dual Style Support**
   - DP institutional swing trades
   - Mancini’s futures-level technical setups
   - Unified trade plan generator by regime and mode

2. **Execution Gap Closure**
   - Log actual vs. ideal entries/exits
   - Use structured debriefs and coaching prompts
   - Drive size discipline and consistent behavior

3. **Plan ↔ Position Synchronization**
   - Track moderator + personal trades
   - Confirm trade alignment with plan
   - Tiering, buffer, and status handling

4. **Pragmatic Execution**
   - Output-first mindset
   - Clear command structure
   - Schema-bound data model powering all commands

---

## Folder Structure

intent-trader/
├── docs/                  ← SOPs, guides, architecture
├── prompts/
│   ├── premarket/         ← plan creation
│   ├── intraday/          ← trade validation
│   ├── postmarket/        ← review & coaching
│   └── utilities/         ← support tools
├── system/
│   ├── schemas/           ← plan, position, analysis
│   ├── market-context/    ← mode classification
│   ├── position-tracking/ ← active tracking
│   ├── trade-analysis/    ← execution review
│   └── systemops/         ← commands + routing
└── logs/
├── trades/
├── positions/
└── performance/

---

## Core Workstreams

### 1. Market Context Classification
- `system/market-context/market-mode.md`
- Mancini Mode 1 (trend) vs. Mode 2 (chop)
- DP-style market regime evaluation
- Integrated into `/analyze-regime` and `/detect-mode`

### 2. Unified Trade Plan Generator
- `prompts/premarket/unified-plan-generator.md`
- Inputs: `/analyze-dp`, `/analyze-mancini`, `/analyze-regime`
- Merges conviction ideas, ranks focus setups, generates level and scenario plan
- Executed via `/create-plan` and `/create-blueprint`

### 3. Position Management System
- `system/position-tracking/position-manager.md`
- Adds, updates, closes positions via:
  - `/add-position`, `/update-position`, `/close-position`
  - Viewed via `/list-positions`
- Implements tiering, runners, trailing stops, and risk buffers

### 4. Performance Review + Learning
- `prompts/postmarket/trade-review.md`
- End-of-day reviews via `/run-debrief`
- Execution logged with `/log-trade`, reflections via `/add-journal`
- Feedback via `/analyze-patterns`, accuracy via `/compare-analysts`

---

## Implementation Tasks (v0.5.1)

### Phase 1: Core Analysis Engines
- [ ] Implement Morning Call Processor
- [ ] Implement Mancini Newsletter Processor
- [ ] Build Technical Frameworks: MA, character change, levels

### Phase 2: Integration Components
- [ ] Develop Unified Plan Generator
- [ ] Implement Position Management System
- [ ] Build Level Integration + Concordance Engine

### Phase 3: User Experience & Command Interface
- [ ] Implement command parser and validation
- [ ] Define consistent output templates and visualizations
- [ ] Set up session state management and recovery
- [ ] Backfill systemops command specs

### Phase 4: Advanced Features
- [ ] Build Performance Analytics module
- [ ] Add pattern recognition and behavioral analysis
- [ ] Construct adaptive learning + feedback engine
- [ ] Begin broker/automation interface (Phase 4+)

### Internal Structure Completion
- [ ] Finalize `dp-analyzer.md` and `mancini-analyzer.md`
- [ ] Create `/create-plan`, `/extract-focus`, `/extract-levels`
- [ ] Implement `/update-plan`, `/validate-plan`
- [ ] Sync `/add-position`, `/list-positions`, `/run-debrief`

### Other Observed Gaps
- [ ] Document processor error handling routines
- [ ] Complete `/compare-analysts` and `/analyze-patterns`
- [ ] Validate command → entity schema bindings
