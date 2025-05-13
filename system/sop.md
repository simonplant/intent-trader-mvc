---
title: Optimized Trading System Standard Operating Procedures  
description: Enhanced SOP with real-time reorientation capabilities, trade status tracking, and improved moderator signal integration
tags: [system, SOP, process, workflow, optimization]  
author: Simon Plant  
last_updated: 2025-05-13  
version: 3.1  
category: system  
usage: Reference guide for daily system operation. Follow these procedures exactly to ensure consistent execution and performance tracking. Enhanced with improved validation, integration, and feedback mechanisms.
status: active  
requires: [system-parameters.json, trading-behaviors-kb.md, trade-setups-kb.md, market-regimes.md, main-controller.md]  
linked_outputs: [daily-trade-plan, trade-journal, performance-dashboard]  
input_format: markdown  
output_format: markdown  
ai_enabled: false
---

# Optimized Trading System Standard Operating Procedures

## Overview

This document outlines the enhanced standard operating procedures for the AI-assisted trading system. These procedures should be followed precisely to ensure consistent execution, proper risk management, and accurate performance tracking. **All commands must be routed through the main controller.**

## System Architecture

The trading system employs a modular architecture with these specialized components:

1. **Controller** - Central command router and EXCLUSIVE entry point (main-controller.md)
2. **Analyzers** - Process raw data and output structured JSON
3. **Summary Generators** - Convert JSON to human-readable formats
4. **Knowledge Bases** - Store persistent trading knowledge and behaviors
5. **Executors** - Guide actual trade execution and management
6. **Status Trackers** - Monitor trade ideas through their lifecycle

## Data Flow Architecture

The system employs a strict two-tier data flow architecture with formal validation:

```
Raw Input → Analyzers → [JSON Validation] → [JSON Storage] → Integration Points → Summary Generators → Human Output
                                              ↓                                     ↑
                                        System Storage                        Validation Check
```

### System Tier (JSON)
- Structured data for machine processing
- Strict schema enforcement and validation
- Used for downstream processing
- Schema version tracking and compatibility checks

### Human Tier (Summaries)
- Generated from system tier data
- Optimized for readability
- Cross-validated with system tier data
- Does not feed back into system processes

### Previous Day Preparation (12:00 PM - 4:00 PM ET)

#### Mancini Analysis Pre-Staging
- [ ] Process Mancini's newsletter for next day: `/analyze-mancini`
  ```
  /analyze-mancini
  Content:
  [paste Mancini newsletter here]
  ```
- [ ] Map Mancini's key levels to chart framework: `/mancini-chart-map`
  ```
  /mancini-chart-map
  ManciniFile: [reference to Mancini JSON]
  ChartLegend: [reference to chart-visual-legend.md]
  ```
- [ ] Identify Mancini's critical decision points: `/mancini-ma-alignment`
  ```
  /mancini-ma-alignment
  Levels: [list of Mancini levels]
  TimeFrame: [chart timeframe]
  ```
- [ ] Create preliminary decision tree: `/stage-decision-tree`
  ```
  /stage-decision-tree
  ManciniTree: [Mancini decision points]
  ChartPatterns: [MA patterns]
  ```
- [ ] Document alignment between Mancini levels and chart legend hierarchy
- [ ] Pre-configure ThinkOrSwim charts with horizontal lines at key levels
- [ ] Generate pre-staged analysis document: `/generate-prestaged-analysis`
  ```
  /generate-prestaged-analysis
  Mancini: [reference to Mancini JSON]
  ChartContext: [reference to chart analysis]
  MAPatterns: [reference to MA pattern data]
  ```

#### Chart Configuration Update
- [ ] Update yH, yL price levels on charts for watchlist stocks
- [ ] Configure MA studies according to chart-visual-legend.md
- [ ] Set up pivot point studies with correct formatting
- [ ] Configure VWAP and AVWAP studies
- [ ] Create saved chart templates for morning session
- [ ] Apply conditional formatting based on "traffic light" 21 SMA
- [ ] Set preliminary alerts for key levels and MA interactions

#### Pre-Market Preparation
- [ ] Create "Morning Blueprint" combining Mancini analysis and chart patterns
- [ ] Stage preliminary trade ideas based on technical structure
- [ ] Set conditional alerts for overnight futures interactions with key levels
- [ ] Prepare validation checklist for morning DP integration
- [ ] Document expected MA pattern behavior for priority securities
- [ ] Pre-configure ThinkOrSwim layout for morning session

