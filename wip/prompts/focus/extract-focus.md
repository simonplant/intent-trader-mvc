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
  - Supported values: "focus-trade", "high", "medium", "low", "negative"
- `minConfidence` (optional): Minimum confidence threshold (default: 0.6)
  - Range: 0.0-1.0
  - Recommended: 0.6-0.8
- `direction` (optional): Filter by trade direction (default: "both")
  - Supported values: "long", "short", "both"
- `maxIdeas` (optional): Maximum number of ideas to return (default: all)
  - Integer value > 0
- `includeTechnical` (optional): Whether to include technical analysis context (default: true)
  - Boolean value
- `analyst` (optional): Override the analyst source for conviction classification (default: from analyzerOutput)
  - Supported values: "dp", "mancini", "generic"

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
      "setup": {
        "type": "string",
        "stage": "developing/mature/confirmed",
        "timeframe": "intraday/swing/position"
      },
      "riskReward": {
        "ratio": "number",
        "initialRisk": "number",
        "potentialReward": "number"
      },
      "technicalContext": {
        "keyLevels": [{"price": "number", "type": "string"}],
        "movingAverages": {"ma8": "number", "ma21": "number"},
        "patterns": ["string"]
      },
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
    },
    "directionBreakdown": {
      "long": "number",
      "short": "number"
    }
  },
  "metadata": {
    "version": "string",
    "generatedAt": "datetime",
    "filterCriteria": {
      "minConviction": "string",
      "minConfidence": "number",
      "direction": "string", 
      "maxIdeas": "number",
      "includeTechnical": "boolean"
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
    includeTechnical = true,
    minConfidence = 0.6, // Default confidence threshold
    direction = "both", // "long", "short", or "both"
    analyst = analyzerOutput.analyst || "dp" // Extract analyst or default to "dp"
  } = input;
  
  // Validate minConviction
  const validConvictionLevels = ["focus-trade", "high", "medium", "low", "negative"];
  if (!validConvictionLevels.includes(minConviction)) {
    throw new Error(`Invalid conviction level: ${minConviction}. Must be one of: focus-trade, high, medium, low, negative`);
  }
  
  // Validate maxIdeas
  if (maxIdeas !== undefined && (!Number.isInteger(maxIdeas) || maxIdeas <= 0)) {
    throw new Error(`Invalid maxIdeas: ${maxIdeas}. Must be a positive integer`);
  }

  // Validate minConfidence
  if (minConfidence !== undefined && (typeof minConfidence !== 'number' || minConfidence < 0 || minConfidence > 1)) {
    throw new Error(`Invalid minConfidence: ${minConfidence}. Must be a number between 0 and 1`);
  }
  
  // Validate direction
  if (!["long", "short", "both"].includes(direction)) {
    throw new Error(`Invalid direction: ${direction}. Must be one of: long, short, both`);
  }
  
  return {
    focusIdeas: analyzerOutput.focusIdeas,
    minConviction,
    maxIdeas,
    includeTechnical,
    minConfidence,
    direction,
    analyst,
    analyzerOutput
  };
}
```

### 2. Conviction-Based Filtering

The component filters ideas based on the minimum conviction threshold and confidence level, using the conviction levels from the Conviction Classification System:

```javascript
function filterByConviction(ideas, minConviction, minConfidence) {
  // Define conviction level hierarchy matching the Conviction Classification System
  const convictionLevels = {
    "focus-trade": 4,
    "high": 3,
    "medium": 2,
    "low": 1,
    "negative": 0
  };
  
  // First filter out any negative conviction ideas unless explicitly requested
  if (minConviction !== "negative") {
    ideas = ideas.filter(idea => idea.conviction.level !== "negative");
  }
  
  // Get minimum conviction level value
  const minConvictionValue = convictionLevels[minConviction];
  
  // Filter ideas by conviction level and confidence
  return ideas.filter(idea => {
    // Check conviction level
    const ideaConvictionValue = convictionLevels[idea.conviction.level] || 0;
    if (ideaConvictionValue < minConvictionValue) {
      return false;
    }
    
    // Check confidence level
    const confidence = idea.conviction.confidence || 0;
    return confidence >= minConfidence;
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
    try {
      // Start with base priority based on conviction
      let priority = getBaseConvictionScore(idea.conviction.level, idea.conviction.confidence || 0.7);
      
      // Adjust for completeness of parameters
      priority += getCompletenessScore(idea);
      
      // Adjust for risk/reward ratio if available
      priority += getRiskRewardScore(idea);
      
      // Adjust for setup-specific factors
      priority += getSetupSpecificScore(idea);
      
      // Return idea with priority
      return {
        ...idea,
        priority
      };
    } catch (error) {
      console.error(`Error calculating priority for ${idea.ticker}:`, error);
      // Provide a default priority to avoid breaking the pipeline
      return {
        ...idea,
        priority: 50 // Default middle priority
      };
    }
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
  
  try {
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
  } catch (error) {
    console.error(`Error calculating completeness score for ${idea.ticker}:`, error);
    return 0; // Return 0 if calculation fails
  }
}

function getRiskRewardScore(idea) {
  try {
    // Calculate risk/reward ratio if possible
    if (idea.riskReward && typeof idea.riskReward.ratio === 'number') {
      const ratio = idea.riskReward.ratio;
      
      // Award points based on R/R ratio
      if (ratio >= 3) return 15;
      if (ratio >= 2) return 10;
      if (ratio >= 1.5) return 5;
      return 0;
    }
    
    // If risk/reward not already calculated, try to calculate it now
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
  } catch (error) {
    console.error(`Error calculating risk/reward score for ${idea.ticker}:`, error);
  }
  
  return 0;
}

// Add setup-specific prioritization factors
function getSetupSpecificScore(idea) {
  try {
    if (!idea.setup || !idea.setup.type) {
      return 0;
    }
    
    // Define setup-specific scores
    const setupScores = {
      "day-after-trade": 5,  // Higher priority for time-sensitive setups
      "breakout": 3,
      "breakdown": 3,
      "pullback": 2,
      "support-bounce": 3,
      "resistance-rejection": 3,
      "flag": 3,
      "triangle": 2,
      "wedge": 2,
      "channel": 2,
      "double-bottom": 3,
      "double-top": 3,
      "head-and-shoulders": 3,
      "unknown": 0
    };
    
    // Get score for this setup type
    const baseSetupScore = setupScores[idea.setup.type] || 0;
    
    // Adjust based on setup stage
    let stageMultiplier = 1.0;
    if (idea.setup.stage === "confirmed") {
      stageMultiplier = 1.5;
    } else if (idea.setup.stage === "mature") {
      stageMultiplier = 1.2;
    }
    
    return Math.round(baseSetupScore * stageMultiplier);
  } catch (error) {
    console.error(`Error calculating setup-specific score for ${idea.ticker}:`, error);
    return 0;
  }
}
```

### 4. Idea Enhancement

The component can enhance trade ideas with additional information like setup type and technical context:

```javascript
// Extract pattern constants to configuration for easier maintenance
const SETUP_TYPE_PATTERNS = {
  "day-after-trade": ["day after", "dat"],
  "breakout": ["breakout", "breaks out", "breaking out"],
  "breakdown": ["breakdown", "breaks down", "breaking down"],
  "pullback": ["pullback", "pull back", "pulling back"],
  "support-bounce": ["support", "bounce", "bouncing"],
  "resistance-rejection": ["resistance", "reject", "rejection"],
  "flag": ["flag", "flagging", "bull flag", "bear flag"],
  "triangle": ["triangle", "triangular"],
  "wedge": ["wedge"],
  "channel": ["channel"],
  "double-bottom": ["double bottom"],
  "double-top": ["double top"],
  "head-and-shoulders": ["head and shoulders"]
};

const TIMEFRAME_PATTERNS = {
  "intraday": ["day trade", "intraday", "scalp", "quick trade"],
  "swing": ["swing", "few days", "couple days", "next week"],
  "position": ["position", "longer term", "weeks", "months"]
};

function enhanceIdeas(ideas, analyzerOutput, includeTechnical) {
  return ideas.map(idea => {
    try {
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
    } catch (error) {
      // Log error but don't fail the whole process
      console.error(`Error enhancing idea for ${idea.ticker}:`, error);
      return idea; // Return original idea if enhancement fails
    }
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
  
  // Determine setup type using pattern map
  Object.entries(SETUP_TYPE_PATTERNS).forEach(([type, patterns]) => {
    if (patterns.some(pattern => rationale.includes(pattern))) {
      setup.type = type;
    }
  });
  
  // Determine timeframe using pattern map
  Object.entries(TIMEFRAME_PATTERNS).forEach(([timeframe, patterns]) => {
    if (patterns.some(pattern => rationale.includes(pattern))) {
      setup.timeframe = timeframe;
    }
  });
  
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
    (idea.entryParameters.zone?.min !== null || idea.entryParameters.zone?.max !== null) &&
    idea.exitParameters && 
    idea.exitParameters.stopLoss !== null && 
    idea.exitParameters.target !== null
  );
}

function calculateRiskReward(idea) {
  try {
    // Calculate approx entry price
    let entryPrice;
    if (idea.entryParameters.zone?.min !== null && idea.entryParameters.zone?.min !== undefined &&
        idea.entryParameters.zone?.max !== null && idea.entryParameters.zone?.max !== undefined) {
      entryPrice = (idea.entryParameters.zone.min + idea.entryParameters.zone.max) / 2;
    } else {
      entryPrice = idea.entryParameters.zone?.min || idea.entryParameters.zone?.max;
    }
    
    const risk = Math.abs(entryPrice - idea.exitParameters.stopLoss);
    const reward = Math.abs(idea.exitParameters.target - entryPrice);
    
    // Validate results
    if (isNaN(risk) || !isFinite(risk) || risk <= 0 ||
        isNaN(reward) || !isFinite(reward) || reward <= 0) {
      console.warn(`Invalid risk/reward values calculated for ${idea.ticker}: risk=${risk}, reward=${reward}`);
      return {
        ratio: 1.0,  // Default to 1:1
        initialRisk: 1,
        potentialReward: 1
      };
    }
    
    const ratio = reward / risk;
    
    // Validate ratio
    if (isNaN(ratio) || !isFinite(ratio) || ratio <= 0) {
      console.warn(`Invalid risk/reward ratio calculated for ${idea.ticker}: ${ratio}`);
      return {
        ratio: 1.0,  // Default to 1:1
        initialRisk: risk || 1,
        potentialReward: reward || 1
      };
    }
    
    return {
      ratio,
      initialRisk: risk,
      potentialReward: reward
    };
  } catch (error) {
    console.error(`Error calculating risk/reward for ${idea.ticker}:`, error);
    return { ratio: 1.0, initialRisk: 1, potentialReward: 1 };
  }
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
  
  try {
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
    
    // Use the setup type patterns to identify chart patterns
    Object.entries(SETUP_TYPE_PATTERNS).forEach(([pattern, keywords]) => {
      if (keywords.some(keyword => rationale.includes(keyword))) {
        if (!technicalContext.patterns.includes(pattern)) {
          technicalContext.patterns.push(pattern);
        }
      }
    });
    
    return technicalContext;
  } catch (error) {
    console.error(`Error extracting technical context for ${idea.ticker}:`, error);
    return technicalContext; // Return empty context if extraction fails
  }
}
```

### 5. Result Generation

Finally, the component generates the structured output with detailed metadata:

```javascript
function generateResult(ideas, originalCount, minConviction, maxIdeas, filterParams) {
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
  
  // Generate direction breakdown
  const directionBreakdown = limitedIdeas.reduce((counts, idea) => {
    const direction = idea.direction;
    counts[direction] = (counts[direction] || 0) + 1;
    return counts;
  }, {});
  
  return {
    filteredIdeas: limitedIdeas,
    summary: {
      totalIdeas: originalCount,
      filteredCount: limitedIdeas.length,
      convictionBreakdown,
      directionBreakdown
    },
    metadata: {
      version: "1.0.0",
      generatedAt: new Date().toISOString(),
      filterCriteria: {
        minConviction,
        maxIdeas,
        minConfidence: filterParams?.minConfidence,
        direction: filterParams?.direction,
        includeTechnical: filterParams?.includeTechnical
      }
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
    const { 
      focusIdeas, 
      minConviction, 
      maxIdeas, 
      includeTechnical, 
      minConfidence,
      direction,
      analyst,
      analyzerOutput 
    } = validateInput(input);
    
    // Track original count
    const originalCount = focusIdeas.length;
    
    // Process any ideas that might need conviction assessment
    const processedIdeas = focusIdeas.map(idea => {
      // Validate and sanitize idea structure
      idea = validateIdeaStructure(idea);
      
      // If idea lacks conviction assessment, use the classifier
      if (!idea.conviction || !idea.conviction.level) {
        // Check if we have rationale text to analyze
        if (idea.rationale) {
          const text = `${idea.ticker} ${idea.rationale}`;
          
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
      
      return idea;
    });
    
    // Filter ideas by conviction and confidence
    let filteredIdeas = filterByConviction(processedIdeas, minConviction, minConfidence);
    
    // Filter by direction if needed
    if (direction !== "both") {
      filteredIdeas = filteredIdeas.filter(idea => idea.direction === direction);
    }
    
    // Enhance ideas with additional context
    const enhancedIdeas = enhanceIdeas(filteredIdeas, analyzerOutput, includeTechnical);
    
    // Prioritize ideas
    const prioritizedIdeas = prioritizeIdeas(enhancedIdeas);
    
    // Generate final result
    return generateResult(prioritizedIdeas, originalCount, minConviction, maxIdeas, {
      minConfidence,
      direction,
      includeTechnical
    });
  } catch (error) {
    // Handle errors with detailed context
    console.error("Error extracting focus ideas:", error);
    return {
      filteredIdeas: [],
      summary: {
        totalIdeas: input?.analyzerOutput?.focusIdeas?.length || 0,
        filteredCount: 0,
        convictionBreakdown: {}
      },
      error: {
        message: error.message,
        stack: error.stack,
        inputValidation: input?.analyzerOutput?.focusIdeas ? "passed" : "failed",
        timestamp: new Date().toISOString()
      }
    };
  }
}

// Helper function to validate and sanitize idea structure
function validateIdeaStructure(idea) {
  // Create a copy to avoid modifying the original
  const validatedIdea = { ...idea };
  
  // Ensure conviction object exists and has required properties
  if (!validatedIdea.conviction || typeof validatedIdea.conviction !== 'object') {
    console.warn(`Idea for ${validatedIdea.ticker} missing conviction object`);
    validatedIdea.conviction = { level: "low", phrases: [], confidence: 0.5 };
  } else {
    // Ensure level exists
    if (!validatedIdea.conviction.level) {
      console.warn(`Idea for ${validatedIdea.ticker} has conviction object missing level`);
      validatedIdea.conviction.level = "low";
    }
    
    // Ensure phrases array exists
    if (!Array.isArray(validatedIdea.conviction.phrases)) {
      validatedIdea.conviction.phrases = [];
    }
    
    // Ensure confidence is a valid number
    if (typeof validatedIdea.conviction.confidence !== 'number' || 
        validatedIdea.conviction.confidence < 0 || 
        validatedIdea.conviction.confidence > 1) {
      console.warn(`Idea for ${validatedIdea.ticker} has invalid confidence value`);
      validatedIdea.conviction.confidence = 0.6;
    }
  }
  
  // Ensure direction is valid
  if (!validatedIdea.direction || !["long", "short"].includes(validatedIdea.direction)) {
    console.warn(`Idea for ${validatedIdea.ticker} has invalid direction: ${validatedIdea.direction}`);
    validatedIdea.direction = "long"; // Default to long if direction is invalid
  }
  
  return validatedIdea;
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

2. **Priority-Based Filtering**: Ideas are ranked by a comprehensive scoring system that considers conviction level and confidence, technical alignment, parameter completeness, risk/reward, and setup-specific factors.

3. **Enhanced Idea Context**: The extractor enriches ideas with additional information such as setup type, stage, timeframe, and risk/reward calculations.

4. **Technical Integration**: For tickers with available technical data, the component incorporates key levels and moving average information to provide more context.

5. **Standardized Conviction Hierarchy**: The component uses the same conviction levels as the Conviction Classification System (focus-trade, high, medium, low, negative).

6. **Error Resilience**: The implementation includes comprehensive error handling to prevent failures when processing individual ideas.

## Idea Enhancement Process

The Trade Idea Extractor enhances each idea with additional information:

1. **Setup Classification**: The component analyzes the idea's rationale to determine:
   - **Setup Type**: Identifies patterns like "day-after-trade", "breakout", "pullback", etc.
   - **Stage**: Determines if the setup is "developing", "mature", or "confirmed" based on parameter completeness
   - **Timeframe**: Classifies as "intraday", "swing", or "position" based on context clues

2. **Risk/Reward Calculation**: For ideas with entry and exit parameters, calculates:
   - Risk/reward ratio
   - Initial risk amount
   - Potential reward amount

3. **Technical Context**: Adds relevant technical data when available:
   - Key support/resistance levels
   - Moving average relationships
   - Identified chart patterns

Example:
```json
{
  "ticker": "AAPL",
  "direction": "long",
  "conviction": {"level": "high", "confidence": 0.85},
  "setup": {
    "type": "pullback",
    "stage": "confirmed",
    "timeframe": "swing"
  },
  "riskReward": {
    "ratio": 2.5,
    "initialRisk": 4,
    "potentialReward": 10
  }
}
```

## Troubleshooting

### Common Issues

1. **No ideas passing the filters**
   - Check if the minimum conviction level is too high
   - Verify that the input ideas have proper conviction assessments
   - Try lowering the confidence threshold
   - Ensure the direction filter isn't excluding valid ideas

2. **Incorrect priority ordering**
   - Examine the conviction levels of the input ideas
   - Check if the risk/reward calculations are producing expected results
   - Verify that parameter completeness is accurately assessed

3. **Missing technical context**
   - Ensure the analyzer output includes the `levels` structure
   - Verify that ticker symbols match between ideas and technical data
   - Confirm that `includeTechnical` is set to `true`

4. **Error in idea processing**
   - Check the error logs for specific issues
   - Verify that the input idea structure follows the expected format
   - Ensure all required fields are present in the input

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

### Callbacks for Monitoring

The component supports optional callbacks for monitoring and debugging:

```javascript
// Example callback usage
const callbacks = {
  onIdeaProcessed: (idea) => console.log(`Processing ${idea.ticker}`),
  onIdeaClassified: (idea, result) => console.log(`Classified ${idea.ticker} as ${result.level}`),
  onIdeaFiltered: (idea, included) => console.log(`${idea.ticker} ${included ? 'passed' : 'failed'} filters`),
  onIdeaPrioritized: (idea) => console.log(`${idea.ticker} priority: ${idea.priority}`)
};

// Call with callbacks
const result = extractFocus({
  analyzerOutput,
  minConviction: "medium",
  callbacks
});
```

## Related Components

The Trade Idea Extractor works closely with:
- `prompts/premarket/analyze-dp.md` - Source of focus ideas
- `system/focus/conviction-classifier.md` - For standardized conviction assessment
- `prompts/premarket/create-plan.md` - Consumer of filtered ideas
- `prompts/premarket/extract-levels.md` - Provider of technical context
