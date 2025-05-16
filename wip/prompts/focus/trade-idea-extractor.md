---
id: extract-focus
title: Trade Idea Extractor
description: Extracts and prioritizes high-conviction trade ideas from processed analyst inputs
author: Intent Trader Team
version: 1.0.0
release: 0.5.1
created: 2025-05-15
updated: 2025-05-15
category: focus
status: stable
tags: [focus, trade-ideas, filtering, prioritization, conviction]
requires: [prompts/premarket/analyze-dp.md, system/focus/conviction-classifier.md]
outputs: [prioritizedTradeIdeas]
input_format: json
output_format: json
ai_enabled: true
---

# Trade Idea Extractor

This component extracts, filters, and prioritizes high-conviction trade ideas from processed analyst inputs, creating a focused list of actionable opportunities.

## Purpose

The Trade Idea Extractor serves as a filtering and prioritization engine within the Intent Trader workflow, helping traders focus their attention on the highest-quality opportunities. It:

1. **Extracts trade ideas** from processed analyst inputs
2. **Filters ideas** based on minimum conviction thresholds
3. **Prioritizes opportunities** by conviction level and technical confirmation
4. **Enhances idea details** with additional context and parameters
5. **Organizes ideas** into actionable categories

This focused list allows traders to concentrate on the most promising opportunities while filtering out lower-conviction or incomplete ideas.

## Input Parameters

- `analyzerOutput` (required): Output from analyst processing (e.g., `/analyze-dp`)
  - Must contain a `focusIdeas` array
  - Each idea must have ticker, direction, and conviction properties
- `minConviction` (optional): Minimum conviction level to include (default: "low")
  - Supported values: "focus-trade", "high", "medium", "low"
- `maxIdeas` (optional): Maximum number of ideas to return (default: all)
  - Integer value > 0
- `includeTechnical` (optional): Whether to include technical analysis context (default: true)
  - Boolean value
- `includeRaw` (optional): Whether to include raw analyst text (default: false)
  - Boolean value

## Output Format

The component produces a structured list of prioritized trade ideas:

```json
{
  "filteredIdeas": [
    {
      "ticker": "string",
      "direction": "long/short",
      "conviction": {
        "level": "focus-trade/high/medium/low",
        "phrases": ["string"],
        "confidence": "number"
      },
      "entryParameters": {
        "zone": {"min": "number", "max": "number"},
        "condition": "string",
        "strategy": "string"
      },
      "exitParameters": {
        "stopLoss": "number",
        "target": "number",
        "secondaryTarget": "number",
        "runnerTarget": "number",
        "strategy": "string"
      },
      "setup": {
        "type": "string",
        "stage": "developing/mature/confirmed",
        "timeframe": "intraday/swing/position"
      },
      "technicalContext": {
        "keyLevels": [{"price": "number", "type": "string"}],
        "movingAverages": {"ma8": "number", "ma21": "number"},
        "patterns": ["string"]
      },
      "source": {
        "analyst": "string",
        "timeStamp": "datetime",
        "rawText": "string"
      },
      "riskReward": {
        "ratio": "number",
        "initialRisk": "number",
        "potentialReward": "number"
      },
      "priority": "number"
    }
  ],
  "summary": {
    "totalIdeas": "number",
    "filteredCount": "number",
    "convictionBreakdown": {
      "focusTrade": "number",
      "high": "number",
      "medium": "number",
      "low": "number"
    },
    "directionBreakdown": {
      "long": "number",
      "short": "number"
    },
    "setupBreakdown": {
      "setupType1": "number",
      "setupType2": "number"
    }
  },
  "metadata": {
    "processingTime": "number",
    "convictionThreshold": "string",
    "maxIdeas": "number",
    "filters": ["applied filters"],
    "sortCriteria": ["sorting criteria"]
  }
}
```

## Error Handling

The extractor handles various error conditions and edge cases:

### Input Validation Errors
- **Missing Required Input**: Returns error if analyzerOutput or focusIdeas array is missing
- **Invalid Conviction Level**: Validates minConviction against supported values, falls back to default
- **Invalid maxIdeas**: Ensures maxIdeas is positive integer, falls back to default

### Processing Errors
- **Empty Ideas Array**: Returns empty result with appropriate metadata
- **Missing Conviction Data**: Applies default "low" conviction with warning
- **Missing Parameters**: Preserves incomplete ideas but flags them with lower priority

