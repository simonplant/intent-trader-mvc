---
id: analyze-mancini
title: Mancini Newsletter Analyzer
description: Processes Mancini's newsletter to extract levels, setups, and trading plan
author: Intent Trader Team
version: 0.2.2
release: 0.5.2
created: 2025-05-16
updated: 2025-05-16
category: plan
status: stable
tags: [plan, mancini, es-futures, levels, failed-breakdown, mode]
requires: [prompts/focus/market-regimes.md, prompts/focus/extract-levels.md, prompts/focus/conviction-classifier.md, prompts/focus/create-plan.md, prompts/plan/analyze-mancini-preprocessor.md]
outputs: [manciniAnalysis]
input_format: json
output_format: json
ai_enabled: true
---

# Mancini Newsletter Analyzer

This component processes Adam Mancini's ES Futures newsletter to extract key levels, setups, and trading strategies, with a focus on Failed Breakdown opportunities and market mode assessment. It works with preprocessed data to handle newsletters of any length.

## Purpose

The Mancini Newsletter Analyzer serves as the entry point for Mancini's ES Futures analysis within the Intent Trader workflow. It systematically extracts:

1. **Structured Level Framework**: Creating a hierarchical level structure with significance classification
2. **Market Mode Assessment**: Determining if we're in Mode 1 (trend) or Mode 2 (range/trap)
3. **Failed Breakdown Opportunities**: Identifying specific Failed Breakdown setups
4. **Trading Strategy**: Extracting bull/bear cases and level-to-level methodology
5. **Runner Management**: Capturing runner status and management protocols

This component enables traders to integrate Mancini's ES Futures expertise with the broader Intent Trader system, providing a comprehensive futures trading approach alongside DP's stock-specific insights.

## Input Parameters

- `preprocessedData` (required): JSON output from the Mancini Newsletter Preprocessor
- `components` (optional): Specific components to focus on (default: all)
  - Supported values: "levels", "mode", "failed-breakdowns", "scenarios", "runners"
- `format` (optional): Output format (default: structured)
  - Supported values: "json", "markdown", "summary"

## Output Format

The component produces a comprehensive analysis in this structure:

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
          "notes": "string",
          "testHistory": ["string"],
          "context": "string"
        }
      ],
      "resistance": [
        {
          "price": "number",
          "type": "major/significant/minor",
          "significance": "number (1-10)",
          "notes": "string",
          "testHistory": ["string"],
          "context": "string"
        }
      ],
      "zones": [
        {
          "name": "string",
          "min": "number",
          "max": "number",
          "type": "support/resistance/decision/consolidation",
          "significance": "number (1-10)",
          "context": "string"
        }
      ]
    },
    "spx": {
      // Same structure as ES with adjusted values
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
    },
    "edgeCases": [
      {
        "scenario": "string",
        "trigger": "string",
        "implications": "string",
        "probability": "number (percentage)"
      }
    ]
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
  },
  "metadata": {
    "newsletterDate": "date",
    "processingTime": "timestamp",
    "analysisVersion": "string",
    "components": ["string"],
    "tradingSession": "string"
  }
}
```

## Processing Logic

The Mancini Newsletter Analyzer processes the preprocessed data in these stages:

### 1. Input Validation and Parsing

```javascript
function validateInput(input) {
  if (!input || !input.preprocessedData) {
    throw new Error("Missing preprocessed data. Run the preprocessor first.");
  }

  let preprocessedData;
  try {
    // Parse if string, or use as is if already an object
    preprocessedData = typeof input.preprocessedData === 'string'
      ? JSON.parse(input.preprocessedData)
      : input.preprocessedData;
  } catch (error) {
    throw new Error(`Invalid preprocessed data format: ${error.message}`);
  }

  // Validate essential preprocessed data properties
  const requiredProperties = ['newsletterDate', 'keyLevels', 'marketSection'];
  for (const prop of requiredProperties) {
    if (!preprocessedData[prop]) {
      throw new Error(`Missing required property in preprocessed data: ${prop}`);
    }
  }

  // Extract and normalize parameters
  const {
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
    preprocessedData,
    requestedComponents,
    outputFormat
  };
}
```

### 2. Market Mode Detection

```javascript
function detectMarketMode(preprocessedData) {
  const marketSection = preprocessedData.marketSection || '';

  // Look for explicit mode mentions
  if (containsPatterns(marketSection, ["mode 1", "trend day", "trending", "directional", "buy dips mode"])) {
    return {
      mode: "Mode 1",
      confidence: calculateConfidence(marketSection, "Mode 1"),
      characteristics: extractModeCharacteristics(marketSection, "Mode 1")
    };
  } else if (containsPatterns(marketSection, ["mode 2", "range day", "choppy", "trap", "sell bounces mode"])) {
    return {
      mode: "Mode 2",
      confidence: calculateConfidence(marketSection, "Mode 2"),
      characteristics: extractModeCharacteristics(marketSection, "Mode 2")
    };
  }

  // If no explicit mention, analyze content patterns
  const modeSignals = analyzeModeSignals(marketSection);

  if (modeSignals.mode1Signals > modeSignals.mode2Signals) {
    return {
      mode: "Mode 1",
      confidence: modeSignals.mode1Confidence,
      characteristics: modeSignals.mode1Characteristics
    };
  } else {
    return {
      mode: "Mode 2",
      confidence: modeSignals.mode2Confidence,
      characteristics: modeSignals.mode2Characteristics
    };
  }
}

