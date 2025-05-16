# Mancini Integration Plan for Intent Trader v0.5.2

This document outlines the strategic plan for integrating Adam Mancini's ES Futures analysis methodology into the Intent Trader system for the upcoming v0.5.2 release. This integration will complement the existing DP analysis to provide a comprehensive trading framework covering both futures and equities.

## 1. Integration Objectives

The Mancini integration aims to achieve these key objectives:

1. **Enhanced Futures Coverage**: Add comprehensive ES/SPX futures analysis
2. **Market Mode Framework**: Incorporate Mode 1 vs. Mode 2 classification
3. **Failed Breakdown Methodology**: Implement Mancini's specialized FB setup detection
4. **Level-to-Level Approach**: Integrate precise level-based trading strategies
5. **Runner Management**: Implement systematic runner management protocols
6. **Unified Planning**: Create integrated DP + Mancini trading plan approach

## 2. Key Components

### 2.1 Primary Components

| Component | Description | Priority | Status |
|-----------|-------------|----------|--------|
| `/analyze-mancini` | Core newsletter analyzer | High | Planned for v0.5.2 |
| `/manage-runner` | Runner position management | High | Planned for v0.5.2 |
| `/detect-mode` | Market mode detection | Medium | Planned for v0.5.2 |
| `/check-acceptance` | Level acceptance verification | Medium | Future v0.6.0 |
| `/find-setups` | Dedicated setup scanner | Low | Future v0.6.0 |

### 2.2 Integration Points

| Existing Component | Mancini Integration Points | Status |
|--------------------|----------------------------|--------|
| `/create-plan` | Incorporate FB setups, market mode, ES/SPX levels | Planned |
| `/extract-levels` | Add ES/SPX level framework with significance | Planned |
| `/extract-focus` | Include FB setups in prioritization | Planned |
| `/size-position` | Add ES futures-specific sizing | Planned |
| `/log-session` | Add FB and ES futures performance tracking | Planned |

## 3. Implementation Approach

### 3.1 Data Model Enhancements

The implementation will require these key data model enhancements:

```json
// Level Framework Enhancement
"levelFramework": {
  "es": {
    "keyDecisionPoint": "number",
    "support": [...],
    "resistance": [...],
    "zones": [...]
  }
}

// Failed Breakdown Setup Type
"failedBreakdownSetup": {
  "level": "number",
  "index": "string",
  "direction": "string",
  "condition": "string",
  "targetLevel": "number",
  "stopReference": "number"
}

// Market Mode Classification
"marketMode": {
  "mode": "Mode 1/Mode 2",
  "modeSignals": ["string"],
  "character": "string",
  "tradingImplications": ["string"]
}

// Runner Management Protocol
"runnerManagement": {
  "currentRunners": [...],
  "trailStrategy": "string",
  "stopAdjustmentRules": ["string"]
}
```

### 3.2 Implementation Timeline

| Phase | Timeline | Components | Status |
|-------|----------|------------|--------|
| Design | Week 1 | Data model definitions, interface planning | Not Started |
| Implementation | Week 2-3 | `/analyze-mancini`, `/manage-runner` | Not Started |
| Integration | Week 4 | Connect with existing components | Not Started |
| Testing | Week 5 | End-to-end validation, real-world testing | Not Started |
| Release | Week 6 | v0.5.2 deployment | Not Started |

## 4. Mancini-Specific Methodologies

### 4.1 Failed Breakdown (FB) Setup Taxonomy

Mancini's FB setup follows this precise definition:

1. **Identification**: Key level breaks to the downside but quickly reclaims
2. **Entry Trigger**: Price reclaims the level from below
3. **Stop Placement**: Below minor support after reclaim
4. **Target**: Previous resistance or next technical level
5. **Timeframe**: Typically intraday, occasionally multi-day

Implementation will include:
- Automated FB pattern recognition
- Parameter extraction (level, stop, target)
- Confidence scoring based on context

### 4.2 Market Mode Framework

Mancini's mode framework distinguishes between:

