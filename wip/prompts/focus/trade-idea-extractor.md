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
      "entryParameters": {"zone": {"min": "number", "max": "number"}, "condition": "string"},
      "exitParameters": {"stopLoss": "number", "target": "number"},
      "rationale": "string",
      "priority": "number"
    }
  ],
  "summary": {
    "totalIdeas": "number",
    "filteredCount": "number",
    "convictionBreakdown": {
      "focus-trade": "number",
      "high": "number",
      "medium": "number",
      "low": "number"
    }
  }
}
```

## Processing Logic

The Trade Idea Extractor applies the following methodology:

### 1. Input Validation and Preprocessing

First, the component validates the input structure and normalizes the parameters:

```javascript
function validateInput(input) {
  // Check for required fields
  if (!input || !input.analyzerOutput || !input.analyzerOutput.focusIdeas) {
    throw new Error("Missing required input: analyzerOutput.focusIdeas");
  }
  
  // Extract and normalize parameters
  const {
    analyzerOutput,
    minConviction = "low",
    maxIdeas = Number.MAX_SAFE_INTEGER,
    includeTechnical = true
  } = input;
  
  // Validate minConviction
  const validConvictionLevels = ["focus-trade", "high", "medium", "low"];
  if (!validConvictionLevels.includes(minConviction)) {
    throw new Error(`Invalid conviction level: ${minConviction}. Must be one of: focus-trade, high, medium, low`);
  }
  
  // Validate maxIdeas
  if (maxIdeas !== undefined && (!Number.isInteger(maxIdeas) || maxIdeas <= 0)) {
    throw new Error(`Invalid maxIdeas: ${maxIdeas}. Must be a positive integer`);
  }
  
  return {
    focusIdeas: analyzerOutput.focusIdeas,
    minConviction,
    maxIdeas,
    includeTechnical,
    analyzerOutput
  };
}
```

### 2. Conviction-Based Filtering

The component filters ideas based on the minimum conviction threshold, using the conviction levels from the Conviction Classification System:

```javascript
function filterByConviction(ideas, minConviction) {
  // Define conviction level hierarchy matching the Conviction Classification System
  const convictionLevels = {
    "focus-trade": 4,
    "high": 3,
    "medium": 2,
    "low": 1,
    "negative": 0
  };
  
  // Get minimum conviction level value
  const minConvictionValue = convictionLevels[minConviction];
  
  // Filter ideas by conviction level
  return ideas.filter(idea => {
    const ideaConvictionValue = convictionLevels[idea.conviction.level] || 0;
    return ideaConvictionValue >= minConvictionValue;
  });
}
```

### 3. Idea Prioritization

The component calculates a priority score for each idea based on multiple factors, leveraging the existing Conviction Classification System:

```javascript
// Import the conviction classifier
const convictionClassifier = require('../../system/focus/conviction-classifier');

function prioritizeIdeas(ideas) {
  return ideas.map(idea => {
    // Start with base priority based on conviction
    let priority = getBaseConvictionScore(idea.conviction.level, idea.conviction.confidence || 0.7);
    
    // Adjust for completeness of parameters
    priority += getCompletenessScore(idea);
    
    // Adjust for risk/reward ratio if available
    priority += getRiskRewardScore(idea);
    
    // Return idea with priority
    return {
      ...idea,
      priority
    };
  });
}

function getBaseConvictionScore(level, confidence) {
  // Base priority scores by conviction level
  // Aligns with the Conviction Classification System levels
  const scores = {
    "focus-trade": 100,
    "high": 80,
    "medium": 60,
    "low": 40,
    "negative": 0
  };
  
  // Use the confidence score to adjust the base priority
  const baseScore = scores[level] || 40;
  const confidenceAdjustment = Math.round((confidence - 0.7) * 20); // Adjust by ±20 based on confidence
  
  return baseScore + confidenceAdjustment;
}

