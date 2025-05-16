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

This component processes Adam Mancini's ES Futures newsletter to extract key levels, setups, and trading strategies, with a focus on Failed Breakdown opportunities and market mode assessment.

## Purpose

The Mancini Newsletter Analyzer serves as the entry point for Mancini's ES Futures analysis within the Intent Trader workflow. It systematically extracts:

1. **Structured Level Framework**: Creating a hierarchical level structure with significance classification
2. **Market Mode Assessment**: Determining if we're in Mode 1 (trend) or Mode 2 (range/trap)
3. **Failed Breakdown Opportunities**: Identifying specific Failed Breakdown setups
4. **Trading Strategy**: Extracting bull/bear cases and level-to-level methodology
5. **Runner Management**: Capturing runner status and management protocols

This component enables traders to integrate Mancini's ES Futures expertise with the broader Intent Trader system, providing a comprehensive futures trading approach alongside DP's stock-specific insights.

## Input Parameters

- `newsletter` (required): Complete text of Mancini's newsletter
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
    "tradingApproach": "Level-to-level trading with a focus on high probability setups",
    "keySetups": ["Failed Breakdown", "Bull Flag"],
    "timeframeAlignment": "Focus on intraday timeframe with daily context",
    "volatilityApproach": "Adjust size smaller for higher volatility environment",
    "riskParameters": {
      "stopPlacement": "Standard stop placement below entry structure",
      "positionSizing": "75/15/10 approach to position management",
      "keyRisks": ["OPEX volatility", "Extended move already in place"]
    },
    "focusAreas": ["Failed Breakdowns at key levels", "Range trading with level-to-level approach"]
  },
  "metadata": {
    "newsletterDate": "2025-05-16",
    "processingTime": "2025-05-16T08:30:00Z",
    "analysisVersion": "0.5.2-preview",
    "components": ["all"],
    "tradingSession": "regular"
  }
}
```

## Integration with Other Commands

The Mancini Newsletter Analyzer is designed to integrate seamlessly with other Intent Trader components:

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

## Implementation Challenges and Solutions

1. **Processing Large Newsletters**:
   - Challenge: Mancini's newsletters can be lengthy and exceed chat context limits
   - Solution: Implement a standalone preprocessing step that handles the newsletter in chunks

2. **Extracting Structured Levels**:
   - Challenge: Level information is often scattered throughout the newsletter
   - Solution: Use multiple pattern-matching approaches to capture all level mentions

3. **Identifying Failed Breakdowns**:
   - Challenge: Failed Breakdown setups may be described in various ways
   - Solution: Implement multiple detection patterns to capture different description styles

4. **Mode Classification**:
   - Challenge: Mode determination requires understanding complex market conditions
   - Solution: Analyze multiple factors including explicit mentions, level structure, and market character

5. **Runner Management Extraction**:
   - Challenge: Runner management details may be implied rather than explicit
   - Solution: Use context analysis to infer management protocols when not explicitly stated

## Roadmap for Future Enhancements

1. **Real-Time Updates**:
   - Enhancement: Add support for intraday updates to level structure based on price action
   - Timeline: v0.6.0

2. **Multi-Analyst Integration**:
   - Enhancement: Enhanced fusion of multiple analyst sources (DP, Mancini, others)
   - Timeline: v0.6.0

3. **Historical Pattern Matching**:
   - Enhancement: Compare current setups to historical examples
   - Timeline: v0.6.0

4. **Visualization Components**:
   - Enhancement: Generate visual representations of level structure and setups
   - Timeline: v0.6.0

5. **Automated Setup Detection**:
   - Enhancement: Real-time scanning for Failed Breakdown patterns
   - Timeline: v0.7.0

## Conclusion

The Mancini Newsletter Analyzer provides a structured framework for integrating Adam Mancini's ES futures analysis into the Intent Trader system. By systematically extracting key levels, setups, and trading strategies, it enables traders to combine Mancini's futures expertise with DP's stock-specific insights, creating a comprehensive trading approach that covers both markets.

The implementation focuses on precision in level extraction, clarity in Failed Breakdown identification, and integration with the broader market regime framework. The result is a powerful tool that transforms Mancini's narrative analysis into actionable trading parameters that can be incorporated into the daily trading plan.

---

**Note to Implementation Team:**
- This component should be deployed as part of the v0.5.2 release
- The implementation relies on prompt-based extraction rather than complex parsing
- Test extensively with a variety of newsletter formats to ensure robust extraction
- Coordinate with the team implementing the `extract-levels` and `create-plan` components to ensure seamless integration
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

The Mancini Newsletter Analyzer employs specialized natural language processing to extract key trading components:

### 1. Input Validation and Preprocessing

```javascript
function validateInput(input) {
  if (!input || !input.newsletter || input.newsletter.length < 100) {
    throw new Error("Missing or invalid newsletter input. Must contain at least 100 characters.");
  }

  // Extract and normalize parameters
  const {
    newsletter,
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
    requestedComponents,
    outputFormat
  };
}

