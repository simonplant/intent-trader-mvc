---
title: Chart Visual Legend Integration Guide
description: Comprehensive implementation guide for using the chart visual legend across the entire trading workflow
tags: [system, chart, technical, visualization]
author: Simon Plant
last_updated: 2025-05-13
version: 1.0
category: system
usage: Reference for integrating the chart visual legend throughout the entire trading workflow. Follow these procedures to ensure consistent chart interpretation.
status: active
requires: [chart-visual-legend.md, trading-system-sop.md]
linked_outputs: [status-update.md, trade-plan.md]
input_format: markdown
output_format: markdown
ai_enabled: false
---

# Chart Visual Legend Integration Guide

This document outlines the comprehensive implementation strategy for integrating the chart visual legend (chart-visual-legend.md) across your entire trading workflow. The chart visual legend provides a standardized framework for interpreting all ThinkOrSwim charts, making it an essential reference for all technical analysis.

## Daily Integration Points

### 1. Morning Preparation (5:00 AM - 7:00 AM PT)

#### Chart Setup Verification
- [ ] Confirm all charts display correct MA colors according to legend:
  - Cyan = 8 SMA
  - Green/Yellow/Red "Traffic Light" = 21 SMA
  - Mid Blue = 34 SMA
  - Navy Blue = 50 SMA
  - Orange = 100 SMA
  - Red = 200 SMA
- [ ] Verify pivot point visualization (dotted horizontal lines)
- [ ] Confirm VWAP and AVWAP display correctly
- [ ] Ensure Keltner Channels (grey bands) are properly configured

#### Initial Chart Pattern Recognition
- [ ] Identify current MA alignment patterns for key indices:
  - Stacked Bullish/Bearish configurations
  - Recent or pending crosses
  - MA compression/expansion areas
- [ ] Document "Traffic Light" 21 SMA status for watchlist stocks
- [ ] Note price position relative to MA sequence for priority securities
- [ ] Identify VWAP relationships across watchlist

#### Technical Analysis Integration
- [ ] Apply chart-based level hierarchy to all price levels:
  1. Major Pivots
  2. 200 SMA
  3. Anchored VWAP
  4. 100/50 SMAs
  5. Daily VWAP
  6. 34/21/8 SMAs
  7. Pivot Points
  8. Round Numbers
- [ ] When evaluating DP's ideas, correlate with current chart patterns
- [ ] When reviewing Mancini's analysis, map to specific MA levels and patterns
- [ ] Document convergence between fundamental analysis and chart patterns

### 2. Trade Plan Creation (6:30 AM - 7:00 AM PT)

#### Chart Pattern Section
- [ ] Add dedicated "Technical Structure" section to trade plan:
  ```
  ## Technical Structure (Chart Legend Analysis)
  
  ### Index MA Patterns
  - SPX: [8/21/34/50/100/200 SMA relationship] → [Current pattern] → [Implications]
  - QQQ: [8/21/34/50/100/200 SMA relationship] → [Current pattern] → [Implications]
  - IWM: [8/21/34/50/100/200 SMA relationship] → [Current pattern] → [Implications]
  
  ### Key Level Interactions
  - Recently Tested: [Levels with recent interaction]
  - Currently Testing: [Levels currently being challenged]
  - Next Targets: [Approaching significant levels]
  
  ### MA Traffic Light Status
  - GREEN (Price > 8 & 21): [List securities]
  - YELLOW (Price between): [List securities]
  - RED (Price < 8 & 21): [List securities]
  
  ### Pattern Watch
  - Potential Bull Crosses: [List securities]
  - Potential Bear Crosses: [List securities]
  - MA Compression Areas: [List securities]
  - MA Expansion Developing: [List securities]
  ```

#### Trade Setup Enhancement
- [ ] For each trade idea, document relevant chart patterns:
  ```
  [TICKER] [DIRECTION]: [Setup description]
  - MA Context: [Current MA relationship]
  - Key Level: [Nearest significant level]
  - VWAP Status: [Relationship to VWAP]
  - Pattern Confirmation: [Required pattern validation]
  ```

### 3. Intraday Monitoring (7:00 AM - 1:00 PM PT)

#### Chart Pattern Evolution Tracking
- [ ] Monitor changes in MA relationships during session
- [ ] Document pattern transitions (e.g., stacked bullish → compression)
- [ ] Track price interaction with key MAs
- [ ] Note when securities change "Traffic Light" status

#### Status Updates
- [ ] Incorporate chart pattern context in all status updates:
  ```
  ### ALREADY TRIGGERED (ACTIVE TRADES)
  1. **[TICKER] [DIRECTION]** - [Brief status update]
     - Entry: [Price/Time]
     - Current: [Price/P&L]
     - MA Context: [Current MA relationship]
     - Chart Pattern: [Current pattern from legend]
     - Level Context: [Key level interaction]
     - *Action*: [Recommended action]
  ```

#### Chart-Based Reorientation
- [ ] During disorientation, use chart legend as primary reference
- [ ] Generate MA pattern summary for quick reorientation
- [ ] Use standardized pattern recognition to regain context
- [ ] Apply level hierarchy to prioritize focus

### 4. Post-Market Analysis (1:00 PM - 2:00 PM PT)

#### Pattern Effectiveness Review
- [ ] Document which MA patterns were most predictive
- [ ] Evaluate level hierarchy effectiveness
- [ ] Track pattern transitions throughout session
- [ ] Note correlation between pattern recognition and trade outcomes

#### Chart Configuration Updates
- [ ] Update any chart studies based on performance data
- [ ] Adjust visual indicators if needed
- [ ] Prepare charts for next day's session
- [ ] Document any changes to chart configuration

## Chart Legend Implementation

### 1. Physical Reference Tools

