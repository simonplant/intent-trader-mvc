# Intent Trader: Cognitive Architecture Refactor

## Target Directory Structure

```
.
├── INSTALL.md                          # Entry point (simplified)
├── README.md                          # User guide
├── changelog.md
├── tree.txt
│
├── system/
│   ├── cognitive/                      # NEW: Cognitive Architecture Core
│   │   ├── intent-router.md           # Natural language → workflow routing
│   │   ├── orchestrator.md            # Workflow execution engine
│   │   ├── context-manager.md         # Session & conversation state
│   │   └── reliability-monitor.md     # Self-healing & validation
│   │
│   ├── schemas/                        # NEW: Single source of truth
│   │   ├── trading-intent.schema.json # Canonical data schema
│   │   ├── workflow.schema.json       # Workflow definition schema
│   │   └── validation-rules.json      # Centralized validation
│   │
│   ├── workflows/                      # NEW: Declarative workflows (YAML)
│   │   ├── morning-analysis.yaml      # DP call → plan workflow
│   │   ├── mancini-analysis.yaml      # Newsletter → strategy workflow
│   │   ├── position-management.yaml   # Trade execution workflows
│   │   └── session-review.yaml        # Post-market analysis workflow
│   │
│   └── knowledge/                      # NEW: Domain expertise (self-contained)
│       ├── dp-patterns.md             # DP-specific trading knowledge
│       ├── mancini-setups.md          # Mancini methodology
│       ├── risk-frameworks.md         # Risk management principles
│       └── setup-taxonomy.md          # Standardized setup classifications
│
├── tools/                             # RENAMED: Your existing prompts as tools
│   ├── analysis/
│   │   ├── analyze-dp.md              # DP morning call processor
│   │   ├── analyze-mancini.md         # Mancini newsletter processor
│   │   └── chart-analysis.md          # Chart pattern analysis
│   │
│   ├── planning/
│   │   ├── create-plan.md             # Unified plan generator
│   │   ├── extract-focus.md           # High-conviction idea extractor
│   │   └── extract-levels.md          # Technical level extractor
│   │
│   ├── execution/
│   │   ├── size-position.md           # Position sizing calculator
│   │   └── add-position.md            # Position tracker
│   │
│   ├── management/
│   │   ├── list-positions.md          # Position dashboard
│   │   ├── update-position.md         # Position updates
│   │   └── close-position.md          # Position closer
│   │
│   └── review/
│       └── log-session.md             # Session logger
│
├── state/                             # Current state (minimal changes)
│   ├── session-context.json          # NEW: Conversation context
│   ├── my-positions.json              # Existing (schema-compliant)
│   ├── moderator-positions.json       # Existing (schema-compliant)
│   └── current-plan.json              # Existing (schema-compliant)
│
├── docs/                              # Simplified documentation
│   ├── cognitive-architecture.md      # NEW: How the system works
│   ├── workflow-guide.md              # NEW: Available workflows
│   └── user-guide.md                  # How to use the system
│
└── logs/                              # Execution logs (unchanged)
    └── [execution logs]
```

## Key Architecture Changes

### 1. Cognitive Core (`system/cognitive/`)

**Intent Router** - Natural language understanding:
```markdown
# system/cognitive/intent-router.md
ROLE: Parse natural trading language into structured workflows

INPUT: "Analyze this DP call and create my trading plan"
OUTPUT: {
  "workflow": "morning-analysis",
  "context": "premarket",
  "inputs": {"transcript": "..."},
  "confidence": 0.95
}
```

**Orchestrator** - Workflow execution:
```markdown
# system/cognitive/orchestrator.md  
ROLE: Execute multi-step trading workflows reliably

CAPABILITIES:
- Load workflow definitions from system/workflows/
- Execute tools in dependency order
- Validate outputs between steps
- Maintain context across execution
- Handle errors gracefully
```

### 2. Single Source of Truth (`system/schemas/`)

**Canonical Schema** - All data structures:
```json
{
  "trading-intent.schema.json": {
    "TradePosition": { "symbol": "string", "direction": "enum" },
    "TradePlan": { "focusIdeas": "array", "levels": "object" },
    "WorkflowResult": { "status": "enum", "data": "object" }
  }
}
```

**Workflow Schema** - How workflows are defined:
```json
{
  "workflow.schema.json": {
    "steps": [
      {
        "tool": "analyze-dp",
        "requires": ["transcript"],
        "produces": ["market-context", "focus-ideas"],
        "validation": "dp-analysis-schema"
      }
    ]
  }
}
```

### 3. Declarative Workflows (`system/workflows/`)

**Morning Analysis Workflow**:
```yaml
# system/workflows/morning-analysis.yaml
workflow: morning-analysis
description: Process analyst calls into trading plan
context: premarket
steps:
  - tool: analyze-dp
    requires: [transcript]
    produces: [market-context, focus-ideas, levels]
    validation: dp-analysis-schema
  - tool: create-plan
    requires: [market-context, focus-ideas, levels]  
    produces: [unified-plan]
    validation: trade-plan-schema
reliability: high
```

### 4. Domain Knowledge (`system/knowledge/`)

**DP Trading Patterns** - Self-contained expertise:
```markdown
# system/knowledge/dp-patterns.md
CONVICTION SIGNALS:
- "love this" → focus-trade conviction
- "very bullish" → high conviction
- "interesting" → medium conviction

SETUP DETECTION:
- "bull flag" + price levels → continuation setup
- "failed breakdown" → reversal opportunity
- "day after trade" → event-driven setup
```

### 5. Tools (Existing Prompts) (`tools/`)

Your existing prompts become specialized tools:
- Organized by cognitive function (analysis, planning, execution, etc.)
- Each tool focuses on single responsibility
- Tools are called by orchestrator, not directly by users
- Maintain existing functionality, just better organized

## User Interaction Flow

### Before (Command-based):
```
User: /analyze-dp [transcript]
User: /create-plan  
User: /size-position AAPL long...
```

### After (Intent-based):
```
User: "Analyze this DP call and create my trading plan for today"
System: Executing morning-analysis workflow...
        ✓ Analyzing DP transcript
        ✓ Extracting focus ideas  
        ✓ Creating unified plan
        
User: "Size a position for AAPL long at 225.50 with stop at 223.80"
System: Executing position-sizing workflow...
        ✓ Calculating optimal size
        ✓ Risk analysis complete
```

## Migration Strategy

### Phase 1: Cognitive Infrastructure
1. Create `system/cognitive/` components
2. Create `system/schemas/` with canonical schema
3. Create basic `system/workflows/` definitions

### Phase 2: Knowledge Extraction  
1. Extract domain knowledge from existing prompts
2. Create `system/knowledge/` files
3. Simplify prompts to focus on execution only

### Phase 3: Tool Migration
1. Move prompts to `tools/` with simplified interfaces
2. Update prompts to use canonical schema
3. Test workflow orchestration

### Phase 4: User Experience
1. Implement natural language intent parsing
2. Create seamless workflow execution
3. Retire old command structure

## Benefits of This Architecture

1. **Ultra-Low Maintenance**: 
   - Single schema source
   - Self-contained knowledge files
   - Declarative workflows

2. **Cognitive Intelligence**:
   - Natural language interaction
   - Context-aware execution
   - Self-healing reliability

3. **Best Practices**:
   - Schema-driven validation
   - Separation of concerns
   - Domain expertise isolation

4. **Reliability**:
   - Deterministic workflow execution
   - Graceful error handling
   - Output validation

This cognitive architecture transforms Intent Trader from a command-driven system into an intelligent trading assistant that understands natural language and orchestrates complex workflows automatically.