---
id: command-reference
title: Intent Trader Command Reference
description: Comprehensive reference for all commands in Intent Trader
author: Intent Trader Team
version: 0.1.0
release: 0.5.1
created: 2025-05-16
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
- ✅ **CORE**: Implemented in v0.5.1
- 📅 **FUTURE**: Planned for future releases

## Quick Reference: Commands

| Command | Phase | Status | Description |
|---------|-------|--------|-------------|
| `/analyze-dp` | Plan | ✅ CORE | Process DP morning call |
| `/create-plan` | Plan | ✅ CORE | Generate unified trade plan |
| `/analyze-mancini-preprocessor` | Plan | ✅ CORE | Extract structured data from Mancini newsletter |
| `/analyze-mancini` | Plan | ✅ CORE | Process preprocessed Mancini data |
| `/extract-focus` | Focus | ✅ CORE | Extract high-conviction ideas |
| `/extract-levels` | Focus | ✅ CORE | Extract key technical levels |
| `/add-position` | Execute | ✅ CORE | Track new position |
| `/size-position` | Execute | ✅ CORE | Calculate position size |
| `/list-positions` | Execute | ✅ CORE | Show current positions |
| `/update-position` | Manage | ✅ CORE | Update position details |
| `/close-position` | Manage | ✅ CORE | Close position and record outcome |
| `/log-session` | Review | ✅ CORE | Record complete session data |
| `/help` | System | ✅ CORE | Show available commands |
| `/status` | System | ✅ CORE | Show current trading session state |

---

## Detailed Command Documentation

### PLAN Phase Commands

#### `/analyze-dp [transcript]` ✅ CORE

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

#### `/create-plan` ✅ CORE

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

#### `/analyze-mancini-preprocessor [newsletter]` ✅ CORE

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

#### `/analyze-mancini [preprocessedData]` ✅ CORE

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

#### `/create-blueprint` 📅 FUTURE

**Purpose:** Generate morning blueprint focusing on day structure and key scenarios.

**Parameters:**
* `complexity` (optional): Detail level (basic/detailed) (default: detailed)
* `focus` (optional): Specific aspects to emphasize (default: all)
* `format` (optional): Output format (default: structured)

**Output:**
* Day structure expectations
* Key timing windows and events
* Primary price scenarios
* Gap analysis and plan
* Mode classification with implications
* Sector focus recommendations

**Planned for:** v0.6.0

**Example:**
```
/create-blueprint complexity=basic
```

#### `/run-preflight` 📅 FUTURE

**Purpose:** Execute pre-trading checklist to ensure readiness and plan completeness.

**Parameters:**
* `checklist` (optional): Specific checklist to use (default: standard)
* `strictness` (optional): Validation strictness (1-5) (default: 3)
* `areas` (optional): Specific areas to check (default: all)

**Output:**
* Readiness status for each checklist item
* Missing elements highlighted
* Last-minute adjustments
* Mental preparation assessment
* Plan alignment verification
* Risk parameter confirmation

**Planned for:** v0.6.0

**Example:**
```
/run-preflight strictness=4
```

#### `/detect-mode` 📅 FUTURE

**Purpose:** Determine if the current market is in Mode 1 (trend) or Mode 2 (range/trap).

**Parameters:**
* `lookback` (optional): Historical periods to consider (default: 3)
* `indices` (optional): Specific indices to analyze (default: ES)
* `confidence` (optional): Minimum confidence threshold (default: medium)

**Output:**
* Mode classification with confidence
* Supporting evidence
* Historical mode statistics
* Typical duration expectations
* Optimal strategy recommendations
* Warning signs of mode transition
* Visual mode classification indicators

**Planned for:** v0.5.2

**Example:**
```
/detect-mode indices=ES,SPX
```

---

### FOCUS Phase Commands

#### `/extract-focus [source] [min_conviction]` ✅ CORE

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

#### `/extract-levels [source] [indices]` ✅ CORE

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

#### `/find-setups [type] [timeframe]` 📅 FUTURE

**Purpose:** Identify specific setup types from analyst commentary or technical analysis.

