---
title: Intent Trader Refactor Execution Guide
description: Comprehensive protocol for implementing the Enhanced Intent Trader Framework through a structured ChatGPT workflow
author: Claude 3.7 Sonnet
version: 2.1
last_updated: 2025-05-13
category: systemops
status: ready_for_implementation
cognitive_load: MEDIUM
---

# ✅ Let's Do This — Enhanced Intent Trader Implementation Protocol

This execution protocol provides a structured, validation-oriented approach to implement the complete Enhanced Intent Trader Framework using ChatGPT. Each phase includes clear success criteria, validation checkpoints, and cognitive management guidelines.

---

## 🔍 PRE-EXECUTION: Context Validation

### 📋 Master Upload Checklist
```
upload-checklist.md
```

Before beginning any phase, upload this checklist and run the validation prompt:

```plaintext
Please confirm that all required files for Intent Trader refactoring have been loaded into context. 

List all visible filenames and their types, flagging any missing critical files from this list:
- intent-trader.zip (repository)
- final-implementation-plan.md (master plan)
- wip-consolidation-plan.md (original plan)
- gan-qa-review.md (enhancement feedback)
- schemas.zip (if available)

Also validate that this is a fresh conversation without previous context contamination.

✅ Expected Output: Complete file inventory with validation status
```

### 📊 Refactor Status Tracking
Create and maintain a `refactor-progress.md` file:

```
refactor-progress.md
```

Update at the end of each phase with:

```plaintext
Please update the refactor status report with the completion of Phase [X]:

phase: [phase number]
completed_components:
  - [component 1]
  - [component 2]
status: [complete|partial|blocked]
blockers: [any issues encountered]
next_steps: [immediate next actions]
cognitive_notes: [any observations about workflow or complexity]

✅ Expected Output: Updated refactor-progress.md with completion status
```

---

## 🧭 PHASE 0: Session Preparation and Foundation

### 🧼 New Chat Preparation
- ✅ Upload `intent-trader.zip` (latest build with current structure)
- ✅ Upload `final-implementation-plan.md` (our synthesized plan)
- ✅ Upload `wip-consolidation-plan.md` (original plan)
- ✅ Upload `gan-qa-review.md` (feedback on enhancements)
- ✅ Upload `upload-checklist.md` (validation checklist)
- ✅ Upload `schemas.zip` (sample schemas if available)

### 🏗️ Initial Structure Setup Prompt
```plaintext
Today's goal: Establish core directory structure and schema foundation for Intent Trader refactoring.

Please validate all uploaded files are in context, then create the following directory structure and initialization files:

1. Directory structure:
```
mkdir -p system/{schemas,templates,registry,blueprints,cognitive,protocols,status-tracking,workflows,moderator-signals,technical-framework,execution,learning,tests}
mkdir -p prompts/{premarket,intraday,postmarket}
```

2. Create a prompt-manifest.yaml with the following structure:
```yaml
version: 1.0
last_updated: "2025-05-13"
prompt_categories:
  - premarket
  - intraday
  - postmarket
  - system
schema_types:
  - metadata
  - blueprint
  - status
  - cognitive
  - moderator_signal
```

3. Initialize README.md files in each directory with purpose statements.

Include metadata in each file with:
- title: [directory purpose]
- cognitive_load: LOW|MEDIUM|HIGH
- requires_confirmation: true|false
- created: 2025-05-13

✅ Expected Output: Complete directory structure creation commands, prompt-manifest.yaml content, and README template
```

---

## 🧩 PHASE 1: Schema Foundation & Registry System

### 📂 Files to Prepare
- Create empty `/system/schemas/` directory
- Create empty `/system/templates/` directory
- Create empty `/system/registry/` directory

### 🔄 Core Schema Implementation Prompt
```plaintext
Today's goal: Implement the core schemas for Intent Trader system.

Please create complete, implementation-ready versions of these schema files:

1. system/schemas/metadata.schema.json - The unified metadata schema
2. system/schemas/blueprint.schema.json - Schema for blueprint structure
3. system/schemas/status.schema.json - Schema for status updates
4. system/schemas/cognitive-load.schema.json - Schema for cognitive tracking

Each schema should include:
- Complete JSON Schema structure with validation constraints
- Comments explaining key fields and relationships
- Example values where helpful
- $schema reference to http://json-schema.org/draft-07/schema#

Reference specific sections from final-implementation-plan.md for structural guidance.

Here is an example structure to follow for the metadata schema:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Intent Trader Metadata Schema",
  "description": "Unified metadata schema for all Intent Trader system documents",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "Unique identifier for the document"
    },
    // additional properties
  },
  "required": ["id", "version", "type"]
}
```

