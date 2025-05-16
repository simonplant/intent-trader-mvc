---
id: command-routes-update-sop
title: Commands & Routes System Maintenance SOP
description: Standard operating procedure for updating the command system in Intent Trader
author: Intent Trader Team
version: 0.1.0
release: 0.5.1
created: 2025-05-16
updated: 2025-05-16
category: system
status: stable
tags: [sop, commands, maintenance, updates, system]
requires: []
outputs: []
input_format: none
output_format: markdown
ai_enabled: false
---

# Intent Trader Commands & Routes System: Maintenance SOP

## Quick Reference: Files In-Scope

When updating the command system, these are the key files that must be kept in sync:

1. **Documentation Files**:
   - `docs/command-reference.md` - Complete command reference
   - `system/commands.md` - Canonical command list reference

2. **Routing Files**:
   - `system/runtime/command-map.md` - Command routing table
   - `system/runtime/plugin-registry.json` - Plugin metadata registry
   - `system/runtime/runtime-agent.md` - Main routing orchestrator
   - `system/runtime/validator.md` - Parameter validation rules
   - `system/runtime/entrypoint.md` - System initialization

3. **Implementation Files**:
   - Command prompts in phase folders:
     - `prompts/plan/[command-name].md`
     - `prompts/focus/[command-name].md`
     - `prompts/execute/[command-name].md`
     - `prompts/manage/[command-name].md`
     - `prompts/review/[command-name].md`
     - `prompts/utilities/[command-name].md`

4. **State Files** (as needed):
   - `state/my-positions.json`
   - `state/moderator-positions.json`
   - `state/session-manifest.json`
   - `state/trade-plan-state.json`

Always update ALL these files when adding, modifying, or removing commands to maintain system integrity.

---

This Standard Operating Procedure (SOP) outlines the process for maintaining, updating, and extending the Intent Trader command system. It ensures that all changes to commands maintain system integrity while preserving the product vision.

## Overview

The Intent Trader command system consists of several interconnected components that must remain synchronized:

1. **Documentation**:
   - `docs/command-reference.md` - Complete command reference
   - `system/commands.md` - Canonical command list reference

2. **Routing System**:
   - `system/runtime/command-map.md` - Command routing table
   - `system/runtime/plugin-registry.json` - Plugin metadata
   - `system/runtime/runtime-agent.md` - Command handling logic

3. **Implementation**:
   - Command prompt files (e.g., `prompts/plan/analyze-dp.md`)
   - State files (e.g., `state/my-positions.json`)

This SOP covers procedures for adding, modifying, and removing commands while maintaining consistency across all components.

## 1. Command Addition Procedure

When adding a new command to Intent Trader, follow these steps in order:

### 1.1 Documentation Update

1. **Update Command Reference**:
   - Add the new command to `docs/command-reference.md`
   - Include full details: purpose, parameters, outputs, examples
   - Mark with appropriate status (CORE)
   - Specify planned release version

2. **Update Canonical Reference**:
   - Add to `system/commands.md` with complete details
   - Ensure proper phase categorization (PFEMRC)
   - Include all parameters, outputs, and examples

### 1.2 Implementation Creation

1. **Create Command Prompt**:
   - Create file in appropriate cognitive phase folder (`prompts/[phase]/[command-name].md`)
   - Include standardized front matter with consistent metadata
   - Implement command logic and parameter handling

2. **Create/Update State Files**:
   - Identify required state files
   - Create or modify state schema as needed
   - Ensure backward compatibility with existing state

### 1.3 Routing System Integration

1. **Update Command Map**:
   - Add entry to `system/runtime/command-map.md`
   - Include phase, description, required parameters, file path

2. **Update Plugin Registry**:
   - Add entry to `system/runtime/plugin-registry.json`
   - Include id, type, version, entryPoint, phase, dependencies

3. **Update Runtime Agent**:
   - Modify `system/runtime/runtime-agent.md` to include the new command
   - Update validation rules in `system/runtime/validator.md`
   - Update `system/runtime/entrypoint.md` if needed

### 1.4 Testing

1. **Validate Command Routes**:
   - Test command recognition
   - Verify parameter handling
   - Confirm proper file loading

2. **Functional Testing**:
   - Test with valid parameters
   - Test with invalid parameters
   - Test with edge cases

