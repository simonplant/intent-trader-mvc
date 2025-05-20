# Implementation Guide: Command System Automation

This guide outlines the steps required to implement the new command system automation tools in Intent Trader.

## Implementation Overview

We're adding two key system automation commands to streamline command management:

1. **`/scaffold-command`**: Generates standardized boilerplate for new commands
2. **`/sync-commands`**: Validates and synchronizes command references across system files

## Implementation Steps

### 1. Create Command Implementation Files

#### Create `/scaffold-command` Implementation
1. Create file: `prompts/utilities/scaffold-command.md`
2. Copy the contents from the scaffold-command artifact to this file

#### Create `/sync-commands` Implementation
1. Create file: `prompts/utilities/sync-commands.md`
2. Copy the contents from the sync-commands artifact to this file

### 2. Update System Files

#### Update Plugin Registry
1. Open: `system/runtime/plugin-registry.json`
2. Add the following entries at the end (before closing bracket):
```json
{
  "id": "scaffold-command",
  "type": "system",
  "version": "0.1.0",
  "entryPoint": "prompts/utilities/scaffold-command.md",
  "phase": "system",
  "dependsOn": [
    "system/templates/front-matter-template.md", 
    "system/runtime/command-map.md", 
    "system/runtime/plugin-registry.json"
  ]
},
{
  "id": "sync-commands",
  "type": "system",
  "version": "0.1.0",
  "entryPoint": "prompts/utilities/sync-commands.md",
  "phase": "system",
  "dependsOn": [
    "system/runtime/command-map.md", 
    "system/runtime/plugin-registry.json", 
    "docs/command-reference.md"
  ]
}
```

#### Update Command Map
1. Open: `system/runtime/command-map.md`
2. Add the following entries in the **SYSTEM COMMANDS** section of the table:
```
| `/scaffold-command` | Generate boilerplate for new commands              | system       | command-name, phase, type, [description] | prompts/utilities/scaffold-command.md |
| `/sync-commands`    | Validate and sync command references               | system       | [fix], [verbose]                      | prompts/utilities/sync-commands.md |
```

#### Update Command Reference
1. Open: `docs/command-reference.md`
2. Add the new system commands entries from the command-reference-update artifact to the **SYSTEM Commands** section

#### Update commands.md
1. Open: `system/commands.md`
2. Add the new system commands entries from the commands-md-update artifact to the end of the file

#### Update Runtime Agent
1. Open: `system/runtime/runtime-agent.md`
2. Update the "Supported Commands by Phase" > "System Commands" section with the entries from the runtime-agent-update artifact

1. Run `git status` to verify all files have been created/modified
2. Run `/reload-active-logic` to rebuild the runtime environment
3. Test the command scaffolding by running:
   ```
   /scaffold-command test-command utility analyzer "Test command for verification"
   ```
4. Test the command synchronization by running:
   ```
   /sync-commands verbose
   ```

## Usage Examples

### Scaffolding a New Command

Use the following syntax to scaffold a new command:

```
/scaffold-command analyze-asset plan analyzer "Process asset fundamentals for trading opportunities"
```

This will generate:
- Command file template (`prompts/plan/analyze-asset.md`)
- Plugin registry entry
- Command map row
- Reference documentation
- Release notes entry

### Synchronizing Commands

Use the following to check command consistency:

```
/sync-commands verbose
```

To automatically fix issues:

```
/sync-commands fix
```

## Maintenance Notes

- After creating a new command, always run `/sync-commands` to verify consistency
- When updating command metadata, run `/sync-commands fix` to propagate changes
- Before releasing a new version, run `/sync-commands verbose` to check for inconsistencies

## Support and Troubleshooting

If you encounter issues with these utilities:

1. Verify file permissions and paths
2. Check for JSON syntax errors in plugin-registry.json
3. Ensure template files exist at the referenced locations
4. Run `/reload-active-logic` to refresh the runtime environment
