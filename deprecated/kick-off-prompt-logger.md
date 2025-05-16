# 4.1 Trade Logger Implementation Kick-off

## Context
I'm implementing the "Intent Trader" system following our cognitive workflow structure (Plan → Focus → Execute → Manage → Review). We've successfully completed the PLAN phase components (Morning Call Processor, Conviction Classification, Unified Trade Plan Generator), the FOCUS phase components (Trade Idea Extractor, Level Extractor), and the EXECUTE phase components (Position Manager, Position Sizing). Now we're moving to the REVIEW phase, starting with the Trade Logger.

## Status Update
I've successfully implemented:
1. Morning Call Processor (`/analyze-dp` command)
2. Conviction Classification System
3. Unified Trade Plan Generator (`/create-plan` command)
4. Trade Idea Extractor (`/extract-focus` command)
5. Level Extractor (`/extract-levels` command)
6. Position Manager (`/add-position`, `/list-positions`, `/update-position`, `/close-position` commands)
7. Position Sizing (`/size-position` command)

## Current Task
According to our implementation plan, the next component to implement is the Trade Logger (`/log-trade`), which:
- Creates structured records of completed trades
- Calculates performance metrics
- Assesses plan adherence
- Identifies key learnings
- Contributes to pattern recognition

This component will support thorough trade analysis and trader improvement by maintaining detailed records of individual trades.

## Implementation Request
Please help me implement the Trade Logger using the prompt template from our master-prompt-instructions.md:

```
# Trade Logger Implementation

## Context
I'm building an AI-assisted trading system called Intent Trader. The system needs to log completed trades with performance details and learning points. I need you to implement this component.

## Implementation Requirements

Create a complete implementation for the `/log-trade` command that can:
1. Create structured records of completed trades
2. Calculate performance metrics
3. Assess plan adherence
4. Identify key learnings
5. Contribute to pattern recognition

The implementation should follow this structure:
- Front matter with metadata
- Clear purpose statement
- Input/output schemas
- Processing logic
- Template formats
- Example usage

## Input Parameters

The command should take these parameters:
- `symbol` (required): Stock/instrument symbol
- `direction` (required): "long" or "short"
- `entry_price` (required): Entry price
- `entry_time` (required): Entry timestamp
- `entry_condition` (required): Entry context
- `exit_price` (required): Exit price
- `exit_time` (required): Exit timestamp
- `exit_reason` (required): Exit reasoning
- `initial_stop` (required): Initial stop loss
- `setup_type` (required): Type of setup
- `conviction` (optional): Conviction level
- `plan_entry` (optional): Planned entry price/zone
- `plan_exit` (optional): Planned exit price/zone
- `plan_size` (optional): Planned position size
- `actual_size` (optional): Actual position size
- `market_conditions` (optional): Description of market conditions
- `notes` (optional): Additional observations
- `format` (optional): Output format (default: detailed)

## Output Format

The command should produce a trade log entry in this format:

```json
{
  "tradeId": "string",
  "date": "date",
  "symbol": "string",
  "direction": "long/short",
  "entry": {
    "price": "number",
    "time": "timestamp",
    "condition": "string"
  },
  "exit": {
    "price": "number",
    "time": "timestamp",
    "reason": "string"
  },
  "performance": {
    "pnl": "number",
    "pnlPercent": "number",
    "rMultiple": "number",
    "holdTime": "duration"
  },
  "setup": {
    "type": "string",
    "conviction": "string",
    "quality": "string"
  },
  "planAdherence": {
    "entryAdherence": "string",
    "exitAdherence": "string",
    "sizeAdherence": "string",
    "overallAdherence": "score/10"
  },
  "execution": {
    "entryQuality": "string",
    "exitQuality": "string",
    "managementQuality": "string",
    "overallExecution": "score/10"
  },
  "learnings": [
    {
      "category": "string",
      "observation": "string",
      "actionItem": "string"
    }
  ],
  "context": {
    "marketConditions": "string",
    "sectorPerformance": "string",
    "relativeStrength": "string"
  },
  "notes": "string"
}
```

## Trade Log Template

The logged trade should be formatted as:

```markdown
# Trade Log: [SYMBOL] [DIRECTION] - [DATE]

## Trade Details
- **Symbol**: [symbol]
- **Direction**: [long/short]
- **Setup**: [setup type]
- **Conviction**: [conviction level]

## Entry & Exit
- **Entry**: [price] at [time] - [condition]
- **Exit**: [price] at [time] - [reason]
- **Hold Time**: [duration]

## Performance
- **P&L**: [amount] ([percent]%)
- **R-Multiple**: [value]R

## Plan Adherence
- **Entry Adherence**: [assessment]
- **Exit Adherence**: [assessment]
- **Size Adherence**: [assessment]
- **Overall Adherence**: [score]/10

## Execution Quality
- **Entry Quality**: [assessment]
- **Exit Quality**: [assessment]
- **Management Quality**: [assessment]
- **Overall Execution**: [score]/10

## Key Learnings
1. [learning point 1]
2. [learning point 2]
3. [learning point 3]

## Context
- **Market Conditions**: [description]
- **Sector Performance**: [description]
- **Relative Strength**: [description]

## Notes
[additional notes]
```

## Sample Input for Testing

```
Symbol: AAPL
Direction: long
Entry Price: 225.50
Entry Time: 2025-05-15T10:30:00Z
Entry Condition: Breakout above resistance
Exit Price: 230.25
Exit Time: 2025-05-15T14:45:00Z
Exit Reason: Target reached
Initial Stop: 223.80
Setup Type: bull-flag
Conviction: high
Plan Entry: 225.00-226.00
Plan Exit: 230.00
Plan Size: 100 shares
Actual Size: 100 shares
Market Conditions: Bullish trend day
Notes: Strong volume on breakout, managed well
```

## Implementation Deliverable

Please create the complete implementation as an artifact suitable for the file path:
`prompts/review/log-trade.md`

The implementation should include:
1. Proper frontmatter
2. Clear purpose statement and description
3. Input parameter definitions
4. Complete processing logic explanation
5. Output format specification
6. Example usage
7. Test vector

The implementation should be optimized for comprehensive trade logging with meaningful performance metrics and learning points.
```

## Key Considerations for This Implementation

Looking at the sample trade-log.json file you provided, I see that your current trade logging system includes several useful features we should incorporate:

1. **Setup Type Identification**: Utilizing predefined setup types like "gapFillLong" and "trendBreakShort"

2. **Plan vs. Actual Comparison**: Tracking both planned and actual entry/exit levels

3. **Execution Deviation Tracking**: Calculating specific deviations from the plan

4. **Trade Grading**: Including a letter grade assessment of each trade

5. **Cognitive State Assessment**: Tracking cognitive load, decision quality, and distractions

6. **Explicit Improvement Actions**: Listing specific actions to take for improvement

7. **Missed Setup Logging**: Tracking setups that were missed, not just executed trades

The implementation should blend these existing features with the requirements in the prompt template to create a comprehensive trade logging system that supports detailed analysis and improvement.

After you generate the implementation, I'll validate it against our QA review framework and ensure it integrates well with our existing components, particularly the Position Manager.