test_case:
  input: Create metadata.schema.json
  expected_output: Complete JSON schema file with all required properties
  validation_criteria: Must include id, version, type, market, cognitive_load fields

✅ Expected Output: Four complete, valid JSON schema files ready for implementation
```

### 🧪 Registry Script Implementation Prompt
```plaintext
Today's goal: Create the registry discovery system for Intent Trader.

Please create a complete implementation-ready version of:
system/registry/registry.js

This script should:
- Scan directories for markdown files with front matter
- Extract metadata from front matter using gray-matter
- Build a structured registry of all system components
- Write the registry to system/registry/prompt-registry.json
- Include helper functions for prompt lookups by type, market mode, etc.

Include robust error handling, file path validation, and logging.

Here's a starting structure:
```javascript
const fs = require('fs');
const path = require('path');
const globby = require('globby');
const matter = require('gray-matter');

async function buildPromptRegistry() {
  // Implementation
}

// Helper functions
function findPromptsByType(type) {
  // Implementation
}

// Main execution
buildPromptRegistry()
  .then(...)
  .catch(...);
```

test_case:
  input: Create registry.js
  expected_output: Complete Node.js script with all required functionality
  validation_criteria: Must handle errors, include helper functions, and produce valid JSON

✅ Expected Output: Complete, runnable registry.js script with test instructions
```

### ✅ Schema Validation Checkpoint
```plaintext
Please validate all schemas created in this phase:

1. Verify each schema against JSON Schema specification
2. Confirm all required fields are present
3. Test with sample data for each schema
4. Verify registry.js scan functionality with test input

Generate a validation report showing:
- Schema validation status
- Test case results
- Any issues or warnings identified
- Recommendations for improvements

✅ Expected Output: Complete validation report for all Phase 1 components
```

---

## 📝 PHASE 2: Blueprint System Implementation

### 📂 Files to Prepare
- Create empty `/system/blueprints/` directory
- Create empty `/prompts/premarket/` directory
- Create empty `/prompts/intraday/` directory

### 🔄 Blueprint Framework Prompt
```plaintext
Today's goal: Implement the blueprint system for Intent Trader.

Please create implementation-ready versions of:

1. system/blueprints/structure.md - Blueprint component definition
2. system/blueprints/generation.md - Blueprint generation process
3. system/blueprints/adaptation.md - Blueprint adaptation framework
4. system/blueprints/extraction-source-map.json - Source mapping for extraction

Each markdown document should include:
```yaml
---
title: [Document Title]
description: [Purpose description]
version: 1.0.0
created: 2025-05-13
updated: 2025-05-13
type: documentation
cognitive_load: MEDIUM
requires_confirmation: false
related_schemas:
  - blueprint.schema.json
---
```

The extraction-source-map.json should define mappings between source documents and blueprint sections like:
```json
{
  "sections": {
    "multi_day_trend": {
      "source_files": ["newsletter-current.md"],
      "extraction_method": "paragraph_extraction",
      "parameters": {
        "paragraphs": [1, 2, 3]
      }
    },
    // additional mappings
  }
}
```

Reference the final-implementation-plan.md section on the Blueprint System.

test_case:
  input: Create the blueprint structure documentation
  expected_output: Complete markdown file with front matter and content
  validation_criteria: Must include section definitions, examples, and schema references

✅ Expected Output: Four complete blueprint system components ready for implementation
```

### 🔄 Blueprint Prompt Implementation
```plaintext
Today's goal: Create the blueprint generation prompts for Intent Trader.

Please create implementation-ready versions of:

1. prompts/premarket/morning-blueprint.md - Daily blueprint generation prompt
2. prompts/intraday/blueprint-update.md - Blueprint update prompt

Each prompt should include:
```yaml
---
title: [Prompt Title]
description: [Purpose description]
version: 1.0.0
created: 2025-05-13
updated: 2025-05-13
type: prompt
phase: [premarket|intraday]
cognitive_load: MEDIUM
requires_confirmation: true
input_schemas:
  - [relevant schema]
output_schemas:
  - blueprint.schema.json
test_cases:
  - input: [sample input]
    expected_output: [expected structure]
    validation_criteria: [success criteria]
---
```

The prompt content should include:
1. Clear purpose statement
2. System context (what the assistant knows)
3. Input format expectations
4. Output format requirements
5. Examples of good outputs
6. Step-by-step processing instructions
7. Validation criteria

Reference the final-implementation-plan.md section on Blueprint Implementation.

✅ Expected Output: Two complete prompt files with full front matter, content and test cases
```

### 🧪 Blueprint Component Testing
```plaintext
Please create a test vector file for validating the blueprint system:
system/tests/blueprint-validation.md

This file should include:
1. Test inputs for both morning-blueprint.md and blueprint-update.md
2. Expected outputs for each test
3. Validation criteria for successful implementation
4. Error cases to test resilience
5. Integration test scenarios

