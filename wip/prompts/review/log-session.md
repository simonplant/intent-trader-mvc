---
title: "Session Logger Implementation"
component: "Session Logger"
domain: "REVIEW"
function: "/log-session"
status: "DRAFT"
priority: "MVP STRETCH"
author: "Intent Trader"
date: "2025-05-15"
version: "1.0.0"
---

# Session Logger

## Purpose
The Session Logger creates comprehensive records of trading sessions, including all executed and missed trades, market conditions, moderator trade activity, personal performance, and session learnings. It serves as the foundation for trader improvement by maintaining detailed records for pattern recognition and skill development. The component supports the REVIEW domain within the cognitive workflow (Plan → Focus → Execute → Manage → Review).

## Command
```
/log-session [date] [parameters]
```

## Input Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `date` | string | No | Today | Trading session date (YYYY-MM-DD) |
| `market_regime` | string | No | - | Market regime classification |
| `market_mode` | string | No | - | Mode 1 (trend) or Mode 2 (range/trap) |
| `market_conditions` | string | No | - | Overall market conditions description |
| `cognitive_load` | number | No | - | Average cognitive load during session (1-10) |
| `decision_quality` | string | No | - | Overall decision quality (OPTIMAL/NORMAL/DEGRADED/COMPROMISED) |
| `distractions` | array | No | [] | List of distractions during session |
| `notable_events` | array | No | [] | Notable market or personal events |
| `key_learnings` | array | No | [] | Key session learnings |
| `improvement_actions` | array | No | [] | Specific improvement actions |
| `personal_notes` | string | No | - | Additional personal observations |
| `include_moderator_trades` | boolean | No | true | Include moderator trades in report |
| `include_missed_setups` | boolean | No | true | Include missed setup opportunities |
| `format` | string | No | "detailed" | Output format (detailed/summary/json) |

## Processing Logic

The Session Logger performs the following operations:

1. **Data Collection**
   - Retrieve trade plan state from `trade-plan-state.json`
   - Collect personal positions from `my-positions.json`
   - Gather moderator positions from `moderator-positions.json`
   - Load session context from `session-manifest.json`
   - Retrieve any previously logged individual trades

2. **Market Analysis**
   - Process market regime and mode information
   - Analyze index performance and sector rotation
   - Identify key market events and catalysts
   - Calculate market statistics (volatility, volume, breadth)

3. **Trade Performance Analysis**
   - Calculate personal P&L metrics (daily, per trade)
   - Compare personal trades vs. moderator trades
   - Analyze trade timing relative to market moves
   - Calculate trade timing effectiveness metrics

4. **Plan Adherence Assessment**
   - Compare actual trading activity against morning plan
   - Assess setup selection vs. prioritized opportunities
   - Evaluate risk allocation adherence
   - Determine overall plan execution quality

5. **Missed Opportunity Analysis**
   - Identify setups from plan that weren't traded
   - Calculate opportunity cost of missed trades
   - Determine reasons for missed opportunities
   - Suggest process improvements for setup capture

6. **Moderator Trade Analysis**
   - Extract moderator trade entries, exits, and results
   - Calculate estimated returns from moderator trades
   - Compare personal execution vs. moderator execution
   - Identify patterns in moderator trade selection

7. **Pattern Recognition**
   - Identify time-of-day performance patterns
   - Calculate setup type effectiveness
   - Analyze psychological impact on decision quality
   - Determine market condition correlation with performance

8. **Learning Synthesis**
   - Generate actionable learning points
   - Prioritize improvement actions
   - Create concrete practice exercises
   - Develop targeted skill development recommendations

9. **Output Generation**
   - Create comprehensive session report
   - Generate trade performance visualizations
   - Produce plan vs. execution comparison
   - Format according to requested output type

10. **State Management**
    - Update session-manifest.json with completed status
    - Store comprehensive log to session-logs directory
    - Update pattern recognition database
    - Generate session performance metrics for tracking

## Output Format

