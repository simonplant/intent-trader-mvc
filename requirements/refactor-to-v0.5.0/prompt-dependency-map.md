# prompt-dependency-map.md

---
title: Intent Trader Prompt Dependency Map
version: 1.1.0
created: 2025-05-13
last_updated: 2025-05-13
author: Claude & Simon
status: active
priority: medium
---

# Intent Trader Prompt Dependency Map

This document maps the dependencies between prompts, schemas, and system components to ensure proper implementation order and integration.

## 1. Dependency Visualization

```
┌─────────────────────┐
│ Schema Foundation   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Registry System     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Blueprint Structure │◄────┐
└──────────┬──────────┘     │
           │                │
           ▼                │
┌─────────────────────┐     │
│ Morning Blueprint   │     │
└──────────┬──────────┘     │
           │                │
           ▼                │
┌─────────────────────┐     │
│ Status Framework    │     │
└──────────┬──────────┘     │
           │                │
           ▼                │
┌─────────────────────┐     │
│ Status Update       │     │
└──────────┬──────────┘     │
           │                │
           ▼                │
┌─────────────────────┐     │
│ Cognitive Framework │     │
└──────────┬──────────┘     │
           │                │
           ▼                │
┌─────────────────────┐     │
│ Cognitive Reset     │     │
└──────────┬──────────┘     │
           │                │
           ▼                │
┌─────────────────────┐     │
│ Technical Framework │     │
└──────────┬──────────┘     │
           │                │
           ▼                │
┌─────────────────────┐     │
│ Chart Analysis      │─────┘
└─────────────────────┘
```

## 2. File Dependencies in Detail

### Foundation Components

| Component | Dependencies | Required By | Data Flow |
|-----------|--------------|-------------|-----------|
| `metadata.schema.json` | None | All markdown files | `metadata.schema.json` → validation → all front matter |
| `blueprint.schema.json` | `metadata.schema.json` | Blueprint files and prompts | `blueprint.schema.json` → validation → blueprint objects |
| `status.schema.json` | `metadata.schema.json` | Status tracking files and prompts | `status.schema.json` → validation → status update objects |
| `cognitive-load.schema.json` | `metadata.schema.json` | Cognitive framework files and prompts | `cognitive-load.schema.json` → validation → cognitive state objects |
| `registry.js` | All schema files | System orchestration | Schema files → `registry.js` → `prompt-registry.json` |

### Blueprint System

| Component | Dependencies | Required By | Data Flow |
|-----------|--------------|-------------|-----------|
| `blueprints/structure.md` | `metadata.schema.json`, `blueprint.schema.json` | Morning blueprint prompt | Structure definition → blueprint generation |
| `blueprints/generation.md` | `blueprints/structure.md` | Morning blueprint prompt | Market data → generation process → blueprint object |
| `blueprints/adaptation.md` | `blueprints/structure.md` | Blueprint update prompt | Market changes → adaptation rules → updated blueprint |
| `extraction-source-map.json` | None | Blueprint generation process | Source documents → extraction map → structured data |
| `prompts/premarket/morning-blueprint.md` | Blueprint framework components | Status update, Intraday processes | Market data → morning blueprint → trading plan |

### Status Tracking

| Component | Dependencies | Required By | Data Flow |
|-----------|--------------|-------------|-----------|
| `status-tracking/framework.md` | `metadata.schema.json`, `status.schema.json` | Status update prompt | Status definition → status tracking |
| `status-tracking/transitions.md` | `status-tracking/framework.md` | Status update prompt | Current status → transition rules → new status |
| `workflows/status-update-cycle.md` | `status-tracking/framework.md` | Intraday workflow | Market events → update cycle → status updates |
| `prompts/intraday/status-update.md` | Status framework components | Cognitive reset, Blueprint update | Trade situation → status update → status object |

### Cognitive Framework

