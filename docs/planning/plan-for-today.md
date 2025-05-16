# Implementation Plan: May 15-16, 2025

## Goal: Implement MVP for tomorrow's trading session

This implementation plan follows the cognitive workflow structure (Plan → Focus → Execute → Manage → Review) to deliver a complete trading assistant MVP by tomorrow. It serves as our state manager throughout the implementation process.

## Current State
- **Status**: In Progress
- **Current Phase**: Moving to Position Sizing Implementation
- **Next Task**: Implement Position Sizing command
- **Completed Components**:
  - Morning Call Processor [`/analyze-dp`]
  - Conviction Classification System
  - Unified Trade Plan Generator [`/create-plan`]
  - Trade Idea Extractor [`/extract-focus`]
  - Level Extractor [`/extract-levels`]
  - Position Manager [`/add-position`, `/list-positions`, `/update-position`, `/close-position`]
  - Position State Storage [`state/my-positions.json`, `state/ic-moderator-positions.json`]

## Timeline
1. **Today (May 15)**: Implement core functionality
2. **Tonight**: Test with sample data
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
    - `prompts/manage/add-position.md`
    - `prompts/manage/list-positions.md`
    - `prompts/manage/update-position.md`
    - `prompts/manage/close-position.md`
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
- [ ] **Status**: Not Started
- **Priority**: Medium
- **Estimated Time**: 30 minutes
- **Implementation Path**:
  - Use Prompt Template: [Position Sizing Implementation](master-prompt-instructions.md#7-position-sizing-implementation)
  - Generate artifact: `prompts/execute/size-position.md`
- **Dependencies**: None
- **Output**: Position sizing recommendations based on risk parameters

### 4. MANAGE Phase Implementation (1.5 hours)

#### 4.1 Runner Management [`/manage-runner`]
- [ ] **Status**: Not Started
- **Priority**: Low (Stretch Goal)
- **Estimated Time**: 1.5 hours
- **Implementation Path**:
  - Use Prompt Template: [Runner Management Implementation](master-prompt-instructions.md#8-runner-management-implementation)
  - Generate artifact: `prompts/execute/manage-runner.md`
- **Dependencies**: Position Manager
- **Output**: Runner management guidance and trailing stop recommendations

### 5. REVIEW Phase Implementation (1 hour - stretch goal)

#### 5.1 Trade Logger [`/log-trade`]
- [ ] **Status**: Not Started
- **Priority**: Low (Stretch Goal)
- **Estimated Time**: 30 minutes
- **Implementation Path**:
  - Use Prompt Template: [Trade Logger Implementation](master-prompt-instructions.md#9-trade-logger-implementation)
  - Generate artifact: `prompts/review/log-trade.md`
- **Dependencies**: Position Manager
- **Output**: Structured trade log entries with performance metrics

#### 5.2 Session Debrief [`/run-debrief`]
- [ ] **Status**: Not Started
- **Priority**: Low (Stretch Goal)
- **Estimated Time**: 30 minutes
- **Implementation Path**:
  - Use Prompt Template: [Session Debrief Implementation](master-prompt-instructions.md#10-session-debrief-implementation)
  - Generate artifact: `prompts/review/run-debrief.md`
- **Dependencies**: Trade Logger
- **Output**: Comprehensive session analysis with insights and recommendations

### 6. Integration Testing (1 hour)
- [ ] **Status**: Not Started
- **Priority**: High
- **Estimated Time**: 1 hour
- **Implementation Path**:
  - Test end-to-end workflow manually
  - Create test data and expected outputs
  - Verify correct data flow between components
- **Dependencies**: All core components
- **Output**: Working, integrated system

## Implementation Progress
- Plan Phase: 100% complete
- Focus Phase: 100% complete
- Execute Phase: 67% complete (Position Manager done, Position Sizing pending)
- Manage Phase: 25% complete (Position Management done, Runner Management pending)
- Review Phase: 0% complete
- Overall MVP Progress: 72% complete