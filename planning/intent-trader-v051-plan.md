---
id: intent-trader-v051-plan-update3
version: "0.5.1"
type: plan
created: 2025-05-15
updated: 2025-05-15
status: ACTIVE
---

# Intent Trader v0.5.1 MVP Plan (Final Update)

This document defines the scope, architecture, and development priorities for delivering a working MVP (minimum viable product) of the Intent Trader system by tomorrow/Monday. It focuses on providing immediate trading value while establishing the foundation for future iterations.

---

## 🎯 MVP Definition

The MVP must support a full trading session for a single user, aligned to a hybrid structure:

### Temporal Sessions:
- **Pre-Market Session**: Plan + Focus _(MVP CORE)_
- **Open Market Session**: Execute + Manage _(MVP CORE)_
- **Post-Market Session**: Review _(MVP CORE)_

### Cognitive Workflow:
- **Plan → Focus → Execute → Manage → Review**

This framework supports the end-to-end trading workflow while prioritizing the components most critical for making money tomorrow.

---

## Core Workstreams (MVP Scope)

### 1. Pre-Market Session

#### PLAN Phase (HIGHEST PRIORITY)
- **Morning Call Analysis**: Extract actionable insights from DP morning calls ✅
  - Parse for high-conviction trade ideas
  - Identify key technical levels
  - Extract market context
  - Determine analyst's directional bias
- **Unified Trade Plan Creation**: Generate a comprehensive trading plan ✅
  - Market overview with key context
  - Prioritized trade ideas with conviction levels
  - Key technical levels and moving averages
  - Risk allocation recommendations

#### FOCUS Phase (HIGH PRIORITY)
- **Conviction Classification**: Determine confidence level for trade ideas ✅
  - DP language pattern recognition
  - Standardized high/medium/low framework
  - Consistent categorization methodology
- **Setup Prioritization**: Rank opportunities by quality ✅
  - Conviction-based ranking
  - Risk/reward assessment
  - Technical setup quality
  - Execution priority determination

### 2. Open Market Session

#### EXECUTE Phase (HIGH PRIORITY)
- **Position Sizing**: Calculate appropriate trade size ✅
  - Risk-based sizing methodology
  - Conviction-based adjustment
  - Maximum risk constraints
  - Per-setup type sizing rules
- **Trade Validation**: Verify alignment with plan ✅
  - Plan consistency check
  - Risk parameter validation
  - Technical level confirmation
  - Entry criteria validation

#### MANAGE Phase (HIGH PRIORITY)
- **Core Position Management**: Track active positions ✅
  - Position status monitoring
  - P&L calculation
  - Risk exposure tracking
  - Management priority determination
- **Trimming Protocol**: Implement systematic profit taking _(MOVED TO v0.5.2)_
  - 75/15/10 rule implementation
  - Target-based reduction
  - Stop adjustment after partial exits
  - Runner isolation
- **Stop Adjustment**: Dynamic risk management _(PARTIAL IMPLEMENTATION)_
  - Initial stop placement ✅
  - Breakeven methodology ✅
  - Trailing stop implementation _(MOVED TO v0.5.2)_
  - Character-based adjustment _(MOVED TO v0.5.2)_

### 3. Post-Market Session

#### REVIEW Phase (MVP CORE)
- **Session Logging**: Record session details ✅
  - Trade entry/exit details
  - Performance metrics
  - Plan adherence assessment
  - Market context capture
  - Trading behavior patterns
  - Moderator trade comparison
  - Psychological state analysis
- **Session Debrief**: Analyze trading performance _(MOVED TO v0.5.2)_
  - Day summary creation
  - Performance metric calculation
  - Pattern identification
  - Improvement recommendations

### 4. System Finalization

#### SYSTEM ORGANIZATION (MVP CORE - CURRENT FOCUS)
- **Command Route Updates**: Standardize command interfaces _(IN PROGRESS)_
  - Update command patterns
  - Create command reference document
  - Standardize parameter handling
  - Document command relationships
- **Folder Structure**: Organize by cognitive phase _(IN PROGRESS)_
  - Restructure files by phase
  - Create consistent naming conventions
  - Implement proper cross-linking
  - Document organization schema
- **System Architecture Documentation**: Define system design _(IN PROGRESS)_
  - Document component relationships
  - Define data flows
  - Diagram system architecture
  - Create component registry

#### FUTURE INTEGRATION (PRELIMINARY)
- **Mancini Analysis Integration**: Plan for v0.5.2 _(IN PROGRESS)_
  - Define integration points
  - Identify required components
  - Create transition plan
  - Document differences from DP workflow

---

## Implementation Timeline

### Day 1 (Today): MVP CORE ✅
1. **Morning (3 hours)**: Implement PLAN Phase ✅
   - Create `/analyze-dp` command to extract key information
   - Implement conviction classification for trade ideas
   - Develop technical level extraction
   - Create `/create-plan` command for unified plans

2. **Midday (2 hours)**: Implement FOCUS Phase ✅
   - Build `/extract-focus` for high-conviction trade ideas
   - Implement `/extract-levels` for technical level analysis
   - Create simple setup prioritization

3. **Afternoon (2 hours)**: Implement EXECUTE & MANAGE Phases ✅
   - Develop position management commands:
     - `/add-position`
     - `/update-position`
     - `/close-position`
     - `/list-positions`
   - Create position sizing functionality with `/size-position`

