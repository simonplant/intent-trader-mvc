# Intent Trader v0.5.1 Refactoring Plan

This document outlines the plan to refactor Intent Trader v0.5.0 to v0.5.1, incorporating trading functionality from the trading-system-prompts repository while maintaining the improved technical foundation.

## Primary Goals

1. **Integrated Source Tracking**
   - Integrate and track high-confidence trade plans from DP and Mancini
   - Identify and prioritize highest conviction trade ideas across sources
   - Create unified view of trade plans and positions

2. **Dual Trading Style Support**
   - Support both DP's institutional/swing approach and Mancini's technical level-to-level trading
   - Implement simplified Mancini's Mode1/Mode2 market classification
   - Create core position management for DP-style trades

3. **Position Management**
   - Implement "trading around a core" position management for DP-style trades
   - Create tiered position sizing system
   - Track profit buffer and effective cost basis for ongoing positions

4. **Performance Analysis**
   - Track actual trade performance against theoretical optimal execution
   - Calculate theoretical maximum profit potential for each setup
   - Perform gap analysis between actual and optimal execution
   - Generate specific recommendations to close execution gaps

5. **Practical Implementation**
   - Focus on simplicity and maintainability
   - Prioritize DP's approach as primary style
   - Emphasize post-market analysis for learning and improvement

## Streamlined Directory Structure

```
intent-trader/
├── system/
│   ├── trade-plans/         (formerly blueprints/)
│   ├── market-context/      (includes Mode1/Mode2 classification)
│   ├── position-tracking/   (consolidated position management)
│   ├── trade-analysis/      (simplified performance analysis)
│   ├── schemas/             (core data structures)
│   └── systemops/           (system operations)
├── prompts/
│   ├── premarket/           (plan generation)
│   ├── intraday/            (trade validation and updates)
│   ├── postmarket/          (performance analysis)
│   └── utilities/           (renamed from system/ for clarity)
└── logs/
    ├── trades/              (trade records)
    ├── positions/           (position tracking)
    └── performance/         (performance metrics)
```

## Implementation Phases

### Phase 1: Core Framework (2-3 hours)
1. **Rename `/prompts/system/` to `/prompts/utilities/`**
   - Move all files to new directory
   - Update references in `command-map.md` and `runtime-agent.md`

2. **Create simplified directory structure**
   - Set up core folders as outlined
   - Implement basic placeholder files

3. **Implement market mode classification**
   - Create `system/market-context/market-mode.md` (simplified Mode1/Mode2 framework)
   - Implement basic detection for trending vs. choppy days
   - Create mode-based setup compatibility matrix

### Phase 2: Trade Planning & Tracking (3-4 hours)
1. **Implement source analysis**
   - Create `prompts/premarket/dp-analyzer.md` based on existing file
   - Create `prompts/premarket/mancini-analyzer.md` for level-based analysis
   - Create `prompts/premarket/unified-plan-generator.md` to combine sources

2. **Build position tracking system**
   - Create `system/position-tracking/position-manager.md` (consolidated tracking)
   - Implement core position management for DP-style trades
   - Create `prompts/utilities/show-positions.md` for position visualization

3. **Implement trade validation**
   - Create `prompts/intraday/trade-validator.md` for plan alignment check
   - Implement simple position sizing recommendations
   - Create basic risk management checks

### Phase 3: Performance Analysis (3-4 hours)
1. **Build trade analysis system**
   - Create `system/trade-analysis/performance-analyzer.md`
   - Implement theoretical vs. actual performance comparison
   - Create gap analysis for execution quality

2. **Create coaching framework**
   - Create `prompts/postmarket/trade-review.md` for daily analysis
   - Implement specific improvement recommendations
   - Create visualization for performance metrics

3. **Implement dashboard**
   - Create `prompts/utilities/show-dashboard.md` for current trading status
   - Implement active position tracking
   - Create high-conviction setup display

## Key Consolidated Components

