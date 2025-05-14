
# Intent Trader: Consolidated System Architecture & Development Plan

## 1. System Overview

Intent Trader is a modular, AI-assisted trading system designed to enhance decision-making for active traders. The system integrates multiple information sources (DP calls, Mancini analysis, technical data) and provides structured workflows for different trading phases (premarket, intraday, postmarket).

### Core Value Proposition

Intent Trader combines structured prompts, knowledge bases, and algorithmic components to create a cognitive system that assists with trade planning, execution validation, and performance analysis.

### Key Features

- **Modular prompt design** across trading phases
- **Knowledge integration** from elite market sources (DP, Mancini, technical analysis)
- **Behavioral tracking** to identify emotional patterns and trading psychology
- **Trade validation** against planned setups and risk parameters
- **Performance coaching** based on execution alignment with strategy
- **Status tracking** for maintaining orientation during active trading

## 2. System Architecture

### High-Level Components

The system employs a modular architecture with these specialized components:

1. **Controller** - Central command router and EXCLUSIVE entry point (main-controller.md)
2. **Analyzers** - Process raw data and output structured JSON
3. **Summary Generators** - Convert JSON to human-readable formats
4. **Knowledge Bases** - Store persistent trading knowledge and behaviors
5. **Executors** - Guide actual trade execution and management
6. **Status Trackers** - Monitor trade ideas through their lifecycle

### Data Flow Architecture

The system employs a strict two-tier data flow architecture with formal validation:

```
Raw Input → Analyzers → [JSON Validation] → [JSON Storage] → Integration Points → Summary Generators → Human Output
                                              ↓                                     ↑
                                        System Storage                        Validation Check
```

#### System Tier (JSON)
- Structured data for machine processing
- Strict schema enforcement and validation
- Used for downstream processing
- Schema version tracking and compatibility checks

#### Human Tier (Summaries)
- Generated from system tier data
- Optimized for readability
- Cross-validated with system tier data
- Does not feed back into system processes

### Directory Structure

```
intent-trader/
├── prompts/                  # Phase-based prompts
│   ├── premarket/            # Morning preparation
│   ├── intraday/             # Execution validation
│   ├── postmarket/           # Performance review
│   └── system/               # Core system prompts
├── knowledge/                # Trading knowledge base
│   ├── dp-insights.md        # DP mental model
│   ├── mancini-insights.md   # Mancini framework
│   ├── patterns-and-setups.md # Trade setups
│   └── trade-psychology.md   # Behavior patterns
├── logs/                     # Log storage
│   ├── trades/               # Trade execution logs
│   ├── behaviors/            # Behavior tracking
│   ├── journal/              # Trading journal
│   └── performance/          # Performance metrics
├── system/                   # Core system files
│   ├── main-controller.md    # Route handling
│   ├── registry.yaml         # Prompt registry
│   └── metadata-style.md     # Metadata standards
├── tests/                    # Validation scripts
│   ├── validate-metadata.py  # Checks front matter
│   └── verify-log-schema.py  # Checks JSON logs
└── docs/                     # Documentation
    ├── architecture.md       # System design
    ├── workflow.md           # Usage workflows
    └── examples/             # Example interactions
```

## 3. Main Controller & Command Routes

The main controller routes all prompt interactions by phase and type, enforcing standardized behavior and style.

### Routes

| Route              | Phase       | Description                                  |
|-------------------|-------------|----------------------------------------------|
| /dp-analysis       | premarket   | Parses and extracts trade ideas from DP call |
| /mancini-analysis  | premarket   | Parses Mancini's letter and extracts levels  |
| /stack-rank-trades | premarket   | Prioritizes trades by confidence and setup   |
| /validate-trade    | intraday    | Validates if a trade matches the day's plan  |
| /log-trade         | intraday    | Logs executed trade and rationale            |
| /check-alerts      | intraday    | Triggers if key levels or alerts are hit     |
| /compare-execution | postmarket  | Reviews trade plan vs. actual execution      |
| /performance-coach | postmarket  | Gives coaching based on tagging and behavior |
| /missed-trades     | postmarket  | Flags missed A+ setups based on plan         |

### New Commands to Add (Based on Feedback)

