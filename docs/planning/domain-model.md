# Intent Trader: Comprehensive Domain Model

## 1. Analyst Sources
**Purpose**: Track specific analyst inputs and commentary

**Entities**:
- **DP Morning Call**: Dark Pool commentary and trade plan
  - **Market Context**: Futures status, indices, catalysts, sentiment
  - **Earnings Analysis**: Beat/miss assessment, guidance, price reactions
  - **Analyst Actions**: Upgrades, downgrades, price targets, firm ratings
  - **Focus Trade Ideas**: High-conviction opportunities with direction and parameters
  - **Day-After-Trades**: Post-event trade opportunities (earnings, news)
  - **Technical Levels**: Key price points, moving average relationships
  - **Character Change Signals**: Price behavior shift indicators
  - **Market Philosophy**: Strategic approach and broader context
  
- **Mancini Newsletter**: Daily market analysis and trading levels
  - **Publication Metadata**: Date, title, key theme
  - **Market Context**: Recent activity, regime assessment
  - **Mode Classification**: Mode 1 (trend) vs. Mode 2 (range/trap) assessment
  - **Level Framework**: Precise support/resistance with major/minor classification
  - **Failed Breakdown Analysis**: Core setup identification and examples
  - **Bull/Bear Case Scenarios**: Conditional market projections
  - **Trade Plan**: Specific levels and action framework
  - **Runner Management**: Status of active runners and management protocol
  - **Level-to-Level Methodology**: Educational component on profit-taking

- **Inner Circle Commentary**: Trading room discussions
  - **Moderator Messages**: Real-time guidance and analysis
  - **Trade Alerts**: Specific entry/exit signals
  - **Real-time Updates**: Ongoing market developments
  - **Q&A Responses**: Questions answered by analysts
  - **Member Discussion**: Peer input and observations
  - **Sentiment Polls**: Group sentiment measurements

- **VTF Commentary**: Additional analyst insights
  - **Market Observations**: Perspective on conditions
  - **Setup Identifications**: Technical patterns
  - **Trading Recommendations**: Actionable ideas
  - **Historical Pattern References**: Similar conditions
  - **Volatility Assessments**: Volatility regime analysis
  - **Tape Reading Insights**: Order flow analysis

- **Analyst Track Record**: Historical performance data
  - **Success Rate**: Win/loss statistics by analyst
  - **Setup Performance**: Results by setup type
  - **Market Condition Correlation**: Performance in different regimes
  - **Hold Time Analysis**: Optimal holding periods
  - **Pattern Recognition Strengths**: Which patterns each analyst excels at
  - **Risk Management Tendencies**: Stop and target accuracy

## 2. Market Context
**Purpose**: Establish broader market environment

**Entities**:
- **Market Regime**: Overall market behavior framework
  - **Regime Type**: "Buy dips" vs. "Sell bounces"
  - **Duration**: How long current regime has persisted
  - **Strength**: Conviction in regime classification
  - **Transition Signals**: Indicators of possible regime change
  - **Historical Comparison**: Similar historical regimes
  - **Institutional Positioning**: How large players are positioned

- **Market Mode**: Day structure classification (Mancini-specific)
  - **Mode Type**: Mode 1 (trend day) or Mode 2 (range/trap day)
  - **Characteristics**: Defining features of current mode
  - **Frequency**: Statistical occurrence of this mode
  - **Optimal Strategies**: Best approaches for this mode
  - **Transition Risk**: Likelihood of mode shifting
  - **Recent Examples**: Similar recent days

- **Market Internals**: Technical market health indicators
  - **TICK Readings**: High/low/average readings
  - **Advance/Decline Ratios**: Market breadth metrics
  - **VIX and Volatility Measures**: Fear gauge readings
  - **Put/Call Ratios**: Options sentiment indicators
  - **Market Breadth Indicators**: Participation measures
  - **Volume Analysis**: Volume patterns and anomalies
  - **Acceptance Patterns**: Mancini's acceptance framework