function containsPatterns(text, patterns) {
  return patterns.some(pattern => {
    const regex = new RegExp(`\\b${pattern}\\b`, 'i');
    return regex.test(text);
  });
}

function analyzeModeSignals(text) {
  const mode1Signals = [
    { pattern: "trend continues", weight: 0.7 },
    { pattern: "higher highs", weight: 0.6 },
    { pattern: "higher lows", weight: 0.6 },
    { pattern: "buying dips", weight: 0.7 },
    { pattern: "smooth trend", weight: 0.8 },
    { pattern: "parabolic", weight: 0.9 },
    { pattern: "squeeze", weight: 0.7 },
    { pattern: "one-way", weight: 0.8 }
  ];

  const mode2Signals = [
    { pattern: "choppy", weight: 0.7 },
    { pattern: "range", weight: 0.7 },
    { pattern: "trappy", weight: 0.8 },
    { pattern: "complex", weight: 0.6 },
    { pattern: "consolidation", weight: 0.7 },
    { pattern: "flag", weight: 0.5 },
    { pattern: "back and forth", weight: 0.7 },
    { pattern: "trap", weight: 0.8 }
  ];

  // Implementation of signal detection logic
  // Returns detected signals with confidence scores
}
```

### 3. Level Processing

```javascript
function processLevels(preprocessedData) {
  const levelFramework = {
    es: {
      support: [],
      resistance: [],
      zones: []
    },
    spx: {
      support: [],
      resistance: [],
      zones: []
    }
  };

  // Process ES support levels
  if (preprocessedData.keyLevels && preprocessedData.keyLevels.supports) {
    levelFramework.es.support = preprocessedData.keyLevels.supports.map(level => {
      return {
        price: level.price,
        type: determineLevelType(level.context),
        significance: determineLevelSignificance(level.context),
        notes: extractNotes(level.context),
        testHistory: extractTestHistory(level.context),
        context: level.context
      };
    });
  }

  // Process ES resistance levels
  if (preprocessedData.keyLevels && preprocessedData.keyLevels.resistances) {
    levelFramework.es.resistance = preprocessedData.keyLevels.resistances.map(level => {
      return {
        price: level.price,
        type: determineLevelType(level.context),
        significance: determineLevelSignificance(level.context),
        notes: extractNotes(level.context),
        testHistory: extractTestHistory(level.context),
        context: level.context
      };
    });
  }

  // Identify zones
  levelFramework.es.zones = identifyZones(levelFramework.es.support,
                                          levelFramework.es.resistance,
                                          preprocessedData.levelsSection);

  // Derive SPX levels
  levelFramework.spx = deriveSPXLevels(levelFramework.es);

  // Determine key decision point
  levelFramework.es.keyDecisionPoint = determineKeyDecisionPoint(levelFramework.es, preprocessedData);
  levelFramework.spx.keyDecisionPoint = levelFramework.es.keyDecisionPoint + 20; // Approximate SPX conversion

  return levelFramework;
}

