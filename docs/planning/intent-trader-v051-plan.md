---
id: intent-trader-v051-plan
version: "0.5.1"
type: plan
created: 2025-05-15
updated: 2025-05-15
status: ACTIVE
---

# Intent Trader v0.5.1 MVP Plan

This document defines the scope, architecture, and development priorities for delivering a working MVP (minimum viable product) of the Intent Trader system by tomorrow/Monday. It focuses on providing immediate trading value while establishing the foundation for future iterations.

---

## 🎯 MVP Definition

The MVP must support a full trading session for a single user, aligned to a hybrid structure:

### Temporal Sessions:
- **Pre-Market Session**: Plan + Focus _(MVP CORE)_
- **Open Market Session**: Execute + Manage _(MVP CORE)_
- **Post-Market Session**: Review _(MVP STRETCH)_

### Cognitive Workflow:
- **Plan → Focus → Execute → Manage → Review**

This framework supports the end-to-end trading workflow while prioritizing the components most critical for making money tomorrow.

---

## Core Workstreams (MVP Scope)

### 1. Pre-Market Session

#### PLAN Phase (HIGHEST PRIORITY)
- **Morning Call Analysis**: Extract actionable insights from DP morning calls
  - Parse for high-conviction trade ideas
  - Identify key technical levels
  - Extract market context
  - Determine analyst's directional bias
- **Unified Trade Plan Creation**: Generate a comprehensive trading plan
  - Market overview with key context
  - Prioritized trade ideas with conviction levels
  - Key technical levels and moving averages
  - Risk allocation recommendations

#### FOCUS Phase (HIGH PRIORITY)
- **Conviction Classification**: Determine confidence level for trade ideas
  - DP language pattern recognition
  - Standardized high/medium/low framework
  - Consistent categorization methodology
- **Setup Prioritization**: Rank opportunities by quality
  - Conviction-based ranking
  - Risk/reward assessment
  - Technical setup quality
  - Execution priority determination

### 2. Open Market Session

#### EXECUTE Phase (HIGH PRIORITY)
- **Position Sizing**: Calculate appropriate trade size
  - Risk-based sizing methodology
  - Conviction-based adjustment
  - Maximum risk constraints
  - Per-setup type sizing rules
- **Trade Validation**: Verify alignment with plan
  - Plan consistency check
  - Risk parameter validation
  - Technical level confirmation
  - Entry criteria validation

#### MANAGE Phase (HIGH PRIORITY)
- **Core Position Management**: Track active positions
  - Position status monitoring
  - P&L calculation
  - Risk exposure tracking
  - Management priority determination
- **Trimming Protocol**: Implement systematic profit taking _(STRETCH)_
  - 75/15/10 rule implementation
  - Target-based reduction
  - Stop adjustment after partial exits
  - Runner isolation
- **Stop Adjustment**: Dynamic risk management _(STRETCH)_
  - Initial stop placement
  - Breakeven methodology
  - Trailing stop implementation
  - Character-based adjustment

### 3. Post-Market Session

#### REVIEW Phase (STRETCH GOAL)
- **Trade Logging**: Record completed trades
  - Entry/exit details
  - Performance metrics
  - Setup classification
  - Plan adherence assessment
- **Session Debrief**: Analyze trading performance
  - Day summary creation
  - Performance metric calculation
  - Pattern identification
  - Improvement recommendations

---

## Implementation Timeline

### Day 1 (Today/Tomorrow): MVP CORE
1. **Morning (3 hours)**: Implement PLAN Phase
   - Create `/analyze-dp` command to extract key information
   - Implement conviction classification for trade ideas
   - Develop technical level extraction
   - Create `/create-plan` command for unified plans

2. **Midday (2 hours)**: Implement FOCUS Phase
   - Build `/extract-focus` for high-conviction trade ideas
   - Implement `/extract-levels` for technical level analysis
   - Create simple setup prioritization