### 2. Premarket Data Collection & Analysis (6:00 AM - 8:00 AM ET)

#### Chart Pattern Analysis
- [ ] Document current MA relationships for key securities:
  - MA alignment patterns (stacked bullish/bearish, crosses)
  - Price positions relative to MA sequence (above all, below all, between)
  - "Traffic light" 21 SMA classification (green, yellow, red)
- [ ] Identify VWAP and AVWAP relationships for priority securities
- [ ] Apply level hierarchy from chart-visual-legend.md to prioritize levels
- [ ] Generate technical structure summary: `/generate-chart-summary`
  ```
  /generate-chart-summary
  Indices: SPX,QQQ,IWM
  Stocks: [watchlist stocks]
  Patterns: true
  Levels: true
  ```

#### DP Analysis
- [ ] Process DP's morning call: `/analyze-dp`
  ```
  /analyze-dp
  Transcript:
  [paste transcript here]
  ```
- [ ] Validate DP JSON output for completeness and structure
- [ ] Flag any data quality issues or ambiguities
- [ ] Generate human-readable DP summary: `/dp-summary`
- [ ] Cross-check emphasis patterns and conviction classifications
- [ ] Document behavioral flags and position context
- [ ] Track moderator positions and sentiment: `/track-moderator-positions`
- [ ] Map DP's price levels to chart patterns: `/map-levels-to-charts`
  ```
  /map-levels-to-charts
  Levels: [DP's key levels]
  ChartContext: [current chart patterns]
  ```

#### Mancini Analysis
- [ ] Process Mancini's blueprint: `/analyze-mancini`
  ```
  /analyze-mancini
  Content:
  [paste Mancini content here]
  ```
- [ ] Validate Mancini JSON output for required fields
- [ ] Check for acceptance pattern details and time requirements
- [ ] Generate human-readable Mancini summary: `/mancini-summary`
- [ ] Verify Failed Breakdown components are complete
- [ ] Ensure decision tree logic is properly structured
- [ ] Map Mancini's key levels to chart patterns: `/map-levels-to-charts`
  ```
  /map-levels-to-charts
  Levels: [Mancini's key levels]
  ChartContext: [current chart patterns]
  ```

#### Technical Level Collection
- [ ] Extract key moving averages: `/get-sma`
  ```
  /get-sma
  Tickers: SPY,QQQ,IWM,AAPL,MSFT,NVDA,TSLA
  ```
- [ ] Validate SMA data for accuracy and completeness
- [ ] Identify SMA clusters for potential support/resistance
- [ ] Extract critical price levels: `/get-levels`
  ```
  /get-levels
  Indices: ES,SPX,NDX,QQQ,VIX
  ```
- [ ] Document premarket ranges and gap conditions
- [ ] Flag any unusual technical conditions
- [ ] Map all technical levels to chart legend hierarchy
- [ ] Identify convergence points between levels and MAs

### 3. Trade Plan Generation & Validation (8:00 AM - 9:00 AM ET)

#### Individual Setup Classification & Scoring
- [ ] Classify each potential trade using standard taxonomy
- [ ] Score each setup using the official scoring system:
  - Primary Setup: 3 points
  - Secondary Aligned Setup: 2 points
  - Tertiary Aligned Setup: 1 point
  - Setup Conflicts: -1 point per conflict
  - Chart Pattern Alignment: 1-3 points based on strength
- [ ] Verify regime compatibility for each setup
- [ ] Flag setups scoring 5+ points for priority
- [ ] Evaluate chart pattern alignment for each setup:
  ```
  /evaluate-chart-alignment
  Setup: [setup details]
  Pattern: [current chart pattern]
  ```

#### Technical Structure Section
- [ ] Add dedicated technical structure section to trade plan:
  ```
  ## Technical Structure (Chart Legend Analysis)
  
  ### Index MA Patterns
  - SPX: [8/21/34/50/100/200 SMA relationship] → [Current pattern] → [Implications]
  - QQQ: [8/21/34/50/100/200 SMA relationship] → [Current pattern] → [Implications]
  - IWM: [8/21/34/50/100/200 SMA relationship] → [Current pattern] → [Implications]
  
  ### Key Level Interactions
  - Recently Tested: [Levels with recent interaction]
  - Currently Testing: [Levels currently being challenged]
  - Next Targets: [Approaching significant levels]
  
  ### MA Traffic Light Status
  - GREEN (Price > 8 & 21): [List securities]
  - YELLOW (Price between): [List securities]
  - RED (Price < 8 & 21): [List securities]
  
  ### Pattern Watch
  - Potential Bull Crosses: [List securities]
  - Potential Bear Crosses: [List securities]
  - MA Compression Areas: [List securities]
  - MA Expansion Developing: [List securities]
  ```

