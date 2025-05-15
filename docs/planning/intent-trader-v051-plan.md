# Intent Trader v0.5.1 Refactoring Plan

This document outlines the plan to refactor Intent Trader v0.5.0 to v0.5.1, incorporating trading functionality from the trading-system-prompts repository while maintaining the improved technical foundation.

## Primary Goals

1. **Integrated Source Tracking**
   - Integrate and track high-confidence trade plans from multiple sources (DP, Mancini)
   - Identify and prioritize highest conviction trade ideas across sources
   - Create unified view of trade plans, positions, and alerts

2. **Enhanced Position Management**
   - Track moderator positions and conviction changes in real-time
   - Monitor personal positions, orders, and P&L
   - Create alerting for moderator actions (trims, adds, exits)

3. **Execution Analysis & Optimization**
   - Track actual trade performance against plan
   - Calculate theoretical maximum profit potential for each setup
   - Perform gap analysis between actual and optimal execution
   - Generate specific recommendations to close execution gaps

4. **Comprehensive Dashboard**
   - Integrate price/chart updates with position context
   - Display real-time P&L with reference to planned targets
   - Visualize execution quality metrics
   - Provide at-a-glance view of active opportunities

5. **Technical Foundation**
   - Maintain the modular, schema-first approach
   - Create extensible integration points for future data sources
   - Support eventual VTF app integration and audio transcription

## New Directory Structure

```
intent-trader/
├── system/
│   ├── trade-plans/           (formerly blueprints/)
│   ├── setup-taxonomy/        (new folder for setup definitions)
│   ├── market-context/        (new folder for regime classification)
│   ├── risk-management/       (new folder for risk rules)
│   ├── position-tracking/     (new folder for position management)
│   ├── execution-analysis/    (new folder for performance analysis)
│   ├── alerts/                (new folder for alert processing)
│   ├── schemas/               (expanded for new data structures)
│   ├── cognitive/             (retain existing cognitive system)
│   └── systemops/             (retain existing system operations)
├── prompts/
│   ├── premarket/             (new folder for morning analysis)
│   ├── intraday/              (retain with enhancements)
│   ├── postmarket/            (retain with enhancements)
│   └── utilities/             (renamed from system/ for clarity)
├── integrations/              (new folder for external connections)
│   ├── vtf/                   (future VTF application integration)
│   ├── audio/                 (future audio transcription)
│   └── broker/                (future broker API integration)
└── logs/
    ├── trades/                (enhanced trade logging)
    ├── positions/             (new folder for position tracking)
    ├── performance/           (new folder for performance metrics)
    ├── alerts/                (new folder for moderator alerts)
    └── journal/               (retain existing journal structure)
```

## Implementation Phases

### Phase 1: Core Structure (1-2 hours)
1. **Rename `/prompts/system/` to `/prompts/utilities/`**
   - Move all files to new directory
   - Update references in `command-map.md` and `runtime-agent.md`

2. **Create New Folder Structure**
   - Create directories for all components
   - Set up placeholder files where needed

3. **Create Core System Components**
   - Implement `system/setup-taxonomy/setup-classification.md`
   - Implement `system/risk-management/position-sizing.md`
   - Create `system/market-context/regime-classifier.md` from `market-regimes.md`
   - Implement `system/position-tracking/moderator-positions.md`
   - Create `system/execution-analysis/performance-metrics.md`

4. **Update Schemas**
   - Create `system/schemas/unified-plan.schema.json`
   - Create `system/schemas/position-tracker.schema.json`
   - Create `system/schemas/market-context.schema.json`
   - Create `system/schemas/execution-analysis.schema.json`
   - Create `system/schemas/alert.schema.json`
   - Update `system/schemas/trade-log.schema.json`

### Phase 2: Integrated Source Tracking (2-3 hours)
1. **Create Source Analysis Prompts**
   - Create `prompts/premarket/dp-analyzer.md` from `dp-trade-analyzer.md`
   - Create `prompts/premarket/mancini-analyzer.md`
   - Create `prompts/premarket/technical-level-extractor.md`
   - Implement `prompts/premarket/unified-plan-generator.md`