### Recovery Strategies
- **Partial Processing**: Returns successfully processed ideas even when others fail
- **Graceful Degradation**: Falls back to simpler filtering when complex logic fails
- **Default Parameters**: Applies reasonable defaults for missing parameters

## Processing Logic

The Trade Idea Extractor applies the following methodology:

### 1. Input Validation and Preprocessing

The system first validates the input and prepares it for processing:

```javascript
function validateAndPreprocess(input) {
  // Validate required fields
  if (!input || !input.analyzerOutput || !input.analyzerOutput.focusIdeas) {
    throw new Error("Missing required input: analyzerOutput.focusIdeas");
  }
  
  // Extract and normalize parameters
  const {
    analyzerOutput,
    minConviction = "low",
    maxIdeas = Number.MAX_SAFE_INTEGER,
    includeTechnical = true,
    includeRaw = false
  } = input;
  
  // Validate minConviction
  const validConvictionLevels = ["focus-trade", "high", "medium", "low"];
  const normalizedConviction = validConvictionLevels.includes(minConviction) 
    ? minConviction 
    : "low";
  
  // Validate maxIdeas
  const normalizedMaxIdeas = Number.isInteger(maxIdeas) && maxIdeas > 0
    ? maxIdeas
    : Number.MAX_SAFE_INTEGER;
  
  // Extract ideas and normalize
  const ideas = analyzerOutput.focusIdeas.map(normalizeIdea);
  
  return {
    ideas,
    normalizedConviction,
    normalizedMaxIdeas,
    includeTechnical,
    includeRaw,
    analyzerOutput
  };
}

function normalizeIdea(idea) {
  // Ensure required fields exist
  return {
    ticker: idea.ticker || "",
    direction: idea.direction || "long",
    conviction: idea.conviction || { level: "low", phrases: [] },
    entryParameters: idea.entryParameters || { zone: {}, condition: "" },
    exitParameters: idea.exitParameters || {},
    ...idea
  };
}
```

### 2. Conviction-Based Filtering

The system filters ideas based on conviction level thresholds:

```javascript
function filterByConviction(ideas, minConviction) {
  // Define conviction level hierarchy
  const convictionHierarchy = {
    "focus-trade": 4,
    "high": 3,
    "medium": 2,
    "low": 1
  };
  
  // Get minimum conviction level value
  const minConvictionValue = convictionHierarchy[minConviction] || 1;
  
  // Filter ideas by conviction level
  return ideas.filter(idea => {
    const ideaConvictionValue = convictionHierarchy[idea.conviction.level] || 1;
    return ideaConvictionValue >= minConvictionValue;
  });
}
```

### 3. Idea Enhancement

The system enhances each idea with additional context and parameters:

