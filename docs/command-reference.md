---
id: command-reference
title: Intent Trader Command Reference
description: Comprehensive reference for all commands in Intent Trader
author: Intent Trader Team
version: 0.2.0
release: 0.5.1
created: 2025-05-15
updated: 2025-05-19
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

This document provides a comprehensive reference for all commands available in Intent Trader, organized by cognitive workflow phase.

## Command Structure

Intent Trader commands follow a consistent structure:

/[action]-[object] [parameter1] [parameter2] ...

All commands are phase-aligned to the cognitive workflow:
- **Plan Phase**: Morning analysis and preparation
- **Focus Phase**: Opportunity identification and prioritization
- **Execute Phase**: Trade entry and position creation
- **Manage Phase**: Active position management
- **Review Phase**: Performance analysis and reflection
- **Utilities**: Cross-phase utility commands

## Implementation Status

Commands are marked with their implementation status:
- **CORE**: Implemented in v0.5.1

## Quick Reference: Commands

| Command | Phase | Status | Description |
|---------|-------|--------|-------------|
| `/analyze-dp` | Plan | CORE | Process DP morning call transcript comprehensively |
| `/summarize-mancini` | Plan | CORE | Extract structured data from Mancini's newsletter |
| `/analyze-mancini` | Plan | CORE | Process Mancini newsletter summary for trading strategies |
| `/create-plan` | Focus | CORE | Generate comprehensive unified trade plan |
| `/extract-focus` | Focus | CORE | Extract high-conviction trade ideas |
| `/extract-levels` | Focus | CORE | Extract market levels with precision and hierarchy |
| `/size-position` | Execute | CORE | Calculate appropriate position size |
| `/add-position` | Execute | CORE | Add a new trading position to tracking system |
| `/update-position` | Manage | CORE | Update an existing position |
| `/close-position` | Manage | CORE | Close a position and record the outcome |
| `/list-positions` | Manage | CORE | Display all current positions |
| `/log-session` | Review | CORE | Create a comprehensive log entry |
| `/analyze-chart` | Utilities | CORE | Analyze a chart image to identify patterns and levels |
| `/reload-active-logic` | System | CORE | Flush all stale memory and rebuild runtime environment |
|---------|-------|--------|-------------|

---

## Detailed Command Documentation

### PLAN Phase Commands

#### `/clean-dp-transcript [transcript]`

**Purpose:** Clean and correct transcription errors in DP morning call text while preserving original content and structure.

**Parameters:**
* `transcript` (required): Raw morning call transcript text
* `includeAnnotations` (optional): Include correction notes (default: false)
* `standardizeFormatting` (optional): Apply paragraph formatting (default: true)

**Output:**
* Cleaned transcript with corrected tickers and terminology
* Optional annotation notes if requested

**File Location:**
* `prompts/plan/clean-dp-transcript.md`

**Example:**
/clean-dp-transcript "Futures are a bit lower as we await this morning's CPI. The Dow is leading to the downside after you anench suspends guidance for 2025."

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
/analyze-dp "Futures are a bit lower as we await this morning's CPI. The Dow is leading to the downside after UNH suspends guidance for 2025..."

#### `/summarize-mancini [newsletter]`

**Purpose:** Extract structured data from Mancini's ES Futures newsletter for further analysis.

**Parameters:**
* `newsletter` (required): Text of Mancini's newsletter
* `format` (optional): Output format (default: json)

**Output:**
* Structured JSON summary of newsletter content
* Key levels, market assessment, failed breakdowns, scenarios, etc.
* Raw sections for reference

**Implementation:**
* Newsletter parsing and content extraction
* Key section identification
* Level and setup identification
* Market assessment and bias determination

**File Location:**
* `prompts/plan/summarize-mancini.md`

**Example:**
/summarize-mancini "4 Green Days In A Row. Can SPX Close Week With 5, Or Are Bulls Out Of Steam? May 16 Plan..."

#### `/analyze-mancini [summary]`

**Purpose:** Process Mancini newsletter summary to extract actionable trading strategies.

**Parameters:**
* `summary` (required): JSON output from the `/summarize-mancini` command
* `components` (optional): Specific components to focus on (default: all)
* `format` (optional): Output format (default: structured)

**Output:**
* Market mode assessment (Mode 1/Mode 2)
* Structured level framework with significance classification
* Failed Breakdown setups and opportunities
* Bull/bear case scenarios with probability assessment
* Runner management recommendations
* Level-to-level trading methodology

**Implementation:**
* Advanced analysis of summarized data
* Mode classification (Mode 1 vs Mode 2)
* Integration with level extraction system
* Failed Breakdown pattern recognition
* Market bias determination

