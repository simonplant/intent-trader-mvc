---
id: command-reference
title: Intent Trader Command Reference
description: Comprehensive reference for all commands in Intent Trader
author: Intent Trader Team
version: 0.1.2
release: 0.5.1
created: 2025-05-15
updated: 2025-05-16
category: documentation
status: stable
tags: [reference, commands, documentation]
requires: []
outputs: []
input_format: none
output_format: markdown
ai_enabled: false
---

# Intent Trader Command Reference

This document provides a comprehensive reference for all commands available in Intent Trader, organized by cognitive workflow phase. It includes both current MVP commands and planned future functionality.

## Command Structure

Intent Trader commands follow a consistent structure:

```
/[action]-[object] [parameter1] [parameter2] ...
```

All commands are phase-aligned to the cognitive workflow:
- **Plan Phase**: Morning analysis and preparation
- **Focus Phase**: Opportunity identification and prioritization
- **Execute Phase**: Trade entry and position creation
- **Manage Phase**: Active position management
- **Review Phase**: Performance analysis and reflection
- **System**: Core system commands

## Implementation Status

Commands are marked with their implementation status:
- **CORE**: Implemented in v0.5.1

## Quick Reference: Commands

| Command | Phase | Status | Description |
|---------|-------|--------|-------------|
| `/analyze-dp` | Plan | CORE | Process DP morning call |
| `/create-plan` | Plan | CORE | Generate unified trade plan |
| `/analyze-mancini-preprocessor` | Plan | CORE | Extract structured data from Mancini newsletter |
| `/analyze-mancini` | Plan | CORE | Process preprocessed Mancini data |
| `/extract-focus` | Focus | CORE | Extract high-conviction ideas |
| `/extract-levels` | Focus | CORE | Extract key technical levels |
| `/add-position` | Execute | CORE | Track new position |
| `/size-position` | Execute | CORE | Calculate position size |
| `/list-positions` | Execute | CORE | Show current positions |
| `/update-position` | Manage | CORE | Update position details |
| `/close-position` | Manage | CORE | Close position and record outcome |
| `/log-session` | Review | CORE | Record complete session data |
| `/help` | System | CORE | Show available commands |
| `/status` | System | CORE | Show current trading session state |

---

## Detailed Command Documentation

### PLAN Phase Commands

#### `/analyze-dp [transcript]`

**Purpose:** Process DP morning call transcript comprehensively, extracting all key components and insights.

**Parameters:**
* `transcript` (required): Text of DP's morning call
* `components` (optional): Specific components to focus on (default: all)
* `format` (optional): Output format (default: structured)

**Output:**
* Complete structured analysis of market context
* Focus trade ideas with conviction assessment
* Key technical levels and MA relationships
* Day-after-trade opportunities
* Analyst actions summary
* Market philosophy assessment

**Implementation:**
* Focus on extracting high-conviction trade ideas
* Extract key levels for indices and focus stocks
* Basic market context (futures, sentiment)
* Simple conviction classification

**File Location:**
* `prompts/plan/analyze-dp.md`

**Example:**
```
/analyze-dp "Futures are a bit lower as we await this morning's CPI. The Dow is leading to the downside after UNH suspends guidance for 2025..."
```

#### `/create-plan`

**Purpose:** Generate comprehensive unified trade plan integrating multiple analyst inputs.

**Parameters:**
* `sources` (optional): Which analysts to include (default: all)
* `risk_level` (optional): Day-specific risk tolerance (1-5) (default: 3)
* `focus` (optional): Specific aspects to emphasize (default: all)

**Output:**
* Complete trading plan with market context
* Integrated level structure with consensus strength
* Prioritized setups across analysts
* Risk allocation framework
* Conditional scenario planning
* Mode-specific guidelines

**Implementation:**
* Focus on DP insights
* Prioritized trade ideas
* Basic market context
* Key levels for trading decisions

**File Location:**
* `prompts/focus/create-plan.md`

**Example:**
```
/create-plan risk_level=4
```

