# Implementation Plan: May 15-16, 2025 (Updated)

## Goal: Implement MVP for tomorrow's trading session

This implementation plan follows the cognitive workflow structure (Plan → Focus → Execute → Manage → Review) to deliver a complete trading assistant MVP by tomorrow. It serves as our state manager throughout the implementation process.

## Current State
- **Status**: System Finalization Phase
- **Current Phase**: Moving to System Finalization
- **Next Task**: Update command routes and folder organization
- **Completed Components**:
  - Morning Call Processor [`/analyze-dp`]
  - Conviction Classification System
  - Unified Trade Plan Generator [`/create-plan`]
  - Trade Idea Extractor [`/extract-focus`]
  - Level Extractor [`/extract-levels`]
  - Position Manager [`/add-position`, `/list-positions`, `/update-position`, `/close-position`]
  - Position State Storage [`state/my-positions.json`, `state/ic-moderator-positions.json`]
  - Position Sizing [`/size-position`]
  - Session Logger [`/log-session`]

## Timeline
1. **Today (May 15)**: Implement core functionality ✅
2. **Tonight**: Complete File Organization and System Finalization
3. **Tomorrow (May 16)**: Use in live trading

### Implementation Tasks by Cognitive Phase

### 1. PLAN Phase Implementation (3 hours)

#### 1.1 Morning Call Processor [`/analyze-dp`]
- [x] **Status**: Completed
- **Priority**: Highest
- **Implementation Path**:
  - Used Morning Call Processor Implementation template
  - Generated artifact: `prompts/plan/analyze-dp.md`
- **Features**:
  - Extracts market context, focus trades, and key levels
  - Classifies trade ideas by conviction level
  - Identifies entry parameters and basic exit strategies
  - Optimized for MVP with essential trading information
- **Next Steps**:
  - ✓ Save to `prompts/plan/analyze-dp.md`
  - ✓ Implement Conviction Classification System

