# Intent Trader: Restructured Domain Model

This domain model organizes the Intent Trader system around a hybrid structure that combines temporal trading sessions with a cognitive workflow (Plan → Focus → Execute → Manage → Review). This approach aligns with natural trading processes while maintaining comprehensive coverage of all trading components.

---

## PLAN Domain

**Purpose**: Establish market framework and potential opportunities

### Entities

#### Market Regime
- **Regime Type**: "Buy dips" vs. "Sell bounces" classification
- **Duration**: How long current regime has persisted
- **Strength**: Conviction in regime classification
- **Transition Signals**: Indicators of possible regime change
- **Historical Comparison**: Similar historical regimes
- **Institutional Positioning**: How large players are positioned

#### Mode Classification
- **Mode Type**: Mode 1 (trend day) or Mode 2 (range/trap day)
- **Characteristics**: Defining features of current mode
- **Frequency**: Statistical occurrence of this mode
- **Optimal Strategies**: Best approaches for this mode
- **Transition Risk**: Likelihood of mode shifting
- **Recent Examples**: Similar recent days

#### Level Structure
- **Major Levels**: Primary support/resistance points
- **Minor Levels**: Secondary support/resistance
- **Level Hierarchy**: Organizational structure of levels
- **Historical Significance**: Prior interaction quality
- **Recent Interaction**: Recent price action at levels
- **Consensus Strength**: Multi-source agreement on level
- **Structural Context**: Role in larger patterns

#### Scenario Planning
- **Primary Scenario**: Most likely market development
- **Alternative Scenarios**: Other possible outcomes
- **Trigger Conditions**: What activates each scenario
- **Response Framework**: How to adapt to each scenario
- **Probability Assessment**: Likelihood of each scenario
- **Early Warning Indicators**: Signals of scenario development
- **Transition Management**: How to handle scenario shifts

#### Risk Allocation
- **Daily Risk Budget**: Overall risk limit for the session
- **Setup Type Allocation**: Risk distribution by setup category
- **Correlation Control**: Related exposure management
- **Maximum Exposure Rules**: Caps on total risk
- **Size Scaling Rules**: Position sizing guidelines
- **Focus Idea Allocation**: Enhanced allocation for high-conviction ideas
- **Reserve Requirements**: Maintaining dry powder

#### Market Context
- **Futures Status**: Pre-market futures performance
- **Index Performance**: Major index movements
- **Sector Rotation**: Industry group relative strength
- **Volatility Framework**: VIX and volatility conditions
- **Breadth Measures**: Market internals assessment
- **Catalyst Inventory**: Key events and news
- **Global Market Influence**: International market impacts

---

## FOCUS Domain

**Purpose**: Prioritize specific trade opportunities

### Entities

#### Setup Prioritization
- **Conviction Assessment**: Confidence level ranking
- **Setup Quality Scoring**: Technical validity rating
- **Risk/Reward Evaluation**: Potential R-multiple calculation
- **Opportunity Stack Organization**: Rank ordering methodology
- **Time Window Assessment**: Urgency and timing factors
- **Confluence Factors**: Supporting elements
- **Contradiction Resolution**: Handling competing setups

#### Conviction Classification
- **Language Pattern Recognition**: Phrase-to-confidence mapping
- **Conviction Level Standardization**: High/medium/low framework
- **Source-Specific Terminology**: Analyst-specific language patterns
- **Historical Accuracy Weighting**: Adjust for past performance
- **Contextual Modifiers**: Adjustments based on context
- **Confidence Scoring**: Numerical confidence assessment
- **Analyst Consistency Tracking**: Longitudinal conviction patterns

#### Watchlist Management
- **Active Setup Tracking**: Currently monitored opportunities
- **Priority Ranking System**: Ordered by execution priority
- **Context Preservation**: Associated information storage
- **Status Transitions**: State change tracking
- **Filtering Rules**: Inclusion/exclusion criteria
- **Notification Framework**: Alert generation
- **Visual Organization**: Presentation layout

