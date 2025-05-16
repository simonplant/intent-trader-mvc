# Mancini Newsletter Analysis Command Implementation Guide

This guide explains how to implement the refactored Mancini Newsletter Analysis process using the two-component approach that handles large PDFs efficiently.

## Overview of the Refactored Process

The refactored process splits the Mancini analysis into two components:

1. **Preprocessing Component** (`analyze-mancini-preprocessor.md`): Handles the initial parsing of large PDFs/text, extracting structured data without hitting context limits
2. **Analysis Component** (`analyze-mancini.md`): Performs in-depth analysis on the preprocessed data to generate the final output

## Implementation Steps

### Step 1: Create the Preprocessor Command

Create the preprocessor component that will handle the extraction of structured data from the raw newsletter:

```bash
# Create the preprocessor component
cp /prompts/plan/analyze-mancini-preprocessor.md /prompts/plan/
```

### Step 2: Update the Main Analyzer

Update the main analyzer to work with the preprocessed data:

```bash
# Replace the existing analyzer with the updated version
cp /prompts/plan/analyze-mancini.md /prompts/plan/
```

### Step 3: Update Command Registry

Update the command registry to include both commands:

```bash
# Add entries to system/runtime/command-map.md
echo "/analyze-mancini-preprocessor - Extract structured data from raw Mancini newsletter" >> system/runtime/command-map.md
# Update existing entry for analyze-mancini
sed -i 's|/analyze-mancini.*|/analyze-mancini - Analyze preprocessed Mancini newsletter data|' system/runtime/command-map.md
```

### Step 4: Create User Documentation

Create documentation explaining the two-step process for users:

```markdown
# Analyzing Mancini Newsletters

For newsletters of any length, use our two-step process:

1. **Preprocess the newsletter**:
   ```
   /analyze-mancini-preprocessor newsletter="[PASTE FULL NEWSLETTER TEXT]"
   ```

2. **Analyze the preprocessed data**:
   ```
   /analyze-mancini preprocessedData="[PASTE JSON FROM STEP 1]"
   ```

This approach ensures that even very long newsletters can be analyzed accurately.
```

## Command Usage Workflow

### Preprocessor Command Usage

```
/analyze-mancini-preprocessor newsletter="[PASTE FULL NEWSLETTER TEXT]"
```

**Alternative Method (External Chat):**
1. Open a new chat window
2. Paste the preprocessor prompt template
3. Paste the full newsletter text
4. Copy the JSON output

### Analyzer Command Usage

```
/analyze-mancini preprocessedData="[PASTE JSON FROM PREPROCESSOR]"
```

**Options:**
- `components`: Specify which components to analyze (e.g., "levels,mode,failed-breakdowns")
- `format`: Specify output format ("json", "markdown", "summary")

## Integration Tests

Create the following integration tests to verify the refactored implementation:

1. **Small Newsletter Test**: 
   - Use a small newsletter that would fit in a single context window
   - Verify that both direct analysis and the two-step process produce identical results

2. **Large Newsletter Test**:
   - Use a large newsletter that would exceed context limits
   - Verify that the two-step process successfully processes the entire newsletter
   - Check that all key sections are correctly identified

3. **Component Selection Test**:
   - Verify that selecting specific components (e.g., only "levels" and "mode") works as expected

## Additional Considerations

### Error Handling

The preprocessor and analyzer should handle various error conditions:

- Missing/malformed newsletter input
- JSON parsing errors in preprocessed data
- Missing required fields in preprocessed data
- Timeouts during processing of very large documents

### Performance Optimization

For very large newsletters:

1. Consider implementing a chunking mechanism in the preprocessor
2. Add progress reporting for long-running extractions
3. Implement caching of previously processed newsletters

## Documentation Updates

Update the following documentation:

1. Command reference documentation
2. User guide with examples of the two-step process
3. System architecture diagram to show the new processing flow
4. Implementation notes for developers

By following this implementation guide, you'll successfully refactor the Mancini analysis process to handle newsletters of any length without hitting context limits.
