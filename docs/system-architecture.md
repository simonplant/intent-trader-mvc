# Intent Trader System Architecture Document (Updated)

This document outlines the comprehensive architecture of the Intent Trader system, organized around a hybrid structure that combines temporal trading sessions with the cognitive workflow (Plan → Focus → Execute → Manage → Review).

## 1. System Purpose and Vision

Intent Trader is an AI-integrated trading assistant designed to streamline the workflow of active day and swing traders who follow specific trading methodologies and analysts. The system provides structured command-based access to analyst insights (primarily DP and Mancini), technical analysis, trade planning, position management, and performance tracking.

The core vision is to create a cohesive trading companion that:
- Organizes analyst information into actionable trading plans
- Tracks trading activity in real-time
- Provides systematic trade validation
- Facilitates structured performance review
- Captures knowledge and insights for continuous improvement

## 2. Hybrid Organizational Framework

### 2.1 Temporal Sessions

The system is organized around the natural temporal boundaries of a trading day:

- **Pre-Market Session** (Before Market Open)
  - Analysis of morning calls and newsletters
  - Development of trade plan and blueprint
  - Setup identification and prioritization
  - Risk allocation and scenario planning

- **Open Market Session** (Trading Hours)
  - Trade validation and execution
  - Position management and adjustment
  - Real-time analysis and adaptation
  - Technical level monitoring

- **Post-Market Session** (After Close)
  - Performance analysis and review
  - Trade logging and documentation
  - Pattern recognition and learning
  - Preparation for next trading session

### 2.2 Cognitive Workflow

Within each temporal session, the system organizes functionality according to the trader's cognitive workflow:

- **PLAN**: Establish market framework and potential opportunities
- **FOCUS**: Prioritize specific trade opportunities
- **EXECUTE**: Enter positions based on prepared plans
- **MANAGE**: Handle active positions toward optimal outcomes
- **REVIEW**: Analyze performance for continuous improvement

This dual structure provides both temporal organization and cognitive process alignment, supporting the trader throughout the complete trading cycle.

## 3. Domain Model

### 3.1 PLAN Domain _(Pre-Market)_
**Purpose**: Establish market framework and potential opportunities

**Key Entities**:
- **Market Regime**: Overall market behavior framework
- **Mode Classification**: Day structure assessment
- **Level Structure**: Price level framework
- **Scenario Planning**: Conditional outcomes
- **Risk Allocation**: Capital distribution rules
- **Market Context**: Broader market environment

### 3.2 FOCUS Domain _(Pre-Market)_
**Purpose**: Prioritize specific trade opportunities

**Key Entities**:
- **Setup Prioritization**: Opportunity ranking
- **Conviction Classification**: Confidence measurement
- **Watchlist Management**: Attention allocation
- **Alert Configuration**: Trigger notification
- **Opportunity Filtering**: Attention optimization

### 3.3 EXECUTE Domain _(Open Market)_
**Purpose**: Enter positions based on prepared plans

**Key Entities**:
- **Entry Trigger**: Action signals
- **Position Sizing**: Risk calibration
- **Order Management**: Execution framework
- **Entry Timing**: Execution optimization
- **Execution Quality**: Implementation measurement

### 3.4 MANAGE Domain _(Open Market)_
**Purpose**: Handle active positions toward optimal outcomes

**Key Entities**:
- **Core Position Management**: Base position handling
- **Trimming Protocol**: Profit taking framework
- **Adding Protocol**: Position building framework
- **Stop Adjustment**: Risk control evolution
- **Runner Management**: Extended position handling
- **Risk Tolerance Framework**: Market vs. money trading approach

### 3.5 REVIEW Domain _(Post-Market)_
**Purpose**: Analyze performance for continuous improvement

**Key Entities**:
- **Trade Logging**: Structured record keeping
- **Performance Metrics**: Result measurement
- **Plan Adherence**: Discipline tracking
- **Pattern Recognition**: Behavior analysis
- **Knowledge Extraction**: Insight development
- **Coaching**: Self-improvement framework _(future, not MVP)_

### 3.6 ANALYST SOURCES Domain
**Purpose**: Track and process expert commentary

**Key Entities**:
- **DP Morning Call**: Dark Pool commentary and trade plan
- **Mancini Newsletter**: Daily market analysis and trading levels
- **Inner Circle Commentary**: Trading room discussions
- **VTF Commentary**: Additional analyst insights

### 3.7 SYSTEM MANAGEMENT Domain
**Purpose**: Maintain and optimize the trading system