### 1. `system/market-context/market-mode.md`
```markdown
---
id: market-mode
version: "1.0.0"
type: market-context
created: 2025-05-15T12:00:00Z
updated: 2025-05-15T12:00:00Z
cognitiveLoad: MEDIUM
requiresConfirmation: false
---

# Market Mode Classification

This document defines a simplified framework for detecting and classifying market modes, with focus on Mancini's Mode1/Mode2 distinction.

## Mode Types

### Mode1: Strong Trend Days
- **Characteristics**: 
  - Large opening gaps (>0.5%)
  - Strong directional volume
  - Clear trending price action
  - Follow-through on breakouts
  - Wide intraday ranges

- **Trading Approach**: 
  - Major level to level moves
  - Holding through noise
  - Following momentum
  - Swing-oriented setups

- **Size & Risk Management**: 
  - Full position sizing
  - Wider stops
  - Larger targets
  - Tiered exits at key levels

### Mode2: Choppy Range Days
- **Characteristics**:
  - Small gaps or inside days
  - Narrow ranges
  - Back-and-forth price action
  - Failed breakouts
  - Low directional conviction

- **Trading Approach**:
  - Range trading
  - Quick scalps
  - Fade extremes
  - Avoid breakout attempts

- **Size & Risk Management**:
  - Reduced position sizing (50-75%)
  - Tighter stops
  - Smaller targets
  - Faster exits

## Classification Process
1. Evaluate overnight action and gap
2. Consider previous day's behavior
3. Assess key technical indicators
4. Make initial classification
5. Re-evaluate if conditions change significantly

## Setup Compatibility

| Setup Type | Mode1 (Trending) | Mode2 (Choppy) |
|------------|------------------|----------------|
| Failed Breakdown | Strong | Moderate |
| Range Reclaim | Moderate | Strong |
| Trend Continuation | Strong | Weak |
| Opening Range B/O | Strong | Weak |
```

### 2. `system/position-tracking/position-manager.md`
```markdown
---
id: position-manager
version: "1.0.0"
type: position-tracking
created: 2025-05-15T12:00:00Z
updated: 2025-05-15T12:00:00Z
cognitiveLoad: MEDIUM
requiresConfirmation: true
---

# Position Management System

This document defines a consolidated system for tracking positions and implementing DP's "trading around a core" approach.

## Position Tracking

### Moderator Positions
- Track positions from DP, Mancini, and other moderators
- Record entry price, size, and conviction level
- Track position updates (adds, trims, exits)
- Note supporting commentary and context

### Personal Positions
- Track active day and swing positions
- Record entry price, size, and setup type
- Link to original trade plan or setup
- Calculate current P&L and status

## Trading Around Core

### Core Position Principles
- Establish properly sized initial core position
- Build profit buffer through partial exits
- Lower effective cost basis through buffer
- Add back on weakness when thesis remains intact
- Hold core position for extended targets

### Position States
1. **Building Core**: Establishing tiered position
2. **Profit Buffer**: Creating cushion through partial exits
3. **Adjusted Basis**: Trading with "house money" effect
4. **Core Extension**: Adding opportunistically on weakness
5. **Target Achieving**: Scaling final exits

### Buffer Calculation
```
Buffer = Sum of (Exit Price - Entry Price) * Units for all partial exits
Effective Basis = (Original Basis - Buffer) / Remaining Units
```

## Position Sizing

### Standard Sizing
- **Full**: 100% of standard position allocation
- **Half**: 50% of standard position
- **Quarter**: 25% of standard position
- **Tracer**: 5-10% for exploration

### Tiered Entry
- Use limit orders at predetermined levels
- Standard 3-tier: 33/33/34% distribution
- Front-loaded: More at higher levels
- Back-loaded: More at lower levels

### Size Adjustments
- Increase for higher conviction setups
- Reduce for Mode2 market conditions
- Scale based on current performance
- Adjust for setup compatibility with market mode
```

