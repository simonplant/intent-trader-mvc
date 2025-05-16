# 🔌 How To: Add a New Plugin

This guide walks you through safely registering a new plugin to be executed by the Intent Trader runtime dispatcher.

---

## 1. Create the Plugin Script

Create a `.js` file or executable script in `system/` or `prompts/` that does one of the following:
- Transforms a prompt or input
- Analyzes trade/cognitive/log state
- Outputs a valid object or file

---

## 2. Register it in `plugin-registry.json`

Add an object like this:

```json
{
  "id": "my-new-analyzer",
  "type": "analyzer",
  "version": "1.0.0",
  "entryPoint": "system/my-new-analyzer.js",
  "phase": "intraday",
  "dependsOn": ["logs/trade-log.json"]
}
```

---

## 3. Test It

Run it standalone or use the dispatcher:

```bash
node system/systemops/plugin-dispatcher.js intraday
```

---

## 4. Update API Contract (optional)

If your plugin has structured input/output, describe it in `system/systemops/api-contracts.md`.