function preprocessNewsletter(newsletter) {
  // Clean up formatting issues
  let cleaned = newsletter.replace(/\r\n/g, '\n');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  
  // Ensure consistent spacing
  cleaned = cleaned.replace(/\s{2,}/g, ' ');
  
  // Extract newsletter date
  const dateMatch = cleaned.match(/MAY\s+(\d+),\s+2025/i);
  const newsletterDate = dateMatch ? `2025-05-${dateMatch[1].padStart(2, '0')}` : new Date().toISOString().split('T')[0];
  
  return {
    cleanedText: cleaned,
    newsletterDate
  };
}
```

### 2. Section Identification

```javascript
function identifySections(cleanedText) {
  const sections = {};
  
  // Identify introduction/market context section (usually at the beginning)
  const introMatch = cleanedText.match(/^(.*?)(?=Trade Recap|The Run Down|ES LEVELS)/is);
  if (introMatch) {
    sections.introduction = introMatch[0].trim();
  }
  
  // Identify market levels section
  const levelsMatch = cleanedText.match(/(?:ES LEVELS|Supports are|Trade Plan).*?(?:Resistances are.*?)(?=Bull case|Bear case|In summary)/is);
  if (levelsMatch) {
    sections.levels = levelsMatch[0].trim();
  }
  
  // Identify bull/bear case scenarios
  const scenariosMatch = cleanedText.match(/(?:Bull case.*?)(?=Bear case)(Bear case.*?)(?=In summary|Tomorrow|Trade)/is);
  if (scenariosMatch) {
    sections.scenarios = scenariosMatch[0].trim();
  } else {
    const bullCaseMatch = cleanedText.match(/Bull case.*?(?=Bear case|In summary|Tomorrow|Trade)/is);
    const bearCaseMatch = cleanedText.match(/Bear case.*?(?=In summary|Tomorrow|Trade)/is);
    
    if (bullCaseMatch || bearCaseMatch) {
      sections.scenarios = '';
      if (bullCaseMatch) sections.scenarios += bullCaseMatch[0].trim() + '\n\n';
      if (bearCaseMatch) sections.scenarios += bearCaseMatch[0].trim();
    }
  }
  
  // Identify Failed Breakdown examples/education
  const fbMatch = cleanedText.match(/(?:Failed Breakdown|FB).*?(?:requires price to set, lose, and recover|different forms of Acceptance)/is);
  if (fbMatch) {
    sections.failedBreakdowns = fbMatch[0].trim();
  }
  
  // Identify runner management
  const runnerMatch = cleanedText.match(/(?:runner management|trailing stop|for runner management|75\/15\/10).*?(?=Trade Plan|In summary)/is);
  if (runnerMatch) {
    sections.runners = runnerMatch[0].trim();
  }
  
  // Identify summary/trade plan
  const summaryMatch = cleanedText.match(/(?:In summary|Trade Plan).*?$/is);
  if (summaryMatch) {
    sections.tradePlan = summaryMatch[0].trim();
  }
  
  return sections;
}
```

### 3. Market Mode Detection

This function integrates with the market-regimes.md reference to assess the current market mode:

```javascript
function detectMarketMode(newsletter) {
  // Look for explicit mode mentions
  if (containsPatterns(newsletter, ["mode 1", "trend day", "trending", "directional", "buy dips mode"])) {
    return {
      mode: "Mode 1",
      confidence: calculateConfidence(newsletter, "Mode 1"),
      characteristics: extractModeCharacteristics(newsletter, "Mode 1")
    };
  } else if (containsPatterns(newsletter, ["mode 2", "range day", "choppy", "trap", "sell bounces mode"])) {
    return {
      mode: "Mode 2",
      confidence: calculateConfidence(newsletter, "Mode 2"),
      characteristics: extractModeCharacteristics(newsletter, "Mode 2")
    };
  }
  
  // If no explicit mention, analyze content patterns
  const modeSignals = analyzeModeSignals(newsletter);
  
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

function analyzeModeSignals(newsletter) {
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
  
  let mode1Score = 0;
  let mode1Hits = 0;
  let mode1Characteristics = [];
  
  let mode2Score = 0;
  let mode2Hits = 0;
  let mode2Characteristics = [];
  
  // Check Mode 1 signals
  mode1Signals.forEach(signal => {
    if (newsletter.toLowerCase().includes(signal.pattern.toLowerCase())) {
      mode1Score += signal.weight;
      mode1Hits++;
      mode1Characteristics.push(signal.pattern);
    }
  });
  
  // Check Mode 2 signals
  mode2Signals.forEach(signal => {
    if (newsletter.toLowerCase().includes(signal.pattern.toLowerCase())) {
      mode2Score += signal.weight;
      mode2Hits++;
      mode2Characteristics.push(signal.pattern);
    }
  });
  
  // Normalize scores based on hits
  const mode1Confidence = mode1Hits > 0 ? (mode1Score / mode1Hits) * (mode1Hits / (mode1Hits + mode2Hits)) : 0;
  const mode2Confidence = mode2Hits > 0 ? (mode2Score / mode2Hits) * (mode2Hits / (mode1Hits + mode2Hits)) : 0;
  
  return {
    mode1Signals: mode1Score,
    mode2Signals: mode2Score,
    mode1Confidence: Math.min(Math.round(mode1Confidence * 100), 100),
    mode2Confidence: Math.min(Math.round(mode2Confidence * 100), 100),
    mode1Characteristics,
    mode2Characteristics
  };
}
```

### 4. Level Extraction

This function integrates with the extract-levels.md component to parse price levels:

```javascript
function extractLevels(newsletter) {
  const levels = {
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
  
  // Extract ES support levels
  const supportMatch = newsletter.match(/(?:Supports are|Support levels|ES supports):\s*(.*?)(?=Resistances are|Resistance levels|In summary)/is);
  if (supportMatch) {
    const supportText = supportMatch[1].trim();
    levels.es.support = parseNumericLevels(supportText, "support");
  }
  
  // Extract ES resistance levels
  const resistanceMatch = newsletter.match(/(?:Resistances are|Resistance levels):\s*(.*?)(?=Bull case|Bear case|In summary)/is);
  if (resistanceMatch) {
    const resistanceText = resistanceMatch[1].trim();
    levels.es.resistance = parseNumericLevels(resistanceText, "resistance");
  }
  
  // Extract zones (ranges between levels)
  levels.es.zones = identifyZones(levels.es.support, levels.es.resistance, newsletter);
  
  // Derive SPX levels (typically ES + ~20 points)
  levels.spx = deriveSPXLevels(levels.es);
  
  return levels;
}

function parseNumericLevels(text, levelType) {
  const levelPattern = /(\d{4}(?:\.\d+)?)\s*(?:\(([^)]+)\))?/g;
  const levels = [];
  let match;
  
  while ((match = levelPattern.exec(text)) !== null) {
    const price = parseFloat(match[1]);
    const notes = match[2] || "";
    
    // Determine significance based on notes
    const significance = determineLevelSignificance(notes, text, price);
    
    levels.push({
      price,
      type: determineLevelType(notes, significance),
      significance,
      notes,
      testHistory: extractTestHistory(notes, text, price),
      context: extractContext(notes, text, price)
    });
  }
  
  // Sort levels appropriately
  if (levelType === "support") {
    // Support levels from highest to lowest
    return levels.sort((a, b) => b.price - a.price);
  } else {
    // Resistance levels from lowest to highest
    return levels.sort((a, b) => a.price - b.price);
  }
}

function determineLevelSignificance(notes, fullText, price) {
  // Base level of significance
  let significance = 5;
  
  // Increase significance based on keywords
  const majorKeywords = ["major", "critical", "key", "important", "significant"];
  majorKeywords.forEach(keyword => {
    if (notes.toLowerCase().includes(keyword)) {
      significance += 2;
    }
  });
  
  // Check for mentions of historical tests
  if (notes.toLowerCase().includes("test") || notes.toLowerCase().includes("trap")) {
    significance += 1;
  }
  
  // Check for frequency of mentions in the full text
  const priceRegex = new RegExp(`\\b${price}\\b`, 'g');
  const matches = fullText.match(priceRegex);
  if (matches) {
    significance += Math.min(matches.length - 1, 2);
  }
  
  // Cap significance at 10
  return Math.min(significance, 10);
}

function determineLevelType(notes, significance) {
  if (significance >= 8) {
    return "major";
  } else if (significance >= 6) {
    return "significant";
  } else {
    return "minor";
  }
}

function extractTestHistory(notes, fullText, price) {
  const testHistory = [];
  
  // Look for mentions of tests
  if (notes.toLowerCase().includes("test")) {
    testHistory.push("previously tested");
  }
  
  // Look for mentions of traps
  if (notes.toLowerCase().includes("trap")) {
    testHistory.push("trapped traders");
  }
  
  // Look for mentions of breakouts or breakdowns
  if (notes.toLowerCase().includes("break")) {
    if (notes.toLowerCase().includes("out")) {
      testHistory.push("breakout level");
    } else if (notes.toLowerCase().includes("down")) {
      testHistory.push("breakdown level");
    } else {
      testHistory.push("break level");
    }
  }
  
  return testHistory;
}

function extractContext(notes, fullText, price) {
  // Default context
  let context = notes;
  
  // Look for additional context in the full text
  const priceContext = new RegExp(`\\b${price}\\b.{0,50}`, 'g');
  const contextMatches = [...fullText.matchAll(priceContext)];
  
  if (contextMatches.length > 0) {
    const additionalContext = contextMatches.map(match => match[0].trim())
      .filter(match => !match.includes(notes))
      .join(" | ");
    
    if (additionalContext) {
      context += " | " + additionalContext;
    }
  }
  
  return context;
}

function identifyZones(supports, resistances, newsletter) {
  const zones = [];
  
  // Look for explicitly mentioned zones in the newsletter
  const zonePatterns = [
    /(\d{4})-(\d{4})(?:\s+zone|range|area)/gi,
    /between\s+(\d{4})\s+and\s+(\d{4})/gi,
    /range\s+from\s+(\d{4})\s+to\s+(\d{4})/gi
  ];
  
  zonePatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(newsletter)) !== null) {
      const min = Math.min(parseFloat(match[1]), parseFloat(match[2]));
      const max = Math.max(parseFloat(match[1]), parseFloat(match[2]));
      
      const context = newsletter.substring(Math.max(0, match.index - 50), match.index + match[0].length + 50);
      
      zones.push({
        name: `${min}-${max} zone`,
        min,
        max,
        type: determineZoneType(context, min, max),
        significance: determineZoneSignificance(context, min, max),
        context: extractZoneContext(context)
      });
    }
  });
  
  // Identify zones between closely spaced levels
  for (let i = 0; i < supports.length - 1; i++) {
    for (let j = 0; j < resistances.length; j++) {
      const support = supports[i];
      const resistance = resistances[j];
      
      // Check if levels are close enough to form a zone
      if (resistance.price > support.price && 
          (resistance.price - support.price) / support.price < 0.02) {
        zones.push({
          name: `${support.price}-${resistance.price} zone`,
          min: support.price,
          max: resistance.price,
          type: "decision",
          significance: Math.max(support.significance, resistance.significance),
          context: `Decision zone between ${support.type} support and ${resistance.type} resistance`
        });
      }
    }
  }
  
  return zones;
}