| Component | Dependencies | Required By | Data Flow |
|-----------|--------------|-------------|-----------|
| `cognitive/state-tracking.md` | `metadata.schema.json`, `cognitive-load.schema.json` | Cognitive prompts | Trader inputs → state tracking → cognitive state |
| `cognitive/load-calculation.md` | `cognitive/state-tracking.md` | Cognitive reset prompt | Cognitive factors → load calculation → load metric |
| `cognitive/adaptation-matrix.md` | `cognitive/state-tracking.md` | Blueprint adaptation | Cognitive state + market → matrix → adaptation |
| `protocols/cognitive-reset.md` | Cognitive framework components | Cognitive reset prompt | Overload indicators → reset protocol → restored state |
| `prompts/intraday/cognitive-reset.md` | Cognitive framework components | Intraday workflow | Cognitive issues → reset prompt → recovery steps |

### Technical Framework

| Component | Dependencies | Required By | Data Flow |
|-----------|--------------|-------------|-----------|
| `technical-framework/pattern-recognition.md` | `metadata.schema.json` | Chart analysis prompt | Chart data → pattern recognition → identified patterns |
| `technical-framework/mancini-integration.md` | `technical-framework/pattern-recognition.md` | Mancini chart map prompt | Market structure → Mancini rules → level maps |
| `technical-framework/level-significance.md` | `technical-framework/pattern-recognition.md` | Chart analysis prompt | Price levels → significance rules → ranked levels |
| `prompts/premarket/mancini-chart-map.md` | Technical framework components | Morning blueprint | Chart data → Mancini mapping → level significance |
| `prompts/intraday/chart-analysis.md` | Technical framework components | Status update | Price action → chart analysis → pattern recognition |

## 3. Implementation Phase Dependencies

### Phase 1: Foundation
**Must be completed before any other phase**
- All schema files
- Registry system

### Phase 2: Blueprint System
**Depends on:** Phase 1
**Required for:** Phases 3-5
- Blueprint structure
- Blueprint generation
- Morning blueprint prompt

### Phase 3: Status Tracking
**Depends on:** Phases 1-2
**Required for:** Phases 4-5
- Status framework
- Status update prompt

### Phase 4: Cognitive Framework
**Depends on:** Phases 1-3
**Required for:** Full system functionality
- Cognitive tracking
- Cognitive reset prompt

### Phase 5: Technical Framework
**Depends on:** Phases 1-4
**Required for:** Complete trading functionality
- Technical analysis
- Chart analysis prompt

## 4. Prompt Chains in Trading Workflow

### Premarket Workflow

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  Market Context │      │  Technical Level │      │  Previous Day   │
│  Information    │──────▶  Analysis       │──────▶  Review         │
└────────┬────────┘      └────────┬────────┘      └────────┬────────┘
         │                        │                        │
         │                        │                        │
         └────────────────┬───────┴────────────────┬──────┘
                          │                        │
                          ▼                        ▼
                   ┌─────────────────┐     ┌─────────────────┐
                   │ Morning Blueprint│     │ Mancini Chart   │
                   │ Generation      │────▶│ Mapping         │
                   └────────┬────────┘     └────────┬────────┘
                            │                       │
                            │                       │
                            ▼                       ▼
                   ┌─────────────────┐     ┌─────────────────┐
                   │ Trading Plan    │     │ Visualized      │
                   │ Document        │◀────│ Chart Levels    │
                   └─────────────────┘     └─────────────────┘