**File Location:**
* `prompts/plan/analyze-mancini.md`

**Example:**
/analyze-mancini summary='{"date":"2025-05-19","title":"ES Futures Companion","market_assessment":{"mode":"Mode 2","bias":"bullish"},"levels":{"supports":[{"price":5925,"context":"major"}]}}'

### FOCUS Phase Commands

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
/create-plan risk_level=4

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
/extract-focus dp high

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
/extract-levels dp ES,SPX

---

### EXECUTE Phase Commands

#### `/size-position [symbol]`

**Purpose:** Calculate appropriate position size based on risk parameters.

**Parameters:**
* `symbol` (required): Stock/instrument symbol
* `direction` (required): "long" or "short"
* `entry` (required): Planned entry price
* `stop` (required): Planned stop loss level
* `setup` (optional): Setup type (affects sizing rules)
* `conviction` (optional): Conviction level (high/medium/low)
* `account_size` (optional): Total account size
* `max_risk_percent` (optional): Maximum risk as percentage

**Output:**
* Recommended position size
* Risk calculations
* Alternative sizing options
* Scaling components
* Setup-specific adjustments
* Risk allocation context

**Implementation:**
* Basic position sizing
* Risk calculation from price difference
* Simple scaling rules

**File Location:**
* `prompts/execute/size-position.md`

**Example:**
/size-position AAPL long entry=225.50 stop=223.80 setup=bull-flag conviction=high

#### `/add-position [symbol]`

**Purpose:** Add a new trading position to tracking system.

**Parameters:**
* `symbol` (required): Stock/instrument symbol
* `direction` (required): "long" or "short"
* `entry` (required): Entry price
* `size` (required): Position size
* `stop` (required): Initial stop loss
* `targets` (required): Profit targets (comma-separated)
* `setup` (optional): Setup type
* `notes` (optional): Trade reasoning

**Output:**
* Position confirmation
* Risk assessment
* Plan alignment verification
* Management guidelines
* Visual position representation
* Level interaction analysis

**Implementation:**
* Basic position tracking
* State file updates
* Simple risk assessment

**File Location:**
* `prompts/execute/add-position.md`

**Example:**
/add-position AAPL long entry=225.50 size=100 stop=223.80 targets=227.50,229.00,232.00 setup=bull-flag

### MANAGE Phase Commands

#### `/update-position [symbol]`

**Purpose:** Update an existing position with new information or parameters.

**Parameters:**
* `symbol` (required): Stock/instrument symbol
* `action` (required): Update action ("move-stop", "partial-exit", "adjust-target", etc.)
* `value` (required): New parameter value
* `size` (conditional): Size for partial exit (required for partial-exit)
* `notes` (optional): Update reasoning

**Output:**
* Update confirmation
* Position status summary
* Risk reassessment
* Management recommendations
* Visual position update
* Level alignment verification

**Implementation:**
* Basic position updates
* Simple state tracking
* Common update actions

**File Location:**
* `prompts/manage/update-position.md`

**Example:**
/update-position AAPL move-stop value=224.50 notes="Moving stop to breakeven after first target hit"

#### `/close-position [symbol]`

**Purpose:** Close a position and record the outcome.

**Parameters:**
* `symbol` (required): Stock/instrument symbol
* `exit_price` (required): Exit price
* `exit_time` (optional): Exit timestamp (default: current time)
* `reason` (optional): Exit reasoning
* `notes` (optional): Additional observations

**Output:**
* Close confirmation
* Trade performance summary
* Plan adherence assessment
* Lessons identified
* Next steps recommendations
* Visual trade summary

**Implementation:**
* Basic position closure
* Simple performance calculation
* State file updates

**File Location:**
* `prompts/manage/close-position.md`

**Example:**
/close-position AAPL exit_price=227.50 reason="Target reached"

#### `/list-positions`

**Purpose:** Display all current positions with status and management information.

**Parameters:**
* `status` (optional): Filter by status (active, pending, all) (default: active)
* `sort` (optional): Sort order (entry, p&l, ticker) (default: entry)
* `format` (optional): Output format (detailed, summary, visual) (default: detailed)

**Output:**
* Comprehensive position list
* Status indicators
* P&L summary
* Risk exposure assessment
* Management priorities
* Visual position dashboard

**Implementation:**
* Basic position listing
* Simple status tracking
* Minimal formatting options

**File Location:**
* `prompts/manage/list-positions.md`

**Example:**
/list-positions status=active format=summary

---

### REVIEW Phase Commands

#### `/log-session [date]`