function determineZoneType(context, min, max) {
  if (context.toLowerCase().includes("consolidation") || 
      context.toLowerCase().includes("chop") || 
      context.toLowerCase().includes("range")) {
    return "consolidation";
  } else if (context.toLowerCase().includes("support")) {
    return "support";
  } else if (context.toLowerCase().includes("resistance")) {
    return "resistance";
  } else if (context.toLowerCase().includes("decision")) {
    return "decision";
  } else {
    return "consolidation"; // Default
  }
}

function determineZoneSignificance(context, min, max) {
  // Base significance
  let significance = 5;
  
  // Adjust based on keywords in context
  const significanceKeywords = {
    "major": 2,
    "critical": 2,
    "important": 1,
    "key": 1,
    "significant": 1,
    "flag": 1,
    "trap": 1,
    "test": 1
  };
  
  Object.entries(significanceKeywords).forEach(([keyword, value]) => {
    if (context.toLowerCase().includes(keyword)) {
      significance += value;
    }
  });
  
  // Cap at 10
  return Math.min(significance, 10);
}

function extractZoneContext(context) {
  // Clean up the context
  return context.replace(/\s+/g, ' ').trim();
}

function deriveSPXLevels(esLevels, offset = 20) {
  const spxLevels = {
    support: esLevels.support.map(level => ({
      ...level,
      price: level.price + offset,
      notes: level.notes + " (derived from ES)"
    })),
    resistance: esLevels.resistance.map(level => ({
      ...level,
      price: level.price + offset,
      notes: level.notes + " (derived from ES)"
    })),
    zones: esLevels.zones.map(zone => ({
      ...zone,
      min: zone.min + offset,
      max: zone.max + offset,
      name: `${zone.min + offset}-${zone.max + offset} zone`,
      context: zone.context + " (derived from ES)"
    }))
  };
  
  return spxLevels;
}
```

### 5. Failed Breakdown Identification

```javascript
function identifyFailedBreakdowns(newsletter) {
  const failedBreakdowns = [];
  
  // Look for explicit FB mentions
  const fbPatterns = [
    /(?:Failed Breakdown|FB)\s+(?:of|at|near|around)?\s+(?:the\s+)?(\d{4})/gi,
    /(?:watch for|looking for).*?(?:Failed Breakdown|FB).*?(?:at|near|around)?\s+(\d{4})/gi,
    /lost\s+and\s+recovered\s+(?:the\s+)?(\d{4})/gi
  ];
  
  fbPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(newsletter)) !== null) {
      const level = parseFloat(match[1]);
      const context = newsletter.substring(Math.max(0, match.index - 100), match.index + match[0].length + 100);
      
      failedBreakdowns.push({
        level,
        index: determineIndex(context),
        direction: determineDirection(context),
        condition: extractCondition(context),
        targetLevel: extractTarget(context, level),
        stopReference: extractStop(context, level),
        timeWindow: extractTimeWindow(context),
        probability: assessProbability(context),
        notes: extractNotes(context)
      });
    }
  });
  
  // Look for price action descriptions that match FB pattern
  const actionPatterns = [
    /flush\s+(?:below|under)?\s+(?:the\s+)?(\d{4}).*?(?:reclaim|recover|back\s+above)/gi,
    /(?:break|lose)\s+(?:below|under)?\s+(?:the\s+)?(\d{4}).*?(?:reclaim|recover|back\s+above)/gi
  ];
  
  actionPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(newsletter)) !== null) {
      const level = parseFloat(match[1]);
      const context = newsletter.substring(Math.max(0, match.index - 100), match.index + match[0].length + 100);
      
      // Avoid duplicates
      if (!failedBreakdowns.some(fb => fb.level === level)) {
        failedBreakdowns.push({
          level,
          index: determineIndex(context),
          direction: determineDirection(context),
          condition: extractCondition(context),
          targetLevel: extractTarget(context, level),
          stopReference: extractStop(context, level),
          timeWindow: extractTimeWindow(context),
          probability: assessProbability(context),
          notes: extractNotes(context)
        });
      }
    }
  });
  
  return failedBreakdowns;
}

