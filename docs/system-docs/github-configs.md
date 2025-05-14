# Intent Trader GitHub Configuration Best Practices

## Purpose

This document defines the standardized configuration for managing issues, priorities, views, and workflows within the Intent Trader GitHub repository. It integrates real-world trading feedback and system architecture best practices to ensure alignment between development operations and actual usage patterns.

---

## Repository Configuration

All project development, issue tracking, and implementation workflows for the Intent Trader system must occur within the central `intent-trader` GitHub repository. The repository must maintain the following configuration baseline at all times:

- A version-controlled `README.md` explaining system purpose, taxonomy, and development workflow
- Proper permissions to ensure administrative control and contributor clarity
- GitHub Actions enabled for automation support

---

## Label Taxonomy

All issues must be tagged using a consistent label structure across five key domains:

### Components
Used to define the functional area of the system:
- `component:prompts`
- `component:knowledge`
- `component:logging`
- `component:controller`
- `component:validation`
- `component:intraday`
- `component:behavioral`
- `component:analysis`
- `component:strategy`
- `component:information`
- `component:technical`
- `component:execution`
- `component:premarket`

### Phases
Used to align development with the trading workflow:
- `phase:premarket`
- `phase:intraday`
- `phase:postmarket`

### Types
Used to classify the nature of work:
- `type:technical`, `type:feature`, `type:enhancement`
- `type:behavioral`, `type:discipline`, `type:risk`, `type:social`
- `type:architecture`, `type:schema`, `type:metadata`, `type:organization`, `type:automation`, `type:docs`

### Priorities
Used to support prioritization of execution:
- `priority:critical` (must-implement, P1 blockers)
- `priority:high` (core to roadmap or user outcome)
- `priority:medium` (important, not urgent)
- `priority:low` (non-urgent improvements or ideas)

### Additional Tags
Used for process tracking:
- `enhancement`
- `technical-debt`

---

## Milestone Framework

All issues must be associated with one or more of the following long-term or tactical milestones:

### System-Level Milestones
- Prompt System
- Knowledge Base
- Logging System
- Main Controller
- Validation Tools
- Feature Enhancements
- Technical Debt

### Operational Milestones
- Intraday Execution
- Behavioral Management
- Market Analysis
- Trading Strategy
- Information Management
- Technical Analysis
- Execution Improvement
- Premarket Preparation

### Sprint-Based Milestones
Time-boxed sprints may be added as needed using the format:  
`Sprint X: [Start Date – End Date]`

---

## Project Views

A minimum set of structured GitHub Project views must be configured to support multi-dimensional analysis and execution tracking:

### Backlog (Table View)
- Grouped by: Epic
- Fields: Priority, Effort, Epic, Status
- Sorted by: Priority descending, then Epic

### Development (Kanban Board)
- Columns: Backlog → Ready → In Progress → Review → Done
- Automatically synced with issue status

### Roadmap (Timeline View)
- Grouped by: Milestone (Epic)
- Sorted by: Priority
- Used for milestone planning and quarterly reviews

### Component View (Table)
- Grouped by: Component
- Used to assess work across system functions

### Implementation Sequence (Board)
- Columns:
  - Critical Path
  - High Value
  - Enhancement Path
  - Future Optimizations
- Used for sequencing execution across priority tiers

### Feedback Implementation (Table)
- Filters: feedback-derived issues only
- Fields: Feedback Source
- Used to verify real-world relevance and traceability

### Feedback Tracking (Table)
- Fields:
  - Feedback Document
  - Implementation Status (Not Started, In Progress, Implemented, Validated)
  - User Impact (High, Medium, Low)

---

## Workflow Automation

The following automations must be configured within GitHub Projects:

- On issue creation: set `Status: Backlog`
- On PR reference: set `Status: In Progress`
- On PR merge: set `Status: Review`
- Upon manual review or validation: update to `Status: Done`

Optional:
- GitHub Actions may be added in `.github/workflows/project.yml` to enhance triage, testing, or deployment tracking.
- Issue templates must be provided in `.github/ISSUE_TEMPLATE/` and support structured submission.

---

## Roadmap Phases (Rolling 2-Week Cycles)

To ensure coherence across technical planning and real-world trading usage, development must align to these execution themes:

### Phase 1: Orientation & Status Framework
Focus: Orientation commands and decision status clarity  
Artifacts: ORI-01, ORI-02, SIG-01, EXEC-01

### Phase 2: Market Mode Integration
Focus: Adapting strategies to real-time market modes  
Artifacts: MOD-01, MOD-02, TECH-01, PREP-01

### Phase 3: Information Management
Focus: Improving signal quality and speed of insights  
Artifacts: SIG-02, SIG-03, ORI-03, EXEC-02

### Phase 4: Technical Refinement
Focus: Validating and extending technical analysis capabilities  
Artifacts: TECH-02, TECH-03, MOD-03, PREP-03

---

## Feedback-Driven Development Standards

All imported or derived issues based on user feedback must include a standardized `Real-World Context` comment and considerations:

### Required Comment Format:
```
## Real-World Context

[Excerpt from usage review or transcript]

## Implementation Considerations

1. User interaction patterns
2. Suggested interface/logging method
3. Scalability or automation needs
```

---

## Prioritization Criteria

Priority levels must be reassessed quarterly or per sprint cycle. The following signals must guide urgency:

- Status Orientation Framework clarity
- Pre-staging based on Mancini's newsletter (12pm day-before)
- Mode Recognition (especially Mode 1 days)
- Impact on live trade execution or decision latency
- Precision validation of key levels (especially Mancini’s)

---

## Governance

This best practice configuration must be reviewed biannually and updated based on:

- Trading system evolution
- GitHub feature changes
- Inner Circle feedback loop analysis
- Automation and operational needs

Version-controlled updates to this document should be stored in the `/system/docs/` folder and referenced from the repository root `README.md`.