```javascript
function enhanceIdeas(ideas, analyzerOutput, includeTechnical, includeRaw) {
  return ideas.map(idea => {
    // Start with original idea
    const enhancedIdea = { ...idea };
    
    // Calculate risk/reward ratio if possible
    if (idea.exitParameters.target && idea.exitParameters.stopLoss) {
      const entryPrice = (idea.entryParameters.zone.min + idea.entryParameters.zone.max) / 2 || 
                         idea.entryParameters.zone.min || 
                         idea.entryParameters.zone.max;
      
      if (entryPrice) {
        const riskAmount = Math.abs(entryPrice - idea.exitParameters.stopLoss);
        const rewardAmount = Math.abs(idea.exitParameters.target - entryPrice);
        
        enhancedIdea.riskReward = {
          ratio: rewardAmount / riskAmount,
          initialRisk: riskAmount,
          potentialReward: rewardAmount
        };
      }
    }
    
    // Determine setup type and stage
    enhancedIdea.setup = determineSetupType(idea);
    
    // Add technical context if requested
    if (includeTechnical) {
      enhancedIdea.technicalContext = extractTechnicalContext(idea, analyzerOutput);
    }
    
    // Add source information
    enhancedIdea.source = {
      analyst: analyzerOutput.analyst || "unknown",
      timeStamp: analyzerOutput.processedAt || new Date().toISOString()
    };
    
    // Add raw text if requested
    if (includeRaw && idea.rawText) {
      enhancedIdea.source.rawText = idea.rawText;
    }
    
    return enhancedIdea;
  });
}

function determineSetupType(idea) {
  // Default setup
  const setup = {
    type: "unknown",
    stage: "developing",
    timeframe: "intraday"
  };
  
  // Check for day-after-trade (DAT)
  if (idea.isDayAfterTrade || (idea.rationale && idea.rationale.toLowerCase().includes("day after"))) {
    setup.type = "day-after-trade";
    setup.timeframe = "intraday";
  }
  
  // Check for swing trade
  if (idea.tradeDuration === "swing" || 
      (idea.rationale && idea.rationale.toLowerCase().includes("swing"))) {
    setup.timeframe = "swing";
  }
  
  // Check for common setup types in rationale
  const rationale = idea.rationale || "";
  if (rationale.includes("breakout")) setup.type = "breakout";
  else if (rationale.includes("breakdown")) setup.type = "breakdown";
  else if (rationale.includes("pullback")) setup.type = "pullback";
  else if (rationale.includes("flag")) setup.type = "flag";
  else if (rationale.includes("support")) setup.type = "support-bounce";
  else if (rationale.includes("resistance")) setup.type = "resistance-rejection";
  
  // Determine stage from parameters completeness
  if (idea.entryParameters.zone.min && idea.entryParameters.zone.max && 
      idea.exitParameters.stopLoss && idea.exitParameters.target) {
    setup.stage = "confirmed";
  } else if (idea.entryParameters.zone.min || idea.entryParameters.zone.max) {
    setup.stage = "mature";
  }
  
  return setup;
}

function extractTechnicalContext(idea, analyzerOutput) {
  const technicalContext = {
    keyLevels: [],
    movingAverages: {},
    patterns: []
  };
  
  // Extract moving averages if available
  const stockLevels = analyzerOutput.levels && analyzerOutput.levels.stocks || [];
  const matchingStock = stockLevels.find(stock => stock.ticker === idea.ticker);
  
  if (matchingStock) {
    if (matchingStock.movingAverages) {
      technicalContext.movingAverages = matchingStock.movingAverages;
    }
    
    // Extract support/resistance levels
    if (matchingStock.levels) {
      if (matchingStock.levels.support) {
        technicalContext.keyLevels.push(
          ...matchingStock.levels.support.map(level => ({
            price: level.value,
            type: "support"
          }))
        );
      }
      
      if (matchingStock.levels.resistance) {
        technicalContext.keyLevels.push(
          ...matchingStock.levels.resistance.map(level => ({
            price: level.value,
            type: "resistance"
          }))
        );
      }
    }
  }
  
  // Extract patterns from rationale
  const rationale = idea.rationale || "";
  const commonPatterns = [
    "bull flag", "bear flag", "double bottom", "double top",
    "head and shoulders", "inverse head and shoulders",
    "triangle", "wedge", "channel", "cup and handle"
  ];
  
  commonPatterns.forEach(pattern => {
    if (rationale.toLowerCase().includes(pattern)) {
      technicalContext.patterns.push(pattern);
    }
  });
  
  return technicalContext;
}
```

### 4. Idea Prioritization

The system prioritizes ideas based on multiple factors:

```javascript
function prioritizeIdeas(ideas) {
  // Define base priority scores by conviction
  const convictionScores = {
    "focus-trade": 100,
    "high": 80,
    "medium": 60,
    "low": 40
  };
  
  // Calculate priority scores
  return ideas.map(idea => {
    // Start with conviction-based score
    let priorityScore = convictionScores[idea.conviction.level] || 40;
    
    // Adjust for setup stage
    if (idea.setup.stage === "confirmed") priorityScore += 10;
    else if (idea.setup.stage === "mature") priorityScore += 5;
    
    // Adjust for risk/reward ratio
    if (idea.riskReward && idea.riskReward.ratio) {
      if (idea.riskReward.ratio >= 3) priorityScore += 15;
      else if (idea.riskReward.ratio >= 2) priorityScore += 10;
      else if (idea.riskReward.ratio >= 1.5) priorityScore += 5;
    }
    
    // Adjust for technical confirmation
    if (idea.technicalContext) {
      // MA alignment bonus
      if (idea.technicalContext.movingAverages) {
        if (idea.direction === "long" && 
            hasPositiveMAAlignment(idea.technicalContext.movingAverages)) {
          priorityScore += 5;
        } else if (idea.direction === "short" && 
                  hasNegativeMAAlignment(idea.technicalContext.movingAverages)) {
          priorityScore += 5;
        }
      }
      
      // Pattern bonus
      if (idea.technicalContext.patterns && idea.technicalContext.patterns.length > 0) {
        priorityScore += 5;
      }
    }
    
    // Penalize missing parameters
    if (!idea.entryParameters.zone.min && !idea.entryParameters.zone.max) {
      priorityScore -= 15;
    }
    
    if (!idea.exitParameters.stopLoss) priorityScore -= 10;
    if (!idea.exitParameters.target) priorityScore -= 10;
    
    // Add priority to idea
    return {
      ...idea,
      priority: priorityScore
    };
  });
}

function hasPositiveMAAlignment(movingAverages) {
  // Check for bullish MA alignment (shorter MAs above longer MAs)
  const mas = Object.entries(movingAverages)
    .map(([key, value]) => ({
      period: parseInt(key.replace('ma', '')),
      value
    }))
    .sort((a, b) => a.period - b.period);
  
  // Need at least 2 MAs to compare
  if (mas.length < 2) return false;
  
  // Check if shorter MA is above longer MA
  for (let i = 0; i < mas.length - 1; i++) {
    if (mas[i].value < mas[i+1].value) return false;
  }
  
  return true;
}

function hasNegativeMAAlignment(movingAverages) {
  // Check for bearish MA alignment (shorter MAs below longer MAs)
  const mas = Object.entries(movingAverages)
    .map(([key, value]) => ({
      period: parseInt(key.replace('ma', '')),
      value
    }))
    .sort((a, b) => a.period - b.period);
  
  // Need at least 2 MAs to compare
  if (mas.length < 2) return false;
  
  // Check if shorter MA is below longer MA
  for (let i = 0; i < mas.length - 1; i++) {
    if (mas[i].value > mas[i+1].value) return false;
  }
  
  return true;
}
```

### 5. Result Generation

The system generates the final result with categorization and analysis:

```javascript
function generateResult(prioritizedIdeas, originalCount, params) {
  // Sort ideas by priority (descending)
  const sortedIdeas = [...prioritizedIdeas].sort((a, b) => b.priority - a.priority);
  
  // Apply maxIdeas limit
  const limitedIdeas = sortedIdeas.slice(0, params.normalizedMaxIdeas);
  
  // Generate summary statistics
  const summary = {
    totalIdeas: originalCount,
    filteredCount: limitedIdeas.length,
    convictionBreakdown: countByProperty(limitedIdeas, idea => idea.conviction.level),
    directionBreakdown: countByProperty(limitedIdeas, idea => idea.direction),
    setupBreakdown: countByProperty(limitedIdeas, idea => idea.setup.type)
  };
  
  // Generate metadata
  const metadata = {
    processingTime: new Date().getTime(),
    convictionThreshold: params.normalizedConviction,
    maxIdeas: params.normalizedMaxIdeas,
    filters: [`conviction >= ${params.normalizedConviction}`],
    sortCriteria: ["priority"]
  };
  
  return {
    filteredIdeas: limitedIdeas,
    summary,
    metadata
  };
}

function countByProperty(array, propertyAccessor) {
  return array.reduce((counts, item) => {
    const value = propertyAccessor(item);
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}
```

### 6. Main Processing Function

The main function orchestrates the entire extraction process:

```javascript
function extractFocus(input) {
  try {
    // Validate and preprocess input
    const params = validateAndPreprocess(input);
    const { ideas, normalizedConviction, analyzerOutput, includeTechnical, includeRaw } = params;
    
    // Track original count
    const originalCount = ideas.length;
    
    // Filter ideas by conviction
    const filteredIdeas = filterByConviction(ideas, normalizedConviction);
    
    // Enhance ideas with additional context
    const enhancedIdeas = enhanceIdeas(filteredIdeas, analyzerOutput, includeTechnical, includeRaw);
    
    // Prioritize ideas
    const prioritizedIdeas = prioritizeIdeas(enhancedIdeas);
    
    // Generate final result
    return generateResult(prioritizedIdeas, originalCount, params);
  } catch (error) {
    // Handle errors
    return {
      filteredIdeas: [],
      summary: {
        totalIdeas: 0,
        filteredCount: 0,
        convictionBreakdown: {},
        directionBreakdown: {},
        setupBreakdown: {}
      },
      metadata: {
        processingTime: new Date().getTime(),
        error: error.message,
        status: "error"
      }
    };
  }
}
```