function determineIndex(context) {
  if (context.includes("SPX")) {
    return "SPX";
  } else {
    return "ES"; // Default
  }
}

function determineDirection(context) {
  if (context.includes("short") || context.includes("sell")) {
    return "short";
  } else {
    return "long"; // Default for Failed Breakdowns
  }
}

function extractCondition(context) {
  // Default condition
  let condition = "drop below then reclaim";
  
  // Look for specific conditions
  const conditionPatterns = [
    { pattern: /flush\s+(?:and|then)?\s+recover/i, value: "flush and recover" },
    { pattern: /lose\s+(?:and|then)?\s+reclaim/i, value: "lose and reclaim" },
    { pattern: /trap\s+(?:and|then)?\s+squeeze/i, value: "trap and squeeze" },
    { pattern: /break\s+(?:and|then)?\s+recover/i, value: "break and recover" }
  ];
  
  for (const p of conditionPatterns) {
    if (p.pattern.test(context)) {
      condition = p.value;
      break;
    }
  }
  
  return condition;
}

function extractTarget(context, level) {
  // Look for target mentions
  const targetPatterns = [
    /target.*?(\d{4})/i,
    /to\s+(\d{4})/i,
    /toward\s+(\d{4})/i,
    /up\s+to\s+(\d{4})/i
  ];
  
  for (const pattern of targetPatterns) {
    const match = context.match(pattern);
    if (match) {
      const targetLevel = parseFloat(match[1]);
      // Ensure target is above level for longs, below for shorts
      if (determineDirection(context) === "long") {
        if (targetLevel > level) {
          return targetLevel;
        }
      } else {
        if (targetLevel < level) {
          return targetLevel;
        }
      }
    }
  }
  
  // Default: project a reasonable target based on direction
  if (determineDirection(context) === "long") {
    return Math.round(level + (level * 0.01)); // 1% higher
  } else {
    return Math.round(level - (level * 0.01)); // 1% lower
  }
}

function extractStop(context, level) {
  // Look for stop mentions
  const stopPatterns = [
    /stop\s+(?:at|below|under|above|over)?\s+(\d{4})/i,
    /stop\s+loss\s+(?:at|below|under|above|over)?\s+(\d{4})/i
  ];
  
  for (const pattern of stopPatterns) {
    const match = context.match(pattern);
    if (match) {
      return parseFloat(match[1]);
    }
  }
  
  // Default: set a reasonable stop based on direction
  if (determineDirection(context) === "long") {
    return Math.round(level - (level * 0.005)); // 0.5% lower
  } else {
    return Math.round(level + (level * 0.005)); // 0.5% higher
  }
}

function extractTimeWindow(context) {
  if (context.includes("intraday") || context.includes("today")) {
    return "intraday";
  } else if (context.includes("overnight") || context.includes("tomorrow")) {
    return "tomorrow";
  } else if (context.includes("swing") || context.includes("multi-day")) {
    return "multi-day";
  } else {
    return "intraday"; // Default
  }
}

function assessProbability(context) {
  // Count positive and negative indicators
  let positiveIndicators = 0;
  let negativeIndicators = 0;
  
  // Positive indicators
  const positivePatterns = [
    /high.*?probability/i,
    /likely/i,
    /strong/i,
    /good/i,
    /clean/i,
    /clear/i
  ];
  
  // Negative indicators
  const negativePatterns = [
    /low.*?probability/i,
    /might/i,
    /maybe/i,
    /could/i,
    /possible/i,
    /potential/i
  ];
  
  positivePatterns.forEach(pattern => {
    if (pattern.test(context)) {
      positiveIndicators++;
    }
  });
  
  negativePatterns.forEach(pattern => {
    if (pattern.test(context)) {
      negativeIndicators++;
    }
  });
  
  // Determine probability level
  if (positiveIndicators > negativeIndicators + 1) {
    return "high";
  } else if (negativeIndicators > positiveIndicators + 1) {
    return "low";
  } else {
    return "medium"; // Default
  }
}

function extractNotes(context) {
  // Clean up the context and keep only the most relevant portion
  return context.replace(/\s+/g, ' ').trim().substring(0, 200) + (context.length > 200 ? "..." : "");
}
```

### 6. Scenario Extraction

```javascript
function extractScenarios(newsletter, levels) {
  const scenarios = {
    bullCase: extractBullCase(newsletter, levels),
    bearCase: extractBearCase(newsletter, levels),
    edgeCases: extractEdgeCases(newsletter, levels)
  };
  
  return scenarios;
}

function extractBullCase(newsletter, levels) {
  // Look for bull case section
  const bullCaseMatch = newsletter.match(/Bull\s+case.*?(?=Bear\s+case|In\s+summary)/is);
  
  if (!bullCaseMatch) {
    return {
      trigger: "",
      targets: [],
      keyLevels: [],
      probability: 50,
      conditions: []
    };
  }
  
  const bullCaseText = bullCaseMatch[0];
  
  // Extract trigger
  const triggerMatch = bullCaseText.match(/(?:break|above|if).*?(\d{4})/i);
  const trigger = triggerMatch ? `Break above ${triggerMatch[1]}` : "";
  
  // Extract targets
  const targets = extractNumbers(bullCaseText.match(/target.*?(\d{4})/gi));
  
  // Extract key levels
  const keyLevels = extractNumbers(bullCaseText.match(/(?:break|above|hold).*?(\d{4})/gi));
  
  // Extract probability
  const probabilityMatch = bullCaseText.match(/probability\s+(\d+)%/i);
  const probability = probabilityMatch ? parseInt(probabilityMatch[1]) : 50;
  
  // Extract conditions
  const conditions = [];
  const conditionMatches = bullCaseText.match(/(?:if|when).*?[.,]/gi);
  
  if (conditionMatches) {
    conditionMatches.forEach(match => {
      conditions.push(match.trim());
    });
  }
  
  return {
    trigger,
    targets,
    keyLevels,
    probability,
    conditions
  };
}

function extractBearCase(newsletter, levels) {
  // Look for bear case section
  const bearCaseMatch = newsletter.match(/Bear\s+case.*?(?=In\s+summary|Trade\s+Plan)/is);
  
  if (!bearCaseMatch) {
    return {
      trigger: "",
      targets: [],
      keyLevels: [],
      probability: 50,
      conditions: []
    };
  }
  
  const bearCaseText = bearCaseMatch[0];
  
  // Extract trigger
  const triggerMatch = bearCaseText.match(/(?:break|below|under|if).*?(\d{4})/i);
  const trigger = triggerMatch ? `Break below ${triggerMatch[1]}` : "";
  
  // Extract targets
  const targets = extractNumbers(bearCaseText.match(/target.*?(\d{4})/gi));
  
  // Extract key levels
  const keyLevels = extractNumbers(bearCaseText.match(/(?:break|below|lose).*?(\d{4})/gi));
  
  // Extract probability
  const probabilityMatch = bearCaseText.match(/probability\s+(\d+)%/i);
  const probability = probabilityMatch ? parseInt(probabilityMatch[1]) : 50;
  
  // Extract conditions
  const conditions = [];
  const conditionMatches = bearCaseText.match(/(?:if|when).*?[.,]/gi);
  
  if (conditionMatches) {
    conditionMatches.forEach(match => {
      conditions.push(match.trim());
    });
  }
  
  return {
    trigger,
    targets,
    keyLevels,
    probability,
    conditions
  };
}

