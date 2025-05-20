#### `/scaffold-command <command-name> <phase> <type> [description]`

**Purpose:** Creates standardized boilerplate for new commands across all required files to ensure consistency and reduce errors.

**Parameters:**
* `command-name` (required): Base name without the slash (e.g., "analyze-chart")
* `phase` (required): One of "plan", "focus", "execute", "manage", "review", "utility", "system"
* `type` (required): One of "analyzer", "action", "calculator", "transform", "report", "system", "preprocessor"
* `description` (optional): Brief description of command purpose

**Output:**
* Command file template with proper front matter
* Plugin registry entry
* Command map row
* Reference documentation
* Release notes entry

**Implementation:**
* Validates input parameters against allowed values
* Generates command file template with front matter
* Creates consistent entries for all system files
* Provides complete output for manual copy-paste or automated writing

**File Location:**
* `prompts/utilities/scaffold-command.md`

**Example:**
/scaffold-command analyze-asset plan analyzer "Process asset fundamentals for trading opportunities"

#### `/sync-commands [fix] [verbose]`

**Purpose:** Validates that all command definitions are consistent across all system files and identifies discrepancies.

**Parameters:**
* `fix` (optional): Automatically fix discrepancies where possible
* `verbose` (optional): Show detailed report of all checks

**Output:**
* Comprehensive validation report
* List of inconsistencies found
* List of orphaned files or commands
* Details on fixes applied (if requested)

**Implementation:**
* Checks all commands in `system/runtime/command-map.md` are present in `system/runtime/plugin-registry.json`
* Verifies all commands in `system/runtime/plugin-registry.json` have a corresponding implementation file
* Ensures all commands in `docs/command-reference.md` match those in `system/runtime/command-map.md`
* Validates file paths are consistent between `system/runtime/command-map.md` and `system/runtime/plugin-registry.json`
* Checks all commands share the same phase assignment across files
* Updates runtime-agent.md supported commands list when using "fix" parameter

**File Location:**
* `prompts/utilities/sync-commands.md`

**Example:**
/sync-commands fix verbose