# Implementation Plan: May 15-16, 2025

## Goal: Implement MVP for tomorrow's trading session

This implementation plan follows the cognitive workflow structure (Plan → Focus → Execute → Manage → Review) to deliver a complete trading assistant MVP by tomorrow.

## Timeline
1. **Today (May 15)**: Implement core functionality
2. **Tonight**: Test with sample data
3. **Tomorrow (May 16)**: Use in live trading

## Implementation Priority by Cognitive Phase

### 1. PLAN Phase Implementation (3 hours)
- [ ] Implement `/analyze-dp [transcript]` command
  - Parse DP morning call for market context
  - Extract focus trade ideas with direction
  - Identify key technical levels
  - Determine market sentiment
- [ ] Implement conviction classification
  - Pattern matching for high/medium/low confidence
  - Phrase detection for "love it", "viable", etc.
  - Standardized conviction framework
- [ ] Implement `/create-plan` command
  - Generate unified trade plan from morning call analysis
  - Format plan with market overview section
  - Create prioritized trade ideas table
  - Include key levels section
  - Add moving average summary

### 2. FOCUS Phase Implementation (2 hours)
- [ ] Implement `/extract-focus [source] [min_conviction]` command
  - Extract high-conviction trade ideas
  - Filter by minimum conviction level
  - Include complete setup parameters
- [ ] Implement `/extract-levels [source] [indices]` command
  - Extract key price levels for indices
  - Classify as support/resistance
  - Include context and significance
- [ ] Create setup prioritization system
  - Rank opportunities by conviction
  - Include risk/reward assessment
  - Order by execution priority

### 3. EXECUTE Phase Implementation (1.5 hours)
- [ ] Implement `/add-position [symbol]` command
  - Capture entry details (price, time)
  - Record position size
  - Track stop and target levels
  - Link to setup type
- [ ] Implement basic position sizing
  - Calculate appropriate size based on risk
  - Factor in conviction level
  - Apply maximum risk constraints
- [ ] Implement `/analyze-levels [symbol]` command
  - Identify key levels for specific symbols
  - Show current price relationship
  - Highlight potential entry/exit zones

### 4. MANAGE Phase Implementation (1.5 hours)
- [ ] Implement `/list-positions` command
  - Show all active positions
  - Display current P&L
  - Include status indicators
  - Show management priorities
- [ ] Implement `/update-position [symbol]` command
  - Support stop adjustments
  - Handle partial exits
  - Track position modifications
- [ ] Implement `/close-position [symbol]` command
  - Record exit details
  - Calculate final P&L
  - Create trade summary
  - Prepare for logging

### 5. REVIEW Phase Implementation (1 hour - stretch goal)
- [ ] Implement `/log-trade [symbol]` command
  - Create structured trade record
  - Include performance metrics
  - Assess plan adherence
  - Capture key learnings
- [ ] Implement `/run-debrief` command
  - Generate session summary
  - Calculate day performance
  - Identify patterns
  - Suggest improvements

## Integration Testing (1 hour)
- [ ] Test end-to-end workflow
  - Process sample morning call
  - Generate unified plan
  - Add sample positions
  - Update and close positions
  - Create session debrief
- [ ] Fix critical issues
  - Ensure consistent data flow
  - Verify command parameters
  - Check output formatting

## Core Output Templates to Create

### 1. Morning Call Analysis Template (PLAN Phase)
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
    }
  }
}
```

### 2. Unified Trade Plan Template (PLAN/FOCUS Phases)
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

### 3. Position Tracker Template (EXECUTE/MANAGE Phases)
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

## Readiness Checklist
- [ ] PLAN Phase commands implemented
- [ ] FOCUS Phase commands implemented
- [ ] EXECUTE Phase commands implemented
- [ ] MANAGE Phase commands implemented
- [ ] REVIEW Phase commands implemented (stretch)
- [ ] All templates created
- [ ] End-to-end workflow tested
- [ ] Ready for live trading tomorrow

## Implementation Notes
- Focus on functionality over completeness
- Use template-based approach for outputs
- Prioritize accurate analysis of high-conviction trade ideas
- Accept manual overrides where needed
- Start with the PLAN and FOCUS phases as they are most critical for tomorrow

Remember: The goal is a working MVP that helps make money tomorrow, not a perfect system!
