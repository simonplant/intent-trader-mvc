
---
id: plan
title: Unified Trading Intent Schema Implementation Plan
description: Master rollout strategy for schema-native implementation across all components of the Intent Trader system.
author: Intent Trader Team
version: 0.5.1
release: 2025-05-20
category: system
status: stable
tags: [schema, system, integration, plan]
requires: []
outputs: []
input_format: markdown
output_format: markdown
ai_enabled: false
---

# Implementation Plan: Unified Trading Intent Schema

## Phase 1: Foundation Setup (1.5 Weeks)

### 1.1 Define Unified Schema (3 Days)

**Objective:** Define the authoritative schema that will be used throughout the system

**Implementation Approach:**
- Create a single unified schema specification with comprehensive documentation
- Implement schema validation utilities for runtime checking
- Define clear extension patterns for future schema evolution
- Establish type definitions and interfaces for developer tooling

**Key Deliverables:**
- `system/schemas/trading-intent.json` - The canonical schema definition
- `system/validation/schema-validator.js` - Schema validation utility
- Documentation for all schema components and proper usage patterns
- TypeScript type definitions (if applicable)

### 1.2 Refactor Core Files (3 Days)

**Objective:** Refactor all core prompt files to natively use the unified schema

**Implementation Approach:**
- Directly update each prompt file to work with the standardized schema
- Replace all internal data structures with schema-compliant formats
- Embed schema validation in each prompt's processing logic
- Update front matter to reflect schema dependencies

**Key Files to Refactor:**
- `prompts/plan/analyze-dp.md`
- `prompts/plan/summarize-mancini.md`
- `prompts/plan/analyze-mancini.md`
- `prompts/focus/create-plan.md`
- `prompts/focus/extract-focus.md`
- `prompts/focus/extract-levels.md`
- `prompts/execute/size-position.md`
- `prompts/execute/add-position.md`
- `prompts/manage/update-position.md`
- `prompts/manage/close-position.md`
- `prompts/manage/list-positions.md`
- `prompts/review/log-session.md`
- `state/session-manifest.json`
- `state/trade-plan-state.json`
- `state/my-positions.json`
- `state/moderator-positions.json`

**Implementation Strategy:**
- Start with the core source inputs (`analyze-dp.md` and `summarize-mancini.md`)
- Work downstream through the dependency chain
- Update front matter to reference the schema
- Update all internal processing to work directly with the schema

### 1.3 Implement Unified Morning Preparation Command (2 Days)

**Objective:** Implement the flexible `/morning-prep` command with incremental update support

**Implementation Approach:**
- Build directly on top of the schema-native prompt files
- Implement state caching with schema-validated objects
- Create schema-based differential comparison for updates
- Generate output with schema-compliant highlighting

**Key Deliverables:**
- `prompts/plan/morning-prep.md` - The unified command implementation
- Schema-based change detection and tracking components
- Schema-validated state storage
- Schema-compliant output generation

## Phase 2: Schema-Driven Integration (1 Week)

### 2.1 Implement Schema-Native Transaction Journaling (3 Days)

**Objective:** Implement an event-sourced transaction journal for all schema changes

**Implementation Approach:**
- Record all schema mutations as serialized events
- Create schema validation at transaction boundaries
- Implement state reconstruction from schema-typed events
- Build utility functions for schema-compliant journaling

**Key Deliverables:**
- `system/journal/transaction-journal.js` - Core journaling implementation
- `state/transaction-log.json` - Structured journal storage
- `prompts/utilities/journal-replay.md` - Journal replay utility
- Schema validators for all journaled events

### 2.2 Build Schema-Compliant Position Dashboard (4 Days)

**Objective:** Create a unified position management interface with full schema integration

**Implementation Approach:**
- Build directly on the Trading Intent Schema for all state
- Use schema-defined structures for all position representations
- Implement schema validation for all position operations
- Create schema-compliant visualization and reporting

**Key Deliverables:**
- `prompts/manage/positions.md` - Unified dashboard command
- Position subcommand implementations
- Schema-compliant position state management
- Position visualization with schema-defined fields

## Phase 3: Optimization and Validation (1 Week)

### 3.1 Standardize Commands on Schema (2 Days)

**Objective:** Create a consistent command interface built directly on the schema

**Implementation Approach:**
- Map all commands to schema operations
- Design parameter schemas based on the Trading Intent Schema
- Create schema-compliant help documentation
- Implement schema-based validation for all commands