#### `/analyze-mancini-preprocessor [newsletter]`

**Purpose:** Extract structured data from Mancini newsletter for further analysis, handling large PDFs that exceed context limits.

**Parameters:**
* `newsletter` (required): Complete text of Mancini's newsletter
* `format` (optional): Output format for the structured data (default: json)

**Output:**
* Preprocessed JSON with structured sections
* Extracted price levels with context
* Market commentary organized by sections
* Failed Breakdown setups identified
* Bull/bear scenarios extracted
* Runner management information

**Implementation:**
* Document chunking for large newsletters
* Key section identification
* Price level extraction
* Basic structure normalization

**File Location:**
* `prompts/plan/analyze-mancini-preprocessor.md`

**Example:**
```
/analyze-mancini-preprocessor "SPX Is Coiled Tight. Another Move Is Coming. What Way? May 15 Plan..."
```

#### `/analyze-mancini [preprocessedData]`

**Purpose:** Process preprocessed Mancini newsletter data to perform comprehensive analysis and integration with trade plan.

**Parameters:**
* `preprocessedData` (required): JSON output from the preprocessor
* `components` (optional): Specific components to focus on (default: all)
* `format` (optional): Output format (default: structured)

**Output:**
* Structured level framework with major/minor classification
* Market mode assessment (Mode 1/Mode 2)
* Failed Breakdown setups and opportunities
* Bull/bear case scenarios
* Runner status and management protocol
* Level-to-level trading methodology

**Implementation:**
* Advanced analysis of preprocessed data
* Mode classification (Mode 1 vs Mode 2)
* Integration with level extraction system
* Failed Breakdown pattern recognition
* Market bias determination

**File Location:**
* `prompts/plan/analyze-mancini.md`

**Example:**
```
/analyze-mancini preprocessedData='{"newsletterDate":"2025-05-16","newsletterTitle":"4 Green Days In A Row","marketSection":"Everyday since the market bottomed...","keyLevels":{"supports":[{"price":5925,"context":"major"}]}}'
```

### FOCUS Phase Commands

#### `/extract-focus [source] [min_conviction]`

**Purpose:** Extract high-conviction trade ideas from analyst commentary.

**Parameters:**
* `source` (required): "mancini", "dp", or "both"
* `min_conviction` (optional): Minimum conviction level to include (default: medium)
* `max_ideas` (optional): Maximum number of ideas to extract (default: all)

**Output:**
* Prioritized focus ideas with conviction assessment
* Complete setup parameters (entry, exit, stops)
* Supporting technical context
* Trade management guidelines
* Relevant timeframes

**Implementation:**
* Extract DP's high-conviction ideas
* Simple conviction classification (high/medium/low)
* Basic entry/exit parameters

**File Location:**
* `prompts/focus/extract-focus.md`

**Example:**
```
/extract-focus dp high
```

#### `/extract-levels [source] [indices]`

**Purpose:** Extract market levels from analyst source with precision and hierarchy.

**Parameters:**
* `source` (required): "mancini", "dp", or "both"
* `indices` (optional): Specific indices to extract (default: ES,SPX,QQQ)
* `include_context` (optional): Include level context (default: true)

**Output:**
* Structured levels with significance classification
* Hierarchical organization (major/minor)
* Context and historical significance
* Level clusters identification
* Visual representation of levels

**Implementation:**
* Focus on extracting DP levels
* Basic significance classification
* Simple hierarchical structure

**File Location:**
* `prompts/focus/extract-levels.md`

**Example:**
```
/extract-levels dp ES,SPX
```

---

### EXECUTE Phase Commands

#### `/add-position [symbol]`

**Purpose:** Add a new trading position to tracking system.

**Parameters:**
* `symbol` (required): Stock/instrument symbol
* `entry_price` (required): Entry price
* `stop_price` (required): Initial stop price
* `target_price` (optional): Target price
* `strategy` (optional): Trading strategy or setup type
* `conviction` (optional): Conviction level
* `notes` (optional): Trade notes or rationale

**Output:**
* Confirmation of position creation
* Summary of position details
* Initial risk assessment

