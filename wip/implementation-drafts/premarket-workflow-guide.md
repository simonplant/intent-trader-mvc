# Premarket Workflow Implementation Guide

This guide outlines the complete workflow for the premarket phase, integrating both DP and Mancini analysis into a unified trading approach.

## 1. Premarket Workflow Overview

The premarket workflow represents the critical preparation phase before market open, when traders analyze analyst inputs, assess market conditions, and develop a comprehensive trading plan for the day. In Intent Trader, this workflow integrates insights from both DP morning calls and Mancini newsletters to create a unified approach.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Analyst Input   │    │ Technical       │    │ Plan            │
│ Processing      │───>│ Analysis        │───>│ Generation      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                     │                      │
         │                     │                      │
         ▼                     ▼                      ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Watchlist       │    │ Alert           │    │ Preflight       │
│ Management      │<───│ Configuration   │<───│ Checklist       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 2. Workflow Components

### 2.1 Analyst Input Processing

**Purpose**: Extract structured data from analyst sources.

**Key Commands**:
- `/analyze-dp [transcript]` - Process DP morning call
- `/analyze-mancini [newsletter]` - Process Mancini newsletter

**Implementation Steps**:
1. Preprocess text to normalize formatting
2. Identify sections within the content
3. Extract structured entities (levels, ideas, context)
4. Classify conviction and significance
5. Organize into standardized schema
6. Generate structured output for integration

**Key Outputs**:
- Market context assessment
- Technical level framework
- Focus trade ideas
- Market mode/character analysis
- Bull/bear case scenarios

### 2.2 Technical Analysis

**Purpose**: Validate analyst insights with current market data and enhance with technical context.

**Key Commands**:
- `/check-ma [symbols...]` - Analyze MA relationships
- `/detect-mode` - Determine market mode
- `/analyze-levels [indices]` - Validate key levels

**Implementation Steps**:
1. Fetch current price data for indices and focus tickers
2. Calculate key moving average values (8, 10, 21, 50, 100, 200)
3. Assess price vs. MA relationships
4. Validate analyst-provided levels against technical structure
5. Determine market mode based on price action
6. Assess character state for indices and focus tickers

**Key Outputs**:
- Current MA values and relationships
- Technical level validation
- Market mode assessment
- Character state analysis
- Gap analysis (if applicable)

### 2.3 Plan Generation

**Purpose**: Create a comprehensive trading plan integrating all insights.

**Key Commands**:
- `/create-plan` - Generate unified trade plan
- `/create-blueprint` - Generate morning blueprint

**Implementation Steps**:
1. Merge level frameworks from all sources with consensus scoring
2. Prioritize trade ideas based on conviction and confirmation
3. Apply mode context to strategy development
4. Create conditional scenario branches
5. Develop risk allocation framework
6. Generate execution sequence
7. Produce comprehensive plan document

**Key Outputs**:
- Complete unified trade plan
- Morning blueprint summary
- Integrated level visualization
- Prioritized trade opportunities
- Risk allocation guidance

### 2.4 Watchlist Management

**Purpose**: Create and organize a prioritized list of tickers to monitor.

**Key Commands**:
- `/manage-watchlist add [ticker] [setup]` - Add to watchlist
- `/manage-watchlist prioritize` - Rank watchlist items

**Implementation Steps**:
1. Extract tickers from all focus ideas
2. Add tickers from technical setups
3. Incorporate historical interest tickers
4. Assign priority based on conviction and setup quality
5. Group by setup type and sector
6. Add technical context for each ticker

**Key Outputs**:
- Prioritized watchlist
- Setup classification for each ticker
- Technical context summary
- Alert thresholds
- Expected timing

### 2.5 Alert Configuration

**Purpose**: Set up monitoring alerts for key levels and conditions.

**Key Commands**:
- `/set-alert [ticker] [condition]` - Configure alert
- `/set-alert [index] [level]` - Set level alert

**Implementation Steps**:
1. Create price-based alerts for key levels
2. Set moving average interaction alerts
3. Configure character change monitors
4. Establish volume triggers
5. Set time-based checkpoints
6. Enable alert notifications