- **Key Index Levels**: Major market index tracking
  - **ES Futures Levels**: Support/resistance with significance rankings
  - **SPX Levels**: S&P 500 index technical levels
  - **QQQ Levels**: Nasdaq ETF technical levels
  - **Russell Levels**: Small cap index technical structure
  - **Sector ETF Key Points**: Sector-specific technical levels
  - **Index Relative Strength**: Cross-index relationship analysis
  - **Moving Average Relationships**: Price vs. key MA status
  - **RSI and Oscillator Readings**: Overbought/oversold conditions

- **Economic Calendar**: Scheduled market-moving events
  - **Fed Announcements**: Central bank communications
  - **Economic Data Releases**: CPI, jobs, etc.
  - **Earnings Reports**: Key company reports
  - **Ex-dividend Dates**: Dividend schedule impacts
  - **Options Expiration Effects**: OpEx influences
  - **Market Holidays**: Trading schedule modifications
  - **Major Press Conferences**: Political or economic announcements

- **Global Market Influence**: International factors
  - **Overnight Market Performance**: Foreign market activity
  - **Forex Movements Impact**: Currency effects
  - **Commodity Price Influences**: Oil, gold, etc.
  - **International News Impact**: Global developments
  - **Correlated Market Movements**: Cross-asset relationships
  - **Geopolitical Developments**: International tensions or agreements

## 3. Technical Analysis
**Purpose**: Analyze price action and patterns

**Entities**:
- **Moving Average Framework**: Price vs. MA relationships
  - **Short-term MAs**: 8-day, 10-day, 21-day values and relationships
  - **Long-term MAs**: 50-day, 100-day, 200-day values and relationships
  - **MA Stack Configuration**: Bullish/bearish alignment
  - **Price-MA Relationship**: Above/below status and distance
  - **MA Crossovers**: Recent and pending crosses
  - **MA Slope**: Direction and steepness
  - **MA Support/Resistance**: Historical interaction quality

- **Character Change Analysis**: Price behavior shifts
  - **Character State**: Current price behavior classification
  - **State Transition**: Shift in price behavior pattern
  - **Confirmation Signals**: Validation of character change
  - **Volume Confirmation**: Volume pattern supporting change
  - **Historical Pattern Comparison**: Similar historical shifts
  - **Predictive Implications**: Expected follow-through
  - **Management Adaptations**: Required adjustments based on change

- **Level Structure**: Support/resistance framework
  - **Major Levels**: Primary support/resistance points
  - **Minor Levels**: Secondary support/resistance
  - **Level Hierarchy**: Organizational structure of levels
  - **Historical Significance**: Prior interaction quality
  - **Recent Interaction**: Recent price action at levels
  - **Consensus Strength**: Multi-source agreement on level
  - **Structural Context**: Role in larger patterns

- **Pattern Recognition**: Technical formations
  - **Failed Breakdown**: Mancini's core setup identification
  - **Acceptance Types**: Classification of price acceptance
  - **Chart Patterns**: Standard technical patterns
  - **Candlestick Patterns**: Japanese candlestick formations
  - **Volume Patterns**: Volume-price relationship patterns
  - **Momentum Divergence**: Price-indicator divergence
  - **Gap Analysis**: Opening gap classification and analysis

- **Indicator Analysis**: Technical indicator framework
  - **RSI Reading**: Current value and interpretation
  - **MACD Status**: Signal, histogram, and crossover status
  - **Bollinger Band Position**: Price location within bands
  - **ADX Trend Strength**: Trend strength measurement
  - **Stochastic Readings**: Overbought/oversold status
  - **Volume Indicators**: On-balance volume, volume profile
  - **Custom Indicators**: Specialized measurement tools

## 4. Trade Planning
**Purpose**: Organize trading approach for the session