2. **Create Cross-Source Integration**
   - Implement `system/trade-plans/source-integration.md`
   - Create conviction scoring algorithm
   - Implement setup matching across sources
   - Create priority ranking algorithm

3. **Implement Alert Processing**
   - Create `system/alerts/alert-processor.md`
   - Implement moderator action detection (trims, adds)
   - Create alert classification system
   - Build alert-to-position linking

### Phase 3: Enhanced Position Management (2-3 hours)
1. **Implement Position Tracking System**
   - Create `prompts/utilities/update-moderator-position.md`
   - Create `prompts/utilities/update-personal-position.md`
   - Create `prompts/utilities/show-positions.md`
   - Implement `system/position-tracking/position-dashboard.md`

2. **Create Position Management Logic**
   - Implement position status tracking
   - Create position update validation
   - Add alignment detection between moderators
   - Implement P&L tracking for positions

3. **Create Position Visualization**
   - Implement position summary formatting
   - Create position context visualization
   - Add position history tracking
   - Create P&L visualization with targets

### Phase 4: Execution Analysis & Optimization (2-3 hours)
1. **Create Performance Analysis System**
   - Implement `system/execution-analysis/theoretical-maximum.md`
   - Create `system/execution-analysis/gap-analyzer.md`
   - Implement `system/execution-analysis/optimization-engine.md`
   - Create `prompts/postmarket/execution-analysis.md`

2. **Implement Performance Metrics**
   - Define execution quality metrics
   - Create historical performance tracking
   - Implement setup-specific performance analysis
   - Build trend analysis for execution errors

3. **Create Optimization Recommendations**
   - Implement pattern recognition for execution mistakes
   - Create specific improvement recommendations
   - Build personalized execution checklists
   - Implement progress tracking system

### Phase 5: Dashboard & Integration Framework (1-2 hours)
1. **Create Comprehensive Dashboard**
   - Implement `prompts/utilities/show-dashboard.md`
   - Create position and P&L visualization
   - Build active opportunity display
   - Implement execution quality metrics display

2. **Set Up Integration Framework**
   - Create `integrations/vtf/connector-spec.md`
   - Implement `integrations/audio/transcription-spec.md`
   - Build `integrations/broker/api-spec.md`
   - Create placeholder integration points

3. **Finalize Command Routing**
   - Ensure all new commands are properly routed
   - Validate command inputs and outputs
   - Update help documentation
   - Create quick reference guide

## Key Files to Create

### System Core Files

1. **`system/trade-plans/unified-plan-structure.md`**
   ```markdown
   ---
   id: unified-plan-structure
   version: "1.0.0"
   type: blueprint
   created: 2025-05-14T12:00:00Z
   updated: 2025-05-14T12:00:00Z
   cognitiveLoad: MEDIUM
   requiresConfirmation: true
   ---

   # Unified Trade Plan Structure

   This document defines the standard structure for a unified trade plan that integrates multiple sources.

   ## Sections

   - `market_context`: Summary of market regime, levels, and events
   - `trade_ideas`: Prioritized trade opportunities with conviction scoring
   - `watchlist`: Secondary trade ideas to monitor
   - `positions`: Current active positions (moderator and personal)
   - `orders`: Pending and executed orders
   - `alerts`: Recent moderator actions and alerts
   - `performance`: Current P&L and execution metrics
   - `risk_summary`: Overall portfolio risk assessment

   Each section must conform to `unified-plan.schema.json` format.
   ```

2. **`system/setup-taxonomy/setup-classification.md`**
   - Already created in draft form
   - Defines setup types, classification tags, and scoring system

3. **`system/market-context/regime-classifier.md`**
   - Port from existing `market-regimes.md`
   - Enhance with regime detection logic

4. **`system/risk-management/position-sizing.md`**
   - Already created in draft form
   - Defines position sizing matrix and calculations

5. **`system/position-tracking/moderator-positions.md`**
   - Already created in draft form
   - Defines moderator position tracking system

