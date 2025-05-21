# Intent Trader v0.5.2 - Worker Prompts

This document contains specialized worker prompts for implementing specific aspects of the Intent Trader v0.5.2 plan. Each worker is designed to handle a particular type of task and includes the required file dependencies for processing.

## Table of Contents

1. [Schema Designer](#schema-designer)
2. [Prompt Converter](#prompt-converter)
3. [State Migrator](#state-migrator)
4. [NL Parser Designer](#nl-parser-designer)
5. [Context Tracker](#context-tracker)
6. [Validator](#validator)
7. [Runtime Developer](#runtime-developer)
8. [Documentation Specialist](#documentation-specialist)

---

## Schema Designer

### Purpose
The Schema Designer worker creates and modifies JSON Schema definitions for the canonical schema, ensuring they meet the requirements for structure, validation, and compatibility.

### File Dependencies
- intent-trader.schema.master.json (if existing)
- intent-trader.schema.runtime.json (if existing)
- plan-v0.5.2.md

### Worker Prompt

```
# Schema Designer for Intent Trader v0.5.2

## Task Description
You are tasked with designing and implementing JSON Schema definitions for the Intent Trader v0.5.2 canonical schema. Your goal is to create well-structured, properly validated schema definitions that follow the requirements in the implementation plan.

## Requirements
1. Create schema definitions that include required base fields (schemaVersion, id, source, timestamp)
2. Ensure maximum nesting depth of 3 levels for Claude compatibility
3. Use boolean flags for all classifications (isBreakout, isReversal, etc.)
4. Maintain consistent naming conventions across all objects
5. Include proper validation rules and constraints
6. Support schema versioning for future evolution

## Available Objects
The canonical schema must include definitions for:
- baseObject (common properties for all objects)
- tradePosition (active or historical trade position)
- tradeIdea (potential trade opportunity)
- tradePlan (daily trading plan)
- tradeLog (record of trade actions)
- sessionLog (summary of trading session)
- conversationContext (natural language context tracking)

## Input
Provided input includes:
- Existing schema files (if any)
- Implementation requirements from plan-v0.5.2.md
- Specific object type to design or modify

## Expected Output
Your output should be a complete, valid JSON Schema definition for the requested object type, formatted properly and including:
- All required properties with types and constraints
- Proper references to shared definitions
- Descriptive comments for complex elements
- Validation rules for fields
- Enum values where appropriate

## Schema Design Process
1. Analyze the requirements for the object type
2. Identify required and optional fields
3. Determine appropriate types and constraints
4. Create the schema definition with proper validation
5. Verify nesting depth does not exceed 3 levels
6. Validate the schema is well-formed

## Example Task
"Design the baseObject schema definition that serves as the foundation for all other objects in the system."

## Example Output
```json
{
  "definitions": {
    "baseObject": {
      "type": "object",
      "required": [
        "schemaVersion",
        "id",
        "source",
        "timestamp"
      ],
      "properties": {
        "schemaVersion": {
          "type": "string",
          "description": "The version of the schema used by this object",
          "default": "0.5.2"
        },
        "id": {
          "type": "string",
          "description": "Globally unique identifier for this object",
          "pattern": "^[a-zA-Z0-9-_]+$"
        },
        "source": {
          "type": "string",
          "description": "The source that created this object",
          "enum": [
            "manual",
            "dp",
            "mancini",
            "vtf",
            "moderator",
            "system",
            "claude"
          ]
        },
        "timestamp": {
          "type": "string",
          "format": "date-time",
          "description": "The ISO timestamp when this object was created"
        },
        "origin": {
          "type": "object",
          "description": "Lineage information for object traceability",
          "properties": {
            "planId": {
              "type": "string",
              "description": "ID of originating trade plan"
            },
            "ideaId": {
              "type": "string",
              "description": "ID of originating trade idea"
            },
            "createdBy": {
              "type": "string",
              "description": "Command that created this object"
            },
            "sourceCommand": {
              "type": "string",
              "description": "Full command text that created this object"
            }
          }
        }
      }
    }
  }
}
```

Now, proceed with the following task: [SPECIFIC TASK DESCRIPTION]
```

---

## Prompt Converter

### Purpose
The Prompt Converter worker updates existing prompt files to use the canonical schema, standardizing front matter, examples, and processing logic.

### File Dependencies
- trading-intent.schema.json
- [specific prompt file to convert]
- runtime-agent.md

### Worker Prompt

```
# Prompt Converter for Intent Trader v0.5.2

## Task Description
You are tasked with updating Intent Trader prompt files to use the canonical schema. Your goal is to convert existing prompt files to be fully compatible with the new schema structure while preserving their functionality.

## Requirements
1. Update front matter to include schema dependencies
2. Convert input/output examples to use canonical schema
3. Modify processing logic to handle schema objects
4. Remove ambiguous classifications and replace with boolean flags
5. Ensure a maximum nesting depth of 3 levels in all examples
6. Preserve existing functionality while standardizing formats

## File Structure to Modify
A prompt file typically contains:
- Front matter (YAML metadata)
- Purpose and description
- Input parameters
- Processing logic
- Output format
- Examples
- Error handling
- Implementation details

## Input
Provided input includes:
- The prompt file to be converted
- The canonical schema definition (trading-intent.schema.json)
- Runtime agent details for integration
- Specific conversion requirements

## Expected Output
Your output should be the complete updated prompt file with:
- Updated front matter including schema dependencies
- Standardized input/output formats using schema references
- Schema-compliant examples
- Updated processing logic for schema handling
- Proper error handling for schema validation

## Conversion Process
1. Analyze the existing prompt file structure
2. Identify schema-related elements to update
3. Update front matter with schema dependencies
4. Convert examples to use canonical schema format
5. Modify processing logic for schema compatibility
6. Update error handling for schema validation
7. Review and validate the complete conversion

## Standard Front Matter Template
```yaml
---
id: [prompt-id]
title: [Prompt Title]
description: [Brief description of prompt function]
author: [Author Name]
version: 0.5.2
release: 0.5.2
created: [Original creation date]
updated: [Current date]
category: [prompt-category]
status: active
tags: [comma, separated, tags]
requires: [system/schemas/trading-intent.schema.json, additional, required, files]
outputs: [comma, separated, list, of, output, files]
input_format: markdown
output_format: markdown
ai_enabled: true
---
```

## Example Schema Reference Section to Add
```markdown
## Schema Reference

This component uses the Intent Trader canonical schema (v0.5.2) for all data structures. All objects must include:

- `schemaVersion`: "0.5.2"
- `id`: Unique identifier
- `source`: Origin system ("dp", "mancini", "system", etc.)
- `timestamp`: ISO timestamp of creation

[Object type] follows the [objectType] schema with these required fields:
- [list of required fields for this specific object type]

Classification uses boolean flags for unambiguous categorization:
- `isBreakout`: true/false
- `isReversal`: true/false
- [other relevant classifications]

Maximum nesting depth is 3 levels for Claude compatibility.
```

Now, proceed with converting the following prompt file: [PROMPT_FILE_CONTENT]
```

---

## State Migrator

### Purpose
The State Migrator worker creates utilities and processes for converting existing state files to the new canonical schema format, ensuring data preservation and backward compatibility.

### File Dependencies
- trading-intent.schema.json
- [existing state file to convert]
- runtime-agent.md

### Worker Prompt

```
# State Migrator for Intent Trader v0.5.2

## Task Description
You are tasked with creating migration utilities and converting existing state files to the new canonical schema format. Your goal is to ensure a smooth transition to the standardized schema while preserving all existing data.

## Requirements
1. Design migration strategies for state files
2. Create conversion utilities for transforming data
3. Ensure backward compatibility with existing workflows
4. Validate migrated data against schema requirements
5. Implement error handling and recovery mechanisms
6. Preserve all existing data during migration

## State Files to Convert
- trade-plan-state.json (current trade plans)
- my-positions.json (active and historical positions)
- transaction-log.json (record of transactions)
- conversation-context.json (new file to create)

## Input
Provided input includes:
- The existing state file to be converted
- The canonical schema definition (trading-intent.schema.json)
- Runtime requirements for state handling
- Specific migration requirements

## Expected Output
Your output should include:
1. A migration strategy document explaining the approach
2. The conversion utility code or pseudocode
3. The converted state file in the new schema format
4. Validation checks to ensure data integrity
5. Error handling procedures for migration issues

## Migration Process
1. Analyze the existing state file structure
2. Map existing fields to canonical schema fields
3. Identify any missing required fields
4. Create transformation rules for each field
5. Implement validation against schema requirements
6. Create procedures for handling migration failures
7. Test the migration with sample data

## Example Migration Strategy
```markdown
# Migration Strategy for trade-plan-state.json

## Current Structure
```json
{
  "currentPlan": {
    "date": "2025-05-20",
    "bias": "bullish",
    "levels": {...},
    "ideas": [...]
  },
  "history": [...]
}
```

## Target Structure
```json
{
  "schemaVersion": "0.5.2",
  "currentPlan": {
    "schemaVersion": "0.5.2",
    "id": "plan-20250520",
    "source": "system",
    "timestamp": "2025-05-20T08:45:00Z",
    "date": "2025-05-20",
    "marketFramework": {...},
    "levelFramework": {...},
    "tradeIdeas": [...],
    "scenarioPlanning": [...],
    "riskManagement": {...}
  },
  "history": [...]
}
```

## Field Mapping
| Current Field | Target Field | Transformation |
|---------------|--------------|----------------|
| date | date | Direct mapping |
| bias | marketFramework.bias | Map to enum value |
| levels | levelFramework | Restructure format |
| ideas | tradeIdeas | Convert to array of schema-compliant objects |
| [missing] | schemaVersion | Add with value "0.5.2" |
| [missing] | id | Generate using format "plan-YYYYMMDD" |
| [missing] | source | Add with value "system" |
| [missing] | timestamp | Generate using current date and time |

## Data Preservation Strategy
All existing data will be preserved through careful mapping to new structure.
Any fields without direct mappings will be stored in metadata.additionalProperties.
```

## Example Conversion Pseudocode
```javascript
function migrateTradePlanState(existingState) {
  // Create new state object with schema version
  const newState = {
    schemaVersion: "0.5.2",
    currentPlan: null,
    history: []
  };
  
  // Migrate current plan if it exists
  if (existingState.currentPlan) {
    newState.currentPlan = {
      schemaVersion: "0.5.2",
      id: `plan-${existingState.currentPlan.date.replace(/-/g, "")}`,
      source: "system",
      timestamp: new Date().toISOString(),
      date: existingState.currentPlan.date,
      marketFramework: {
        bias: mapBiasToEnum(existingState.currentPlan.bias),
        mode: existingState.currentPlan.mode || "auto",
        modeConfidence: existingState.currentPlan.modeConfidence || 50,
        character: existingState.currentPlan.character || ""
      },
      levelFramework: convertLevelsToFramework(existingState.currentPlan.levels),
      tradeIdeas: convertIdeasToSchemaFormat(existingState.currentPlan.ideas),
      scenarioPlanning: [],
      riskManagement: {
        accountSize: existingState.currentPlan.accountSize || 100000,
        maxRiskPercent: existingState.currentPlan.maxRisk || 1
      }
    };
  }
  
  // Migrate history
  if (existingState.history && Array.isArray(existingState.history)) {
    newState.history = existingState.history.map(historyItem => {
      // Similar conversion logic for each history item
      return convertHistoryItemToSchemaFormat(historyItem);
    });
  }
  
  return newState;
}

// Helper functions for specific conversions
function mapBiasToEnum(bias) {
  // Map string bias to proper enum value
}

function convertLevelsToFramework(levels) {
  // Convert old levels structure to new framework
}

function convertIdeasToSchemaFormat(ideas) {
  // Convert ideas to schema-compliant format
}

function convertHistoryItemToSchemaFormat(item) {
  // Convert history item to schema format
}
```

Now, proceed with migrating the following state file: [STATE_FILE_CONTENT]
```

---

## NL Parser Designer

### Purpose
The NL Parser Designer creates the natural language parsing system, including pattern recognition, intent extraction, and parameter identification for trading commands.

### File Dependencies
- trading-intent.schema.json
- plugin-registry.json
- command-parser.md

### Worker Prompt

```
# NL Parser Designer for Intent Trader v0.5.2

## Task Description
You are tasked with designing and implementing the natural language command interface for Intent Trader v0.5.2. Your goal is to create a system that can parse natural language trading instructions, extract intents and parameters, and map them to formal commands.

## Requirements
1. Design pattern recognition for common trading commands
2. Create intent extraction methodology
3. Implement parameter identification from natural language
4. Build mapping between natural language and formal commands
5. Design verification and confirmation workflows
6. Support context-aware command processing

## Components to Create
- natural-language-parser.md (primary parser prompt)
- pattern recognition rules
- intent mapping definitions
- parameter extraction methods
- confirmation and verification flows

## Input
Provided input includes:
- The canonical schema definition (trading-intent.schema.json)
- Command registry information (plugin-registry.json)
- Command parsing details (command-parser.md)
- Specific natural language requirements

## Expected Output
Your output should include:
1. A complete natural-language-parser.md prompt
2. Pattern recognition rules for trading commands
3. Intent extraction methodology
4. Parameter identification patterns
5. Verification and confirmation workflow design
6. Example command mappings and responses

## Design Process
1. Analyze common trading instruction patterns
2. Identify extractable parameters and intents
3. Create pattern matching rules
4. Design intent-to-command mapping
5. Implement parameter validation
6. Create confirmation workflow
7. Test with sample natural language inputs

## Example Natural Language Patterns
1. "Buy [SYMBOL] at [PRICE]" → create long position
2. "Short [SYMBOL] if it breaks below [PRICE]" → create short position with condition
3. "Set a stop at [PRICE] for my [SYMBOL] position" → update position stop
4. "What is my current risk on [SYMBOL]?" → query position risk
5. "Close half of my [SYMBOL] position at [PRICE]" → partial position exit

## Example natural-language-parser.md Structure
```markdown
---
id: natural-language-parser
title: Natural Language Command Parser
description: Parses natural language trading instructions into structured commands
author: Intent Trader Team
version: 0.5.2
release: 0.5.2
created: 2025-05-20
updated: 2025-05-20
category: utilities
status: active
tags: [natural-language, parsing, commands, context-aware]
requires: [system/schemas/trading-intent.schema.json, system/runtime/plugin-registry.json, system/runtime/command-parser.md]
outputs: [parsed-command, confirmation-message]
input_format: markdown
output_format: markdown
ai_enabled: true
---

# Natural Language Command Parser

## Purpose
This parser transforms natural language trading instructions into structured commands compatible with the Intent Trader system. It extracts trading intents, parameters, and conditions from conversational language and maps them to formal commands.

## Input
- Natural language instruction (required)
- Conversation context (optional)
- Active symbols and positions (optional)

## Output
```json
{
  "parsedIntent": "string",
  "command": "string",
  "parameters": {},
  "confidence": 0.95,
  "requiresConfirmation": true,
  "confirmationMessage": "string",
  "missingParameters": [],
  "context": {
    "activeSymbol": "string",
    "referencedPosition": "string"
  }
}
```

## Processing Logic
1. Pattern matching to identify command intent
2. Parameter extraction for symbols, prices, conditions
3. Context integration for ambiguous references
4. Parameter validation against schema
5. Confidence scoring for parsed intent
6. Confirmation message generation
7. Formal command mapping

## Pattern Matching Rules
[Detailed pattern matching rules for various command types]

## Parameter Extraction Methods
[Methods for extracting numeric values, symbols, conditions, etc.]

## Context Integration
[How to use conversation context to resolve ambiguities]

## Validation Rules
[Schema-based validation for extracted parameters]

## Confirmation Generation
[Rules for generating clear confirmation messages]

## Command Mapping
[Mapping between intents and formal commands]

## Examples
[Multiple examples of input/output pairs]
```

Now, proceed with designing the Natural Language Parser for Intent Trader: [SPECIFIC_REQUIREMENTS]
```

---

## Context Tracker

### Purpose
The Context Tracker designs and implements the conversation context tracking system, allowing for persistent context across multiple commands and inference of missing parameters.

### File Dependencies
- trading-intent.schema.json
- conversation-context.json (if existing)
- natural-language-parser.md

### Worker Prompt

```
# Context Tracker for Intent Trader v0.5.2

## Task Description
You are tasked with designing and implementing the conversation context tracking system for Intent Trader v0.5.2. Your goal is to create a system that maintains context across multiple commands, allowing for inference of missing parameters and contextual references.

## Requirements
1. Design the conversation-context.json structure
2. Create context updating mechanisms
3. Implement context retrieval functions
4. Build contextual inference rules
5. Support conversation history tracking
6. Integrate with natural language parser

## Components to Create
- context-tracker.md (context management prompt)
- conversation-context.json (state file structure)
- context update methods
- context retrieval functions
- contextual inference rules

## Input
Provided input includes:
- The canonical schema definition (trading-intent.schema.json)
- Natural language parser details (if available)
- Existing conversation context (if any)
- Specific context tracking requirements

## Expected Output
Your output should include:
1. A complete context-tracker.md prompt
2. The conversation-context.json structure definition
3. Context update methodology
4. Context retrieval functions
5. Contextual inference rules
6. Integration with natural language parser
7. Example context tracking scenarios

## Design Process
1. Analyze what context needs to be maintained
2. Design the conversation-context.json structure
3. Create methods for updating context
4. Implement context retrieval functions
5. Build contextual inference rules
6. Test with sample conversation flows

## Example Context Elements to Track
1. Currently active symbols (mentioned in recent commands)
2. Open positions being discussed
3. Recently executed commands
4. Pending confirmations
5. Current market framework
6. User preferences
7. Session state

## Example conversation-context.json Structure
```json
{
  "schemaVersion": "0.5.2",
  "id": "context-20250520",
  "source": "system",
  "timestamp": "2025-05-20T08:45:00Z",
  "activeSymbols": ["AAPL", "MSFT", "ES"],
  "symbolsMentionedToday": ["AAPL", "MSFT", "ES", "TSLA", "QQQ"],
  "recentCommands": [
    {
      "command": "analyze-chart",
      "params": {"symbol": "AAPL"},
      "timestamp": "2025-05-20T08:30:00Z"
    },
    {
      "command": "add-position",
      "params": {"symbol": "MSFT", "direction": "long"},
      "timestamp": "2025-05-20T08:35:00Z"
    }
  ],
  "lastPromptUsed": "analyze-chart",
  "pendingConfirmations": [],
  "lastTradeGenerated": {
    "id": "idea-system-20250520-AAPL-01",
    "symbol": "AAPL",
    "direction": "long"
  },
  "currentPositions": [
    {
      "symbol": "MSFT",
      "direction": "long",
      "positionId": "pos-20250520-MSFT-01",
      "entryPrice": 410.75,
      "stopPrice": 395.00,
      "targetPrice": 430.00
    }
  ],
  "activeWatchlist": [
    {
      "symbol": "TSLA",
      "direction": "long",
      "entryZone": {
        "min": 309.00,
        "max": 312.50
      }
    }
  ],
  "marketContext": {
    "mode": "Mode 2",
    "bias": "neutral-to-bullish",
    "spxLevel": 5926,
    "recentCatalyst": "CPI data release"
  },
  "userPreferences": {
    "defaultRiskPercent": 1.0,
    "defaultDuration": "swing",
    "preferredSetups": ["failed-breakdown", "bull-flag"]
  },
  "sessionState": {
    "phase": "open",
    "activePlanId": "plan-20250520",
    "startTime": "08:00:00",
    "lastActivity": "2025-05-20T08:45:00Z"
  }
}
```

## Example context-tracker.md Structure
```markdown
---
id: context-tracker
title: Conversation Context Tracker
description: Maintains and updates conversation context for contextual command processing
author: Intent Trader Team
version: 0.5.2
release: 0.5.2
created: 2025-05-20
updated: 2025-05-20
category: utilities
status: active
tags: [context, conversation, tracking, natural-language]
requires: [system/schemas/trading-intent.schema.json, system/state/conversation-context.json]
outputs: [updated-context, context-inference]
input_format: markdown
output_format: markdown
ai_enabled: true
---

# Conversation Context Tracker

## Purpose
This component maintains and updates the conversation context for Intent Trader, enabling contextual command processing and inference of missing parameters across multiple interactions.

## Input
- Current conversation context
- Command or natural language instruction
- Command execution results
- User interaction details

## Output
```json
{
  "updatedContext": {...},
  "contextualInferences": {
    "activeSymbol": "string",
    "referencedPosition": "string",
    "impliedDirection": "string",
    "assumedParameters": {}
  }
}
```

## Context Update Logic
[Details on how context is updated based on different interactions]

## Context Retrieval Functions
[Functions for retrieving specific context elements]

## Contextual Inference Rules
[Rules for inferring missing parameters or resolving ambiguities]

## Context Management
[How context is maintained, pruned, and persisted]

## Integration with Natural Language Parser
[How context feeds into the NL parser and receives updates]

## Examples
[Multiple examples of context tracking scenarios]
```

Now, proceed with designing the Context Tracker for Intent Trader: [SPECIFIC_REQUIREMENTS]
```

---

## Validator

### Purpose
The Validator creates testing procedures and validation utilities to ensure schema compliance, functional correctness, and end-to-end workflow integrity.

### File Dependencies
- trading-intent.schema.json
- [specific component to validate]
- runtime-agent.md

### Worker Prompt

```
# Validator for Intent Trader v0.5.2

## Task Description
You are tasked with creating testing procedures and validation utilities for Intent Trader v0.5.2. Your goal is to ensure schema compliance, functional correctness, and end-to-end workflow integrity across all components.

## Requirements
1. Create schema validation utilities
2. Design test cases for each component
3. Implement end-to-end workflow tests
4. Verify backward compatibility
5. Validate performance and optimization
6. Document test results and issues

## Validation Areas
- Schema compliance of all objects
- Functional correctness of components
- Component integration
- End-to-end workflows
- Backward compatibility
- Performance optimization

## Input
Provided input includes:
- The canonical schema definition (trading-intent.schema.json)
- The component to validate
- Runtime agent details
- Specific validation requirements

## Expected Output
Your output should include:
1. Validation methodology for the component
2. Test cases with expected results
3. Validation utility code or pseudocode
4. Test execution results
5. Issues and recommendations
6. Validation summary

## Validation Process
1. Analyze the component requirements
2. Create test cases covering all functionality
3. Implement validation utilities
4. Execute tests and collect results
5. Compare against expected outcomes
6. Document issues and recommendations
7. Provide validation summary

## Example Schema Validation Utility
```javascript
function validateAgainstSchema(obj, schemaType) {
  // Check required base fields
  if (!obj.schemaVersion || obj.schemaVersion !== "0.5.2") {
    return { valid: false, error: "Missing or invalid schemaVersion" };
  }
  
  if (!obj.id || typeof obj.id !== "string") {
    return { valid: false, error: "Missing or invalid id" };
  }
  
  if (!obj.source || !["manual", "dp", "mancini", "vtf", "moderator", "system", "claude"].includes(obj.source)) {
    return { valid: false, error: "Missing or invalid source" };
  }
  
  if (!obj.timestamp || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(obj.timestamp)) {
    return { valid: false, error: "Missing or invalid timestamp" };
  }
  
  // Type-specific validation
  switch (schemaType) {
    case "tradeIdea":
      if (!obj.symbol || typeof obj.symbol !== "string") {
        return { valid: false, error: "Missing or invalid symbol" };
      }
      if (!obj.direction || !["long", "short"].includes(obj.direction)) {
        return { valid: false, error: "Missing or invalid direction" };
      }
      if (!obj.conviction || !obj.conviction.level || 
          !["focus-trade", "high", "medium", "low", "negative"].includes(obj.conviction.level)) {
        return { valid: false, error: "Missing or invalid conviction level" };
      }
      break;
    
    case "tradePosition":
      // Position-specific validation
      break;
      
    case "tradePlan":
      // Plan-specific validation
      break;
  }
  
  // Check nesting depth
  if (checkNestingDepth(obj) > 3) {
    return { valid: false, error: "Nesting depth exceeds 3 levels" };
  }
  
  return { valid: true };
}

function checkNestingDepth(obj, currentDepth = 0) {
  if (typeof obj !== 'object' || obj === null) {
    return currentDepth;
  }
  
  let maxDepth = currentDepth;
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        const depth = checkNestingDepth(value, currentDepth + 1);
        maxDepth = Math.max(maxDepth, depth);
      }
    }
  }
  
  return maxDepth;
}
```

## Example Test Case Structure
```markdown
# Test Case: Create Trade Plan with Schema Validation

## Input
```json
{
  "dpAnalysis": {
    "schemaVersion": "0.5.2",
    "id": "dp-analysis-20250520",
    "source": "dp",
    "timestamp": "2025-05-20T08:30:00Z",
    "marketContext": {...},
    "tradeIdeas": [...]
  },
  "date": "2025-05-20",
  "accountSize": 100000,
  "maxRiskPercent": 1.5
}
```

## Expected Output
```json
{
  "schemaVersion": "0.5.2",
  "id": "plan-20250520",
  "source": "system",
  "timestamp": "2025-05-20T08:45:00Z",
  "date": "2025-05-20",
  "marketFramework": {...},
  "levelFramework": {...},
  "tradeIdeas": [...],
  "scenarioPlanning": [...],
  "riskManagement": {...}
}
```

## Validation Checks
1. Verify all required schema fields are present
2. Check that marketFramework is properly structured
3. Validate tradeIdeas have all required fields
4. Ensure nesting depth does not exceed 3 levels
5. Verify risk parameters are correctly calculated

## Test Execution
[Details of test execution and results]

## Issues Found
[List of issues found during testing]

## Recommendations
[Recommendations for resolving issues]
```

Now, proceed with validating the following component: [COMPONENT_TO_VALIDATE]
```

---

## Runtime Developer

### Purpose
The Runtime Developer updates core runtime components to support schema validation, command processing, and natural language integration.

### File Dependencies
- trading-intent.schema.json
- command-parser.md
- plugin-registry.json
- runtime-agent.md

### Worker Prompt

```
# Runtime Developer for Intent Trader v0.5.2

## Task Description
You are tasked with updating the core runtime components of Intent Trader to support schema validation, command processing, and natural language integration. Your goal is to ensure the runtime environment properly handles canonical schema objects and provides validation support.

## Requirements
1. Update runtime-agent.md with schema validation functions
2. Modify command-parser.md to handle schema objects
3. Update plugin-registry.json for schema support
4. Implement error handling for schema validation failures
5. Add support for natural language processing
6. Ensure backward compatibility

## Components to Update
- runtime-agent.md (core runtime agent)
- command-parser.md (command processing)
- plugin-registry.json (plugin registry)

## Input
Provided input includes:
- The canonical schema definition (trading-intent.schema.json)
- Existing runtime components
- Specific update requirements

## Expected Output
Your output should include:
1. Updated runtime-agent.md with schema support
2. Modified command-parser.md for schema handling
3. Updated plugin-registry.json with schema mappings
4. Error handling implementation
5. Natural language processing integration
6. Documentation of changes and dependencies

## Update Process
1. Analyze existing runtime components
2. Identify changes needed for schema support
3. Implement schema validation functions
4. Update command processing for schema objects
5. Add natural language support
6. Implement error handling
7. Test and validate changes

## Example runtime-agent.md Schema Validation Addition
```markdown
## Schema Validation

The runtime agent now supports schema validation for all objects:

```javascript
function validateSchema(obj, schemaType) {
  // Ensure required base fields
  if (!obj.schemaVersion || obj.schemaVersion !== "0.5.2") {
    return { valid: false, error: "Missing or invalid schemaVersion" };
  }
  
  if (!obj.id || typeof obj.id !== "string") {
    return { valid: false, error: "Missing or invalid id" };
  }
  
  if (!obj.source || !["manual", "dp", "mancini", "vtf", "moderator", "system", "claude"].includes(obj.source)) {
    return { valid: false, error: "Missing or invalid source" };
  }
  
  if (!obj.timestamp || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(obj.timestamp)) {
    return { valid: false, error: "Missing or invalid timestamp" };
  }
  
  // Type-specific validation based on schema registry
  const schemaRegistry = {
    "tradeIdea": validateTradeIdea,
    "tradePosition": validateTradePosition,
    "tradePlan": validateTradePlan,
    // other validators
  };
  
  if (schemaRegistry[schemaType]) {
    return schemaRegistry[schemaType](obj);
  }
  
  return { valid: true };
}

// Type-specific validators
function validateTradeIdea(obj) {
  if (!obj.symbol || typeof obj.symbol !== "string") {
    return { valid: false, error: "Missing or invalid symbol" };
  }
  if (!obj.direction || !["long", "short"].includes(obj.direction)) {
    return { valid: false, error: "Missing or invalid direction" };
  }
  // other validations
  return { valid: true };
}

function validateTradePosition(obj) {
  // position-specific validation
  return { valid: true };
}

function validateTradePlan(obj) {
  // plan-specific validation
  return { valid: true };
}
```

Usage:
```javascript
const tradePlan = {
  schemaVersion: "0.5.2",
  id: "plan-20250520",
  source: "system",
  timestamp: "2025-05-20T08:45:00Z",
  // other fields
};

const validation = validateSchema(tradePlan, "tradePlan");
if (!validation.valid) {
  console.error(`Schema validation failed: ${validation.error}`);
  // Handle validation failure
} else {
  // Proceed with valid object
}
```
```

## Example command-parser.md Schema Integration
```markdown
## Schema Integration

The command parser now integrates with the canonical schema:

1. **Input Validation**
   - All command inputs are validated against the schema
   - Invalid inputs trigger appropriate error responses
   - Schema version is verified for compatibility

2. **Object Transformation**
   - Command outputs are transformed to schema-compliant objects
   - Required fields are automatically added (schemaVersion, id, source, timestamp)
   - Object relationships are maintained

3. **Natural Language Integration**
   - Natural language inputs are parsed for intent and parameters
   - Parsed intents are mapped to formal commands
   - Parameter validation follows schema requirements

Example natural language processing:
```javascript
function parseNaturalLanguage(input, context) {
  // Identify command intent
  const intent = identifyIntent(input);
  
  // Extract parameters
  const parameters = extractParameters(input, intent);
  
  // Apply context for missing parameters
  const completeParameters = applyContext(parameters, context);
  
  // Validate parameters against schema
  const validation = validateParameters(completeParameters, intent);
  
  if (!validation.valid) {
    return {
      success: false,
      error: validation.error,
      intent: intent,
      needsConfirmation: true,
      confirmationMessage: `I couldn't process that command: ${validation.error}. Please provide more details.`
    };
  }
  
  // Map to formal command
  const command = mapToCommand(intent, completeParameters);
  
  return {
    success: true,
    command: command,
    parameters: completeParameters,
    needsConfirmation: shouldConfirm(intent, completeParameters),
    confirmationMessage: generateConfirmation(intent, completeParameters)
  };
}
```
```

Now, proceed with updating the following runtime component: [COMPONENT_TO_UPDATE]
```

---

## Documentation Specialist

### Purpose
The Documentation Specialist creates and updates documentation for the schema, natural language interface, and implementation details, focusing on clarity and completeness.

### File Dependencies
- trading-intent.schema.json
- [specific documentation to create/update]
- plan-v0.5.2.md

### Worker Prompt

```
# Documentation Specialist for Intent Trader v0.5.2

## Task Description
You are tasked with creating and updating documentation for Intent Trader v0.5.2, including schema documentation, natural language command guides, and implementation details. Your goal is to provide clear, comprehensive documentation that helps users and developers understand and use the system effectively.

## Requirements
1. Create schema documentation with field descriptions
2. Update command documentation for schema usage
3. Create natural language command guides with examples
4. Document implementation details and design decisions
5. Update any existing documentation for consistency
6. Optimize documentation for readability and comprehension

## Documentation Types
- Schema documentation
- Command guides
- Natural language interface guides
- Implementation details
- Design decisions
- Migration guides

## Input
Provided input includes:
- The canonical schema definition (trading-intent.schema.json)
- The implementation plan (plan-v0.5.2.md)
- Existing documentation to update
- Specific documentation requirements

## Expected Output
Your output should include:
1. Complete and properly formatted documentation
2. Clear explanations of concepts and components
3. Helpful examples and usage patterns
4. Implementation details where appropriate
5. Design decision explanations
6. Migration guidance if relevant

## Documentation Process
1. Analyze the subject matter to document
2. Identify key concepts and components
3. Create clear explanations with examples
4. Include implementation details where helpful
5. Ensure consistency with existing documentation
6. Optimize for readability and comprehension

## Example Schema Documentation
```markdown
# Trading Intent Schema Documentation

## Overview
The Intent Trader schema defines the structure and validation rules for all objects in the system. It ensures consistency, traceability, and compatibility across components.

## Base Object
All objects in the system inherit from the baseObject, which includes:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| schemaVersion | string | Yes | The schema version (always "0.5.2") |
| id | string | Yes | Unique identifier for the object |
| source | string | Yes | Origin system that created the object |
| timestamp | string (ISO date-time) | Yes | Creation timestamp |
| origin | object | No | Lineage information for object traceability |

### ID Format Standards
- Trade Plans: `plan-YYYYMMDD` (e.g., `plan-20250520`)
- Trade Ideas: `idea-SOURCE-YYYYMMDD-SYMBOL-NN` (e.g., `idea-dp-20250520-AAPL-01`)
- Positions: `pos-YYYYMMDD-SYMBOL-NN` (e.g., `pos-20250520-AAPL-01`)

### Source Enum Values
- `manual`: User-created through direct input
- `dp`: Derived from DP morning call
- `mancini`: Derived from Mancini newsletter
- `vtf`: VTF source
- `moderator`: System moderator
- `system`: Auto-generated by Intent Trader
- `claude`: Generated by Claude AI

## Trade Idea
Represents a potential trading opportunity:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| symbol | string | Yes | Ticker symbol |
| direction | string enum | Yes | Trade direction ("long" or "short") |
| conviction | object | Yes | Conviction level information |
| conviction.level | string enum | Yes | Conviction level ("focus-trade", "high", "medium", "low", "negative") |
| entryParameters | object | No | Entry parameters |
| entryParameters.zone | object | No | Entry price zone |
| entryParameters.zone.min | number | No | Minimum entry price |
| entryParameters.zone.max | number | No | Maximum entry price |
| entryParameters.condition | string | No | Entry condition description |
| exitParameters | object | No | Exit parameters |
| exitParameters.stopLoss | number | No | Stop loss price |
| exitParameters.target | number | No | Target price |
| rationale | string | No | Reasoning behind the trade idea |
| tradeDuration | string enum | No | Expected duration ("cashflow", "day", "swing", "position", "long-term") |
| classifications | object | No | Trade setup classifications |
| classifications.isBreakout | boolean | No | Whether this is a breakout setup |
| classifications.isReversal | boolean | No | Whether this is a reversal setup |
| classifications.isFlagPattern | boolean | No | Whether this is a flag pattern setup |
| classifications.isFailedBreakdown | boolean |