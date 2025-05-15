# Intent Trader: Command Catalog

This catalog provides a comprehensive listing of all commands in the Intent Trader system, organized by functional category with detailed specifications.

## 1. Analyst Input Commands

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
```
/analyze-dp "Futures are a bit lower as we await this morning's CPI. The Dow is leading to the downside after UNH suspends guidance for 2025..."
```

### `/analyze-mancini [newsletter]`

**Purpose:**
Process Mancini newsletter comprehensively, extracting levels, setups, and trade plan.

**Parameters:**
- `newsletter` (required): Text of Mancini's newsletter
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
```
/analyze-mancini "SPX Is Coiled Tight. Another Move Is Coming. What Way? May 15 Plan

ES/SPX continues to consolidate at highs. The coiled tight range over the last two days..."
```

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
```
/extract-levels mancini ES,SPX
```

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
```
/extract-focus dp high
```

### `/find-setups [type] [timeframe]`

**Purpose:**
Identify specific setup types from analyst commentary or technical analysis.

**Parameters:**

- `type` (required): "failed-breakdown", "dat", "character-change", etc.
- `timeframe` (optional): "intraday", "daily", "swing" (default: intraday)
- `min_quality` (optional): Minimum setup quality (default: medium)

**Output:**

- Structured setup opportunities
- Complete parameters for each setup
- Qualifying criteria status
- Conviction assessment
- Management protocol

**Usage Example:**

```
/find-setups failed-breakdown intraday
```

### `/analyze-ic [message]`

**Purpose:**
Process Inner Circle commentary for actionable signals and context.

**Parameters:**

- `message` (required): Inner Circle message text
- `focus` (optional): Specific aspect to analyze (default: all)
- `priority` (optional): Minimum priority level (default: all)

**Output:**

- Extracted trade signals
- Market context updates
- Analyst sentiment assessment
- Time-sensitive alerts
- Recommendation priority

**Usage Example:**
```
/analyze-ic "ES getting a bit extended here, watching for potential retest of 5900 support..."
```

### `/analyze-regime`

**Purpose:**
Assess current market regime (buy dips vs. sell bounces) and mode classification.

**Parameters:**

- `lookback` (optional): Historical periods to consider (default: 10)
- `source` (optional): Primary data source (default: combined)
- `confidence` (optional): Minimum confidence threshold (default: medium)

**Output:**

- Current regime classification with confidence
- Mode 1 vs. Mode 2 determination
- Supporting evidence and duration
- Historical comparison
- Strategy recommendations based on regime

**Usage Example:**

```
/analyze-regime 20
```

## 2. Trade Planning Commands

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

```
/create-plan risk_level=4
```

### `/create-blueprint`

**Purpose:**
Generate morning blueprint focusing on day structure and key scenarios.

**Parameters:**

- `complexity` (optional): Detail level (basic/detailed) (default: detailed)
- `focus` (optional): Specific aspects to emphasize (default: all)
- `format` (optional): Output format (default: structured)

**Output:**

- Day structure expectations
- Key timing windows and events
- Primary price scenarios
- Gap analysis and plan
- Mode classification with implications
- Sector focus recommendations

**Usage Example:**

```
/create-blueprint complexity=basic
```

### `/run-preflight`

**Purpose:**
Execute pre-trading checklist to ensure readiness and plan completeness.

**Parameters:**

- `checklist` (optional): Specific checklist to use (default: standard)
- `strictness` (optional): Validation strictness (1-5) (default: 3)
- `areas` (optional): Specific areas to check (default: all)

**Output:**

- Readiness status for each checklist item
- Missing elements highlighted
- Last-minute adjustments
- Mental preparation assessment
- Plan alignment verification
- Risk parameter confirmation

**Usage Example:**
```
/run-preflight strictness=4
```

### `/update-plan [section]`

**Purpose:**
Update specific sections of the trade plan based on new information.

**Parameters:**

- `section` (required): Plan section to update
- `content` (required): New information to incorporate
- `reason` (optional): Justification for the update
- `priority` (optional): Update urgency (default: normal)

**Output:**

- Confirmation of update
- Before/after comparison
- Impact assessment on other plan elements
- Suggested additional updates
- Plan consistency verification

**Usage Example:**
```
/update-plan market_context "ES now showing strength after CPI came in below expectations"
```

