# IT-implementation-protocol.md

---
title: Intent Trader Implementation Protocol
version: 1.1.0
created: 2025-05-13
last_updated: 2025-05-13
author: Claude & Simon
status: active
priority: high
---

# Intent Trader Implementation Protocol

## 1. Implementation Overview

This protocol provides a structured, validated approach to implement the Intent Trader system using ChatGPT as the primary development tool. The implementation follows a phase-based approach, focusing first on the foundation and core components needed for premarket and intraday trading functionality.

**Tools Required:**
- GitHub repository (`/simonplant/intent-trader/`)
- Visual Studio Code
- ChatGPT or Claude for implementation
- Terminal for directory creation and file operations

**Expected Timeline:**
- Foundation Layer (Phase 1): 4-6 hours
- Blueprint System (Phase 2): 6-8 hours
- Status Tracking (Phase 3): 4-6 hours
- Cognitive Framework (Phase 4): 6-8 hours
- Technical Framework (Phase 5): 4-6 hours
- Total Implementation: ~24-34 hours (3-4 days of focused work)

## 2. Pre-Implementation Setup

### Step 2.1: Create Project Directory Structure

Execute the following commands in your terminal to create the base directory structure:

```bash
# Create main system directories
mkdir -p intent-trader/system/{schemas,templates,registry,blueprints,cognitive,protocols,status-tracking,workflows,moderator-signals,technical-framework,execution,learning,tests}

# Create prompt directories
mkdir -p intent-trader/prompts/{premarket,intraday,postmarket}

# Create knowledge directories
mkdir -p intent-trader/knowledge/cognitive-tools/
mkdir -p intent-trader/knowledge/strategic-playbooks/

# Create documentation directories
mkdir -p intent-trader/docs/system-docs/

# Create log directories
mkdir -p intent-trader/logs/

# Create initialization files
touch intent-trader/system/prompt-manifest.yaml
touch intent-trader/logs/refactor-progress.md
```

### Step 2.2: Prepare GitHub Repository

1. Initialize Git repository (if not already done):
```bash
cd intent-trader
git init
```

2. Create .gitignore file:
```bash
echo "node_modules/" > .gitignore
echo "*.log" >> .gitignore
```

3. Create initial README.md:
```bash
echo "# Intent Trader System" > README.md
echo "Cognitive-enhanced trading system" >> README.md
```

4. Create initial commit:
```bash
git add .
git commit -m "Initial directory structure"
```

### Step 2.3: State Persistence Strategy

To ensure system state is preserved between sessions:

1. Create state directory:
```bash
mkdir -p intent-trader/state
```

2. Create state persistence files:
```bash
# Create state schema
touch intent-trader/system/schemas/state.schema.json

# Create state files
touch intent-trader/state/blueprint-state.json
touch intent-trader/state/cognitive-state.json
touch intent-trader/state/status-state.json
```

3. State persistence approach:
- Each major component serializes its state to JSON
- States are saved at strategic points (end of session, after major updates)
- States are loaded at system initialization
- Timestamps ensure state freshness

## 3. Implementation Phases

### Phase 1: Foundation Layer

**Estimated Time: 4-6 hours**

#### Step 1.1: Create Core Schemas

**Preparation:**
- Start a new ChatGPT session
- Upload IT-architecture-plan.md

**Prompt:**
```
Today's goal: Create the core schema files for Intent Trader system.

Please create complete implementation-ready versions of these schema files:

1. system/schemas/metadata.schema.json - Unified metadata schema
2. system/schemas/blueprint.schema.json - Blueprint structure schema
3. system/schemas/status.schema.json - Status update schema
4. system/schemas/cognitive-load.schema.json - Cognitive tracking schema

Each schema should include:
- Complete JSON Schema structure with validation constraints
- Comments explaining key fields and relationships
- Example values where helpful
- $schema reference to http://json-schema.org/draft-07/schema#

Reference the IT-architecture-plan.md document for structural guidance, especially Component 1.0 specifications.

✅ Expected Output: Four complete, valid JSON schema files ready for implementation
```

**Expected Output:**
- Four complete JSON schema files
- Each schema should validate against JSON Schema Draft-07
- All required fields defined in architecture plan should be present

**Ready Criteria:**
- ✓ All schema files created and in correct locations
- ✓ Schemas validate against JSON Schema specification
- ✓ All required fields and types match architecture plan
- ✓ Version information included in all schemas