**Entities**:
- **Unified Trade Plan**: Integrated trading framework
  - **Market Framework**: Bias, mode, catalysts, sector landscape
  - **Level Framework**: Consensus levels with significance
  - **Priority Trade Ideas**: Ranked opportunities with parameters
  - **Scenario Planning**: Conditional market responses
  - **Execution Framework**: Operation sequence and management
  - **Risk Allocation**: Capital distribution and exposure limits
  - **Preparation Checklist**: Pre-trading verification points

- **Morning Blueprint**: Pre-market framework
  - **Day Structure Expectations**: Anticipated session character
  - **Key Times and Events**: Important time-based triggers
  - **Primary Scenarios**: Most likely market developments
  - **Risk Budget Allocation**: Day-specific risk parameters
  - **Sector Focus Priorities**: Industry groups to prioritize
  - **Personal Trading Constraints**: Individual limitations
  - **Mode Expectation**: Anticipated Mode 1 or Mode 2 day

- **Watchlist Management**: Organized potential opportunities
  - **Active Watchlist Tickers**: Current focus stocks
  - **Setup Categorization**: Organization by pattern type
  - **Priority Ranking**: Ordered by opportunity quality
  - **Monitoring Parameters**: What to watch for each ticker
  - **Alert Configurations**: Price or condition-based alerts
  - **Required Conditions**: Specific criteria by ticker
  - **Technical Context**: Current price vs. key levels/MAs

- **Trade Idea**: Specific potential trade setup
  - **Ticker Symbol**: Instrument identifier
  - **Trade Direction**: Long or short bias
  - **Setup Type**: Pattern or trigger classification
  - **Conviction Level**: Confidence assessment
  - **Entry Parameters**: Price range or conditions
  - **Stop Loss Parameters**: Initial risk point
  - **Target Objectives**: Profit goals
  - **Position Size**: Recommended allocation
  - **Management Protocol**: Handling instructions
  - **Technical Justification**: Supporting analysis

- **Scenario Planning**: Conditional market approach
  - **Primary Scenario**: Most likely market development
  - **Alternative Scenarios**: Other possible outcomes
  - **Trigger Conditions**: What activates each scenario
  - **Response Framework**: How to adapt to each scenario
  - **Probability Assessment**: Likelihood of each scenario
  - **Early Warning Indicators**: Signals of scenario development
  - **Transition Management**: How to handle scenario shifts

## 5. Position Management
**Purpose**: Track and manage active trades

**Entities**:
- **Active Position**: Currently open trade details
  - **Ticker Symbol**: Instrument identifier
  - **Direction**: Long or short
  - **Entry Details**: Price, time, and conditions
  - **Current Status**: State and performance
  - **Position Size**: Shares/contracts and allocation
  - **Risk Parameters**: Stop level and dollar exposure
  - **Target Framework**: Objective levels and reasoning
  - **Management Protocol**: Handling instructions
  - **Technical Context**: Current price vs. key levels/MAs
  - **Setup Type**: Pattern or trigger that initiated trade
  - **Time Horizon**: Expected holding period

- **Position Management Protocol**: Active trade handling
  - **75/15/10 Rule**: Systematic profit-taking framework
  - **Scaling Implementation**: How to reduce position
  - **Stop Adjustment Method**: Dynamic stop management
  - **Runner Handling**: Extended position management
  - **Re-entry Rules**: Criteria for re-establishing position
  - **Character Adaptation**: Adjustments based on behavior change
  - **Correlation Management**: Related position handling

- **Trade Alert**: Signal notification
  - **Alert Source**: Who generated the alert
  - **Ticker Symbol**: Instrument identifier
  - **Action Type**: Buy, sell, adjust stop, etc.
  - **Price Parameters**: Execution price range
  - **Urgency Classification**: Time sensitivity
  - **Confidence Level**: Source conviction
  - **Supporting Rationale**: Justification for alert
  - **Follow-up Protocol**: Expected future updates