```

1. **Gather Market Context**
   - Input: Previous day information, overnight developments
   - Output: Market context summary
   - Data Flow: Raw information → contextual analysis → structured context

2. **Generate Morning Blueprint**
   - Input: Market context, technical levels
   - Process: `prompts/premarket/morning-blueprint.md`
   - Output: Complete trading blueprint with levels and setups
   - Data Flow: Context + levels → blueprint prompt → trading plan

3. **Map Mancini Levels**
   - Input: Morning blueprint
   - Process: `prompts/premarket/mancini-chart-map.md`
   - Output: Mancini framework levels mapped to chart
   - Data Flow: Blueprint levels → Mancini framework → mapped chart

### Intraday Workflow

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  Market Movement│      │  Current Chart   │      │  Trader State   │
│  & Price Action │──────▶  Pattern         │──────▶  Assessment     │
└────────┬────────┘      └────────┬────────┘      └────────┬────────┘
         │                        │                        │
         │                        │                        │
         └────────────────┬───────┴────────────────┬──────┘
                          │                        │
                          ▼                        ▼
                   ┌─────────────────┐     ┌─────────────────┐
                   │ Status Update   │     │ Cognitive Load  │
                   │ Process         │────▶│ Calculation     │
                   └────────┬────────┘     └────────┬────────┘
                            │                       │
                            │                       │
                            ▼                       ▼
                   ┌─────────────────┐     ┌─────────────────┐
                   │ Status Transition│    │ Cognitive Reset │
                   │ Decision        │◀───│ (if needed)     │
                   └────────┬────────┘    └─────────────────┘
                            │
                            │
                            ▼
                   ┌─────────────────┐     ┌─────────────────┐
                   │ Updated Status  │     │ Blueprint       │
                   │ Object          │────▶│ Adaptation      │
                   └─────────────────┘     └─────────────────┘
```

1. **Update Trade Status**
   - Input: Current market conditions, active trades
   - Process: `prompts/intraday/status-update.md`
   - Output: Updated status with categorization
   - Data Transformation: Market data + trade state → status prompt → status object

2. **Analyze Chart Patterns**
   - Input: Current chart, technical levels
   - Process: `prompts/intraday/chart-analysis.md`
   - Output: Pattern recognition with significance
   - Data Transformation: Chart data → pattern analysis → identified patterns

3. **Cognitive Reset (When Needed)**
   - Input: Cognitive state indicators
   - Process: `prompts/intraday/cognitive-reset.md`
   - Output: Reset procedure and verification
   - Data Transformation: Cognitive indicators → reset protocol → restored state

4. **Update Blueprint (When Needed)**
   - Input: Status updates, market changes
   - Process: `prompts/intraday/blueprint-update.md`
   - Output: Adapted blueprint with updated scenarios
   - Data Transformation: Status changes + market data → adaptation rules → updated blueprint

## 5. Critical Integration Points

These integration points require special attention during implementation:

1. **Blueprint → Status**
   - Blueprint setups must be trackable in status framework
   - Status transitions must reference blueprint levels and setups
   - **Data Structure Transformation**: 
     ```
     Blueprint.setup → { 
       id: string,
       levels: Array<Level>,
       conditions: Conditions,
       significance: number
     } → Status.watchingItem
     ```

2. **Status → Cognitive**
   - Status patterns should trigger cognitive state assessment
   - Cognitive state affects status update frequency and detail
   - **Data Structure Transformation**:
     ```
     Status.transitions → {
       frequency: number,
       complexity: number,
       emotionalImpact: number
     } → CognitiveLoad.factors
     ```

3. **Cognitive → Blueprint**
   - Cognitive load affects blueprint complexity and detail
   - Blueprint adaptation must consider cognitive state
   - **Data Structure Transformation**:
     ```
     CognitiveState.load → {
       simplificationLevel: number,
       prioritization: Array<string>,
       focusAreas: Array<string>
     } → Blueprint.adaptationRules
     ```

4. **Technical → Blueprint**
   - Technical patterns must map to blueprint scenarios
   - Blueprint levels must align with technical significance taxonomy
   - **Data Structure Transformation**:
     ```
     TechnicalPattern → {
       type: string,
       significance: number,
       reliability: number,
       levels: Array<Level>
     } → Blueprint.scenario
     ```

## 6. Implementation Validation Points

| Component Integration | Validation Criteria | Test Method | Expected Output Transformation |
|-----------------------|--------------------|------------|--------------------------------|
| Blueprint + Status | Setup from blueprint tracked in status | Generate blueprint, create status update | Blueprint.setup → Status.watchingItem |
| Status + Cognitive | Cognitive state reflected in status update | Simulate cognitive state, update status | CognitiveState → Status.updateFrequency |
| Cognitive + Blueprint | Blueprint adapts to cognitive load | Simulate high load, verify blueprint simplification | CognitiveLoad.HIGH → Blueprint.simplification |
| Technical + Blueprint | Technical patterns trigger blueprint scenarios | Analyze chart, verify blueprint activation | TechnicalPattern → Blueprint.scenario |