#### Quick Reference Card
Create a physical reference card (4x6 inch) containing:
- MA color codes with descriptions
- Pattern recognition examples
- Level hierarchy list
- Common chart patterns visualization

#### Monitor Setup
- Place chart legend reference in visible location near trading screens
- Consider second monitor dedicated to pattern recognition
- Create custom ThinkorSwim layout with legend reference panel

### 2. Digital Integration

#### Chart Legend Command
Implement a `/chart-legend` command with the following parameters:
```
/chart-legend
Type: [MA, Pivot, VWAP, Patterns, All]
Context: [Current Symbol]
```

#### Pattern Database
Create a structured database of patterns:
```json
{
  "pattern_name": "Stacked Bullish",
  "description": "8 > 21 > 34 > 50 > 100 > 200",
  "indication": "Strong uptrend",
  "effectiveness_rating": 4.8,
  "best_timeframe": "Daily",
  "confirmation_requirements": ["Volume above average", "RSI > 50"],
  "example_images": ["stacked_bullish_example1.png", "stacked_bullish_example2.png"]
}
```

#### Automated Pattern Recognition
Develop automated recognition for common patterns:
- MA alignment detection
- Price-MA relationship classification
- VWAP relationship categorization
- Level interaction identification

### 3. Training Workflow

#### Pattern Recognition Practice
- Set aside 15 minutes daily for pattern recognition practice
- Review historical charts with known outcomes
- Document pattern effectiveness
- Track improvement in pattern identification speed

#### "Verbalization Practice"
- Verbally describe chart patterns out loud
- Force specific terminology from chart legend
- Time how quickly patterns can be identified
- Document improvement in pattern recognition

## Integration with Current Workflow

### 1. Data Collection
- When receiving morning call transcript, immediately pull up charts
- Document MA patterns for mentioned securities
- Note convergence between verbal commentary and chart patterns
- Create standardized note template with chart pattern fields

### 2. Trade Evaluation
- Score potential trades partly based on chart pattern alignment
- Prioritize setups with strong pattern confirmation
- Apply level hierarchy to determine entry/exit points
- Document pattern-based criteria for trade decisions

### 3. Position Management
- Use MA pattern evolution to guide position management
- Set alerts for pattern transitions
- Document when price approaches key MA levels
- Track effectiveness of MA-based exits

### 4. Recovery Protocol
When feeling disoriented during trading:
1. Pull up chart legend reference
2. Focus on current MA patterns for active trades
3. Generate pattern summary for key indices
4. Reorient using level hierarchy
5. Verbalize current patterns out loud

## Pattern Analysis Framework

### 1. MA Alignment Patterns
Standardized identification framework:

| Pattern | Configuration | Entry Strategy | Exit Strategy |
|---------|--------------|--------------|--------------|
| **Stacked Bullish** | 8 > 21 > 34 > 50 > 100 > 200 | Buy pullbacks to 8/21 | Trail stop below 21 SMA |
| **Stacked Bearish** | 8 < 21 < 34 < 50 < 100 < 200 | Short rallies to 8/21 | Trail stop above 21 SMA |
| **Bull Cross** | Faster MA crosses above slower MA | Buy first pullback after cross | Exit at next resistance |
| **Bear Cross** | Faster MA crosses below slower MA | Short first rally after cross | Exit at next support |
| **MA Compression** | Multiple MAs converging | Wait for breakout direction | Trail in breakout direction |
| **MA Expansion** | MAs spreading apart | Trade in direction of expansion | Trail stop behind fast MA |

### 2. Price-MA Relationships
Standardized decision framework:

| Relationship | Description | Long Strategy | Short Strategy |
|--------------|-------------|---------------|----------------|
| **Price > All MAs** | Price trading above all moving averages | Buy pullbacks to 8 SMA | Avoid shorts |
| **Price < All MAs** | Price trading below all moving averages | Avoid longs | Short rallies to 8 SMA |
| **Price between 8-21** | Price between 8-21 SMAs | Watch for reclaim of 8 | Watch for breakdown below 21 |
| **Price between 21-50** | Price between 21-50 SMAs | Buy reclaim of 21 | Short failure at 21 |
| **Price between 50-200** | Price between 50-200 SMAs | Buy reclaim of 50 | Short failure at 50 |

### 3. VWAP Relationships
Standardized interpretation framework:

| Relationship | Description | Intraday Implication |
|--------------|-------------|---------------------|
| **Price > VWAP** | Price above daily VWAP | Bullish intraday bias |
| **Price < VWAP** | Price below daily VWAP | Bearish intraday bias |
| **Price = VWAP** | Price testing VWAP | Decision point |
| **VWAP + AVWAP Convergence** | VWAP approaching AVWAP | Major decision zone |
| **Price Above VWAP, Below AVWAP** | Between daily and anchored | Mixed bias |

## Implementation Checklist

### Day 1
- [ ] Print physical chart legend reference card
- [ ] Review current chart configuration against legend
- [ ] Update all chart studies to match legend specifications
- [ ] Practice basic pattern recognition on historical charts
- [ ] Create basic note template with pattern fields

### Week 1
- [ ] Incorporate chart pattern analysis in morning preparation
- [ ] Add technical structure section to trade plan
- [ ] Practice verbalization of chart patterns
- [ ] Document pattern evolution during trading sessions
- [ ] Begin tracking pattern effectiveness

### Month 1
- [ ] Develop comprehensive pattern database
- [ ] Create automated pattern recognition tools
- [ ] Refine decision framework based on pattern performance
- [ ] Integrate pattern analysis into all status updates
- [ ] Document correlation between patterns and trade outcomes

## CHANGELOG

- v1.0 (2025-05-13): Initial implementation of the Chart Visual Legend Integration Guide