**Validation:**
After receiving the files:
1. Save each schema to the appropriate location in your repo
2. Validate the schemas using a JSON Schema validator:
```bash
# Using npm's ajv-cli for validation (install first if needed)
npm install -g ajv-cli
ajv validate -s system/schemas/metadata.schema.json -d test/sample-metadata.json
```

**Error Handling:**
- If schema validation fails, check for syntax errors in the JSON
- Ensure all required fields are included
- Verify proper types are assigned to each field

#### Step 1.2: Create Registry System

**Estimated Time: 2-3 hours**

**Prompt:**
```
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

Reference the IT-architecture-plan.md document for requirements.

✅ Expected Output: Complete, runnable registry.js script with test instructions
```

**Expected Output:**
- Complete Node.js script for registry generation
- Helper functions for component lookup
- Error handling for missing or malformed files

**Ready Criteria:**
- ✓ Registry script successfully scans directories
- ✓ Front matter correctly extracted from markdown files
- ✓ Registry JSON file created with proper structure
- ✓ Helper functions correctly lookup components by criteria
- ✓ Error handling covers file system and parsing errors

**Validation:**
```bash
# Install required dependencies
npm init -y
npm install gray-matter globby

# Test the registry script
node system/registry/registry.js
```

**Success Metrics:**
- Registry successfully indexes 100% of test files
- Lookup functions return correct results for test queries
- Error handling properly manages all test error cases
- Registry performance remains under 1 second for typical repository size

### Phase 2: Blueprint System Implementation

**Estimated Time: 6-8 hours**

#### Step 2.1: Create Blueprint Framework Components

**Preparation:**
- Start a new ChatGPT session
- Upload IT-architecture-plan.md
- Upload previously created schemas

**Prompt:**
```
Today's goal: Implement the blueprint system for Intent Trader.

Please create implementation-ready versions of:

1. system/blueprints/structure.md - Blueprint component definition
2. system/blueprints/generation.md - Blueprint generation process
3. system/blueprints/adaptation.md - Blueprint adaptation framework
4. system/blueprints/extraction-source-map.json - Source mapping for extraction

Each markdown document should include proper front matter following our metadata schema.

The extraction-source-map.json should define mappings between source documents and blueprint sections.

Reference the IT-architecture-plan.md section on Component 2.0: Blueprint System.

✅ Expected Output: Four complete blueprint system components ready for implementation
```

**Expected Output:**
- Three markdown files with proper front matter
- One JSON mapping file
- Clear documentation of blueprint structure and processes

**Ready Criteria:**
- ✓ All files include proper front matter conforming to metadata schema
- ✓ Blueprint structure clearly defines all required sections
- ✓ Generation process includes step-by-step instructions
- ✓ Adaptation framework defines triggers and procedures
- ✓ Extraction map correctly identifies source documents and sections

**Validation:**
```bash
# Validate front matter using registry script
node system/registry/registry.js

# Validate JSON structure
ajv validate -s system/schemas/source-map.schema.json -d system/blueprints/extraction-source-map.json
```

**Success Metrics:**
- Front matter validation passes for all files
- Registry correctly indexes all blueprint components
- Source mapping correctly identifies all required extraction targets
- Blueprint structure covers all required trading plan elements

#### Step 2.2: Create Blueprint Generation Prompt

**Estimated Time: 3-4 hours**

**Prompt:**
```
Today's goal: Create the morning blueprint generation prompt for Intent Trader.

Please create an implementation-ready version of:
prompts/premarket/morning-blueprint.md

This prompt should:
1. Include proper front matter following our metadata schema
2. Implement a structured prompt for generating daily trading blueprints
3. Include sections for market context, level analysis, setup identification
4. Reference relevant schemas (blueprint.schema.json)
5. Include test vectors for validation

Reference the IT-architecture-plan.md section on Component 2.0: Blueprint System.

✅ Expected Output: Complete prompt file with full front matter, content and test cases
```

**Expected Output:**
- Complete morning-blueprint.md prompt with front matter
- Structured sections for blueprint generation
- Test vectors for validation

**Ready Criteria:**
- ✓ Front matter includes all required metadata fields
- ✓ Prompt structure follows blueprint system specifications
- ✓ All required blueprint sections are addressed
- ✓ Test vectors include input and expected output
- ✓ Instructions are clear and implementation-ready

