# implementation-chatgpt-guide.md

---
title: Intent Trader ChatGPT Implementation Guide
version: 1.1.0
created: 2025-05-13
last_updated: 2025-05-13
author: Claude & Simon
status: active
priority: high
---

# Intent Trader ChatGPT Implementation Guide

This guide provides specific instructions for using ChatGPT effectively during the Intent Trader implementation process, with tips for managing context, optimizing prompts, and handling file generation.

## 1. ChatGPT Session Management

### Best Practices for New Sessions

1. **Start Fresh for Each Phase**
   - Begin a new chat for each implementation phase
   - Never attempt to implement multiple phases in one session
   - Clear conversation history if switching topics mid-session

2. **Context Loading Order**
   - Upload architecture plan first
   - Upload implementation protocol second
   - Upload dependency map third
   - Upload any existing components needed for reference last

3. **Context Verification**
   - Always verify ChatGPT has properly loaded all files
   - Use the validation prompt to confirm required context
   - If any files are missing from context, re-upload immediately

### Session Planning Guide

| Phase | Required Context | Session Focus | Expected Files |
|-------|-----------------|---------------|----------------|
| Foundation | Architecture plan | Core schemas, registry | 4-5 schema files, registry script |
| Blueprint | Architecture plan, schemas | Blueprint structure | 3-4 markdown files, JSON map |
| Status | Architecture plan, schemas, blueprint | Status framework | 4-5 markdown files |
| Cognitive | Architecture plan, schemas, status | Cognitive framework | 4-5 markdown files |
| Technical | Architecture plan, schemas, blueprint | Technical analysis | 4-5 markdown files |

## 2. Effective Prompt Engineering

### Prompt Template

```
Today's goal: [ONE SENTENCE CLEAR GOAL]

Please create implementation-ready versions of:

1. [file_path] - [component_description]
2. [file_path] - [component_description]
[...]

Each file should include:
- [requirement_1]
- [requirement_2]
[...]

Reference the IT-architecture-plan.md section on [Component X.Y].

✅ Expected Output: [SPECIFIC DELIVERABLE DESCRIPTION]
```

### Enhancement Techniques

1. **Improve Output Quality**
   - Add "implementation-ready" to signal complete files
   - Specify exact file paths to ensure correct structure
   - Include detailed requirements for each file

2. **Ensure Consistency**
   - Reference specific sections of architecture plan
   - Mention related schemas and dependencies
   - Specify expected interfaces with other components

3. **Handle Complex Components**
   - Break down complex components into smaller chunks
   - Request one complex file at a time if needed
   - Provide example structures for guidance

### Common Pitfalls to Avoid

1. **Overloading Context**
   - Don't request more than 4-5 files in one prompt
   - Don't upload more than 5-6 reference files
   - Don't include full schemas in prompts (reference instead)

2. **Vague Instructions**
   - Avoid general requests like "implement the cognitive framework"
   - Avoid omitting file paths or specific requirements
   - Avoid skipping front matter specifications

3. **Ignoring Dependencies**
   - Don't implement components out of order
   - Don't skip validation between dependent components
   - Don't forget to reference required schemas

## 3. File Management Strategies

### Complete File Generation

Always request **complete files** rather than fragments:

✅ **GOOD**: "Create the complete system/cognitive/state-tracking.md file with front matter and all sections."

❌ **BAD**: "Create the cognitive state tracking logic."

### ZIP File Management

For efficient file handling with ChatGPT:

1. **Download Complete Phases**
   - Use ChatGPT's `/zip` command to download all files at once
   - Example: `/zip foundation-schemas` after completing schemas

2. **Organize Downloaded Content**
   - Extract ZIP contents to appropriate locations in repo
   - Validate extracted files before committing
   - Update refactor-progress.md after each successful integration

3. **Upload Reference ZIPs**
   - Create focused ZIPs of completed phases for reference
   - Keep ZIPs under 5MB for reliable uploading
   - Include only necessary files in reference ZIPs

### File Optimization for ChatGPT

1. **Front Matter Standardization**
   - Use consistent front matter in all markdown files
   - Include all required metadata fields
   - Use YAML format for front matter