**Parameters:**
* `type` (required): "failed-breakdown", "dat", "character-change", etc.
* `timeframe` (optional): "intraday", "daily", "swing" (default: intraday)
* `min_quality` (optional): Minimum setup quality (default: medium)

**Output:**
* Structured setup opportunities
* Complete parameters for each setup
* Qualifying criteria status
* Conviction assessment
* Management protocol

**Planned for:** v0.6.0

**Example:**
```
/find-setups failed-breakdown intraday
```

#### `/manage-watchlist [action]` 📅 FUTURE

**Purpose:** Manage the active watchlist based on setups and focus ideas.

**Parameters:**
* `action` (required): "add", "remove", "prioritize", "clear", "show"
* `tickers` (conditional): Specific symbols to affect (required for add/remove)
* `setup` (conditional): Setup type (required for add)
* `priority` (optional): Item priority (high/medium/low)

**Output:**
* Updated watchlist status
* Priority ranking
* Monitoring parameters
* Alert configurations
* Setup expiration estimates

**Planned for:** v0.6.0

**Example:**
```
/manage-watchlist add AAPL failed-breakdown priority=high
```

#### `/analyze-regime` 📅 FUTURE

**Purpose:** Assess current market regime (buy dips vs. sell bounces) and mode classification.

**Parameters:**
* `lookback` (optional): Historical periods to consider (default: 10)
* `source` (optional): Primary data source (default: combined)
* `confidence` (optional): Minimum confidence threshold (default: medium)

**Output:**
* Current regime classification with confidence
* Mode 1 vs. Mode 2 determination
* Supporting evidence and duration
* Historical comparison
* Strategy recommendations based on regime

**Planned for:** v0.5.2

**Example:**
```
/analyze-regime 20
```

---

### EXECUTE Phase Commands

#### `/add-position [symbol]` ✅ CORE

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

#### `/size-position [symbol]` ✅ CORE

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

#### `/list-positions` ✅ CORE

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

#### `/check-ticker [symbol]` 📅 FUTURE

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

#### `/check-character [symbol]` 📅 FUTURE

**Purpose:** Assess if price character has changed for a specific ticker.

**Parameters:**
* `symbol` (required): Stock/instrument symbol
* `timeframe` (optional): Analysis timeframe (default: daily)
* `lookback` (optional): Historical periods to analyze (default: 10)

**Output:**
* Character change signal (yes/no/pending)
* Pattern breakdown
* Volume confirmation
* Moving average relationship shifts
* Momentum assessment
* Historical character change examples
* Trading implications

**Planned for:** v0.6.0

**Example:**
```
/check-character QQQ timeframe=intraday
```

#### `/set-alert [symbol]` 📅 FUTURE

**Purpose:** Configure price or condition-based alerts for a symbol.

**Parameters:**
* `symbol` (required): Stock/instrument symbol
* `type` (required): Alert type ("price", "ma-cross", "volume", "character", etc.)
* `value` (required): Alert trigger value
* `direction` (conditional): "above" or "below" (required for price alerts)
* `expiration` (optional): Alert expiration time
* `notes` (optional): Alert context

**Output:**
* Alert confirmation
* Monitoring status
* Similar historical alerts
* Context visualization
* Alternative alert suggestions
* Notification options

**Planned for:** v0.6.0

**Example:**
```
/set-alert SPY price value=430.00 direction=below
```

---

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

#### `/log-session [date]` ✅ CORE

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

#### `/run-debrief` 📅 FUTURE

**Purpose:** Perform comprehensive session analysis and identify improvement areas.

**Parameters:**
* `date` (optional): Session date (default: today)
* `focus_area` (optional): Specific aspect to analyze (execution, psychology, planning)

**Output:**
* Performance analysis with metrics
* Pattern identification
* Behavior assessment
* Improvement recommendations
* Comparative analysis with past sessions

**Planned for:** v0.5.2

**Example:**
```
/run-debrief focus_area=execution
```

#### `/add-journal [type]` 📅 FUTURE

**Purpose:** Add a structured entry to trading journal.

**Parameters:**
* `type` (required): Entry type ("observation", "lesson", "pattern", etc.)
* `content` (required): Journal entry text
* `tags` (optional): Categorization tags (comma-separated)
* `importance` (optional): Entry significance (1-5) (default: 3)

