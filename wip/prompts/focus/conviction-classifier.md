---
id: conviction-classifier
title: Conviction Classification System
description: Classifies the conviction level of trade ideas based on language patterns in analyst commentary
author: Intent Trader Team
version: 1.0.0
release: 0.5.1
created: 2025-05-15
updated: 2025-05-15
category: focus
status: stable
tags: [focus, analysis, conviction, classification, language-patterns]
requires: []
outputs: [convictionAssessment]
input_format: text
output_format: json
ai_enabled: true
---

# Conviction Classification System

This component classifies the conviction level of trade ideas based on language patterns in analyst commentary. It transforms natural language expressions of conviction into standardized levels with confidence scores, enabling downstream components to prioritize opportunities effectively.

## Purpose

The Conviction Classification System serves as a core analysis component within the Intent Trader workflow, providing standardized assessment of analyst conviction. It:

1. **Recognizes language patterns** indicating different conviction levels
2. **Classifies phrases** into standardized conviction categories
3. **Assigns confidence scores** to reflect classification certainty
4. **Handles analyst-specific terminology** with customized pattern maps
5. **Considers contextual factors** beyond just keyword matching

The standardized conviction assessments enable consistent prioritization of trade ideas across different analysts and communication styles.

## Input Parameters

- `text` (required): The text containing conviction expressions
  - Must be a non-empty string
  - Minimum length: 10 characters
  - Should contain at least one recognizable ticker symbol
- `analyst` (optional): The specific analyst source (default: "dp")
  - Supported values: "dp", "mancini", "generic"
- `minConfidence` (optional): Minimum confidence threshold for classification (default: 0.7)
  - Range: 0.0-1.0
  - Recommended: 0.5-0.8
- `extractContext` (optional): Whether to extract surrounding context for tickers (default: true)
  - If false, only direct sentences containing tickers will be analyzed
- `fallthroughLevel` (optional): Default level to use when no patterns match (default: "low")
  - Supported values: "high", "medium", "low", "negative"

## Output Format

The component produces a structured conviction assessment:

```json
{
  "level": "focus-trade|high|medium|low|negative",
  "phrases": ["matched phrases that indicate conviction"],
  "confidence": 0.95, // 0-1 confidence score
  "analysis": {
    "matchedPatterns": [
      {
        "pattern": "string",
        "weight": "number",
        "context": "string"
      }
    ],
    "contextualFactors": [
      {
        "factor": "string",
        "impact": "positive|negative",
        "weight": "number"
      }
    ],
    "overrideReason": "string", // if applicable
    "defaultAssignment": "boolean", // true if fallback logic was used
    "warnings": ["string"] // any processing warnings
  },
  "processingMetadata": {
    "status": "success|partial_success|failure",
    "processingTime": "number", // milliseconds
    "inputStats": {
      "textLength": "number",
      "tickersFound": "number",
      "patternMatchAttempts": "number"
    },
    "errorMessage": "string" // if status is not success
  }
}
```

In case of validation errors or processing failures, the output will still maintain this structure but with appropriate error status and messages:

```json
{
  "level": null,
  "phrases": [],
  "confidence": 0,
  "analysis": {},
  "processingMetadata": {
    "status": "failure",
    "errorMessage": "Input validation failed: Text must be at least 10 characters long",
    "inputStats": {
      "textLength": 5,
      "tickersFound": 0,
      "patternMatchAttempts": 0
    }
  }
}
```

## Error Handling

The classifier handles various error conditions and edge cases:

### Input Validation Errors
- **Empty or Missing Text**: Returns error with status "failure" and appropriate message
- **Invalid Analyst**: Falls back to "dp" with warning in processingMetadata
- **Invalid Confidence Threshold**: Clamps to valid range (0-1) with warning

### Processing Errors
- **No Ticker Symbols Found**: Returns partial success with warning and attempts basic sentiment analysis
- **Processing Timeout**: Returns partial results with available classifications and timeout warning
- **Pattern Matching Failure**: Falls back to default classification with low confidence

