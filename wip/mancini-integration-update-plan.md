# Mancini Integration: Command System Update Plan

## Overview
This document outlines the complete implementation plan for integrating the `/analyze-mancini` command into the Intent Trader system according to the Command Routes Update SOP. This integration will focus on analyzing Mancini's ES Futures newsletters and handling the chat length constraints through a two-step delegation process.

## 1. Documentation Updates

### 1.1 docs/command-reference-comprehensive.md
- Update status to change from "FUTURE" to "MVP CORE" for v0.5.2
- Update parameter descriptions and example output
- Ensure alignment with implementation details

### 1.2 system/commands.md
- Add `/analyze-mancini` to the "Upcoming Commands (v0.5.2)" section
- Include brief description and example usage

## 2. Implementation Creation

### 2.1 prompts/plan/analyze-mancini.md
- Create implementation file with standardized front matter
- Implement two-step processing approach:
  1. **Step 1:** Delegation to separate chat instance for processing large newsletters
  2. **Step 2:** Integration of processed results into the main system
- Include detailed processing logic, param validation, and error handling

### 2.2 state/mancini-analysis.json
- Create new state file to store processed Mancini analysis
- Define schema compatible with existing level framework
- Ensure compatibility with other components like `extract-levels` and `create-plan`

## 3. Routing System Integration

### 3.1 system/runtime/command-map.md
- Add entry for `/analyze-mancini` command
- Include phase, description, required parameters, file path

### 3.2 system/runtime/plugin-registry.json
- Add entry for analyze-mancini plugin
- Include dependencies on market-regimes.md, extract-levels.md, etc.

### 3.3 system/runtime/validator.md
- Add validation rules for mancini newsletter parameters
- Include size limitations and handling guidelines

## 4. Two-Step Processing Implementation

### 4.1 Step 1: Delegation Process
- Create clear instructions for delegating newsletter processing
- Define input format and expected output structure
- Provide sample newsletter excerpts for testing

### 4.2 Step 2: Integration Process
- Define process for integrating analyzed results
- Create validation for returned analysis
- Implement error handling for incomplete or invalid results

## 5. Testing Strategy

- Test with sample newsletters of varying lengths
- Verify delegation process functions correctly
- Confirm integration with other components works as expected
- Validate output format matches required structure

## 6. Documentation Finalization

- Update README.md to include the new Mancini analysis capability
- Create usage examples and workflow integration demonstrations
- Document the two-step process for handling large newsletters

---

# Detailed Implementation Files

## 1. Two-Step Delegation Process

### Step 1: Newsletter Pre-Processing Prompt

```
# Mancini Newsletter Pre-Processing Task

## Context
I'm working with the Intent Trader system, which needs to analyze Adam Mancini's ES Futures newsletters. Due to the length of these newsletters (often 25+ pages), I need to preprocess them in a separate chat before integrating the results into my main system.

## Request
Please analyze the following Mancini newsletter excerpt and extract the following components:

1. Market Mode Assessment (Mode 1/trending vs. Mode 2/range)
2. ES and SPX price levels (support/resistance)
3. Failed Breakdown (FB) setups
4. Bull/Bear case scenarios
5. Runner management guidance
6. Trading strategy guidance

## Newsletter Content:
[PASTE NEWSLETTER HERE]

## Desired Output Format
Please provide the analysis in this structured JSON format:

```json
{
  "marketAssessment": {
    "mode": "Mode 1/Mode 2",
    "timeframe": "intraday/daily/weekly",
    "directionalBias": "bullish/bearish/neutral",
    "volatilityExpectation": "high/medium/low",
    "keyCharacteristic": "string",
    "contextNotes": "string"
  },
  "levelFramework": {
    "es": {
      "keyDecisionPoint": "number",
      "support": [
        {
          "price": "number",
          "type": "major/significant/minor",
          "significance": "number (1-10)",
          "notes": "string"
        }
      ],
      "resistance": [
        {
          "price": "number",
          "type": "major/significant/minor",
          "significance": "number (1-10)",
          "notes": "string"
        }
      ],
      "zones": [
        {
          "name": "string",
          "min": "number",
          "max": "number",
          "type": "string",
          "significance": "number (1-10)"
        }
      ]
    },
    "spx": {
      // Same structure as ES
    }
  },
  "failedBreakdowns": [
    {
      "level": "number",
      "index": "ES/SPX",
      "direction": "long/short",
      "condition": "string",
      "targetLevel": "number",
      "stopReference": "number",
      "timeWindow": "string",
      "probability": "high/medium/low",
      "notes": "string"
    }
  ],
  "scenarios": {
    "bullCase": {
      "trigger": "string",
      "targets": ["number"],
      "keyLevels": ["number"],
      "probability": "number (percentage)",
      "conditions": ["string"]
    },
    "bearCase": {
      "trigger": "string",
      "targets": ["number"],
      "keyLevels": ["number"],
      "probability": "number (percentage)",
      "conditions": ["string"]
    }
  },
  "runnerManagement": {
    "currentRunners": [
      {
        "entry": "number",
        "currentStop": "number",
        "recommendedStop": "number",
        "target": "number",
        "notes": "string"
      }
    ],
    "trailStrategy": "string",
    "stopAdjustmentRules": ["string"],
    "managementNotes": "string"
  },
  "tradingStrategy": {
    "tradingApproach": "string",
    "keySetups": ["string"],
    "timeframeAlignment": "string",
    "volatilityApproach": "string",
    "riskParameters": {
      "stopPlacement": "string",
      "positionSizing": "string",
      "keyRisks": ["string"]
    },
    "focusAreas": ["string"]
  }
}
```

Focus particularly on accurately extracting Failed Breakdown setups, market mode, and level framework, as these are the key components for integration with the Intent Trader system.
```