#### Alert Configuration
- **Price Alert Architecture**: Level breach notifications
- **Condition-Based Notifications**: Complex trigger alerts
- **Urgency Classification**: Priority ranking system
- **Context Preservation**: Associated information maintenance
- **Expiration Framework**: Time-based alert management
- **Stacking Rules**: Multiple alert handling
- **Visual/Audio Differentiation**: Alert type indicators

#### Opportunity Filtering
- **Setup Type Preferences**: Pattern type priorities
- **Risk-Compatible Selection**: Risk budget alignment
- **Conviction Thresholds**: Minimum confidence requirements
- **Time Window Constraints**: Timing-based filtering
- **Market Condition Compatibility**: Current regime alignment
- **Technical Confirmation Requirements**: Validation criteria
- **Historical Performance Filters**: Past success rate consideration

---

## EXECUTE Domain

**Purpose**: Enter positions based on prepared plans

### Entities

#### Entry Trigger
- **Trigger Identification Methodology**: Signal detection approach
- **Confirmation Requirements**: Validation criteria
- **Signal Strength Assessment**: Conviction measurement
- **Timing Optimization**: Entry window determination
- **Volume Confirmation Rules**: Volume threshold requirements
- **Pattern Completion Criteria**: Technical pattern validation
- **Rejection Recognition**: Failed trigger identification

#### Position Sizing
- **Day Trading Scalp Sizing**: Parameters for short-term trades
- **Focus/Big Idea Sizing**: Parameters for high-conviction trades
- **Conviction-Based Adjustment**: Size scaling by confidence
- **Risk-Based Constraints**: Maximum risk limits
- **Volatility Adaptation**: Size adjustment for volatility
- **Correlation Management**: Related position sizing
- **Account Proportion Rules**: Portfolio percentage limits

#### Order Management
- **Order Type Selection**: Market vs. limit decision framework
- **Limit Order Placement**: Price level determination
- **Partial Fill Handling**: Incomplete execution protocol
- **Order Modification Rules**: Change management
- **Time-In-Force Parameters**: Order duration settings
- **Conditional Order Structure**: If-then order configuration
- **Bracket Order Management**: Stop/target order handling

#### Entry Timing
- **Entry Window Definition**: Optimal execution timeframe
- **Signal Strength Assessment**: Confirmation quality measurement
- **Volume Confirmation**: Volume threshold validation
- **Approach Methodology**: Scaling, all-in, or test position
- **Pattern Transition Points**: Optimal entry locations
- **Momentum Alignment**: Entry with momentum considerations
- **Price Action Confirmation**: Candlestick/bar confirmation

#### Execution Quality
- **Slippage Tracking**: Fill price vs. intended price
- **Price Improvement Tracking**: Better-than-expected fills
- **Fill Rate Assessment**: Complete vs. partial execution
- **Time to Execution Metrics**: Order speed tracking
- **Implementation Shortfall**: Performance vs. ideal execution
- **Cost Analysis**: Commission and fee tracking
- **Liquidity Assessment**: Market depth measurement

---

## MANAGE Domain

**Purpose**: Handle active positions toward optimal outcomes

### Entities

#### Core Position Management
- **Initial Core Position Definition**: Base position parameters
- **Profit Buffer Tracking**: Accumulated gain monitoring
- **Re-entry Criteria**: Adding to position rules
- **Position Building Methodology**: Scaling approach
- **Risk Monitoring**: Ongoing exposure assessment
- **Average Price Tracking**: Cost basis maintenance
- **Component Tracking**: Tranche management

#### Trimming Protocol
- **75/15/10 Rule Implementation**: Systematic profit taking
- **Target-Based Reduction**: Taking profits at objectives
- **Scaling Methodology**: Gradual position reduction
- **Profit Buffer Preservation**: Maintaining gains
- **Character Change Response**: Behavior-based exits
- **Time-Based Profit Taking**: Duration-driven exits
- **Volatility-Based Adjustment**: Adapting to market conditions