The command produces a comprehensive trading session log with the following structure:

```markdown
# Trading Session Log: [DATE]

## Market Framework
- **Market Regime**: [REGIME]
- **Mode Classification**: [MODE] ([CONFIDENCE]% confidence)
- **Character Status**: [CHARACTER_DESCRIPTION]
- **Key Catalysts**: [CATALYST_LIST]
- **Index Performance**: [INDEX_PERFORMANCE]
- **Sector Rotation**: [SECTOR_ROTATION]
- **Volume Profile**: [VOLUME_DESCRIPTION]

## Plan vs. Execution
- **Plan Adherence**: [ADHERENCE_SCORE]/10
- **Risk Allocation**: [RISK_UTILIZATION]% of budget used
- **Setup Selection**: [SETUP_SELECTION_ASSESSMENT]
- **Missed Opportunities**: [MISSED_OPPORTUNITIES_COUNT]
- **Mode Alignment**: [MODE_ALIGNMENT_ASSESSMENT]

## Personal Trade Performance
[DETAILED_TRADE_LIST]

### Session P&L Summary
- **Total P&L**: [TOTAL_PNL] ([PERCENT]%)
- **Win Rate**: [WIN_RATE]% ([WINS]/[TOTAL] trades)
- **Average R**: [AVERAGE_R]
- **Largest Win**: [LARGEST_WIN]
- **Largest Loss**: [LARGEST_LOSS]
- **Profit Factor**: [PROFIT_FACTOR]

## Moderator Trade Activity
[MODERATOR_TRADE_SUMMARY]

### Execution Comparison
- **Entry Timing Delta**: [ENTRY_TIMING_DELTA]
- **Exit Timing Delta**: [EXIT_TIMING_DELTA]
- **Size Alignment**: [SIZE_ALIGNMENT_ASSESSMENT]
- **Overall Execution**: [EXECUTION_COMPARISON]

## Psychological Framework
- **Average Cognitive Load**: [COGNITIVE_LOAD]/10
- **Decision Quality**: [DECISION_QUALITY]
- **Primary Distractions**: [DISTRACTION_LIST]
- **Emotional Management**: [EMOTIONAL_MANAGEMENT_ASSESSMENT]

## Key Learnings
[DETAILED_LEARNING_POINTS]

## Improvement Plan
1. [PRIMARY_IMPROVEMENT_ACTION]
2. [SECONDARY_IMPROVEMENT_ACTION]
3. [TERTIARY_IMPROVEMENT_ACTION]

## Session Notes
[PERSONAL_NOTES]

Session log created and saved to session-logs/[DATE].md
```

## Detailed Trade Log Format

Each individual trade is logged in the following format:

```markdown
### Trade: [SYMBOL] [DIRECTION] ([SETUP_TYPE])

**Entry**: [ENTRY_PRICE] at [ENTRY_TIME] - [ENTRY_CONDITION]
**Exit**: [EXIT_PRICE] at [EXIT_TIME] - [EXIT_REASON]
**Performance**: [PNL] ([PNL_PERCENT]%), [R_MULTIPLE]R, Grade: [GRADE]
**Plan Adherence**: Entry ([ENTRY_ADHERENCE]), Exit ([EXIT_ADHERENCE]), Size ([SIZE_ADHERENCE])
**Execution Quality**: [OVERALL_EXECUTION]/10
**Cognitive State**: Load [COGNITIVE_LOAD]/10, [DECISION_QUALITY]

**Key Learning**: [PRIMARY_LEARNING]
```

## Missed Opportunity Format

```markdown
### Missed: [SYMBOL] [DIRECTION] ([SETUP_TYPE])

**Potential Entry**: [PLAN_ENTRY] at around [APPROXIMATE_TIME]
**Estimated Outcome**: [ESTIMATED_PNL] ([ESTIMATED_PNL_PERCENT]%)
**Reason Missed**: [REASON_MISSED]
**Improvement Action**: [IMPROVEMENT_ACTION]
```

