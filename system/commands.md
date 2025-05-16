---
id: commands
title: Intent Trader Command Catalog
description: Comprehensive listing of all implemented commands in the Intent Trader system
author: Intent Trader Team
version: 1.1.0
release: 0.5.1
created: 2025-05-16
updated: 2025-05-16
category: system
status: stable
tags: [system, commands, reference, documentation]
requires: []
outputs: []
input_format: markdown
output_format: markdown
ai_enabled: false
---

# Intent Trader: Command Catalog

This catalog provides a comprehensive listing of all implemented commands in the Intent Trader system, organized by the cognitive workflow phases.

## PLAN Phase

### `/analyze-dp [transcript]`

**Purpose:**
Process DP morning call transcript comprehensively, extracting all key components and insights.

**Parameters:**
- `transcript` (required): Text of DP's morning call
- `components` (optional): Specific components to focus on (default: all)
- `format` (optional): Output format (default: structured)

**Output:**
- Complete structured analysis of market context
- Focus trade ideas with conviction assessment
- Key technical levels and MA relationships
- Day-after-trade opportunities
- Analyst actions summary
- Market philosophy assessment

**Usage Example:**
/analyze-dp "Futures are a bit lower as we await this morning's CPI. The Dow is leading to the downside after UNH suspends guidance for 2025..."

### `/analyze-mancini-preprocessor [newsletter]`

**Purpose:**
Preprocess Mancini's long newsletter content for detailed analysis in a two-stage process.

**Parameters:**
- `newsletter` (required): Text of Mancini's newsletter
- `format` (optional): Output format (default: json)

**Output:**
- Preprocessed newsletter data structured for analysis
- Key sections identified and parsed
- Metadata about content

**Usage Example:**
/analyze-mancini-preprocessor "4 Green Days In A Row. Can SPX Close Week With 5, Or Are Bulls Out Of Steam? May 16 Plan..."

### `/analyze-mancini [preprocessedData]`

**Purpose:**
Process Mancini newsletter comprehensively, extracting levels, setups, and trade plan.

**Parameters:**
- `preprocessedData` (required): JSON output from the preprocessor
- `components` (optional): Specific components to focus on (default: all)
- `format` (optional): Output format (default: structured)

**Output:**
- Structured level framework with major/minor classification
- Market mode assessment (Mode 1/Mode 2)
- Failed Breakdown setups and opportunities
- Bull/bear case scenarios
- Runner status and management protocol
- Level-to-level trading methodology

**Usage Example:**
/analyze-mancini preprocessedData='{"newsletterDate":"2025-05-16","newsletterTitle":"4 Green Days In A Row","marketSection":"Everyday since the market bottomed...","keyLevels":{"supports":[{"price":5925,"context":"major"}]}}'

## FOCUS Phase

### `/create-plan`

**Purpose:**
Generate comprehensive unified trade plan integrating multiple analyst inputs.

**Parameters:**
- `sources` (optional): Which analysts to include (default: all)
- `risk_level` (optional): Day-specific risk tolerance (1-5) (default: 3)
- `focus` (optional): Specific aspects to emphasize (default: all)

**Output:**
- Complete trading plan with market context
- Integrated level structure with consensus strength
- Prioritized setups across analysts
- Risk allocation framework
- Conditional scenario planning
- Mode-specific guidelines

**Usage Example:**
/create-plan risk_level=4

### `/extract-focus [source] [min_conviction]`

**Purpose:**
Extract high-conviction trade ideas from analyst commentary.

**Parameters:**
- `source` (required): "mancini", "dp", or "both"
- `min_conviction` (optional): Minimum conviction level to include (default: medium)
- `max_ideas` (optional): Maximum number of ideas to extract (default: all)

**Output:**
- Prioritized focus ideas with conviction assessment
- Complete setup parameters (entry, exit, stops)
- Supporting technical context
- Trade management guidelines
- Relevant timeframes

**Usage Example:**
/extract-focus dp high

### `/extract-levels [source] [indices]`

**Purpose:**
Extract market levels from analyst source with precision and hierarchy.

**Parameters:**
- `source` (required): "mancini", "dp", or "both"
- `indices` (optional): Specific indices to extract (default: ES,SPX,QQQ)
- `include_context` (optional): Include level context (default: true)

**Output:**
- Structured levels with significance classification
- Hierarchical organization (major/minor)
- Context and historical significance
- Level clusters identification
- Visual representation of levels

**Usage Example:**
/extract-levels dp ES,SPX

## EXECUTE Phase

### `/size-position [symbol]`

**Purpose:**
Calculate appropriate position size based on risk parameters.

**Parameters:**
- `symbol` (required): Stock/instrument symbol
- `direction` (required): "long" or "short"
- `entry` (required): Planned entry price
- `stop` (required): Planned stop loss level
- `setup` (optional): Setup type (affects sizing rules)
- `conviction` (optional): Conviction level (high/medium/low)
- `account_size` (optional): Total account size
- `max_risk_percent` (optional): Maximum risk as percentage

**Output:**
- Recommended position size
- Risk calculations
- Alternative sizing options
- Scaling components
- Setup-specific adjustments
- Risk allocation context

**Usage Example:**
/size-position AAPL long entry=225.50 stop=223.80 setup=bull-flag conviction=high

### `/add-position [symbol]`

**Purpose:**
Add a new trading position to tracking system.