#### Risk Protocol Application
- [ ] Apply Confirmation Requirements for puts/shorts
- [ ] Implement Macro Headline Risk Protocol if applicable
- [ ] Incorporate Sentiment Flip Rule instructions
- [ ] Cross-reference trades against behavioral flags
- [ ] Apply position sizing matrix based on setup/regime/conviction
- [ ] Adjust risk parameters based on chart patterns:
  - Reduce size for counter-trend entries
  - Increase size for strong pattern alignment
  - Apply tighter stops for pattern transition zones

#### Interaction Effects Analysis
- [ ] Identify correlated trade opportunities
- [ ] Check for potential sector concentration
- [ ] Assess portfolio impact of concurrent trades
- [ ] Document potential hedge relationships
- [ ] Flag potentially conflicting directional exposure
- [ ] Evaluate technical correlation across setups

#### Unified Plan Generation
- [ ] Generate unified trade plan: `/generate-trade-plan`
  ```
  /generate-trade-plan
  Regime: [reference to regime JSON]
  DP: [reference to DP JSON]
  Mancini: [reference to Mancini JSON]
  Levels: [reference to levels data]
  SMA: [reference to SMA data]
  ChartPatterns: [reference to chart pattern data]
  ```
- [ ] Validate plan against JSON schema
- [ ] Verify all risk protocols are properly applied
- [ ] Ensure explicit setup classification tagging
- [ ] Check for proper position sizing guidance
- [ ] Perform final cross-validation with source data
- [ ] Initialize trade status categories in tracker
- [ ] Verify chart pattern context for each trade idea

#### Plan Review & Preparation
- [ ] Review complete trade plan: `/show-trade-plan`
- [ ] Verify primary watchlist prioritization logic
- [ ] Set up watchlists and alerts for key levels
- [ ] Prepare logging templates for planned trades
- [ ] Document any known potential behavioral triggers
- [ ] Schedule any planned order entries/exits based on optimal windows
- [ ] Configure chart alerts for pattern transitions

### 4. Market Open (9:30 AM - 10:30 AM ET)

- [ ] Observe opening price action for first 5-15 minutes
- [ ] Compare actual price action to anticipated scenarios
- [ ] Check for any pre-open news or catalysts
- [ ] Execute priority trades identified in premarket if conditions met
  ```
  /copilot-confirm
  Ticker: [symbol]
  Direction: [LONG/SHORT]
  Entry: [price or condition]
  Setup: [setup type]
  Tag: [standardized tag]
  Regime: [current regime]
  Context: [current market context]
  ```
- [ ] Apply the confirmation requirements (from Risk Protocols) before entering puts
- [ ] Implement the Macro Headline Risk Protocol if relevant
- [ ] Document all trade executions with standardized tags
- [ ] Log emotional state at time of execution (1-10 scale)
- [ ] Update trade status tracker with executions: `/update-trade-status`

### 5. Morning Session (10:30 AM - 12:00 PM ET)

- [ ] Activate trading copilot: `/copilot`
- [ ] Monitor priority setups and levels from unified plan
- [ ] Scan for setups matching criteria: `/copilot-scout`
  ```
  /copilot-scout
  Setup: [setup type]
  Tag: [standardized tag]
  Bias: [directional bias]
  Sector: [optional sector focus]
  ```
- [ ] Validate potential trades against plan: `/copilot-confirm`
- [ ] Take planned exits at target levels
- [ ] Apply tiered exit strategy based on setup type
- [ ] Adjust stops according to market behavior
- [ ] Document any plan deviations with rationale
- [ ] Review completed trades: `/copilot-debrief`
  ```
  /copilot-debrief
  Trade: [ticker and direction]
  Entry: [entry price]
  Exit: [exit price]
  Result: [profit/loss]
  Setup: [standardized tag]
  Plan Adherence: [1-10 scale]
  Emotional State: [1-10 scale]
  Observations: [brief notes]
  ```