// Helper functions for level processing
function determineLevelType(context) {
  if (context.toLowerCase().includes("major")) {
    return "major";
  } else if (context.toLowerCase().includes("significant")) {
    return "significant";
  } else {
    return "minor";
  }
}

function determineLevelSignificance(context) {
  // Base level of significance
  let significance = 5;

  // Adjust based on keywords
  const significanceKeywords = {
    "major": 3,
    "critical": 3,
    "key": 2,
    "important": 2,
    "significant": 2,
    "minor": -1
  };

  for (const [keyword, value] of Object.entries(significanceKeywords)) {
    if (context.toLowerCase().includes(keyword)) {
      significance += value;
    }
  }

  // Cap significance between 1-10
  return Math.max(1, Math.min(10, significance));
}

// Additional helper functions for extracting test history, notes, etc.
```

### 4. Failed Breakdown Processing

```javascript
function processFailedBreakdowns(preprocessedData) {
  const failedBreakdowns = [];

  // Process each preprocessed failed breakdown
  if (preprocessedData.failedBreakdowns) {
    preprocessedData.failedBreakdowns.forEach(fb => {
      failedBreakdowns.push({
        level: fb.level,
        index: determineIndex(fb.context),
        direction: determineDirection(fb.context),
        condition: extractCondition(fb.context),
        targetLevel: extractTarget(fb.context, fb.level),
        stopReference: extractStop(fb.context, fb.level),
        timeWindow: extractTimeWindow(fb.context),
        probability: assessProbability(fb.context),
        notes: fb.context
      });
    });
  }

  return failedBreakdowns;
}

// Helper functions for FB processing
function determineIndex(context) {
  if (context.includes("SPX")) {
    return "SPX";
  } else {
    return "ES"; // Default
  }
}

function determineDirection(context) {
  if (context.toLowerCase().includes("short") || context.toLowerCase().includes("sell")) {
    return "short";
  } else {
    return "long"; // Default for Failed Breakdowns
  }
}

// Additional helper functions for condition extraction, target identification, etc.
```

### 5. Scenario Processing

```javascript
function processScenarios(preprocessedData) {
  const scenarios = {
    bullCase: processBullCase(preprocessedData),
    bearCase: processBearCase(preprocessedData),
    edgeCases: processEdgeCases(preprocessedData)
  };

  return scenarios;
}

