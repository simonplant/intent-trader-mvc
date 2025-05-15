# Intent Trader System Architecture Document (Updated)

## 1. System Purpose and Vision

Intent Trader is an AI-integrated trading assistant designed to streamline the workflow of active day and swing traders who follow specific trading methodologies and analysts. The system provides structured command-based access to analyst insights (primarily DP and Mancini), technical analysis, trade planning, position management, and performance tracking.

The core vision is to create a cohesive trading companion that:
- Organizes analyst information into actionable trading plans
- Tracks trading activity in real-time
- Provides systematic trade validation
- Facilitates structured performance review
- Captures knowledge and insights for continuous improvement

## 2. Domain Model

### 2.1 Analyst Sources
**Purpose**: Track specific analyst inputs and commentary

**Key Entities**:
- **DP Morning Call**: Dark Pool commentary and trade plan
  - Market Context: Futures status, indices, catalysts
  - Earnings Analysis: Beat/miss, guidance, reactions
  - Analyst Actions: Upgrades, downgrades, price targets
  - Focus Trade Ideas: High-conviction opportunities
  - Day-After-Trades: Post-event opportunities
  - Technical Levels: Key price points and MAs
  - Market Philosophy: Strategic context and approach
  
- **Mancini Newsletter**: Daily market analysis and trading levels
  - Publication Metadata: Date, title, key theme
  - Market Context: Recent activity, market mode
  - Level Framework: Precise support/resistance with major/minor classification
  - Failed Breakdown Analysis: Core setup identification
  - Bull/Bear Case Scenarios: Conditional market projections
  - Trade Plan: Specific levels and action framework
  - Runner Management: Systematic position handling
  - Level-to-Level Methodology: Educational component

- **Inner Circle Commentary**: Trading room discussions
- **VTF Commentary**: Additional analyst insights
- **Analyst Track Record**: Historical performance data

### 2.2 Market Context
**Purpose**: Establish broader market environment

**Key Entities**:
- **Market Regime**: Overall behavior framework (buy dips vs. sell bounces)
- **Market Mode**: Day structure classification (Mode 1 trend vs. Mode 2 range)
- **Market Internals**: Technical health indicators (breadth, TICK, VIX)
- **Key Index Levels**: Major index technical structure
- **Economic Calendar**: Scheduled market-moving events
- **Global Market Influence**: International factors

### 2.3 Technical Analysis
**Purpose**: Analyze price action and patterns

**Key Entities**:
- **Moving Average Framework**: Price vs. MA relationships
  - 8/10/21-day short-term MAs
  - 50/100/200-day long-term MAs
  - Crossover status and direction
  - Price-MA relationship classification

- **Character Change Analysis**: Price behavior shifts
  - Character state assessment
  - Transition indicators
  - Confirmation signals
  - Historical pattern comparison

- **Level Structure**: Support/resistance framework
  - Major/minor classification
  - Historical significance
  - Recent interactions
  - Consensus strength

- **Pattern Recognition**: Technical formations
  - Failed Breakdown identification
  - Acceptance classification
  - Chart pattern detection
  - Momentum assessment

### 2.4 Trade Planning
**Purpose**: Organize trading approach for the session

**Key Entities**:
- **Unified Trade Plan**: Integrated trading framework
  - Market Framework: Bias, mode, catalysts, sector landscape
  - Level Framework: Consensus levels with significance
  - Priority Trade Ideas: Ranked opportunities with parameters
  - Scenario Planning: Conditional market responses
  - Execution Framework: Operation sequence and management
  - Preparation Checklist: Pre-trading verification

- **Morning Blueprint**: Pre-market framework
  - Day structure expectations
  - Key times and events
  - Primary scenarios
  - Risk allocation

- **Watchlist Management**: Prioritized tickers with setups

### 2.5 Position Management
**Purpose**: Track and manage active trades

**Key Entities**:
- **Active Position**: Currently open trade details
  - Entry execution and parameters
  - Current status and P&L
  - Stop and target framework
  - Management protocol

- **Position Management Protocol**: Active trade handling
  - 75/15/10 profit-taking rule
  - Runner management approach
  - Stop adjustment methodology
  - Scale-in/scale-out framework

- **Trade Alerts**: Signal notifications
- **Position Risk Tracker**: Exposure monitoring