### 3. `system/trade-analysis/performance-analyzer.md`
```markdown
---
id: performance-analyzer
version: "1.0.0"
type: trade-analysis
created: 2025-05-15T12:00:00Z
updated: 2025-05-15T12:00:00Z
cognitiveLoad: HIGH
requiresConfirmation: false
---

# Trade Performance Analysis

This component analyzes trade performance against theoretical optimal execution to identify improvement opportunities.

## Theoretical Performance Calculation

### Perfect Execution Model
- Best possible entry in the defined zone
- Optimal position building sequence
- Ideal exit at maximum profit point
- Perfect position sizing for the setup

### Realistic Benchmark
- 90th percentile execution quality
- Accounts for market mechanics
- Assumes reasonable reaction time
- Incorporates normal decision-making friction

## Gap Analysis

### Entry Timing Gaps
- Late entry (missed optimal price)
- Hesitation (missed trigger)
- Premature entry (insufficient confirmation)
- Wrong entry price level

### Exit Timing Gaps
- Early exit (left profit on table)
- Late exit (gave back profits)
- Poor scaling (improper partial exits)
- Missed target opportunities

### Position Sizing Gaps
- Undersized relative to conviction
- Oversized relative to risk
- Improper scaling or tiering
- Inconsistent sizing across similar setups

## Improvement Framework

### Pattern Recognition
- Identify recurring execution issues
- Track frequency and impact of gaps
- Correlate with market conditions
- Measure improvement over time

### Recommendation Engine
- Generate specific improvement actions
- Create focused practice exercises
- Suggest process adjustments
- Provide execution checklists
```

### 4. `prompts/premarket/unified-plan-generator.md`
```markdown
---
id: unified-plan-generator
version: "1.0.0"
type: prompt
created: 2025-05-15T12:00:00Z
updated: 2025-05-15T12:00:00Z
cognitiveLoad: HIGH
requiresConfirmation: true
---

# Unified Trade Plan Generator

This prompt generates a comprehensive trade plan by synthesizing data from multiple sources including DP analysis, Mancini blueprint, and technical levels.

## Inputs
- DP Analysis JSON
- Mancini Analysis JSON
- Technical Levels
- Market Mode Classification

## Processing Logic
1. Integrate trade ideas from all sources
2. Prioritize based on conviction across sources
3. Apply market mode compatibility filtering
4. Generate unified watchlist with execution details
5. Create summary of market context and key levels

## Output Format

```json
{
  "market_context": {
    "date": "2025-05-15",
    "mode": "MODE1",
    "key_levels": {
      "SPX": [4500, 4525, 4550],
      "QQQ": [430, 435, 440]
    },
    "sentiment": "BULLISH",
    "events": ["CPI Data 8:30am ET"]
  },
  "trade_ideas": [
    {
      "ticker": "AAPL",
      "direction": "LONG",
      "setup_type": "FB-L-CF-HC",
      "conviction": 8,
      "source": ["DP:HIGH", "MANCINI:SUPPORT"],
      "levels": {
        "entry": "185-190",
        "stop": 183,
        "targets": [195, 205]
      },
      "position_sizing": "FULL",
      "execution_strategy": "Tiered entry with 3 levels"
    }
  ],
  "watchlist": [],
  "positions": {
    "moderators": {},
    "personal": {}
  }
}
```

## Example Command

```
/generate-plan
DP: {DP analysis JSON}
Mancini: {Mancini analysis JSON}
Mode: "MODE1"
```
```

### 5. `prompts/postmarket/trade-review.md`
```markdown
---
id: trade-review
version: "1.0.0"
type: prompt
created: 2025-05-15T12:00:00Z
updated: 2025-05-15T12:00:00Z
cognitiveLoad: MEDIUM
requiresConfirmation: false
---

# Daily Trade Review

This prompt analyzes the day's trading performance, compares actual execution to theoretical optimal execution, and provides specific improvement recommendations.

## Inputs
- Trade log for the day
- Original trade plan
- Price data for executed trades
- Historical performance patterns

## Processing Logic
1. Calculate theoretical optimal performance for each trade
2. Compare actual execution to optimal benchmark
3. Identify execution gaps by category
4. Detect recurring patterns in execution
5. Generate specific improvement recommendations
6. Track progress against previous days

## Output Format

```
# DAILY TRADE REVIEW - [DATE]

