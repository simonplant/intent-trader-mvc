---
id: validator
title: Command Validator
description: Validation rules for command parameters and state integrity
author: Intent Trader Team
version: 0.2.0
release: 0.5.1
created: 2025-05-16
updated: 2025-05-16
category: system
status: stable
tags: [system, validation, parameters, rules]
requires: [system/runtime/command-map.md]
outputs: []
input_format: json
output_format: json
ai_enabled: true
---

# Command Validator

This file defines the validation logic for Intent Trader commands, ensuring that all inputs are properly structured and all required parameters are present.

## Command Parameter Validation

Each command has specific validation rules for its parameters. The validator ensures that:

1. Required parameters are present
2. Parameter values are within acceptable ranges or formats
3. Parameter combinations are valid
4. State files exist and are properly structured

## Command Validation Rules

### PLAN Phase Commands

#### `/clean-dp-transcript [transcript]`
- **Required Parameters**:
  - `transcript`: String, non-empty, minimum length 100 characters
- **Optional Parameters**:
  - `includeAnnotations`: Boolean (default: false)
  - `standardizeFormatting`: Boolean (default: true)
- **Validation Actions**:
  - Verify transcript contains recognizable content

#### `/analyze-dp [transcript]`
- **Required Parameters**:
  - `transcript`: String, non-empty, minimum length 50 characters
- **Optional Parameters**:
  - `components`: String, comma-separated list of components to focus on (default: all)
  - `format`: String, one of ["structured", "json", "summary"]
- **Validation Actions**:
  - Verify transcript contains relevant trading content

#### `/analyze-mancini-preprocessor [newsletter]`
- **Required Parameters**:
  - `newsletter`: String, non-empty, minimum length 100 characters
- **Optional Parameters**:
  - `format`: String, one of ["json", "structured"] (default: json)
- **Validation Actions**:
  - Verify newsletter contains relevant trading content

#### `/analyze-mancini [preprocessedData]`
- **Required Parameters**:
  - `preprocessedData`: String or Object, valid JSON structure
- **Optional Parameters**:
  - `components`: String array, values from ["levels", "mode", "failed-breakdowns", "scenarios", "runners", "all"]
  - `format`: String, one of ["structured", "json", "summary"]
- **Validation Actions**:
  - Verify preprocessedData is valid JSON structure
  - Validate component names if provided

### FOCUS Phase Commands

#### `/create-plan`
- **Required Parameters**: None
- **Optional Parameters**:
  - `sources`: String array, values from ["dp", "mancini", "all"]
  - `risk_level`: Number, range 1-5
  - `focus`: String, specific aspects to emphasize
- **Validation Actions**:
  - Verify DP analysis exists in state
  - Validate risk_level is between 1-5
  - If sources includes "mancini", verify Mancini analysis exists

#### `/extract-focus [source] [min_conviction]`
- **Required Parameters**:
  - `source`: String, one of ["mancini", "dp", "both"]
- **Optional Parameters**:
  - `min_conviction`: String, one of ["focus-trade", "high", "medium", "low"]
  - `max_ideas`: Number, positive integer
- **Validation Actions**:
  - Verify source analysis exists in state
  - Validate min_conviction value if provided

#### `/extract-levels [source] [indices]`
- **Required Parameters**:
  - `source`: String, one of ["mancini", "dp", "both"]
- **Optional Parameters**:
  - `indices`: String, comma-separated list of indices (e.g., "ES,SPX,QQQ")
  - `include_context`: Boolean (default: true)
- **Validation Actions**:
  - Verify source analysis exists in state
  - Validate index symbols if provided

### EXECUTE Phase Commands

#### `/size-position [symbol]`
- **Required Parameters**:
  - `symbol`: String, valid ticker symbol
  - `direction`: String, one of ["long", "short"]
  - `entry`: Number, greater than 0
  - `stop`: Number, greater than 0
- **Optional Parameters**:
  - `setup`: String, setup type
  - `conviction`: String, one of ["high", "medium", "low"]
  - `account_size`: Number, positive value
  - `max_risk_percent`: Number, between 0.1 and 10
- **Validation Actions**:
  - Verify symbol format
  - Validate direction is either "long" or "short"
  - Ensure prices are valid numbers
  - Check risk parameters are reasonable