## Conviction Level Hierarchy

The Trade Idea Extractor uses a standardized conviction level hierarchy:

1. **Focus Trade**: Highest conviction level
   - Explicit focus designation from analyst
   - Strong emotional language ("love it", "very excited")
   - Comprehensive parameters with high confidence
   - Typically represents analyst's top ideas

2. **High**: Strong conviction level
   - Clear positive language ("very bullish", "great setup")
   - Well-defined parameters and rationale
   - Often represents analyst's active positions

3. **Medium**: Moderate conviction level
   - Positive but measured language ("interesting", "viable")
   - Most parameters defined but may have conditions
   - Represents solid secondary opportunities

4. **Low**: Basic conviction level
   - Tentative language ("might work", "could be okay")
   - Often missing some parameters
   - Represents watchlist candidates

## Example Output Categories

The Trade Idea Extractor organizes ideas into these useful categories:

### A-Grade Setups (95+ priority)
- High conviction with complete parameters
- Strong technical alignment
- Favorable risk/reward (2R+)
- Clear entry and exit conditions

### B-Grade Setups (75-94 priority)
- Medium-high conviction with good parameters
- Decent technical alignment
- Reasonable risk/reward (1.5R+)
- Defined entry conditions

### C-Grade Setups (50-74 priority)
- Medium conviction or incomplete parameters
- Limited technical confirmation
- Undefined or unfavorable risk/reward
- Conditional entry requirements

### Watchlist Candidates (<50 priority)
- Low conviction or significantly incomplete
- Missing key parameters
- Requiring further development
- Early-stage pattern formation

## Example Usage

```
/extract-focus --analyzerOutput=<output from analyze-dp> --minConviction=medium --maxIdeas=5 --includeTechnical=true
```

## Test Vector

**Input**:
```json
{
  "analyzerOutput": {
    "marketContext": {
      "futures": {"status": "slightly lower", "catalysts": ["awaiting CPI"]},
      "indices": {
        "dow": {"direction": "down", "change": "over 200 points"},
        "nasdaq": {"direction": "down", "change": "10-15 points"}
      },
      "sentiment": "mixed, cautious ahead of CPI"
    },
    "focusIdeas": [
      {
        "ticker": "TEM",
        "direction": "long",
        "conviction": {"level": "high", "phrases": ["love TEM right now"]},
        "entryParameters": {"zone": {"min": 60, "max": 62}, "condition": "current range"},
        "exitParameters": {"stopLoss": 58, "target": 68},
        "rationale": "great entry point for a swing trade"
      },
      {
        "ticker": "HOOD",
        "direction": "long",
        "conviction": {"level": "high", "phrases": ["looking to add more", "remain very bullish"]},
        "entryParameters": {"zone": {"min": 56, "max": 56}, "condition": "if it gets to 56"},
        "exitParameters": {"stopLoss": 53, "target": 62},
        "rationale": "remain very bullish on this name"
      },
      {
        "ticker": "BABA",
        "direction": "short",
        "conviction": {"level": "medium", "phrases": ["could be a decent day-after-trade", "might be worth a speculative short"]},
        "entryParameters": {"zone": {"min": 121, "max": 121}, "condition": "if it gets to its 21-day MA around 121"},
        "exitParameters": {"stopLoss": 124, "target": 115},
        "rationale": "day-after-trade opportunity"
      },
      {
        "ticker": "CRWV",
        "direction": "long",
        "conviction": {"level": "medium", "phrases": ["interesting on any pullback", "viable swing trade"]},
        "entryParameters": {"zone": {"min": null, "max": null}, "condition": "on any pullback"},
        "exitParameters": {"stopLoss": null, "target": null},
        "rationale": "viable swing trade opportunity"
      },
      {
        "ticker": "AMD",
        "direction": "long",
        "conviction": {"level": "medium", "phrases": ["could work", "might be worth trying some calls"]},
        "entryParameters": {"zone": {"min": 115, "max": 115}, "condition": "around 115"},
        "exitParameters": {"stopLoss": 112, "target": 120},
        "rationale": "worth trying some calls"
      },
      {
        "ticker": "TSLA",
        "direction": "long",
        "conviction": {"level": "low", "phrases": ["only interesting near the 8-day MA", "would not chase"]},
        "entryParameters": {"zone": {"min": 309, "max": 309}, "condition": "near the 8-day MA"},
        "exitParameters": {"stopLoss": 305, "target": 315},
        "rationale": "only interesting near the 8-day MA"
      }
    ],
    "levels": {
      "stocks": [
        {
          "ticker": "TSLA",
          "levels": {
            "support": [{"value": 300, "type": "support"}],
            "resistance": [{"value": 320, "type": "resistance"}]
          },
          "movingAverages": {"ma8": 309, "ma21": 300}
        },
        {
          "ticker": "AMD",
          "levels": {
            "support": [{"value": 112, "type": "support"}],
            "resistance": [{"value": 120, "type": "resistance"}]
          },
          "movingAverages": {"ma8": 117, "ma21": 115}
        }
      ]
    },
    "processedAt": "2025-05-15T09:30:00Z",
    "analyst": "dp"
  },
  "minConviction": "medium",
  "maxIdeas": 5,
  "includeTechnical": true,
  "includeRaw": false
}
```

