---
id: plan-v0.5.2
title: Intent Trader v0.5.2 – Canonical Schema & Natural Language Interface
description: Foundation release to establish canonical data schema, implement natural language command processing, reduce codebase size, and optimize for Claude
author: Simon Plant
version: 0.3.0
release: 0.5.2
created: 2025-05-20
updated: 2025-05-20
category: system
status: final
tags: [schema, prompts, refactor, validation, claude-compatibility, natural-language]
requires: [system/schemas/intent-trader-master-schema.json, system/runtime/plugin-registry.json]
outputs: [system/state/trade-plan-state.json, system/state/my-positions.json, system/state/conversation-context.json]
input_format: markdown
output_format: markdown
ai_enabled: true
---

# Intent Trader v0.5.2 – Canonical Schema & Natural Language Interface

## Purpose

This foundational release creates a single canonical data schema for the Intent Trader app while implementing a natural language command interface for intuitive trading interactions. It standardizes all data structures, updates prompts and runtime components to implement these schema changes, and reduces overall codebase size. The focus is on building solid data foundations to increase accuracy in classification tasks, while adding a natural language layer that makes trading commands more intuitive and efficient.

This release takes an evolutionary approach that preserves existing functionality while standardizing data structures and interfaces.

---

## Core Deliverables

### 1. Canonical Schema (Priority: Critical)

- [ ] Define minimal `system/schemas/intent-trader-master-schema.json`
  - Create consistent structure for all trading objects (positions, ideas, logs)
  - Use `schemaVersion`, `id`, `source` on all major objects for traceability
  - Maximum 3 nested levels for Claude compatibility
  - Support zero-ambiguity classifications with clear boolean flags
  - Design for single trader use case while preserving familiar patterns
  - Standardize naming conventions across all schema objects

### 2. App File Updates (Priority: Critical)

- [ ] Update all prompts to use canonical schema
  - Standardize front matter with consistent metadata
  - Modify input/output examples to match schema
  - Update prompt logic to handle schema objects
  - Remove any ambiguous classifications with clear boolean criteria
  - Preserve existing functionality while standardizing outputs

- [ ] Update runtime components
  - Implement basic schema validation
  - Modify command parsing to work with schema objects
  - Update output formatting for schema compatibility
  - Limit runtime changes to essential schema support

### 3. State File Alignment (Priority: High)

- [ ] Convert existing state files to canonical schema
  - Update `trade-plan-state.json` structure
  - Migrate `my-positions.json` to schema format
  - Ensure backward compatibility with existing workflows
  - Add schema version references to all state files
  - Focus on careful data preservation during conversion

### 4. Codebase Reduction (Priority: High)

- [ ] Selective approach to content reduction
  - Remove decorative elements (emojis, ASCII art, visual formatting)
  - Remove redundant comments while preserving valuable documentation
  - Eliminate duplicate examples while keeping instructive ones
  - Focus on standardization over size reduction

- [ ] Consolidate similar files
  - Merge variant prompt files into single implementations
  - Archive historical logs and unused content
  - Remove deprecated files completely

- [ ] Optimize prompt files for Claude
  - Target codebase optimization while preserving valuable content
  - Reduce token count by simplifying language
  - Focus on functionality preservation over size reduction

### 5. Natural Language Command Interface (Priority: High)

- [ ] Implement intent parsing for natural language commands
  - Create pattern matching for common trading instructions
  - Build semantic parser to extract parameters from natural text
  - Map natural language to formal command structures
  - Maintain structured command syntax as fallback

- [ ] Design context-aware command processing
  - Maintain conversation context across multiple commands
  - Infer missing parameters from recent interactions
  - Track active symbols and positions for contextual references

- [ ] Implement verification and confirmation flow
  - Generate human-readable confirmation of understood intent
  - Provide parameter correction opportunities
  - Support clarification requests for ambiguous commands

---

## Files In Scope

| File Category | Files | Status |
|---------------|-------|--------|
| Schema | `system/schemas/intent-trader-master-schema.json` | New |
| NL Interface | `prompts/utilities/natural-language-parser.md` | New |
| NL Interface | `prompts/utilities/context-tracker.md` | New |
| Documentation | `docs/natural-language-commands.md` | New |
| Runtime | `system/runtime/command-parser.md` | Modified |
| Runtime | `system/runtime/plugin-registry.json` | Modified |
| Runtime | `system/runtime/runtime-agent.md` | Modified |
| Documentation | `system/commands.md` | Modified |
| State | `system/state/trade-plan-state.json` | Modified |
| State | `system/state/my-positions.json` | Modified |
| State | `system/state/conversation-context.json` | New |
| Prompts | All worker prompt files | Modified |