6. **`system/execution-analysis/theoretical-maximum.md`**
   ```markdown
   ---
   id: theoretical-maximum
   version: "1.0.0"
   type: analysis
   created: 2025-05-14T14:00:00Z
   updated: 2025-05-14T14:00:00Z
   cognitiveLoad: HIGH
   requiresConfirmation: false
   ---

   # Theoretical Maximum Performance Calculator

   This component calculates the theoretical maximum profit potential for trade setups based on perfect execution.

   ## Calculation Methods

   ### Perfect Entry/Exit Method
   - Uses the absolute low of the entry zone
   - Uses the absolute high of the target zone
   - Assumes perfect position sizing
   - Assumes perfect timing

   ### Realistic Optimal Method
   - Uses the 10% level after the absolute low for entry
   - Uses the 90% level before the absolute high for exit
   - Accounts for slippage and realistic market mechanics
   - Uses achievable position sizing

   ### Conservative Method
   - Uses the middle of the entry zone
   - Uses the first target zone for exit
   - Uses standard position sizing
   - Assumes some time decay in execution

   ## Performance Metrics
   - Maximum percentage return
   - Maximum dollar return
   - Time to maximum return
   - Risk-adjusted maximum return
   - Opportunity cost of missed setups

   ## Integration
   This calculation is used in:
   - Post-market execution analysis
   - Gap analysis reports
   - Performance optimization recommendations
   ```

7. **`system/execution-analysis/gap-analyzer.md`**
   ```markdown
   ---
   id: gap-analyzer
   version: "1.0.0"
   type: analysis
   created: 2025-05-14T15:00:00Z
   updated: 2025-05-14T15:00:00Z
   cognitiveLoad: HIGH
   requiresConfirmation: false
   ---

   # Execution Gap Analyzer

   This component analyzes the gap between actual trading execution and theoretical optimal execution.

   ## Gap Categories

   ### Entry Timing Gaps
   - Late entry (missed optimal price)
   - Hesitation (missed trigger)
   - Premature entry (before confirmation)
   - Incorrect entry zone

   ### Exit Timing Gaps
   - Early exit (left profit on table)
   - Late exit (gave back profits)
   - Partial exit issues (improper scaling)
   - Missed target zones

   ### Position Sizing Gaps
   - Undersized relative to conviction
   - Oversized relative to risk
   - Improper scaling in/out
   - Inconsistent position sizing

   ### Behavioral Gaps
   - Emotional decision-making
   - Plan deviation
   - FOMO/revenge trading
   - Risk management failures

   ## Gap Scoring
   - Percentage of theoretical maximum achieved
   - Dollar value left on table
   - Frequency of gap type
   - Severity ranking
   - Improvement priority

   ## Integration
   This analysis is used in:
   - Daily execution debrief
   - Weekly performance reviews
   - Personalized improvement recommendations
   - Execution trend analysis
   ```

8. **`system/alerts/alert-processor.md`**
   ```markdown
   ---
   id: alert-processor
   version: "1.0.0"
   type: processor
   created: 2025-05-14T16:00:00Z
   updated: 2025-05-14T16:00:00Z
   cognitiveLoad: MEDIUM
   requiresConfirmation: true
   ---

   # Moderator Alert Processor

   This component processes alerts and updates from moderators, detecting actions and updating position context.

   ## Alert Types

   ### Position Actions
   - ENTER: New position initiated
   - ADD: Adding to existing position
   - TRIM: Reducing position size
   - EXIT: Completely exiting position
   - ROLL: Moving to different strike/expiration

   ### Context Updates
   - SENTIMENT_SHIFT: Change in market view
   - CONVICTION_CHANGE: Increased/decreased conviction
   - LEVEL_BREAK: Key level violated
   - TIMING_UPDATE: Change in trade timeframe

   ### Priority Signals
   - URGENT: Immediate action recommended
   - FOCUS: Emphasis on specific setup
   - CAUTION: Increased risk awareness
   - OPPORTUNITY: Time-sensitive entry point

   ## Processing Logic
   - Pattern matching for action detection
   - Position state linking and updates
   - Conviction level adjustment
   - Alert prioritization and routing

   ## Integration
   This processor is used with:
   - VTF text alerts
   - Moderator chat messages
   - Audio transcription (future)
   - Email/Slack notifications
   ```