4. **Evening (1 hour)**: Begin REVIEW Phase ✅
   - Implement `/log-session` for session tracking
   - ~~Create `/run-debrief` for session analysis~~ (Deferred to v0.5.2)
   - Start system organization

### Day 2 (Next Trading Day): MVP FINALIZATION
1. **Morning (2 hours)**: Complete System Finalization
   - Update command routes and references
   - Organize folder structure
   - Create preliminary Mancini integration plan
   - Document system architecture

2. **Pre-Market (1 hour)**: Live Test with Morning Call
   - Process real DP morning call with system
   - Generate trade plan for the day
   - Extract focus ideas and levels

3. **Trading Session (4 hours)**: Execute with System Support
   - Use position management commands in real-time
   - Apply position sizing rules to actual trades
   - Track positions throughout the day

4. **Post-Market (1 hour)**: Review Session Performance
   - Log complete trading session
   - ~~Run session debrief~~ (Will use Session Logger for now)
   - Identify improvement areas for v0.5.2

---

## Command Implementation Priorities and Status

### Day 1 (MVP CORE) Commands

#### PLAN Phase
- `/analyze-dp [transcript]` - Process DP morning call ✅
- `/create-plan` - Generate unified trade plan ✅

#### FOCUS Phase
- `/extract-focus dp [min_conviction]` - Extract high-conviction ideas ✅
- `/extract-levels dp [indices]` - Extract key technical levels ✅

#### EXECUTE Phase
- `/add-position [symbol]` - Track new position ✅
- `/size-position [symbol]` - Calculate position size ✅

#### MANAGE Phase
- `/update-position [symbol]` - Update position details ✅
- `/close-position [symbol]` - Close position and record outcome ✅
- `/list-positions` - Show current positions ✅

#### REVIEW Phase
- `/log-session [date]` - Record complete session data ✅
- ~~`/run-debrief` - Analyze trading session~~ _(MOVED TO v0.5.2)_

### v0.5.2 Commands (DEFERRED)

#### MANAGE Phase
- `/adjust-stop [symbol]` - Modify stop loss level _(MOVED TO v0.5.2)_
- `/trim-position [symbol]` - Execute partial exit _(MOVED TO v0.5.2)_
- `/manage-runner [symbol]` - Apply runner management protocol _(MOVED TO v0.5.2)_

#### REVIEW Phase
- `/run-debrief` - Comprehensive session analysis _(MOVED TO v0.5.2)_

#### PLAN Phase
- `/analyze-mancini [newsletter]` - Process Mancini newsletter _(MOVED TO v0.5.2)_
- `/mode-detect` - Determine market mode _(MOVED TO v0.5.2)_

---

## Folder Structure (Updated)
intent-trader/
├── prompts/
│   ├── plan/
│   │   └── analyze-dp.md
│   ├── focus/
│   │   ├── conviction-classifier.md
│   │   ├── create-plan.md
│   │   ├── extract-focus.md
│   │   └── extract-levels.md
│   ├── execute/
│   │   ├── add-position.md
│   │   ├── list-positions.md
│   │   ├── update-position.md
│   │   ├── close-position.md
│   │   └── size-position.md
│   ├── manage/
│   │   └── [future: manage-runner.md]
│   └── review/
│       ├── log-session.md
│       └── [future: run-debrief.md]
├── state/
│   ├── my-positions.json
│   └── ic-moderator-positions.json
└── docs/
    ├── system-architecture.md
    ├── command-reference.md
    └── mancini-integration-plan.md
---

## MVP Success Criteria

The MVP will be considered successful if:

1. It can process a real DP morning call and extract actionable trade ideas (PLAN) ✅
2. It generates a clear, prioritized trade plan with entry/exit points (PLAN) ✅
3. It helps prioritize the highest conviction setups (FOCUS) ✅
4. It tracks positions accurately during the trading day (EXECUTE/MANAGE) ✅
5. It supports logging and analysis of trading performance (REVIEW) ✅
6. It provides a clean, organized system architecture (SYSTEM) _(IN PROGRESS)_
7. It supports profitable decision making during tomorrow's trading session

This MVP focuses on delivering immediate trading value while establishing the core architecture for future enhancements.

---

## v0.5.2 Roadmap (Post-MVP Updates)

1. Mancini-specific trade management
   - Implement `/analyze-mancini` command
   - Implement `/manage-runner` command
   - Add comprehensive 75/15/10 rule implementation
   - Enhance trailing stop methodology
   - Add Failed Breakdown detection
   - Create level integration framework
   - Add Mode detection (Mode 1 vs. Mode 2)

2. Enhanced stop management
   - Advanced stop adjustment methodology
   - Character-based stop movement
   - Implement `/adjust-stop` dedicated command
   - Create automated stop management rules
   - Add ATR-based stop adjustment

3. Implementation testing framework
   - Create comprehensive test suite
   - Implement automated testing workflows
   - Add end-to-end testing tools
   - Create realistic test scenarios
   - Track test coverage metrics

4. Enhanced review capabilities
   - Implement `/run-debrief` command
   - Improve trade logging and analytics
   - Enhance pattern recognition algorithms
   - Create knowledge extraction framework
   - Add long-term performance tracking
   - Implement trading journal integration

By focusing on a pragmatic MVP that delivers immediate trading value, we establish a solid foundation while enabling rapid feedback and iteration. The v0.5.2 release will then build on this foundation with enhanced features and Mancini-specific functionality.