### Step 2: Integration Implementation

The main `analyze-mancini.md` file will handle:
1. Taking the preprocessed JSON from Step 1
2. Validating the structure
3. Enhancing it with additional context
4. Integrating with the level framework and market regime system
5. Storing in the appropriate state for use by other commands

## 2. prompts/plan/analyze-mancini.md

```
---
id: analyze-mancini
title: Mancini Newsletter Analyzer
description: Processes Mancini's newsletter to extract levels, setups, and trading plan
author: Intent Trader Team
version: 0.5.2-preview
release: 0.5.2
created: 2025-05-16
updated: 2025-05-16
category: plan
status: planned
tags: [plan, mancini, es-futures, levels, failed-breakdown, mode]
requires: [prompts/focus/market-regimes.md, prompts/focus/extract-levels.md, prompts/focus/conviction-classifier.md, prompts/focus/create-plan.md]
outputs: [manciniAnalysis]
input_format: text
output_format: json
ai_enabled: true
---

# Mancini Newsletter Analyzer

## Purpose

The Mancini Newsletter Analyzer processes Adam Mancini's ES Futures newsletter to extract key trading components, with a focus on Failed Breakdown opportunities and market mode assessment. It transforms Mancini's narrative analysis into structured data that can be integrated with the broader Intent Trader system.

Due to the length of typical Mancini newsletters (often 25+ pages), this component implements a two-step process:
1. **Preprocessing Step:** Delegate the initial analysis to a separate chat instance
2. **Integration Step:** Process the results and integrate with the system

This approach allows the system to handle newsletters of any length while maintaining analysis quality.

## Input Parameters

- `newsletter` (required): Complete text of Mancini's newsletter OR preprocessed JSON from Step 1
- `preprocessed` (optional): Boolean indicating if input is already preprocessed (default: false)
- `components` (optional): Specific components to focus on (default: all)
  - Supported values: "levels", "mode", "failed-breakdowns", "scenarios", "runners"
- `format` (optional): Output format (default: structured)
  - Supported values: "json", "markdown", "summary"

## Two-Step Processing Guide

### Step 1: Newsletter Preprocessing

Due to chat length constraints, lengthy newsletters should be preprocessed in a separate chat instance:

1. Start a new chat with Claude and provide the preprocessing prompt:
   ```
   # Mancini Newsletter Pre-Processing Task
   
   ## Context
   I'm working with the Intent Trader system, which needs to analyze Adam Mancini's ES Futures newsletters. Due to the length of these newsletters (often 25+ pages), I need to preprocess them in a separate chat before integrating the results into my main system.
   
   ## Request
   Please analyze the following Mancini newsletter excerpt and extract the following components:
   
   1. Market Mode Assessment (Mode 1/trending vs. Mode 2/range)
   2. ES and SPX price levels (support/resistance)
   3. Failed Breakdown (FB) setups
   4. Bull/Bear case scenarios
   5. Runner management guidance
   6. Trading strategy guidance
   
   ## Newsletter Content:
   [PASTE NEWSLETTER HERE]
   
   ## Desired Output Format
   Please provide the analysis in JSON format with the following structure:
   [Include the expected JSON structure]
   ```

2. Copy the JSON output from the preprocessing chat

### Step 2: Integration with Intent Trader

1. Use the `/analyze-mancini` command with the preprocessed JSON:
   ```
   /analyze-mancini preprocessed=true [PASTE PREPROCESSED JSON]
   ```

2. The system validates, enhances, and integrates the preprocessed data

## Processing Logic

The analyzer employs these key processing components:

### 1. Input Validation and Preprocessing

```javascript
function validateInput(input) {
  if (!input || (!input.newsletter && !input.preprocessedData)) {
    throw new Error("Missing required input: newsletter or preprocessed data");
  }

  // Extract and normalize parameters
  const {
    newsletter,
    preprocessed = false,
    components = ["all"],
    format = "structured"
  } = input;

  // Validate components
  const validComponents = ["levels", "mode", "failed-breakdowns", "scenarios", "runners", "all"];
  const requestedComponents = components.filter(c => validComponents.includes(c));
  
  if (requestedComponents.length === 0) {
    requestedComponents.push("all");
  }

  // Validate format
  const validFormats = ["json", "markdown", "summary", "structured"];
  const outputFormat = validFormats.includes(format) ? format : "structured";

  return {
    newsletter,
    preprocessed,
    requestedComponents,
    outputFormat
  };
}

