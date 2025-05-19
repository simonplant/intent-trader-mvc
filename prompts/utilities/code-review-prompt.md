# Intent Trader System-Wide Consistency Review Prompt

## Overview
This prompt guides you through a comprehensive system-wide review of the Intent Trader codebase, focusing on maintaining consistency and synchronization across all system components. The review emphasizes command definitions, routing tables, documentation, interface contracts, and dependency management.

## Review Focus Areas

### 1. Command Registry Consistency Checks

Check for complete synchronization between these files:
- `system/commands.md`
- `system/runtime/command-map.md`
- `system/runtime/entrypoint.md`
- `system/runtime/plugin-dispatcher.js`
- `system/runtime/plugin-registry.json`
- `system/runtime/plugin-registry.md`
- `system/runtime/runtime-agent.md`
- `system/runtime/validator.md`
- `docs/command-reference.md`
- `INSTALL.md`
- `README.md`
- `tree.md`

For each command, verify:
- [ ] Identical command names across all references
- [ ] Matching parameter definitions with consistent naming and types
- [ ] Consistent file path references to prompt implementations
- [ ] Matching output descriptions across files
- [ ] Synchronized phase assignments (plan, focus, execute, manage, review)
- [ ] Matching purpose statements across all documentation

**Command Definition Checklist:**
```
| Consistent? | Command | Commands.md | Command-Map | Command-Ref | Entrypoint | Plugin-dispatcher | Plugin-Registry | Plugin-Reg .md |Runtime Agent | Validator | README.md |
|-------------|---------|-------------|-------------|-------------|------------|-------------------|-----------------|----------------|--------------|---------|-------------|
| /analyze-dp | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
...
```

### 2. Prompt Implementation Verification

- [ ] Verify all referenced prompt files exist at specified paths
- [ ] Check front matter metadata in all prompt files for consistency:
  - `id` matches command name
  - `version` is consistent with current release
  - `requires` lists necessary dependencies
  - `outputs` correctly identifies produced artifacts
  - `input_format`/`output_format` match interface contract
- [ ] Validate that all prompts in prompt directories are listed in command registry
- [ ] Check for orphaned prompts not referenced in registry

**Dependency Graph Verification:**
- Run a dependency linkage analysis to identify:
  - Missing dependencies
  - Circular dependencies
  - Orphaned components
  - Unreferenced inputs/outputs

### 3. Data Contract Compliance

- [ ] Verify all commands with JSON inputs/outputs have matching schema definitions
- [ ] Check for data structure inconsistencies between producer/consumer prompts
- [ ] Validate field name consistency across the system (e.g., always `market_mode` vs. `marketMode`)
- [ ] Verify enumerations are consistently defined (e.g., conviction levels, market modes)
- [ ] Check for schema version compatibility across dependent components

**Schema Field Consistency Checks:**
```
| Field Name | Used In | Format | Type | Enum Values | Consistent? |
|------------|---------|--------|------|-------------|-------------|
| market_mode | analyze-mancini, create-plan | String | Enum | "Mode 1", "Mode 2" | ✓ |
...
```

### 4. Documentation Completeness

- [ ] Check for documentation coverage of all commands
- [ ] Verify example consistency across documentation
- [ ] Validate parameter descriptions match implementation requirements
- [ ] Check that all examples use accurate syntax and valid parameter combinations
- [ ] Verify all command flows in documentation are up-to-date with current workflow

### 5. Runtime Implementation

- [ ] Validate runtime agent properly maps all commands
- [ ] Check plugin dispatcher for proper handling of all registered command types
- [ ] Verify validation logic exists for all command parameters
- [ ] Check that error handling is consistent and informative

### 6. State Management

- [ ] Verify all state file references are consistent
- [ ] Check that state modification commands have clear contracts
- [ ] Validate that state access is properly sequenced in command flows

### 7. Phase-Specific Checks

**Plan Phase:**
- [ ] Analyze extraction consistency between analyze-dp and summarize-mancini
- [ ] Verify market mode classification consistency

**Focus Phase:**
- [ ] Check create-plan integration with various analyzers
- [ ] Verify level extraction compatibility across sources

**Execute/Manage Phases:**
- [ ] Validate position tracking contract consistency
- [ ] Check trade parameter handling across the execution chain

**Review Phase:**
- [ ] Verify logging format consistency with reporting needs

## Review Execution

1. **Automated Checks:**
   - Run validation scripts against registry and prompt files
   - Perform schema compatibility checks
   - Check for file existence and path alignment

2. **Cognitive Workflow Testing:**
   - Test full command flows for each cognitive phase
   - Verify outputs from one command properly feed into next commands

3. **Documentation Alignment:**
   - Cross-reference all documentation against implementation
   - Test all examples in documentation

## Issue Reporting Template

**Issue Type:** [Command Inconsistency | Schema Mismatch | Documentation Error | Missing Implementation | Workflow Break]

**Components:**
- Primary: [affected command/file]
- Related: [related commands/files]

**Description:**
[Clear description of the issue]

**Alignment Status:**
- Command Registry: [✓/✗]
- Implementation: [✓/✗]
- Documentation: [✓/✗]
- Schema: [✓/✗]

**Resolution:**
[Suggested fix with specific file changes]

## Review Completion Checklist

- [ ] All commands verified across registry files
- [ ] All prompt implementations checked for metadata consistency
- [ ] All data contracts validated for field consistency
- [ ] All documentation examples verified
- [ ] Full workflow sequences tested
- [ ] Dependency graph validated
- [ ] Phase-specific checks completed
- [ ] Issues documented with resolution plan

---

## Command Reference Quick Check

To perform a quick command reference consistency check, use this technique:

1. Extract command definitions from each source:
   ```bash
   grep -E "^### `/[a-z-]+`" system/commands.md | sort > cmd_list_commands.txt
   grep -E "^\| `/[a-z-]+`" system/runtime/command-map.md | sort > cmd_list_map.txt
   grep -E '"id": "[a-z-]+"' system/runtime/plugin-registry.json | sort > cmd_list_registry.txt
   grep -E "^#### `/[a-z-]+`" docs/command-reference.md | sort > cmd_list_reference.txt
   ```

2. Compare command lists for discrepancies:
   ```bash
   diff cmd_list_commands.txt cmd_list_map.txt
   diff cmd_list_commands.txt cmd_list_registry.txt
   diff cmd_list_commands.txt cmd_list_reference.txt
   ```

3. Check file path references:
   ```bash
   grep -E "entryPoint" system/runtime/plugin-registry.json > cmd_paths.txt
   # Manually verify each path exists
   ```

4. Verify schema field consistency:
   ```bash
   # Use custom script to extract field names from prompt files and compare
   ```
