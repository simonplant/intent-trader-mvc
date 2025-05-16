---
id: analyze-mancini-preprocessor
title: Mancini Newsletter Preprocessor
description: Extracts structured data from Mancini's newsletters to prepare for analysis
author: Intent Trader Team
version: 0.5.2-preview
release: 0.5.2
created: 2025-05-16
updated: 2025-05-16
category: plan
status: planned
tags: [plan, mancini, es-futures, preprocessing, extraction]
requires: []
outputs: [preprocessedManciniData]
input_format: text
output_format: json
ai_enabled: true
---

# Mancini Newsletter Preprocessor

This component serves as the initial processing stage for Adam Mancini's ES Futures newsletter, extracting key sections and data in a structured format that can be efficiently analyzed by the main analyzer component.

## Purpose

The Mancini Newsletter Preprocessor addresses the challenge of processing large newsletters that exceed context limits in a single analysis step. It:

1. Extracts key sections and breaks them into manageable chunks
2. Identifies and structures price levels, key setups, and market commentary
3. Normalizes date formats and newsletter-specific language patterns
4. Provides a clean, structured JSON output for the main analyzer

This preprocessing approach enables the Intent Trader system to handle newsletters of any length while maintaining analysis quality and consistency.

## Usage Instructions

This preprocessor is designed to be used in a separate chat window before passing the results to the main `/analyze-mancini` command.

### Step 1: Copy the complete Mancini newsletter text

Copy the full text of Mancini's newsletter, including all sections.

### Step 2: Run the preprocessor in a separate chat window

Paste the copied text into a new chat window with this prompt:

```
I need to extract structured data from this Mancini newsletter for my trading system. Please process this newsletter and extract the following components:

1. Newsletter date and title
2. Market assessment (Mode 1/2, directional bias)
3. All ES price levels (supports and resistances with their context)
4. Failed Breakdown setups
5. Bull and bear case scenarios
6. Any runner management information
7. Trading strategy recommendations

Format the output as clean JSON that I can copy directly into my trading system. The structure should match:

{
  "newsletterDate": "YYYY-MM-DD",
  "newsletterTitle": "string",
  "marketSection": "full text of market assessment section",
  "levelsSection": "full text of levels section",
  "keyLevels": {
    "supports": [
      {"price": number, "context": "string"}
    ],
    "resistances": [
      {"price": number, "context": "string"}
    ]
  },
  "scenarios": {
    "bullCase": "string",
    "bearCase": "string"
  },
  "failedBreakdowns": [
    {"level": number, "context": "string"}
  ],
  "runnerManagement": "string",
  "tradingStrategy": "string"
}

Here's the newsletter:

[PASTE NEWSLETTER HERE]
```

### Step 3: Copy the JSON output from the preprocessor

Once you receive the structured JSON output, copy it completely.

### Step 4: Pass the preprocessed data to the main analyzer

Return to your main chat and use the `/analyze-mancini` command with the preprocessed data:

```
/analyze-mancini preprocessedData='[PASTE JSON HERE]'
```

## Processing Logic

The preprocessor performs the following key operations:

### 1. Section Identification

The preprocessor identifies and extracts these key sections:

- **Introduction/Market Context**: Generally at the beginning, contains market assessment
- **Levels Section**: Contains support and resistance levels
- **Scenarios**: Bull case and bear case sections
- **Failed Breakdowns**: Any mentions of failed breakdowns or similar setups
- **Runner Management**: Information about managing existing positions
- **Trade Plan/Summary**: Usually at the end, contains strategy synthesis

### 2. Level Extraction

The preprocessor identifies price levels using pattern recognition:

- Support levels with context and significance indicators
- Resistance levels with context and significance indicators
- Key decision points and zones
- Range boundaries

### 3. Failed Breakdown Detection

The preprocessor identifies Failed Breakdown setups through:

- Explicit "Failed Breakdown" or "FB" mentions
- Price action descriptions matching FB patterns (e.g., "flush and recover")
- Level reclaim language and context

### 4. Market Mode Assessment

The preprocessor analyzes the text for mode classification:

- Mode 1 vs Mode 2 explicit mentions
- Trend vs range language indicators
- Directional bias assessment
- Volatility expectations

### 5. Data Normalization

The preprocessor handles various formatting inconsistencies:

- Standardizes date formats
- Normalizes price level formats
- Removes excessive whitespace and formatting characters
- Preserves essential context for each data point

## Output Format

The output is structured JSON with these main sections:

```json
{
  "newsletterDate": "2025-05-16",
  "newsletterTitle": "4 Green Days In A Row. Can SPX Close Week With 5, Or Are Bulls Out Of Steam?",
  "marketSection": "Everyday since the market bottomed on April 6th, I've began this newsletter in a similar way...",
  "levelsSection": "ES LEVELS: Supports are: 5925 (major)...",
  "keyLevels": {
    "supports": [
      {"price": 5925, "context": "major, First support down, resistance of the bull flag since Tuesday"},
      {"price": 5910, "context": "major"},
      {"price": 5900, "context": ""}
    ],
    "resistances": [
      {"price": 5945, "context": ""},
      {"price": 5953, "context": "major"},
      {"price": 5970, "context": "major level"}
    ]
  },
  "scenarios": {
    "bullCase": "As long as bull flag at 5882-85 is intact, targets at 5953, 5970, 6000...",
    "bearCase": "Failure of 5882-85, targets at 5850, 5820..."
  },
  "failedBreakdowns": [
    {"level": 5925, "context": "is first support down. This is an obvious one as it was resistance of the bull flag..."},
    {"level": 5890, "context": "Flag support at 5882-85, potential Failed Breakdown if we see it flush and recover"}
  ],
  "runnerManagement": "Holding 10% long runner from this morning's 8:30AM 5890 Failed Breakdown of yesterday's low...",
  "tradingStrategy": "Remember that trade management is everything and infinitely more important than entries..."
}
```

This structured output provides all the necessary data for the main analyzer component to perform its full analysis without being constrained by context limits.

## Implementation Notes

- This preprocessor is designed to handle newsletters of any reasonable length
- It preserves the original text in key sections to maintain context
- The extraction process is robust against formatting variations
- The output structure is optimized for the main analyzer component
- Error handling ensures partial results if certain sections cannot be extracted

---

**Note to Implementation Team:**
- This preprocessor should be deployed alongside the updated main analyzer
- Documentation should clearly explain the two-step process to users
- Consider adding this preprocessor as a default step in the UI workflow
- The preprocessor is deliberately lightweight to maximize context available for extraction