**Key Outputs**:
- Level breach alerts
- MA cross alerts
- Volume surge alerts
- Character change notifications
- Time checkpoint reminders

### 2.6 Preflight Checklist

**Purpose**: Verify readiness for market open with comprehensive check.

**Key Commands**:
- `/run-preflight` - Execute premarket checklist

**Implementation Steps**:
1. Verify plan completeness
2. Check priority setups for clear parameters
3. Validate risk parameters
4. Ensure alert configuration
5. Verify system readiness
6. Conduct mental preparation assessment

**Key Outputs**:
- Preflight status report
- Missing elements alert
- Readiness assessment
- Last-minute recommendations
- Focus reminder

## 3. Integration Points

### 3.1 DP-Mancini Integration

The premarket workflow integrates DP and Mancini insights at these key points:

1. **Level Framework Integration**
   - Use Mancini's precise numerical levels with major/minor designation
   - Enhance with DP's character assessment and MA context
   - Create consensus strength scoring for overlapping levels
   - Develop unified visualization combining both sources

2. **Trade Idea Integration**
   - Use Mancini's Failed Breakdown methodology as base setup framework
   - Incorporate DP's conviction language for prioritization
   - Combine entry criteria from both sources
   - Develop unified management approach (75/15/10 rule with character adaptation)

3. **Market Context Integration**
   - Apply Mancini's Mode classification as strategic foundation
   - Enhance with DP's broader market context and sentiment
   - Incorporate DP's earnings and news impact assessment
   - Combine for comprehensive market framework

### 3.2 Technical Validation

All analyst insights are validated against technical data:

1. **Level Validation**
   - Verify analyst levels against technical structure
   - Confirm level significance with historical interaction
   - Assess current price relationships to levels
   - Validate mode classification with technical conditions

2. **Setup Validation**
   - Confirm pattern presence for cited setups
   - Verify technical conditions for trade ideas
   - Validate risk parameters against volatility metrics
   - Check for conflicting technical signals

## 4. Command Sequence

The standard premarket command sequence is:

```
1. /analyze-dp [transcript]
2. /analyze-mancini [newsletter]
3. /check-ma ES,SPX,QQQ
4. /check-ma [focus tickers]
5. /detect-mode
6. /create-plan
7. /manage-watchlist prioritize
8. /set-alert [key levels]
9. /run-preflight
```

For efficiency, these can be combined with the meta-command:
```
/run-phase premarket
```

## 5. Output Examples

### 5.1 Unified Trade Plan Example

```
# Unified Trade Plan - May 15, 2025

## Market Framework
- **Overall Bias**: Bullish above 5900, cautious below
- **Mode Classification**: Mode 2 (range/trap day) - 80% confidence
- **Character Status**: Consolidation in bull flag pattern
- **Key Catalysts**: CPI report (8:30am), Fed speakers (2:00pm)

## Level Framework
### ES Futures
- **Support Levels**:
  - 5900 (MAJOR, consensus: high) - Bottom of bull flag, multiple Failed Breakdowns
  - 5890 (minor, consensus: medium) - Secondary support, Mode 2 trap zone
  - 5884 (MAJOR, consensus: high) - Previous consolidation base
  - 5873 (minor, consensus: low) - Minor support level
  - 5850 (MAJOR, consensus: high) - Macro support, strong prior resistance turned support

- **Resistance Levels**:
  - 5926 (MAJOR, consensus: high) - Top of bull flag, recent resistance
  - 5945 (minor, consensus: medium) - Prior high
  - 5970 (minor, consensus: high) - Bull flag measured move target
  - 6000 (MAJOR, consensus: high) - Psychological round number

- **Moving Averages**:
  - 8-day: 5840 (price above, bullish)
  - 10-day: 5825 (price above, bullish)
  - 21-day: 5780 (price above, bullish)
  - 50-day: 5650 (price above, strong uptrend)

### Key Stocks
[Individual stock levels would be listed here]

## Priority Trade Ideas
1. **ES Failed Breakdown Long** (High Conviction)
   - **Setup**: Failed Breakdown at 5900 support
   - **Entry**: 5905-5910 after acceptance above 5900
   - **Stop**: Below 5890 (violation of secondary support)
   - **Targets**: 5926 (75%), 5945 (15%), 5970+ (10% runner)
   - **Management**: Standard 75/15/10 rule, trail runner with Mode 2 volatility buffer
   - **Character Context**: Bull flag consolidation pattern

2. **AAPL Bull Flag** (Medium-High Conviction)
   - **Setup**: Bull flag consolidation near all-time highs
   - **Entry**: Above 225.50 with volume confirmation
   - **Stop**: Below 223.80 (flag violation)
   - **Targets**: 227.50 (75%), 229.00 (15%), 232+ (10% runner)
   - **Management**: Standard 75/15/10 rule, watch for character change at 227.50

[Additional trade ideas would be listed here]

## Scenario Planning
### Primary Scenario (60% probability)
- Continued consolidation within bull flag (5900-5926)
- Multiple Failed Breakdowns possible at 5900
- Eventual resolution higher toward 5970

### Bear Case (30% probability)
- Loss of 5900/5890 support
- Flush toward 5873-5850 zone
- Failed Breakdown potential at 5850 major support

### Strong Bull Case (10% probability)
- Break above 5926 resistance
- Quick run to 5945-5970 zone
- Possible trend day (Mode 1) development

## Execution Framework
1. Focus on 5900 zone for Failed Breakdown entries
2. Monitor character at key resistance levels
3. Apply standard 75/15/10 management
4. Adjust stops based on acceptance behavior
5. Size positions according to conviction level
```

