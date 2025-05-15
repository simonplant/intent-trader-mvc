---
id: intent-trader-v051-plan
version: "0.5.1"
type: plan
created: 2025-05-15
updated: 2025-05-15
status: ACTIVE
---

# Intent Trader v0.5.1 MVP Plan

This document defines the scope, architecture, and development priorities for delivering a working MVP (minimum viable product) of the Intent Trader system. It replaces legacy planning documents, consolidates the current domain model, and ensures full intraday support for the entire trade lifecycle.

---

## 🎯 MVP Definition

The MVP must support a full trading session for a single user, aligned to a hybrid structure:

### Temporal Sessions:
- **Pre-Market Session**: Plan + Focus
- **Open Market Session**: Execute + Manage
- **Post-Market Session**: Review

### Cognitive Workflow:
- **Plan → Focus → Execute → Manage → Review**

This dual framework (temporal + cognitive) ensures:
- Clear transitions between phases
- Logical command groupings
- Support for evolving user workflows
- Consistent behavior even across atypical events (e.g. earnings, catalysts, swings)

---

## Folder Structure

```
intent-trader/
├── docs/                  ← SOPs, guides, architecture
├── prompts/
│   ├── premarket/         ← plan creation
│   ├── intraday/          ← trade validation
│   ├── postmarket/        ← review & coaching
│   └── utilities/         ← support tools
├── system/
│   ├── schemas/           ← plan, position, performance
│   ├── market-context/    ← regime, mode detection
│   ├── position-tracking/ ← live execution + status
│   ├── trade-analysis/    ← review + pattern detection
│   └── systemops/         ← command routing + logic
└── logs/
    ├── trades/
    ├── positions/
    └── performance/
```

---

## Core Workstreams (MVP Scope)

### Pre-Market Session = Plan + Focus Phases

#### 1. Premarket Planning Engine
- Inputs: `/analyze-dp`, `/analyze-mancini`, `/analyze-regime`
- Output: `/create-plan`, `/create-blueprint`, `/run-preflight`
- Entities: Analyst input, Level Map, Setup Prioritization, Morning Checklist

#### 2. Focus Stage Execution
- Chart Setup: Preload prior highs/lows, significant levels
- Alert Prep: Create TOS alerts, OCO orders, and conditional levels
- Market Monitoring: DP VTF mic, trade alerts, news
- Risk Filtering: Confirm conviction/priority match readiness

### Open Market Session = Execute + Manage Phases

#### 3. Trade Validation + Entry
- Commands: `/validate-trade`, `/check-setup`, `/check-risk`
- Execution: `/add-position`, `/update-position`
- Rules: Plan alignment, size enforcement, stop/buffer logic

#### 4. Live Position Management
- Logic for:
  - Core, Runner, Buffer
  - Trimming on strength / Adding on weakness
  - Live P&L tracking
- Commands: `/list-positions`, `/update-position`, `/adjust-stop`, `/close-position`

### Post-Market Session = Review Phase

#### 5. Postmarket Review + Coaching
- Commands: `/log-trade`, `/run-debrief`, `/compare-analysts`, `/analyze-patterns`
- Metrics: Plan adherence, analyst accuracy, user consistency
- Activities: Session scorecard, mental state tracking, pattern tagging

---

## MVP Implementation Tasks

### Phase 1: Premarket + Planning
- [ ] Finalize `dp-analyzer.md`, `mancini-analyzer.md`
- [ ] Create `/create-plan`, `/extract-focus`, `/extract-levels`
- [ ] Implement `/update-plan`, `/validate-plan`, `/run-preflight`

### Phase 2: Focus Execution + Alerts
- [ ] Define chart markup + alert schema
- [ ] Define TOS export format for OCO, prior highs/lows, and alert generation
- [ ] Sync `/extract-levels` with alert config output

### Phase 3: Execution + Entry Layer
- [ ] Define sizing and stop logic schema
- [ ] Scaffold `/validate-trade`, `/check-risk`, `/add-position`
- [ ] Create test input and rule-check framework

### Phase 4: Live Management
- [ ] Implement core/runner/buffer position logic
- [ ] Enable real-time update and stop adjustment flow
- [ ] Build `/update-position`, `/adjust-stop`, `/list-positions`

### Phase 5: Review Layer
- [ ] Build `/log-trade`, `/add-journal`, `/run-debrief`
- [ ] Implement `/compare-analysts` logic
- [ ] Score plan adherence and execution patterns

---

## Schema + System Requirements

- [ ] Define JSON schemas for:
  - Morning Call Analysis
  - Newsletter Analysis
  - Unified Trade Plan
  - Position Tracker
  - Performance Summary

- [ ] Define schema versioning strategy
- [ ] Ensure all commands enforce entity schema bindings

---

## Additional Infrastructure

- [ ] Command alias system for speed
- [ ] Session state preservation and recovery
- [ ] Daily archive logic for logs and plan

---

## MVP Completion Criteria

- [ ] Full support for Plan → Focus → Execute → Manage → Review lifecycle
- [ ] Session-based implementation across Premarket, Open Market, and Postmarket blocks
- [ ] Test input → full plan → chart prep + alerting → trade → manage → log successfully simulated
- [ ] MVP walkthrough script / SOP documented
- [ ] Repo clean and ready to freeze for v0.5.1 commit