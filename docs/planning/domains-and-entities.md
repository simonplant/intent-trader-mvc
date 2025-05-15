# Intent Trader: Enhanced Trading Domain Model

## 1. Analyst Sources
**Purpose**: Track specific analyst inputs and commentary

**Entities**:
- **Mancini Newsletter**: Daily market analysis and trading levels
  - Morning levels (ES/SPX/QQQ support/resistance)
  - Trade ideas with specific tickers
  - Market bias and commentary
  - Key times of day to watch
  - Risk assessment for the session

- **DP Morning Call**: Dark Pool commentary and trade plan
  - Transcript text
  - Market outlook assessment
  - Sector analysis points
  - Focus ideas and confidence levels
  - "Stick with" recommendations
  - Market internals assessment
  - Overnight developments recap

- **Inner Circle Commentary**: Trading room discussions
  - Moderator messages
  - Trade alerts and updates
  - Real-time market observations
  - Q&A responses
  - Member discussion threads
  - Sentiment polls

- **VTF Commentary**: Additional analyst insights
  - Market observations
  - Setup identifications
  - Trading recommendations
  - Historical pattern references
  - Volatility assessments
  - Tape reading insights

- **Analyst Track Record**: Historical performance data
  - Success rate by analyst
  - Type of setups they excel at
  - Average hold times
  - Pattern recognition strengths
  - Risk management tendencies

## 2. Market Context
**Purpose**: Establish broader market environment

**Entities**:
- **Market Internals**: Technical market health indicators
  - TICK readings (high/low/average)
  - Advance/Decline ratios
  - VIX and volatility measures
  - Put/Call ratios
  - Market breadth indicators
  - Volume analysis

- **Key Index Levels**: Major market index tracking
  - ES futures levels and structure
  - SPX support/resistance
  - QQQ technical levels
  - Russell patterns
  - Sector ETF key points
  - Index relative strength

- **Economic Calendar**: Scheduled market-moving events
  - Fed announcements
  - Economic data releases
  - Earnings reports
  - Ex-dividend dates
  - Options expiration effects
  - Market holidays

- **Global Market Influence**: International factors
  - Overnight market performance
  - Forex movements impact
  - Commodity price influences
  - International news impact
  - Correlated market movements

## 3. Trade Setup Components
**Purpose**: Define elements of potential trades

**Entities**:
- **Ticker**: Stock symbol and basic information
  - Current price and recent range
  - Moving averages (8, 21, 50, 200)
  - Daily range and volume patterns
  - Sector classification
  - Market cap and float size
  - Short interest data
  - Options open interest

- **Price Levels**: Significant price points
  - Support levels (ranked by strength)
  - Resistance levels (ranked by strength)
  - Moving average locations
  - Recent high/low points
  - Gap areas and prior consolidation
  - VWAP and other intraday references

- **Trade Direction**: Bullish/bearish bias
  - Conviction level (high, medium, low)
  - Time horizon (day trade, swing)
  - Expected movement magnitude
  - Catalyst type (technical, news, earnings)
  - Contrarian vs trend-following

- **Trigger Conditions**: Entry criteria
  - Price action triggers
  - Technical indicator signals
  - Time-based conditions
  - Volume confirmations
  - Relative strength triggers
  - Pattern completions

- **Invalidation Points**: Exit criteria
  - Stop loss levels
  - Technical invalidation conditions
  - Time-based invalidations
  - Pattern breakdown points
  - Relative performance failures
  - Volume disappearance signals

- **Risk Parameters**: Trade-specific risk controls
  - Risk amount per trade
  - Risk-reward ratio
  - Maximum position size
  - Correlation to existing positions
  - Time-based risk adjustments
  - Sector exposure limits

## 4. Trade Plans
**Purpose**: Organize trading approach for the session

**Entities**:
- **DP Trade Plan**: Dark Pool's specific ideas
  - Focus tickers with directional bias
  - Confidence ranking system
  - Entry/exit parameters
  - Key levels to watch
  - Conditional setups ("if/then")
  - Sector rotation expectations

- **Mancini Trade Plan**: Mancini's specific ideas
  - ES/SPX/QQQ level framework
  - Stock-specific setups
  - Directional bias assessment
  - Risk parameters
  - Time-of-day inflection points
  - Key technical patterns

- **Unified Trade Plan**: Synthesized approach
  - Primary market bias
  - Prioritized trade ideas
  - Integrated level structure
  - Execution sequence
  - Risk allocation by setup
  - Contingency scenarios

- **Morning Blueprint**: Pre-market framework
  - Day structure expectations
  - Key times and events
  - Primary scenarios to watch
  - Risk budget allocation
  - Sector focus priorities
  - Personal trading constraints

- **Watchlist Management**: Organized potential opportunities
  - Active watchlist tickers
  - Categorization by setup type
  - Priority ranking system
  - Monitoring parameters
  - Alert configurations
  - Required conditions tracking

## 5. Position Tracking
**Purpose**: Monitor and manage actual trades

**Entities**:
- **My Positions**: Personal trades being executed
  - Ticker and direction
  - Entry price and time
  - Position size and type (stock/options)
  - Current P&L
  - Stop loss and target
  - Scaling plan
  - Notes and reasoning

- **Moderator Positions**: Tracking analyst trades
  - Moderator name
  - Trade details (ticker, direction, etc.)
  - Entry/exit points
  - Performance tracking
  - Notes on reasoning
  - Stated confidence level
  - Updates and adjustments

