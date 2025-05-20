### `/scaffold-command <command-name> <phase> <type> [description]`

**Purpose:**
Creates standardized boilerplate for new commands across all required files to ensure consistency and reduce errors.

**Parameters:**
- `command-name` (required): Base name without the slash (e.g., "analyze-chart")
- `phase` (required): One of "plan", "focus", "execute", "manage", "review", "utility", "system"
- `type` (required): One of "analyzer", "action", "calculator", "transform", "report", "system", "preprocessor"
- `description` (optional): Brief description of command purpose

**Output:**
- Command file template with proper front matter
- Plugin registry entry
- Command map row
- Reference documentation
- Release notes entry

**Usage Example:**
/scaffold-command analyze-asset plan analyzer "Process asset fundamentals for trading opportunities"

### `/sync-commands [fix] [verbose]`

**Purpose:**
Validates that all command definitions are consistent across all system files and identifies discrepancies.

**Parameters:**
- `fix` (optional): Automatically fix discrepancies where possible (default: false)
- `verbose` (optional): Show detailed report of all checks (default: false)

**Output:**
- Comprehensive validation report
- List of inconsistencies found
- List of orphaned files or commands
- Details on fixes applied (if requested)

**Usage Examples:**
/sync-commands verbose

/sync-commands fix