function processBullCase(preprocessedData) {
  const bullCase = preprocessedData.scenarios?.bullCase || '';

  // Extract trigger
  const triggerPattern = /(?:as\s+long\s+as|if|when|above).*?(\d{4}(?:-\d{4})?)/i;
  const triggerMatch = bullCase.match(triggerPattern);
  const trigger = triggerMatch ? triggerMatch[0] : "";

  // Extract targets
  const targetPattern = /target.*?(\d{4})/gi;
  const targets = [];
  let targetMatch;
  while ((targetMatch = targetPattern.exec(bullCase)) !== null) {
    targets.push(parseFloat(targetMatch[1]));
  }

  // Extract key levels
  const levelPattern = /(?:\d{4}(?:-\d{4})?)/g;
  const keyLevels = [];
  let levelMatch;
  while ((levelMatch = levelPattern.exec(bullCase)) !== null) {
    const levelText = levelMatch[0];
    if (levelText.includes("-")) {
      // Handle range
      const [min, max] = levelText.split("-").map(Number);
      keyLevels.push(min, max);
    } else {
      keyLevels.push(parseFloat(levelText));
    }
  }

  // Estimate probability
  const probabilityMatch = bullCase.match(/(\d+)%|probability|likely|bias/i);
  let probability = 50; // Default
  if (probabilityMatch) {
    const numMatch = bullCase.match(/(\d+)%/);
    if (numMatch) {
      probability = parseInt(numMatch[1]);
    } else if (bullCase.includes("high") || bullCase.includes("likely")) {
      probability = 70;
    } else if (bullCase.includes("low") || bullCase.includes("unlikely")) {
      probability = 30;
    }
  }

  // Extract conditions
  const conditionPattern = /(?:if|when|assuming|provided).*?(?:\.|,)/gi;
  const conditions = [];
  let conditionMatch;
  while ((conditionMatch = conditionPattern.exec(bullCase)) !== null) {
    conditions.push(conditionMatch[0].trim());
  }

  return {
    trigger,
    targets: targets.length > 0 ? targets : [],
    keyLevels: [...new Set(keyLevels)], // Remove duplicates
    probability,
    conditions: conditions.length > 0 ? conditions : []
  };
}

// Similar functions for bearCase and edgeCases
```

### 6. Runner Management Processing

```javascript
function processRunnerManagement(preprocessedData) {
  const runnerManagementText = preprocessedData.runnerManagement || '';

  const runnerManagement = {
    currentRunners: extractCurrentRunners(runnerManagementText),
    trailStrategy: extractTrailStrategy(runnerManagementText),
    stopAdjustmentRules: extractStopRules(runnerManagementText),
    managementNotes: runnerManagementText
  };

  return runnerManagement;
}

function extractCurrentRunners(text) {
  const runners = [];

  // Look for specific runner mentions
  const runnerPattern = /(?:holding|have|from).*?(\d{4})/gi;
  let match;
  while ((match = runnerPattern.exec(text)) !== null) {
    const entry = parseFloat(match[1]);
    const context = text.substring(Math.max(0, match.index - 50), match.index + match[0].length + 100);

    runners.push({
      entry,
      currentStop: extractCurrentStop(context),
      recommendedStop: extractRecommendedStop(context),
      target: extractRunnerTarget(context),
      notes: context.replace(/\s+/g, ' ').trim()
    });
  }

  return runners;
}

// Helper functions for extracting stop levels, targets, etc.
```

### 7. Trading Strategy Processing

```javascript
function processTradingStrategy(preprocessedData) {
  const tradingStrategyText = preprocessedData.tradingStrategy || '';

  return {
    tradingApproach: extractApproach(tradingStrategyText),
    keySetups: extractKeySetups(tradingStrategyText, preprocessedData),
    timeframeAlignment: extractTimeframeAlignment(tradingStrategyText),
    volatilityApproach: extractVolatilityApproach(tradingStrategyText),
    riskParameters: {
      stopPlacement: extractStopPlacement(tradingStrategyText),
      positionSizing: extractPositionSizing(tradingStrategyText),
      keyRisks: extractKeyRisks(tradingStrategyText)
    },
    focusAreas: extractFocusAreas(tradingStrategyText, preprocessedData)
  };
}