### 2.6 Performance Assessment
**Purpose**: Evaluate trading results

**Key Entities**:
- **Trade Journal**: Record of completed trades
- **Analyst Comparison**: Performance vs. analysts
- **Session Debrief**: End-of-day review
- **Pattern Recognition**: Trading behavior analysis
- **Knowledge Capture**: Structured learning

### 2.7 System Management
**Purpose**: Maintain the trading system

**Key Entities**:
- **Command Registry**: Available system commands
- **Session State**: Trading day context
- **User Preferences**: Customized settings
- **Data Archive**: Historical information

## 3. Command Framework

### 3.1 Design Principles

Intent Trader uses a consistent command framework built on:

1. **Verb-Noun Structure**: Commands follow a verb-noun pattern
2. **Consistent Formatting**: Hyphenation used consistently
3. **Clear Parameters**: Input requirements explicitly indicated
4. **Functional Grouping**: Commands grouped by primary function
5. **Intuitive Shortcuts**: Common actions have sensible shortcuts

### 3.2 Command Catalog

#### Analyst Input Commands
```
/analyze-dp [transcript]   - Process DP morning call transcript
/analyze-mancini [letter]  - Process Mancini newsletter
/extract-levels [source]   - Extract market levels from source
/extract-focus [source]    - Extract high-conviction trade ideas
/find-setups [type]        - Identify specific setup types
/analyze-ic [message]      - Process Inner Circle commentary
/analyze-regime            - Assess market regime and mode
```

#### Trade Planning Commands
```
/create-plan               - Generate unified trade plan
/create-blueprint          - Generate morning blueprint
/run-preflight             - Execute pre-market checklist
/update-plan [section]     - Update plan with new information
/show-plan [section]       - Display plan or specific section
/validate-plan             - Check plan consistency and completeness
/manage-watchlist [action] - Manage active watchlist
```

#### Technical Analysis Commands
```
/check-ticker [symbol]     - Analyze ticker comprehensively
/check-character [symbol]  - Assess character change status
/check-ma [symbol]         - Analyze moving average relationships
/check-acceptance [level]  - Verify level acceptance
/analyze-levels [symbol]   - Identify key price levels
/detect-mode               - Determine market mode
```

#### Position Management Commands
```
/add-position [symbol]     - Add new position to tracking
/update-position [symbol]  - Update existing position
/close-position [symbol]   - Close position and log results
/list-positions            - Show current positions
/manage-runner [symbol]    - Apply runner management protocol
/set-alert [symbol]        - Configure price/condition alerts
```

#### Performance Commands
```
/log-trade [symbol]        - Create trade log entry
/add-journal [type]        - Add journal entry
/run-debrief               - Execute session review
/compare-analysts          - Compare vs. analyst performance
/analyze-patterns          - Identify behavioral patterns
```

#### System Management Commands
```
/show-help [command]       - Display help information
/show-version              - Show system version
/backup-system [options]   - Create system backup
/set-preferences [cat]     - Configure user preferences
/run-phase [phase]         - Execute phase actions
```

### 3.3 Command Implementation

Each command is implemented as a structured prompt with:

1. **Front Matter**: Metadata about the command
2. **Purpose**: Clear function description
3. **Input Schema**: Required and optional parameters
4. **Output Schema**: Response format
5. **Processing Logic**: Execution steps
6. **Response Templates**: Output formatting
7. **Examples**: Usage examples

## 4. System Architecture

### 4.1 Component Model

#### Processing Engines
- **Morning Call Processor**: Analyzes DP transcripts
- **Newsletter Processor**: Analyzes Mancini letters
- **Technical Framework**: Handles price analysis
- **Integration Engine**: Combines inputs from multiple sources

#### Core Services
- **Command Router**: Processes and routes commands
- **Entity Store**: Manages entity persistence
- **Schema Validator**: Ensures data integrity
- **State Manager**: Maintains session context

#### User Interface
- **Command Parser**: Interprets user commands
- **Response Formatter**: Standardizes outputs
- **Visualization Engine**: Creates visual elements
- **Alert System**: Manages notifications

### 4.2 Data Flow Architecture