- [ ] Perform systematic trade status update at 11:00 AM: `/status-update`
- [ ] Track and log moderator alerts: `/track-moderator-alert`

### 6. Intraday Reorientation Protocol (Any Time Needed, Mandatory Every 60-90 Minutes)

#### Status Update Generation
- [ ] Generate current trade status report: `/status-update`
  ```
  /status-update
  Categories: true
  CurrentLevels: true
  PlanState: true
  ModeratorContext: true
  ChartPatterns: true
  ```
- [ ] Review trade ideas sorted by status category:
  - **Already Triggered**: Trades currently active, with execution details
  - **Invalidated**: Setups no longer valid due to price action or time decay
  - **Ready Soon**: Setups approaching trigger conditions within ~5% of price
  - **Not Close**: Valid setups that remain distant from execution conditions
- [ ] Add technical context for each trade idea:
  - MA Pattern: Current pattern from chart-visual-legend.md
  - Level Context: Position relative to key levels in hierarchy
  - VWAP Relationship: Current VWAP status
  - Price-MA Relationship: Above/below/between specific MAs
- [ ] Document reasons for status categorization
- [ ] Reassess active trade management priorities
- [ ] Format status update using standardized chart-enhanced template

#### Chart Context Integration
- [ ] Generate multi-timeframe technical picture: `/chart-analysis`
  ```
  /chart-analysis
  Symbols: [key symbols from plan]
  Timeframes: [short-term, medium-term]
  TechnicalPatterns: true
  ExtensionMeasures: true
  MARelationships: true
  ```
- [ ] Identify potential technical exhaustion conditions
- [ ] Document position within market structure
- [ ] Reassess support/resistance relevance
- [ ] Apply MA alignment pattern recognition from chart-visual-legend.md:
  - Stacked Bullish/Bearish configurations
  - Recent or pending crosses
  - MA compression/expansion areas
  - Price-MA relationships
- [ ] Classify current state using standardized patterns
- [ ] Document VWAP relationships per legend definitions
- [ ] Assess support/resistance strength using level hierarchy from legend
- [ ] Generate MA relationship summary for key securities
- [ ] Identify "traffic light" 21 SMA status across watchlist
- [ ] Map observed patterns to historical performance data

#### Moderator Alert Processing
- [ ] Process any moderator alerts since last orientation: `/process-moderator-alerts`
  ```
  /process-moderator-alerts
  TimeWindow: [time since last update]
  TradeRelevance: true
  SentimentShift: true
  ```
- [ ] Update moderator positioning context
- [ ] Check for sentiment shifts or warnings
- [ ] Prioritize setups aligned with moderator actions
- [ ] Document moderator confirmation of active trades

#### Focus Reset
- [ ] Adjust execution priorities based on current status
- [ ] Reset price alerts to reflect current levels
- [ ] Document any emotional response to recent market action
- [ ] Prioritize next 3-5 actions with clear triggers
- [ ] Document time for next scheduled orientation check

### 7. Midday Reset (12:00 PM - 1:00 PM ET)

#### Plan Invalidation Check
- [ ] Check for plan invalidation triggers:
  - SPX breaking key decision point level
  - VIX moving +/- 10% from open
  - Macro headline during session
  - Inner Circle moderator sentiment flip
  - Two consecutive failed setups
- [ ] Run midday review if any triggers hit: `/midday-reset`
  ```
  /midday-reset
  Morning Trades: [brief summary with tags]
  Open Positions: [current positions]
  Market Development: [how market evolved]
  Invalidation Triggers: [which triggers were hit]
  ```

#### Midday Adjustments
- [ ] Reduce size during typical midday chop (11:30 AM - 2:00 PM)
- [ ] Monitor for moderator sentiment flips (apply Sentiment Flip Rule)
- [ ] Update watchlists based on developing setups
- [ ] Reassess risk parameters based on morning performance
- [ ] Document any behavioral flags triggered in morning session
- [ ] Perform full status update: `/status-update`

### 8. Afternoon Session (1:00 PM - 3:30 PM ET)

- [ ] Focus on high-probability setups from updated plan
- [ ] Apply stricter confirmation criteria for new positions
- [ ] Adjust for changes in market regime or volatility
- [ ] Re-focus trading priorities: `/copilot-recenter`
  ```
  /copilot-recenter
  Current State: [brief assessment]
  Priority Shifts: [what to focus on]
  Risk Adjustments: [size changes]
  Setup Performance: [which setups are working]
  ```