function preprocessInput(input) {
  // If already preprocessed, parse the JSON
  if (input.preprocessed) {
    try {
      return JSON.parse(input.newsletter);
    } catch (error) {
      throw new Error("Invalid preprocessed data: Unable to parse JSON");
    }
  }

  // If not preprocessed, provide guidance for the two-step process
  return {
    error: "Newsletter too long for direct processing",
    message: "Please use the two-step process described in the documentation",
    steps: [
      "1. Use a separate chat instance with Claude to preprocess the newsletter",
      "2. Copy the JSON output and use /analyze-mancini with preprocessed=true"
    ]
  };
}
```

### 2. Market Mode Integration

Integrates with the market-regimes.md system to determine current market mode:

```javascript
function integrateMarketMode(preprocessedData) {
  // Extract market mode data
  const modeData = preprocessedData.marketAssessment;
  
  // Check against market regimes classification
  let regimeType = "";
  
  if (modeData.mode === "Mode 1") {
    regimeType = "Trending Up";
    if (modeData.directionalBias === "bearish") {
      regimeType = "Trending Down";
    }
  } else {
    regimeType = "Choppy / Rangebound";
    
    // Check for other regime signals
    if (modeData.volatilityExpectation === "high") {
      regimeType = "Event-Driven / Volatile";
    } else if (modeData.keyCharacteristic.toLowerCase().includes("squeeze")) {
      regimeType = "Squeeze or Short-Covering Rally";
    } else if (modeData.keyCharacteristic.toLowerCase().includes("consolidation")) {
      regimeType = "Consolidation (Base-Building)";
    } else if (modeData.keyCharacteristic.toLowerCase().includes("distribution")) {
      regimeType = "Distribution (Top-Building)";
    }
  }
  
  // Enhance with market regime data
  return {
    ...modeData,
    regimeType,
    regimeImplications: getRegimeImplications(regimeType)
  };
}