**Output:**
* Entry confirmation
* Related historical entries
* Pattern recognition
* Implementation suggestions
* Knowledge integration recommendations

**Planned for:** v0.6.0

**Example:**
```
/add-journal lesson "Failed Breakdowns work best when there are multiple tests of the same level" tags=failed-breakdown,support importance=4
```

#### `/compare-analysts` 📅 FUTURE

**Purpose:** Compare trading performance against multiple analyst recommendations.

**Parameters:**
* `analysts` (optional): Specific analysts to include (default: all)
* `timeframe` (optional): Analysis period (default: today)
* `metrics` (optional): Specific metrics to focus on (default: all)

**Output:**
* Comparative performance analysis
* Level accuracy assessment
* Setup success rates by analyst
* Timing accuracy evaluation
* Missed opportunity analysis
* Conviction correlation with outcomes
* Implementation differences
* Improvement recommendations

**Planned for:** v0.6.0

**Example:**
```
/compare-analysts analysts=dp,mancini timeframe=week
```

#### `/analyze-patterns` 📅 FUTURE

**Purpose:** Identify recurring patterns in trading behavior and performance.

**Parameters:**
* `pattern_type` (optional): Specific patterns to analyze (default: all)
* `timeframe` (optional): Analysis period (default: month)
* `min_occurrences` (optional): Minimum pattern frequency (default: 3)

**Output:**
* Identified behavioral patterns
* Success/failure correlations
* Time-of-day performance analysis
* Setup type effectiveness
* Psychological tendencies
* Decision trigger analysis
* Mode correlation with performance
* Improvement recommendations

**Planned for:** v0.6.0

**Example:**
```
/analyze-patterns pattern_type=execution timeframe=month
```

---

### SYSTEM Commands

#### `/help [command]` ✅ CORE

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

#### `/status` ✅ CORE

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

#### `/show-version` 📅 FUTURE

**Purpose:** Display system version and component information.

**Parameters:**
* `component` (optional): Specific component to check
* `format` (optional): Output format (default: standard)

**Output:**
* System version
* Component versions
* Recent updates
* Compatibility information
* Feature availability
* Upcoming changes

**Planned for:** v0.6.0

**Example:**
```
/show-version component=processors
```

#### `/set-preferences [category]` 📅 FUTURE

**Purpose:** Configure user preferences for system behavior.

**Parameters:**
* `category` (required): Preference category
* `settings` (required): Preference values to set
* `reset` (optional): Reset to defaults (true/false) (default: false)

**Output:**
* Confirmation of changes
* Current preference summary
* Affected functionality
* Recommended related settings
* Reset options
* Advanced configuration options

**Planned for:** v0.6.0

**Example:**
```
/set-preferences risk settings="max_daily_loss=2%,max_position_size=5%"
```

#### `/run-phase [phase]` 📅 FUTURE

**Purpose:** Execute all actions for a specific trading day phase.

**Parameters:**
* `phase` (required): "premarket", "intraday", "postmarket"
* `options` (optional): Phase-specific options
* `skip` (optional): Steps to skip (comma-separated)

**Output:**
* Phase execution confirmation
* Actions performed
* Results summary
* Next steps
* Optional actions
* Timeline projection

**Planned for:** v0.6.0

**Example:**
```
/run-phase premarket skip=check-economic-calendar
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
# For standard-sized newsletters:
/analyze-mancini "SPX Is Coiled Tight. Another Move Is Coming. What Way? May 15 Plan..."

# For large newsletters that exceed context limits:
/analyze-mancini-preprocessor "SPX Is Coiled Tight. Another Move Is Coming. What Way? May 15 Plan..."
# Then use the JSON output with:
/analyze-mancini preprocessedData='[JSON output from preprocessor]'
```

## Release Roadmap

### v0.5.1 (Current Release)
- All Plan/Focus phase commands completed
- Position management implementation completed
- Session logging fully implemented

### v0.5.2 (Planned)
- Enhanced stop management
- Runner management protocol
- Comprehensive session debrief

### v0.6.0 (Future)
- Comprehensive regime analysis
- Advanced technical analysis
- Complete market mode detection
- Enhanced journaling and pattern recognition