### Classification Edge Cases
- **Conflicting Patterns**: Prioritizes negative patterns, then uses highest conviction level with warning about conflict
- **Ambiguous Text**: Assigns lower confidence score and indicates ambiguity in warnings
- **Mixed Signals**: Provides details on conflicting signals in analysis with confidence reduction
- **Sarcasm/Irony**: Limited detection capability, adds warning about potential misinterpretation

### Recovery Strategies
- **Partial Processing**: Returns successfully processed portions with status "partial_success"
- **Graceful Degradation**: Falls back to simpler classification methods when advanced ones fail
- **Contextual Inference**: Uses broader context when immediate context is insufficient

## Pattern Recognition Rules

The classifier uses a comprehensive pattern map for each conviction level, with analyst-specific variations. These pattern maps are externalized in configuration files for easier maintenance and updates.

### Pattern Map Structure

```javascript
// patterns/dp-patterns.json
{
  "version": "1.0.0",
  "lastUpdated": "2025-05-15",
  "analyst": "dp",
  "convictionLevels": {
    "focusTrade": {
      "explicitDesignations": [
        {"pattern": "focus idea", "weight": 0.85},
        {"pattern": "focus trade", "weight": 0.85},
        {"pattern": "one to watch today", "weight": 0.80},
        {"pattern": "first focus", "weight": 0.80},
        {"pattern": "favorite trade", "weight": 0.85},
        {"pattern": "favorite name", "weight": 0.80},
        {"pattern": "favorite stock", "weight": 0.80},
        {"pattern": "top idea", "weight": 0.80}
        // Additional patterns...
      ],
      "emotionalLanguage": [
        {"pattern": "love it", "weight": 0.85},
        {"pattern": "really like this one", "weight": 0.80},
        {"pattern": "very excited about", "weight": 0.80},
        {"pattern": "crushing it", "weight": 0.75},
        {"pattern": "monster", "weight": 0.70},
        {"pattern": "beast", "weight": 0.70},
        {"pattern": "i'm in this", "weight": 0.75},
        {"pattern": "own this", "weight": 0.75}
        // Additional patterns...
      ],
      // Additional pattern categories...
    },
    "high": {
      // High conviction patterns...
    },
    "medium": {
      // Medium conviction patterns...
    },
    "low": {
      // Low conviction patterns...
    },
    "negative": {
      // Negative conviction patterns...
    }
  }
}
```

The system loads these externalized pattern maps at initialization time and can be configured to reload them periodically or on-demand:

```javascript
// Pattern loading mechanism
function loadPatternMaps() {
  const patterns = {};

  try {
    // Load analyst-specific patterns
    patterns.dp = require('./patterns/dp-patterns.json');
    patterns.mancini = require('./patterns/mancini-patterns.json');
    patterns.generic = require('./patterns/generic-patterns.json');

    // Validate pattern maps
    validatePatternMaps(patterns);

    return patterns;
  } catch (error) {
    console.error(`Error loading pattern maps: ${error.message}`);
    // Fall back to embedded patterns if available
    return embeddedPatternMaps;
  }
}

// Pattern validation to ensure consistency
function validatePatternMaps(patterns) {
  for (const [analyst, patternMap] of Object.entries(patterns)) {
    // Check version
    if (!patternMap.version) {
      throw new Error(`Pattern map for ${analyst} is missing version information`);
    }

    // Check required conviction levels
    const requiredLevels = ['focusTrade', 'high', 'medium', 'low', 'negative'];
    for (const level of requiredLevels) {
      if (!patternMap.convictionLevels[level]) {
        throw new Error(`Pattern map for ${analyst} is missing the ${level} conviction level`);
      }
    }

    // Check pattern structure
    for (const [level, categories] of Object.entries(patternMap.convictionLevels)) {
      for (const [category, patterns] of Object.entries(categories)) {
        if (!Array.isArray(patterns)) {
          throw new Error(`Pattern category ${category} in ${level} level for ${analyst} is not an array`);
        }

        for (const pattern of patterns) {
          if (!pattern.pattern || typeof pattern.weight !== 'number') {
            throw new Error(`Invalid pattern in ${category} of ${level} level for ${analyst}`);
          }

          if (pattern.weight < 0 || pattern.weight > 1) {
            throw new Error(`Pattern weight out of range in ${category} of ${level} level for ${analyst}`);
          }
        }
      }
    }
  }
}
```