- [ ] Track setup-specific performance during the session
- [ ] Begin reducing overall exposure as appropriate
- [ ] Apply proper scale-out rules for afternoon trades
- [ ] Document any pattern recognition insights
- [ ] Perform systematic trade status update at 2:30 PM: `/status-update`

### 9. Market Close (3:30 PM - 4:00 PM ET)

- [ ] Manage closing positions based on day structure
- [ ] Document final market levels and technical closes
- [ ] Run quick review of completed trades: `/copilot-debrief`
- [ ] Flag any overnight position considerations
- [ ] Note any discrepancies between actual vs. planned execution
- [ ] Record final emotional state and plan adherence metrics
- [ ] Document any trades being held overnight with rationale
- [ ] Perform final trade status update: `/status-update`

### 10. Postmarket Analysis (4:00 PM - 6:00 PM ET)

#### Trade Documentation
- [ ] Record all trades with complete metadata: `/generate-trade-log`
  ```
  /generate-trade-log
  Date: [YYYY-MM-DD]
  Trades: [list of executed trades with standardized tags]
  Setup Types: [list of setup types used]
  Plan Adherence: [overall score 1-10]
  Emotional Control: [overall score 1-10]
  Notes: [additional observations]
  ```

#### Performance Analysis
- [ ] Analyze trading results by setup type: `/performance-debrief`
  ```
  /performance-debrief
  BySetup: true
  ByTimeOfDay: true
  ByMarketRegime: true
  ByConvictionLevel: true
  ```
- [ ] Compare execution against plan: `/performance-vs-mancini`
  ```
  /performance-vs-mancini
  Plan: [reference to day's trade plan]
  Actual: [reference to trade log]
  MissedOpportunities: true
  ExecutionQuality: true
  ```
- [ ] Identify setup-specific win rates and R:R ratios
- [ ] Document time-of-day performance patterns
- [ ] Analyze behavioral pattern correlations
- [ ] Assess status tracking effectiveness: `/evaluate-status-tracking`

#### Knowledge Base Updates
- [ ] Create detailed journal entry: `/generate-journal`
  ```
  /generate-journal
  Emotional State: [honest assessment]
  Market Summary: [brief market description]
  Behavioral Flags: [any triggers noticed]
  Key Lesson: [main takeaway]
  Setup Performance: [which setups worked/failed]
  ```
- [ ] Log behavioral patterns or insights: `/log-kb`
  ```
  /log-kb
  Pattern: [behavior observed]
  Category: [type of pattern]
  Triggers: [what caused the behavior]
  Impact: [how it affected trading]
  Mitigation: [how to address]
  ```
- [ ] Generate knowledge base updates: `/generate-kb-update`
- [ ] Update setup performance statistics
- [ ] Refine risk parameters based on performance
- [ ] Export journal entry to markdown: `/export-journal`

#### System Feedback Loop
- [ ] Update setup win rates and expectancy values
- [ ] Refine position sizing parameters based on performance
- [ ] Adjust regime detection sensitivity if needed
- [ ] Document emerging patterns for future reference
- [ ] Schedule any system parameter updates

## Command Workflow Reference

### Premarket Command Sequence

| Phase | Command | Purpose | Validation |
|-------|---------|---------|------------|
| 0 | `/load-chart-legend` | Access visual legend reference | Verify proper loading |
| 1 | `/system-status` | Verify system readiness | Check all components |
| 2 | `/initialize-status-tracker` | Prepare trade status tracking | Verify initialization |
| 3 | `/classify-regime` | Establish market regime | Validate regime characteristics |
| 4 | `/generate-chart-summary` | Generate technical structure summary | Verify pattern recognition |
| 5 | `/analyze-dp` | Process DP Morning Call transcript | Validate JSON structure |
| 6 | `/dp-summary` | Generate human-readable DP summary | Cross-check with JSON |
| 7 | `/track-moderator-positions` | Log current moderator positions | Verify position tagging |
| 8 | `/analyze-mancini` | Process Mancini Blueprint data | Validate JSON structure |
| 9 | `/mancini-summary` | Generate human-readable Mancini summary | Cross-check with JSON |
| 10 | `/map-levels-to-charts` | Map price levels to chart patterns | Verify level-pattern alignment |
| 11 | `/get-sma` | Get daily SMA data for key tickers | Verify completeness |
| 12 | `/get-levels` | Extract market levels for indices | Validate against external sources |
| 13 | `/evaluate-chart-alignment` | Assess chart pattern alignment for setups | Verify pattern recognition |
| 14 | `/generate-trade-plan` | Generate unified plan from all sources | Verify setup classifications |
| Alt | `/premarket-sequence` | Run complete premarket workflow in one step | Validate all outputs |