**Validation:**
- Verify front matter matches metadata schema
- Confirm reference to correct schemas
- Check for expected sections as defined in blueprint structure
- Test with sample input to verify output structure

**Success Metrics:**
- Blueprint prompt successfully generates complete trading plan
- Output conforms to blueprint.schema.json
- Test vectors pass validation
- Registry correctly indexes the prompt

### Phase 3: Status Tracking Implementation

**Estimated Time: 4-6 hours**

#### Step 3.1: Create Status Framework Components

**Preparation:**
- Start a new ChatGPT session
- Upload IT-architecture-plan.md
- Upload previously created schemas

**Prompt:**
```
Today's goal: Implement the status tracking framework for Intent Trader.

Please create implementation-ready versions of:

1. system/status-tracking/framework.md - Status categories and methodology
2. system/status-tracking/transitions.md - State transition rules
3. system/status-tracking/visualization.md - Status visualization guidelines
4. system/workflows/status-update-cycle.md - Update frequency and triggers

Reference the IT-architecture-plan.md section on Component 4.0: Status Tracking Framework.

✅ Expected Output: Four complete status tracking components ready for implementation
```

**Expected Output:**
- Four markdown files with proper front matter
- Clear documentation of status categories and transitions
- Guidelines for visualization and update frequency

**Ready Criteria:**
- ✓ All files include proper front matter conforming to metadata schema
- ✓ Status categories are clearly defined with criteria
- ✓ Transition rules specify valid state changes with triggers
- ✓ Visualization guidelines include clear representation examples
- ✓ Update cycle defines timing and trigger events

**Validation:**
- Verify front matter matches metadata schema
- Check for all required status categories
- Confirm complete transition rules between states
- Validate visualization guidelines against implementation requirements

**Success Metrics:**
- Status framework covers all trading lifecycle states
- Transition rules address 100% of possible state changes
- Update cycle is appropriately timed for market conditions
- Visualization guidelines are clear and implementable

#### Step 3.2: Create Status Update Prompt

**Estimated Time: 2-3 hours**

**Prompt:**
```
Today's goal: Create the status update prompt for Intent Trader.

Please create an implementation-ready version of:
prompts/intraday/status-update.md

This prompt should:
1. Include proper front matter following our metadata schema
2. Implement a structured format for updating trade status
3. Include sections for position details, technical context, and cognitive state
4. Reference relevant schemas (status.schema.json)
5. Include test vectors for validation

Reference the IT-architecture-plan.md section on Component 4.0: Status Tracking Framework.

✅ Expected Output: Complete status update prompt with front matter, content and test cases
```

**Expected Output:**
- Complete status-update.md prompt with front matter
- Structured sections for status updates
- Test vectors for validation

**Ready Criteria:**
- ✓ Front matter includes all required metadata fields
- ✓ Prompt structure follows status framework specifications
- ✓ All required status update sections are addressed
- ✓ Test vectors include input and expected output
- ✓ Instructions are clear and implementation-ready

**Validation:**
- Verify front matter matches metadata schema
- Confirm reference to correct schemas
- Check for all required status categories
- Test with sample input to verify output structure

**Success Metrics:**
- Status update prompt successfully processes trade status changes
- Output conforms to status.schema.json
- Test vectors pass validation
- Registry correctly indexes the prompt

### Phase 4: Cognitive Framework Implementation

**Estimated Time: 6-8 hours**

#### Step 4.1: Create Cognitive Tracking Components

**Preparation:**
- Start a new ChatGPT session
- Upload IT-architecture-plan.md
- Upload previously created schemas

**Prompt:**
```
Today's goal: Implement the cognitive tracking system for Intent Trader.

Please create implementation-ready versions of:

1. system/cognitive/state-tracking.md - Cognitive state tracking methodology
2. system/cognitive/load-calculation.md - Cognitive load calculation algorithm
3. system/cognitive/adaptation-matrix.md - Adaptation decision matrix
4. system/protocols/cognitive-reset.md - Cognitive reset protocol

Each document should include standard front matter following the metadata schema.

Reference the IT-architecture-plan.md section on Component 3.0: Cognitive Framework.

✅ Expected Output: Four complete cognitive framework components ready for implementation
```