## Contextual Enhancement Factors

Beyond pattern matching, the classifier considers these contextual factors:

### Position Disclosure
Mentions of personal positions increase conviction level
- "I'm in this", "I own this", "I'm adding to my position", "I bought"
- "I'm long/short this", "I'm positioned here", "I'm involved"

### Frequency of Mention
Multiple references to the same trade idea throughout the analysis
- First mention (base weight)
- Second mention (+10% confidence)
- Third or more mention (+20% confidence)

### Detail Level
Amount of specific detail provided about the setup
- Specific entry/exit levels (+10% confidence)
- Multiple technical justifications (+15% confidence)
- Comprehensive risk management plans (+20% confidence)

### Time Allocation
Relative amount of discussion dedicated to the idea
- Brief mention (base weight)
- Extended discussion (+15% confidence)
- Multiple section references (+20% confidence)

### Recency Effect
Position in the analysis (later mentions often reflect stronger conviction)
- Early mention (base weight)
- Middle mention (+5% confidence)
- Final or summary mention (+10% confidence)

### Comparative Language
How the idea is positioned relative to others
- "Better than", "prefer over", "instead of" (+10% confidence)
- "Best of", "top of", "favorite among" (+20% confidence)
- "Unlike", "as opposed to", "in contrast to" (context-dependent)

## Classification Algorithm

The classification process follows these steps:

### 1. Input Validation
- Verify text is provided and is non-empty (minimum 10 characters)
- Validate analyst parameter is one of supported values
- Confirm minConfidence is a valid number between 0 and 1
- Return appropriate error if validation fails with guidance on requirements

### 2. Preprocessing
- Normalize text (lowercase, remove excess whitespace)
- Identify ticker symbols and surrounding context (±3 sentences)
- Extract explicit conviction phrases using pattern matching
- If no ticker symbols found, return early with appropriate message

### 3. Pattern Matching
- Match text against each level's pattern lists
- Calculate raw pattern score based on matched patterns
- Weight matches by pattern specificity and uniqueness
- If no patterns match, apply default pattern handling (see below)

### 4. Contextual Analysis
- Evaluate contextual enhancement factors
- Adjust raw score based on contextual factors
- Calculate contextual impact score

### 5. Conviction Level Assignment
- Determine preliminary level based on highest pattern score
- Apply threshold rules to assign final level
- Handle edge cases (mixed signals, ambiguous language)
- Apply fallback rules if classification is indeterminate

### 6. Confidence Scoring
- Calculate base confidence from pattern match strength
- Adjust for contextual factors and pattern clarity
- Normalize to 0-1 scale
- Ensure minimum confidence floor of 0.3 even for weak matches

### 7. Result Generation
- Populate level, phrases, and confidence
- Include analysis details for transparency
- Apply minimum confidence threshold filtering
- Include processing metadata for diagnostics

## Default Pattern Handling

When no conviction patterns are matched:

### Content Analysis
- Scan for any directional indicators (buy, sell, long, short)
- Look for conditional statements (if, when, might, could)
- Check for specific price levels or technical references

### Default Assignment
- If price targets or specific entry conditions exist: Assign "low" conviction (conf. 0.4)
- If only general mention with directional bias: Assign "low" conviction (conf. 0.3)
- If only ticker mentioned without context: Assign "low" conviction (conf. 0.2)
- Include "default_assignment" flag in the analysis object

### Fallback Message
- Add clear message in analysis indicating default assignment was used
- Suggest ways to improve classification with additional context

## Classification Thresholds

The following thresholds are used to assign conviction levels:

| Level | Pattern Score Range | Required Patterns | Confidence Threshold |
|-------|---------------------|-------------------|----------------------|
| Focus Trade | ≥ 0.85 | ≥ 2 focus patterns | ≥ 0.85 |
| High | ≥ 0.70 | ≥ 1 high pattern | ≥ 0.75 |
| Medium | ≥ 0.50 | ≥ 1 medium pattern | ≥ 0.65 |
| Low | ≥ 0.30 | ≥ 1 low pattern | ≥ 0.60 |
| Negative | Any negative pattern | ≥ 1 negative pattern | ≥ 0.70 |

In cases of conflicting patterns, the classifier prioritizes the highest conviction level with sufficient confidence, with negative patterns having override priority when they meet the confidence threshold.

## Example Pattern Processing

For input text: "I love TEM right now, in the 60-62 range, this looks like a great entry point for a swing trade."

### Pattern Matching:
- Matches "love it" pattern (Focus Trade level)
- Matches "great entry" pattern (High level)
- Contains specific price range "60-62" (contextual enhancement)
- Mentions trade duration "swing trade" (contextual enhancement)

### Conviction Analysis:
- Base pattern score: 0.90 (Focus Trade)
- Contextual enhancements: +0.10 (specific levels, trade duration)
- No negative patterns detected
- Final confidence: 0.95

### Result:
```json
{
  "level": "focus-trade",
  "phrases": ["love TEM right now", "looks like a great entry point"],
  "confidence": 0.95,
  "analysis": {
    "matchedPatterns": [
      {
        "pattern": "love",
        "weight": 0.85,
        "context": "love TEM right now"
      },
      {
        "pattern": "great entry",
        "weight": 0.75,
        "context": "looks like a great entry point"
      }
    ],
    "contextualFactors": [
      {
        "factor": "specific price range",
        "impact": "positive",
        "weight": 0.05
      },
      {
        "factor": "trade duration specified",
        "impact": "positive",
        "weight": 0.05
      }
    ]
  },
  "processingMetadata": {
    "status": "success",
    "processingTime": 45,
    "inputStats": {
      "textLength": 96,
      "tickersFound": 1,
      "patternMatchAttempts": 8
    }
  }
}
```

## Integration Instructions

To integrate the Conviction Classification System into another component:

### API Interface

```javascript
// Main module exports
module.exports = {
  // Primary classification function
  classify: function(text, options = {}) {
    /*
     * @param {string} text - The text to analyze for conviction
     * @param {Object} options - Configuration options
     * @param {string} options.analyst - The analyst source (default: "dp")
     * @param {number} options.minConfidence - Minimum confidence threshold (default: 0.7)
     * @param {boolean} options.extractContext - Whether to extract surrounding context (default: true)
     * @param {string} options.fallthroughLevel - Default level when no patterns match (default: "low")
     * @returns {Object} - Conviction assessment result
     */
    // Implementation...
  },

  // Load new pattern definitions
  loadPatterns: function(patternSource) {
    /*
     * @param {string|Object} patternSource - Path to pattern file or pattern object
     * @returns {boolean} - Success status
     */
    // Implementation...
  },

  // Get available analysts
  getAvailableAnalysts: function() {
    /*
     * @returns {string[]} - List of available analysts
     */
    // Implementation...
  },

  // Get pattern version information
  getPatternVersions: function() {
    /*
     * @returns {Object} - Version information for all loaded patterns
     */
    // Implementation...
  },

  // Event emitter for observability
  events: new EventEmitter()
};
```

### Event System

The classifier emits events during processing for observability:

```javascript
// Event types
const events = {
  PROCESSING_STARTED: 'processing:started',
  TICKER_IDENTIFIED: 'ticker:identified',
  PATTERN_MATCHED: 'pattern:matched',
  CONVICTION_ASSIGNED: 'conviction:assigned',
  PROCESSING_COMPLETED: 'processing:completed',
  PROCESSING_ERROR: 'processing:error'
};

// Usage example for monitoring
classifier.events.on(events.TICKER_IDENTIFIED, (data) => {
  console.log(`Identified ticker: ${data.ticker} with confidence ${data.confidence}`);
});

classifier.events.on(events.CONVICTION_ASSIGNED, (data) => {
  console.log(`Assigned ${data.level} conviction to ${data.ticker} with confidence ${data.confidence}`);
});

classifier.events.on(events.PROCESSING_ERROR, (error) => {
  console.error(`Classification error: ${error.message}`);
});
```