## MARKET SUMMARY
- Mode: [MODE1/MODE2]
- Overall Market Behavior: [DESCRIPTION]
- Key Price Action: [SUMMARY]

## PERFORMANCE METRICS
- P&L: +$1,245 (+1.25%)
- vs. Theoretical Max: $1,245/$3,200 (38.9%)
- Execution Score: 6.2/10
- Improvement: +0.4 from yesterday

## TRADE ANALYSIS

### AAPL LONG (FB-L-CF-HC)
- Entry: $186.50 vs. Optimal $184.75 (-0.9%)
- Exit: $192.25 vs. Optimal $195.50 (-1.7%)
- Sizing: 75% of Plan
- Execution Quality: 7.5/10
- Key Gap: Early exit left $650 on table
- Chart: [Trade visualization with entry/exit markers]

### QQQ SHORT (RR-S-CF-MC)
- Entry: $432.75 vs. Optimal $434.25 (-0.3%)
- Exit: $430.50 vs. Optimal $428.75 (-0.4%)
- Sizing: According to plan
- Execution Quality: 8.2/10
- Key Gap: Minor timing issues
- Chart: [Trade visualization with entry/exit markers]

## IMPROVEMENT AREAS
1. **Early Exits** (-$700 impact)
   - Pattern: Exiting at first target despite trend strength
   - Fix: Use partial exits and trailing stops for remainder
   - Exercise: Practice identifying trend continuation signals

2. **Position Sizing** (-$350 impact)
   - Pattern: Undersized on highest conviction trades
   - Fix: Commit to full size on plan-aligned setups
   - Exercise: Pre-determine size before setup triggers

## FOCUS FOR TOMORROW
1. Use tiered exits (33% at T1, 33% at T2, trail remainder)
2. Commit to full planned size on DP focus ideas
3. Pre-set all orders according to plan before entries trigger
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

## Command Map Updates

Update `system/systemops/command-map.md` to include:

| Command | Description | Phase | Input Required |
|---------|-------------|-------|---------------|
| `/analyze-dp` | Process DP Morning Call transcript | premarket | Transcript text |
| `/analyze-mancini` | Process Mancini Blueprint | premarket | Mancini content |
| `/extract-levels` | Get technical levels and SMAs | premarket | Tickers list |
| `/classify-mode` | Determine market mode | premarket | Market data |
| `/generate-plan` | Create unified trade plan | premarket | Source references |
| `/validate-trade` | Validate potential trade | intraday | Trade details |
| `/update-position` | Update position status | intraday | Position details |
| `/show-positions` | Display current positions | any | None |
| `/show-dashboard` | Display trading dashboard | any | None |
| `/analyze-trades` | Review day's performance | postmarket | Trade log |
| `/trade-review` | Get improvement suggestions | postmarket | None |

## Core Schema Updates

Create or update these schemas:

1. **`system/schemas/unified-plan.schema.json`**
   - Define structure for trade plans with sources, conviction, and levels
   - Include position sizing recommendations
   - Add execution strategy templates

2. **`system/schemas/position-tracker.schema.json`**
   - Track moderator and personal positions
   - Record position state and history
   - Calculate profit buffer and effective cost basis

3. **`system/schemas/trade-analysis.schema.json`**
   - Define structure for performance analysis
   - Track execution gaps and recommendations
   - Store historical performance data

## Implementation Timeline

This implementation plan can be completed in approximately 8-10 hours:

1. **Day 1 (4-5 hours)**
   - Core components and folder structure
   - DP analysis and position tracking

2. **Day 2 (4-5 hours)**
   - Mancini analysis and plan generation
   - Performance analysis and review system

The simplified approach focuses on practical implementation with reduced complexity while maintaining the core functionality needed to support both trading styles and provide valuable performance analysis.