function getCompletenessScore(idea) {
  let score = 0;
  
  // Check entry parameters
  if (idea.entryParameters) {
    // Entry zone specified
    if (idea.entryParameters.zone) {
      if (idea.entryParameters.zone.min !== null && idea.entryParameters.zone.min !== undefined) {
        score += 5;
      }
      if (idea.entryParameters.zone.max !== null && idea.entryParameters.zone.max !== undefined) {
        score += 5;
      }
    }
    
    // Entry condition specified
    if (idea.entryParameters.condition) {
      score += 5;
    }
  }
  
  // Check exit parameters
  if (idea.exitParameters) {
    // Stop loss specified
    if (idea.exitParameters.stopLoss !== null && idea.exitParameters.stopLoss !== undefined) {
      score += 5;
    }
    
    // Target specified
    if (idea.exitParameters.target !== null && idea.exitParameters.target !== undefined) {
      score += 5;
    }
  }
  
  // Check rationale
  if (idea.rationale) {
    score += 5;
  }
  
  return score;
}

function getRiskRewardScore(idea) {
  // Calculate risk/reward ratio if possible
  if (idea.exitParameters && 
      idea.exitParameters.stopLoss !== null && 
      idea.exitParameters.stopLoss !== undefined &&
      idea.exitParameters.target !== null && 
      idea.exitParameters.target !== undefined &&
      idea.entryParameters && 
      idea.entryParameters.zone) {
    
    // Calculate approx entry price (midpoint of zone or single value)
    let entryPrice;
    if (idea.entryParameters.zone.min !== null && idea.entryParameters.zone.min !== undefined &&
        idea.entryParameters.zone.max !== null && idea.entryParameters.zone.max !== undefined) {
      entryPrice = (idea.entryParameters.zone.min + idea.entryParameters.zone.max) / 2;
    } else if (idea.entryParameters.zone.min !== null && idea.entryParameters.zone.min !== undefined) {
      entryPrice = idea.entryParameters.zone.min;
    } else if (idea.entryParameters.zone.max !== null && idea.entryParameters.zone.max !== undefined) {
      entryPrice = idea.entryParameters.zone.max;
    }
    
    if (entryPrice) {
      const risk = Math.abs(entryPrice - idea.exitParameters.stopLoss);
      const reward = Math.abs(idea.exitParameters.target - entryPrice);
      
      if (risk > 0) {
        const ratio = reward / risk;
        
        // Award points based on R/R ratio
        if (ratio >= 3) return 15;
        if (ratio >= 2) return 10;
        if (ratio >= 1.5) return 5;
      }
    }
  }
  
  return 0;
}
```

### 4. Idea Enhancement

The component can enhance trade ideas with additional information like setup type and technical context:

```javascript
function enhanceIdeas(ideas, analyzerOutput, includeTechnical) {
  return ideas.map(idea => {
    // Create a copy of the idea to enhance
    const enhancedIdea = { ...idea };
    
    // Determine setup type and timeframe based on rationale
    enhancedIdea.setup = determineSetupType(idea);
    
    // Add risk/reward calculation if possible
    if (canCalculateRiskReward(idea)) {
      enhancedIdea.riskReward = calculateRiskReward(idea);
    }
    
    // Add technical context if requested
    if (includeTechnical) {
      enhancedIdea.technicalContext = extractTechnicalContext(idea, analyzerOutput);
    }
    
    return enhancedIdea;
  });
}

function determineSetupType(idea) {
  const setup = {
    type: "unknown",
    stage: "developing",
    timeframe: "intraday"
  };
  
  // Check rationale text for clues
  const rationale = (idea.rationale || "").toLowerCase();
  
  // Determine setup type
  if (rationale.includes("day after") || rationale.includes("dat")) {
    setup.type = "day-after-trade";
  } else if (rationale.includes("breakout")) {
    setup.type = "breakout";
  } else if (rationale.includes("breakdown")) {
    setup.type = "breakdown";
  } else if (rationale.includes("pullback")) {
    setup.type = "pullback";
  } else if (rationale.includes("support")) {
    setup.type = "support-bounce";
  } else if (rationale.includes("resistance")) {
    setup.type = "resistance-rejection";
  }
  
  // Determine timeframe
  if (rationale.includes("swing")) {
    setup.timeframe = "swing";
  } else if (rationale.includes("position")) {
    setup.timeframe = "position";
  }
  
  // Determine stage based on parameter completeness
  if (hasCompleteParameters(idea)) {
    setup.stage = "confirmed";
  } else if (hasPartialParameters(idea)) {
    setup.stage = "mature";
  }
  
  return setup;
}