## Moderator Trade Format

```markdown
### Moderator Trade: [SYMBOL] [DIRECTION] ([MODERATOR])

**Entry**: [ENTRY_PRICE] at [ENTRY_TIME]
**Current/Exit**: [CURRENT_OR_EXIT_PRICE]
**P&L**: [PNL]
**Size**: [SIZE] [UNITS]
**Status**: [STATUS]
**Management**: [MANAGEMENT_ACTIONS]
```

## Time-of-Day Performance Analysis

```markdown
## Time-of-Day Analysis

### Morning Session (9:30 - 11:00)
- **Trades Taken**: [TRADE_COUNT]
- **P&L**: [SESSION_PNL]
- **Decision Quality**: [DECISION_QUALITY]

### Midday Session (11:00 - 14:00)
- **Trades Taken**: [TRADE_COUNT]
- **P&L**: [SESSION_PNL]
- **Decision Quality**: [DECISION_QUALITY]

### Afternoon Session (14:00 - 16:00)
- **Trades Taken**: [TRADE_COUNT]
- **P&L**: [SESSION_PNL]
- **Decision Quality**: [DECISION_QUALITY]
```

## Market Regime Classification

| Regime | Description |
|--------|-------------|
| **Bull - Buy Dips** | Strong uptrend with shallow pullbacks; focus on long entries at support |
| **Bull - Momentum** | Accelerating uptrend; focus on breakout and trend continuation |
| **Bull - Distribution** | Late-stage uptrend with signs of selling; caution on longs |
| **Bear - Sell Rallies** | Established downtrend; focus on short entries at resistance |
| **Bear - Momentum** | Accelerating downtrend; focus on breakdown entries |
| **Bear - Accumulation** | Late-stage downtrend with signs of buying; caution on shorts |
| **Range - Bracketed** | Horizontal trading range; focus on range extremes |
| **Range - Rotational** | Sector rotation with index range; focus on relative strength |
| **Transitional** | Regime shift in progress; reduced size and increased caution |

## Mode Classification

| Mode | Characteristics | Trading Approach |
|------|-----------------|------------------|
| **Mode 1** | Trending price action, directional movement, follow-through on breakouts | Trend following, breakout trading, larger size |
| **Mode 2** | Range-bound, trappy price action, failed breakouts, mean reversion | Fade extremes, smaller size, faster profit taking |

## Session Grade Calculation Logic

Session grades are calculated based on a combination of plan adherence, P&L performance, and psychological management:

| Grade | Criteria |
|-------|----------|
| A+ | Plan adherence ≥ 9 AND positive P&L AND psychological management ≥ 9 |
| A | Plan adherence ≥ 8 AND positive P&L AND psychological management ≥ 8 |
| B+ | Plan adherence ≥ 7 AND positive P&L AND psychological management ≥ 7 |
| B | Plan adherence ≥ 6 AND (positive P&L OR psychological management ≥ 8) |
| C+ | Plan adherence ≥ 5 AND (positive P&L OR psychological management ≥ 7) |
| C | Plan adherence ≥ 4 AND psychological management ≥ 6 |
| D | Plan adherence < 4 OR psychological management < 6 |
| F | Plan adherence < 3 AND negative P&L AND psychological management < 5 |

## Decision Quality Classification

| Classification | Description |
|----------------|-------------|
| **OPTIMAL** | Clear thinking, no distractions, high focus, excellent emotional management |
| **NORMAL** | Standard decision-making capacity, minor distractions handled well |
| **DEGRADED** | Diminished capacity from fatigue, stress, or distractions |
| **COMPROMISED** | Significant impairment from multiple factors, emotional interference |

## Example Usage

### Complete Session Log