### Prompt Files

1. **`prompts/premarket/dp-analyzer.md`**
   - Enhance from `dp-trade-analyzer.md`
   - Add emphasis detection and position context

2. **`prompts/premarket/mancini-analyzer.md`**
   - Create based on references and requirements
   - Implement FBD/FBO pattern recognition

3. **`prompts/premarket/technical-level-extractor.md`**
   - Combine existing level extractors
   - Add level significance scoring

4. **`prompts/premarket/unified-plan-generator.md`**
   - Already created in draft form
   - Generates comprehensive trade plan

5. **`prompts/intraday/trade-validator.md`**
   ```markdown
   ---
   id: trade-validator
   version: "1.0.0"
   type: prompt
   created: 2025-05-14T14:00:00Z
   updated: 2025-05-14T14:00:00Z
   cognitiveLoad: MEDIUM
   requiresConfirmation: true
   ---

   # Trade Validator

   This prompt validates a potential trade against the unified trade plan, applying position sizing and risk rules.

   ## Inputs
   - Ticker symbol
   - Direction (LONG/SHORT)
   - Entry price
   - Setup type
   - Current market context
   - Unified trade plan reference

   ## Processing Logic
   1. Match trade against planned setups
   2. Validate entry price against defined zones
   3. Apply position sizing rules
   4. Check risk parameters and portfolio heat
   5. Generate specific execution guidance
   
   ## Output Format
   JSON validation result with execution recommendations
   ```

6. **`prompts/postmarket/execution-analysis.md`**
   ```markdown
   ---
   id: execution-analysis
   version: "1.0.0"
   type: prompt
   created: 2025-05-14T18:00:00Z
   updated: 2025-05-14T18:00:00Z
   cognitiveLoad: HIGH
   requiresConfirmation: false
   ---

   # Execution Analysis

   This prompt analyzes the day's trading performance against theoretical maximum potential, identifying execution gaps and generating improvement recommendations.

   ## Inputs
   - Trade log for the day
   - Original trade plan
   - Price data for trades
   - Historical performance metrics

   ## Processing Logic
   1. Calculate theoretical maximum for each setup (perfect execution)
   2. Compare actual execution to theoretical maximum
   3. Identify execution gaps by category
   4. Generate specific improvement recommendations
   5. Track recurring patterns in execution errors
   6. Calculate execution efficiency score

   ## Output Format
   ```json
   {
     "performance_summary": {
       "actual_profit": "$1,245",
       "theoretical_maximum": "$3,200",
       "execution_efficiency": "38.9%",
       "missed_opportunity": "$1,955",
       "execution_score": 6.2
     },
     "gap_analysis": {
       "primary_gaps": [
         {
           "type": "LATE_ENTRY",
           "frequency": "High",
           "impact": "$850",
           "examples": ["AAPL trade at 10:15am", "MSFT trade at 2:30pm"],
           "pattern": "Waiting for additional confirmation"
         },
         {
           "type": "EARLY_EXIT",
           "frequency": "Medium",
           "impact": "$650",
           "examples": ["QQQ trade at 11:45am"],
           "pattern": "Taking profits at first target"
         }
       ],
       "secondary_gaps": []
     },
     "improvement_recommendations": [
       {
         "focus_area": "Entry Timing",
         "recommendation": "Use limit orders at planned entry points",
         "expected_impact": "High",
         "implementation_steps": ["Step 1", "Step 2"]
       },
       {
         "focus_area": "Exit Strategy",
         "recommendation": "Implement tiered exit with trailing stop",
         "expected_impact": "Medium",
         "implementation_steps": ["Step 1", "Step 2"]
       }
     ],
     "progress_tracking": {
       "trend_direction": "Improving",
       "most_improved_area": "Position Sizing",
       "focus_for_tomorrow": "Entry Timing"
     }
   }
   ```
   ```