**Expected Output**:
```json
{
  "filteredIdeas": [
    {
      "ticker": "TEM",
      "direction": "long",
      "conviction": {"level": "high", "phrases": ["love TEM right now"]},
      "entryParameters": {"zone": {"min": 60, "max": 62}, "condition": "current range", "strategy": "Enter within range"},
      "exitParameters": {"stopLoss": 58, "target": 68, "secondaryTarget": 71, "runnerTarget": 75, "strategy": "Standard 75/15/10 rule"},
      "setup": {
        "type": "support-bounce",
        "stage": "confirmed",
        "timeframe": "swing"
      },
      "riskReward": {
        "ratio": 2.0,
        "initialRisk": 3.0,
        "potentialReward": 6.0
      },
      "technicalContext": {
        "keyLevels": [],
        "movingAverages": {},
        "patterns": []
      },
      "source": {
        "analyst": "dp",
        "timeStamp": "2025-05-15T09:30:00Z"
      },
      "priority": 95
    },
    {
      "ticker": "HOOD",
      "direction": "long",
      "conviction": {"level": "high", "phrases": ["looking to add more", "remain very bullish"]},
      "entryParameters": {"zone": {"min": 56, "max": 56}, "condition": "if it gets to 56", "strategy": "Limit order at specific price"},
      "exitParameters": {"stopLoss": 53, "target": 62, "secondaryTarget": 65, "runnerTarget": 68, "strategy": "Standard 75/15/10 rule"},
      "setup": {
        "type": "support-bounce",
        "stage": "confirmed",
        "timeframe": "swing"
      },
      "riskReward": {
        "ratio": 2.0,
        "initialRisk": 3.0,
        "potentialReward": 6.0
      },
      "technicalContext": {
        "keyLevels": [],
        "movingAverages": {},
        "patterns": []
      },
      "source": {
        "analyst": "dp",
        "timeStamp": "2025-05-15T09:30:00Z"
      },
      "priority": 95
    },
    {
      "ticker": "BABA",
      "direction": "short",
      "conviction": {"level": "medium", "phrases": ["could be a decent day-after-trade", "might be worth a speculative short"]},
      "entryParameters": {"zone": {"min": 121, "max": 121}, "condition": "if it gets to its 21-day MA around 121", "strategy": "Limit order at MA test"},
      "exitParameters": {"stopLoss": 124, "target": 115, "secondaryTarget": 112, "runnerTarget": 108, "strategy": "Standard 75/15/10 rule"},
      "setup": {
        "type": "day-after-trade",
        "stage": "confirmed",
        "timeframe": "intraday"
      },
      "riskReward": {
        "ratio": 2.0,
        "initialRisk": 3.0,
        "potentialReward": 6.0
      },
      "technicalContext": {
        "keyLevels": [],
        "movingAverages": {},
        "patterns": []
      },
      "source": {
        "analyst": "dp",
        "timeStamp": "2025-05-15T09:30:00Z"
      },
      "priority": 75
    },
    {
      "ticker": "AMD",
      "direction": "long",
      "conviction": {"level": "medium", "phrases": ["could work", "might be worth trying some calls"]},
      "entryParameters": {"zone": {"min": 115, "max": 115}, "condition": "around 115", "strategy": "Options trade near level"},
      "exitParameters": {"stopLoss": 112, "target": 120, "secondaryTarget": 123, "runnerTarget": 126, "strategy": "Options profit taking"},
      "setup": {
        "type": "support-bounce",
        "stage": "confirmed",
        "timeframe": "swing"
      },
      "riskReward": {
        "ratio": 1.67,
        "initialRisk": 3.0,
        "potentialReward": 5.0
      },
      "technicalContext": {
        "keyLevels": [
          {"price": 112, "type": "support"},
          {"price": 120, "type": "resistance"}
        ],
        "movingAverages": {"ma8": 117, "ma21": 115},
        "patterns": []
      },
      "source": {
        "analyst": "dp",
        "timeStamp": "2025-05-15T09:30:00Z"
      },
      "priority": 75
    },
    {
      "ticker": "CRWV",
      "direction": "long",
      "conviction": {"level": "medium", "phrases": ["interesting on any pullback", "viable swing trade"]},
      "entryParameters": {"zone": {"min": null, "max": null}, "condition": "on any pullback", "strategy": "Enter on pullback"},
      "exitParameters": {"stopLoss": null, "target": null, "secondaryTarget": null, "runnerTarget": null, "strategy": "To be determined"},
      "setup": {
        "type": "pullback",
        "stage": "developing",
        "timeframe": "swing"
      },
      "technicalContext": {
        "keyLevels": [],
        "movingAverages": {},
        "patterns": []
      },
      "source": {
        "analyst": "dp",
        "timeStamp": "2025-05-15T09:30:00Z"
      },
      "priority": 35
    }
  ],
  "summary": {
    "totalIdeas": 6,
    "filteredCount": 5,
    "convictionBreakdown": {
      "high": 2,
      "medium": 3
    },
    "directionBreakdown": {
      "long": 4,
      "short": 1
    },
    "setupBreakdown": {
      "support-bounce": 3,
      "day-after-trade": 1,
      "pullback": 1
    }
  },
  "metadata": {
    "processingTime": 1721083440000,
    "convictionThreshold": "medium",
    "maxIdeas": 5,
    "filters": ["conviction >= medium"],
    "sortCriteria": ["priority"]
  }
}
```