### 5.2 Preflight Checklist Example

```
# Premarket Preflight Checklist - May 15, 2025

## Plan Status: COMPLETE ✅
- Unified Trade Plan generated
- Priority trade ideas identified
- Key levels established
- Scenarios defined

## Focus Setup Verification
- ES Failed Breakdown: VERIFIED ✅
  - Clear parameters established
  - Key levels identified
  - Management protocol defined

- AAPL Bull Flag: VERIFIED ✅
  - Entry criteria clear
  - Stop location defined
  - Targets established

## Risk Parameters: VERIFIED ✅
- Daily risk budget: 2% maximum
- Position sizing guidelines established
- Correlation assessment completed
- Maximum concurrent positions: 3

## Alert Configuration: VERIFIED ✅
- Key level alerts set
- Character change monitors active
- Volume triggers configured
- Time checkpoints established

## System Readiness: VERIFIED ✅
- Data feeds active
- Command system operational
- State storage prepared
- Backup system ready

## Mental Preparation: VERIFIED ✅
- Clear objectives established
- Emotional state assessed
- Decision framework reviewed
- Commitment to plan confirmed

## READY FOR MARKET OPEN ✅
```

## 6. Implementation Notes

### 6.1 Performance Considerations

- **Analyst Processing Time**: Allow 1-2 minutes for complete processing of analyst inputs
- **Plan Generation Time**: Allow 30-60 seconds for unified plan creation
- **Alert Configuration**: Set up most critical alerts first in case of time constraints
- **Preflight Priority**: In time-constrained situations, prioritize plan creation and focus setup verification

### 6.2 Error Handling

- **Missing Analyst Input**: Can proceed with single source if necessary
- **Technical Data Issues**: Fall back to analyst levels if technical data unavailable
- **Plan Generation Failure**: Provide option to use most recent analyst input directly
- **Partial Completion**: Allow workflow to proceed with warnings about missing components

### 6.3 Extending the Workflow

The base premarket workflow can be extended with:

1. **Historical Context Enhancement**
   - Add historical performance of similar setups
   - Include previous day's key levels and interactions
   - Add historical analyst accuracy for setup types

2. **Multiple Analyst Integration**
   - Incorporate additional analysts beyond DP and Mancini
   - Weight inputs based on historical accuracy
   - Create more sophisticated consensus models

3. **Automated Backtesting**
   - Test identified setups against historical data
   - Provide success probability metrics
   - Suggest optimal management approaches

4. **AI-Enhanced Recommendations**
   - Provide adaptive risk suggestions
   - Offer setup quality assessment
   - Suggest optimal entry timing

This implementation guide provides a comprehensive framework for the premarket workflow, ensuring complete integration of both DP and Mancini methodologies into a cohesive, actionable trading approach.