function canCalculateRiskReward(idea) {
  return (
    idea.entryParameters && 
    (idea.entryParameters.zone.min !== null || idea.entryParameters.zone.max !== null) &&
    idea.exitParameters && 
    idea.exitParameters.stopLoss !== null && 
    idea.exitParameters.target !== null
  );
}

function calculateRiskReward(idea) {
  // Calculate approx entry price
  let entryPrice;
  if (idea.entryParameters.zone.min !== null && idea.entryParameters.zone.max !== null) {
    entryPrice = (idea.entryParameters.zone.min + idea.entryParameters.zone.max) / 2;
  } else {
    entryPrice = idea.entryParameters.zone.min || idea.entryParameters.zone.max;
  }
  
  const risk = Math.abs(entryPrice - idea.exitParameters.stopLoss);
  const reward = Math.abs(idea.exitParameters.target - entryPrice);
  
  return {
    ratio: reward / risk,
    initialRisk: risk,
    potentialReward: reward
  };
}

function hasCompleteParameters(idea) {
  return (
    idea.entryParameters && 
    idea.entryParameters.zone && 
    (idea.entryParameters.zone.min !== null || idea.entryParameters.zone.max !== null) &&
    idea.exitParameters && 
    idea.exitParameters.stopLoss !== null && 
    idea.exitParameters.target !== null
  );
}

function hasPartialParameters(idea) {
  return (
    idea.entryParameters && 
    idea.entryParameters.zone && 
    (idea.entryParameters.zone.min !== null || idea.entryParameters.zone.max !== null)
  );
}

function extractTechnicalContext(idea, analyzerOutput) {
  const technicalContext = {
    keyLevels: [],
    movingAverages: {},
    patterns: []
  };
  
  // Extract from analyzer output if available
  if (analyzerOutput.levels && analyzerOutput.levels.stocks) {
    const stockInfo = analyzerOutput.levels.stocks.find(s => s.ticker === idea.ticker);
    if (stockInfo) {
      // Extract moving averages
      if (stockInfo.movingAverages) {
        technicalContext.movingAverages = stockInfo.movingAverages;
      }
      
      // Extract levels
      if (stockInfo.levels) {
        if (stockInfo.levels.support) {
          technicalContext.keyLevels.push(...stockInfo.levels.support.map(l => ({
            price: l.value,
            type: "support"
          })));
        }
        if (stockInfo.levels.resistance) {
          technicalContext.keyLevels.push(...stockInfo.levels.resistance.map(l => ({
            price: l.value,
            type: "resistance"
          })));
        }
      }
    }
  }
  
  // Extract patterns from rationale
  const rationale = (idea.rationale || "").toLowerCase();
  const patternKeywords = {
    "flag": "flag",
    "triangle": "triangle",
    "wedge": "wedge",
    "channel": "channel",
    "double bottom": "double bottom",
    "double top": "double top",
    "head and shoulders": "head and shoulders",
    "cup and handle": "cup and handle"
  };
  
  Object.entries(patternKeywords).forEach(([keyword, pattern]) => {
    if (rationale.includes(keyword)) {
      technicalContext.patterns.push(pattern);
    }
  });
  
  return technicalContext;
}
```

### 5. Result Generation

Finally, the component generates the structured output:

```javascript
function generateResult(ideas, originalCount, minConviction, maxIdeas) {
  // Sort ideas by priority (descending)
  const sortedIdeas = [...ideas].sort((a, b) => b.priority - a.priority);
  
  // Apply maxIdeas limit
  const limitedIdeas = sortedIdeas.slice(0, maxIdeas);
  
  // Generate conviction breakdown
  const convictionBreakdown = limitedIdeas.reduce((counts, idea) => {
    const level = idea.conviction.level;
    counts[level] = (counts[level] || 0) + 1;
    return counts;
  }, {});
  
  return {
    filteredIdeas: limitedIdeas,
    summary: {
      totalIdeas: originalCount,
      filteredCount: limitedIdeas.length,
      convictionBreakdown
    }
  };
}
```

### 6. Main Processing Function

The main function orchestrates the entire extraction process, leveraging the Conviction Classification System when needed:

```javascript
// Import the conviction classifier
const convictionClassifier = require('../../system/focus/conviction-classifier');