### Intraday Command Sequence

| Phase | Command | Purpose | Validation |
|-------|---------|---------|------------|
| 1 | `/copilot` | Activate intraday trading copilot | Verify activation |
| 2 | `/status-update` | Generate current trade status report | Verify categorization |
| 3 | `/chart-analysis` | Analyze current technical conditions | Validate exhaustion metrics |
| 4 | `/chart-legend` | Access visual legend reference | Verify correct interpretation |
| 5 | `/process-moderator-alerts` | Process recent moderator communications | Check sentiment tracking |
| 6 | `/copilot-scout` | Scan for setups matching criteria | Validate against setup KB |
| 7 | `/copilot-confirm` | Validate potential trade against plan | Check regime compatibility |
| 8 | `/track-moderator-alert` | Track a new moderator alert | Verify action categorization |
| 9 | `/update-trade-status` | Update status of specific trade idea | Validate status transition |
| 10 | `/update-chart-patterns` | Update chart pattern recognition | Verify pattern transitions |
| 11 | `/copilot-debrief` | Log and review completed trade | Verify standardized logging |
| 12 | `/midday-reset` | Mid-session review and plan adjustment | Check invalidation triggers |
| 13 | `/copilot-recenter` | Reset focus during trading day | Validate priority shift logic |

### Postmarket Command Sequence

| Phase | Command | Purpose | Validation |
|-------|---------|---------|------------|
| 1 | `/generate-trade-log` | Create structured log of today's trades | Verify complete metadata |
| 2 | `/performance-debrief` | Analyze trading performance by multiple dimensions | Check setup-specific metrics |
| 3 | `/performance-vs-patterns` | Compare performance against chart patterns | Validate pattern effectiveness |
| 4 | `/evaluate-status-tracking` | Assess status tracking effectiveness | Check transition accuracy |
| 5 | `/evaluate-chart-patterns` | Assess effectiveness of chart pattern recognition | Validate pattern predictiveness |
| 6 | `/generate-journal` | Create trading journal entry | Ensure key lesson identification |
| 7 | `/log-kb` | Log a behavioral pattern or insight | Validate categorization |
| 8 | `/generate-kb-update` | Generate KB update recommendations | Check for actionable insights |
| 9 | `/update-chart-knowledge` | Update chart pattern knowledge base | Validate pattern effectiveness |
| 10 | `/update-behaviors` | Update trading behaviors knowledge base | Verify updates applied |
| 11 | `/export-journal` | Export journal entry to markdown | Validate export format |
| Alt | `/postmarket-sequence` | Run complete postmarket workflow in one step | Verify all outputs | `/postmarket-sequence` | Run complete postmarket workflow in one step | Verify all outputs |

## Enhanced Data Validation Requirements

### Analyzer Output Validation

When using analyzer commands (e.g., `/analyze-dp`, `/analyze-mancini`):

1. Validate JSON structure against formal schema requirements:
   - Required fields: Check that all mandatory fields are present
   - Data types: Verify all fields have correct data types
   - Format validation: Ensure dates, numbers, etc. follow required formats
   - Relationship integrity: Verify related data is consistent

2. Validate data quality and completeness:
   - Conviction classifications: Check emphasis patterns match classifications
   - Level specification: Ensure all price levels have proper context
   - Setup components: Verify all required components for each setup type
   - Decision tree logic: Check for logical consistency

3. Handle validation failures:
   - Document specific validation errors
   - Attempt to repair data if possible
   - Re-run analyzer with corrected input
   - If unresolvable, document limitations and proceed with available data

### Two-Phase Trade Evaluation

For all potential trades:

1. **Individual Evaluation Phase**:
   - Apply setup classification based on trade-setups-kb.md
   - Score each setup using the official scoring system
   - Verify regime compatibility
   - Apply behavioral flag review
   - Assign initial conviction rating