```
/log-session date="2025-05-15" market_regime="Bull - Buy Dips" market_mode="Mode 2" market_conditions="Sideways day with sector rotation, indices flat" cognitive_load=6.4 decision_quality=DEGRADED distractions=["Discord notifications", "News alerts"] notable_events=["CPI data came in below expectations", "UNH guidance suspension affected Dow"] key_learnings=["Mode 2 requires faster profit taking", "Missed several good moderator calls", "Over-traded midday chop"] improvement_actions=["Set concrete rules for Mode 2 profit taking", "Create pre-session focus ritual", "Reduce position size when cognitive load exceeds 5"] personal_notes="Felt distracted today, need to improve focus techniques"
```

### Quick Session Log

```
/log-session date="2025-05-15" market_mode="Mode 2" cognitive_load=6.4 decision_quality=DEGRADED improvement_actions=["Improve focus", "Take fewer trades"] format=summary
```

## Integration with System Components

The Session Logger integrates with:

1. **Trade Plan Generator**: Accesses morning plan for adherence assessment
2. **Position Manager**: Retrieves personal trade data
3. **DP Morning Call Processor**: Utilizes market context information
4. **Session Manifest**: Updates session status and metrics

## Data Model

The command outputs and stores session logs in a structured JSON format:

```json
{
  "sessionId": "session-2025-05-15",
  "date": "2025-05-15",
  "market": {
    "regime": "Bull - Buy Dips",
    "mode": "Mode 2",
    "modeConfidence": 80,
    "conditions": "Sideways day with sector rotation",
    "indices": {
      "SPX": {
        "open": 5930,
        "close": 5935,
        "change": 0.08,
        "range": [5920, 5946]
      },
      "ES": {
        "open": 5925,
        "close": 5930,
        "change": 0.08,
        "range": [5915, 5940]
      }
    },
    "sectors": {
      "leading": ["Technology", "Energy"],
      "lagging": ["Healthcare", "Utilities"]
    },
    "catalysts": [
      "CPI data below expectations",
      "UNH guidance suspension"
    ]
  },
  "planAdherence": {
    "score": 7,
    "setupSelection": "Selected 2 of 4 primary setups",
    "riskUtilization": 65,
    "missedOpportunities": 2,
    "modeAlignment": "Took too many trend trades in Mode 2"
  },
  "trades": [
    {
      // Individual trade record format identical to /log-trade output
    }
  ],
  "missedTrades": [
    {
      // Missed trade record format
    }
  ],
  "moderatorTrades": [
    {
      // Moderator trade record format
    }
  ],
  "performance": {
    "totalPnl": -638.50,
    "pnlPercent": -0.64,
    "winRate": 0,
    "winCount": 0,
    "lossCount": 1,
    "largestWin": 0,
    "largestLoss": -638.50,
    "averageR": -3.2,
    "profitFactor": 0
  },
  "executionComparison": {
    "entryTimingDelta": "+15 minutes",
    "exitTimingDelta": "-10 minutes",
    "sizeAlignment": "Significantly smaller",
    "overallExecution": "Poor timing, missed best entries"
  },
  "timeOfDay": {
    "morning": {
      "tradeCount": 1,
      "pnl": -638.50,
      "decisionQuality": "DEGRADED"
    },
    "midday": {
      "tradeCount": 0,
      "pnl": 0,
      "decisionQuality": "DEGRADED"
    },
    "afternoon": {
      "tradeCount": 0,
      "pnl": 0,
      "decisionQuality": "DEGRADED"
    }
  },
  "psychology": {
    "cognitiveLoad": 6.4,
    "decisionQuality": "DEGRADED",
    "distractions": [
      "Discord notifications",
      "News alerts"
    ],
    "emotionalManagement": "Poor - anxiety about losses affected decisions"
  },
  "learnings": [
    {
      "category": "execution",
      "observation": "Mode 2 requires faster profit taking",
      "actionItem": "Set concrete rules for Mode 2 profit taking"
    },
    {
      "category": "psychology",
      "observation": "High cognitive load reduced decision quality",
      "actionItem": "Create pre-session focus ritual"
    },
    {
      "category": "risk",
      "observation": "Position sizing was too large for decision quality",
      "actionItem": "Reduce position size when cognitive load exceeds 5"
    }
  ],
  "improvementActions": [
    "Set concrete rules for Mode 2 profit taking",
    "Create pre-session focus ritual",
    "Reduce position size when cognitive load exceeds 5"
  ],
  "personalNotes": "Felt distracted today, need to improve focus techniques",
  "sessionGrade": "D",
  "gradeJustification": "Negative P&L combined with degraded decision quality"
}
```