---

## Prompt Refactor Coverage

| Prompt File | Schema Required | Refactor Priority | Dependencies |
|-------------|----------------|-------------------|--------------|
| `prompts/analyze-dp.md` | Yes | High | intent-trader-master-schema.json |
| `prompts/analyze-mancini.md` | Yes | High | intent-trader-master-schema.json |
| `prompts/create-plan.md` | Yes | Critical | intent-trader-master-schema.json |
| `prompts/add-position.md` | Yes | Critical | intent-trader-master-schema.json |
| `prompts/log-session.md` | Yes | Medium | intent-trader-master-schema.json |
| `prompts/market-review.md` | Yes | Medium | intent-trader-master-schema.json |
| `prompts/review-positions.md` | Yes | High | intent-trader-master-schema.json |
| `prompts/chart-analysis.md` | Yes | Medium | intent-trader-master-schema.json |
| `prompts/utilities/natural-language-parser.md` | Yes | Critical | intent-trader-master-schema.json, plugin-registry.json |
| `prompts/utilities/context-tracker.md` | Yes | Critical | intent-trader-master-schema.json, conversation-context.json |

---

## Required Files Per Prompt

Each worker prompt must include the following required files to function properly:

| Worker Prompt | Required Files |
|---------------|---------------|
| `analyze-dp.md` | intent-trader-master-schema.json, runtime-agent.md |
| `analyze-mancini.md` | intent-trader-master-schema.json, runtime-agent.md |
| `create-plan.md` | intent-trader-master-schema.json, trade-plan-state.json, runtime-agent.md |
| `add-position.md` | intent-trader-master-schema.json, my-positions.json, runtime-agent.md |
| `log-session.md` | intent-trader-master-schema.json, my-positions.json, runtime-agent.md |
| `review-positions.md` | intent-trader-master-schema.json, my-positions.json, runtime-agent.md |
| `natural-language-parser.md` | intent-trader-master-schema.json, plugin-registry.json, command-parser.md |
| `context-tracker.md` | intent-trader-master-schema.json, conversation-context.json |

---

## State File Schema Sync Status

| File | Schema Synced | Version |
|------|---------------|---------|
| `trade-plan-state.json` | To be updated | 0.5.2 |
| `my-positions.json` | To be updated | 0.5.2 |
| `conversation-context.json` | New file | 0.5.2 |
| `transaction-log.json` | To be updated | 0.5.2 |

---

## Testing and Validation Plan

| Test Area | Method | Success Criteria |
|-----------|--------|------------------|
| Schema Validation | JSON Schema validation | All schema files pass validation |
| State File Conversion | Schema migration test | Data preserved with no loss |
| Prompt Compatibility | Input/output testing | All prompts accept and produce schema-valid data |
| Natural Language Interface | Pattern recognition testing | Successfully parse common trading commands |
| Command Preservation | End-to-end workflow tests | All existing command functionality maintained |
| Size Optimization | Token count comparison | Optimized without losing functionality |

---

## Implementation Phases

### Phase 1: Schema Design & Implementation (15 Points)
- [ ] Design canonical schema structure (3)
- [ ] Create `system/schemas/intent-trader-master-schema.json` (5)
- [ ] Test schema with sample data (2)
- [ ] Update critical runtime components for schema compatibility (5)

### Phase 2: State Conversion (10 Points)
- [ ] Create schema migration utilities (3)
- [ ] Convert existing state files to new schema (4)
- [ ] Verify state file integrity after conversion (3)

### Phase 3: Prompt Updates (20 Points)
- [ ] Update prompt files to use canonical schema (8)
- [ ] Standardize front matter across all files (4)
- [ ] Reduce example count and verbosity (5)
- [ ] Optimize prompts for Claude compatibility (3)

### Phase 4: Natural Language Interface (20 Points)
- [ ] Design natural language pattern recognition (5)
- [ ] Implement semantic parser for trading commands (8)
- [ ] Create context tracking for conversation state (4)
- [ ] Build verification and confirmation flows (3)

### Phase 5: Size Reduction & Cleanup (10 Points)
- [ ] Remove decorative elements (3)
- [ ] Consolidate duplicate content (4)
- [ ] Archive unused files (3)

