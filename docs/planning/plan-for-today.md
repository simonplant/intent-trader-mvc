# Implementation Plan: May 15-16, 2025

## Goal: Implement MVP for tomorrow's trading session

This implementation plan follows the cognitive workflow structure (Plan → Focus → Execute → Manage → Review) to deliver a complete trading assistant MVP by tomorrow. It serves as our state manager throughout the implementation process.

## Current State
- **Status**: In Progress
- **Current Phase**: Implementing Trade Plan Generator
- **Next Task**: Implement Unified Trade Plan Generator
- **Completed Components**:
  - Morning Call Processor [`/analyze-dp`]
  - Conviction Classification System

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
  - Generated artifact: `prompts/premarket/analyze-dp.md`
- **Features**:
  - Extracts market context, focus trades, and key levels
  - Classifies trade ideas by conviction level
  - Identifies entry parameters and basic exit strategies
  - Optimized for MVP with essential trading information
- **Next Steps**:
  - ✓ Save to `prompts/premarket/analyze-dp.md`
  - ✓ Implement Conviction Classification System

#### 1.2 Conviction Classification System
- [x] **Status**: Completed
- **Priority**: High
- **Implementation Path**:
  - Used Prompt Template: [Conviction Classification Implementation](master-prompt-instructions.md#2-conviction-classification-implementation)
  - Generated artifact: `system/focus/conviction-classifier.md`
- **Dependencies**: None
- **Used by**: Morning Call Processor

#### 1.3 Unified Trade Plan Generator [`/create-plan`]
- [x] **Status**: Completed
- **Priority**: High
- **Implementation Path**:
  - Used Prompt Template: [Unified Trade Plan Generator Implementation](master-prompt-instructions.md#3-unified-trade-plan-generator-implementation)
  - Generated artifact: `prompts/premarket/create-plan.md`
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
- [ ] **Status**: Not Started
- **Priority**: High
- **Estimated Time**: 1 hour
- **Implementation Path**:
  - Use Prompt Template: [Trade Idea Extractor Implementation](master-prompt-instructions.md#4-trade-idea-extractor-implementation)
  - Generate artifact: `prompts/premarket/extract-focus.md`
- **Dependencies**: Morning Call Processor output
- **Output**: Prioritized list of trade ideas by conviction

#### 2.2 Level Extractor [`/extract-levels`]
- [ ] **Status**: Not Started
- **Priority**: Medium
- **Estimated Time**: 1 hour
- **Implementation Path**:
  - Use Prompt Template: [Level Extractor Implementation](master-prompt-instructions.md#5-level-extractor-implementation)
  - Generate artifact: `prompts/premarket/extract-levels.md`
- **Dependencies**: Morning Call Processor output
- **Output**: Structured level framework for indices and stocks

### 3. EXECUTE Phase Implementation (1.5 hours)

#### 3.1 Position Manager
- [ ] **Status**: Not Started
- **Priority**: High
- **Estimated Time**: 1 hour
- **Implementation Path**:
  - Use Prompt Template: [Position Manager Implementation](master-prompt-instructions.md#6-position-manager-implementation)
  - Generate artifacts:
    - `prompts/intraday/add-position.md`
    - `prompts/intraday/list-positions.md`
    - `prompts/intraday/update-position.md`
    - `prompts/intraday/close-position.md`
- **Dependencies**: None
- **Output**: Position tracking and management commands

#### 3.2 Position Sizing [`/size-position`]
- [ ] **Status**: Not Started
- **Priority**: Medium
- **Estimated Time**: 30 minutes
- **Implementation Path**:
  - Use Prompt Template: [Position Sizing Implementation](master-prompt-instructions.md#7-position-sizing-implementation)
  - Generate artifact: `prompts/intraday/size-position.md`
- **Dependencies**: None
- **Output**: Position sizing recommendations based on risk parameters

### 4. MANAGE Phase Implementation (1.5 hours)

#### 4.1 Runner Management [`/manage-runner`]
- [ ] **Status**: Not Started
- **Priority**: Low (Stretch Goal)
- **Estimated Time**: 1.5 hours
- **Implementation Path**:
  - Use Prompt Template: [Runner Management Implementation](master-prompt-instructions.md#8-runner-management-implementation)
  - Generate artifact: `prompts/intraday/manage-runner.md`
- **Dependencies**: Position Manager
- **Output**: Runner management guidance and trailing stop recommendations

### 5. REVIEW Phase Implementation (1 hour - stretch goal)

#### 5.1 Trade Logger [`/log-trade`]
- [ ] **Status**: Not Started
- **Priority**: Low (Stretch Goal)
- **Estimated Time**: 30 minutes
- **Implementation Path**:
  - Use Prompt Template: [Trade Logger Implementation](master-prompt-instructions.md#9-trade-logger-implementation)
  - Generate artifact: `prompts/postmarket/log-trade.md`
- **Dependencies**: Position Manager
- **Output**: Structured trade log entries with performance metrics

#### 5.2 Session Debrief [`/run-debrief`]
- [ ] **Status**: Not Started
- **Priority**: Low (Stretch Goal)
- **Estimated Time**: 30 minutes
- **Implementation Path**:
  - Use Prompt Template: [Session Debrief Implementation](master-prompt-instructions.md#10-session-debrief-implementation)
  - Generate artifact: `prompts/postmarket/run-debrief.md`
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

## Output Templates

### 1. Morning Call Analysis Template (PLAN Phase)
```json
{
  "marketContext": {
    "futures": {"status": "string", "catalysts": ["string"]},
    "indices": {"dow": {"direction": "string", "change": "string"}, "nasdaq": {"direction": "string", "change": "string"}},
    "keyMovers": [{"ticker": "string", "direction": "string", "magnitude": "string", "reason": "string"}],
    "sentiment": "string"
  },
  "focusIdeas": [
    {
      "ticker": "string",
      "direction": "long/short",
      "conviction": {"level": "high/medium/low", "phrases": ["string"]},
      "entryParameters": {"zone": {"min": "number", "max": "number"}, "condition": "string"},
      "exitParameters": {"stopLoss": "number", "target": "number"},
      "rationale": "string"
    }
  ],
  "levels": {
    "indices": {
      "es": {"support": [{"value": "number"}], "resistance": [{"value": "number"}]},
      "spx": {"support": [{"value": "number"}], "resistance": [{"value": "number"}]}
    }
  }
}
```

### 2. Unified Trade Plan Template (PLAN/FOCUS Phases)
```markdown
# Unified Daily Trade Plan — [DATE]

## Market Overview
- **Futures**: [status]
- **Sentiment**: [assessment]
- **Key Context**: [important information]

---

## DP Trade Ideas (Sorted by Conviction)

| # | Ticker | Level(s)     | Action              | Conviction | Sizing       | Duration | Sentiment |
|---|--------|--------------|---------------------|------------|--------------|----------|-----------|
| 1 | TICK   | 00–00        | [action]            | High       | [size]       | [time]   | [sent]    |
| 2 | TICK   | 00           | [action]            | High       | [size]       | [time]   | [sent]    |
| 3 | TICK   | 00 (00d MA)  | [action]            | Med-High   | [size]       | [time]   | [sent]    |

---

## Key Levels

### Support Zones

| Level | Type     | Notes                                    |
|-------|----------|------------------------------------------|
| 0000  | Major    | [significance]                           |
| 0000  | Minor    | [context]                                |

---

## Moving Averages (Levels-Check Summary)

| Ticker | 8d MA | 21d MA | Price     | Notes                         |
|--------|-------|--------|-----------|-------------------------------|
| SPX    | ~0000 | ~0000  | 0000.00   | [relationship]                |
| TICK   | ~000  | ~000   | 000.00    | [relationship]                |

---

## Execution Notes

- [key focus points]
- [risk notes]
- [management protocol]
```

### 3. Position Tracker Template (EXECUTE/MANAGE Phases)
```markdown
# Active Positions — [DATE]

| Ticker | Direction | Entry   | Current | P&L     | Stop    | Target  | Status    |
|--------|-----------|---------|---------|---------|---------|---------|-----------|
| TICK   | Long      | 000.00  | 000.00  | +0.0%   | 000.00  | 000.00  | Active    |
| TICK   | Short     | 000.00  | 000.00  | -0.0%   | 000.00  | 000.00  | Active    |

## Position Details

### TICK (Long)
- **Entry**: 000.00 at 00:00
- **Current**: 000.00 (+/-0.0%)
- **Stop**: 000.00 (-0.0%)
- **Targets**:
  - T1 (75%): 000.00 (+0.0%)
  - T2 (15%): 000.00 (+0.0%)
  - T3 (10%): 000.00 (+0.0%)
- **Setup**: [type]
- **Notes**: [context]

## Aggregate Risk
- **Total Exposure**: 0.0% of capital
- **Directional Bias**: [long/short/neutral]
```

### 4. Trade Log Template (REVIEW Phase)
```markdown
# Trade Log — [DATE]

| Ticker | Direction | Entry   | Exit    | P&L     | Hold Time | Setup     | Adherence |
|--------|-----------|---------|---------|---------|-----------|-----------|-----------|
| TICK   | Long      | 000.00  | 000.00  | +0.0%   | 0h 00m    | [type]    | [rating]  |
| TICK   | Short     | 000.00  | 000.00  | -0.0%   | 0h 00m    | [type]    | [rating]  |

## Trade Details

### TICK (Long)
- **Entry**: 000.00 at 00:00 [condition]
- **Exit**: 000.00 at 00:00 [reason]
- **Result**: +/-0.0% ($ amount)
- **Plan Adherence**: [assessment]
- **Management**: [assessment]
- **Lessons**: [key takeaways]
```

## Implementation Progress Tracking

| Component                      | Status      | Completed | Location                         |
|--------------------------------|-------------|-----------|----------------------------------|
| Morning Call Processor         | Completed   | [x]       | `prompts/premarket/analyze-dp.md` |
| Conviction Classification      | Completed   | [x]       | `system/focus/conviction-classifier.md` |
| Unified Trade Plan Generator   | Not Started | [ ]       | `prompts/premarket/create-plan.md` |
| Trade Idea Extractor           | Not Started | [ ]       | `prompts/premarket/extract-focus.md` |
| Level Extractor                | Not Started | [ ]       | `prompts/premarket/extract-levels.md` |
| Position Manager - Add         | Not Started | [ ]       | `prompts/intraday/add-position.md` |
| Position Manager - List        | Not Started | [ ]       | `prompts/intraday/list-positions.md` |
| Position Manager - Update      | Not Started | [ ]       | `prompts/intraday/update-position.md` |
| Position Manager - Close       | Not Started | [ ]       | `prompts/intraday/close-position.md` |
| Position Sizing                | Not Started | [ ]       | `prompts/intraday/size-position.md` |
| Runner Management              | Not Started | [ ]       | `prompts/intraday/manage-runner.md` |
| Trade Logger                   | Not Started | [ ]       | `prompts/postmarket/log-trade.md` |
| Session Debrief                | Not Started | [ ]       | `prompts/postmarket/run-debrief.md` |
| Integration Testing            | Not Started | [ ]       | N/A |

## Next Steps

1. ✓ Complete Morning Call Processor implementation
2. ✓ Complete Conviction Classification System
3. Start implementing Unified Trade Plan Generator
4. Update this state document after each component is completed
5. Track dependencies and ensure they are completed before dependent components
6. Focus on remaining PLAN and FOCUS phases next as they are highest priority
7. Test components as they are completed

Remember: The goal is a working MVP that helps make money tomorrow, not a perfect system!