- **Trade Alerts**: Signal notifications
  - Alert source (DP, Mancini, etc.)
  - Ticker and direction
  - Entry parameters
  - Expected targets
  - Priority/confidence level
  - Context and reasoning
  - Time sensitivity

- **Order Status**: Execution tracking
  - Order type (market, limit, etc.)
  - Status (pending, filled, canceled)
  - Fill price vs. expected
  - Execution quality assessment
  - Slippage tracking
  - Partial fill management
  - Modification history

- **Position Risk Tracker**: Real-time risk monitoring
  - Dollar risk per position
  - Total portfolio exposure
  - Correlation between positions
  - Sector concentration
  - Beta-adjusted exposure
  - Theoretical scenarios impact

## 6. Performance Assessment
**Purpose**: Evaluate trading results

**Entities**:
- **Trade Journal**: Record of completed trades
  - Trade details and outcomes
  - Plan adherence assessment
  - Psychological notes
  - Lessons identified
  - Context preservation
  - Screenshot archiving

- **Analyst Comparison**: Performance vs. analysts
  - My execution vs. DP trade plan
  - My execution vs. Mancini levels
  - Timing alignment analysis
  - Missed opportunities assessment
  - Edge identification
  - Implementation differences

- **Session Debrief**: End-of-day review
  - Performance summary
  - Plan execution quality
  - Market read accuracy
  - Improvement opportunities
  - Emotional state assessment
  - Energy level tracking
  - Decision quality review

- **Pattern Recognition**: Trading pattern analysis
  - Setup performance by type
  - Time-of-day performance
  - Execution quality patterns
  - Psychological tendencies
  - Market condition correlation
  - Decision trigger analysis

- **Knowledge Capture**: Structured learning
  - Trade-specific lessons
  - Pattern validations/invalidations
  - Rule refinements
  - Strategy adjustments
  - Psychological insights
  - Market behavior observations

## 7. System Management
**Purpose**: Maintain and optimize the trading system

**Entities**:
- **Command Registry**: Available system commands
  - Command definitions
  - Parameter requirements
  - Usage examples
  - Related commands
  - Command categories
  - Permission levels

- **Session State**: Trading day context
  - Current phase (premarket, intraday, postmarket)
  - Loaded trade plans
  - Active positions
  - System status
  - Alert configurations
  - Historical context

- **User Preferences**: Customized settings
  - Default risk parameters
  - Display configurations
  - Alert preferences
  - Analytical focus areas
  - Command shortcuts
  - Reporting preferences

- **Data Archive**: Historical information storage
  - Past trade logs
  - Analyst commentary history
  - Plan archives
  - Performance snapshots
  - Journal entries
  - Market data cache

## Best Practices for Command Structure

As for command naming, you're right that `/dp/analyze` doesn't feel natural. Here are better command naming practices:

### 1. Using Verbs for Actions

Commands should use a verb-noun structure that clearly indicates the action:

**Better Structure**: `/analyze-dp` (verb-noun)
**Not**: `/dp/analyze` (noun/verb)

### 2. Consistent Naming Convention

Use hyphenation consistently rather than mixing styles:

**Consistent**: `/extract-levels`, `/analyze-dp`, `/create-plan`
**Inconsistent**: `/extract-levels`, `/analyze_dp`, `/createPlan`

### 3. Clear Parameter Indication

For commands that require input, make it clear:

**Clear**: `/add-position AAPL 100 150.50 148.50 152.00`
**Not**: `/position-add` with unclear parameter structure

### 4. Command Grouping by Function

Group commands by the primary function rather than entity:

**Function-based**: `/analyze-mc`, `/analyze-dp`, `/analyze-vtf`
**Not**: `/mc/analyze`, `/dp/analyze`, `/vtf/analyze`

### 5. Intuitive Shortcuts for Common Actions

Provide intuitive shortcuts for frequent commands:

**Intuitive**: `/levels` as shortcut for `/extract-levels`
**Not**: `/el` as an obscure abbreviation

### Improved Command Examples:

```
# Analyst Input Commands
/extract-levels [source]   - Extract market levels from source (default: Mancini)
/analyze-dp [transcript]   - Process DP morning call transcript
/analyze-ic [message]      - Analyze Inner Circle commentary
/extract-ideas [source]    - Extract trade ideas from analyst source

# Trade Planning Commands
/create-plan               - Create unified trade plan from sources
/create-blueprint          - Generate morning blueprint
/run-preflight             - Pre-market execution checklist
/update-plan [section]     - Update plan with new information

# Trade Analysis Commands
/check-ticker [SYMBOL]     - Show analysis for specific ticker
/validate-trade [IDEA]     - Validate trade idea against plan
/check-setup [SYMBOL]      - Analyze potential setup for ticker
/analyze-news [NEWS]       - Assess news impact on positions

# Position Commands
/add-position [SYMBOL]     - Add new position to tracking
/update-position [SYMBOL]  - Update existing position
/close-position [SYMBOL]   - Close position and log results
/list-positions            - Show all current positions
/set-alert [SYMBOL]        - Set custom alert for position

# Performance Commands
/log-trade [SYMBOL]        - Log completed trade details
/add-journal [ENTRY]       - Add entry to trading journal
/run-debrief               - Run end-of-day review
/compare-dp                - Compare performance against DP's ideas
/compare-mancini           - Compare trades against Mancini's levels
```