### Command Line Interface

For standalone testing and debugging:

```javascript
#!/usr/bin/env node
const classifier = require('./conviction-classifier');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const argv = yargs
  .usage('Usage: $0 [options] <text>')
  .option('file', {
    alias: 'f',
    describe: 'Input file to analyze',
    type: 'string'
  })
  .option('analyst', {
    alias: 'a',
    describe: 'Analyst source',
    default: 'dp',
    type: 'string'
  })
  .option('min-confidence', {
    alias: 'c',
    describe: 'Minimum confidence threshold',
    default: 0.7,
    type: 'number'
  })
  .option('output', {
    alias: 'o',
    describe: 'Output file for results',
    type: 'string'
  })
  .option('verbose', {
    alias: 'v',
    describe: 'Enable verbose output',
    type: 'boolean',
    default: false
  })
  .help()
  .argv;

async function main() {
  let text;

  if (argv.file) {
    text = fs.readFileSync(path.resolve(argv.file), 'utf8');
  } else if (argv._.length > 0) {
    text = argv._.join(' ');
  } else {
    console.error('Error: No input text provided. Use --file or provide text as arguments.');
    process.exit(1);
  }

  try {
    // Enable verbose output
    if (argv.verbose) {
      classifier.events.on('*', (eventType, data) => {
        console.log(`[${eventType}]`, JSON.stringify(data, null, 2));
      });
    }

    const result = classifier.classify(text, {
      analyst: argv.analyst,
      minConfidence: argv.minConfidence
    });

    if (argv.output) {
      fs.writeFileSync(path.resolve(argv.output), JSON.stringify(result, null, 2));
      console.log(`Results written to ${argv.output}`);
    } else {
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main().catch(console.error);
```

### Import the classifier:
```javascript
const convictionClassifier = require('./system/focus/conviction-classifier');
```

### Process text content:
```javascript
const convictionResult = convictionClassifier.classify(text, {
  analyst: "dp",
  minConfidence: 0.7
});
```

### Apply the result:
```javascript
const focusIdea = {
  ticker: "TEM",
  direction: "long",
  conviction: convictionResult,
  // other properties...
};
```

Or when using the system via commands:

```
/classify-conviction "I love TEM right now, in the 60-62 range" --analyst=dp
```

## Unit Tests

The following test suite verifies the pattern matching and conviction classification functionality across a range of scenarios:

