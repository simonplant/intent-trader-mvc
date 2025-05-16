## Updated Sections for command-reference.md

### PLAN Phase Commands

#### `/analyze-mancini-preprocessor [newsletter]` 🔜 MVP STRETCH

**Purpose:** Extract structured data from Mancini newsletter for further analysis, handling large PDFs that exceed context limits.

**Parameters:**
* `newsletter` (required): Complete text of Mancini's newsletter
* `format` (optional): Output format for the structured data (default: json)

**Output:**
* Preprocessed JSON with structured sections
* Extracted price levels with context
* Market commentary organized by sections
* Failed Breakdown setups identified
* Bull/bear scenarios extracted
* Runner management information

**MVP Implementation:**
* Document chunking for large newsletters
* Key section identification
* Price level extraction
* Basic structure normalization

**File Location:**
* `prompts/plan/analyze-mancini-preprocessor.md`

**Example:**
```
/analyze-mancini-preprocessor "SPX Is Coiled Tight. Another Move Is Coming. What Way? May 15 Plan..."
```

#### `/analyze-mancini [preprocessedData]` 🔜 MVP STRETCH

**Purpose:** Process preprocessed Mancini newsletter data to perform comprehensive analysis and integration with trade plan.

**Parameters:**
* `preprocessedData` (required): JSON output from the preprocessor
* `components` (optional): Specific components to focus on (default: all)
* `format` (optional): Output format (default: structured)

**Output:**
* Structured level framework with major/minor classification
* Market mode assessment (Mode 1/Mode 2)
* Failed Breakdown setups and opportunities
* Bull/bear case scenarios
* Runner status and management protocol
* Level-to-level trading methodology

**MVP Implementation:**
* Advanced analysis of preprocessed data
* Mode classification (Mode 1 vs Mode 2)
* Integration with level extraction system
* Failed Breakdown pattern recognition
* Market bias determination

**File Location:**
* `prompts/plan/analyze-mancini.md`

**Example:**
```
/analyze-mancini preprocessedData='{"newsletterDate":"2025-05-16","newsletterTitle":"4 Green Days In A Row","marketSection":"Everyday since the market bottomed...","keyLevels":{"supports":[{"price":5925,"context":"major"}]}}'
```

## Quick Reference: MVP Commands (Updated)

Add these entries to the MVP Commands table:

| Command | Phase | Status | Description |
|---------|-------|--------|-------------|
| `/analyze-mancini-preprocessor` | Plan | 🔜 MVP STRETCH | Extract structured data from Mancini newsletter |
| `/analyze-mancini` | Plan | 🔜 MVP STRETCH | Process preprocessed Mancini data |

## Command Flow Example: Mancini Newsletter Analysis

Add this example to the Command Flow Examples section:

### Mancini Newsletter Analysis Flow
```
# For standard-sized newsletters:
/analyze-mancini "SPX Is Coiled Tight. Another Move Is Coming. What Way? May 15 Plan..."

# For large newsletters that exceed context limits:
/analyze-mancini-preprocessor "SPX Is Coiled Tight. Another Move Is Coming. What Way? May 15 Plan..."
# Then use the JSON output with:
/analyze-mancini preprocessedData='[JSON output from preprocessor]'
```

## Release Roadmap (Updated)

Update the v0.5.2 section:

### v0.5.2 (Planned)
- Mancini analysis integration with two-step processing
- Enhanced stop management
- Runner management protocol
- Comprehensive session debrief
