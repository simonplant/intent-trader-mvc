# Intent Trader Backlog Items

## User Experience Issues

### UX-1: Orientation Loss During Fast Market Moves
**Problem:** User reports feeling lost and "chasing" when spending time building plan instead of watching markets.
**Impact:** High - Compromises decision quality and increases emotional load
**Reproduction:** Occurs when spending >15 minutes on plan construction during active market hours
**Requirements:**
- Real-time status dashboard for trade ideas
- Clear categorization system for trade opportunities
- Visual indicators of market condition changes

### UX-2: Inefficient Information Integration
**Problem:** Multiple information sources (DP calls, Mancini analysis, moderator signals, price feeds) lack unified structure
**Impact:** Medium - Creates cognitive overhead and delays response time
**Reproduction:** Occurs when attempting to unify disparate data formats during live trading
**Requirements:**
- Standardized information parsing templates
- Timestamp tracking for all data inputs
- Priority weighting system for conflicting signals

## Core Functionality Gaps

### CORE-1: Missing Trade Status Lifecycle Management
**Priority:** High
**Description:** System needs to track transition of trade ideas through various states (identified → watching → ready → triggered → managing → completed/invalidated)
**Acceptance Criteria:**
- Auto-categorization of trades as "Already Triggered", "Invalidated", "Ready Soon", or "Not Close"
- Status transition hooks for notification triggers
- Trade idea aging and expiration logic
- Integration with existing plan generation workflow

### CORE-2: Inadequate Real-Time Adaptation Framework
**Priority:** High
**Description:** System lacks formalized protocol for incorporating breaking changes (moderator alerts, technical shifts)
**Acceptance Criteria:**
- Structured response templates for common market events
- Re-prioritization engine for trade ideas based on new information
- Filtering mechanism to eliminate invalidated setups
- Diff generation between sequential plan versions

### CORE-3: Missing Cognitive Reset Mechanism
**Priority:** Medium
**Description:** No formal process to re-center user when feeling overwhelmed by rapid changes
**Acceptance Criteria:**
- Command to generate current trade status snapshot
- Time-based notifications for scheduled re-centering
- Visual comparison of current market state vs. expected scenarios
- One-click "full context" generation

## Technical Enhancements

### TECH-1: Moderator Signal Tracker
**Priority:** High
**Description:** Create standardized tracking system for moderator actions with classification and timestamp
**Technical Details:**
- Schema definition in `/system/schema/moderator-signals.json`
- Parser template in `/prompts/analyzers/moderator-alert-parser.md`
- Storage integration with `/logs/moderator-actions/`
- Moderator action taxonomy in `/knowledge/moderator-signals-kb.md`
- Visualization component for moderator positioning heatmap

### TECH-2: Chart Context Integration Module
**Priority:** Medium
**Description:** Add capability to analyze multi-chart technical context and integrate with trade plan
**Technical Details:**
- Technical condition classifier in `/prompts/analyzers/chart-condition-analyzer.md`
- Integration with price level store in `/data/levels/`
- Technical exhaustion detection logic in `/knowledge/technical-exhaustion-kb.md`
- Extended/normal market condition taxonomy

### TECH-3: Status Update Generator
**Priority:** High
**Description:** Create command to produce structured status updates across all active trade ideas
**Technical Details:**
- Controller command in `/system/controller.md`: `/status-update`
- Status update template in `/prompts/intraday/status-update-template.md`
- Category definition schema in `/system/schema/trade-status-categories.json`
- Transformation from JSON to human-readable format

## SOP Enhancements

### SOP-1: Add Intraday Reorientation Protocol
**Priority:** High
**Description:** Add formal procedure for regular reorientation during trading session
**Changes Required:**
- New section in `trading-system-sop.md`: "Intraday Reorientation Protocol"
- Subsection: "Status Update Format" with Already Triggered/Invalidated/Ready Soon/Not Close categories
- Subsection: "Chart Context Integration" with formal process for technical review
- Subsection: "Moderator Alert Processing" with standardized workflow

### SOP-2: Enhance Information Priority Hierarchy
**Priority:** Medium
**Description:** Establish clear ranking system for information sources during conflicts
**Changes Required:**
- New section in `trading-system-sop.md`: "Information Priority Hierarchy"
- Include information source ranking table
- Define information validity timeframes by type
- Document conflict resolution process for contradictory signals

### SOP-3: Expand Command Workflow Reference
**Priority:** Low
**Description:** Add new commands to support enhanced functionality
**Changes Required:**
- Add `/status-update` command to Command Workflow Reference table
- Add `/chart-analysis` command for technical context integration
- Add `/moderator-tracker` command to record moderator signals
- Document command parameters and output formats

## Testing Requirements

### TEST-1: Validate Status Update Categorization
**Priority:** Medium
**Description:** Create test cases to verify accurate categorization of trade ideas
**Test Cases:**
- Known triggered trades correctly identified
- Price-based invalidation properly detected
- Time-based invalidation properly detected
- Accurate proximity assessment for "Ready Soon" vs "Not Close"
- Edge cases handled appropriately

### TEST-2: Performance Testing for Real-Time Updates
**Priority:** Low
**Description:** Ensure system remains responsive during high update frequency
**Test Cases:**
- Multiple moderator alerts in short timeframe
- Rapid price updates across multiple securities
- Full plan regeneration performance
- Status update generation latency

## Integration Points

### INT-1: Integrate with Existing Logging Framework
**Priority:** Medium
**Description:** Ensure new status tracking integrates with existing trade logging
**Requirements:**
- Status transitions recorded in trade journal
- Time in each status tracked for analytics
- Status at execution time stamped for performance correlation
- Link between trade ID and status history maintained

### INT-2: Knowledge Base Expansion
**Priority:** Low
**Description:** Update knowledge bases to support new functionality
**Requirements:**
- Add status transition patterns to trading-behaviors-kb.md
- Document technical exhaustion patterns in market-regimes.md
- Create moderator signal taxonomy
- Add status-specific risk management guidelines

---

**Note to Product Owner:** These backlog items are organized by type rather than strict priority to facilitate assignment to different team members. The high-priority items across categories that would have immediate impact are:
1. CORE-1: Trade Status Lifecycle Management
2. TECH-3: Status Update Generator
3. SOP-1: Intraday Reorientation Protocol