Here is the full consolidated best-practices document as a single inline code block, without rendering:

# Intent Trader GitHub Setup Guide (Consolidated Best Practices)

## Overview

This guide provides a complete, feedback-informed approach for setting up and managing your GitHub project for the Intent Trader system. It incorporates both foundational project board setup and real-world trading session insights to ensure clarity, accountability, and adaptability.

---

## Step 1: Prepare GitHub Repository

### Repository Setup

1. Navigate to your `intent-trader` repository.
2. Ensure admin privileges.
3. Add a clear `README.md` documenting:
   - Project goals
   - Label taxonomy
   - Milestone definitions
   - Workflow lifecycle

---

## Step 2: Create Labels

### Components
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
- `phase:premarket`
- `phase:intraday`
- `phase:postmarket`

### Types
- `type:technical`
- `type:feature`
- `type:enhancement`
- `type:behavioral`
- `type:discipline`
- `type:risk`
- `type:social`
- `type:architecture`
- `type:schema`
- `type:metadata`
- `type:organization`
- `type:automation`
- `type:docs`

### Priorities
- `priority:critical`
- `priority:high`
- `priority:medium`
- `priority:low`

### Misc
- `enhancement`
- `technical-debt`

---

## Step 3: Create Milestones

### Foundational
- Prompt System
- Knowledge Base
- Logging System
- Main Controller
- Validation Tools
- Feature Enhancements
- Technical Debt

### Enhanced Focus
- Intraday Execution
- Behavioral Management
- Market Analysis
- Trading Strategy
- Information Management
- Technical Analysis
- Execution Improvement
- Premarket Preparation

### Optional Sprint Milestones
- Sprint 1: [Date Range]
- Sprint 2: [Date Range]
- etc.

---

## Step 4: Import Requirements

### Preferred Method (CSV Tool)
```bash
npm install -g github-csv-tools
githubCsvTools enhanced-requirements-csv.csv
```

### Alternative: Manual Import for High-Priority Items
1. Prioritize `priority:critical` and `priority:high`
2. Use GitHub Issues manually
3. Assign correct labels and milestones

---

## Step 5: Configure Project Views

### Core Views

#### Backlog Table View
- Fields: Priority, Effort, Epic, Status
- Sort: Priority → Epic

#### Development Kanban Board
- Columns: Backlog → Ready → In Progress → Review → Done

#### Roadmap View
- Group by Epic
- Sort by Priority

### Enhanced Views

#### Functionality-Based Table
- Group by `Component`
- Sort by `Priority`

#### Implementation Sequence Board
- Columns:
  - Critical Path
  - High Value
  - Enhancement Path
  - Future Optimizations

#### Feedback-Driven Table
- Name: "User Feedback Implementation"
- Filters: Only enhanced requirements
- Group: Focus area
- Custom Field: `Feedback Source`

#### Feedback Tracking View
- Name: "Feedback Implementation Tracking"
- Fields:
  - Feedback Document
  - Implementation Status: Not Started / In Progress / Implemented / Validated
  - User Impact: High / Medium / Low

---

## Step 6: Define Roadmap Phases

### Phase 1: Orientation & Status Framework (2 weeks)
- ORI-01, ORI-02, SIG-01, EXEC-01

### Phase 2: Market Mode Integration (2 weeks)
- MOD-01, MOD-02, TECH-01, PREP-01

### Phase 3: Advanced Info Management (2 weeks)
- SIG-02, SIG-03, ORI-03, EXEC-02

### Phase 4: Technical Refinement (2 weeks)
- TECH-02, TECH-03, MOD-03, PREP-03

---

## Step 7: Automate Workflows

### Project Automations
- On issue creation → `Status: Backlog`
- On PR linked → `Status: In Progress`
- On PR merge → `Status: Review`

### Optional GitHub Actions
- Add `.github/workflows/project.yml`
- Add `.github/ISSUE_TEMPLATE/` templates

---

## Step 8: Contextualize Issues with Real-World Feedback

### Comment Template:
```
## Real-World Context
[Excerpt from feedback]

## Implementation Considerations
1. Feature access pattern
2. UI/UX considerations
3. Logging or visualization needs
```

---

## Step 9: Final Prioritization

1. Hold a prioritization session
2. Validate issue completeness
3. Confirm milestone and label consistency
4. Select first wave for implementation

---

## Final Notes

### Key Feedback Insights to Prioritize
- **Status Categorization (Triggered/Invalidated/Ready Soon/Not Close)**
- **Pre-Staging Based on Mancini Newsletter**
- **Mode Recognition (especially Mode 1)**
- **Orientation Stability During Live Trading**
- **Technical Framework Precision (Mancini levels)**