3. **Afternoon (2 hours)**: Implement EXECUTE & MANAGE Phases
   - Develop position management commands:
     - `/add-position`
     - `/update-position`
     - `/close-position`
     - `/list-positions`
   - Create simple position sizing functionality

4. **Evening (1 hour)**: Test end-to-end workflow
   - Process sample morning call
   - Generate unified plan
   - Simulate position management
   - Fix critical issues

### Day 2 (Next Trading Day): MVP STRETCH
1. **Morning (2 hours)**: Enhance MANAGE Phase
   - Improve trimming protocol with 75/15/10 rule
   - Add stop adjustment functionality
   - Implement `/manage-runner` command

2. **Afternoon (2 hours)**: Implement REVIEW Phase
   - Create `/log-trade` command
   - Implement `/run-debrief` for session analysis
   - Develop basic pattern recognition

---

## Command Implementation Priorities

### Day 1 (MVP CORE) Commands

#### PLAN Phase
- `/analyze-dp [transcript]` - Process DP morning call
- `/create-plan` - Generate unified trade plan

#### FOCUS Phase
- `/extract-focus dp [min_conviction]` - Extract high-conviction ideas
- `/extract-levels dp [indices]` - Extract key technical levels

#### EXECUTE Phase
- `/add-position [symbol]` - Track new position
- `/size-position [symbol]` - Calculate position size

#### MANAGE Phase
- `/update-position [symbol]` - Update position details
- `/close-position [symbol]` - Close position and record outcome
- `/list-positions` - Show current positions

### Day 2 (MVP STRETCH) Commands

#### MANAGE Phase
- `/adjust-stop [symbol]` - Modify stop loss level
- `/trim-position [symbol]` - Execute partial exit
- `/manage-runner [symbol]` - Apply runner management protocol

#### REVIEW Phase
- `/log-trade [symbol]` - Record trade performance
- `/run-debrief` - Analyze trading session

---

## Output Templates

### 1. Morning Call Analysis (PLAN Phase)
```json
{
  "marketContext": {
    "futures": {"status": "string", "catalysts": ["string"]},
    "indices": {"dow": {"direction": "string", "change": "string"}, "nasdaq": {"direction": "string", "change": "string"}},
    "keyMovers": [{"ticker": "string", "direction": "string", "magnitude": "string", "reason": "string"}],
    "sentiment": "string"
  },
  "focusIdeas": [
    {
      "ticker": "string",
      "direction": "long/short",
      "conviction": {"level": "high/medium/low", "phrases": ["string"]},
      "entryParameters": {"zone": {"min": "number", "max": "number"}, "condition": "string"},
      "exitParameters": {"stopLoss": "number", "target": "number"},
      "rationale": "string"
    }
  ],
  "levels": {
    "indices": {
      "es": {"support": [{"value": "number"}], "resistance": [{"value": "number"}]},
      "spx": {"support": [{"value": "number"}], "resistance": [{"value": "number"}]}
    },
    "stocks": [
      {
        "ticker": "string",
        "levels": {"support": [{"value": "number"}], "resistance": [{"value": "number"}]},
        "movingAverages": {"ma8": "number", "ma21": "number"}
      }
    ]
  }
}
```

### 2. Unified Trade Plan (PLAN/FOCUS Phases)
```markdown
# Unified Daily Trade Plan — [DATE]

## Market Overview
- **Futures**: [status]
- **Sentiment**: [assessment]
- **Key Context**: [important information]

---

## DP Trade Ideas (Sorted by Conviction)

| # | Ticker | Level(s)     | Action              | Conviction | Sizing       | Duration | Sentiment |
|---|--------|--------------|---------------------|------------|--------------|----------|-----------|
| 1 | TICK   | 00–00        | [action]            | High       | [size]       | [time]   | [sent]    |
| 2 | TICK   | 00           | [action]            | High       | [size]       | [time]   | [sent]    |
| 3 | TICK   | 00 (00d MA)  | [action]            | Med-High   | [size]       | [time]   | [sent]    |

---

## Key Levels

### Support Zones

| Level | Type     | Notes                                    |
|-------|----------|------------------------------------------|
| 0000  | Major    | [significance]                           |
| 0000  | Minor    | [context]                                |

### Resistance Zones

| Level | Type     | Notes                                    |
|-------|----------|------------------------------------------|
| 0000  | Major    | [significance]                           |
| 0000  | Minor    | [context]                                |

---

## Moving Averages (Levels-Check Summary)

| Ticker | 8d MA | 21d MA | Price     | Notes                         |
|--------|-------|--------|-----------|-------------------------------|
| SPX    | ~0000 | ~0000  | 0000.00   | [relationship]                |
| TICK   | ~000  | ~000   | 000.00    | [relationship]                |

---

## Execution Notes

- [key focus points]
- [risk notes]
- [management protocol]
```