#### Adding Protocol
- **Entry Improvement Criteria**: Better price opportunities
- **Position Building Rules**: Increasing size methodology
- **Average Price Tracking**: Cost basis management
- **Size Limit Enforcement**: Maximum position constraints
- **Signal Confirmation Requirements**: Adding validation
- **Tiered Entry Framework**: Planned scaling strategy
- **Cost Basis Management**: Average price optimization

#### Stop Adjustment
- **Initial Stop Placement**: Original risk point determination
- **Breakeven Methodology**: Risk elimination approach
- **Trailing Techniques**: Dynamic stop management
- **Partial Exit Adaptation**: Stop changes after trimming
- **Character Change Response**: Behavior-based stop adjustment
- **Time-Based Tightening**: Duration-driven stop movement
- **Volatility-Based Buffer**: Market condition adaptation

#### Runner Management
- **Runner Isolation Framework**: Separating core from runner
- **Trailing Stop Protocol**: Dynamic risk management
- **Re-entry Criteria**: Adding back to runners
- **Target Extension Methodology**: Objective recalibration
- **Time-Based Management**: Duration considerations
- **Volatility Response**: Adapting to changing conditions
- **Take-profit Threshold**: Ultimate exit determination

#### Risk Tolerance Framework
- **"Trading the Market, Not the Money"**: Psychological approach
- **Drawdown Acceptance Parameters**: Loss tolerance by setup
- **Size-Appropriate Loss Tolerance**: Risk scaling by position
- **Winner Management Guidelines**: Handling profitable trades
- **Consecutive Loss Protocol**: Managing losing streaks
- **Daily Risk Reset**: Intraday risk management
- **Confidence-Loss Relationship**: Conviction impact on risk

---

## REVIEW Domain

**Purpose**: Analyze performance for continuous improvement

### Entities

#### Trade Logging
- **Trade Record Schema**: Structured data format
- **Entry/Exit Details**: Execution specifics
- **Setup Classification**: Trade categorization
- **Performance Metrics**: Result measurements
- **Context Preservation**: Market conditions recording
- **Technical State Capture**: Price pattern documentation
- **Psychological Notes**: Mental state recording

#### Performance Metrics
- **P&L Calculation**: Profit/loss measurement
- **R-Multiple Tracking**: Risk-reward outcome
- **Win Rate Assessment**: Success percentage
- **Expectancy Calculation**: Expected value determination
- **Risk-Adjusted Return**: Performance per unit of risk
- **Setup Type Performance**: Results by pattern
- **Time-of-Day Performance**: Results by trading period

#### Plan Adherence
- **Plan vs. Execution Comparison**: Intent vs. action
- **Deviation Analysis**: Variance from plan assessment
- **Decision Quality Assessment**: Judgment evaluation
- **Improvement Opportunities**: Enhancement areas
- **Discipline Measurement**: Rule following assessment
- **Emotional Override Detection**: Psychological interference
- **Adaptation Appropriateness**: Beneficial vs. harmful changes

#### Pattern Recognition
- **Time-of-Day Patterns**: Performance by time period
- **Setup Performance Patterns**: Results by pattern type
- **Psychological Tendencies**: Behavioral inclinations
- **Market Condition Correlations**: Performance by environment
- **Decision Trigger Analysis**: Action initiation patterns
- **Error Repetition**: Recurring mistakes
- **Success Replication**: Repeatable positive behaviors

#### Knowledge Extraction
- **Lesson Identification**: Key learning points
- **Rule Refinement**: Trading system improvements
- **Strategy Adaptation**: Approach modifications
- **Knowledge Base Integration**: System updates
- **Pattern Validation**: Technical setup confirmation
- **Psychological Insight Development**: Behavioral understanding
- **Market Model Enhancement**: Framework improvements