- **Position Risk Tracker**: Exposure monitoring
  - **Per-Position Risk**: Individual position exposure
  - **Aggregate Risk**: Total portfolio exposure
  - **Correlation Analysis**: Related position risk
  - **Sector Exposure**: Industry concentration
  - **Beta-Adjusted Risk**: Volatility-normalized exposure
  - **Drawdown Projection**: Worst-case scenario modeling
  - **Risk Budget Status**: Remaining risk allocation

- **Order Management**: Trade execution framework
  - **Order Type**: Market, limit, stop, etc.
  - **Order Status**: Pending, filled, canceled
  - **Execution Quality**: Fill price vs. expected
  - **Partial Fill Handling**: Incomplete execution management
  - **Modification History**: Order adjustment tracking
  - **Conditional Orders**: Trigger-based executions
  - **Time-in-Force Rules**: Order duration parameters

## 6. Performance Assessment
**Purpose**: Evaluate trading results

**Entities**:
- **Trade Log**: Record of completed trades
  - **Trade Identifier**: Unique trade ID
  - **Ticker Symbol**: Instrument traded
  - **Direction**: Long or short
  - **Entry Details**: Price, time, conditions
  - **Exit Details**: Price, time, reason
  - **Performance Metrics**: P&L, R multiple
  - **Setup Classification**: Pattern or trigger type
  - **Plan Adherence**: Consistency with initial plan
  - **Management Assessment**: Execution quality
  - **Technical Context**: Market conditions during trade
  - **Psychological Notes**: Mental state observations

- **Analyst Comparison**: Performance vs. analysts
  - **Execution vs. DP**: Implementation comparison
  - **Execution vs. Mancini**: Level utilization comparison
  - **Setup Success Rate**: Pattern reliability by source
  - **Timing Accuracy**: Entry/exit timing evaluation
  - **Missed Opportunity Analysis**: Unutilized setups
  - **Implementation Differences**: Execution variations
  - **Edge Identification**: Comparative advantages

- **Session Debrief**: End-of-day review
  - **Performance Summary**: Overall session assessment
  - **Plan Execution Quality**: Implementation evaluation
  - **Market Read Accuracy**: Forecast vs. reality
  - **Decision Quality Analysis**: Trading decision assessment
  - **Psychological State Evaluation**: Mental performance
  - **Energy Level Assessment**: Physical/mental stamina
  - **Key Lessons Identified**: Session-specific learnings
  - **Next Session Preparation**: Forward-looking guidance

- **Pattern Recognition**: Trading behavior analysis
  - **Setup Performance Analysis**: Results by pattern type
  - **Time-of-Day Performance**: Temporal success patterns
  - **Execution Quality Patterns**: Implementation trends
  - **Psychological Tendencies**: Behavioral patterns
  - **Market Condition Correlation**: Results by environment
  - **Decision Trigger Analysis**: What prompts decisions
  - **Success/Failure Patterns**: Common elements in outcomes

- **Knowledge Capture**: Structured learning
  - **Trade-Specific Lessons**: Situation-specific insights
  - **Pattern Validations**: Confirmed technical patterns
  - **Rule Refinements**: Trading system improvements
  - **Strategy Adjustments**: Approach modifications
  - **Psychological Insights**: Behavioral understanding
  - **Market Behavior Observations**: Environmental patterns
  - **Generalized Principles**: Broadly applicable lessons

## 7. Knowledge Management
**Purpose**: Organize and apply trading wisdom

**Entities**:
- **Knowledge Base Entry**: Structured trading insight
  - **Entry Identifier**: Unique reference ID
  - **Title**: Concise descriptive name
  - **Category**: Classification (strategy, psychology, etc.)
  - **Content**: Detailed explanation
  - **Source**: Origin of insight
  - **Examples**: Practical applications
  - **Related Entries**: Connected knowledge items
  - **Importance Rating**: Significance assessment
  - **Creation/Update Date**: Timestamp
  - **Tags**: Categorization keywords