```javascript
// tests/conviction-classifier.test.js
const { expect } = require('chai');
const classifier = require('../system/focus/conviction-classifier');

describe('Conviction Classifier', () => {
  describe('Input Validation', () => {
    it('should reject empty input', () => {
      const result = classifier.classify('');
      expect(result.level).to.be.null;
      expect(result.processingMetadata.status).to.equal('failure');
      expect(result.processingMetadata.errorMessage).to.include('empty');
    });

    it('should reject inputs below minimum length', () => {
      const result = classifier.classify('ABC');
      expect(result.level).to.be.null;
      expect(result.processingMetadata.status).to.equal('failure');
      expect(result.processingMetadata.errorMessage).to.include('at least 10 characters');
    });

    it('should handle invalid analyst parameter', () => {
      const result = classifier.classify('This is a test with AAPL mentioned.', { analyst: 'unknown_analyst' });
      expect(result.processingMetadata.status).to.not.equal('failure');
      expect(result.processingMetadata.warnings).to.include.members(['Invalid analyst specified']);
    });
  });

  describe('Ticker Symbol Recognition', () => {
    it('should identify standard ticker formats', () => {
      const result = classifier.classify('AAPL looks interesting here.');
      expect(result.processingMetadata.inputStats.tickersFound).to.equal(1);
    });

    it('should identify dollar-prefixed tickers', () => {
      const result = classifier.classify('$MSFT might be worth a look.');
      expect(result.processingMetadata.inputStats.tickersFound).to.equal(1);
    });

    it('should identify tickers in contextual phrases', () => {
      const result = classifier.classify('I am looking at NVDA for a potential entry.');
      expect(result.processingMetadata.inputStats.tickersFound).to.equal(1);
    });

    it('should identify tickers near price references', () => {
      const result = classifier.classify('TSLA around $240 seems like a good level.');
      expect(result.processingMetadata.inputStats.tickersFound).to.equal(1);
    });

    it('should identify multiple tickers in the same text', () => {
      const result = classifier.classify('I like AAPL here, but MSFT looks even better.');
      expect(result.processingMetadata.inputStats.tickersFound).to.equal(2);
    });

    it('should not identify common words as tickers', () => {
      const result = classifier.classify('THE MARKET looks oversold.');
      expect(result.processingMetadata.inputStats.tickersFound).to.equal(0);
    });
  });

  describe('Focus Trade Level Classification', () => {
    it('should correctly identify love pattern', () => {
      const result = classifier.classify('I love AAPL here, looks perfect for a breakout.');
      expect(result.level).to.equal('focus-trade');
      expect(result.confidence).to.be.above(0.8);
      expect(result.phrases).to.include.members(['love AAPL here']);
    });

    it('should correctly identify focus idea pattern', () => {
      const result = classifier.classify('MSFT is my focus trade for today, looking to buy aggressively.');
      expect(result.level).to.equal('focus-trade');
      expect(result.confidence).to.be.above(0.8);
      expect(result.phrases).to.include.members(['focus trade']);
    });

    it('should correctly identify emotional language pattern', () => {
      const result = classifier.classify('NVDA is crushing it, definitely a buy on any pullback.');
      expect(result.level).to.equal('focus-trade');
      expect(result.confidence).to.be.above(0.7);
      expect(result.phrases).to.include.members(['crushing it']);
    });

    it('should correctly identify position disclosure pattern', () => {
      const result = classifier.classify('I own this AMZN position and looking to add more.');
      expect(result.level).to.equal('focus-trade');
      expect(result.confidence).to.be.above(0.7);
      expect(result.phrases).to.include.members(['own this']);
    });
  });

  describe('High Conviction Level Classification', () => {
    it('should correctly identify very bullish pattern', () => {
      const result = classifier.classify('I\'m very bullish on AMD, great setup forming.');
      expect(result.level).to.equal('high');
      expect(result.confidence).to.be.above(0.7);
      expect(result.phrases).to.include.members(['very bullish']);
    });

    it('should correctly identify great entry pattern', () => {
      const result = classifier.classify('META is a very viable long, looking strong on all timeframes.');
      expect(result.level).to.equal('high');
      expect(result.confidence).to.be.above(0.7);
      expect(result.phrases).to.include.members(['very viable']);
    });

    it('should correctly identify strong commitment pattern', () => {
      const result = classifier.classify('I am absolutely a buyer of TSLA at these levels.');
      expect(result.level).to.be.above('medium');
      expect(result.confidence).to.be.above(0.7);
      expect(result.phrases).to.include.members(['absolutely a buyer']);
    });
  });

  describe('Medium Conviction Level Classification', () => {
    it('should correctly identify interesting pattern', () => {
      const result = classifier.classify('INTC is interesting here, worth a look on a pullback.');
      expect(result.level).to.equal('medium');
      expect(result.confidence).to.be.above(0.6);
      expect(result.phrases).to.include.members(['interesting', 'worth a look']);
    });

    it('should correctly identify viable pattern', () => {
      const result = classifier.classify('AMZN is viable for a swing trade if it holds this level.');
      expect(result.level).to.equal('medium');
      expect(result.confidence).to.be.above(0.6);
      expect(result.phrases).to.include.members(['viable']);
    });

    it('should correctly identify watching pattern', () => {
      const result = classifier.classify('I\'m watching GOOG, could be a decent setup.');
      expect(result.level).to.equal('medium');
      expect(result.confidence).to.be.above(0.6);
      expect(result.phrases).to.include.members(['watching', 'decent setup']);
    });

    it('should correctly identify conditional entry pattern', () => {
      const result = classifier.classify('ORCL makes sense here if it breaks above resistance.');
      expect(result.level).to.equal('medium');
      expect(result.confidence).to.be.above(0.6);
      expect(result.phrases).to.include.members(['makes sense']);
    });
  });

  describe('Low Conviction Level Classification', () => {
    it('should correctly identify might work pattern', () => {
      const result = classifier.classify('CSCO might work if it gets back above the 8-day MA.');
      expect(result.level).to.equal('low');
      expect(result.confidence).to.be.above(0.5);
      expect(result.phrases).to.include.members(['might work']);
    });

    it('should correctly identify could be okay pattern', () => {
      const result = classifier.classify('QCOM could be okay on a deeper pullback.');
      expect(result.level).to.equal('low');
      expect(result.confidence).to.be.above(0.5);
      expect(result.phrases).to.include.members(['could be okay']);
    });

    it('should correctly identify possibly pattern', () => {
      const result = classifier.classify('Possibly look at NFLX if it consolidates for a few days.');
      expect(result.level).to.equal('low');
      expect(result.confidence).to.be.above(0.5);
      expect(result.phrases).to.include.members(['Possibly']);
    });

    it('should correctly identify multiple conditions pattern', () => {
      const result = classifier.classify('Maybe consider PYPL, but only with tight stops.');
      expect(result.level).to.equal('low');
      expect(result.confidence).to.be.above(0.5);
      expect(result.phrases).to.include.members(['Maybe', 'only with']);
    });
  });

  describe('Negative Conviction Level Classification', () => {
    it('should correctly identify avoid pattern', () => {
      const result = classifier.classify('I would avoid GME, too much risk.');
      expect(result.level).to.equal('negative');
      expect(result.confidence).to.be.above(0.7);
      expect(result.phrases).to.include.members(['avoid']);
    });

    it('should correctly identify not interested pattern', () => {
      const result = classifier.classify('Not interested in BBBY at all.');
      expect(result.level).to.equal('negative');
      expect(result.confidence).to.be.above(0.7);
      expect(result.phrases).to.include.members(['Not interested']);
    });

    it('should correctly identify staying away pattern', () => {
      const result = classifier.classify('Staying away from PLTR at these levels.');
      expect(result.level).to.equal('negative');
      expect(result.confidence).to.be.above(0.7);
      expect(result.phrases).to.include.members(['Staying away']);
    });

    it('should correctly identify warning pattern', () => {
      const result = classifier.classify('Be careful with BABA here, wouldn\'t touch it.');
      expect(result.level).to.equal('negative');
      expect(result.confidence).to.be.above(0.7);
      expect(result.phrases).to.include.members(['Be careful', 'wouldn\'t touch']);
    });
  });

  describe('Mixed Signal Classification', () => {
    it('should handle positive with negative qualifier', () => {
      const result = classifier.classify('I like NFLX but not at these elevated levels.');
      expect(result.level).to.not.equal('high');
      expect(result.analysis.warnings).to.include.members(['Mixed signals detected']);
    });

    it('should prioritize negative signals over positive', () => {
      const result = classifier.classify('AMZN would be interesting on a pullback, but I would avoid it right now.');
      expect(result.level).to.equal('negative');
      expect(result.analysis.warnings).to.include.members(['Mixed signals detected']);
    });

    it('should handle changing conviction', () => {
      const result = classifier.classify('I was bullish on MSFT yesterday but now I'm waiting for a better setup.');
      expect(result.level).to.not.equal('high');
      expect(result.analysis.warnings).to.include.members(['Changing conviction detected']);
    });
  });

  describe('Contextual Enhancement', () => {
    it('should enhance confidence with specific price levels', () => {
      const baseResult = classifier.classify('I like AAPL here.');
      const enhancedResult = classifier.classify('I like AAPL at the 175-180 level.');
      expect(enhancedResult.confidence).to.be.above(baseResult.confidence);
    });

    it('should enhance confidence with position disclosure', () => {
      const baseResult = classifier.classify('MSFT looks good.');
      const enhancedResult = classifier.classify('MSFT looks good, I bought some yesterday.');
      expect(enhancedResult.confidence).to.be.above(baseResult.confidence);
    });

    it('should enhance confidence with detailed rationale', () => {
      const baseResult = classifier.classify('AMZN is interesting.');
      const enhancedResult = classifier.classify('AMZN is interesting because it's holding the 50-day MA with increasing volume and closing near the highs.');
      expect(enhancedResult.confidence).to.be.above(baseResult.confidence);
    });
  });

  describe('Default Pattern Handling', () => {
    it('should handle ticker with minimal context', () => {
      const result = classifier.classify('Looking at AAPL today.');
      expect(result.level).to.not.be.null;
      expect(result.analysis.defaultAssignment).to.be.true;
    });

    it('should detect directional bias with limited conviction', () => {
      const result = classifier.classify('NVDA higher today.');
      expect(result.level).to.not.be.null;
      expect(result.analysis.defaultAssignment).to.be.true;
    });
  });

  describe('Real-world Examples', () => {
    it('should properly classify focus trade example', () => {
      const result = classifier.classify('I love TEM right now, in the 60-62 range, this looks like a great entry point for a swing trade.');
      expect(result.level).to.equal('focus-trade');
      expect(result.confidence).to.be.above(0.9);
    });

    it('should properly classify high conviction example', () => {
      const result = classifier.classify('I\'m looking to add more to my HOOD position if it gets to 56, I remain very bullish on this name.');
      expect(result.level).to.equal('high');
      expect(result.confidence).to.be.above(0.7);
    });

    it('should properly classify medium conviction example', () => {
      const result = classifier.classify('For a short idea, BABA could be a decent day-after-trade if it gets to its 21-day MA around 121, might be worth a speculative short.');
      expect(result.level).to.equal('medium');
      expect(result.confidence).to.be.above(0.6);
    });

    it('should properly classify another medium conviction example', () => {
      const result = classifier.classify('CRWV is also interesting on any pullback, viable swing trade opportunity there.');
      expect(result.level).to.equal('medium');
      expect(result.confidence).to.be.above(0.6);
    });

    it('should properly classify yet another medium conviction example', () => {
      const result = classifier.classify('AMD could work around 115, might be worth trying some calls.');
      expect(result.level).to.equal('medium');
      expect(result.confidence).to.be.above(0.5);
    });

    it('should properly classify low conviction example', () => {
      const result = classifier.classify('TSLA is only interesting to me near the 8-day MA, which is around 309, would not chase.');
      expect(result.level).to.equal('low');
      expect(result.confidence).to.be.above(0.5);
    });
  });
});
```