2. **Interaction Effects Analysis**:
   - Identify correlated setup opportunities
   - Check for sector/asset concentration
   - Assess directional exposure balance
   - Evaluate overall risk distribution
   - Adjust priorities based on portfolio effects

3. **Final Prioritization**:
   - Rank by conviction level
   - Consider setup score
   - Factor in regime compatibility
   - Weigh risk/reward ratio
   - Account for interaction effects

## Trade Status Lifecycle Management

All trade ideas must be tracked through their entire lifecycle using the Status Tracker:

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

## Moderator Signal Integration

### Moderator Alert Tracking

All moderator alerts must be logged with:
- Timestamp
- Moderator identity
- Ticker symbol
- Action type (entry, exit, trim, add, warning)
- Direction (long, short, neutral)
- Context (price, market conditions)
- Source message verbatim

### Moderator Signal Classification

Classify each moderator signal into one of these categories:
- **Position Initiation**: New long or short position
- **Position Management**: Trim, add, adjust stop
- **Position Exit**: Complete exit from position
- **Sentiment Indicator**: Commentary on market direction
- **Warning**: Risk alert or caution message
- **Strategic**: Longer-term positioning guidance

### Moderator Confirmation Protocol

When multiple moderators signal the same direction:
- Increase conviction rating by one level
- Document specific moderators and their actions
- Note timing sequence of moderator actions
- Apply special priority in status tracking

### Moderator Divergence Protocol

When moderators signal conflicting directions:
- Document exact divergence details
- Note historical accuracy of each moderator
- Apply regime-specific weighting to conflicting signals
- Flag for heightened caution in execution

## Enhanced Risk Management Protocols

### Confirmation Requirements Before Entering Puts/Shorts

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

## Setup Compatibility Matrix

This enhanced compatibility matrix must be applied during trade evaluation:

| Setup Type | Trending Up | Trending Down | Choppy/Range | Event-Driven | Squeeze |
|------------|-------------|--------------|--------------|--------------|---------|
| FB (Failed Breakdown) | ✓✓✓ | ✓ | ✓✓ | ✓ | ✓✓✓ |
| RR (Range Reclaim) | ✓ | ✓ | ✓✓✓ | ✓ | ✓✓ |
| TC (Trend Continuation) | ✓✓✓ | ✓✓✓ | ✗ | ✓ | ✓✓ |
| VC (Volume Climax) | ✓ | ✓ | ✓ | ✓✓✓ | ✓✓ |
| EG (Earnings Gap) | ✓✓ | ✓✓ | ✓ | ✓✓✓ | ✓ |
| IC (Inner Circle) | ✓✓✓ | ✓✓✓ | ✓✓ | ✓✓ | ✓✓✓ |
| ORB (Opening Range B/O) | ✓✓✓ | ✓✓ | ✗ | ✓ | ✓✓ |
| VB (VWAP Boulevard) | ✓✓✓ | ✓✓ | ✗ | ✓ | ✓ |

Legend: ✓✓✓ = Ideal (Full Size), ✓✓ = Good (75% Size), ✓ = Acceptable (50% Size), ✗ = Avoid

## Position Sizing Matrix

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

## Plan Invalidation Triggers

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

## Performance Tracking Enhancement

### Trade Logging Requirements

All trades must be logged with this enhanced metadata:

- **Basic Data**:
  - Entry and exit prices and times
  - Position size and direction
  - P&L amount and percentage

- **Classification Data**:
  - Standard setup tag (e.g., "FB-L-CF-HC")
  - Conviction level (BIG_IDEA, HIGH, MEDIUM, LOW)
  - Regime during execution
  - Source (DP, Mancini, Own, etc.)

- **Execution Quality**:
  - Planned vs. actual entry (% deviation)
  - Planned vs. actual exit (% deviation)
  - Timing quality score (1-10)
  - Plan adherence score (1-10)

- **Status Tracking Data**:
  - Time spent in each status category
  - Number of status transitions
  - Status at time of execution
  - Deviation from expected timing

- **Behavioral Data**:
  - Emotional state during entry (1-10)
  - Emotional state during exit (1-10)
  - Behavioral flags triggered
  - Decision quality score (1-10)

- **Context Data**:
  - Key technical levels that triggered action
  - Market conditions during trade
  - Specific confirmation patterns observed
  - Any relevant volatility context

### Setup-Specific Performance Tracking

Track these metrics by setup type:

- Win rate percentage
- Average R:R ratio
- Expectancy (win% × avg win) - (loss% × avg loss)
- Average hold time
- Best time-of-day performance
- Regime-specific win rates
- Size-adjusted performance
- Status transition effectiveness

### Feedback Loop Protocol

After each trading day:

1. Calculate setup-specific performance metrics
2. Update historical performance database
3. Adjust setup priorities based on recent performance
4. Refine position sizing parameters
5. Update confirmation requirement thresholds
6. Document behavioral insights for future reference
7. Assess status tracking effectiveness
8. Update status transition rules if needed

## System Maintenance

### Daily Tasks

- [ ] Back up all trade logs and journal entries
- [ ] Update knowledge base with new observations
- [ ] Document any system issues or failures
- [ ] Sync local files with git repository
- [ ] Update setup performance statistics
- [ ] Check and validate all JSON data
- [ ] Archive status tracker data

### Weekly Tasks

- [ ] Review all journal entries for patterns
- [ ] Update trading behaviors knowledge base
- [ ] Assess system performance metrics by setup
- [ ] Refine risk management parameters
- [ ] Clean up data storage
- [ ] Review underperforming setups
- [ ] Update position sizing matrix if needed
- [ ] Optimize status transition rules

### Monthly Tasks

- [ ] Conduct full system performance review by setup type
- [ ] Update system parameters based on market conditions
- [ ] Refine analyzer extraction rules
- [ ] Improve trade plan generation logic
- [ ] Test system with historical data using `/replay-day`
- [ ] Perform regime-specific performance analysis
- [ ] Re-evaluate all behavioral flags
- [ ] Assess moderator signal integration effectiveness

## CHANGELOG

- v3.1 (2025-05-13): Added Trade Status Lifecycle Management, Intraday Reorientation Protocol, enhanced Moderator Signal Integration, Technical Exhaustion Protocol, and improved Status Tracking
- v3.0 (2025-05-12): Major revision with enhanced validation, two-phase trade evaluation, improved risk protocols, setup-specific tracking, position sizing matrix, plan invalidation triggers, and formal feedback loop
- v2.2 (2025-05-08): Integrated controller-based command structure, added command sequence tables, incorporated risk protocols from addendum, updated JSON validation procedures
- v2.1 (2025-05-05): Updated to reflect JSON-based data flow architecture and separation of analyzer/summary components
- v2.0 (2025-04-01): Initial SOP documentation

## WORK IN PROGRESS NOTES

The following items require additional refinement before integration into the formal SOP:

1. **Chart Analysis Integration**
   - Need to define standardized pattern recognition taxonomy
   - Formalize exhaustion detection metrics and thresholds
   - Create technical context incorporation workflow

2. **Moderator Signal Weighting System**
   - Develop weighted scoring system for conflicting moderator signals
   - Define moderator-specific accuracy tracking
   - Create historical pattern recognition for moderator behavior

3. **Status Update Command Specification**
   - Complete parameter definition for `/status-update` command
   - Define output format standardization
   - Create template for status transition documentation

4. **Cognitive Reset Mechanism Implementation**
   - Define specific triggers for automatic reorientation
   - Create standardized reset protocol steps
   - Develop emotional state monitoring integration

5. **Multi-Level Price Alerts**
   - Design cascading alert system (approaching/at/beyond)
   - Create dynamic alert adjustment based on volatility
   - Define alert priority system

## QUESTIONS FOR DEVELOPMENT

1. How should we handle rapid moderator signal changes? For example, if multiple moderators trim positions within minutes of each other, should this trigger a special protocol?

2. What metrics would best quantify the effectiveness of the status tracking system? How do we measure whether trade idea categorization is helping decision quality?

3. Should the system impose mandatory "no-trade" periods after certain events (like a failed high-conviction trade) to allow for emotional reset?

4. How do we best integrate chart pattern analysis with existing decision frameworks? Should visual confirmation override other signals?

5. What is the optimal refresh frequency for status updates that balances staying current without creating information overload?

6. Should moderator signals have different weights based on time of day? For example, are DP's morning signals more reliable than intraday adjustments?

7. How can we better identify when a trade failing is due to poor execution versus a flawed setup?

8. What additional metadata should be captured during status transitions to improve future pattern recognition?

9. How can we formalize the "Extended/Normal" market condition detection into an objective framework?

10. What type of simulation environment would be most effective for testing the status tracking system with historical data?