### `/show-plan [section]`

**Purpose:**
Display the unified trade plan or specific sections in a structured, readable format.

**Parameters:**

- `section` (optional): Specific plan section to display (default: all)
- `format` (optional): Output format (detailed/summary/visual) (default: detailed)
- `focus` (optional): Specific elements to highlight (default: none)

**Output:**

- Formatted plan content
- Visual elements for levels and scenarios
- Status indicators for completion
- Time-sensitive elements highlighted
- Key action items emphasized

**Usage Example:**
```
/show-plan priority_trades format=summary
```

### `/validate-plan`

**Purpose:**
Perform validation checks on the unified plan to ensure completeness, consistency, and alignment.

**Parameters:**

- `checks` (optional): Specific validation checks to perform (default: all)
- `strictness` (optional): Validation strictness level (1-5) (default: 3)
- `format` (optional): Output format (default: structured)

**Output:**

- Validation status (pass/fail/warnings)
- Identified issues or inconsistencies
- Completeness assessment
- Recommended corrections
- Market alignment verification

**Usage Example:**
```
/validate-plan strictness=4
```

### `/manage-watchlist [action]`

**Purpose:**
Manage the active watchlist based on setups and focus ideas.

**Parameters:**

- `action` (required): "add", "remove", "prioritize", "clear", "show"
- `tickers` (conditional): Specific symbols to affect (required for add/remove)
- `setup` (conditional): Setup type (required for add)
- `priority` (optional): Item priority (high/medium/low)

**Output:**

- Updated watchlist status
- Priority ranking
- Monitoring parameters
- Alert configurations
- Setup expiration estimates

**Usage Example:**
```
/manage-watchlist add AAPL failed-breakdown priority=high
```

## 3. Technical Analysis Commands

### `/check-ticker [symbol]`

**Purpose:**
Perform comprehensive technical analysis on a specific ticker.

**Parameters:**

- `symbol` (required): Stock/instrument symbol
- `timeframe` (optional): Analysis timeframe (default: daily)
- `components` (optional): Specific components to analyze (default: all)

**Output:**

- Complete technical assessment
- Key level identification
- Moving average relationships
- Pattern recognition
- Volume analysis
- Relevant analyst commentary
- Setup opportunities

**Usage Example:**
```
/check-ticker AAPL timeframe=daily
```

### `/check-character [symbol]`

**Purpose:**
Assess if price character has changed for a specific ticker.

**Parameters:**

- `symbol` (required): Stock/instrument symbol
- `timeframe` (optional): Analysis timeframe (default: daily)
- `lookback` (optional): Historical periods to analyze (default: 10)

**Output:**

- Character change signal (yes/no/pending)
- Pattern breakdown
- Volume confirmation
- Moving average relationship shifts
- Momentum assessment
- Historical character change examples
- Trading implications

**Usage Example:**
```
/check-character QQQ timeframe=intraday
```

### `/check-ma [symbol]`

**Purpose:**
Analyze moving average relationships and interactions for a symbol.

**Parameters:**

- `symbol` (required): Stock/instrument symbol
- `mas` (optional): Specific MAs to include (default: 8,10,21,50,100,200)
- `format` (optional): Output format (default: detailed)

**Output:**
- Current price vs. all MAs
- MA crossovers and relationships
- Support/resistance behavior of MAs
- Historical MA interaction patterns
- MA slope analysis
- Trading implications
- Visual MA chart

**Usage Example:**
```
/check-ma SPY mas=8,21,50
```

### `/check-acceptance [level] [symbol]`

**Purpose:**
Verify if a price level shows acceptance based on Mancini's framework.

**Parameters:**

- `level` (required): Price level to check
- `symbol` (required): Stock/instrument symbol
- `type` (optional): Acceptance type to verify (default: all)

**Output:**
- Acceptance status (yes/no)
- Acceptance type classification
- Supporting evidence
- Historical significance of level
- Failed Breakdown potential
- Time-based context
- Trading implications

**Usage Example:**
```
/check-acceptance 5900 ES
```

### `/analyze-levels [symbol] [direction]`

**Purpose:**
Identify and analyze key price levels for a specific symbol.

**Parameters:**