**Key Deliverables:**
- `system/runtime/command-map.md` - Updated with schema-based definitions
- `system/runtime/validator.md` - Schema-based parameter validation
- Updated command documentation with schema references
- Command router with schema type checking

### 3.2 Align Plan-Execution with Schema (3 Days)

**Objective:** Build plan validation directly on schema comparison

**Implementation Approach:**
- Compare position operations against plan using schema fields
- Generate compliance indicators based on schema validation
- Create justification logging with schema-typed structures
- Implement plan adjustments using schema operations

**Key Deliverables:**
- Plan-execution validation components
- Schema-based comparison utilities
- Schema-compliant justification logging
- Plan adjustment operations with schema validation

### 3.3 System Integration Testing with Schema (2 Days)

**Objective:** Test the complete system with focus on schema integrity

**Implementation Approach:**
- Create schema-based test vectors for each component
- Test schema validation under various conditions
- Verify schema consistency across system boundaries
- Benchmark schema processing performance

**Key Deliverables:**
- Schema-driven test suite
- Schema validation performance benchmarks
- Schema integrity verification tools
- Full test report with schema validation metrics

## Unified Schema Structure and Example

The schema implementation will be natively embedded in all relevant files:

```json
{
  "$schema": "https://intent-trader.mvp/schemas/v1/trading-intent.json",
  "version": "1.0",
  "meta": {
    "source": "dp|mancini|user|system|combined",
    "timestamp": "2025-05-19T12:30:45Z",
    "update_type": "full|incremental|refresh",
    "version_id": "v1-2025-05-19-0001"
  },
  "market": {
    "session": "pre|regular|post",
    "framework": {
      "regime": "bullish-continuation|bullish-distribution|bearish-continuation|bearish-accumulation|range-bracketed|range-rotational|transitional",
      "mode": {
        "classification": "Mode 1|Mode 2",
        "confidence": 0.85,
        "source": "dp|mancini|combined"
      },
      "bias": "bullish|bearish|neutral|mixed",
      "character": "String description of current character",
      "volatility": "low|normal|high|extreme"
    },
    "levels": {
      "indices": {
        "SPX": {
          "key_decision_point": 5905,
          "supports": [
            {
              "price": 5860,
              "type": "major|significant|minor|provisional",
              "significance": 8,
              "source": "dp|mancini|combined",
              "notes": "Optional notes",
              "is_new": false
            }
          ],
          "resistances": [/* similar structure */],
          "zones": [/* zones structure */],
          "current_price": 5915
        },
        "ES": {/* similar structure */}
      },
      "stocks": {
        "AAPL": {/* similar structure */}
      }
    },
    "contexts": {
      "catalysts": ["String descriptions"],
      "key_news": ["String descriptions"],
      "key_events": [
        {
          "name": "FOMC Minutes",
          "time": "2025-05-20T14:00:00Z",
          "impact": "high|medium|low"
        }
      ]
    }
  },
  "trade_ideas": {
    "primary": [
      {
        "id": "idea-20250519-aapl-long-01",
        "ticker": "AAPL",
        "direction": "long|short",
        "conviction": {
          "level": "focus-trade|high|medium|low",
          "confidence": 0.85,
          "source": "dp|mancini|combined",
          "phrases": ["Original phrases"]
        },
        "entry": {
          "zone": {"min": 150, "max": 152},
          "condition": "Optional condition text",
          "timeframe": "day|swing|position"
        },
        "exit": {
          "stop": {
            "price": 145,
            "type": "fixed|trailing|volatility",
            "risk_pct": 3.85
          },
          "targets": [
            {"price": 155, "pct": 50},
            {"price": 160, "pct": 40},
            {"price": null, "pct": 10, "trailing": true}
          ],
          "management": "75/15/10 rule"
        },
        "setup": {
          "type": "pullback|breakout|flag|support-test",
          "stage": "developing|mature|confirmed",
          "source": "dp|mancini|combined"
        },
        "rationale": "Longer description of trade rationale",
        "tags": ["momentum", "earnings", "technical"],
        "status": "planned|active|completed|abandoned",
        "is_new": true
      }
    ],
    "secondary": [/* similar structure */],
    "watchlist": [/* similar structure */]
  },
  "risk_management": {
    "daily_risk_budget": {
      "percent": 1.0,
      "amount": 1000
    },
    "position_sizing": {
      "max_per_trade_pct": 1.0,
      "size_adjustment_factors": {
        "conviction": {
          "focus-trade": 1.0,
          "high": 0.75,
          "medium": 0.5,
          "low": 0.25
        },
        "setup": {
          "failed-breakdown": 1.0,
          "bull-flag": 0.8,
          "day-after-trade": 0.6
        }
      }
    },
    "current_exposure": {
      "percent": 0.5,
      "positions": 2
    }
  },
  "positions": {
    "active": [
      {
        "id": "position-20250519-aapl-001",
        "symbol": "AAPL",
        "direction": "long|short",
        "entry": {
          "price": 150.50,
          "time": "2025-05-19T14:30:00Z",
          "size": 100,
          "sizing_rule": "Full position based on conviction"
        },
        "current": {
          "price": 152.75,
          "pnl": 225.00,
          "pnl_percent": 1.5,
          "size": 75,
          "time": "2025-05-19T15:45:00Z"
        },
        "risk": {
          "stop": 147.50,
          "initial_risk": 300.00,
          "current_risk": 393.75
        },
        "targets": [
          {"price": 155.00, "status": "active", "size_pct": 25},
          {"price": 160.00, "status": "pending", "size_pct": 50},
          {"price": null, "status": "pending", "size_pct": 25, "trailing": true}
        ],
        "status": "active",
        "setup": "pullback",
        "tags": ["dp-idea", "high-conviction"],
        "plan_alignment": {
          "aligned": true,
          "deviations": [],
          "idea_id": "idea-20250519-aapl-long-01"
        },
        "history": [
          {
            "action": "created",
            "time": "2025-05-19T14:30:00Z",
            "details": "Initial position creation"
          },
          {
            "action": "partial-exit",
            "time": "2025-05-19T15:45:00Z",
            "details": "Exited 25% at 155.00 (target hit)"
          }
        ]
      }
    ],
    "closed": [/* similar structure */]
  },
  "session": {
    "id": "session-20250519",
    "phase": "premarket|intraday|postmarket",
    "plan_created": true,
    "plan_version": 2,
    "active_positions": 1,
    "closed_positions": 0
  }
}
```

