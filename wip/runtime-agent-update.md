## Runtime Agent Update for runtime-agent.md

Update the "Supported Commands by Phase" section of runtime-agent.md to include the new system commands:

### System Commands
- `/reload-active-logic` - Flush all stale memory and rebuild runtime/execution from current uploaded files
- `/scaffold-command <command-name> <phase> <type> [description]` - Creates standardized boilerplate for new commands across all required files
- `/sync-commands [fix] [verbose]` - Validates that all command definitions are consistent across system files and identifies discrepancies
- `/help` - Show available commands
- `/status` - Show current trading session state