// Helper functions for extracting strategy components
```

### 8. Result Assembly

```javascript
function analyzeMancini(input) {
  try {
    // Validate input
    const { preprocessedData, requestedComponents, outputFormat } = validateInput(input);

    // Process market mode
    const modeResult = detectMarketMode(preprocessedData);

    // Process levels
    const levelFramework = processLevels(preprocessedData);

    // Process failed breakdowns
    const failedBreakdowns = processFailedBreakdowns(preprocessedData);

    // Process scenarios
    const scenarios = processScenarios(preprocessedData);

    // Process runner management
    const runnerManagement = processRunnerManagement(preprocessedData);

    // Process trading strategy
    const tradingStrategy = processTradingStrategy(preprocessedData);

    // Determine directionality
    const directionBias = determineDirectionalBias(preprocessedData);

    // Determine volatility expectation
    const volatilityExp = determineVolatilityExpectation(preprocessedData);

    // Generate metadata
    const metadata = {
      newsletterDate: preprocessedData.newsletterDate,
      processingTime: new Date().toISOString(),
      analysisVersion: "0.5.2",
      components: requestedComponents,
      tradingSession: determineTradingSession(preprocessedData)
    };

    // Assemble result
    const result = {
      marketAssessment: {
        mode: modeResult.mode,
        timeframe: "intraday",
        directionalBias: directionBias,
        volatilityExpectation: volatilityExp,
        keyCharacteristic: modeResult.characteristics[0] || "",
        contextNotes: extractContextNotes(preprocessedData.marketSection)
      },
      levelFramework,
      failedBreakdowns,
      scenarios,
      runnerManagement,
      tradingStrategy,
      metadata
    };

    // Filter components if specified
    return filterRequestedComponents(result, requestedComponents, outputFormat);
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
```

## Integration with Intent Trader

The Mancini Newsletter Analyzer integrates with the Intent Trader workflow in several ways:

1. **Level Extraction Integration**:
   - Extracts ES/SPX levels and feeds them into the `/extract-levels` command
   - Enables unified level structure with DP's analysis
   - Provides context for each level's significance

2. **Market Mode Integration**:
   - Integrates with `market-regimes.md` to determine current market mode
   - Maps Mancini's Mode 1/Mode 2 terminology to the broader market regime classification
   - Provides mode-specific trading strategies

3. **Conviction Classification**:
   - Uses `conviction-classifier.md` to assess the strength of Mancini's trade ideas
   - Standardizes conviction levels across different analysts
   - Enables consistent prioritization in the unified trade plan

4. **Unified Trade Plan Integration**:
   - Provides structured input to the `/create-plan` command
   - Enables fusion of DP and Mancini analysis
   - Creates comprehensive daily trading strategy

5. **Failed Breakdown Integration**:
   - Identifies specific Failed Breakdown setups from Mancini's analysis
   - Provides structured parameters for each setup (level, condition, target, stop)
   - Enables precise trade execution based on Mancini's methodology

## Usage Example

To analyze a Mancini newsletter, first run the preprocessor in a separate chat, then use the analyzer with the preprocessed data:

```
/analyze-mancini preprocessedData='{
  "newsletterDate": "2025-05-16",
  "newsletterTitle": "4 Green Days In A Row. Can SPX Close Week With 5, Or Are Bulls Out Of Steam?",
  "marketSection": "Everyday since the market bottomed on April 6th...",
  "levelsSection": "ES LEVELS: Supports are: 5925 (major)...",
  "keyLevels": {
    "supports": [
      {"price": 5925, "context": "major, First support down, resistance of the bull flag since Tuesday"}
    ],
    "resistances": [
      {"price": 5945, "context": ""}
    ]
  },
  "scenarios": {
    "bullCase": "As long as bull flag at 5882-85 is intact...",
    "bearCase": "Failure of 5882-85..."
  },
  "failedBreakdowns": [
    {"level": 5925, "context": "is first support down..."}
  ],
  "runnerManagement": "Holding 10% long runner from this morning's...",
  "tradingStrategy": "Remember that trade management is everything..."
}'
```

## Implementation Notes

This component is designed to work specifically with the output of the Mancini Newsletter Preprocessor. The preprocessor handles the heavy lifting of text extraction, allowing this component to focus on analysis rather than parsing.

For optimal performance:
- Always run the preprocessor first for any newsletter
- Pass the complete JSON output from the preprocessor
- The analyzer will handle any missing fields gracefully
- For incremental updates, specify only the components you want to analyze

---

**Note to Implementation Team:**
- This version requires the preprocessor component to be deployed first
- Both components should be documented together in the user guide
- The new approach provides better scalability for handling large newsletters
- The command interface remains compatible with existing integration points