**File Location:**
* `prompts/manage/add-position.md`

**Example:**
```
/add-position AAPL entry_price=182.50 stop_price=180.25 target_price=187.50 strategy="Support Bounce" conviction=high
```

#### `/size-position [symbol]`

**Purpose:** Calculate appropriate position size based on risk parameters.

**Parameters:**
* `symbol` (required): Ticker symbol
* `entry` (required): Planned entry price
* `stop` (required): Planned stop price
* `risk_amount` (optional): Dollar amount to risk (default: 1% of capital)
* `conviction` (optional): Conviction level for size scaling

**Output:**
* Recommended position size in shares/contracts
* Dollar risk per position
* Percentage of account
* Alternative sizing options (conservative/aggressive)

**File Location:**
* `prompts/execute/size-position.md`

**Example:**
```
/size-position AAPL entry=182.50 stop=180.25 risk_amount=500 conviction=high
```

#### `/list-positions`

**Purpose:** List all currently tracked positions.

**Parameters:**
* `status` (optional): Filter by status (active, closed)
* `owner` (optional): Filter by owner (personal, moderator)

**Output:**
* Table of current positions with key metrics
* Summary statistics (total positions, P/L, risk exposure)

**File Location:**
* `prompts/manage/list-positions.md`

**Example:**
```
/list-positions status=active
```

**Purpose:** Perform comprehensive technical analysis on a specific ticker.

**Parameters:**
* `symbol` (required): Stock/instrument symbol
* `timeframe` (optional): Analysis timeframe (default: daily)
* `components` (optional): Specific components to analyze (default: all)

**Output:**
* Complete technical assessment
* Key level identification
* Moving average relationships
* Pattern recognition
* Volume analysis
* Relevant analyst commentary
* Setup opportunities

**Planned for:** v0.6.0

**Example:**
```
/check-ticker AAPL timeframe=daily
```

### MANAGE Phase Commands

#### `/update-position [symbol]` ✅ CORE

**Purpose:** Update details for an existing position.

**Parameters:**
* `symbol` (required): Ticker symbol
* `current_price` (optional): Current market price
* `stop_price` (optional): Updated stop price
* `target_price` (optional): Updated target price
* `notes` (optional): Additional trade notes

**Output:**
* Confirmation of updates
* Updated position metrics (P/L, risk/reward)

**File Location:**
* `prompts/manage/update-position.md`

**Example:**
```
/update-position AAPL current_price=184.75 stop_price=182.50 notes="Moving stop to breakeven after 2:1 R:R reached"
```

#### `/close-position [symbol]` ✅ CORE

**Purpose:** Close a position and record the outcome.

**Parameters:**
* `symbol` (required): Ticker symbol
* `exit_price` (required): Exit price
* `exit_type` (optional): Exit reason (target, stop, discretionary)
* `notes` (optional): Trade conclusion notes

**Output:**
* Position closure confirmation
* Performance summary (P/L, R multiple)
* Trade duration statistics

**File Location:**
* `prompts/manage/close-position.md`

**Example:**
```
/close-position AAPL exit_price=187.25 exit_type=target notes="Target achieved, clean execution"
```

#### `/adjust-stop [symbol]` 📅 FUTURE

**Purpose:** Apply systematic stop adjustment based on price action and setup character.

**Parameters:**
* `symbol` (required): Ticker symbol
* `method` (required): Adjustment method (breakeven, trailing, character-based)
* `current_price` (required): Current market price

**Output:**
* Updated stop recommendation
* Protection ratio and risk exposure
* Visualization of stop placement relative to key levels

**Planned for:** v0.5.2

**Example:**
```
/adjust-stop AAPL method=breakeven current_price=184.75
```

#### `/trim-position [symbol]` 📅 FUTURE

**Purpose:** Implement systematic profit taking using the 75/15/10 rule.

**Parameters:**
* `symbol` (required): Ticker symbol
* `current_price` (required): Current market price
* `target_reached` (optional): Which target has been reached (1, 2, 3)