function getRegimeImplications(regimeType) {
  // Return trading implications based on market regime
  const implications = {
    "Trending Up": [
      "Focus on FB longs and Breakout Pullbacks",
      "Larger position sizing",
      "Wider stops acceptable",
      "Trail winners actively"
    ],
    "Trending Down": [
      "Focus on Breakdown + Backtest shorts",
      "Reduced size for longs (25-50%)",
      "Tighter stops for long positions",
      "Avoid long breakouts"
    ],
    "Choppy / Rangebound": [
      "Focus on range boundary trades",
      "Reduced position sizing (25-50%)",
      "Quick exits, tight stops",
      "Take profits at range extremes"
    ],
    // Other regime implications...
  };
  
  return implications[regimeType] || [];
}
```

### 3. Level Framework Integration

Integrates with the extract-levels.md system to enhance level analysis:

```javascript
function integrateLevelFramework(preprocessedData) {
  // Extract level data
  const levelData = preprocessedData.levelFramework;
  
  // Enhance ES levels with additional context
  const enhancedES = enhanceLevels(levelData.es);
  
  // Enhance SPX levels with additional context
  const enhancedSPX = enhanceLevels(levelData.spx);
  
  return {
    es: enhancedES,
    spx: enhancedSPX
  };
}

function enhanceLevels(indexLevels) {
  // Add additional context to support/resistance levels
  const enhancedSupport = indexLevels.support.map(level => ({
    ...level,
    testHistory: extractTestHistory(level.notes),
    context: extractContext(level.notes)
  }));
  
  const enhancedResistance = indexLevels.resistance.map(level => ({
    ...level,
    testHistory: extractTestHistory(level.notes),
    context: extractContext(level.notes)
  }));
  
  // Enhance zones with additional context
  const enhancedZones = indexLevels.zones.map(zone => ({
    ...zone,
    context: getZoneContext(zone)
  }));
  
  return {
    ...indexLevels,
    support: enhancedSupport,
    resistance: enhancedResistance,
    zones: enhancedZones
  };
}

function extractTestHistory(notes) {
  // Extract test history from level notes
  const testHistory = [];
  
  if (notes.toLowerCase().includes("trap")) {
    testHistory.push("trapped traders");
  }
  
  if (notes.toLowerCase().includes("test")) {
    testHistory.push("previously tested");
  }
  
  if (notes.toLowerCase().includes("multiple")) {
    testHistory.push("multiple tests");
  }
  
  return testHistory;
}

function extractContext(notes) {
  // Extract and enhance context from level notes
  return notes;
}

function getZoneContext(zone) {
  // Generate context description for zones
  return `${zone.type} zone between ${zone.min} and ${zone.max}`;
}
```

### 4. Failed Breakdown Enhancement

Enhances Failed Breakdown setups with additional context and parameters:

```javascript
function enhanceFailedBreakdowns(preprocessedData) {
  // Extract Failed Breakdown setups
  const failedBreakdowns = preprocessedData.failedBreakdowns;
  
  // Enhance each FB setup with additional context
  return failedBreakdowns.map(fb => ({
    ...fb,
    confidence: calculateFBConfidence(fb),
    managementProtocol: getFBManagementProtocol(fb),
    historicalContext: getHistoricalContext(fb)
  }));
}

function calculateFBConfidence(fb) {
  // Calculate confidence score based on setup quality
  let confidence = 0.7; // Base confidence
  
  // Adjust based on level significance
  if (fb.level && fb.stopReference) {
    const riskSize = Math.abs(fb.level - fb.stopReference);
    const riskPercentage = riskSize / fb.level;
    
    if (riskPercentage < 0.005) {
      confidence += 0.1; // Tight stop = higher confidence
    }
  }
  
  // Adjust based on probability assessment
  if (fb.probability === "high") {
    confidence += 0.1;
  } else if (fb.probability === "low") {
    confidence -= 0.1;
  }
  
  return Math.min(0.95, Math.max(0.5, confidence));
}

function getFBManagementProtocol(fb) {
  // Generate management protocol for FB setup
  return [
    `Enter above ${fb.level} after reclaim`,
    `Initial stop below ${fb.stopReference || 'latest low'}`,
    `Take 75% profits at ${fb.targetLevel}`,
    `Trail remainder using 75/15/10 rule`
  ];
}

function getHistoricalContext(fb) {
  // Provide historical context for this type of setup
  return "Failed Breakdowns are Mancini's core setup, with high probability when properly executed";
}
```

### 5. Result Integration and State Management

Integrates the enhanced analysis with the system state:

```javascript
function integrateResults(enhancedData) {
  // Format results based on requested components and format
  return {
    marketAssessment: enhancedData.marketMode,
    levelFramework: enhancedData.levelFramework,
    failedBreakdowns: enhancedData.failedBreakdowns,
    scenarios: enhancedData.scenarios,
    runnerManagement: enhancedData.runnerManagement,
    tradingStrategy: enhancedData.tradingStrategy,
    metadata: {
      newsletterDate: enhancedData.metadata?.newsletterDate || new Date().toISOString().split('T')[0],
      processingTime: new Date().toISOString(),
      analysisVersion: "0.5.2-preview",
      components: enhancedData.requestedComponents,
      tradingSession: determineTradingSession(enhancedData)
    }
  };
}