**Expected Output:**
- Four markdown files with proper front matter
- Clear documentation of cognitive tracking methodology
- Specific metrics and calculation methods
- Adaptation decision matrix with scenarios

**Ready Criteria:**
- ✓ All files include proper front matter conforming to metadata schema
- ✓ Cognitive metrics are clearly defined and quantifiable
- ✓ Load calculation includes specific algorithms and thresholds
- ✓ Adaptation matrix covers all key cognitive-market scenarios
- ✓ Reset protocol includes clear step-by-step procedures

**Validation:**
- Verify front matter matches metadata schema
- Check for quantifiable metrics in state tracking
- Ensure adaptation matrix covers required scenarios
- Validate reset protocol against cognitive research best practices

**Success Metrics:**
- Cognitive metrics capture key aspects of trader mental state
- Load calculation accurately reflects trading cognitive demands
- Adaptation matrix provides clear guidance for all scenarios
- Reset protocol effectively restores optimal cognitive state

#### Step 4.2: Create Cognitive Management Prompts

**Estimated Time: 3-4 hours**

**Prompt:**
```
Today's goal: Create the cognitive management prompts for Intent Trader.

Please create implementation-ready versions of:

1. prompts/intraday/cognitive-reset.md - Cognitive reset prompt
2. prompts/intraday/midday-reset.md - Midday plan reset prompt

Each prompt should include standard front matter with test cases.

Reference the IT-architecture-plan.md section on Component 3.0: Cognitive Framework.

✅ Expected Output: Two complete cognitive management prompts ready for implementation
```

**Expected Output:**
- Two prompt files with proper front matter
- Structured cognitive reset procedures
- Test cases for validation

**Ready Criteria:**
- ✓ Front matter includes all required metadata fields
- ✓ Prompts structure follows cognitive framework specifications
- ✓ Reset procedures are clear and implementable
- ✓ Test vectors include input and expected output
- ✓ Instructions account for varying cognitive states

**Validation:**
- Verify front matter matches metadata schema
- Check for step-by-step reset procedures
- Confirm the prompts address cognitive overload scenarios
- Test with sample cognitive states to verify appropriate responses

**Success Metrics:**
- Cognitive reset prompt effectively guides mental reorientation
- Midday reset prompt successfully adapts plan to current conditions
- Test vectors pass validation
- Prompts integrate with status and blueprint components

## 4. Testing & Validation

### System Validation Approach

For a single AI-enabled developer, a pragmatic testing approach consists of:

1. **Schema Validation**:
   - Use JSON Schema validators to verify schema compliance
   - Create sample documents to test against schemas

2. **Component Integration Testing**:
   - Test interdependent components together (e.g., blueprint + status)
   - Verify proper data flow between components

3. **Simulated Trading Day**:
   - Run through complete workflow from premarket to intraday
   - Generate blueprint, create status updates, trigger cognitive reset
   - Capture issues and refine components

### Component Ready Criteria

A component is considered "ready" when it meets these criteria:

1. **Documentation Complete**:
   - All required sections are present
   - Front matter is complete and valid
   - Examples are provided where appropriate

2. **Schema Compliance**:
   - Component validates against relevant schemas
   - JSON structures are well-formed
   - Required fields are present and correctly typed

3. **Integration Ready**:
   - References to other components are correct
   - APIs match interface contracts
   - Dependencies are clearly stated

4. **Functionally Complete**:
   - Component performs its intended function
   - Edge cases are handled
   - Error conditions are managed

5. **Test Vectors Pass**:
   - Test inputs produce expected outputs
   - Validation criteria are met
   - Performance meets expectations

### Validation Script

Create a simple validation script to check system integrity:

```javascript
// system/tests/validate-system.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const Ajv = require('ajv');

// Load schemas
const metadataSchema = require('../schemas/metadata.schema.json');
const blueprintSchema = require('../schemas/blueprint.schema.json');
const statusSchema = require('../schemas/status.schema.json');

const ajv = new Ajv();

// Validate front matter against schema
function validateFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);
  const validate = ajv.compile(metadataSchema);
  const valid = validate(data);
  
  return {
    valid,
    errors: validate.errors,
    data
  };
}

// Validate directory structure
function validateDirectoryStructure() {
  const requiredDirs = [
    'system/schemas',
    'system/blueprints',
    'system/cognitive',
    'prompts/premarket',
    'prompts/intraday'
  ];
  
  const missingDirs = requiredDirs.filter(dir => !fs.existsSync(dir));
  
  return {
    valid: missingDirs.length === 0,
    missingDirs
  };
}

// Run the validation
function runValidation() {
  // Check directory structure
  const dirCheck = validateDirectoryStructure();
  if (!dirCheck.valid) {
    console.error('Missing directories:', dirCheck.missingDirs);
  }
  
  // Validate prompt front matter
  const promptFiles = [
    'prompts/premarket/morning-blueprint.md',
    'prompts/intraday/status-update.md',
    'prompts/intraday/cognitive-reset.md'
  ];
  
  promptFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const result = validateFrontMatter(file);
      console.log(`${file}: ${result.valid ? 'VALID' : 'INVALID'}`);
      if (!result.valid) {
        console.error(result.errors);
      }
    } else {
      console.warn(`File not found: ${file}`);
    }
  });
}

runValidation();
```

## 5. Practical Implementation Workflow

### Single Developer Workflow

For optimal implementation as a single developer working with AI assistants:

1. **Session-Based Implementation**:
   - Work on one phase at a time in a single ChatGPT session
   - Download complete files at the end of each session
   - Commit changes to GitHub between sessions

2. **Progressive Building**:
   - Start with schemas and foundation
   - Build blueprint system next (premarket focus)
   - Add intraday components (status tracking, cognitive)
   - Finally add technical framework

3. **Validation Cadence**:
   - Validate schema compliance after creating each component
   - Test integrations between linked components
   - Run simulated workflow tests after completing each phase

### Implementation Metrics

Track these metrics during implementation:

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Component Completion Rate | 4-5 components/day | Count completed components |
| Schema Validation Success | 100% | Validate all components against schemas |
| Integration Success | >95% | Test component interactions |
| Test Vector Pass Rate | 100% | Run test vectors for each component |
| Time per Component | <90 minutes | Track implementation time |

### Phase Completion Checklist

After completing each phase:

1. Validate all created files against schemas
2. Ensure proper front matter in all markdown files
3. Check for integration points with other components
4. Commit changes to GitHub with descriptive message
5. Update refactor-progress.md with completed items

### Post-Implementation Testing

After completing the full implementation:

1. Run a complete simulated trading day:
   - Generate morning blueprint
   - Create status updates
   - Trigger cognitive reset
   - Adapt blueprint based on market changes

2. Document any issues or refinements needed
3. Create GitHub issues for future enhancements

## 6. Common Errors & Troubleshooting

| Error | Description | Resolution |
|-------|-------------|------------|
| Schema validation failure | Invalid JSON schema or document | Check schema syntax and field types |
| Missing front matter | Required metadata missing | Add front matter with required fields |
| Component integration error | Components not properly connected | Check interface definitions and data flow |
| ChatGPT context limit | Too many files or too much content | Split implementation into smaller chunks |
| Incomplete implementation | Missing critical components | Follow phase checklist to ensure completeness |
| State persistence failure | Unable to save/load system state | Verify JSON serialization and file permissions |
| Dependency cycle | Circular dependencies between components | Refactor component relationships to eliminate cycles |

## 7. Quick Reference

### File Structure Creation
```bash
mkdir -p system/{schemas,blueprints,cognitive,protocols,status-tracking,workflows,technical-framework}
mkdir -p prompts/{premarket,intraday,postmarket}
```

### Phase Implementation Order
1. **Foundation**: Schemas + Registry (4-6 hours)
2. **Blueprint System**: Structure + Generation (6-8 hours)
3. **Status Tracking**: Framework + Updates (4-6 hours)
4. **Cognitive Framework**: Tracking + Reset (6-8 hours)
5. **Technical Framework**: Patterns + Analysis (4-6 hours)

### Critical Files Checklist
- [ ] system/schemas/metadata.schema.json
- [ ] system/schemas/blueprint.schema.json
- [ ] system/schemas/status.schema.json
- [ ] system/blueprints/structure.md
- [ ] prompts/premarket/morning-blueprint.md
- [ ] prompts/intraday/status-update.md
- [ ] system/cognitive/state-tracking.md
- [ ] prompts/intraday/cognitive-reset.md

### Validation Command
```bash
node system/tests/validate-system.js
```