3. **Integration Testing**:
   - Test interactions with other commands
   - Verify state updates
   - Test within normal workflow sequences

### 1.5 Documentation Finalization

1. **Update Release Notes**:
   - Document the new command in appropriate release notes
   - Include example usage and benefits

2. **Update Usage Flows**:
   - Add command to relevant workflow examples
   - Update phase-based command groupings

## 2. Command Modification Procedure

When modifying an existing command, follow these steps:

### 2.1 Impact Assessment

1. **Identify Dependencies**:
   - List all commands that depend on this command
   - Identify state files affected
   - Check for workflow dependencies

2. **Backward Compatibility Analysis**:
   - Determine if changes break existing usage
   - Plan for backward compatibility if needed
   - Document migration path if breaking

### 2.2 Documentation Update

1. **Update Command Reference**:
   - Modify command details in `docs/command-reference.md`
   - Update parameters, outputs, examples as needed
   - Mark with "UPDATED" tag and new version

2. **Update Canonical Reference**:
   - Update `system/commands.md` with changes
   - Highlight significant changes for users

### 2.3 Implementation Modification

1. **Update Command Prompt**:
   - Modify command file with new logic
   - Update front matter with new version and update date
   - Add changelog comment at top of implementation

2. **Update State Handling**:
   - Modify state interactions as needed
   - Ensure compatibility with existing state

### 2.4 Routing Update

1. **Update Command Map**:
   - Modify entry in `system/runtime/command-map.md`
   - Update parameter descriptions if changed

2. **Update Plugin Registry**:
   - Update version in `system/runtime/plugin-registry.json`
   - Modify dependencies if changed

### 2.5 Testing

1. **Regression Testing**:
   - Test all previous functionality
   - Verify backward compatibility
   - Test dependent commands

2. **New Feature Testing**:
   - Test new or modified functionality
   - Verify parameter handling
   - Test edge cases

3. **Documentation Verification**:
   - Ensure documentation matches implementation
   - Check examples for accuracy

## 3. Command Deprecation/Removal Procedure

When removing or deprecating a command, follow these steps:

### 3.1 Impact Assessment

1. **Usage Analysis**:
   - Determine if command is actively used
   - Identify dependent commands
   - Plan migration path for users

2. **Replacement Planning**:
   - Identify replacement functionality if applicable
   - Document migration steps for users
   - Create transition plan

### 3.2 Deprecation Phase

1. **Mark as Deprecated**:
   - Update `docs/command-reference.md` with DEPRECATED tag
   - Add deprecation notice to `system/commands.md`
   - Add deprecation warning to command output

2. **Documentation Update**:
   - Document replacement commands/workflows
   - Add migration guide if complex
   - Update usage examples to use alternatives

3. **Implementation Update**:
   - Modify command to issue deprecation warnings
   - Maintain core functionality during transition
   - Add reference to replacement in output

### 3.3 Removal Phase

1. **Documentation Update**:
   - Move command to "Deprecated/Removed" section in reference
   - Remove from canonical reference
   - Update all usage examples

2. **Routing Cleanup**:
   - Remove from `system/runtime/command-map.md`
   - Remove from `system/runtime/plugin-registry.json`
   - Update `system/runtime/runtime-agent.md` if needed

3. **Implementation Cleanup**:
   - Archive command file if needed for reference
   - Remove from active codebase
   - Clean up unused state components

### 3.4 Final Verification

1. **System Integrity Check**:
   - Verify system loads without errors
   - Check that dependent commands work with alternatives
   - Ensure no references remain in usage flows

2. **Documentation Consistency**:
   - Verify all documentation is updated
   - Ensure no dangling references remain
   - Update release notes with removal notice

## 4. Version Management

### 4.1 Version Numbering

Follow semantic versioning for command changes:

- **Major Version** (X.0.0): Breaking changes to command interface
- **Minor Version** (0.X.0): New commands or non-breaking enhancements
- **Patch Version** (0.0.X): Bug fixes and minor improvements

### 4.2 Command Status Lifecycle

Commands progress through these statuses:

1. **PLANNED**: Planned but not yet implemented
2. **DEVELOPMENT**: In active development
3. **CORE**: Fully implemented core functionality
4. **STABLE**: Mature, fully tested implementation
5. **ENHANCED**: Extended with additional capabilities
6. **DEPRECATED**: Scheduled for removal
7. **REMOVED**: No longer available