- **Trading Rule**: Explicit system guideline
  - **Rule Identifier**: Unique reference ID
  - **Rule Statement**: Clear directive
  - **Purpose**: Problem addressed
  - **Application Context**: When to apply
  - **Exceptions**: When rule doesn't apply
  - **Origin**: Development history
  - **Enforcement History**: Adherence tracking
  - **Related Rules**: Connected guidelines

- **Lesson Catalog**: Structured learning points
  - **Lesson Identifier**: Unique reference ID
  - **Lesson Statement**: Clear insight
  - **Learning Context**: Situation that produced lesson
  - **Application Guidance**: How to implement
  - **Cost of Learning**: What the lesson cost
  - **Reinforcement History**: Times lesson was validated
  - **Related Lessons**: Connected insights

- **Reference Library**: External knowledge resources
  - **Resource Identifier**: Unique reference ID
  - **Title**: Resource name
  - **Type**: Book, article, video, etc.
  - **Source**: Creator/author
  - **Content Summary**: Key points
  - **Application Areas**: How it's useful
  - **Quality Assessment**: Value evaluation
  - **Access Information**: How to retrieve

- **Concept Map**: Relationship between trading concepts
  - **Core Concepts**: Primary trading principles
  - **Concept Relationships**: How ideas connect
  - **Hierarchy**: Organization of knowledge
  - **Application Pathways**: Implementation flows
  - **Conflict Areas**: Contradictory principles
  - **Synthesis Points**: Integrated understanding
  - **Evolution Tracking**: How concepts change over time

## 8. System Management
**Purpose**: Maintain and optimize the trading system

**Entities**:
- **Command Registry**: Available system commands
  - **Command Name**: Unique identifier
  - **Description**: Function explanation
  - **Parameter Requirements**: Required inputs
  - **Response Format**: Output structure
  - **Usage Examples**: Implementation samples
  - **Related Commands**: Associated functions
  - **Permission Level**: Access control
  - **Version Information**: Command history

- **Session State**: Trading day context
  - **Date**: Current trading date
  - **Phase**: Premarket/intraday/postmarket
  - **Active Plans**: Loaded trading plans
  - **Open Positions**: Current trades
  - **Watchlist Status**: Monitored tickers
  - **Alert Status**: Active notifications
  - **System Health**: Operational status
  - **User Context**: Personal state information

- **User Preferences**: Customized settings
  - **Risk Parameters**: Default risk controls
  - **Display Settings**: UI preferences
  - **Alert Configuration**: Notification preferences
  - **Command Shortcuts**: Custom quick commands
  - **Analysis Preferences**: Technical framework options
  - **Source Weighting**: Analyst priority settings
  - **Reporting Preferences**: Output formatting
  - **Session Defaults**: Standard configurations

- **Data Archive**: Historical information storage
  - **Trade Records**: Past trade history
  - **Plan Archives**: Historical trading plans
  - **Analyst History**: Past analyst inputs
  - **Market Data**: Historical price information
  - **Journal Entries**: Past reflection records
  - **System Logs**: Operation history
  - **Performance Snapshots**: Results at points in time
  - **Backup Management**: Recovery resources

- **Plugin System**: Extension framework
  - **Plugin Registry**: Available extensions
  - **Plugin Configuration**: Extension settings
  - **Execution Framework**: How plugins run
  - **Data Access Control**: Resource permissions
  - **Integration Points**: System connections
  - **Version Management**: Update control
  - **Performance Monitoring**: Resource usage
  - **Error Handling**: Problem management

## 9. Risk Management
**Purpose**: Control and mitigate trading risk

**Entities**:
- **Risk Parameters**: Current risk control settings
  - **Maximum Daily Loss**: Daily risk limit
  - **Per-Trade Risk**: Maximum single trade exposure
  - **Maximum Position Size**: Size constraints
  - **Correlation Limits**: Related exposure caps
  - **Sector Exposure Caps**: Industry concentration limits
  - **Beta Adjustment Factors**: Volatility normalizers
  - **Time-Based Adjustments**: Intraday risk modifications
  - **Mode-Specific Parameters**: Risk by market mode