Each test vector should be structured as:
```yaml
test_id: [unique identifier]
prompt: [target prompt]
input: |
  [multi-line input]
expected_output: |
  [multi-line expected output]
validation_criteria:
  - [criterion 1]
  - [criterion 2]
cognitive_load: [LOW|MEDIUM|HIGH]
```

✅ Expected Output: Complete test vector file for blueprint system validation
```

---

## 🧠 PHASE 3: Cognitive Framework Implementation

### 📂 Files to Prepare
- Create empty `/system/cognitive/` directory
- Create empty `/system/protocols/` directory

### 🔄 Cognitive System Prompt
```plaintext
Today's goal: Implement the cognitive tracking system for Intent Trader.

Please create implementation-ready versions of:

1. system/cognitive/state-tracking.md - Cognitive state tracking methodology
2. system/cognitive/load-calculation.md - Cognitive load calculation algorithm
3. system/cognitive/adaptation-matrix.md - Adaptation decision matrix
4. system/protocols/cognitive-reset.md - Cognitive reset protocol

Each markdown document should include standard front matter following the metadata schema.

The cognitive state tracking should explicitly define:
- Quantifiable metrics for cognitive state
- Measurement methodology
- Threshold definitions
- State transition triggers
- Integration with blueprint system

The adaptation matrix should define a clear decision matrix:
```
| Cognitive Load | Market Volatility | Action                         |
|----------------|-------------------|--------------------------------|
| HIGH           | HIGH              | Simplify blueprint to core only |
| HIGH           | LOW               | Focus on execution quality     |
| LOW            | HIGH              | Increase monitoring frequency  |
| LOW            | LOW               | Standard blueprint operation   |
```

Include calibration procedures for personalizing thresholds.

test_case:
  input: Create cognitive load calculation methodology
  expected_output: Complete methodology with formulas and thresholds
  validation_criteria: Must include quantifiable metrics and adjustment procedures

✅ Expected Output: Four complete cognitive framework components ready for implementation
```

### 🔄 Cognitive Prompts Implementation
```plaintext
Today's goal: Create the cognitive management prompts for Intent Trader.

Please create implementation-ready versions of:

1. prompts/intraday/status-update.md - Status with cognitive state tracking
2. prompts/intraday/cognitive-reset.md - Cognitive reset prompt
3. prompts/intraday/midday-reset.md - Midday plan reset prompt

Each prompt should include standard front matter with test cases.

The cognitive reset prompt should specifically:
- Detect cognitive overload indicators
- Implement a step-by-step reset procedure
- Focus attention on highest priority items
- Clear mental workspace of noise
- Restore strategic perspective
- Include verification of reset effectiveness

The status update prompt should include a cognitive state assessment section:
```
## Cognitive State Assessment
- Current cognitive load: [1-10]
- Attention allocation: [distribution percentages]
- Decision quality: [OPTIMAL|DEGRADED|COMPROMISED]
- Focus areas: [list]
- Distractions: [list]
```

test_case:
  input: Trader reporting high stress, missed signals, time compression
  expected_output: Complete cognitive reset procedure with verification
  validation_criteria: Must include progressive steps, breathing technique, attention refocusing

✅ Expected Output: Three complete cognitive management prompts ready for implementation
```

### 🔄 Cognitive Fallback Implementation
```plaintext
Today's goal: Create cognitive resilience layers for Intent Trader.

Please create implementation-ready versions of:

1. system/protocols/cognitive-fallback.md - Fallback protocol for high stress
2. system/cognitive/safe-mode.md - Reduced functionality mode for challenging conditions

These components should activate automatically when cognitive load exceeds thresholds, providing:
- Simplified decision frameworks
- Clearer action steps
- Reduced information density
- Focus on risk management
- Explicit confidence assessments
- Override recommendations

Include explicit triggers and exit criteria for each mode.

✅ Expected Output: Two complete resilience components with triggers and exit criteria
```

---

## 📊 PHASE 4: Status Tracking Framework

### 📂 Files to Prepare
- Create empty `/system/status-tracking/` directory
- Create empty `/system/workflows/` directory

### 🔄 Status Framework Prompt
```plaintext
Today's goal: Implement the status tracking framework for Intent Trader.

Please create implementation-ready versions of:

1. system/status-tracking/framework.md - Status categories and methodology
2. system/status-tracking/transitions.md - State transition rules
3. system/status-tracking/visualization.md - Status visualization guidelines
4. system/workflows/status-update-cycle.md - Update frequency and triggers

The status framework should define clear categories:
- WATCHING (setup identification)
- PENDING (waiting for entry conditions)
- ACTIVE (position taken)
- COMPLETED (position exited)
- INVALIDATED (setup failed)