### 4.3 Version Documentation

For each command version update:

1. Update the `version` field in the command's front matter
2. Update the `release` field to indicate which system version includes it
3. Update the `updated` date in front matter
4. Add changelog entry at top of implementation file

## 5. Maintaining Documentation Consistency

### 5.1 Documentation Synchronization Checklist

When making any command system changes, verify these documents are in sync:

- [ ] `docs/command-reference.md`
- [ ] `system/commands.md`
- [ ] `system/runtime/command-map.md`
- [ ] `system/runtime/plugin-registry.json`
- [ ] `system/runtime/runtime-agent.md`
- [ ] `system/runtime/validator.md`
- [ ] `system/runtime/entrypoint.md`
- [ ] Command implementation files
- [ ] Release notes

### 5.2 Front Matter Standards

Maintain consistent front matter across all command files:

```
---
id: command-name
title: Human-Readable Command Name
description: Brief description of command purpose
author: Intent Trader Team
version: 0.1.0
release: 0.5.1
created: YYYY-MM-DD
updated: YYYY-MM-DD
category: phase-name
status: status-value
tags: [tag1, tag2, phase-name]
requires: [dependency1, dependency2]
outputs: [output1, output2]
input_format: format-type
output_format: format-type
ai_enabled: true|false
---
```

### 5.3 Documentation Generation

For larger updates, consider using automated tools to regenerate documentation:

1. Script to extract command metadata from implementation files
2. Tool to verify command map matches implementations
3. Automated testing of command routing

## 6. Special Considerations

### 6.1 Cognitive Workflow Alignment

All commands must align with the cognitive workflow:

1. **Plan Phase**: Morning analysis and preparation
2. **Focus Phase**: Opportunity identification and prioritization
3. **Execute Phase**: Trade entry and position creation
4. **Manage Phase**: Active position management
5. **Review Phase**: Performance analysis and reflection
6. **Utilities**: Cross-phase utility commands

When adding or modifying commands, maintain this alignment to preserve intuitive user experience.

### 6.2 Parameter Standardization

Maintain consistency in parameter naming and behavior:

- Use snake_case for parameter names
- Use consistent parameter types across similar commands
- Maintain consistent default values where logical
- Document all parameters thoroughly

### 6.3 Cross-Phase Dependencies

When a command depends on output from another phase:

1. Document the dependency clearly
2. Include graceful fallback behavior
3. Provide clear error messages if dependencies missing
4. Test cross-phase workflows thoroughly

## 7. Release Process Integration

### 7.1 Pre-Release Checklist

Before releasing command system changes:

1. **Documentation Review**:
   - Verify all documentation is updated
   - Check example accuracy
   - Ensure parameter lists are complete

2. **Consistency Check**:
   - Run automated verification of command map
   - Check that all commands have implementations
   - Verify plugin registry matches command map

3. **User Migration**:
   - Document upgrade path for users
   - Highlight breaking changes
   - Provide examples of modified workflows

### 7.2 Release Notes

Include these details in release notes:

1. New commands with brief descriptions and examples
2. Modified commands with change summary
3. Deprecated/removed commands with alternatives
4. Known issues or limitations
5. Future roadmap reference

## 8. Template Examples

### 8.1 New Command Template

When adding a new command to the reference:

```markdown
#### `/command-name [required_param]` CORE

**Purpose:** Brief description of command purpose and primary use case.

**Parameters:**
* `required_param` (required): Description of parameter
* `optional_param` (optional): Description with default value (default: value)

**Output:**
* Description of primary output
* Description of secondary outputs
* Special cases or conditions

**File Location:**
* `prompts/phase/command-name.md`

**Example:**
/command-name required_param optional_param=value
```

### 8.2 Command Map Entry Template

When adding a command to the command map:

```markdown
| `/command-name`    | Brief description                                | phase        | required_param                          | prompts/phase/command-name.md |
```

### 8.3 Plugin Registry Entry Template

When adding a command to the plugin registry:

```json
{
  "id": "command-name",
  "type": "command-type",
  "version": "0.1.0",
  "entryPoint": "prompts/phase/command-name.md",
  "phase": "phase-name",
  "dependsOn": []
}