2. **Markdown Structure**
   - Use headings (# and ##) for main sections
   - Use lists for sequential instructions or requirements
   - Include code blocks with appropriate syntax highlighting

3. **JSON Formatting**
   - Format JSON with proper indentation
   - Include comments (// style) for clarity
   - Use consistent naming conventions

## 4. Handling AI Hallucinations and Verification

### Detecting Potential Hallucinations

Watch for these warning signs:
- Inconsistent terminology compared to previous files
- References to components or functions not defined in the system
- Overly generic implementations lacking specific details
- Contradictions with established architecture decisions
- Mentions of features not specified in the architecture plan

### Verification Process

For each AI-generated component:
1. **Schema Compliance**: Validate against relevant schema
2. **Terminology Check**: Verify consistent use of system terminology
3. **Interface Verification**: Confirm inputs/outputs match API contracts
4. **Cross-Reference**: Verify references to other components exist
5. **Completeness Check**: Ensure all required sections are present

### Hallucination Recovery Process

If hallucination detected:
1. Identify the specific problematic sections
2. Clearly explain what is incorrect and why
3. Provide explicit correction with references to authoritative sources:
   ```
   This section references a "predictionEngine" component that doesn't exist in our architecture.
   The correct component is "adaptationMatrix" as defined in cognitive/adaptation-matrix.md.
   ```
4. Request regeneration of only the affected sections
5. Verify corrections before accepting

### Iterative Refinement Strategy

For complex components:
1. Generate a basic version first
2. Review for hallucinations and inconsistencies
3. Provide specific feedback for improvement
4. Request targeted refinements rather than complete regeneration
5. Repeat until component meets quality standards

### Session Recovery

If a ChatGPT session becomes corrupted or loses context:

1. **Graceful Termination**:
   - Save any useful output from the current session
   - Document the point of failure for future reference

2. **Clean Restart**:
   - Begin a new session with fresh context
   - Upload the most critical reference files
   - Use a prompt that clearly states where you left off:
   ```
   We were implementing the cognitive framework and had completed
   state-tracking.md and load-calculation.md. Now we need to continue
   with adaptation-matrix.md from the point where we defined the
   basic matrix structure.
   ```

## 5. Implementation Sequence Quick Reference

### Foundation Phase (Phase 1)

**Session 1: Schema Implementation**
```
Today's goal: Create the core schema files for Intent Trader system.

Please create complete implementation-ready versions of:
1. system/schemas/metadata.schema.json
2. system/schemas/blueprint.schema.json
3. system/schemas/status.schema.json
4. system/schemas/cognitive-load.schema.json

Each schema should include:
- Complete JSON Schema structure with validation constraints
- Comments explaining key fields and relationships
- Example values where helpful
- $schema reference to http://json-schema.org/draft-07/schema#

Reference the IT-architecture-plan.md section on Component 1.0: Schema Foundation.

✅ Expected Output: Four complete, valid JSON schema files ready for implementation
```

**Verification Steps**:
1. Check that each schema follows JSON Schema specification
2. Verify all required fields are present as specified in the architecture plan
3. Ensure schemas include proper comments and examples
4. Validate schemas with sample data if possible

**Session 2: Registry Implementation**
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

Reference the IT-architecture-plan.md section on Component 1.0.

✅ Expected Output: Complete, runnable registry.js script with test instructions
```

**Verification Steps**:
1. Review script for proper error handling
2. Check that helper functions match required functionality
3. Verify directory scanning logic works as expected
4. Test with sample files if possible

### Blueprint Phase (Phase 2)

**Session 1: Blueprint Framework**
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

**Verification Steps**:
1. Verify front matter matches metadata schema
2. Check that blueprint structure includes all required sections
3. Ensure extraction map correctly identifies source documents
4. Validate adaptation framework against cognitive requirements

**Session 2: Blueprint Prompts**
```
Today's goal: Create the blueprint generation prompts for Intent Trader.

Please create implementation-ready versions of:
1. prompts/premarket/morning-blueprint.md - Daily blueprint generation prompt
2. prompts/intraday/blueprint-update.md - Blueprint update prompt

Each prompt should include:
- Proper front matter following our metadata schema
- Structured format for generating/updating blueprints
- Clear sections for inputs, processing, and outputs
- Reference to relevant schemas and components
- Test vectors for validation

Reference the IT-architecture-plan.md section on Component 2.0: Blueprint System and the blueprint framework components.

✅ Expected Output: Two complete prompt files with full front matter, content and test cases
```

**Verification Steps**:
1. Check that front matter is complete and valid
2. Verify all required sections are present
3. Ensure test vectors are realistic and useful
4. Validate references to other components

## 6. AI Output Verification Framework

For each component type, use these specific verification checklists:

### Schema Verification

- [ ] Valid JSON Schema syntax
- [ ] All required fields are present
- [ ] Field types match architecture specifications
- [ ] Required versus optional fields correctly marked
- [ ] Examples included for complex fields
- [ ] Comments explain purpose of each field
- [ ] No references to non-existent components
- [ ] Consistent naming convention used throughout

### Markdown Document Verification

- [ ] Front matter includes all required fields
- [ ] Version number matches expected version
- [ ] All required sections are present
- [ ] Section content matches architecture specifications
- [ ] References to other components are correct
- [ ] No mentions of non-existent components
- [ ] Examples provided where appropriate
- [ ] Formatting consistent with guidelines

### Prompt Verification

- [ ] Front matter is complete and valid
- [ ] Prompt structure follows system standards
- [ ] Instructions are clear and unambiguous
- [ ] All required input parameters are specified
- [ ] Expected output format is clearly defined
- [ ] Test vectors include comprehensive cases
- [ ] Error handling instructions are included
- [ ] References to schemas and components are correct

### JavaScript Code Verification

- [ ] Code follows best practices
- [ ] Error handling is comprehensive
- [ ] File paths and imports are correct
- [ ] Comments explain complex logic
- [ ] Function signatures match API contracts
- [ ] No references to non-existent components
- [ ] Performance considerations addressed
- [ ] Edge cases handled appropriately

## 7. Troubleshooting Common Issues

### Context Limitations

**Problem**: ChatGPT loses track of file content or forgets previous context.

**Solution**:
1. Use smaller, more focused prompts
2. Split implementation into logical chunks
3. Upload only the most relevant reference files
4. Summarize previous context when switching topics

### File Size Limitations

**Problem**: ChatGPT truncates large file outputs.

**Solution**:
1. Split large files into smaller logical components
2. Request one file at a time for complex components
3. Use the `/zip` command to download complete sets
4. Specify maximum file sizes in your prompts

### Inconsistent Terminology

**Problem**: ChatGPT uses inconsistent terminology across components.

**Solution**:
1. Create a terminology reference file
2. Include key terms in your prompt
3. Explicitly correct inconsistencies when detected
4. Reference authoritative components for terminology

### Incomplete Implementations

**Problem**: ChatGPT generates partial implementations missing key sections.

**Solution**:
1. Explicitly list all required sections in your prompt
2. Provide a clear structure or template
3. Use verification checklists before accepting output
4. Request specific missing sections rather than regenerating entirely

## 8. Final Implementation Checklist

Before considering implementation complete, verify:

1. **Schema Validation**:
   - [ ] All schemas syntactically valid
   - [ ] All required fields present
   - [ ] All examples valid against schemas

2. **Component Integration**:
   - [ ] All component references correct
   - [ ] API contracts consistent
   - [ ] Data transformations properly defined
   - [ ] No circular dependencies

3. **Documentation Quality**:
   - [ ] All front matter complete
   - [ ] All sections properly documented
   - [ ] Examples included for complex concepts
   - [ ] Consistent terminology throughout

4. **Functional Completeness**:
   - [ ] All required components implemented
   - [ ] All critical paths functional
   - [ ] Error handling comprehensive
   - [ ] Performance considerations addressed

5. **User Experience**:
   - [ ] Prompts clear and unambiguous
   - [ ] Output formats consistent
   - [ ] Cognitive considerations addressed
   - [ ] Workflow integrations smooth

By following this guide, you'll maximize the effectiveness of ChatGPT for implementing the Intent Trader system while minimizing hallucinations, inconsistencies, and integration issues.
