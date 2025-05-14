# INSTALL.md – Setup & Simulation

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

Ready to build? Run `full-session-test.md` or create a new prompt with `prompt-scaffold.md`.
