# 🚀 INSTALL.md – Setup & Simulation

This guide explains how to install, run, and test Intent Trader v0.5.0.

---

## Prerequisites

- Node.js (>=18)
- Git (to clone your repo)

---

## Installation

```bash
git clone https://github.com/your-org/intent-trader.git
cd intent-trader
npm install
```

---

## Simulate a Full Day

```bash
# Generate a session manifest
cp state/session-manifest.json state/session-manifest.backup.json

# Run morning blueprint (manual review or prompt call)
# Then trigger intraday simulation (status, reset, chart)
# Finally run postmarket:
node system/learning/replay-runner.js
node system/systemops/plugin-dispatcher.js postmarket
```

---

## Run Tests

```bash
# Validate schema compliance
node system/tests/validate-system.js

# View replay results
cat logs/replay-summary.json

# Review full session coverage
less tests/full-session-test.md
```

---

## Additional Commands

```bash
node system/systemops/plugin-dispatcher.js premarket
node system/systemops/plugin-dispatcher.js intraday
```

---

## ChatGPT ZIP Upload Instructions

## Quickstart

To launch Intent Trader v0.5.0 inside ChatGPT:

1. Upload `intent-trader-v0.5.0-final.zip` to a new ChatGPT conversation
2. Paste the following prompt into the chat:

```
Please read and load ALL files from this ZIP archive.

Start with:
- README.md
- state/session-manifest.json

Then load:
- all .md files in /system/
- all .md files in /prompts/
- all .json files in /logs/ and /system/schemas/

Once loaded:
Use system/systemops/runtime-agent.md as the EXCLUSIVE routing layer for all future commands.
Use system/systemops/command-map.md to map valid commands and execution flows.
Use state/session-manifest.json to determine the current session phase and context.

I want to interact with my Intent Trader system inside this chat.
Respond only using the rules defined in runtime-agent.md
and route inputs using command-map.md.

Let’s begin.
```