To run these tests:

```bash
# Install testing dependencies
npm install mocha chai --save-dev

# Run the tests
npx mocha tests/conviction-classifier.test.js
```

## Limitations and Edge Cases

The classifier handles these common challenges:

- **Mixed Conviction Signals**: When text contains mixed signals (e.g., "I like AAPL but..."), the negative elements are weighted more heavily to err on the side of caution.
- **Conditional Statements**: Complex conditions reduce the confidence score and may lower the conviction level depending on their restrictiveness.
- **Implicit Conviction**: When explicit conviction phrases are absent, the classifier falls back to contextual analysis, resulting in lower confidence scores.
- **Changing Conviction**: If conviction changes within a single text (e.g., "I was bullish but now..."), the most recent assessment is prioritized.
- **Ambiguous Phrasing**: The classifier assigns lower confidence scores to ambiguous expressions and may classify them at a lower conviction level.
- **Sarcasm and Irony**: The classifier does not reliably detect sarcasm or irony, which may lead to misclassification. Context should be manually verified in ambiguous cases.
- **Analyst-Specific Language**: The classifier is optimized for DP's language patterns. When analyzing other analysts, the appropriate analyst parameter should be specified.

## Related Components

The Conviction Classification System works closely with:

- `prompts/plan/analyze-dp.md` - For processing morning call transcripts
- `prompts/focus/extract-focus.md` - For prioritizing trade ideas
- `prompts/focus/create-plan.md` - For incorporating conviction into trade planning