function determineTradingSession(data) {
  // Determine if analysis is for current or next trading session
  if (data.tradingStrategy && data.tradingStrategy.tradingApproach.toLowerCase().includes("tomorrow")) {
    return "next_day";
  }
  
  return "regular";
}

function saveToState(analysisResult) {
  // Save analysis to state for use by other commands
  return {
    status: "success",
    message: "Mancini analysis saved to state",
    data: analysisResult
  };
}

```

### 6. Main Processing Function

The main function orchestrates the entire analysis process:

```javascript
function analyzeMancini(input) {
  try {
    // Validate input
    const validatedInput = validateInput(input);
    
    // Preprocess newsletter or parse preprocessed data
    const preprocessedData = preprocessInput(validatedInput);
    
    // If error during preprocessing, return guidance
    if (preprocessedData.error) {
      return preprocessedData;
    }
    
    // Integrate with market regimes
    const enhancedMarketMode = integrateMarketMode(preprocessedData);
    
    // Integrate with level framework
    const enhancedLevelFramework = integrateLevelFramework(preprocessedData);
    
    // Enhance Failed Breakdown setups
    const enhancedFailedBreakdowns = enhanceFailedBreakdowns(preprocessedData);
    
    // Integrate scenarios, runner management, and trading strategy
    const enhancedScenarios = preprocessedData.scenarios;
    const enhancedRunnerManagement = preprocessedData.runnerManagement;
    const enhancedTradingStrategy = preprocessedData.tradingStrategy;
    
    // Assemble enhanced analysis
    const enhancedAnalysis = {
      marketMode: enhancedMarketMode,
      levelFramework: enhancedLevelFramework,
      failedBreakdowns: enhancedFailedBreakdowns,
      scenarios: enhancedScenarios,
      runnerManagement: enhancedRunnerManagement,
      tradingStrategy: enhancedTradingStrategy,
      requestedComponents: validatedInput.requestedComponents,
      metadata: preprocessedData.metadata || {}
    };
    
    // Integrate results and save to state
    const result = integrateResults(enhancedAnalysis);
    saveToState(result);
    
    // Return formatted result
    return formatOutput(result, validatedInput.outputFormat);
  } catch (error) {
    return {
      error: error.message,
      metadata: {
        processingTime: new Date().toISOString(),
        status: "error"
      }
    };
  }
}

function formatOutput(result, format) {
  if (format === "markdown") {
    return convertToMarkdown(result);
  } else if (format === "summary") {
    return createSummary(result);
  }
  
  // Default: return structured JSON
  return result;
}

function convertToMarkdown(result) {
  // Convert JSON structure to readable markdown
  // [Implementation details...]
}

function createSummary(result) {
  // Create a condensed summary of key points
  // [Implementation details...]
}
```

## Example Usage

### Step 1: Preprocess Newsletter in Separate Chat

```
/preprocess-mancini "4 Green Days In A Row. Can SPX Close Week With 5, Or Are Bulls Out Of Steam? May 16 Plan

MAY 16, 2025 ∙ PAID
Everyday since the market bottomed on April 6th, I've began this newsletter in a similar way. While I am a day trader, its essential to know the broad regime the market is in (buy dips? or sell bounces?) This is critical to know even as a day trader, because the #1 source losses for new ES traders is counter-trending it when it is in "buy dips mode".

There is not a market on earth or in history more unforgiving to shorts and everyday since April 6th, I've made it clear that ES is firmly in buy dips mode.

For the last week, the more moderated dip buying we saw for the month after April 6th went parabolic. I've also discussed at length that institutions buy dips in a particular way. They put in my core setup, the Failed Breakdown, whereby they flush a major low, trap shorts, recover the low, then squeeze.

FAILED BREAKDOWN WATCH:
- ES 5900: Watch for drop below then reclaim for potential long to 5945+
- SPX 5920: Corresponding SPX level for FB setup