Each state should have:
- Entry criteria
- Exit criteria
- Required attributes
- Available actions
- Cognitive implications

The state transition diagram should show all valid transitions with conditions.

test_case:
  input: Create status transition rules
  expected_output: Complete transition matrix with conditions
  validation_criteria: Must include all states and valid transitions with trigger conditions

✅ Expected Output: Four complete status tracking components ready for implementation
```

### 🔄 Status Integration Prompt
```plaintext
Today's goal: Integrate status tracking with blueprints and cognitive frameworks.

Please create implementation-ready versions of:

1. system/workflows/blueprint-status-link.md - Blueprint/status integration
2. system/workflows/cognitive-status-link.md - Cognitive/status integration

The blueprint-status link should define:
- How blueprint sections update based on status changes
- How status tracking reflects blueprint adaptation
- Bidirectional information flow
- Synchronization mechanisms
- Conflict resolution

The cognitive-status link should define:
- How cognitive state affects status priorities
- How status changes impact cognitive load
- Warning signs in status patterns that indicate cognitive issues
- Adaptation of status display based on cognitive state

Include workflow diagrams showing information flow between systems.

✅ Expected Output: Two complete integration components with diagrams and examples
```

---

## 🔁 REMAINING PHASES (5-9)

Continue implementing each phase following the same pattern:

1. Prepare required directories
2. Create framework components with front matter and test cases
3. Implement prompts with structured format and validation
4. Create integration components with clear interaction models
5. Validate with specific test cases

For each phase, use the structured prompt template:

```plaintext
Today's goal: Implement [component] for Intent Trader.

Please create implementation-ready versions of:

1. [file path] - [component description]
2. [file path] - [component description]
...

Each [component type] should include:
- [requirement 1]
- [requirement 2]
...

Include [specific content requirements].

test_case:
  input: [test input]
  expected_output: [expected output]
  validation_criteria: [validation criteria]

✅ Expected Output: [expected deliverables]
```

---

## 🧠 Cognitive Load Management During Implementation

Each phase of this refactoring has been assigned a cognitive load rating:

- **Phase 1-2**: MEDIUM (Schema & Blueprint) - Most complex foundational structure
- **Phase 3**: HIGH (Cognitive Framework) - Requires meta-cognitive awareness
- **Phase 4**: MEDIUM (Status Tracking) - Complex state transitions
- **Phase 5-6**: MEDIUM (Moderator & Technical) - Integration complexity
- **Phase 7-8**: LOW (Execution & Learning) - Builds on established components
- **Phase 9**: HIGH (Integration) - System-wide orchestration

Consider scheduling implementation sessions based on cognitive capacity:
- Start with LOW cognitive load phases when mental energy is limited
- Schedule HIGH cognitive load phases during peak mental performance times
- Take breaks between phases to prevent implementation fatigue
- Use the cognitive reset protocol if experiencing decision fatigue

---

## 📋 Implementation Checklist Summary

```
[ ] PRE-EXECUTION: Context validation
[ ] PHASE 0: Session preparation and foundation
[ ] PHASE 1: Schema foundation & registry system
[ ] PHASE 2: Blueprint system implementation
[ ] PHASE 3: Cognitive framework implementation
[ ] PHASE 4: Status tracking framework
[ ] PHASE 5: Moderator signal framework
[ ] PHASE 6: Technical framework integration
[ ] PHASE 7: Execution framework
[ ] PHASE 8: Learning framework
[ ] PHASE 9: System integration
[ ] FINAL VALIDATION: Complete system testing
```

---

## 🚀 Quick Reference Guide

### File Structure Quick Creation
```bash
mkdir -p system/{schemas,templates,registry,blueprints,cognitive,protocols,status-tracking,workflows,moderator-signals,technical-framework,execution,learning,tests}
mkdir -p prompts/{premarket,intraday,postmarket}
touch system/prompt-manifest.yaml
touch logs/refactor-progress.md
```

### Key Implementation Sequence
1. **Core Schemas** → **Registry** → **Templates**
2. **Blueprint System** → **Cognitive Framework** → **Status Framework**
3. **Moderator Signals** → **Technical Framework** → **Execution Framework**
4. **Learning Framework** → **System Integration** → **Testing**

### Session Management Quick Tips
1. Start a new session for each phase
2. Run context validation at the start of each session
3. Update refactor-progress.md at the end of each session
4. Download completed components using /zip at phase completion
5. Break implementation into manageable chunks (3-5 files maximum per prompt)
6. Monitor your own cognitive load during implementation

---

By following this execution protocol, you can methodically implement the complete Enhanced Intent Trader Framework in a series of focused ChatGPT sessions, with proper validation, testing, and cognitive management throughout the process.