**Key Entities**:
- **Command Registry**: Available system commands
- **Session State**: Trading day context
- **User Preferences**: Customized settings
- **Data Archive**: Historical information storage

## 4. Command Framework

### 4.1 Command Organization

Commands are organized according to the hybrid structure, with both temporal session and cognitive workflow groupings:

#### Pre-Market Session Commands

**PLAN Phase**
- `/analyze-dp [transcript]`
- `/analyze-mancini [newsletter]`
- `/analyze-regime`
- `/detect-mode`
- `/create-plan`
- `/create-blueprint`

**FOCUS Phase**
- `/extract-focus [source] [min_conviction]`
- `/extract-levels [source] [indices]`
- `/find-setups [type] [timeframe]`
- `/manage-watchlist [action]`
- `/set-alert [symbol]`
- `/run-preflight`

#### Open Market Session Commands

**EXECUTE Phase**
- `/validate-trade [symbol]`
- `/check-ticker [symbol]`
- `/analyze-levels [symbol] [direction]`
- `/size-position [symbol]`
- `/add-position [symbol]`

**MANAGE Phase**
- `/list-positions`
- `/update-position [symbol]`
- `/close-position [symbol]`
- `/adjust-stop [symbol]`
- `/trim-position [symbol]`
- `/manage-runner [symbol]`
- `/check-character [symbol]`
- `/check-ma [symbol]`
- `/check-acceptance [level] [symbol]`

#### Post-Market Session Commands

**REVIEW Phase**
- `/log-trade [symbol]`
- `/run-debrief`
- `/compare-analysts`
- `/analyze-patterns`
- `/add-journal [type]`
- `/extract-lessons`

#### System Management Commands
- `/show-help [command]`
- `/show-version`
- `/backup-system [options]`
- `/set-preferences [category]`
- `/run-phase [phase]`
- `/define-conviction`

### 4.2 Command Implementation

Each command is implemented as a structured prompt with:

1. **Front Matter**: Metadata about the command
2. **Purpose**: Clear function description
3. **Input Schema**: Required and optional parameters
4. **Output Schema**: Response format
5. **Processing Logic**: Execution steps
6. **Response Templates**: Output formatting
7. **Examples**: Usage examples

## 5. Component Architecture

### 5.1 Processing Engines

#### Analyst Input Processors
- **Morning Call Processor**: Analyzes DP transcripts
  - Section Identifier
  - Focus Idea Extractor
  - Level Extractor
  - Conviction Classifier
  - Market Context Extractor
  - Character Change Detector
  - DAT Opportunity Detector

- **Newsletter Processor**: Analyzes Mancini letters
  - Level Framework Extractor
  - Mode Classifier
  - Failed Breakdown Detector
  - Bull/Bear Case Extractor
  - Runner Management Extractor

#### Technical Analysis Engine
- **Moving Average Framework**: MA relationships and interactions
- **Character Analysis System**: Price behavior analysis
- **Level Analysis System**: Support/resistance identification
- **Pattern Recognition System**: Technical pattern detection
- **Indicator Analysis System**: Technical indicator processing

#### Plan Generation Engine
- **Integrated Plan Generator**: Creates unified trade plans
- **Blueprint Generator**: Creates structured morning blueprints
- **Level Concordance Engine**: Integrates levels from multiple sources
- **Setup Integration System**: Combines setups from multiple sources
- **Risk Allocation System**: Determines capital distribution

#### Position Management Engine
- **Position Tracker**: Manages active positions
- **Risk Calculator**: Computes risk metrics
- **Trimming System**: Implements profit-taking rules
- **Stop Management System**: Handles stop adjustments
- **Runner Management System**: Handles extended positions

#### Performance Analysis Engine
- **Trade Logger**: Records completed trades
- **Performance Calculator**: Computes result metrics
- **Pattern Detector**: Identifies behavior patterns
- **Knowledge Extractor**: Derives insights from trading
- **Debrief Generator**: Creates session summaries

### 5.2 Core Services

- **Command Router**: Processes and routes commands
- **Entity Store**: Manages entity persistence
- **Schema Validator**: Ensures data integrity
- **State Manager**: Maintains session context

### 5.3 User Interface

- **Command Parser**: Interprets user commands
- **Response Formatter**: Standardizes outputs
- **Visualization Engine**: Creates visual elements
- **Alert System**: Manages notifications

## 6. Data Flow Architecture