function extractEdgeCases(newsletter, levels) {
  const edgeCases = [];
  
  // Look for conditional scenarios that don't fit bull/bear case
  const edgeCasePatterns = [
    /if.*?then.*?(?:target|expect|see)/gi,
    /in\s+case\s+of.*?(?:target|expect|see)/gi,
    /alternative\s+scenario/gi
  ];
  
  edgeCasePatterns.forEach(pattern => {
    const matches = newsletter.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const context = extractContext(match, newsletter);
        
        edgeCases.push({
          scenario: match.trim(),
          trigger: extractTrigger(context),
          implications: extractImplications(context),
          probability: extractProbability(context)
        });
      });
    }
  });
  
  return edgeCases;
}

function extractNumbers(matches) {
  const numbers = [];
  
  if (!matches) {
    return numbers;
  }
  
  matches.forEach(match => {
    const numberMatch = match.match(/(\d{4}(?:\.\d+)?)/);
    if (numberMatch) {
      numbers.push(parseFloat(numberMatch[1]));
    }
  });
  
  return [...new Set(numbers)]; // Remove duplicates
}

function extractContext(match, newsletter) {
  const matchIndex = newsletter.indexOf(match);
  return newsletter.substring(Math.max(0, matchIndex - 50), matchIndex + match.length + 50);
}

function extractTrigger(context) {
  const triggerMatch = context.match(/(?:if|when|in\s+case\s+of).*?(?=then|expect|target|see)/i);
  return triggerMatch ? triggerMatch[0].trim() : context.substring(0, 50).trim();
}

function extractImplications(context) {
  const implicationsMatch = context.match(/(?:then|expect|target|see).*$/i);
  return implicationsMatch ? implicationsMatch[0].trim() : "";
}

function extractProbability(context) {
  const probabilityMatch = context.match(/probability\s+(\d+)%/i);
  return probabilityMatch ? parseInt(probabilityMatch[1]) : 20; // Default to low probability
}
```

### 7. Runner Management Extraction

```javascript
function extractRunnerManagement(newsletter) {
  const runnerManagement = {
    currentRunners: [],
    trailStrategy: "",
    stopAdjustmentRules: [],
    managementNotes: ""
  };
  
  // Look for runner mentions
  const runnerMentions = findRunnerMentions(newsletter);
  
  runnerMentions.forEach(mention => {
    const runner = {
      entry: extractEntry(mention),
      currentStop: extractCurrentStop(mention),
      recommendedStop: extractRecommendedStop(mention),
      target: extractTarget(mention, 0),
      notes: extractRunnerNotes(mention)
    };
    
    runnerManagement.currentRunners.push(runner);
  });
  
  // Extract trail strategy
  runnerManagement.trailStrategy = extractTrailStrategy(newsletter);
  
  // Extract stop adjustment rules
  runnerManagement.stopAdjustmentRules = extractStopRules(newsletter);
  
  // Extract management notes
  runnerManagement.managementNotes = extractManagementNotes(newsletter);
  
  return runnerManagement;
}

function findRunnerMentions(newsletter) {
  const runnerMentions = [];
  
  // Look for runner mentions
  const runnerPatterns = [
    /(?:holding|have)\s+(?:a|my)?\s+(?:runner|position|long|short)/gi,
    /(?:runner|position)\s+(?:from|entered|initiated)/gi,
    /(?:\d+)%\s+(?:runner|position)/gi
  ];
  
  runnerPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(newsletter)) !== null) {
      const mentionStart = Math.max(0, match.index - 100);
      const mentionEnd = match.index + match[0].length + 150;
      runnerMentions.push(newsletter.substring(mentionStart, mentionEnd));
    }
  });
  
  return runnerMentions;
}

function extractEntry(mention) {
  // Look for entry price
  const entryPattern = /(?:enter|entry|from|at)\s+(\d{4}(?:\.\d+)?)/i;
  const entryMatch = mention.match(entryPattern);
  
  return entryMatch ? parseFloat(entryMatch[1]) : null;
}

function extractCurrentStop(mention) {
  // Look for current stop level
  const currentStopPattern = /(?:current|existing)\s+stop\s+(?:at|is)?\s+(\d{4}(?:\.\d+)?)/i;
  const currentStopMatch = mention.match(currentStopPattern);
  
  return currentStopMatch ? parseFloat(currentStopMatch[1]) : null;
}

function extractRecommendedStop(mention) {
  // Look for recommended stop level
  const recommendedStopPattern = /(?:raise|move|adjust|recommended)\s+stop\s+(?:to|at)?\s+(\d{4}(?:\.\d+)?)/i;
  const recommendedStopMatch = mention.match(recommendedStopPattern);
  
  return recommendedStopMatch ? parseFloat(recommendedStopMatch[1]) : null;
}

function extractRunnerNotes(mention) {
  // Clean up the mention
  return mention.replace(/\s+/g, ' ').trim();
}

function extractTrailStrategy(newsletter) {
  // Look for trailing stop mentions
  const trailPatterns = [
    /trail.*?(\d+)\s+points/i,
    /trailing\s+stop\s+(?:at|to)?\s+(\d+)\s+points/i,
    /(\d+)\s+point.*?trailing\s+stop/i
  ];
  
  for (const pattern of trailPatterns) {
    const match = newsletter.match(pattern);
    if (match) {
      return `Trail ${match[1]} points below price`;
    }
  }
  
  // Look for percentage-based trails
  const percentTrailPatterns = [
    /trail.*?(\d+)%/i,
    /trailing\s+stop\s+(?:at|to)?\s+(\d+)%/i,
    /(\d+)%.*?trailing\s+stop/i
  ];
  
  for (const pattern of percentTrailPatterns) {
    const match = newsletter.match(pattern);
    if (match) {
      return `Trail ${match[1]}% below price`;
    }
  }
  
  // Look for structure-based trails
  if (newsletter.match(/trail.*?(?:structure|swing|low|high)/i)) {
    return "Trail below recent structure/swing lows";
  }
  
  return "Standard trailing approach as per methodology";
}