SCENARIOS:
Bull Case: Break above 5970 targets 6000+, probability 60%
Bear Case: Break below 5880 that holds targets 5850, then potentially 5800, probability 40%

For runner management, if you have any ES longs from yesterday:
- Raise stops to 5880
- Consider trailing 15-20 points below price if we break 5970

Today's trading strategy: Be patient for range resolution. Wait for Failed Breakdown setups or clean breaks with acceptance. Size appropriately for the current higher volatility environment."
```

### Step 2: Integrate Preprocessed Data

```
/analyze-mancini preprocessed=true {"marketAssessment":{"mode":"Mode 2","timeframe":"intraday","directionalBias":"neutral-to-bearish","volatilityExpectation":"high","keyCharacteristic":"Consolidation in bull flag pattern","contextNotes":"Awaiting range resolution"},...}
```

## Integration with Other Commands

The Mancini Newsletter Analyzer integrates with:

1. **Market Regimes Framework** (`market-regimes.md`) for mode classification
2. **Level Extraction** (`extract-levels.md`) for level framework integration
3. **Conviction Classification** (`conviction-classifier.md`) for setup assessment
4. **Unified Trade Plan** (`create-plan.md`) for plan integration

The analysis is cached to state for use by other commands, particularly the `/create-plan` command, which can integrate insights from both DP and Mancini.

## Error Handling

The implementation includes comprehensive error handling:

1. **Newsletter Too Long**: Provides guidance for the two-step process
2. **Invalid Preprocessed Data**: Validates JSON structure and provides helpful error messages
3. **Missing Components**: Gracefully handles missing sections in the newsletter
4. **Integration Errors**: Falls back to preprocessed data if enhancement fails

## Limitations and Edge Cases

1. **Multi-Day Analysis**: For newsletters covering multiple trading days, focuses on the most imminent session
2. **Non-Standard Format**: May require manual preprocessing for highly unconventional newsletter formats
3. **Cross-Analyst Integration**: May have different terminology than DP analysis, requiring normalization

## Future Enhancements (v0.6.0+)

1. **Automated Delegation**: Direct handling of lengthy newsletters without manual steps
2. **Historical Pattern Matching**: Comparing current setups to historical examples
3. **Real-Time Updates**: Support for intraday updates to level structure
4. **Multi-Analyst Confluence**: Advanced integration with DP analysis for setup agreement
5. **Character Change Detection**: Enhanced recognition of market character shifts
```

## 3. system/runtime/command-map.md Update

```
| Command | Description | Phase | Required Parameters | File Path |
|---------|-------------|-------|---------------------|-----------|
| ... (existing commands) ... |
| `/analyze-mancini` | Process Mancini newsletter to extract levels, setups, and trading plan | plan | `newsletter` | prompts/plan/analyze-mancini.md |
```

## 4. system/runtime/plugin-registry.json Update

```json
{
  "id": "analyze-mancini",
  "type": "command",
  "version": "0.5.2-preview",
  "entryPoint": "prompts/plan/analyze-mancini.md",
  "phase": "plan",
  "dependsOn": [
    "market-regimes",
    "extract-levels",
    "conviction-classifier",
    "create-plan"
  ]
}
```

## 5. system/commands.md Update

Add to the "Upcoming Commands (v0.5.2)" section:

```markdown
### Upcoming Commands (v0.5.2)

#### `/analyze-mancini [newsletter]`
Process Mancini newsletter to extract levels, setups, and trading plan.

**Usage**: `/analyze-mancini [newsletter text]` or `/analyze-mancini preprocessed=true [preprocessed JSON]`

For lengthy newsletters, use the two-step process:
1. Preprocess in a separate chat following the documentation
2. Use the preprocessed result with the `preprocessed=true` parameter
```

## 6. Documentation Update Template

Create a new documentation file `docs/mancini-two-step-process.md`:

```markdown
# Mancini Newsletter Analysis: Two-Step Process

## Overview
Due to the length of Adam Mancini's ES Futures newsletters (often 25+ pages), analyzing them requires a two-step process to handle chat length constraints. This document outlines the complete process for analyzing Mancini newsletters in Intent Trader.

## Step 1: Preprocess the Newsletter

1. **Start a new chat** with Claude or your preferred AI assistant
2. **Copy the preprocessing prompt** below
3. **Paste the Mancini newsletter** into the prompt
4. **Get the structured JSON output**

### Preprocessing Prompt Template

```
# Mancini Newsletter Pre-Processing Task

