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

This component classifies the conviction level of trade ideas based on language patterns in analyst commentary. It transforms the natural language expressions of conviction into standardized levels with confidence scores, enabling downstream components to prioritize opportunities effectively.

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
- `analyst` (optional): The specific analyst source (default: "dp")
- `minConfidence` (optional): Minimum confidence threshold for classification (default: 0.7)

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
    "overrideReason": "string" // if applicable
  }
}
```

## Pattern Recognition Rules

The classifier uses a comprehensive pattern map for each conviction level, with analyst-specific variations:

### DP-Specific Pattern Maps

#### Focus Trade Level (Highest Conviction)
- **Explicit designation patterns**:
  - "focus idea", "focus trade", "one to watch today", "first focus"
  - "favorite trade", "favorite name", "favorite stock", "top idea"
  - "primary setup", "main trade", "key trade", "core position"

- **Emotional language patterns**:
  - "love it", "really like this one", "very excited about"
  - "favorite", "crushing it", "monster", "beast"
  - "i'm in this", "own this", "adding to my position"
  - "very excited", "most excited about", "loving"

- **Absolutist phrasing**:
  - "best setup", "absolutely", "no doubt", "definitely"
  - "no question", "crystal clear", "extremely", "tremendous"
  - "perfect setup", "ideal"
  
- **Strong directional commitment**:
  - "definitely buying", "definitely a buyer", "all over this"
  - "jumping on this", "getting in", "looking to buy aggressively"
  - "strong conviction", "high conviction"

#### High Conviction Level
- **Clear positive sentiment**:
  - "very viable", "really like", "bullish on", "looks good"
  - "strong setup", "good opportunity", "great risk/reward"
  - "remain bullish", "still like", "continue to be positive on"
  - "buying", "buyer of", "adding to", "accumulating"

- **Strong commitment qualifiers**:
  - "very", "really", "quite", "certainly", "clearly"
  - "strongly", "definitely", "absolutely", "undoubtedly"
  
- **Clear directional bias**:
  - "would buy", "looking to buy", "want to buy", "would add"
  - "good entry", "nice entry", "solid entry"
  - "buy zone", "buying opportunity", "attractive at"

- **Minimal conditions**:
  - Specific price levels with few or no conditions
  - Direct action statements without "if" clauses
  - Clear entry parameters

#### Medium Conviction Level
- **Moderate positive sentiment**:
  - "viable", "interesting", "worth a look", "on the radar"
  - "decent setup", "reasonable", "makes sense", "watching"
  - "like", "potential", "could work", "should work"
  - "on watch", "monitoring", "tracking"

- **Moderate commitment qualifiers**:
  - "fairly", "somewhat", "pretty", "rather"
  - "relatively", "moderately", "quite", "reasonably"
  
- **Conditional language with clear direction**:
  - "if it gets to", "on pullback to", "on break above/below"
  - "around these levels", "near this area"
  - "could buy", "might buy", "will consider"

- **Multiple conditions**:
  - Specific price action requirements
  - Volume or confirmation requirements
  - Multiple "if" statements

#### Low Conviction Level
- **Tentative sentiment**:
  - "might work", "could be okay", "might be worth", "possibly"
  - "keeping an eye on", "watching from distance", "on the radar"
  - "could consider", "may look at", "might think about"
  - "speculative", "lottery ticket", "flyer"

- **Weak commitment qualifiers**:
  - "maybe", "perhaps", "possibly", "potentially"
  - "somewhat", "a bit", "slightly", "marginally"
  
- **Heavily conditional language**:
  - "only if", "just if", "would need to see", "would require"
  - "if and only if", "several things need to happen"
  - "too many conditions to meet"

- **Restrictive entry conditions**:
  - Very specific price points only
  - Multiple confirmation requirements
  - Time-based restrictions

#### Negative Conviction Level
- **Explicit disinterest**:
  - "not interested", "would avoid", "staying away", "pass"
  - "don't like", "negative on", "bearish on", "wouldn't touch"
  - "too risky", "no edge", "unfavorable", "poor setup"
  - "would not chase", "overextended", "overbought", "avoiding"

- **Warning language**:
  - "be careful", "watch out", "dangerous", "risky"
  - "too much risk", "unfavorable risk/reward", "not worth it"
  - "bad idea", "not recommended", "better opportunities elsewhere"

- **Strong negative qualifiers**:
  - "very negative", "extremely cautious", "highly skeptical"
  - "strongly advise against", "definitely avoiding"

### Contextual Enhancement Factors

Beyond pattern matching, the classifier considers these contextual factors:

1. **Position Disclosure**: Mentions of personal positions increase conviction level
   - "I'm in this", "I own this", "I'm adding to my position", "I bought"
   - "I'm long/short this", "I'm positioned here", "I'm involved"

2. **Frequency of Mention**: Multiple references to the same trade idea throughout the analysis
   - First mention (base weight)
   - Second mention (+10% confidence)
   - Third or more mention (+20% confidence)

3. **Detail Level**: Amount of specific detail provided about the setup
   - Specific entry/exit levels (+10% confidence)
   - Multiple technical justifications (+15% confidence)
   - Comprehensive risk management plans (+20% confidence)

4. **Time Allocation**: Relative amount of discussion dedicated to the idea
   - Brief mention (base weight)
   - Extended discussion (+15% confidence)
   - Multiple section references (+20% confidence)

5. **Recency Effect**: Position in the analysis (later mentions often reflect stronger conviction)
   - Early mention (base weight)
   - Middle mention (+5% confidence)
   - Final or summary mention (+10% confidence)

6. **Comparative Language**: How the idea is positioned relative to others
   - "Better than", "prefer over", "instead of" (+10% confidence)
   - "Best of", "top of", "favorite among" (+20% confidence)
   - "Unlike", "as opposed to", "in contrast to" (context-dependent)

## Classification Algorithm

The classification process follows these steps:

1. **Preprocessing**
   - Normalize text (lowercase, remove excess whitespace)
   - Identify ticker symbols and surrounding context (±3 sentences)
   - Extract explicit conviction phrases using pattern matching

2. **Pattern Matching**
   - Match text against each level's pattern lists
   - Calculate raw pattern score based on matched patterns
   - Weight matches by pattern specificity and uniqueness

3. **Contextual Analysis**
   - Evaluate contextual enhancement factors
   - Adjust raw score based on contextual factors
   - Calculate contextual impact score

4. **Conviction Level Assignment**
   - Determine preliminary level based on highest pattern score
   - Apply threshold rules to assign final level
   - Handle edge cases (mixed signals, ambiguous language)

5. **Confidence Scoring**
   - Calculate base confidence from pattern match strength
   - Adjust for contextual factors and pattern clarity
   - Normalize to 0-1 scale

6. **Result Generation**
   - Populate level, phrases, and confidence
   - Include analysis details for transparency
   - Apply minimum confidence threshold filtering

## Classification Thresholds

The following thresholds are used to assign conviction levels:

| Level        | Pattern Score Range | Required Patterns | Confidence Threshold |
|--------------|---------------------|-------------------|----------------------|
| Focus Trade  | ≥ 0.85              | ≥ 2 focus patterns | ≥ 0.85               |
| High         | ≥ 0.70              | ≥ 1 high pattern   | ≥ 0.75               |
| Medium       | ≥ 0.50              | ≥ 1 medium pattern | ≥ 0.65               |
| Low          | ≥ 0.30              | ≥ 1 low pattern    | ≥ 0.60               |
| Negative     | Any negative pattern| ≥ 1 negative pattern | ≥ 0.70              |

In cases of conflicting patterns, the classifier prioritizes the highest conviction level with sufficient confidence, with negative patterns having override priority when they meet the confidence threshold.

## Example Pattern Processing

For input text: "I love TEM right now, in the 60-62 range, this looks like a great entry point for a swing trade."

**Pattern Matching**:
- Matches "love it" pattern (Focus Trade level)
- Matches "great entry" pattern (High level)
- Contains specific price range "60-62" (contextual enhancement)
- Mentions trade duration "swing trade" (contextual enhancement)

**Conviction Analysis**:
- Base pattern score: 0.90 (Focus Trade)
- Contextual enhancements: +0.10 (specific levels, trade duration)
- No negative patterns detected
- Final confidence: 0.95

**Result**:
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
  }
}
```