## Implementation Notes

The Trade Idea Extractor is designed to focus attention on the highest-quality opportunities while filtering out noise. Key design considerations include:

1. **Priority-Based Filtering**: Ideas are ranked by a comprehensive scoring system that considers conviction, technical alignment, parameter completeness, and risk/reward.

2. **Parameter Enhancement**: The extractor enriches ideas with additional context, completing missing parameters where possible and adding technical information.

3. **Setup Classification**: Ideas are classified by setup type, stage, and timeframe to enable better filtering and organization.

4. **Risk/Reward Calculation**: When sufficient parameters are available, risk/reward ratios are calculated to aid in prioritization.

5. **Technical Integration**: The extractor integrates technical context from level data and moving average relationships.

The implementation is optimized for the FOCUS phase of trading, helping traders narrow their attention to the most promising opportunities.

## Integration Details

### Analyzer Output Integration

The Trade Idea Extractor is designed to work with output from various analyzer components, particularly:

1. **DP Analyzer Integration**:
   - Extracts focus ideas from DP morning call analysis
   - Uses conviction classification from DP-specific patterns
   - Integrates with technical level data for DP-mentioned tickers

2. **Mancini Analyzer Integration** (future):
   - Will extract setups from Mancini newsletter analysis
   - Will use Mancini-specific conviction patterns
   - Will focus on Failed Breakdown setups with level integration

### Trade Plan Integration

The filtered ideas feed directly into the trade planning process:

1. **Plan Generation**: Prioritized ideas become the foundation for the daily trade plan
2. **Risk Allocation**: Conviction levels inform risk allocation decisions
3. **Execution Sequencing**: Priority scores guide execution order

## Future Enhancements

Planned enhancements for future versions include:

1. **Multi-Source Integration**: Combine ideas from multiple analysts with source-specific weightings
2. **Historical Performance Tracking**: Incorporate success rates by setup type and analyst
3. **Pattern Recognition**: Enhanced technical pattern detection from price data
4. **Custom Filtering Rules**: User-defined filters based on various parameters

## Related Components

The Trade Idea Extractor works closely with:
- `prompts/premarket/analyze-dp.md` - Source of focus ideas
- `system/focus/conviction-classifier.md` - For standardized conviction assessment
- `prompts/premarket/create-plan.md` - Consumer of filtered ideas
- `prompts/premarket/extract-levels.md` - Provider of technical context