function extractFocus(input) {
  try {
    // Validate input
    const { focusIdeas, minConviction, maxIdeas, includeTechnical, analyzerOutput } = validateInput(input);
    
    // Track original count
    const originalCount = focusIdeas.length;
    
    // Process any ideas that might need conviction assessment
    const processedIdeas = focusIdeas.map(idea => {
      // If idea lacks conviction assessment, use the classifier
      if (!idea.conviction || !idea.conviction.level) {
        // Check if we have rationale text to analyze
        if (idea.rationale) {
          const text = `${idea.ticker} ${idea.rationale}`;
          const analyst = analyzerOutput.analyst || "dp";
          
          // Use the conviction classifier
          const convictionResult = convictionClassifier.classify(text, {
            analyst,
            minConfidence: 0.5
          });
          
          // Update the idea with the classification result
          return {
            ...idea,
            conviction: convictionResult
          };
        } else {
          // No rationale to analyze, assign default low conviction
          return {
            ...idea,
            conviction: {
              level: "low",
              phrases: [],
              confidence: 0.5
            }
          };
        }
      }
      
      // Ensure confidence exists
      if (!idea.conviction.confidence) {
        idea.conviction.confidence = 0.7; // Default confidence
      }
      
      return idea;
    });
    
    // Filter ideas by conviction
    const filteredIdeas = filterByConviction(processedIdeas, minConviction);
    
    // Enhance ideas with additional context
    const enhancedIdeas = enhanceIdeas(filteredIdeas, analyzerOutput, includeTechnical);
    
    // Prioritize ideas
    const prioritizedIdeas = prioritizeIdeas(enhancedIdeas);
    
    // Generate final result
    return generateResult(prioritizedIdeas, originalCount, minConviction, maxIdeas);
  } catch (error) {
    // Handle errors
    console.error("Error extracting focus ideas:", error);
    return {
      filteredIdeas: [],
      summary: {
        totalIdeas: 0,
        filteredCount: 0,
        convictionBreakdown: {}
      },
      error: error.message
    };
  }
}
```

## Conviction Level Hierarchy

The Trade Idea Extractor uses the standardized conviction level hierarchy from the Conviction Classification System:

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

## Example Usage

```
/extract-focus
Input:
{
  "analyzerOutput": {
    "focusIdeas": [
      {
        "ticker": "TEM",
        "direction": "long",
        "conviction": {"level": "high", "phrases": ["love TEM right now"], "confidence": 0.95},
        "entryParameters": {"zone": {"min": 60, "max": 62}, "condition": "current range"},
        "exitParameters": {"stopLoss": 58, "target": 68},
        "rationale": "great entry point for a swing trade"
      },
      {
        "ticker": "HOOD",
        "direction": "long",
        "conviction": {"level": "high", "phrases": ["looking to add more", "remain very bullish"], "confidence": 0.85},
        "entryParameters": {"zone": {"min": 56, "max": 56}, "condition": "if it gets to 56"},
        "exitParameters": {"stopLoss": 53, "target": 62},
        "rationale": "remain very bullish on this name"
      },
      {
        "ticker": "BABA",
        "direction": "short",
        "conviction": {"level": "medium", "phrases": ["could be a decent day-after-trade", "might be worth a speculative short"], "confidence": 0.75},
        "entryParameters": {"zone": {"min": 121, "max": 121}, "condition": "if it gets to its 21-day MA around 121"},
        "exitParameters": {"stopLoss": 124, "target": 115},
        "rationale": "day-after-trade opportunity"
      },
      {
        "ticker": "CRWV",
        "direction": "long",
        "conviction": {"level": "medium", "phrases": ["interesting on any pullback", "viable swing trade"], "confidence": 0.7},
        "entryParameters": {"zone": {"min": null, "max": null}, "condition": "on any pullback"},
        "exitParameters": {"stopLoss": null, "target": null},
        "rationale": "viable swing trade opportunity"
      },
      {
        "ticker": "AMD",
        "direction": "long",
        "conviction": {"level": "medium", "phrases": ["could work", "might be worth trying some calls"], "confidence": 0.65},
        "entryParameters": {"zone": {"min": 115, "max": 115}, "condition": "around 115"},
        "exitParameters": {"stopLoss": 112, "target": 120},
        "rationale": "worth trying some calls"
      },
      {
        "ticker": "TSLA",
        "direction": "long",
        "conviction": {"level": "low", "phrases": ["only interesting near the 8-day MA", "would not chase"], "confidence": 0.6},
        "entryParameters": {"zone": {"min": 309, "max": 309}, "condition": "near the 8-day MA"},
        "exitParameters": {"stopLoss": 305, "target": 315},
        "rationale": "only interesting near the 8-day MA"
      }
    ],
    "analyst": "dp"
  },
  "minConviction": "medium"
}
```

## Test Vector

**Input**:
```json
{
  "analyzerOutput": {
    "focusIdeas": [
      {
        "ticker": "TEM",
        "direction": "long",
        "conviction": {"level": "high", "phrases": ["love TEM right now"], "confidence": 0.95},
        "entryParameters": {"zone": {"min": 60, "max": 62}, "condition": "current range"},
        "exitParameters": {"stopLoss": 58, "target": 68},
        "rationale": "great entry point for a swing trade"
      },
      {
        "ticker": "HOOD",
        "direction": "long",
        "conviction": {"level": "high", "phrases": ["looking to add more", "remain very bullish"], "confidence": 0.85},
        "entryParameters": {"zone": {"min": 56, "max": 56}, "condition": "if it gets to 56"},
        "exitParameters": {"stopLoss": 53, "target": 62},
        "rationale": "remain very bullish on this name"
      },
      {
        "ticker": "BABA",
        "direction": "short",
        "conviction": {"level": "medium", "phrases": ["could be a decent day-after-trade", "might be worth a speculative short"], "confidence": 0.75},
        "entryParameters": {"zone": {"min": 121, "max": 121}, "condition": "if it gets to its 21-day MA around 121"},
        "exitParameters": {"stopLoss": 124, "target": 115},
        "rationale": "day-after-trade opportunity"
      },
      {
        "ticker": "CRWV",
        "direction": "long",
        "conviction": {"level": "medium", "phrases": ["interesting on any pullback", "viable swing trade"], "confidence": 0.7},
        "entryParameters": {"zone": {"min": null, "max": null}, "condition": "on any pullback"},
        "exitParameters": {"stopLoss": null, "target": null},
        "rationale": "viable swing trade opportunity"
      },
      {
        "ticker": "AMD",
        "direction": "long",
        "conviction": {"level": "medium", "phrases": ["could work", "might be worth trying some calls"], "confidence": 0.65},
        "entryParameters": {"zone": {"min": 115, "max": 115}, "condition": "around 115"},
        "exitParameters": {"stopLoss": 112, "target": 120},
        "rationale": "worth trying some calls"
      },
      {
        "ticker": "TSLA",
        "direction": "long",
        "conviction": {"level": "low", "phrases": ["only interesting near the 8-day MA", "would not chase"], "confidence": 0.6},
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
    "analyst": "dp"
  },
  "minConviction": "medium",
  "includeTechnical": true
}
```

**Expected Output**:
```json
{
  "filteredIdeas": [
    {
      "ticker": "TEM",
      "direction": "long",
      "conviction": {"level": "high", "phrases": ["love TEM right now"], "confidence": 0.95},
      "entryParameters": {"zone": {"min": 60, "max": 62}, "condition": "current range"},
      "exitParameters": {"stopLoss": 58, "target": 68},
      "rationale": "great entry point for a swing trade",
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
      "priority": 110
    },
    {
      "ticker": "HOOD",
      "direction": "long",
      "conviction": {"level": "high", "phrases": ["looking to add more", "remain very bullish"], "confidence": 0.85},
      "entryParameters": {"zone": {"min": 56, "max": 56}, "condition": "if it gets to 56"},
      "exitParameters": {"stopLoss": 53, "target": 62},
      "rationale": "remain very bullish on this name",
      "setup": {
        "type": "unknown",
        "stage": "confirmed",
        "timeframe": "intraday"
      },
      "riskReward": {
        "ratio": 2.0,
        "initialRisk": 3.0,
        "potentialReward": 6.0
      },
      "priority": 105
    },
    {
      "ticker": "BABA",
      "direction": "short",
      "conviction": {"level": "medium", "phrases": ["could be a decent day-after-trade", "might be worth a speculative short"], "confidence": 0.75},
      "entryParameters": {"zone": {"min": 121, "max": 121}, "condition": "if it gets to its 21-day MA around 121"},
      "exitParameters": {"stopLoss": 124, "target": 115},
      "rationale": "day-after-trade opportunity",
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
      "priority": 85
    },
    {
      "ticker": "AMD",
      "direction": "long",
      "conviction": {"level": "medium", "phrases": ["could work", "might be worth trying some calls"], "confidence": 0.65},
      "entryParameters": {"zone": {"min": 115, "max": 115}, "condition": "around 115"},
      "exitParameters": {"stopLoss": 112, "target": 120},
      "rationale": "worth trying some calls",
      "setup": {
        "type": "unknown",
        "stage": "confirmed",
        "timeframe": "intraday"
      },
      "riskReward": {
        "ratio": 1.67,
        "initialRisk": 3,
        "potentialReward": 5
      },
      "technicalContext": {
        "keyLevels": [
          {"price": 112, "type": "support"},
          {"price": 120, "type": "resistance"}
        ],
        "movingAverages": {"ma8": 117, "ma21": 115},
        "patterns": []
      },
      "priority": 75
    },
    {
      "ticker": "CRWV",
      "direction": "long",
      "conviction": {"level": "medium", "phrases": ["interesting on any pullback", "viable swing trade"], "confidence": 0.7},
      "entryParameters": {"zone": {"min": null, "max": null}, "condition": "on any pullback"},
      "exitParameters": {"stopLoss": null, "target": null},
      "rationale": "viable swing trade opportunity",
      "setup": {
        "type": "pullback",
        "stage": "developing",
        "timeframe": "swing"
      },
      "priority": 65
    }
  ],
  "summary": {
    "totalIdeas": 6,
    "filteredCount": 5,
    "convictionBreakdown": {
      "high": 2,
      "medium": 3
    }
  }
}
```
```

## Implementation Notes

The Trade Idea Extractor is designed to focus attention on the highest-quality opportunities while filtering out noise. Key design considerations include:

1. **Integration with Conviction Classification System**: The extractor leverages the existing Conviction Classification System to ensure consistent conviction assessment across the platform.

2. **Priority-Based Filtering**: Ideas are ranked by a comprehensive scoring system that considers conviction level and confidence, technical alignment, parameter completeness, and risk/reward.

3. **Enhanced Idea Context**: The extractor enriches ideas with additional information such as setup type, stage, timeframe, and risk/reward calculations.

4. **Technical Integration**: For tickers with available technical data, the component incorporates key levels and moving average information to provide more context.

5. **Standardized Conviction Hierarchy**: The component uses the same conviction levels as the Conviction Classification System (focus-trade, high, medium, low, negative).

## Integration Details

### Conviction Classifier Integration

The Trade Idea Extractor integrates with the Conviction Classification System in two key ways:

1. **Conviction Assessment**: For ideas without conviction information, the extractor can leverage the classifier to analyze text and determine conviction level:

```javascript
// Example of applying classifier to an idea
const text = `${idea.ticker} ${idea.rationale}`;
const convictionResult = convictionClassifier.classify(text, {
  analyst: "dp",
  minConfidence: 0.5
});

// Update idea with classification
idea.conviction = convictionResult;
```

2. **Conviction Level Hierarchy**: The extractor uses the same conviction level hierarchy as the classifier:

```javascript
// Conviction level hierarchy from the Conviction Classification System
const convictionLevels = {
  "focus-trade": 4,
  "high": 3,
  "medium": 2,
  "low": 1,
  "negative": 0
};
```

### Analyzer Output Integration

The Trade Idea Extractor is designed to work with output from the Morning Call Processor (`/analyze-dp`), specifically:

1. **Focus Ideas**: Extracted from the `focusIdeas` array in the analyzer output
2. **Technical Context**: Integrates with the `levels` structure for moving averages and support/resistance levels
3. **Analyst Source**: Uses the `analyst` field to ensure proper conviction classification

### Trade Plan Integration

The filtered and prioritized ideas feed directly into the trade planning process:

1. **Plan Generation**: Prioritized ideas become the foundation for the daily trade plan
2. **Risk Allocation**: Conviction levels inform risk allocation decisions
3. **Execution Sequencing**: Priority scores guide execution order

## Related Components

The Trade Idea Extractor works closely with:
- `prompts/premarket/analyze-dp.md` - Source of focus ideas
- `system/focus/conviction-classifier.md` - For standardized conviction assessment
- `prompts/premarket/create-plan.md` - Consumer of filtered ideas
- `prompts/premarket/extract-levels.md` - Provider of technical context