## Integration Instructions

To integrate the Conviction Classification System into another component:

1. **Import the classifier**:
   ```javascript
   const convictionClassifier = require('./system/focus/conviction-classifier');
   ```

2. **Process text content**:
   ```javascript
   const convictionResult = convictionClassifier.classify(text, {
     analyst: "dp",
     minConfidence: 0.7
   });
   ```

3. **Apply the result**:
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

## Test Cases

**High Conviction Examples**:
- "I love AAPL here, looks perfect for a breakout."
- "MSFT is my focus trade for today, looking to buy aggressively."
- "NVDA is crushing it, definitely a buy on any pullback."
- "I'm very bullish on AMD, great setup forming."
- "META is a very viable long, looking strong on all timeframes."
- "I am absolutely a buyer of TSLA at these levels."

**Medium Conviction Examples**:
- "INTC is interesting here, worth a look on a pullback."
- "AMZN is viable for a swing trade if it holds this level."
- "I'm watching GOOG, could be a decent setup."
- "ORCL makes sense here if it breaks above resistance."
- "ADBE is on the radar, reasonable risk/reward."
- "IBM is on watch, looking for confirmation."

**Low Conviction Examples**:
- "CSCO might work if it gets back above the 8-day MA."
- "QCOM could be okay on a deeper pullback."
- "Possibly look at NFLX if it consolidates for a few days."
- "Maybe consider PYPL, but only with tight stops."
- "HPQ on the radar, but not excited about it."
- "DELL might be worth a speculative position if it breaks out."

**Negative Conviction Examples**:
- "I would avoid GME, too much risk."
- "Not interested in BBBY at all."
- "Staying away from PLTR at these levels."
- "I don't like the setup in COIN right now."
- "Be careful with BABA here, wouldn't touch it."
- "RIVN is not on my buy list, too extended."

## Limitations and Edge Cases

The classifier handles these common challenges:

1. **Mixed Conviction Signals**: When text contains mixed signals (e.g., "I like AAPL but..."), the negative elements are weighted more heavily to err on the side of caution.

2. **Conditional Statements**: Complex conditions reduce the confidence score and may lower the conviction level depending on their restrictiveness.

3. **Implicit Conviction**: When explicit conviction phrases are absent, the classifier falls back to contextual analysis, resulting in lower confidence scores.

4. **Changing Conviction**: If conviction changes within a single text (e.g., "I was bullish but now..."), the most recent assessment is prioritized.

5. **Ambiguous Phrasing**: The classifier assigns lower confidence scores to ambiguous expressions and may classify them at a lower conviction level.

6. **Sarcasm and Irony**: The classifier does not reliably detect sarcasm or irony, which may lead to misclassification. Context should be manually verified in ambiguous cases.

7. **Analyst-Specific Language**: The classifier is optimized for DP's language patterns. When analyzing other analysts, the appropriate analyst parameter should be specified.

## Related Components

The Conviction Classification System works closely with:
- `prompts/premarket/analyze-dp.md` - For processing morning call transcripts
- `prompts/premarket/extract-focus.md` - For prioritizing trade ideas
- `prompts/premarket/create-plan.md` - For incorporating conviction into trade planning