#### Coaching _(Future, not MVP)_
- **Insight Application**: Putting lessons into practice
- **Habit Formation**: Behavioral pattern development
- **Skill Development**: Trading capability enhancement
- **Progress Tracking**: Improvement measurement
- **Feedback Integration**: Learning from results
- **Challenge Construction**: Growth-oriented exercises
- **Success Reinforcement**: Positive pattern strengthening

---

## ANALYST SOURCES Domain

**Purpose**: Track and process expert commentary

### Entities

#### DP Morning Call
- **Market Context**: Futures status, indices, catalysts, sentiment
- **Earnings Analysis**: Beat/miss assessment, guidance, price reactions
- **Analyst Actions**: Upgrades, downgrades, price targets, firm ratings
- **Focus Trade Ideas**: High-conviction opportunities with parameters
- **Day-After-Trades**: Post-event trade opportunities (earnings, news)
- **Technical Levels**: Key price points, moving average relationships
- **Character Change Signals**: Price behavior shift indicators
- **Market Philosophy**: Strategic context and broader approach

#### Mancini Newsletter
- **Publication Metadata**: Date, title, key theme
- **Market Context**: Recent activity, regime assessment
- **Mode Classification**: Mode 1 (trend) vs. Mode 2 (range/trap) assessment
- **Level Framework**: Precise support/resistance with classification
- **Failed Breakdown Analysis**: Core setup identification and examples
- **Bull/Bear Case Scenarios**: Conditional market projections
- **Trade Plan**: Specific levels and action framework
- **Runner Management**: Status of active runners and management protocol
- **Level-to-Level Methodology**: Educational component on profit-taking

#### Inner Circle Commentary
- **Moderator Messages**: Real-time guidance and analysis
- **Trade Alerts**: Specific entry/exit signals
- **Real-time Updates**: Ongoing market developments
- **Q&A Responses**: Questions answered by analysts
- **Member Discussion**: Peer input and observations
- **Sentiment Polls**: Group sentiment measurements

#### VTF Commentary
- **Market Observations**: Perspective on conditions
- **Setup Identifications**: Technical patterns
- **Trading Recommendations**: Actionable ideas
- **Historical Pattern References**: Similar conditions
- **Volatility Assessments**: Volatility regime analysis
- **Tape Reading Insights**: Order flow analysis

---

## SYSTEM MANAGEMENT Domain

**Purpose**: Maintain and optimize the trading system

### Entities

#### Command Registry
- **Command Name**: Unique identifier
- **Description**: Function explanation
- **Parameter Requirements**: Required inputs
- **Response Format**: Output structure
- **Usage Examples**: Implementation samples
- **Related Commands**: Associated functions
- **Permission Level**: Access control
- **Version Information**: Command history

#### Session State
- **Date**: Current trading date
- **Phase**: Premarket/intraday/postmarket
- **Active Plans**: Loaded trading plans
- **Open Positions**: Current trades
- **Watchlist Status**: Monitored tickers
- **Alert Status**: Active notifications
- **System Health**: Operational status
- **User Context**: Personal state information

#### User Preferences
- **Risk Parameters**: Default risk controls
- **Display Settings**: UI preferences
- **Alert Configuration**: Notification preferences
- **Command Shortcuts**: Custom quick commands
- **Analysis Preferences**: Technical framework options
- **Source Weighting**: Analyst priority settings
- **Reporting Preferences**: Output formatting
- **Session Defaults**: Standard configurations

#### Data Archive
- **Trade Records**: Past trade history
- **Plan Archives**: Historical trading plans
- **Analyst History**: Past analyst inputs
- **Market Data**: Historical price information
- **Journal Entries**: Past reflection records
- **System Logs**: Operation history
- **Performance Snapshots**: Results at points in time
- **Backup Management**: Recovery resources