function extractStopRules(newsletter) {
  const stopRules = [];
  
  // Look for stop adjustment rules
  const stopRulePatterns = [
    /raise\s+stop.*?(?:if|when|after)/i,
    /move\s+stop\s+to.*?(?:if|when|after)/i,
    /adjust\s+stop.*?(?:if|when|after)/i
  ];
  
  stopRulePatterns.forEach(pattern => {
    const matches = newsletter.match(pattern);
    if (matches) {
      stopRules.push(matches[0].trim());
    }
  });
  
  // Look for breakeven mentions
  if (newsletter.match(/move\s+stop\s+to\s+breakeven/i)) {
    stopRules.push("Move stop to breakeven once target 1 is reached");
  }
  
  return stopRules;
}

function extractManagementNotes(newsletter) {
  // Look for management notes in relation to runners
  const managementSections = [
    /(?:for\s+runner\s+management|regarding\s+runners|for\s+active\s+positions).*?(?=\n\n|\n(?=[A-Z]))/i,
    /75\/15\/10\s+rule.*?(?=\n\n|\n(?=[A-Z]))/i,
    /trade\s+management.*?(?=\n\n|\n(?=[A-Z]))/i
  ];
  
  for (const pattern of managementSections) {
    const match = newsletter.match(pattern);
    if (match) {
      return match[0].replace(/\s+/g, ' ').trim();
    }
  }
  
  return "";
}
```

### 8. Trading Strategy Extraction

```javascript
function extractTradingStrategy(newsletter) {
  return {
    tradingApproach: extractApproach(newsletter),
    keySetups: extractKeySetups(newsletter),
    timeframeAlignment: extractTimeframeAlignment(newsletter),
    volatilityApproach: extractVolatilityApproach(newsletter),
    riskParameters: extractRiskParameters(newsletter),
    focusAreas: extractFocusAreas(newsletter)
  };
}

function extractApproach(newsletter) {
  // Look for trading approach mentions
  const approachPatterns = [
    /trading\s+approach.*?(?:is|will\s+be)?\s+(.*?)(?=\.|,|\n)/i,
    /approach.*?(?:is|will\s+be)?\s+(.*?)(?=\.|,|\n)/i,
    /strategy.*?(?:is|will\s+be)?\s+(.*?)(?=\.|,|\n)/i
  ];
  
  for (const pattern of approachPatterns) {
    const match = newsletter.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }
  
  // Default based on content analysis
  if (newsletter.toLowerCase().includes("mode 1")) {
    return "Trend following with level-to-level profit taking";
  } else if (newsletter.toLowerCase().includes("mode 2")) {
    return "Range trading with focus on failed breakdowns and failed breakouts";
  } else {
    return "Level-to-level trading with a focus on high probability setups";
  }
}

function extractKeySetups(newsletter) {
  const keySetups = [];
  
  // Look for key setup mentions
  const setupPatterns = [
    { pattern: /failed\s+breakdown/gi, setup: "Failed Breakdown" },
    { pattern: /failed\s+breakout/gi, setup: "Failed Breakout" },
    { pattern: /breakdown\s+and\s+backtest/gi, setup: "Breakdown and Backtest" },
    { pattern: /breakout\s+pullback/gi, setup: "Breakout Pullback" },
    { pattern: /bull\s+flag/gi, setup: "Bull Flag" },
    { pattern: /bear\s+flag/gi, setup: "Bear Flag" }
  ];
  
  setupPatterns.forEach(({ pattern, setup }) => {
    if (newsletter.match(pattern)) {
      keySetups.push(setup);
    }
  });
  
  // Fallback if no setups found
  if (keySetups.length === 0) {
    keySetups.push("Failed Breakdown");
  }
  
  return keySetups;
}

function extractTimeframeAlignment(newsletter) {
  // Look for timeframe mentions
  if (newsletter.match(/align.*?(?:daily|higher\s+timeframe)/i)) {
    return "Align with daily trend, trade intraday setups";
  } else if (newsletter.match(/higher\s+timeframe.*?context/i)) {
    return "Use higher timeframe context for intraday execution";
  } else if (newsletter.match(/weekly.*?daily.*?intraday/i)) {
    return "Cascade from weekly to daily to intraday for aligned execution";
  } else {
    return "Focus on intraday timeframe with daily context";
  }
}

function extractVolatilityApproach(newsletter) {
  // Look for volatility-related mentions
  if (newsletter.match(/high.*?volatility/i)) {
    return "Adjust size smaller for higher volatility environment";
  } else if (newsletter.match(/low.*?volatility/i)) {
    return "Expect slower moves and more patience required";
  } else {
    // Analyze for volatility context
    const volatilityPhrases = [
      "reduce size",
      "smaller position",
      "wider stops",
      "tighter stops",
      "expect chop",
      "expect range",
      "expect trend"
    ];
    
    for (const phrase of volatilityPhrases) {
      if (newsletter.toLowerCase().includes(phrase)) {
        return `Volatility management: ${phrase}`;
      }
    }
    
    return "Standard volatility approach with level-to-level management";
  }
}

function extractRiskParameters(newsletter) {
  return {
    stopPlacement: extractStopPlacement(newsletter),
    positionSizing: extractPositionSizing(newsletter),
    keyRisks: extractKeyRisks(newsletter)
  };
}

function extractStopPlacement(newsletter) {
  // Look for stop placement guidance
  if (newsletter.match(/stop.*?(?:below|under).*?low/i)) {
    return "Place stops below recent lows";
  } else if (newsletter.match(/stop.*?(?:above|over).*?high/i)) {
    return "Place stops above recent highs";
  } else if (newsletter.match(/tight.*?stop/i)) {
    return "Use tight stops in current conditions";
  } else if (newsletter.match(/wider.*?stop/i)) {
    return "Allow for wider stops given volatility";
  } else {
    return "Standard stop placement below entry structure";
  }
}

function extractPositionSizing(newsletter) {
  // Look for position sizing guidance
  if (newsletter.match(/(?:reduce|smaller).*?size/i)) {
    return "Reduce position size given current conditions";
  } else if (newsletter.match(/(?:increase|larger).*?size/i)) {
    return "Can use larger size in favorable conditions";
  } else if (newsletter.match(/standard.*?size/i)) {
    return "Use standard position sizing";
  } else if (newsletter.match(/75\/15\/10/i)) {
    return "75/15/10 approach to position management";
  } else {
    return "Standard position sizing with level-to-level management";
  }
}

function extractKeyRisks(newsletter) {
  const keyRisks = [];
  
  // Look for risk mentions
  const riskPhrases = [
    "be cautious",
    "be careful",
    "risk is",
    "main risk",
    "key risk",
    "be aware",
    "watch for",
    "caution"
  ];
  
  for (const phrase of riskPhrases) {
    if (newsletter.toLowerCase().includes(phrase)) {
      // Extract the context
      const index = newsletter.toLowerCase().indexOf(phrase);
      const context = newsletter.substring(index, index + 100).replace(/\s+/g, ' ').trim();
      keyRisks.push(context);
    }
  }
  
  return keyRisks.length > 0 ? keyRisks : ["Standard execution risks"];
}