7. **`prompts/utilities/show-dashboard.md`**
   ```markdown
   ---
   id: show-dashboard
   version: "1.0.0"
   type: prompt
   created: 2025-05-14T19:00:00Z
   updated: 2025-05-14T19:00:00Z
   cognitiveLoad: MEDIUM
   requiresConfirmation: false
   ---

   # Dashboard Display

   This prompt generates a comprehensive dashboard view of the current trading session.

   ## Inputs
   - Current unified trade plan
   - Active positions
   - Recent alerts
   - Performance metrics
   - Market context

   ## Processing Logic
   1. Integrate all data sources into cohesive view
   2. Prioritize information based on relevance and urgency
   3. Format data for easy consumption
   4. Highlight key metrics and status changes

   ## Output Format

   ```
   # TRADING DASHBOARD — [DATE] [TIME]

   ## MARKET STATUS
   - SPX: 4585.75 +0.5% | QQQ: 434.25 +0.8% | VIX: 18.25 -3.2%
   - REGIME: TRENDING_UP | SENTIMENT: BULLISH | VOLATILITY: MODERATE

   ## ACTIVE POSITIONS
   🟢 AAPL LONG: +2.4% ($790) | Entry: 185.75 | Current: 190.25 | Target: 195.00
   🟡 MSFT LONG: +0.3% ($110) | Entry: 420.50 | Current: 421.75 | Target: 435.00
   
   ## OPEN ORDERS
   🟡 QQQ LONG: Limit 430.50 (Filled: 0/100)
   🟡 NVDA LONG: Stop-Limit 950 → 952 (Filled: 0/20)

   ## HIGHEST CONVICTION SETUPS
   🔥 FB-L-CF-HC META: Enter 485-490, Target 515
   ⭐ TC-L-SW-HC AMZN: Enter 180-182, Target 195

   ## RECENT ALERTS
   - 10:45am: DP Trimming MSFT at 422 ⚠️
   - 10:30am: Mancini "Watch 4585 resistance on SPX" 📊
   - 10:15am: Kira adding to AAPL position 📈

   ## EXECUTION QUALITY
   - Today's Efficiency: 68% (↑12% from yesterday)
   - Primary Gap: Entry Timing (-$280)
   - Focus Area: Partial Exit Strategy

   ## P&L SUMMARY
   - Today: +$900 (0.9%) | Week: +$3,200 (3.2%)
   - vs. Maximum Potential: $900/$1,450 (62%)
   - Open P&L: +$900
   ```
   ```

### Schema Files

1. **`system/schemas/unified-plan.schema.json`**
   ```json
   {
     "$schema": "http://json-schema.org/draft-07/schema#",
     "$id": "https://intenttrader.ai/schema/unified-plan.schema.json",
     "title": "Unified Trade Plan",
     "type": "object",
     "properties": {
       "market_context": {
         "type": "object",
         "properties": {
           "date": { "type": "string", "format": "date" },
           "regime": { "type": "string", "enum": ["TRENDING_UP", "TRENDING_DOWN", "CHOPPY", "EVENT_DRIVEN", "SQUEEZE"] },
           "key_levels": { "type": "object" },
           "sentiment": { "type": "string" },
           "volatility": { "type": "string" },
           "events": { "type": "array", "items": { "type": "string" } }
         },
         "required": ["date", "regime", "key_levels"]
       },
       "trade_ideas": {
         "type": "array",
         "items": {
           "type": "object",
           "properties": {
             "ticker": { "type": "string" },
             "direction": { "type": "string", "enum": ["LONG", "SHORT"] },
             "setup_type": { "type": "string" },
             "conviction": { "type": "object" },
             "levels": { "type": "object" },
             "position_sizing": { "type": "object" },
             "execution_strategy": { "type": "object" },
             "risk_management": { "type": "object" },
             "moderator_alignment": { "type": "object" }
           },
           "required": ["ticker", "direction", "setup_type", "conviction", "levels"]
         }
       },
       "watchlist": {
         "type": "array",
         "items": { "type": "object" }
       },
       "risk_summary": {
         "type": "object"
       },
       "metadata": {
         "type": "object"
       }
     },
     "required": ["market_context", "trade_ideas", "metadata"]
   }
   ```