### Phase 6: Validation & Testing (10 Points)
- [ ] Test all commands with new schema (4)
- [ ] Verify trading workflows end-to-end (4)
- [ ] Validate optimization achievements (2)

---

## File Updates

### New Files
- `system/schemas/intent-trader-master-schema.json` - Canonical schema definition
- `prompts/utilities/natural-language-parser.md` - NL command parsing implementation
- `prompts/utilities/context-tracker.md` - Conversation context management
- `docs/natural-language-commands.md` - NL command guide with examples
- `system/state/conversation-context.json` - Store recent context for NL commands

### Modified Files
- All prompt files - Update for schema compatibility and size reduction
- `system/runtime/command-parser.md` - Add natural language processing
- `system/runtime/plugin-registry.json` - Add intent mappings and context tracking
- `system/runtime/runtime-agent.md` - Update for schema validation and NL processing
- `system/commands.md` - Document natural language command patterns
- `system/state/*.json` - Convert to canonical schema

### Removed/Archived Files
- All prompt variants (e.g., `create-plan-alt.md`)
- Deprecated scripts and utilities
- Historical logs and unused examples

---

## Standard Front Matter Templates

### Markdown Prompt Template
```yaml
---
id: [prompt-id]
title: [Prompt Title]
description: [Brief description of prompt function]
author: [Author Name]
version: [0.5.2]
release: [0.5.2]
created: [YYYY-MM-DD]
updated: [YYYY-MM-DD]
category: [prompt-category]
status: [active|deprecated]
tags: [comma, separated, tags]
requires: [comma, separated, list, of, required, files]
outputs: [comma, separated, list, of, output, files]
input_format: markdown
output_format: markdown
ai_enabled: true
---
```

### JSON Schema Template
```yaml
---
id: [schema-id]
title: [Schema Title]
description: [Brief description of schema]
author: [Author Name]
version: [0.5.2]
release: [0.5.2]
created: [YYYY-MM-DD]
updated: [YYYY-MM-DD]
category: schema
status: active
tags: [comma, separated, tags]
format: json
validation: json-schema
---
```

---

## Schema Structure (Simplified Example)

```json
{
  "schemaVersion": "0.5.2",
  "tradePosition": {
    "id": "pos-20250520-aapl-01",
    "symbol": "AAPL",
    "direction": "long",
    "entry": {
      "price": 225.50,
      "date": "2025-05-20"
    },
    "stop": 223.80,
    "risk": {
      "percent": 1.0,
      "amount": 1000
    },
    "setup": "bull-flag",
    "conviction": "high",
    "status": "open",
    "classifications": {
      "isBreakout": true,
      "isEarningsPlay": false,
      "isTrendFollow": true
    }
  }
}
```

## Natural Language Command Examples

```
User: "Buy AAPL if it breaks above 225, use a 2% stop loss with high conviction"

System: "I'll set up a long position for AAPL with entry at $225.00, stop loss at $220.50 (2%), and high conviction. This will be a breakout setup. Should I execute this when the price condition is met?"

User: "Yes, and add a take profit at 235"

System: "Added take profit target at $235.00. Position ready to execute when AAPL breaks above $225.00."
```

```
User: "I'm seeing a bull flag forming on TSLA, what was my last trade on it?"

System: "Your last TSLA trade was a long position entered on May 15 at $182.50 with a 3% stop. You closed it on May 18 for a 2.8% gain. Would you like to set up a new trade based on the bull flag you're seeing?"
```

---

## Success Criteria

| Area | Target Outcome |
|------|----------------|
| Schema | Single canonical schema with ≤3 nesting levels and zero-ambiguity classifications |
| State Files | All state files converted to canonical schema with data preservation |
| Prompts | All prompts updated to use canonical schema with standardized front matter |
| Commands | Natural language processing for trading intent with structured fallback |
| Optimization | Codebase optimized while maintaining functionality |
| Accuracy | Improved classification accuracy through schema standardization |

---

## MVP Focus

This plan maintains an MVP approach suitable for a single trader by:

1. Creating a focused schema without over-engineered complexity
2. Implementing natural language interface for intuitive command input
3. Focusing on standardization and efficiency rather than flashy features
4. Building a solid data foundation that enables accurate classifications
5. Eliminating ambiguity in data structures to increase reliability
6. Reducing cognitive load through conversation-like trading interactions

The canonical schema provides the foundation for future features while the natural language interface removes the need to remember command syntax, allowing for more natural trading interactions that match how you think about the market in real-time.