**Purpose:** Create a comprehensive log entry for a complete trading session, including trades, market conditions, and performance analysis.

**Parameters:**
* `date` (optional): Trading session date (default: today)
* `market_regime` (optional): Market regime classification
* `market_mode` (optional): Mode 1 (trend) or Mode 2 (range/trap)
* `market_conditions` (optional): Overall market conditions description
* `cognitive_load` (optional): Average cognitive load during session (1-10)
* `decision_quality` (optional): Overall decision quality
* `key_learnings` (optional): Key session learnings
* `improvement_actions` (optional): Specific improvement actions
* `format` (optional): Output format (default: detailed)

**Output:**
* Complete session analysis
* Market framework assessment
* Trade performance metrics
* Plan adherence evaluation
* Missed opportunity analysis
* Moderator trade comparison
* Psychological state analysis
* Time-of-day performance patterns
* Learning synthesis and improvement plan

**Implementation:**
* Basic session logging
* Simple performance metrics
* Trade recording

**File Location:**
* `prompts/review/log-session.md`

**Example:**
/log-session date="2025-05-15" market_mode="Mode 2" cognitive_load=6.4 decision_quality=DEGRADED

### UTILITIES Commands

#### `/analyze-chart [image]`

**Purpose:** Analyze a chart image to identify key patterns, levels, and trading opportunities across different timeframes. This utility command can be used during any trading phase for setup validation, execution decisions, or post-trade review.

**Parameters:**
* `image` (required): Chart image to analyze
* `symbol` (optional): Ticker symbol for additional context
* `timeframe` (optional): Chart timeframe (e.g., "1m", "5m", "daily") (default: auto-detect)
* `focus` (optional): Analysis focus (e.g., "support-resistance", "patterns", "entries", "review") (default: comprehensive)
* `context` (optional): Additional market context information
* `format` (optional): Output format (default: structured)

**Output:**
* Comprehensive chart pattern analysis
* Key support and resistance levels
* Volume analysis and significance
* Entry and exit opportunity identification
* Setup validation against catalog
* Risk management recommendations
* Related historical examples
* Optimal trade analysis (for post-trade review)

**Implementation:**
* Image analysis capabilities
* Pattern recognition
* Level identification
* Context-aware analysis

**File Location:**
* `prompts/utilities/chart-analysis.md`

**Examples:**
/analyze-chart [attached 5-minute SPY chart] timeframe=5m focus=patterns

/analyze-chart [attached daily AAPL chart] focus=support-resistance

/analyze-chart [attached 2-minute ES chart] focus=entries context="Failed breakdown potential after FOMC"

/analyze-chart [attached 15-minute chart] focus=review symbol=NVDA context="Missed this setup yesterday"

---

### SYSTEM Commands

#### `/reload-active-logic`

**Purpose:** Flush all stale execution context and rebuild the runtime environment from uploaded authoritative files.

**Parameters:**
* None

**Output:**
* `systemReport` with state of command registry, parsed prompts, missing files, and rebuild status.

**Implementation:**
* Flushes in-memory context from previous ZIPs or chat history
* Re-parses `command-map.md` as canonical routing table
* Re-evaluates all declared `requires` fields and prompt metadata
* Disables inference or fallback behavior

**File Location:**
* `prompts/utilities/reload-active-logic.md`

**Example:**
/reload-active-logic

---

## Command Flow Examples

### Morning Preparation Flow
/analyze-dp [morning call transcript]
/summarize-mancini [newsletter]
/analyze-mancini [summary JSON]
/create-plan
/extract-focus dp high
/extract-levels dp SPX,NDX

### Trade Entry Flow
/size-position AAPL long entry=225.50 stop=223.80 setup=bull-flag conviction=high
/add-position AAPL long entry=225.50 size=100 stop=223.80 targets=227.50,229.00,232.00 setup=bull-flag

### Position Management Flow
/list-positions
/update-position AAPL move-stop value=224.50 notes="Moving stop to breakeven after first target hit"
/close-position AAPL exit_price=227.50 reason="Target reached"

### End-of-Day Flow
/log-session date="2025-05-15" market_mode="Mode 2" cognitive_load=6.4 decision_quality=DEGRADED

### Chart Analysis Flow
/analyze-chart [attached chart] timeframe=5m focus=patterns
/analyze-chart [attached chart] focus=entries context="Potential breakout after earnings"

## Changelog

- v0.5.1: Added `/analyze-chart` command for chart image analysis
- v0.5.1: Updated Mancini analysis workflow, replacing `/analyze-mancini-preprocessor` with `/summarize-mancini`
- v0.5.1: Initial implementation of core commands
