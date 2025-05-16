---
command: create-plan
version: 1.0.1
phase: premarket
domain: planning
description: Generates a unified trade plan and caches it to state storage
author: Intent Trader Team
date: 2025-05-15
---

# Unified Trade Plan Generator

## Purpose
The `/create-plan` command generates a comprehensive trade plan from processed analyst inputs, integrating market context, focus ideas, and technical levels into an actionable trading strategy document. It then saves this plan to a persistent state file for reference by other commands throughout the trading day.

## Input Parameters

| Parameter | Required | Description | Format | Default |
|-----------|----------|-------------|--------|---------|
| `dpAnalysis` | No | Processed DP morning call analysis | Object | (From system state) |
| `manciniAnalysis` | No | Processed Mancini newsletter analysis | Object | (From system state) |
| `date` | No | Trading date | String (ISO format) | Current date |
| `accountSize` | No | Trading account size for risk calculations | Number | 100000 |
| `maxRiskPercent` | No | Maximum daily risk as percentage | Number (0-10) | 1 |
| `mode` | No | Market mode override | String: "Mode 1", "Mode 2", "auto" | "auto" |
| `template` | No | Output format template | String: "standard", "compact", "detailed" | "standard" |

## Processing Logic

1. **Data Acquisition**
   - Retrieve the DP analysis from state if not provided
   - Process any Mancini analysis if available
   - Validate inputs and verify required data is present

2. **Market Framework Analysis**
   - Determine overall market bias from context
   - Classify market mode (Mode 1 vs. Mode 2)
   - Evaluate market character and conditions
   - Identify key catalysts and events

3. **Level Integration**
   - Normalize and standardize level formats
   - Calculate consensus strength for overlapping levels
   - Create hierarchical level structure
   - Organize levels for major indices and key stocks

4. **Trade Idea Prioritization**
   - Rank trade opportunities by conviction and technical validation
   - Categorize into primary, secondary, and watchlist opportunities
   - Calculate complete risk parameters and targets
   - Add technical context and management protocols

5. **Scenario Planning**
   - Develop primary and alternative market scenarios
   - Assign probability assessments to each scenario
   - Define trigger conditions and expected outcomes
   - Create strategic responses for each scenario

6. **Risk Management Framework**
   - Calculate daily risk budget based on account size
   - Allocate risk across priority trade ideas
   - Define position sizing guidance
   - Establish management protocols

7. **Cache Trade Plan to State**
   - Convert the generated plan to a structured JSON format
   - Save to `state/current-trade-plan.json`
   - Include complete trade ideas, levels, and risk parameters
   - Add metadata and generation timestamp

8. **Format Response**
   - Generate readable markdown output for display
   - Include all plan sections in appropriate detail
   - Add confirmation of plan caching

## Response Format

The command returns the complete trade plan in markdown format and confirms it has been cached:

```
# Unified Daily Trade Plan — [DATE]

## Market Framework
- **Overall Bias**: [BIAS_DESCRIPTION]
- **Mode Classification**: [MODE] ([CONFIDENCE]% confidence)
- **Character Status**: [CHARACTER_DESCRIPTION]
- **Key Catalysts**: [CATALYST_LIST]

## Level Framework
[DETAILED_LEVEL_STRUCTURE]

## Priority Trade Ideas
[PRIORITIZED_TRADE_IDEAS]

## Scenario Planning
[SCENARIO_DESCRIPTIONS]

## Execution Framework
[RISK_AND_EXECUTION_GUIDANCE]

## Preparation Checklist
[CHECKLIST_ITEMS]

Plan successfully cached to state/current-trade-plan.json for use by other commands.
```

## Example Usage

```
/create-plan maxRiskPercent=1.5 mode=auto
```

## Example Response

```
# Unified Daily Trade Plan — May 15, 2025

## Market Framework
- **Overall Bias**: Neutral to slightly bearish below 5926, bullish above
- **Mode Classification**: Mode 2 (range/trap day) - 80% confidence
- **Character Status**: Consolidation in bull flag pattern
- **Key Catalysts**: CPI data (awaiting release), UNH guidance suspension

[... Complete trade plan content ...]

Plan successfully cached to state/current-trade-plan.json for use by other commands.
```

## Cache Structure

The command caches the trade plan in a structured JSON format at `state/current-trade-plan.json`:

```json
{
  "tradePlan": {
    "date": "2025-05-15",
    "timestamp": "2025-05-15T07:45:00Z",
    "marketFramework": {
      "bias": "neutral-to-bearish",
      "biasCondition": "below 5926, bullish above",
      "mode": "Mode 2",
      "modeConfidence": 80,
      "character": "Consolidation in bull flag pattern",
      "catalysts": ["CPI data (awaiting release)", "UNH guidance suspension"]
    },
    "levelFramework": { 
      /* Complete level structure */ 
    },
    "tradeIdeas": {
      "primary": [
        /* High conviction trade ideas */
      ],
      "secondary": [
        /* Medium conviction trade ideas */
      ],
      "watchlist": [
        /* Low conviction or conditional ideas */
      ]
    },
    "scenarioPlanning": {
      /* Scenario details */
    },
    "riskManagement": {
      /* Risk allocation details */
    },
    "managementProtocol": {
      /* Position management guidelines */
    },
    "metadata": {
      "accountSize": 100000,
      "generatedFrom": "DP morning call analysis",
      "generationTimestamp": "2025-05-15T07:45:00Z"
    }
  }
}
```

## Integration with Other Commands

The cached trade plan is used by:

- `/add-position`: Verifies alignment with plan before creating positions
- `/list-positions`: Compares actual positions against plan
- `/update-position`: Validates management decisions against plan guidelines
- `/size-position`: Uses risk allocations from plan for sizing recommendations
- `/run-debrief`: Evaluates trading performance against original plan

## Error Handling

- Missing DP Analysis: "Error: No DP analysis found. Run /analyze-dp first."
- Invalid Risk Percentage: "Error: Maximum risk percentage must be between 0.1 and 10."
- Invalid Mode: "Error: Mode must be 'Mode 1', 'Mode 2', or 'auto'."
- Cache Write Failure: "Warning: Failed to cache trade plan. Proceed with caution."

## Implementation Notes

- The command automatically retrieves analysis data if not provided directly
- Risk allocations scale based on conviction level and account size
- Mode detection is algorithmic but can be overridden manually
- The cache includes the complete plan data, not just a summary
- Each plan generation overwrites the previous cached plan
- The implementation follows a risk-first approach to trade planning