```
[Analyst Inputs] --> [Input Processors] --> [Technical Validation]
       │                    │                        │
       v                    v                        v
[PLAN Phase Engines] --> [FOCUS Phase Engines] --> [Unified Trade Plan]
       │                         │                        │
       v                         v                        v
[EXECUTE Phase Engines] <--> [Active Positions] <--> [MANAGE Phase Engines]
       │                         │                        │
       v                         v                        v
[Trade Records] --> [REVIEW Phase Engines] --> [Knowledge Base]
       │                         │                        │
       v                         v                        v
[Historical Data] <--> [System State Manager] <--> [User Preferences]
```

## 7. Workflow Integration

### 7.1 Daily Trading Workflow

The Intent Trader system integrates seamlessly with the trader's daily workflow:

#### 1. Pre-Market Workflow
```
1. Process morning call with `/analyze-dp`
2. Extract high-conviction ideas with `/extract-focus`
3. Extract key levels with `/extract-levels`
4. Generate unified plan with `/create-plan`
5. Prepare watchlist and alerts
6. Run preflight checklist before market open
```

#### 2. Open Market Workflow
```
1. Validate potential trades against plan
2. Enter positions with `/add-position`
3. Monitor active positions with `/list-positions`
4. Update positions as needed with `/update-position`
5. Apply trimming and stop adjustment protocols
6. Close completed trades with `/close-position`
```

#### 3. Post-Market Workflow
```
1. Log completed trades with `/log-trade`
2. Run session debrief with `/run-debrief`
3. Compare performance to plan
4. Extract lessons and patterns
5. Prepare for next trading day
```

### 7.2 Cognitive Process Alignment

The system's organization aligns with the trader's cognitive processes:

#### 1. PLAN Phase
```
- Assess market regime and conditions
- Determine day structure and characteristics
- Identify key levels and scenarios
- Allocate risk capital appropriately
```

#### 2. FOCUS Phase
```
- Prioritize setups by quality and conviction
- Organize watchlist by priority
- Configure alerts for key levels
- Filter opportunities to match capacity
```

#### 3. EXECUTE Phase
```
- Confirm entry signals
- Validate against plan
- Size positions appropriately
- Execute with optimal timing
```

#### 4. MANAGE Phase
```
- Monitor active positions
- Apply systematic profit-taking
- Adjust stops based on price action
- Manage runners for extended trades
```

#### 5. REVIEW Phase
```
- Log and analyze completed trades
- Assess plan adherence
- Identify patterns and lessons
- Apply insights to improve
```

## 8. MVP Implementation Strategy

### 8.1 MVP Focus Areas

The v0.5.1 MVP focuses on the core functionality needed for immediate trading value:

#### Phase 1: PLAN & FOCUS (Highest Priority)
- **Analyst Processing**: Extract high-conviction trade ideas from DP
- **Level Extraction**: Identify key technical levels
- **Plan Generation**: Create unified trading plan
- **Setup Prioritization**: Rank opportunities by conviction

#### Phase 2: EXECUTE & MANAGE (High Priority)
- **Position Management**: Track active positions
- **Position Updates**: Update, modify, and close positions
- **Position Monitoring**: View current trades and status
- **Basic Profit Taking**: Simple implementation of trimming protocol

#### Phase 3: REVIEW (Stretch Goal)
- **Trade Logging**: Record completed trades
- **Session Debrief**: Analyze trading session
- **Basic Pattern Recognition**: Identify simple patterns

### 8.2 Post-MVP Enhancement Path

After the MVP is successfully implemented, future enhancements will focus on:

1. **Advanced MANAGE Phase Features**
   - Enhanced 75/15/10 implementation
   - Sophisticated stop management
   - Comprehensive runner protocols

2. **Mancini Integration**
   - Newsletter processing
   - Failed Breakdown pattern detection
   - Mode-based strategy adaptation

3. **Advanced Technical Analysis**
   - Character change detection
   - Mode determination
   - Advanced pattern recognition

4. **Knowledge System Development**
   - Enhanced pattern recognition
   - Rule extraction and refinement
   - Continuous improvement framework

## 9. Architecture Design Principles

The Intent Trader architecture is built on these key principles:

1. **Cognitive Alignment**: Functions organized according to trader's mental process
2. **Temporal Integration**: Seamless support throughout trading day
3. **Modularity**: Components can be developed and enhanced independently
4. **Progressive Implementation**: MVP first, then enhance incrementally
5. **Template-Based Output**: Consistent, structured information presentation
6. **Command-Driven Interface**: Intuitive, consistent command structure
7. **Knowledge Accumulation**: System captures and applies trading insights

This architecture provides a comprehensive framework for the Intent Trader system, with clear organization around both temporal sessions and cognitive workflow, and explicit MVP priorities to guide implementation.