## 7. Data Structure Transformations

This section details how data structures transform as they flow through the system:

### Market Data → Blueprint
```json
// Input: Market Context
{
  "previousClose": 4500.25,
  "overnightRange": [4490.50, 4510.75],
  "keyEvents": ["Fed announcement", "Earnings"],
  "gapDirection": "up",
  "preMarketVolume": "moderate"
}

// Output: Blueprint Object
{
  "date": "2025-05-13",
  "marketContext": {
    "previousClose": 4500.25,
    "gapDirection": "up",
    "keyEvents": ["Fed announcement", "Earnings"]
  },
  "levels": [
    {"price": 4510.75, "type": "resistance", "significance": 8},
    {"price": 4500.25, "type": "pivot", "significance": 9},
    {"price": 4490.50, "type": "support", "significance": 7}
  ],
  "setups": [
    {
      "id": "gapFillLong",
      "conditions": "Gap up with moderate pre-market volume",
      "entry": 4495.50,
      "targets": [4500.25, 4510.75],
      "stop": 4490.50,
      "timeWindow": "First hour"
    }
  ],
  "scenarios": {
    "bullish": "Break above 4510.75 targets 4525",
    "bearish": "Break below 4490.50 targets 4475",
    "neutral": "Range between 4490.50-4510.75"
  }
}
```

### Blueprint → Status
```json
// Blueprint Setup
{
  "id": "gapFillLong",
  "conditions": "Gap up with moderate pre-market volume",
  "entry": 4495.50,
  "targets": [4500.25, 4510.75],
  "stop": 4490.50,
  "timeWindow": "First hour"
}

// Status Object
{
  "id": "trade-001",
  "setupId": "gapFillLong",
  "status": "WATCHING",
  "currentPrice": 4493.75,
  "entryDistance": 1.75,
  "entryConditionsMet": false,
  "nextActions": [
    "Monitor price approach to 4495.50",
    "Check volume confirmation"
  ],
  "notes": "Waiting for entry conditions, volume needs to confirm"
}
```

### Status → Cognitive
```json
// Status Transitions (multiple in short period)
[
  {
    "id": "trade-001",
    "oldStatus": "WATCHING",
    "newStatus": "PENDING",
    "timestamp": "2025-05-13T09:32:15Z"
  },
  {
    "id": "trade-002",
    "oldStatus": "WATCHING",
    "newStatus": "INVALIDATED",
    "timestamp": "2025-05-13T09:33:05Z"
  },
  {
    "id": "trade-003",
    "oldStatus": "PENDING",
    "newStatus": "ACTIVE",
    "timestamp": "2025-05-13T09:34:22Z"
  }
]

// Cognitive Load Factors
{
  "decisionFrequency": "HIGH",
  "contextSwitching": "HIGH",
  "emotionalImpact": "MODERATE",
  "cognitiveLoadScore": 8.2,
  "attentionAllocation": {
    "trade-003": 0.6,
    "market-monitoring": 0.3,
    "other": 0.1
  },
  "resetRecommended": true
}
```

### Cognitive → Blueprint Adaptation
```json
// Cognitive State (High Load)
{
  "load": 8.2,
  "attentionAllocation": {
    "trade-003": 0.6,
    "market-monitoring": 0.3,
    "other": 0.1
  },
  "decisionQuality": "DEGRADED",
  "focusAreas": ["trade-003", "key-levels"],
  "distractions": ["multiple-setups", "news-events"]
}

// Blueprint Adaptation
{
  "simplificationLevel": 2,
  "focusPriorities": ["trade-003", "key-levels"],
  "filteredSetups": ["primary-only"],
  "levelDisplay": "essential-only",
  "scenarioDetail": "simplified"
}
```