- **Exposure Monitor**: Current market exposure
  - **Open Risk**: Active position exposure
  - **Committed Risk**: Pending order exposure
  - **Aggregate Exposure**: Total portfolio risk
  - **Exposure Distribution**: Risk allocation visualization
  - **Risk Concentration**: Exposure hot spots
  - **Risk Utilization**: Percentage of limits used
  - **Risk Projection**: Forward exposure modeling

- **Position Sizing System**: Size calculation framework
  - **Risk-Based Sizing**: Exposure-driven calculation
  - **Volatility Adjustment**: Size modification for volatility
  - **Conviction Scaling**: Size based on confidence
  - **Correlation Adjustment**: Size considering related positions
  - **Liquidity Constraints**: Size limits based on liquidity
  - **Pattern-Specific Sizing**: Adjustment by setup type
  - **Pyramiding Rules**: Adding to winning positions

- **Risk-Reward Calculator**: Trade opportunity assessment
  - **R Multiple Framework**: Risk unit measurement
  - **Expected Value Calculator**: Probability-adjusted returns
  - **Comparative Opportunity**: Relative setup quality
  - **Historical Setup Performance**: Pattern success rates
  - **Scenario Analysis**: Multiple outcome modeling
  - **Time Value Assessment**: Return per time unit
  - **Opportunity Cost Evaluation**: Alternative use of capital

- **Circuit Breakers**: Automatic risk controls
  - **Daily Loss Limit**: Maximum daily drawdown
  - **Consecutive Loss Counter**: Sequential loss tracking
  - **Volatility Spike Detector**: Unusual volatility response
  - **Pattern Failure Rate**: Setup success monitoring
  - **Emotional State Monitor**: Psychological risk assessment
  - **System Error Detection**: Technical problem identification
  - **Market Condition Alerts**: Abnormal market behavior

## 10. Integration Components
**Purpose**: Combine inputs from multiple sources

**Entities**:
- **Level Concordance Engine**: Level matching system
  - **Level Matcher**: Similar level identification
  - **Consensus Calculator**: Multi-source agreement scoring
  - **Significance Ranker**: Level importance assessment
  - **Context Integrator**: Combined level description
  - **Visualization Generator**: Integrated level display
  - **Source Attribution Tracker**: Origin identification
  - **Historical Validation**: Past interaction quality

- **Setup Integration Framework**: Trade idea combination
  - **Setup Matcher**: Similar opportunity identification
  - **Conviction Integrator**: Confidence assessment combining
  - **Parameter Harmonizer**: Entry/exit standardization
  - **Conflict Resolution System**: Contradictory view handling
  - **Priority Calculator**: Setup ranking algorithm
  - **Source Weighting**: Analyst credibility adjustment
  - **Setup Visualization**: Integrated opportunity display

- **Market Context Integrator**: Environment assessment
  - **Regime Classifier**: Market behavior categorization
  - **Mode Detector**: Mancini's mode identification
  - **Character Evaluator**: DP's character assessment
  - **Sentiment Integrator**: Overall market mood
  - **Catalyst Compiler**: Market-moving events
  - **Context Visualization**: Market framework display
  - **Historical Comparison**: Similar market environments

- **Management Protocol Integrator**: Position handling
  - **75/15/10 Implementer**: Mancini's scaling system
  - **Character Adapter**: DP's behavior-based adjustments
  - **Mode Modifier**: Mode-specific management rules
  - **Trailing System**: Stop management methodology
  - **Runner Protocol**: Extended position handling
  - **Re-entry Framework**: Position re-establishment rules
  - **Management Visualization**: Handling instruction display

This comprehensive domain model captures the complete structure of the Intent Trader system, organizing all entities into logical domains and providing detailed attributes for each entity.