#### 1.2 Conviction Classification System
- [x] **Status**: Completed
- **Priority**: High
- **Implementation Path**:
  - Used Prompt Template: [Conviction Classification Implementation](master-prompt-instructions.md#2-conviction-classification-implementation)
  - Generated artifact: `prompts/focus/conviction-classifier.md`
- **Dependencies**: None
- **Used by**: Morning Call Processor

#### 1.3 Unified Trade Plan Generator [`/create-plan`]
- [x] **Status**: Completed
- **Priority**: High
- **Implementation Path**:
  - Used Prompt Template: [Unified Trade Plan Generator Implementation](master-prompt-instructions.md#3-unified-trade-plan-generator-implementation)
  - Generated artifact: `prompts/focus/create-plan.md`
- **Dependencies**: Morning Call Processor output
- **Output**: Formatted trade plan with prioritized ideas and levels
- **Features**:
  - Integrates market context, technical levels, and trade ideas
  - Implements level consensus strength calculation
  - Prioritizes setups based on conviction and technical confirmation
  - Generates conditional scenario planning framework
  - Applies risk allocation framework with 75/15/10 management rule
  - Creates well-formatted markdown output with hierarchical structure

### 2. FOCUS Phase Implementation (2 hours)

#### 2.1 Trade Idea Extractor [`/extract-focus`]
- [x] **Status**: Completed
- **Priority**: High
- **Implementation Path**:
  - Used Prompt Template: [Trade Idea Extractor Implementation](master-prompt-instructions.md#4-trade-idea-extractor-implementation)
  - Generated artifact: `prompts/focus/extract-focus.md`
- **Dependencies**: Morning Call Processor output
- **Output**: Prioritized list of trade ideas by conviction
- **Features**:
  - Extracts and filters trade ideas based on conviction
  - Prioritizes opportunities using multi-factor scoring
  - Enhances ideas with technical context and setup classification
  - Calculates risk/reward metrics
  - Provides summary statistics and breakdown by conviction level
  - Organizes ideas into actionable categories

#### 2.2 Level Extractor [`/extract-levels`]
- [x] **Status**: Completed
- **Priority**: Medium
- **Implementation Path**:
  - Used Prompt Template: [Level Extractor Implementation](master-prompt-instructions.md#5-level-extractor-implementation)
  - Generated artifact: `prompts/focus/extract-levels.md`
- **Dependencies**: Morning Call Processor output
- **Output**: Structured level framework for indices and stocks
- **Features**:
  - Extracts and classifies price levels by significance
  - Organizes levels hierarchically by type and importance
  - Identifies key decision zones and confluent levels
  - Integrates moving average relationships
  - Provides context for each level's importance
  - Generates concise summary of most significant levels

### 3. EXECUTE Phase Implementation (1.5 hours)

#### 3.1 Position Manager
- [x] **Status**: Completed
- **Priority**: High
- **Implementation Path**:
  - Used Prompt Template: [Position Manager Implementation](master-prompt-instructions.md#6-position-manager-implementation)
  - Generated artifacts:
    - `prompts/execute/add-position.md`
    - `prompts/execute/list-positions.md`
    - `prompts/execute/update-position.md`
    - `prompts/execute/close-position.md`
    - `state/my-positions.json`
    - `state/ic-moderator-positions.json`
- **Dependencies**: None
- **Output**: Position tracking and management commands
- **Features**:
  - Implemented simplified position management commands
  - Added support for both DP and Mancini trading strategies
  - Created separate position tracking files by owner (personal vs. IC moderator)
  - Designed clean JSON structure with position history tracking
  - Supports full position lifecycle from creation to closure

#### 3.2 Position Sizing [`/size-position`]
- [x] **Status**: Completed
- **Priority**: Medium
- **Implementation Path**:
  - Used Prompt Template: [Position Sizing Implementation](master-prompt-instructions.md#7-position-sizing-implementation)
  - Generated artifact: `prompts/execute/size-position.md`
- **Dependencies**: None
- **Output**: Position sizing recommendations based on risk parameters
- **Features**:
  - Calculates optimal position size based on risk parameters
  - Applies different sizing rules based on setup type
  - Incorporates conviction levels for size scaling
  - Enforces maximum risk limits
  - Provides alternative sizing options (conservative/aggressive)
  - Supports DP's "trading around a core" methodology
  - References Trading Capital Profile and Trading Charter

### 4. MANAGE Phase Implementation (1.5 hours)

#### 4.1 Runner Management [`/manage-runner`]
- [x] **Status**: Deferred to v0.5.2
- **Priority**: Low (Removed from MVP)
- **Rationale for Deferral**:
  - Mancini-specific functionality
  - Not critical for initial MVP focused on DP
  - Will be prioritized in v0.5.2 release
- **Implementation Path**:
  - Will use Prompt Template: [Runner Management Implementation](master-prompt-instructions.md#8-runner-management-implementation)
  - Target artifact: `prompts/manage/manage-runner.md`
- **Dependencies**: Position Manager
- **Output**: Runner management guidance and trailing stop recommendations

### 5. REVIEW Phase Implementation (1 hour)

#### 5.1 Session Logger [`/log-session`]
- [x] **Status**: Completed
- **Priority**: Medium (Core for MVP)
- **Implementation Path**:
  - Used Trade Logger Implementation template with expanded scope
  - Generated artifact: `prompts/review/log-session.md`
- **Dependencies**: Position Manager
- **Output**: Comprehensive session log with trades, performance metrics, and observations
- **Features**:
  - Records all trades with entry/exit details
  - Captures market conditions and context
  - Tracks plan adherence and execution quality
  - Identifies strengths and areas for improvement
  - Supports pattern recognition across sessions
  - Compares personal execution with moderator trades
  - Analyzes time-of-day performance patterns
  - Provides psychological and cognitive state assessment

#### 5.2 Session Debrief [`/run-debrief`]
- [x] **Status**: Deferred to v0.5.2
- **Priority**: Low (Removed from MVP)
- **Rationale for Deferral**:
  - Session Logger provides sufficient review functionality for MVP
  - Focus on system finalization for immediate trading value
  - It's 11pm and we need to prioritize completing the MVP
- **Implementation Path**:
  - Will use Prompt Template: [Session Debrief Implementation](master-prompt-instructions.md#10-session-debrief-implementation)
  - Target artifact: `prompts/review/run-debrief.md`
- **Dependencies**: Session Logger
- **Output**: Comprehensive session analysis with insights and recommendations

### 6. System Finalization (2 hours - Current Focus)

#### 6.1 Command Route Updates
- [ ] **Status**: Planned
- **Priority**: High
- **Estimated Time**: 30 minutes
- **Implementation Path**:
  - Update command routes to reflect organized file structure: `docs/command-reference.md`
  - Create unified clean command reference document
  - Generate artifact: `docs/command-reference.md`

#### 6.2 Mancini Analysis Integration (Preliminary)
- [ ] **Status**: Planned
- **Priority**: Medium
- **Estimated Time**: 45 minutes
- **Implementation Path**:
  - Create framework for Mancini ES Futures newsletter analysis
  - Command is /analyze-mancini
  - Define integration points with existing components, routes, commands
  - Generate artifact: `prompts/plan//analyze-mancini.md`
  - Generate documentation: `docs/mancini-integration-plan.md`

#### 6.3 Folder Structure and File Organization
- [ ] **Status**: Planned
- **Priority**: High
- **Estimated Time**: 30 minutes
- **Implementation Path**:
  - Update all file paths to follow unified schema
  - Organize components by cognitive phase
  - Create appropriate subdirectories
  - Update cross-references

#### 6.4 System Architecture Documentation
- [ ] **Status**: Planned
- **Priority**: Medium
- **Estimated Time**: 45 minutes
- **Implementation Path**:
  - Document final system architecture
  - Create component relationship diagram
  - Describe data flow between components
  - Generate artifact: `docs/system-architecture.md`

### 7. Integration Testing (Deferred to v0.5.2)
- [x] **Status**: Deferred to v0.5.2
- **Priority**: Medium
- **Rationale for Deferral**:
  - Focus on component completeness for MVP
  - End-to-end testing to be conducted manually for now
  - Comprehensive test framework to be developed in v0.5.2
- **Implementation Path**:
  - Will create test cases and expected outputs
  - Will develop automated test scripts
  - Will create integration test harness
- **Dependencies**: All core components
- **Output**: Working, integrated system

## Implementation Progress
- Plan Phase: 100% complete
- Focus Phase: 100% complete
- Execute Phase: 100% complete
- Manage Phase: 50% complete (Position Management done, Runner Management deferred to v0.5.2)
- Review Phase: 50% complete (Session Logger done, Session Debrief deferred to v0.5.2)
- System Finalization: 0% complete (In Progress)
- Overall MVP Progress: 90% complete

## Next Steps

1. ✓ Complete Morning Call Processor implementation
2. ✓ Complete Conviction Classification System
3. ✓ Complete Unified Trade Plan Generator
4. ✓ Complete Trade Idea Extractor
5. ✓ Complete Level Extractor
6. ✓ Complete Position Manager
7. ✓ Complete Position Sizing
8. ✓ Implement Session Logger
9. → Update command routes and organization
10. → Create preliminary Mancini integration plan
11. → Finalize folder structure and documentation
12. → Create system architecture document

Remember: The goal is a working MVP that helps make money tomorrow, not a perfect system!