#### `/add-position [symbol]`
- **Required Parameters**:
  - `symbol`: String, valid ticker symbol
  - `direction`: String, one of ["long", "short"]
  - `entry`: Number, greater than 0
  - `size`: Number, positive integer
  - `stop`: Number, greater than 0
  - `targets`: String, comma-separated list of price levels
- **Optional Parameters**:
  - `setup`: String, setup type
  - `strategy`: String, one of ["dp", "mancini"]
  - `trade_type`: String, one of ["day", "swing", "core"]
  - `owner`: String, one of ["me", "moderator"]
  - `notes`: String
- **Validation Actions**:
  - Verify symbol format
  - Validate direction is either "long" or "short"
  - Ensure prices are valid numbers
  - Check if position already exists
  - Validate targets are consistent with direction

### MANAGE Phase Commands

#### `/update-position [symbol]`
- **Required Parameters**:
  - `symbol`: String, valid ticker symbol
  - `action`: String, one of ["move-stop", "partial-exit", "update-price", "hit-target", "add-notes", "change-status"]
  - `value`: Number or String, depends on action
- **Optional Parameters**:
  - `size`: Number, positive integer (required for partial-exit)
  - `owner`: String, one of ["me", "moderator"] (default: "me")
  - `notes`: String
- **Validation Actions**:
  - Verify symbol exists in positions
  - Ensure action is valid
  - Validate value based on action type
  - Check size is provided for partial-exit action

#### `/close-position [symbol]`
- **Required Parameters**:
  - `symbol`: String, valid ticker symbol
  - `exit_price`: Number, greater than 0
- **Optional Parameters**:
  - `exit_time`: String, timestamp (default: current time)
  - `reason`: String, one of ["target", "stop", "discretionary"]
  - `owner`: String, one of ["me", "moderator"] (default: "me")
  - `size`: Number, positive integer (for partial closes)
  - `notes`: String
- **Validation Actions**:
  - Verify symbol exists in active positions
  - Ensure exit price is a valid number
  - Validate exit time format if provided
  - Check size doesn't exceed position size if provided

#### `/list-positions`
- **Optional Parameters**:
  - `status`: String, one of ["active", "pending", "all"] (default: "active")
  - `sort`: String, one of ["entry", "p&l", "ticker", "risk"] (default: "entry")
  - `format`: String, one of ["detailed", "summary", "visual"] (default: "summary")
  - `owner`: String, one of ["me", "moderator", "all"] (default: "me")
- **Validation Actions**:
  - Validate status values if provided
  - Validate sort criteria if provided
  - Validate format type if provided
  - Validate owner if provided

### REVIEW Phase Commands

#### `/log-session [date]`
- **Optional Parameters**:
  - `date`: String, valid date format (YYYY-MM-DD) (default: today)
  - `market_regime`: String
  - `market_mode`: String, one of ["Mode 1", "Mode 2"]
  - `market_conditions`: String
  - `cognitive_load`: Number, range 1-10
  - `decision_quality`: String, one of ["OPTIMAL", "NORMAL", "DEGRADED", "COMPROMISED"]
  - `key_learnings`: String array
  - `improvement_actions`: String array
  - `format`: String, one of ["detailed", "summary"] (default: "detailed")
- **Validation Actions**:
  - Validate date format if provided
  - Validate cognitive_load is between 1-10
  - Validate decision_quality is one of the allowed values
  - Validate market_mode is one of the allowed values

### UTILITIES Commands

#### `/analyze-chart [image]`
- **Required Parameters**:
  - `image`: Image file or URL
- **Optional Parameters**:
  - `symbol`: String, ticker symbol for additional context
  - `timeframe`: String, chart timeframe (e.g., "1m", "5m", "daily") (default: auto-detect)
  - `focus`: String, analysis focus (e.g., "support-resistance", "patterns", "entries", "review") (default: comprehensive)
  - `context`: String, additional market context information
  - `format`: String, output format (default: structured)
- **Validation Actions**:
  - Verify image is provided
  - Validate timeframe format if provided
  - Validate focus is one of the allowed values if provided

## Validation Response Format

When validation fails, the system returns:

```json
{
  "success": false,
  "command": "command-name",
  "errors": [
    {
      "parameter": "parameter-name",
      "message": "Validation error message"
    }
  ],
  "message": "Validation failed. Please correct the errors and try again."
}
