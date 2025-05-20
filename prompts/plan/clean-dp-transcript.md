---
id: clean-dp-transcript
title: Clean DP Morning Call Transcript
description: Corrects transcription errors in DP morning call recordings with minimal alteration of content and structure
author: Intent Trader Team
version: 0.1.0
release: 0.5.1
created: 2025-05-20
updated: 2025-05-20
category: plan
status: stable
tags: [plan, transcript, preprocessing, cleanup]
requires: []
outputs: [cleanedTranscript]
input_format: text
output_format: text
ai_enabled: true
---

# Morning Call Transcript Cleaner

This prompt cleans up transcription errors in DP morning call recordings while strictly preserving the original content, structure, and intent. This preprocessing step improves downstream analysis accuracy without introducing interpretation bias.

## Purpose

The transcript cleaner serves as an initial preprocessing step in the Intent Trader workflow, addressing common transcription issues before moving to analysis. It:

1. **Corrects Stock Ticker Formatting**: Ensures proper capitalization and formatting of ticker symbols
2. **Fixes Numerical Data**: Corrects price values, percentages, and statistics
3. **Standardizes Terminology**: Normalizes industry-specific terms and phrases
4. **Preserves Original Structure**: Maintains section organization and content flow
5. **Avoids Interpretation**: Makes only objective corrections without summarizing or rephrasing

This cleaned output enables more reliable extraction in the subsequent `/analyze-dp` step.

## Input Parameters

- `transcript` (required): The raw text of DP's morning call
  - Must be a non-empty string
  - Minimum length: 100 characters
  - Should contain recognizable market commentary and/or ticker mentions
- `includeAnnotations` (optional): Whether to include correction notes (default: false)
- `standardizeFormatting` (optional): Whether to apply paragraph breaks for readability (default: true)

## Output Format

The command produces a cleaned transcript with minimal alterations:

```text
[Cleaned transcript text with corrected tickers, terminology, and formatting]

[Optional correction annotations if includeAnnotations=true]
```

## Processing Logic

### 1. Stock Ticker Normalization

The cleaner applies the following rules to ticker references:

1. **Capitalization**: Ensure all ticker symbols are properly capitalized
2. **Common Substitutions**: Fix regularly mis-transcribed tickers according to reference list
3. **Dollar Sign Normalization**: Standardize "$TICKER" vs "TICKER" format
4. **Contextual Validation**: Verify tickers make sense in the surrounding context

Reference list of commonly mis-transcribed tickers:
- "BKTX" → "VKTX"
- "Cues" or "Ques" → "QQQ"
- "Invidia" → "NVIDIA" or "NVDA"
- "KAVA" → "CAVA"
- "Crowd Strike" → "CrowdStrike" or "CRWD"
- "Core Weave" → "CoreWeave" or "CRWV"
- "Baidu" without ticker → "BIDU"
- "Palantir" without ticker → "PLTR"
- "Tesla" without ticker → "TSLA"
- "Tempus" or "Tempest" → "TEM" (Tempus AI)
- "United Health" → "UnitedHealth" or "UNH"

### 2. Numerical and Price Data Correction

The cleaner standardizes numerical data:
1. **Price Formatting**: "$X" or "X dollars" → consistent "$X" format
2. **Percentage Notation**: "X percent" → "X%"
3. **Range Indication**: "X to Y" → "X-Y" for price ranges
4. **Decimal Point Verification**: Check context to ensure decimal places make sense

### 3. Terminology Standardization

The cleaner normalizes common trading terminology:
1. **Trading Terms**: "buy and" → "buy-in", "sell of" → "sell-off"
2. **Abbreviations**: Expand or standardize context-dependent abbreviations
3. **Specialized Terms**: Correct "day after trade" → "Day-After Trade (DAT)"

### 4. Structure Preservation

The cleaner maintains document organization:
1. **Section Boundaries**: Preserve paragraph breaks and section transitions
2. **Sentence Structure**: Retain original sentence construction and order
3. **Information Flow**: Maintain the original sequence of topics and ideas
4. **List Organization**: Preserve enumerated or bulleted lists

### 5. Minimal Intervention Principle

The cleaner follows strict rules to avoid content alteration:
1. **No Summarization**: Never condense or abbreviate original content
2. **No Rephrasing**: Don't substitute synonyms or rearrange clauses
3. **No Interpretation**: Don't disambiguate unclear statements unless obvious error
4. **No Content Addition**: Don't add explanatory notes or missing information

## Guidelines for Cleaning

1. **High-Confidence Corrections Only**
   - Make corrections only when the intended meaning is obvious
   - Leave ambiguous text unchanged
   - Flag truly unclear passages with [?] if includeAnnotations=true

2. **Formatting Improvements**
   - Add paragraph breaks for readability if standardizeFormatting=true
   - Standardize spacing and punctuation for clarity
   - Maintain original emphasis and tone

3. **Ticker Symbol Focus**
   - Prioritize accurate ticker symbol correction
   - Ensure consistency when tickers appear multiple times
   - Verify contextual clues support ticker corrections

4. **Terminology Consistency**
   - Apply industry-standard terms consistently
   - Maintain DP's specific terminology preferences
   - Standardize abbreviations throughout document

## Error Handling

When faced with unclear text, the cleaner follows these protocols:

1. **Partial Cleaning**: Apply confident corrections while leaving ambiguous sections untouched
2. **Error Flagging**: Mark truly unintelligible sections with [?] if includeAnnotations=true
3. **Context Clues**: Use surrounding context to inform correction decisions
4. **Conservative Approach**: When in doubt, preserve original text

## Example Usage

```
/clean-dp-transcript transcript="Futures are a bit lower as we await this morning's CPI. The Dow is leading to the downside after you anench suspends guidance for 2025. The CEO steps down and it's getting crushed. United Health down 40 points this morning."
```

## Example Output

```
Futures are a bit lower as we await this morning's CPI. The Dow is leading to the downside after UNH suspends guidance for 2025. The CEO steps down and it's getting crushed. UnitedHealth down 40 points this morning.
```

## Implementation Notes

The transcript cleaner is designed to:
- Handle large transcript volumes efficiently
- Prioritize accuracy over comprehensive correction
- Prepare text for optimal analysis by downstream components
- Preserve all original information in its full context
- Address the most common and impactful transcription errors

This careful approach ensures that analysis is performed on accurate but not reinterpreted data, maintaining the integrity of the original morning call while improving machine processing reliability.