**Output:**
* Trimming recommendations with size and price
* Updated position management plan
* Revised stop placement for remainder

**Planned for:** v0.5.2

**Example:**
```
/trim-position AAPL current_price=187.25 target_reached=1
```

#### `/manage-runner [symbol]` 📅 FUTURE

**Purpose:** Apply runner management protocol for remaining position.

**Parameters:**
* `symbol` (required): Ticker symbol
* `current_price` (required): Current market price
* `market_condition` (optional): Current market environment

**Output:**
* Trail stop recommendations
* Exit zone identification
* Position management strategy

**Planned for:** v0.5.2

**Example:**
```
/manage-runner AAPL current_price=189.50 market_condition="trending"
```

#### `/check-acceptance [level] [symbol]` 📅 FUTURE

**Purpose:** Verify if a price level shows acceptance based on Mancini's framework.

**Parameters:**
* `level` (required): Price level to check
* `symbol` (required): Stock/instrument symbol
* `type` (optional): Acceptance type to verify (default: all)

**Output:**
* Acceptance status (yes/no)
* Acceptance type classification
* Supporting evidence
* Historical significance of level
* Failed Breakdown potential
* Time-based context
* Trading implications

**Planned for:** v0.6.0

**Example:**
```
/check-acceptance 5900 ES
```

---

### REVIEW Phase Commands

#### `/log-session [date]`

**Purpose:** Record complete trading session details and performance.

**Parameters:**
* `date` (optional): Session date (default: today)
* `market_conditions` (optional): Brief description of market conditions
* `psychological_state` (optional): Self-assessment of trading psychology
* `market_regime` (optional): Market regime classification
* `market_mode` (optional): Mode 1 (trend) or Mode 2 (range/trap)
* `cognitive_load` (optional): Average cognitive load during session (1-10)
* `decision_quality` (optional): Overall decision quality assessment
* `key_learnings` (optional): Key session learnings
* `improvement_actions` (optional): Specific improvement actions

**Output:**
* Comprehensive session log with:
  * Trade details and performance metrics
  * Market context and conditions
  * Plan adherence assessment
  * Pattern identification
  * Psychological state evaluation
  * Comparison with moderator trades
  * Time-of-day performance patterns

**Implementation:**
* Basic session logging
* Simple performance metrics
* Trade recording

**File Location:**
* `prompts/execute/log-session.md`

**Example:**
```
/log-session market_conditions="Choppy, low volume" psychological_state="Focused, patient"
```

---

### SYSTEM Commands

#### `/help [command]`

**Purpose:** Display available commands and basic usage.

**Parameters:**
* `command` (optional): Specific command to get detailed help for

**Output:**
* List of available commands by phase
* Basic usage instructions

**File Location:**
* `system/commands.md`

**Example:**
```
/help add-position
```

#### `/status`

**Purpose:** Show current trading session state and system status.

**Parameters:**
* None

**Output:**
* Current session phase
* Active positions summary
* Trading plan status
* System load indicators

**File Location:**
* `system/runtime/entrypoint.md`

**Example:**
```
/status
```

---

## Command Flow Examples

### Morning Preparation Flow
```
/analyze-dp [morning call transcript]
/create-plan
/extract-focus dp high
/extract-levels dp SPX,NDX
```

### Trade Entry Flow
```
/size-position AAPL entry=182.50 stop=180.25 risk_amount=500
/add-position AAPL entry_price=182.50 stop_price=180.25 target_price=187.50
```

### Position Management Flow
```
/list-positions
/update-position AAPL current_price=184.75 stop_price=182.50
/close-position AAPL exit_price=187.25 exit_type=target
```

### End-of-Day Flow
```
/log-session market_conditions="Trending, high volume" psychological_state="Focused"
```

### Mancini Newsletter Analysis Flow
```
# First run the pre-processor prompt:
/analyze-mancini-preprocessor [PDF]

# Then use the JSON output with:
/analyze-mancini preprocessedData='[JSON output from preprocessor]'
```

## Changelog