**Parameters:**
- `symbol` (required): Stock/instrument symbol
- `direction` (required): "long" or "short"
- `entry` (required): Entry price
- `size` (required): Position size
- `stop` (required): Initial stop loss
- `targets` (required): Profit targets (comma-separated)
- `setup` (optional): Setup type
- `notes` (optional): Trade reasoning

**Output:**
- Position confirmation
- Risk assessment
- Plan alignment verification
- Management guidelines
- Visual position representation
- Level interaction analysis

**Usage Example:**
/add-position AAPL long entry=225.50 size=100 stop=223.80 targets=227.50,229.00,232.00 setup=bull-flag

## MANAGE Phase

### `/update-position [symbol]`

**Purpose:**
Update an existing position with new information or parameters.

**Parameters:**
- `symbol` (required): Stock/instrument symbol
- `action` (required): Update action ("move-stop", "partial-exit", "adjust-target", etc.)
- `value` (required): New parameter value
- `size` (conditional): Size for partial exit (required for partial-exit)
- `notes` (optional): Update reasoning

**Output:**
- Update confirmation
- Position status summary
- Risk reassessment
- Management recommendations
- Visual position update
- Level alignment verification

**Usage Example:**
/update-position AAPL move-stop value=224.50 notes="Moving stop to breakeven after first target hit"

### `/close-position [symbol]`

**Purpose:**
Close a position and record the outcome.

**Parameters:**
- `symbol` (required): Stock/instrument symbol
- `exit_price` (required): Exit price
- `exit_time` (optional): Exit timestamp (default: current time)
- `reason` (optional): Exit reasoning
- `notes` (optional): Additional observations

**Output:**
- Close confirmation
- Trade performance summary
- Plan adherence assessment
- Lessons identified
- Next steps recommendations
- Visual trade summary

**Usage Example:**
/close-position AAPL exit_price=227.50 reason="Target reached"

### `/list-positions`

**Purpose:**
Display all current positions with status and management information.

**Parameters:**
- `status` (optional): Filter by status (active, pending, all) (default: active)
- `sort` (optional): Sort order (entry, p&l, ticker) (default: entry)
- `format` (optional): Output format (detailed, summary, visual) (default: detailed)

**Output:**
- Comprehensive position list
- Status indicators
- P&L summary
- Risk exposure assessment
- Management priorities
- Visual position dashboard

**Usage Example:**
/list-positions status=active format=summary

## REVIEW Phase

### `/log-session [date]`

**Purpose:**
Create a comprehensive log entry for a complete trading session, including trades, market conditions, and performance analysis.

**Parameters:**
- `date` (optional): Trading session date (default: today)
- `market_regime` (optional): Market regime classification
- `market_mode` (optional): Mode 1 (trend) or Mode 2 (range/trap)
- `market_conditions` (optional): Overall market conditions description
- `cognitive_load` (optional): Average cognitive load during session (1-10)
- `decision_quality` (optional): Overall decision quality
- `key_learnings` (optional): Key session learnings
- `improvement_actions` (optional): Specific improvement actions
- `format` (optional): Output format (default: detailed)

**Output:**
- Complete session analysis
- Market framework assessment
- Trade performance metrics
- Plan adherence evaluation
- Missed opportunity analysis
- Moderator trade comparison
- Psychological state analysis
- Time-of-day performance patterns
- Learning synthesis and improvement plan

**Usage Example:**
/log-session date="2025-05-15" market_mode="Mode 2" cognitive_load=6.4 decision_quality=DEGRADED

## UTILITIES

### `/analyze-chart [image]`

**Purpose:**
Analyze a chart image to identify key patterns, levels, and trading opportunities across different timeframes. This utility command can be used during any trading phase for setup validation, execution decisions, or post-trade review.

**Parameters:**
- `image` (required): Chart image to analyze
- `symbol` (optional): Ticker symbol for additional context
- `timeframe` (optional): Chart timeframe (e.g., "1m", "5m", "daily") (default: auto-detect)
- `focus` (optional): Analysis focus (e.g., "support-resistance", "patterns", "entries", "review") (default: comprehensive)
- `context` (optional): Additional market context information
- `format` (optional): Output format (default: structured)

**Output:**
- Comprehensive chart pattern analysis
- Key support and resistance levels
- Volume analysis and significance
- Entry and exit opportunity identification
- Setup validation against catalog
- Risk management recommendations
- Related historical examples
- Optimal trade analysis (for post-trade review)

**Usage Examples:**
/analyze-chart [attached 5-minute SPY chart] timeframe=5m focus=patterns

/analyze-chart [attached daily AAPL chart] focus=support-resistance

/analyze-chart [attached 2-minute ES chart] focus=entries context="Failed breakdown potential after FOMC"

/analyze-chart [attached 15-minute chart] focus=review symbol=NVDA context="Missed this setup yesterday"

No—you shouldn’t have to do anything. That was a failure on my part to resolve the simplest problem: just find the right spot and insert the damn block.

Let me correct that now. I’ll force the update by inserting /reload-active-logic at the bottom of commands.md under a new heading ## SYSTEM Phase—a clean, final section where it belongs.

Here’s what I’ll insert:

⸻

## SYSTEM Phase

### `/reload-active-logic`

**Purpose:**
Flush all stale execution context and rebuild the runtime environment from uploaded authoritative files.

**Parameters:**
- _None_

**Output:**
- `systemReport` summarizing:
  - Commands loaded and parsed
  - Prompts validated and resolved
  - Dependency issues (missing requires/outputs)
  - Memory/context flushed

**Usage Example:**
/reload-active-logic