## File-Level Schema Embedding

For key files, the schema will be integrated as follows:

### A. Morning Call Processor (analyze-dp.md)

```markdown
---
id: analyze-dp
title: Morning Call Processor
description: Analyzes DP morning call transcripts to extract actionable trading information
author: Intent Trader Team
version: 0.2.0
release: 0.5.1
created: 2025-05-15
updated: 2025-05-20
category: premarket
status: stable
tags: [premarket, analysis, dp, morning-call]
requires: [system/schemas/trading-intent.json]
outputs: [market, trade_ideas, levels]
input_format: text
output_format: json
ai_enabled: true
---

# Morning Call Processor

This prompt analyzes DP morning call transcripts to extract structured data following the unified Trading Intent Schema. It identifies market context, focus trade ideas, and key technical levels.

## Processing Requirements

1. All output must strictly conform to the Trading Intent Schema
2. Extract market framework information: regime, bias, catalysts
3. Identify trade ideas with conviction classification
4. Structure all information in schema-compliant format
5. Include full source attribution
6. Maintain confidence scoring throughout

## Example Schema-Compliant Output:

```json
{
  "$schema": "https://intent-trader.mvp/schemas/v1/trading-intent.json",
  "version": "1.0",
  "meta": {
    "source": "dp",
    "timestamp": "2025-05-19T08:30:00Z",
    "update_type": "full"
  },
  "market": {
    "framework": {
      "bias": "bullish",
      "volatility": "normal"
    }
  },
  "trade_ideas": {
    "primary": [
      {
        "ticker": "AAPL",
        "direction": "long",
        "conviction": {
          "level": "high",
          "confidence": 0.85,
          "source": "dp",
          "phrases": ["I really like AAPL here"]
        },
        "entry": { /* schema-compliant structure */ }
      }
    ]
  }
}
```
```

### B. Trade Plan Generator (create-plan.md)