function extractFocusAreas(newsletter) {
  const focusAreas = [];
  
  // Check for likely focus areas based on content
  const focusPatterns = [
    { pattern: /failed\s+breakdown/i, area: "Failed Breakdowns at key levels" },
    { pattern: /mode\s+1/i, area: "Trending moves with trailing stops" },
    { pattern: /mode\s+2/i, area: "Range trading with level-to-level approach" },
    { pattern: /wait\s+for/i, area: "Patience for specific setups" },
    { pattern: /dip.*?buy/i, area: "Buying dips in uptrend" },
    { pattern: /bounce.*?sell/i, area: "Selling bounces in downtrend" }
  ];
  
  focusPatterns.forEach(({ pattern, area }) => {
    if (newsletter.match(pattern) && !focusAreas.includes(area)) {
      focusAreas.push(area);
    }
  });
  
  return focusAreas.length > 0 ? focusAreas : ["Key level interactions"];
}
```

### 9. Result Aggregation

```javascript
function analyzeMancini(input) {
  try {
    // Validate input
    const { newsletter, requestedComponents, outputFormat } = validateInput(input);
    
    // Preprocess newsletter
    const { cleanedText, newsletterDate } = preprocessNewsletter(newsletter);
    
    // Identify sections
    const sections = identifySections(cleanedText);
    
    // Detect market mode
    const modeResult = detectMarketMode(cleanedText);
    
    // Extract levels
    const levels = extractLevels(cleanedText);
    
    // Identify Failed Breakdowns
    const failedBreakdowns = identifyFailedBreakdowns(cleanedText);
    
    // Extract scenarios
    const scenarios = extractScenarios(cleanedText, levels);
    
    // Extract runner management
    const runnerManagement = extractRunnerManagement(cleanedText);
    
    // Extract trading strategy
    const tradingStrategy = extractTradingStrategy(cleanedText);
    
    // Determine directionality
    const directionBias = determineDirectionalBias(cleanedText, scenarios);
    
    // Determine volatility expectation
    const volatilityExp = determineVolatilityExpectation(cleanedText);
    
    // Generate metadata
    const metadata = {
      newsletterDate,
      processingTime: new Date().toISOString(),
      analysisVersion: "0.5.2-preview",
      components: requestedComponents,
      tradingSession: determineTradingSession(cleanedText)
    };
    
    // Assemble result
    const result = {
      marketAssessment: {
        mode: modeResult.mode,
        timeframe: "intraday",
        directionalBias: directionBias,
        volatilityExpectation: volatilityExp,
        keyCharacteristic: modeResult.characteristics[0] || "",
        contextNotes: extractContextNotes(cleanedText)
      },
      levelFramework: levels,
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

function determineDirectionalBias(newsletter, scenarios) {
  // Look for explicit bias mentions
  if (newsletter.match(/(?:bullish|buy|long).*?bias/i)) {
    return "bullish";
  } else if (newsletter.match(/(?:bearish|sell|short).*?bias/i)) {
    return "bearish";
  }
  
  // Compare bull and bear case probabilities
  if (scenarios.bullCase.probability > scenarios.bearCase.probability) {
    return "bullish";
  } else if (scenarios.bearCase.probability > scenarios.bullCase.probability) {
    return "bearish";
  }
  
  // Analyze content for directional clues
  const bullishWords = ["uptrend", "buy dips", "higher", "bullish", "long"];
  const bearishWords = ["downtrend", "sell rallies", "lower", "bearish", "short"];
  
  let bullishCount = 0;
  let bearishCount = 0;
  
  bullishWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = newsletter.match(regex);
    if (matches) {
      bullishCount += matches.length;
    }
  });
  
  bearishWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = newsletter.match(regex);
    if (matches) {
      bearishCount += matches.length;
    }
  });
  
  if (bullishCount > bearishCount * 1.5) {
    return "bullish";
  } else if (bearishCount > bullishCount * 1.5) {
    return "bearish";
  } else {
    return "neutral";
  }
}

function determineVolatilityExpectation(newsletter) {
  // Look for explicit volatility mentions
  if (newsletter.match(/(?:high|elevated|increased|rising).*?volatility/i)) {
    return "high";
  } else if (newsletter.match(/(?:low|reduced|decreased|falling).*?volatility/i)) {
    return "low";
  }
  
  // Look for implied volatility indicators
  if (newsletter.match(/(?:choppy|complex|trappy|wide|range)/i)) {
    return "high";
  } else if (newsletter.match(/(?:smooth|trending|steady|calm)/i)) {
    return "low";
  }
  
  return "medium";
}

function extractContextNotes(newsletter) {
  // Look for context notes
  const notePatterns = [
    /market.*?(?:is|has\sbeen).*?(?=\.|,|\n)/i,
    /ES.*?(?:is|has\sbeen).*?(?=\.|,|\n)/i,
    /today.*?(?:is|will\sbe).*?(?=\.|,|\n)/i
  ];
  
  for (const pattern of notePatterns) {
    const match = newsletter.match(pattern);
    if (match) {
      return match[0].trim();
    }
  }
  
  return "";
}

function determineTradingSession(newsletter) {
  // Determine trading session
  if (newsletter.match(/tomorrow|next\s+day|overnight/i)) {
    return "next_day";
  } else if (newsletter.match(/afternoon|evening|close/i)) {
    return "afternoon";
  } else if (newsletter.match(/morning|open/i)) {
    return "morning";
  } else {
    return "regular";
  }
}

function filterRequestedComponents(result, requestedComponents, format) {
  // If "all" is included, return everything
  if (requestedComponents.includes("all")) {
    return format === "summary" ? summarizeResult(result) : result;
  }
  
  // Otherwise, filter to requested components
  const filteredResult = {};
  
  if (requestedComponents.includes("mode")) {
    filteredResult.marketAssessment = result.marketAssessment;
  }
  
  if (requestedComponents.includes("levels")) {
    filteredResult.levelFramework = result.levelFramework;
  }
  
  if (requestedComponents.includes("failed-breakdowns")) {
    filteredResult.failedBreakdowns = result.failedBreakdowns;
  }
  
  if (requestedComponents.includes("scenarios")) {
    filteredResult.scenarios = result.scenarios;
  }
  
  if (requestedComponents.includes("runners")) {
    filteredResult.runnerManagement = result.runnerManagement;
  }
  
  // Always include metadata
  filteredResult.metadata = result.metadata;
  
  return format === "summary" ? summarizeResult(filteredResult) : filteredResult;
}