```
[Analyst Inputs] --> [Processing Engines] --> [Integration Engine]
       │                    │                        │
       v                    v                        v
[Technical Data] --> [Technical Framework] --> [Trade Plan Generator]
                             │                        │
                             v                        v
                   [Position Manager] <--> [Risk Controller]
                             │                        │
                             v                        v
                   [Performance Analytics] <--> [Knowledge System]
```

### 4.3 State Management

Intent Trader maintains state through:

1. **Session Manifest**: Tracks current state
2. **Entity Storage**: Persists entity data
3. **Command History**: Records executed commands
4. **User Preferences**: Stores settings
5. **Cache Management**: Handles temporary data

## 5. Workflow Integration

### 5.1 Trading Day Phases

#### Pre-Market Phase (Before 9:30 AM ET)
1. Process analyst inputs (DP call, Mancini newsletter)
2. Generate unified trade plan
3. Create watchlist and alerts
4. Run preflight checklist

#### Intraday Phase (9:30 AM - 4:00 PM ET)
1. Monitor positions and market conditions
2. Validate potential trades
3. Manage entries and exits
4. Track analyst commentary

#### Post-Market Phase (After 4:00 PM ET)
1. Review trading performance
2. Compare to analyst performance
3. Journal insights and lessons
4. Prepare for next session

### 5.2 Key Workflows

#### 1. Morning Preparation Workflow
1. Process analyst inputs
2. Create unified trade plan
3. Build prioritized watchlist
4. Set up alerts and monitors
5. Execute preflight checklist

#### 2. Trade Execution Workflow
1. Validate setup against plan
2. Determine position size and risk
3. Execute entry with proper order type
4. Set initial stops and targets
5. Document trade rationale

#### 3. Position Management Workflow
1. Monitor price vs. key levels
2. Apply 75/15/10 scaling rule at targets
3. Adjust stops according to protocol
4. Manage runner portion for extended moves
5. Document management decisions

#### 4. Performance Review Workflow
1. Log completed trades
2. Assess plan adherence
3. Compare to analyst performance
4. Identify patterns and lessons
5. Update knowledge base

## 6. Integration Methodology

### 6.1 Level Integration

```
1. Extract Mancini's precise numerical levels with major/minor classification
2. Extract DP's key levels with conviction assessment
3. Identify overlapping levels and calculate consensus strength
4. Create unified level structure with combined significance ranking
5. Apply Mode classification context from Mancini
6. Incorporate character change detection from DP
7. Generate integrated level visualization
```

### 6.2 Setup Integration

```
1. Extract Failed Breakdown setups from Mancini with precise criteria
2. Extract focus ideas from DP with conviction assessment
3. Identify complementary and conflicting setups
4. Prioritize setups based on conviction and analyst historical accuracy
5. Apply Mode context to setup evaluation
6. Incorporate character change signals for entry timing
7. Create unified setup monitoring dashboard
```

### 6.3 Position Management Integration

```
1. Apply Mancini's systematic position management protocol (75/15/10 rule)
2. Incorporate DP's character change signals for exit modification
3. Apply Mode-specific risk parameters
4. Utilize consensus levels for target setting
5. Implement runner management for trending moves
6. Apply day-after-trade management for event-driven positions
7. Create unified position management dashboard
```

## 7. Implementation Strategy

### 7.1 Phase 1: Core Analysis Engines
- Morning Call Processor
- Newsletter Processor
- Technical Framework
- Integration Engine

### 7.2 Phase 2: Planning and Position Management
- Unified Plan Generator
- Watchlist Manager
- Position Tracker
- Alert System

### 7.3 Phase 3: Performance and Knowledge
- Trade Logger
- Performance Analyzer
- Pattern Recognition
- Knowledge Extractor

### 7.4 Phase 4: UI and Integration
- Command Interface Refinement
- Visualization Components
- External System Integration
- User Experience Optimization

## 8. Next Steps

### 8.1 Immediate Actions
1. Finalize processor specifications
2. Create JSON schemas for all entities
3. Implement core command infrastructure
4. Develop test datasets and validation framework

### 8.2 Development Roadmap
1. Core Framework Development (Weeks 1-4)
2. Integration Components (Weeks 5-8)
3. Position Management System (Weeks 9-12)
4. Performance Analytics (Weeks 13-16)

This architecture document provides a comprehensive blueprint for the Intent Trader system, integrating the strengths of both DP and Mancini methodologies into a cohesive trading assistant.