2. **`system/schemas/position-tracker.schema.json`**
   ```json
   {
     "$schema": "http://json-schema.org/draft-07/schema#",
     "$id": "https://intenttrader.ai/schema/position-tracker.schema.json",
     "title": "Position Tracker",
     "type": "object",
     "properties": {
       "moderator_positions": {
         "type": "object",
         "additionalProperties": {
           "type": "array",
           "items": {
             "type": "object",
             "properties": {
               "ticker": { "type": "string" },
               "direction": { "type": "string", "enum": ["LONG", "SHORT"] },
               "conviction": { "type": "string" },
               "entry_price": { "type": "number" },
               "entry_date": { "type": "string", "format": "date" },
               "initial_size": { "type": "string" },
               "current_size": { "type": "string" },
               "last_action": { "type": "object" },
               "status": { "type": "string" }
             },
             "required": ["ticker", "direction", "status"]
           }
         }
       },
       "personal_positions": {
         "type": "object",
         "properties": {
           "active_swing": { "type": "array", "items": { "type": "object" } },
           "active_day": { "type": "array", "items": { "type": "object" } }
         }
       }
     },
     "required": ["moderator_positions", "personal_positions"]
   }
   ```

## Command Updates

Update `system/systemops/command-map.md` to include:

| Command | Description | Phase | Input Required |
|---------|-------------|-------|---------------|
| `/analyze-dp` | Process DP Morning Call transcript | premarket | Transcript text |
| `/analyze-mancini` | Process Mancini Blueprint | premarket | Mancini content |
| `/extract-levels` | Get technical levels and SMAs | premarket | Tickers list |
| `/generate-trade-plan` | Create unified plan | premarket | Source references |
| `/validate-trade` | Validate potential trade | intraday | Trade details |
| `/update-position` | Update position status | intraday | Position details |
| `/show-positions` | Display current positions | any | None |
| `/log-alert` | Log moderator alert | intraday | Alert details |
| `/show-dashboard` | Display trading dashboard | any | None |
| `/analyze-execution` | Analyze execution vs potential | postmarket | Trade log |
| `/show-gap-analysis` | Display execution gap analysis | postmarket | None |
| `/generate-recommendations` | Generate improvement recommendations | postmarket | None |

## Integration Framework

The system should be designed with integration points for future enhancements:

### VTF Application Integration
```
integrations/vtf/connector-spec.md:
- Real-time alert parsing
- Chat message extraction
- Position updates
- Price data integration
```

### Audio Transcription
```
integrations/audio/transcription-spec.md:
- Moderator voice recognition
- Real-time transcription
- Alert extraction from audio
- Sentiment analysis from tone
```

### Broker API Integration
```
integrations/broker/api-spec.md:
- Order execution integration
- Position status tracking
- P&L reconciliation
- Real-time price updates
```

## Migration Strategy

1. Start with folder structure changes
2. Port existing content with minimal modifications
3. Create new components in logical order:
   - Setup classification system
   - Position tracking components
   - Trade plan integration
   - Execution analysis tools
4. Test components as they're completed
5. Update command routing as components are added

## Execution Analysis Framework

The execution analysis framework will provide:

1. **Theoretical Maximum Calculation**
   - Perfect entry/exit prices based on day's price action
   - Optimal position sizing based on conviction
   - Realistic market mechanics (slippage, etc.)

2. **Gap Analysis Categories**
   - Entry timing gaps (late, premature, hesitation)
   - Exit timing gaps (early, late, improper scaling)
   - Position sizing gaps (undersized, oversized)
   - Behavioral gaps (emotional decisions, FOMO)

3. **Improvement Recommendations**
   - Specific actionable suggestions
   - Implementation steps
   - Expected impact
   - Progress tracking

4. **Visualization**
   - Performance metrics dashboard
   - Execution efficiency trends
   - Gap analysis charts
   - Progress tracking visualization

## Testing Strategy

For each component:
1. Validate schema compliance
2. Test with sample inputs
3. Verify integration with other components
4. Test command routing
5. Validate performance analysis accuracy

## Total Estimated Implementation Time: 8-12 hours
