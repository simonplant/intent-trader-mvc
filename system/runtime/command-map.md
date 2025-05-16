---
id: command-map
version: "1.0.0"
type: system
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: LOW
requiresConfirmation: false
---

# Runtime Command Map

Table of commands available to the Promptsmith Runtime Companion.

| Command              | Description                                       | Phase        | Input Required                        |
|----------------------|---------------------------------------------------|--------------|----------------------------------------|
| `/run-phase <name>`  | Executes all plugins in the specified phase       | any          | `"premarket"`, `"postmarket"`         |
| `/blueprint new`     | Triggers morning blueprint generation             | premarket    | context JSON                          |
| `/status update`     | Runs status-update prompt for active setups       | intraday     | setup object, current price           |
| `/cognitive reset`   | Launches cognitive reset flow                     | intraday     | `cognitive-load.schema.json` object   |
| `/replay`            | Runs `replay-runner.js` and logs results          | postmarket   | `trade-log.json`                      |
| `/analyze prompts`   | Runs route-analyzer and linter tools              | system       | `prompt-registry.json`                |
| `/help`              | Displays full command table                       | any          | none                                   |

## ⏱ Trigger Modes

- Manual command line
- Embedded in Obsidian or VS Code AI plugin
- Event-driven from phase completion