```diff
+ Add `/status-update` command to generate status of all trades
+ Add `/chart-analysis` command for technical context integration
+ Add `/process-moderator-alerts` command to record and classify moderator signals
+ Add `/midday-reset` command for mid-session review and plan adjustment
+ Add `/mancini-chart-map` command to map Mancini's levels to chart framework
+ Add `/generate-pre-staged-analysis` command to prepare for next day

## 4. Standard Operating Procedures (SOP)

The trading system follows a strict workflow across different phases of the trading day:

### Previous Day Preparation (12:00 PM - 4:00 PM ET)

#### Mancini Analysis Pre-Staging
- Process Mancini's newsletter for next day
- Map Mancini's key levels to chart framework
- Identify Mancini's critical decision points
- Create preliminary decision tree
- Document alignment between Mancini levels and chart legend hierarchy
- Pre-configure ThinkOrSwim charts with horizontal lines at key levels
- Generate pre-staged analysis document

#### Chart Configuration Update
- Update yH, yL price levels on charts for watchlist stocks
- Configure MA studies according to chart-visual-legend.md
- Set up pivot point studies with correct formatting
- Configure VWAP and AVWAP studies
- Create saved chart templates for morning session
- Apply conditional formatting based on "traffic light" 21 SMA
- Set preliminary alerts for key levels and MA interactions

#### Pre-Market Preparation
- Create "Morning Blueprint" combining Mancini analysis and chart patterns
- Stage preliminary trade ideas based on technical structure
- Set conditional alerts for overnight futures interactions with key levels
- Prepare validation checklist for morning DP integration
- Document expected MA pattern behavior for priority securities
- Pre-configure ThinkOrSwim layout for morning session

### Premarket Data Collection & Analysis (6:00 AM - 8:00 AM ET)

#### Chart Pattern Analysis
- Document current MA relationships for key securities:
  - MA alignment patterns (stacked bullish/bearish, crosses)
  - Price positions relative to MA sequence (above all, below all, between)
  - "Traffic light" 21 SMA classification (green, yellow, red)
- Identify VWAP and AVWAP relationships for priority securities
- Apply level hierarchy from chart-visual-legend.md to prioritize levels
- Generate technical structure summary

#### DP Analysis
- Process DP's morning call
- Validate DP JSON output for completeness and structure
- Flag any data quality issues or ambiguities
- Generate human-readable DP summary
- Cross-check emphasis patterns and conviction classifications
- Document behavioral flags and position context
- Track moderator positions and sentiment
- Map DP's price levels to chart patterns

#### Mancini Analysis
- Process Mancini's blueprint
- Validate Mancini JSON output for required fields
- Check for acceptance pattern details and time requirements
- Generate human-readable Mancini summary
- Verify Failed Breakdown components are complete
- Ensure decision tree logic is properly structured
- Map Mancini's key levels to chart patterns

#### Technical Level Collection
- Extract key moving averages
- Validate SMA data for accuracy and completeness
- Identify SMA clusters for potential support/resistance
- Extract critical price levels
- Document premarket ranges and gap conditions
- Flag any unusual technical conditions
- Map all technical levels to chart legend hierarchy
- Identify convergence points between levels and MAs

### Trade Plan Generation & Validation (8:00 AM - 9:00 AM ET)

#### Individual Setup Classification & Scoring
- Classify each potential trade using standard taxonomy
- Score each setup using the official scoring system
- Verify regime compatibility for each setup
- Flag setups scoring 5+ points for priority
- Evaluate chart pattern alignment for each setup

#### Technical Structure Section
- Add dedicated technical structure section to trade plan with:
  - Index MA patterns
  - Key level interactions
  - MA traffic light status
  - Pattern watch

#### Risk Protocol Application
- Apply Confirmation Requirements for puts/shorts
- Implement Macro Headline Risk Protocol if applicable
- Incorporate Sentiment Flip Rule instructions
- Cross-reference trades against behavioral flags
- Apply position sizing matrix based on setup/regime/conviction
- Adjust risk parameters based on chart patterns

#### Interaction Effects Analysis
- Identify correlated trade opportunities
- Check for potential sector concentration
- Assess portfolio impact of concurrent trades
- Document potential hedge relationships
- Flag potentially conflicting directional exposure
- Evaluate technical correlation across setups

#### Unified Plan Generation
- Generate unified trade plan
- Validate plan against JSON schema
- Verify all risk protocols are properly applied
- Ensure explicit setup classification tagging
- Check for proper position sizing guidance
- Perform final cross-validation with source data
- Initialize trade status categories in tracker
- Verify chart pattern context for each trade idea

#### Plan Review & Preparation
- Review complete trade plan
- Verify primary watchlist prioritization logic
- Set up watchlists and alerts for key levels
- Prepare logging templates for planned trades
- Document any known potential behavioral triggers
- Schedule any planned order entries/exits based on optimal windows
- Configure chart alerts for pattern transitions

### Intraday Trading (9:30 AM - 4:00 PM ET)

### 4. Market Open (9:30 AM - 10:30 AM ET)
- Observe opening price action for first 5-15 minutes
- Compare actual price action to anticipated scenarios
- Check for any pre-open news or catalysts
- Execute priority trades identified in premarket if conditions met
- Apply the confirmation requirements before entering puts
- Implement the Macro Headline Risk Protocol if relevant
- Document all trade executions with standardized tags
- Log emotional state at time of execution (1-10 scale)
- Update trade status tracker with executions

### 5. Morning Session (10:30 AM - 12:00 PM ET)
- Activate trading copilot
- Monitor priority setups and levels from unified plan
- Scan for setups matching criteria
- Validate potential trades against plan
- Take planned exits at target levels
- Apply tiered exit strategy based on setup type
- Adjust stops according to market behavior
- Document any plan deviations with rationale
- Review completed trades
- Perform systematic trade status update at 11:00 AM
- Track and log moderator alerts

### 6. Intraday Reorientation Protocol (Any Time Needed, Mandatory Every 60-90 Minutes)
- Generate current trade status report
- Review trade ideas sorted by status category
- Add technical context for each trade idea
- Document reasons for status categorization
- Reassess active trade management priorities
- Format status update using standardized chart-enhanced template
- Generate multi-timeframe technical picture
- Process any moderator alerts since last orientation
- Adjust execution priorities based on current status
- Reset price alerts to reflect current levels
- Document any emotional response to recent market action
- Prioritize next 3-5 actions with clear triggers
- Document time for next scheduled orientation check

### Midday Reset & Afternoon Trading

### 7. Midday Reset (12:00 PM - 1:00 PM ET)
- Check for plan invalidation triggers
- Run midday review if any triggers hit
- Reduce size during typical midday chop (11:30 AM - 2:00 PM)
- Monitor for moderator sentiment flips (apply Sentiment Flip Rule)
- Update watchlists based on developing setups
- Reassess risk parameters based on morning performance
- Document any behavioral flags triggered in morning session
- Perform full status update

### 8. Afternoon Session (1:00 PM - 3:30 PM ET)
- Focus on high-probability setups from updated plan
- Apply stricter confirmation criteria for new positions
- Adjust for changes in market regime or volatility
- Re-focus trading priorities
- Track setup-specific performance during the session
- Begin reducing overall exposure as appropriate
- Apply proper scale-out rules for afternoon trades
- Document any pattern recognition insights
- Perform systematic trade status update at 2:30 PM

### 9. Market Close (3:30 PM - 4:00 PM ET)
- Manage closing positions based on day structure
- Document final market levels and technical closes
- Run quick review of completed trades
- Flag any overnight position considerations
- Note any discrepancies between actual vs. planned execution
- Record final emotional state and plan adherence metrics
- Document any trades being held overnight with rationale
- Perform final trade status update

### Postmarket Analysis (4:00 PM - 6:00 PM ET)

#### Trade Documentation
- Record all trades with complete metadata
- Analyze trading results by setup type
- Compare execution against plan
- Identify setup-specific win rates and R:R ratios
- Document time-of-day performance patterns
- Analyze behavioral pattern correlations
- Assess status tracking effectiveness

#### Performance Analysis
- Create detailed journal entry
- Log behavioral patterns or insights
- Generate knowledge base updates
- Update setup performance statistics
- Refine risk parameters based on performance
- Export journal entry to markdown

#### System Feedback Loop
- Update setup win rates and expectancy values
- Refine position sizing parameters based on performance
- Adjust regime detection sensitivity if needed
- Document emerging patterns for future reference
- Schedule any system parameter updates

## 5. Critical New Feature: Status Tracking Framework

Based on real-world usage feedback, a formal status tracking system should be developed:

### Status Categories

1. **Already Triggered**: Trades currently active with execution details
   - Entry price and time
   - Current P&L
   - Planned exit criteria
   - Moderator alignment status

2. **Invalidated**: Setups no longer valid
   - Invalidation reason (price, time, technical, moderator)
   - Timestamp of invalidation
   - Alternative setups if applicable
   - Behavioral notes if applicable

3. **Ready Soon**: Setups approaching trigger conditions
   - Distance from trigger (percentage or points)
   - Estimated time to potential trigger
   - Required confirmation signals
   - Pre-execution checklist status

4. **Not Close**: Valid setups distant from execution conditions
   - Key levels to monitor
   - Earliest potential activation time
   - Dependencies on other market conditions
   - Monitoring priority (high/medium/low)

### Status Transition Rules

1. **New → Not Close/Ready Soon**:
   - Categorize based on proximity to execution condition
   - Assign monitoring priority based on conviction
   - Set appropriate alerts for key price levels

2. **Not Close → Ready Soon**:
   - Trigger: Price approaches within 5% of execution level
   - Action: Increase monitoring priority
   - Action: Prepare execution parameters
   - Action: Check for confirmation requirements

3. **Ready Soon → Already Triggered**:
   - Trigger: Execution conditions met, position entered
   - Action: Record full execution details
   - Action: Set exit parameters and alerts
   - Action: Note alignment with plan

4. **Ready Soon → Invalidated**:
   - Trigger: Price moves away significantly, technical change, moderator signal change
   - Action: Document specific invalidation reason
   - Action: Assess if setup can be recycled with new parameters
   - Action: Log any behavioral implications

5. **Already Triggered → Completed**:
   - Trigger: Position fully exited
   - Action: Record complete trade details
   - Action: Perform immediate debrief
   - Action: Tag for performance tracking

### Status Update Frequency

- **Scheduled**: At 11:00 AM, 1:00 PM, 2:30 PM, and market close
- **Event-Driven**: After execution of any trade
- **Signal-Driven**: After significant moderator alerts
- **Technical-Driven**: After key level breaks or technical pattern completions
- **User-Initiated**: Any time needed for reorientation

## 6. Enhanced Risk Management Protocols

### Confirmation Requirements for Puts/Shorts

- **Trigger Conditions**: Do not initiate short-biased trades (especially puts) without one of these confirmations:
  - Clear rejection candle off a planned resistance zone on the 15m or 34 EMA
  - Failed breakout (wick above level with full reversal close)
  - Moderator confirmation (DP actively trimming or flipping)

- **Enhanced Implementation**:
  - Use tiered entries: 25% initial size → 75% after confirmation + retest
  - Apply time-based validation: confirmation must occur within 15 minutes of level test
  - Document specific confirmation pattern observed
  - Require stronger confirmation in trending up regime

### Macro Headline Risk Protocol

When any of these conditions exist:
- Fed speakers scheduled during session
- Major economic releases during session
- Geopolitical developments actively unfolding
- Presidential/government statements expected

Apply these enhanced controls:
- Cap initial position size at 1/3 normal risk
- Require TWO confirmation signals before directional bias trades
- Monitor DP/Kira sentiment shift with 5-minute checks
- Do not hold trades through speech/release window
- Set hard circuit breakers (time or price) for all positions
- Document specific macro catalyst being managed

### Sentiment Flip Rule (Moderator-Reversal Protocol)

When Inner Circle leaders (DP, Rickman, Kira) flip sentiment intraday:

1. **Detection Requirements**:
   - Document exact time, instrument, direction, and original statement
   - Verify the flip is explicit, not ambiguous
   - Note price level at time of flip

2. **Response Protocol**:
   - If positioned opposite to new sentiment: Reduce position by at least 50% within 15 minutes
   - Re-evaluate remaining position using stricter criteria
   - Document rationale if staying in trade against the flip
   - Set tighter stop parameters (50% of original risk)

3. **Re-Entry Rules**:
   - Wait for technical confirmation of new sentiment
   - Require clear price acceptance in new direction
   - Start with 50% of normal size
   - Document specific confirmation pattern observed

### Technical Exhaustion Protocol

When any of these technical exhaustion conditions are detected:
- RSI above 75 or below 25 on 15-minute chart
- Three consecutive extended candles (>150% average range)
- Price >2% beyond major technical level without consolidation
- Momentum divergence on multiple timeframes

Apply these controls:
- For longs: Trim at least 50% of position
- For planned entries: Delay until consolidation pattern forms
- Tighten stops to protect recent gains
- Anticipate reversal setups in opposition to extended move
- Document specific exhaustion pattern observed

## 7. Position Sizing Matrix

Apply this enhanced matrix to determine position size:

| Conviction | Regime: Trending | Regime: Choppy | Regime: Event-Driven | Setup Score 7+ | Current Drawdown |
|------------|------------------|----------------|----------------------|----------------|------------------|
| BIG_IDEA | 100% | 75% | 50% | +25% | -25% if >2% DD |
| HIGH | 75% | 50% | 33% | +25% | -25% if >2% DD |
| MEDIUM | 50% | 33% | 25% | No change | -50% if >2% DD |
| LOW | 33% | 25% | 15% | No change | Avoid if >2% DD |

Notes:
- Base percentages are of your maximum allowable position size per charter
- Adjustments are cumulative but cannot exceed 100% or fall below 10%
- "Setup Score 7+" means the setup scores 7 or higher on the multi-setup stacking system
- Current Drawdown refers to today's P&L, not overall account drawdown

## 8. Plan Invalidation Triggers

The trade plan must be reassessed via `/midday-reset` if ANY of these occur:

1. **Price Action Triggers**:
   - SPX/ES moves more than 1% from opening price
   - Key decision point level in plan is broken with acceptance
   - Two consecutive failed setups from primary watchlist

2. **Volatility Triggers**:
   - VIX moves +/- 10% from open
   - Average true range expands more than 25% from 5-day average
   - Unusual tick or breadth readings outside 2 standard deviations

3. **External Triggers**:
   - Unscheduled macro headline during session
   - Fed official comments that impact markets
   - Significant sector rotation (>2% sector divergence)

4. **Inner Circle Triggers**:
   - DP/Kira/Rickman sentiment flip
   - New high-conviction call from DP
   - Explicit "be careful here" warnings from moderators

5. **Status Tracking Triggers**:
   - Over 50% of high-conviction setups invalidated
   - Multiple moderators exiting positions simultaneously
   - Technical exhaustion patterns across multiple instruments

## 9. Key Insights from Real-World Testing

Based on the May 13, 2025 trading session:

### Status Update Format Success
- The "Already Triggered / Invalidated / Ready Soon / Not Close" categorization proved highly effective
- This format provided clear orientation during rapidly changing conditions
- Adding chart pattern context to each status significantly enhanced decision quality

### Moderator Signal Importance
- Rickman's directional flip demonstrated value of moderator adaptability
- Multiple moderators taking the same action (HIMS shorts) provided conviction signals
- Moderator profit-taking aligned with Mancini's "leave only runner" guidance

### Technical Framework Validation
- Mancini's level precision was remarkable (5927 hit "to the tick")
- Support/resistance structure provided reliable framework
- MA relationships provided valuable context for entry/exit decisions

- **Orientation challenges** during active trading that resulted in missed opportunities
- **Status tracking frameworks** that proved effective in real usage
- **Market mode recognition** needs to quickly identify different market behaviors
- **Information integration challenges** when dealing with multiple sources
- **Execution gaps** between planning and taking action

## 10. Backlog & Development Priorities

### Core Functionality Gaps

### CORE-1: Missing Trade Status Lifecycle Management
**Priority:** High
**Description:** System needs to track transition of trade ideas through various states (identified → watching → ready → triggered → managing → completed/invalidated)
**Acceptance Criteria:**
- Auto-categorization of trades as "Already Triggered", "Invalidated", "Ready Soon", or "Not Close"
- Status transition hooks for notification triggers
- Trade idea aging and expiration logic
- Integration with existing plan generation workflow

### CORE-2: Inadequate Real-Time Adaptation Framework
**Priority:** High
**Description:** System lacks formalized protocol for incorporating breaking changes (moderator alerts, technical shifts)
**Acceptance Criteria:**
- Structured response templates for common market events
- Re-prioritization engine for trade ideas based on new information
- Filtering mechanism to eliminate invalidated setups
- Diff generation between sequential plan versions

### CORE-3: Missing Cognitive Reset Mechanism
**Priority:** Medium
**Description:** No formal process to re-center user when feeling overwhelmed by rapid changes
**Acceptance Criteria:**
- Command to generate current trade status snapshot
- Time-based notifications for scheduled re-centering
- Visual comparison of current market state vs. expected scenarios
- One-click "full context" generation

### Technical Enhancements

### TECH-1: Moderator Signal Tracker
**Priority:** High
**Description:** Create standardized tracking system for moderator actions with classification and timestamp
**Technical Details:**
- Schema definition in `/system/schema/moderator-signals.json`
- Parser template in `/prompts/analyzers/moderator-alert-parser.md`
- Storage integration with `/logs/moderator-actions/`
- Moderator action taxonomy in `/knowledge/moderator-signals-kb.md`
- Visualization component for moderator positioning heatmap

### TECH-2: Chart Context Integration Module
**Priority:** Medium
**Description:** Add capability to analyze multi-chart technical context and integrate with trade plan
**Technical Details:**
- Technical condition classifier in `/prompts/analyzers/chart-condition-analyzer.md`
- Integration with price level store in `/data/levels/`
- Technical exhaustion detection logic in `/knowledge/technical-exhaustion-kb.md`
- Extended/normal market condition taxonomy

### TECH-3: Status Update Generator
**Priority:** High
**Description:** Create command to produce structured status updates across all active trade ideas
**Technical Details:**
- Controller command in `/system/controller.md`: `/status-update`
- Status update template in `/prompts/intraday/status-update-template.md`
- Category definition schema in `/system/schema/trade-status-categories.json`
- Transformation from JSON to human-readable format

### User Experience Issues

### UX-1: Orientation Loss During Fast Market Moves
**Problem:** User reports feeling lost and "chasing" when spending time building plan instead of watching markets.
**Impact:** High - Compromises decision quality and increases emotional load
**Reproduction:** Occurs when spending >15 minutes on plan construction during active market hours
**Requirements:**
- Real-time status dashboard for trade ideas
- Clear categorization system for trade opportunities
- Visual indicators of market condition changes

### UX-2: Inefficient Information Integration
**Problem:** Multiple information sources (DP calls, Mancini analysis, moderator signals, price feeds) lack unified structure
**Impact:** Medium - Creates cognitive overhead and delays response time
**Reproduction:** Occurs when attempting to unify disparate data formats during live trading
**Requirements:**
- Standardized information parsing templates
- Timestamp tracking for all data inputs
- Priority weighting system for conflicting signals

## 11. Implementation Roadmap

### Phase 1: Core Framework Enhancement

1. Implement the Trade Status Lifecycle Management system
2. Create the Status Update Generator command
3. Implement the Intraday Reorientation Protocol
4. Develop the Moderator Signal Tracker

### Phase 2: Risk Management & Decision Quality

1. Implement enhanced risk protocols
2. Create position sizing matrix validation
3. Develop plan invalidation triggers
4. Implement cognitive reset mechanisms

### Phase 3: Knowledge Integration & Performance Tracking

1. Enhance technical pattern recognition
2. Improve trade logging and performance metrics
3. Develop knowledge base update mechanisms
4. Create behavior tracking and coaching system

## 12. Coaching Recommendations

### 2. Develop "State of Play" Awareness
- Practice summarizing the current market environment in three sentences or less
- Identify the dominant narrative driving price action
- Regularly verbalize which setups are working versus failing

### 3. Improve Signal Filtering
- Create a hierarchy of information importance (e.g., moderator actions > technical levels > general commentary)
- Implement a "signal decay" approach where older information loses relevance over specific timeframes
- Document exactly which moderator actions deserve immediate attention versus monitoring

### 4. Practice Recovery Drills
- Simulate scenarios where you "step away" from the market for 30 minutes
- Practice quickly regaining orientation using your status update framework
- Time how long it takes to get fully re-oriented and work to reduce this

---

This consolidated document synthesizes the key information from your WIP notes and organizes it into a coherent system development plan. The structure follows software architecture best practices while incorporating the real-world trading insights you've documented. The most important enhancements based on your feedback appear to be:

1. The Status Tracking Framework (Already Triggered/Invalidated/Ready Soon/Not Close)
2. The Intraday Reorientation Protocol (60-90 minute check-ins)
3. Enhanced Risk Management Protocols
4. Moderator Signal Integration
5. Technical Framework Validation