- `symbol` (required): Stock/instrument symbol
- `direction` (optional): "support", "resistance", or "both" (default: both)
- `significance` (optional): "major", "minor", or "all" (default: all)

**Output:**
- Comprehensive level structure
- Major/minor classification
- Recent price interaction
- Analyst level consensus
- Gap areas and significance
- Volume profile at levels
- Historical reliability statistics

**Usage Example:**
```
/analyze-levels SPX support significance=major
```

### `/detect-mode`

**Purpose:**
Determine if the current market is in Mode 1 (trend) or Mode 2 (range/trap).

**Parameters:**

- `lookback` (optional): Historical periods to consider (default: 3)
- `indices` (optional): Specific indices to analyze (default: ES)
- `confidence` (optional): Minimum confidence threshold (default: medium)

**Output:**
- Mode classification with confidence
- Supporting evidence
- Historical mode statistics
- Typical duration expectations
- Optimal strategy recommendations
- Warning signs of mode transition
- Visual mode classification indicators

**Usage Example:**
```
/detect-mode indices=ES,SPX
```

## 4. Position Management Commands

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
```
/add-position AAPL long entry=225.50 size=100 stop=223.80 targets=227.50,229.00,232.00 setup=bull-flag
```

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
```
/update-position AAPL move-stop value=224.50 notes="Moving stop to breakeven after first target hit"
```

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
```
/close-position AAPL exit_price=227.50 reason="Target reached"
```

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
```
/list-positions status=active format=summary
```

### `/manage-runner [symbol]`

**Purpose:**
Apply Mancini's runner management protocol to a position.

**Parameters:**
- `symbol` (required): Stock/instrument symbol
- `action` (optional): Specific runner action (adjust-stop, evaluate, target) (default: evaluate)
- `value` (conditional): New parameter value (required for adjust-stop, target)

**Output:**
- Runner management guidance
- Trailing stop recommendation
- Historical runner statistics
- Time-based considerations
- Risk management protocol
- Visual runner tracking

**Usage Example:**
```
/manage-runner AAPL adjust-stop value=225.00
```

### `/set-alert [symbol]`

**Purpose:**
Configure price or condition-based alerts for a symbol.

**Parameters:**
- `symbol` (required): Stock/instrument symbol
- `type` (required): Alert type ("price", "ma-cross", "volume", "character", etc.)
- `value` (required): Alert trigger value
- `direction` (conditional): "above" or "below" (required for price alerts)
- `expiration` (optional): Alert expiration time
- `notes` (optional): Alert context

**Output:**
- Alert confirmation
- Monitoring status
- Similar historical alerts
- Context visualization
- Alternative alert suggestions
- Notification options

**Usage Example:**
```
/set-alert SPY price value=430.00 direction=below
```

## 5. Performance Commands

### `/log-trade [symbol]`

**Purpose:**
Create a structured log entry for a completed trade.

**Parameters:**
- `symbol` (required): Stock/instrument symbol
- `template` (optional): Log template to use (default: standard)
- `details` (optional): Additional details to include
- `format` (optional): Output format (default: detailed)

**Output:**
- Structured trade record
- Performance metrics
- Plan adherence assessment
- Setup outcome evaluation
- Learning opportunities
- Visual trade analysis

**Usage Example:**
```
/log-trade AAPL template=failed-breakdown
```

### `/add-journal [type]`

**Purpose:**
Add a structured entry to trading journal.

**Parameters:**
- `type` (required): Entry type ("observation", "lesson", "pattern", etc.)
- `content` (required): Journal entry text
- `tags` (optional): Categorization tags (comma-separated)
- `importance` (optional): Entry significance (1-5) (default: 3)

**Output:**
- Entry confirmation
- Related historical entries
- Pattern recognition
- Implementation suggestions
- Knowledge integration recommendations

**Usage Example:**
```
/add-journal lesson "Failed Breakdowns work best when there are multiple tests of the same level" tags=failed-breakdown,support importance=4
```

### `/run-debrief`

**Purpose:**
Execute comprehensive end-of-day trading review.

**Parameters:**
- `focus` (optional): Specific areas to emphasize (default: all)
- `date` (optional): Session date (default: today)
- `format` (optional): Output format (default: detailed)

**Output:**
- Complete session analysis
- Plan execution assessment
- Decision quality evaluation
- Performance metrics
- Psychological state analysis
- Mode classification accuracy
- Level utilization effectiveness
- Next day preparation guidance