**Mode 1 (Trend Day)**
- Characteristics: Directional with minimal countertrend moves
- Strategy: Alignment with trend, larger positions, wider stops
- Management: Trail stops behind significant swing highs/lows
- Identification Signals: Sector alignment, volume expansion, breadth thrust

**Mode 2 (Range/Trap Day)**
- Characteristics: Range-bound with false breakouts
- Strategy: Fade extremes, smaller positions, tighter stops
- Management: Take profits at range boundaries
- Identification Signals: Sector rotation, volume contraction, negative breadth divergence

Implementation will include:
- Mode detection algorithm
- Mode-specific trading parameters
- Mode transition detection

### 4.3 Level-to-Level Trading Approach

Mancini employs a precise level-to-level methodology:

1. **Level Hierarchy**: Major, Significant, Minor, Intraday
2. **Entry Types**: Level defense, level failure, level acceptance
3. **Exit Framework**: Level-based targets, trailing stops on extension
4. **Acceptance Criteria**: Time-based, volume-based, price action-based

Implementation will include:
- Level hierarchical classification
- Level relationships and interactions
- Acceptance detection algorithms

### 4.4 Runner Management Protocol

Mancini's runner protocol follows these principles:

1. **Trail Types**: Fixed-point, percentage-based, structure-based
2. **Adjustment Triggers**: Time-based, extension-based, volatility-based
3. **Scaling Framework**: Systematic scaling at technical targets

Implementation will include:
- Trail stop calculation algorithms
- Dynamic adjustment based on volatility
- Target extension frameworks

## 5. Integration Challenges & Solutions

| Challenge | Solution Approach | Priority |
|-----------|-------------------|----------|
| Varying newsletter formats | Flexible extraction patterns | High |
| ES to SPX mapping consistency | Configurable offset parameter | High |
| Futures-specific terminology | Specialized classification logic | Medium |
| Harmonizing with DP methodology | Level mapping and significance alignment | High |
| Mode transition detection | Multiple confirmation requirements | Medium |

## 6. Testing Methodology

Testing will focus on these key areas:

1. **Pattern Recognition**: Accuracy of FB setup identification
2. **Level Extraction**: Precision of level structure with significance
3. **Mode Detection**: Reliability of Mode 1 vs. Mode 2 classification
4. **Integration Testing**: Seamless workflow with existing components
5. **Performance Analysis**: Runner management effectiveness

## 7. User Experience Considerations

The integration will focus on these UX elements:

1. **Unified Planning**: Consistent trade plan format incorporating both analysts
2. **Clear Mode Signaling**: Explicit mode classification with implications
3. **Setup Prioritization**: Integrated ranking of DP and FB setups
4. **Context Preservation**: Maintaining analyst-specific terminology while standardizing framework
5. **Level Visualization**: Unified level structure with source attribution

## 8. Future Roadmap

After the v0.5.2 integration, future enhancements will include:

1. **Multi-Analyst Confluence**: Identify setup agreement across analysts
2. **Historical Pattern Library**: Build catalog of successful FB executions
3. **Real-Time Mode Updates**: Intraday mode transition detection
4. **Advanced Runner Protocols**: Implement dynamic trailer algorithms
5. **Algorithm Refinement**: Improve setup precision and level significance accuracy

## 9. Key Performance Indicators

The integration success will be measured by:

1. **FB Setup Win Rate**: Percentage of successful FB trade executions
2. **Mode Detection Accuracy**: Percentage of correctly identified market modes
3. **Level Precision**: Accuracy of extracted level vs. actual price interaction
4. **Runner Performance**: Improvement in runner profit optimization
5. **User Adoption**: Usage metrics for Mancini-specific components

## 10. Implementation Notes

This integration represents a significant enhancement to Intent Trader's capabilities, particularly in futures trading and market mode classification. The Failed Breakdown methodology and level-to-level approach provide powerful complements to DP's stock-specific analysis.

The v0.5.2 implementation will focus on core functionality, with more advanced features planned for subsequent releases.