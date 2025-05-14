# 🧪 Test Suite – Intent Trader

This folder contains schema and functional tests for validating the end-to-end system lifecycle.

---

## Included Tests

- `test-blueprint.js` – Validate trade log + manifest plugin presence
- `test-replay.js` – Ensure replay-summary was generated and includes output
- `test-session-complete.js` – Run a simulation of full test sequence
- `validate-schema.js` – (stub) to validate all JSON against schema contracts

## How To Run

```bash
node tests/test-session-complete.js
```

Use this at end of day to validate system health.