**Usage Example:**
```
/run-debrief focus=execution,psychology
```

### `/compare-analysts`

**Purpose:**
Compare trading performance against multiple analyst recommendations.

**Parameters:**
- `analysts` (optional): Specific analysts to include (default: all)
- `timeframe` (optional): Analysis period (default: today)
- `metrics` (optional): Specific metrics to focus on (default: all)

**Output:**
- Comparative performance analysis
- Level accuracy assessment
- Setup success rates by analyst
- Timing accuracy evaluation
- Missed opportunity analysis
- Conviction correlation with outcomes
- Implementation differences
- Improvement recommendations

**Usage Example:**
```
/compare-analysts analysts=dp,mancini timeframe=week
```

### `/analyze-patterns`

**Purpose:**
Identify recurring patterns in trading behavior and performance.

**Parameters:**
- `pattern_type` (optional): Specific patterns to analyze (default: all)
- `timeframe` (optional): Analysis period (default: month)
- `min_occurrences` (optional): Minimum pattern frequency (default: 3)

**Output:**
- Identified behavioral patterns
- Success/failure correlations
- Time-of-day performance analysis
- Setup type effectiveness
- Psychological tendencies
- Decision trigger analysis
- Mode correlation with performance
- Improvement recommendations

**Usage Example:**
```
/analyze-patterns pattern_type=execution timeframe=month
```

## 6. System Management Commands

### `/show-help [command]`

**Purpose:**
Display help information for available commands.

**Parameters:**
- `command` (optional): Specific command to explain
- `category` (optional): Command category to show
- `format` (optional): Output format (default: detailed)

**Output:**
- Command description and usage
- Parameter explanations
- Examples and use cases
- Related commands
- Common patterns
- Best practices

**Usage Example:**
```
/show-help create-plan
```

### `/show-version`

**Purpose:**
Display system version and component information.

**Parameters:**
- `component` (optional): Specific component to check
- `format` (optional): Output format (default: standard)

**Output:**
- System version
- Component versions
- Recent updates
- Compatibility information
- Feature availability
- Upcoming changes

**Usage Example:**
```
/show-version component=processors
```

### `/backup-system [options]`

**Purpose:**
Create system backup of data and configurations.

**Parameters:**
- `options` (optional): Backup configuration options (full, data, config)
- `scope` (optional): Elements to include (default: all)
- `format` (optional): Backup format (default: zip)

**Output:**
- Backup confirmation
- Included components
- Storage location
- Recovery instructions
- Backup history
- Space utilization

**Usage Example:**
```
/backup-system options=full
```

### `/set-preferences [category]`

**Purpose:**
Configure user preferences for system behavior.

**Parameters:**
- `category` (required): Preference category
- `settings` (required): Preference values to set
- `reset` (optional): Reset to defaults (true/false) (default: false)

**Output:**
- Confirmation of changes
- Current preference summary
- Affected functionality
- Recommended related settings
- Reset options
- Advanced configuration options

**Usage Example:**
```
/set-preferences risk settings="max_daily_loss=2%,max_position_size=5%"
```

### `/run-phase [phase]`

**Purpose:**
Execute all actions for a specific trading day phase.

**Parameters:**
- `phase` (required): "premarket", "intraday", "postmarket"
- `options` (optional): Phase-specific options
- `skip` (optional): Steps to skip (comma-separated)

**Output:**
- Phase execution confirmation
- Actions performed
- Results summary
- Next steps
- Optional actions
- Timeline projection

**Usage Example:**
```
/run-phase premarket skip=check-economic-calendar
```

### `/define-conviction`

**Purpose:**
Define and calibrate conviction level mapping for analyst language.

**Parameters:**
- `analyst` (required): Analyst to calibrate for
- `samples` (optional): Number of samples to analyze (default: 10)
- `phrases` (optional): Custom phrases to include

**Output:**
- Conviction level mapping
- Phrase classification
- Confidence scores
- Example phrases
- Override options
- Testing recommendations

**Usage Example:**
```
/define-conviction dp samples=20
```

This command catalog provides a comprehensive reference for all available commands in the Intent Trader system, with detailed specifications, parameters, outputs, and usage examples.