## Context
I'm working with the Intent Trader system, which needs to analyze Adam Mancini's ES Futures newsletters. Due to the length of these newsletters (often 25+ pages), I need to preprocess them in a separate chat before integrating the results into my main system.

## Request
Please analyze the following Mancini newsletter excerpt and extract the following components:

1. Market Mode Assessment (Mode 1/trending vs. Mode 2/range)
2. ES and SPX price levels (support/resistance)
3. Failed Breakdown (FB) setups
4. Bull/Bear case scenarios
5. Runner management guidance
6. Trading strategy guidance

## Newsletter Content:
[PASTE NEWSLETTER HERE]

## Desired Output Format
Please provide the analysis in this structured JSON format:

[JSON Structure Template - See analyze-mancini.md for complete format]
```

## Step 2: Integrate with Intent Trader

1. **Copy the JSON output** from the preprocessing chat
2. **Run the analyze-mancini command** with the preprocessed flag:
   ```
   /analyze-mancini preprocessed=true [PASTE JSON HERE]
   ```
3. **Use the results** with other commands like `/create-plan`

## Key Components Extracted

The analyzer focuses on these critical elements from Mancini's analysis:

1. **Market Mode**: Mode 1 (trending) vs. Mode 2 (range/trap)
2. **Level Framework**: Structured ES/SPX support and resistance levels
3. **Failed Breakdown Setups**: Mancini's core trading setup
4. **Bull/Bear Scenarios**: Conditional market outcomes
5. **Runner Management**: Position management protocols

## Integration with Other Commands

The processed Mancini analysis can be used with:

- `/create-plan sources=both` - Create unified plan with both DP and Mancini
- `/extract-levels mancini` - Extract just the level framework
- `/detect-mode` - Use Mancini's mode assessment

## Example

### Preprocessing Result (Sample)

```json
{
  "marketAssessment": {
    "mode": "Mode 2",
    "timeframe": "intraday",
    "directionalBias": "neutral-to-bearish",
    "volatilityExpectation": "high",
    "keyCharacteristic": "Consolidation in bull flag pattern",
    "contextNotes": "Awaiting range resolution"
  },
  "levelFramework": {
    "es": {
      "keyDecisionPoint": 5925,
      "support": [
        {
          "price": 5900,
          "type": "major",
          "significance": 8,
          "notes": "major level that has trapped several times now"
        },
        {
          "price": 5880,
          "type": "minor",
          "significance": 5,
          "notes": "minor support"
        }
      ],
      "resistance": [
        {
          "price": 5945,
          "type": "minor",
          "significance": 6,
          "notes": "secondary resistance"
        },
        {
          "price": 5970,
          "type": "major",
          "significance": 9,
          "notes": "major level, measured move target if we break out"
        }
      ]
    }
  },
  "failedBreakdowns": [
    {
      "level": 5900,
      "index": "ES",
      "direction": "long",
      "condition": "drop below then reclaim",
      "targetLevel": 5945,
      "stopReference": 5880,
      "timeWindow": "intraday",
      "probability": "high",
      "notes": "Watch for drop below then reclaim for potential long to 5945+"
    }
  ]
}
```
```

---

## Implementation Steps

1. Create `prompts/plan/analyze-mancini.md` with the implementation above
2. Update `system/runtime/command-map.md` to include the new command
3. Update `system/runtime/plugin-registry.json` to register the plugin
4. Update `system/commands.md` with command documentation
5. Create documentation for the two-step process
6. Update README.md to mention the new capability
7. Test the implementation with sample newsletters

## Testing Process

1. Test with short newsletter excerpts for direct processing
2. Test the preprocessing step with lengthy newsletters
3. Test integration of preprocessed data
4. Verify integration with other commands (create-plan, extract-levels)
5. Test with different newsletter formats and styles

## Integration Timeline

- Day 1: Create implementation files and update routing
- Day 2: Test and refine the two-step process
- Day 3: Integrate with other commands and finalize documentation
- Day 4: Final system testing and release preparation