## Storage and Persistence

Session logs are stored in:

1. **session-logs/[DATE].json**: Complete session data in JSON format
2. **session-logs/[DATE].md**: Markdown formatted session report
3. **performance-metrics.json**: Updated with session statistics for tracking

## Error Handling

- Invalid date format: "Error: Date must be in YYYY-MM-DD format"
- Missing trade data: "Warning: No trades found for this session"
- Invalid regime value: "Error: Market regime must be one of: Bull - Buy Dips, Bull - Momentum, etc."
- Invalid mode value: "Error: Market mode must be 'Mode 1' or 'Mode 2'"
- Invalid cognitive load value: "Error: Cognitive load must be between 1 and 10"

## Implementation Notes

- The system automatically gathers trade data from state files if available
- Session grades balance process quality, psychological management, and outcome
- The logger creates both individual trade analysis and session-level insights
- Time-of-day analysis helps identify optimal trading windows
- Moderator trade comparisons provide benchmarking opportunities
- Learning synthesis focuses on actionable improvements for future sessions

## Test Vector

Input:
```
/log-session date="2025-05-15" market_regime="Bull - Buy Dips" market_mode="Mode 2" market_conditions="Sideways day with sector rotation, indices flat" cognitive_load=6.4 decision_quality=DEGRADED distractions=["Discord notifications", "News alerts"] key_learnings=["Mode 2 requires faster profit taking", "Missed several good moderator calls", "Over-traded midday chop"] improvement_actions=["Set concrete rules for Mode 2 profit taking", "Create pre-session focus ritual", "Reduce position size when cognitive load exceeds 5"] personal_notes="Felt distracted today, need to improve focus techniques"
```

Partial Expected Output:
```markdown
# Trading Session Log: May 15, 2025

## Market Framework
- **Market Regime**: Bull - Buy Dips
- **Mode Classification**: Mode 2 (80% confidence)
- **Character Status**: Consolidation in bull flag pattern
- **Key Catalysts**: CPI data (below expectations), UNH guidance suspension
- **Index Performance**: SPX +0.08% (5930 → 5935), ES +0.08% (5925 → 5930)
- **Sector Rotation**: Technology and Energy leading, Healthcare and Utilities lagging
- **Volume Profile**: Below average volume, concentrated in morning session

## Plan vs. Execution
- **Plan Adherence**: 7/10
- **Risk Allocation**: 65% of budget used
- **Setup Selection**: Selected 2 of 4 primary setups
- **Missed Opportunities**: 2 viable setups not taken
- **Mode Alignment**: Took too many trend trades in Mode 2 conditions

## Personal Trade Performance

### Trade: QQQ 16-May-25 475P long (put-option)
**Entry**: 6.41 at 05/14/2025 09:32:00 - Option purchase
**Exit**: 0.025 (current) - Significant loss of value
**Performance**: -$638.50 (-99.6%), -3.2R, Grade: F
**Plan Adherence**: Entry (Not in plan), Exit (N/A), Size (Oversized)
**Execution Quality**: 3/10
**Cognitive State**: Load 6.4/10, DEGRADED

**Key Learning**: Avoid options trades without specific thesis and exact trigger

### Session P&L Summary
- **Total P&L**: -$638.50 (-0.64%)
- **Win Rate**: 0% (0/1 trades)
- **Average R**: -3.2
- **Largest Win**: N/A
- **Largest Loss**: -$638.50
- **Profit Factor**: 0

[... remainder of output ...]
```