```markdown
---
id: create-plan
title: Generate Unified Trade Plan
description: Creates a comprehensive trade plan following the unified schema
author: Intent Trader Team
version: 0.2.0
release: 0.5.1
created: 2025-05-15
updated: 2025-05-20
category: focus
status: stable
tags: [focus, plan, strategy]
requires: [system/schemas/trading-intent.json]
outputs: [complete_trading_intent]
input_format: json
output_format: json
ai_enabled: true
---

# Unified Trade Plan Generator

This component generates a comprehensive trade plan following the unified Trading Intent Schema. It integrates information from multiple analysts, prioritizes opportunities, and creates a structured plan for the trading day.

## Schema-Compliant Processing

All operations must strictly adhere to the Trading Intent Schema:

1. Process input data already in schema-format
2. Merge information from multiple sources if available
3. Generate a complete plan with all schema sections
4. Apply consistent ranking and prioritization
5. Include full source attribution
6. Maintain confidence scoring throughout

## Example Schema-Compliant Output:

```json
{
  "$schema": "https://intent-trader.mvp/schemas/v1/trading-intent.json",
  "version": "1.0",
  "meta": {
    "source": "combined",
    "timestamp": "2025-05-19T09:15:00Z"
  },
  "market": { /* Complete market section */ },
  "trade_ideas": {
    "primary": [ /* Prioritized ideas */ ],
    "secondary": [ /* Secondary ideas */ ],
    "watchlist": [ /* Watchlist items */ ]
  },
  "risk_management": { /* Risk parameters */ },
  "session": { /* Session state */ }
}
```
```

### C. Unified Morning Preparation Command (morning-prep.md)

```markdown
---
id: morning-prep
title: Unified Morning Preparation
description: Process morning analysis and create unified trade plan with incremental update support
author: Intent Trader Team
version: 1.0.0
release: 0.5.1
created: 2025-05-20
updated: 2025-05-20
category: plan
status: stable
tags: [plan, preparation, dp, mancini, unified]
requires: [system/schemas/trading-intent.json, prompts/plan/analyze-dp.md, prompts/plan/analyze-mancini.md, prompts/focus/create-plan.md]
outputs: [complete_trading_intent]
input_format: mixed
output_format: markdown
ai_enabled: true
---

# Unified Morning Preparation

This command orchestrates the entire morning preparation workflow with support for both complete and incremental processing. It handles DP transcripts, Mancini summaries, or both, and creates a comprehensive trade plan following the unified Trading Intent Schema.

## Command Syntax

```
/morning-prep [--dp=transcript] [--mancini=summary] [--update]
```

## Processing Logic

1. For each provided source:
   - Process using appropriate analyzer
   - Validate output against Trading Intent Schema
   - Store in session state with timestamp and hash

2. If update flag is present:
   - Load existing plan from state
   - Compare new source data with previous
   - Identify changes and additions
   - Merge with existing plan

3. Create unified plan:
   - Combine all available sources
   - Resolve conflicts using source confidence
   - Generate complete plan following schema
   - Calculate change indicators for reporting

4. Generate visual output:
   - Format complete plan as readable markdown
   - Highlight all changes and additions
   - Provide key plan components
   - Show source attribution

## Schema-Compliance Requirements

All operations must strictly adhere to the Trading Intent Schema:
1. Process using schema-native analyzers
2. Validate all intermediary results
3. Generate schema-compliant unified plan
4. Store with full schema validation

## Example Usage

```
/morning-prep --dp="Futures are higher today..." --update
```

## Expected Output

```markdown
# Morning Preparation Updated (v2) - May 19, 2025

## Market Framework
- **Regime**: Bullish-Continuation
- **Mode**: Mode 2 (80% confidence)
- **Primary Bias**: Neutral to Bullish above 5905, Bearish below ⬆️

## Top Trade Ideas (Ranked by Conviction)
| # | Ticker | Direction | Entry Zone | Confidence | Setup | Notes |
|---|--------|-----------|------------|------------|-------|-------|
| 1 | AMD    | Long      | 108 (10d MA) | High     | Pullback | "I'm a big buyer" -DP |
| 2 | AMZN   | Long      | 199 (200d MA) | High    | Support Test | Swing trade |
| 3 | SPX    | Long      | 5905 reclaim | High    | FB Reclaim | Mancini key level ✨NEW |
```
```

## Conclusion: Deep Schema Integration

By implementing the unified Trading Intent Schema directly into all system files, we'll achieve:

1. **True Data Consistency** - Every component speaks the same language natively
2. **Elimination of Translation Layers** - No adapters or transformations required
3. **Complete Data Lineage** - Full attribution and traceability throughout the system
4. **Built-in Validation** - Schema constraints enforced at every stage
