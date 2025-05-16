---
id: validator
title: Command Validator
description: Validation rules for command parameters and state integrity
author: Intent Trader Team
version: 0.1.1
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

#### `/analyze-dp [transcript]`
- **Required Parameters**:
  - `transcript`: String, non-empty, minimum length 50 characters
- **Validation Actions**:
  - Verify transcript contains relevant trading content

#### `/analyze-mancini-preprocessor [newsletter]`
- **Required Parameters**:
  - `newsletter`: String, non-empty, minimum length 100 characters
- **Optional Parameters**:
  - None
- **Validation Actions**:
  - Verify newsletter contains relevant trading content

#### `/analyze-mancini [preprocessedData]`
- **Required Parameters**:
  - `preprocessedData`: String or Object, valid JSON structure
- **Optional Parameters**:
  - `components`: String array, values from ["levels", "mode", "failed-breakdowns", "scenarios", "runners", "all"]
  - `format`: String, one of ["json", "markdown", "summary", "structured"]
- **Validation Actions**:
  - Verify preprocessedData is valid JSON structure
  - Validate component names if provided


### FOCUS Phase Commands

#### `/create-plan`
- **Required Parameters**: None
- **Optional Parameters**:
  - `sources`: String, one of ["dp", "mancini", "both"]
  - `risk_level`: Number, range 1-5
- **Validation Actions**:
  - Verify DP analysis exists in state
  - If sources includes "mancini", verify Mancini analysis exists

#### `/extract-focus dp [min_conviction]`
- **Required Parameters**:
  - `dp`: Source identifier, must be "dp"
- **Optional Parameters**:
  - `min_conviction`: String, one of ["high", "medium", "low"]
- **Validation Actions**:
  - Verify DP analysis exists in state

#### `/extract-levels dp [indices]`
- **Required Parameters**:
  - `dp`: Source identifier, must be "dp"
- **Optional Parameters**:
  - `indices`: String, comma-separated list of indices (e.g., "SPX,NDX")
- **Validation Actions**:
  - Verify DP analysis exists in state
  - Validate index symbols if provided

### EXECUTE Phase Commands

#### `/add-position [symbol]`
- **Required Parameters**:
  - `symbol`: String, valid ticker symbol
  - `entry_price`: Number, greater than 0
  - `stop_price`: Number, greater than 0
- **Optional Parameters**:
  - `target_price`: Number, greater than entry_price
  - `strategy`: String
  - `conviction`: String, one of ["high", "medium", "low"]
  - `notes`: String
- **Validation Actions**:
  - Verify symbol format
  - Ensure prices are valid numbers
  - Check if position already exists

#### `/size-position [symbol]`
- **Required Parameters**:
  - `symbol`: String, valid ticker symbol
  - `entry`: Number, greater than 0
  - `stop`: Number, greater than 0
- **Optional Parameters**:
  - `risk_amount`: Number, greater than 0
  - `conviction`: String, one of ["high", "medium", "low"]
- **Validation Actions**:
  - Verify symbol format
  - Ensure prices are valid numbers
  - Check risk amount is reasonable

#### `/list-positions`
- **Optional Parameters**:
  - `status`: String, one of ["active", "closed"]
  - `owner`: String, one of ["personal", "moderator"]
- **Validation Actions**:
  - Validate status and owner values if provided

### MANAGE Phase Commands

#### `/update-position [symbol]`
- **Required Parameters**:
  - `symbol`: String, valid ticker symbol
- **Optional Parameters**:
  - `current_price`: Number, greater than 0
  - `stop_price`: Number, greater than 0
  - `target_price`: Number, greater than entry price
  - `notes`: String
- **Validation Actions**:
  - Verify symbol exists in positions
  - Ensure prices are valid numbers

#### `/close-position [symbol]`
- **Required Parameters**:
  - `symbol`: String, valid ticker symbol
  - `exit_price`: Number, greater than 0
- **Optional Parameters**:
  - `exit_type`: String, one of ["target", "stop", "discretionary"]
  - `notes`: String
- **Validation Actions**:
  - Verify symbol exists in active positions
  - Ensure exit price is a valid number

### REVIEW Phase Commands

#### `/log-session [date]`
- **Optional Parameters**:
  - `date`: String, valid date format (YYYY-MM-DD)
  - `market_conditions`: String
  - `psychological_state`: String
- **Validation Actions**:
  - Validate date format if provided
  - Default to current date if not provided

### SYSTEM Commands

#### `/help [command]`
- **Optional Parameters**:
  - `command`: String, valid command name
- **Validation Actions**:
  - Verify command exists in registry if provided

#### `/status`
- **Required Parameters**: None
- **Validation Actions**: None

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