function summarizeResult(result) {
  // Create a summarized version of the result
  const summary = {
    marketMode: result.marketAssessment ? result.marketAssessment.mode : "Unknown",
    directionalBias: result.marketAssessment ? result.marketAssessment.directionalBias : "Unknown",
    keyLevels: {}
  };
  
  // Summarize levels
  if (result.levelFramework) {
    if (result.levelFramework.es) {
      summary.keyLevels.es = {
        support: result.levelFramework.es.support.slice(0, 3).map(l => l.price),
        resistance: result.levelFramework.es.resistance.slice(0, 3).map(l => l.price)
      };
    }
    
    if (result.levelFramework.spx) {
      summary.keyLevels.spx = {
        support: result.levelFramework.spx.support.slice(0, 3).map(l => l.price),
        resistance: result.levelFramework.spx.resistance.slice(0, 3).map(l => l.price)
      };
    }
  }
  
  // Summarize failed breakdowns
  if (result.failedBreakdowns) {
    summary.failedBreakdowns = result.failedBreakdowns.slice(0, 3).map(fb => ({
      level: fb.level,
      direction: fb.direction
    }));
  }
  
  // Include metadata
  summary.metadata = result.metadata;
  
  return summary;
}
```

## Example Usage

To use the Mancini Newsletter Analyzer, provide the complete text of Mancini's newsletter:

```
/analyze-mancini "4 Green Days In A Row. Can SPX Close Week With 5, Or Are Bulls Out Of Steam? May 16 Plan

MAY 16, 2025 ∙ PAID
Everyday since the market bottomed on April 6th, I've began this newsletter in a similar way..."
```

## Example Output

```json
{
  "marketAssessment": {
    "mode": "Mode 2",
    "timeframe": "intraday",
    "directionalBias": "neutral-to-bearish",
    "volatilityExpectation": "high",
    "keyCharacteristic": "Coiled tight range indicating impending volatility",
    "contextNotes": "Consolidation in bull flag pattern"
  },
  "levelFramework": { 
    "es": {
      "keyDecisionPoint": 5925,
      "support": [
        {
          "price": 5925,
          "type": "major",
          "significance": 8,
          "notes": "major",
          "testHistory": ["multiple tests"],
          "context": "First support down, resistance of the bull flag since Tuesday"
        },
        {
          "price": 5910,
          "type": "major",
          "significance": 8,
          "notes": "major",
          "testHistory": [],
          "context": ""
        },
        {
          "price": 5900,
          "type": "minor",
          "significance": 6,
          "notes": "",
          "testHistory": [],
          "context": ""
        }
      ],
      "resistance": [
        {
          "price": 5945,
          "type": "minor",
          "significance": 6,
          "notes": "",
          "testHistory": [],
          "context": ""
        },
        {
          "price": 5953,
          "type": "major",
          "significance": 8,
          "notes": "major",
          "testHistory": [],
          "context": ""
        },
        {
          "price": 5970,
          "type": "major",
          "significance": 9,
          "notes": "major level",
          "testHistory": [],
          "context": ""
        }
      ],
      "zones": [
        {
          "name": "Bull flag zone",
          "min": 5882,
          "max": 5925,
          "type": "consolidation",
          "significance": 9,
          "context": "Bull flag built since Tuesday"
        }
      ]
    },
    "spx": {
      "keyDecisionPoint": 5945,
      "support": [
        {
          "price": 5945,
          "type": "major",
          "significance": 8,
          "notes": "major",
          "testHistory": ["multiple tests"],
          "context": "First support down, resistance of the bull flag since Tuesday"
        },
        {
          "price": 5930,
          "type": "major",
          "significance": 8,
          "notes": "major",
          "testHistory": [],
          "context": ""
        },
        {
          "price": 5920,
          "type": "minor",
          "significance": 6,
          "notes": "",
          "testHistory": [],
          "context": ""
        }
      ],
      "resistance": [
        {
          "price": 5965,
          "type": "minor",
          "significance": 6,
          "notes": "",
          "testHistory": [],
          "context": ""
        },
        {
          "price": 5973,
          "type": "major",
          "significance": 8,
          "notes": "major",
          "testHistory": [],
          "context": ""
        },
        {
          "price": 5990,
          "type": "major",
          "significance": 9,
          "notes": "major level",
          "testHistory": [],
          "context": ""
        }
      ],
      "zones": [
        {
          "name": "Bull flag zone",
          "min": 5902,
          "max": 5945,
          "type": "consolidation",
          "significance": 9,
          "context": "Bull flag built since Tuesday"
        }
      ]
    }
  },
  "failedBreakdowns": [
    {
      "level": 5925,
      "index": "ES",
      "direction": "long",
      "condition": "flush and recover",
      "targetLevel": 5945,
      "stopReference": 5918,
      "timeWindow": "intraday",
      "probability": "medium",
      "notes": "5925 is first support down. This is an obvious one as it was resistance of the bull flag we built since late day Tuesday. This has already back-tested extensively this afternoon."
    },
    {
      "level": 5890,
      "index": "ES",
      "direction": "long",
      "condition": "drop below then reclaim",
      "targetLevel": 5925,
      "stopReference": 5882,
      "timeWindow": "intraday",
      "probability": "medium",
      "notes": "Flag support at 5882-85, potential Failed Breakdown if we see it flush and recover"
    }
  ],
  "scenarios": {
    "bullCase": {
      "trigger": "As long as bull flag at 5882-85 is intact",
      "targets": [5953, 5970, 6000],
      "keyLevels": [5925, 5882, 5945],
      "probability": 60,
      "conditions": ["ES remains in a near-parabolic uptrend", "Flag holds and breaks higher"]
    },
    "bearCase": {
      "trigger": "Failure of 5882-85",
      "targets": [5850, 5820],
      "keyLevels": [5882, 5850],
      "probability": 40,
      "conditions": ["Complete reversal of today's move", "Loss of bull flag support"]
    },
    "edgeCases": [
      {
        "scenario": "OPEX-related volatility",
        "trigger": "Tomorrow is OPEX day",
        "implications": "Extremely complex and choppy as price tends to pin around a magnet and make lots of swings",
        "probability": 30
      }
    ]
  },
  "runnerManagement": {
    "currentRunners": [
      {
        "entry": 5890,
        "currentStop": null,
        "recommendedStop": null,
        "target": null,
        "notes": "Holding 10% long runner from this morning's 8:30AM 5890 Failed Breakdown of yesterday's low"
      }
    ],
    "trailStrategy": "Standard trailing approach as per methodology",
    "stopAdjustmentRules": [],
    "managementNotes": "Remember that trade management is everything and infinitely more important than entries. You must always take profits level to level. Lock in 75% profits at first level, leave 25% runner, then lock in more at second level up, and let a 10% runner go."
  },