### 3. Position Tracker (EXECUTE/MANAGE Phases)
```markdown
# Active Positions — [DATE]

| Ticker | Direction | Entry   | Current | P&L     | Stop    | Target  | Status    |
|--------|-----------|---------|---------|---------|---------|---------|-----------|
| TICK   | Long      | 000.00  | 000.00  | +0.0%   | 000.00  | 000.00  | Active    |
| TICK   | Short     | 000.00  | 000.00  | -0.0%   | 000.00  | 000.00  | Active    |

## Position Details

### TICK (Long)
- **Entry**: 000.00 at 00:00
- **Current**: 000.00 (+/-0.0%)
- **Stop**: 000.00 (-0.0%)
- **Targets**:
  - T1 (75%): 000.00 (+0.0%)
  - T2 (15%): 000.00 (+0.0%)
  - T3 (10%): 000.00 (+0.0%)
- **Setup**: [type]
- **Notes**: [context]

## Aggregate Risk
- **Total Exposure**: 0.0% of capital
- **Directional Bias**: [long/short/neutral]
```

### 4. Trade Log (REVIEW Phase)
```markdown
# Trade Log — [DATE]

| Ticker | Direction | Entry   | Exit    | P&L     | Hold Time | Setup     | Adherence |
|--------|-----------|---------|---------|---------|-----------|-----------|-----------|
| TICK   | Long      | 000.00  | 000.00  | +0.0%   | 0h 00m    | [type]    | [rating]  |
| TICK   | Short     | 000.00  | 000.00  | -0.0%   | 0h 00m    | [type]    | [rating]  |

## Trade Details

### TICK (Long)
- **Entry**: 000.00 at 00:00 [condition]
- **Exit**: 000.00 at 00:00 [reason]
- **Result**: +/-0.0% ($ amount)
- **Plan Adherence**: [assessment]
- **Management**: [assessment]
- **Lessons**: [key takeaways]
```

---

## MVP Success Criteria

The MVP will be considered successful if:

1. It can process a real DP morning call and extract actionable trade ideas (PLAN)
2. It generates a clear, prioritized trade plan with entry/exit points (PLAN)
3. It helps prioritize the highest conviction setups (FOCUS)
4. It tracks positions accurately during the trading day (EXECUTE/MANAGE)
5. It supports profitable decision making during tomorrow's trading session

This MVP focuses on delivering immediate trading value while establishing the core architecture for future enhancements.

---

## Next Steps After MVP

1. Enhance MANAGE phase capabilities
   - Improve 75/15/10 rule implementation
   - Refine stop adjustment methodology
   - Enhance runner management

2. Develop REVIEW phase functionality
   - Improve trade logging and analytics
   - Implement pattern recognition
   - Create knowledge extraction framework

3. Add Mancini newsletter processing
   - Implement `/analyze-mancini` command
   - Create level integration framework
   - Add Failed Breakdown pattern detection

4. Enhance technical analysis capabilities
   - Add Mode detection (Mode 1 vs. Mode 2)
   - Implement character change detection
   - Create regime classification

By focusing on a pragmatic MVP that delivers immediate trading value, we establish a solid foundation while enabling rapid feedback and iteration.
