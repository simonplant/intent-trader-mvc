---
id: route-analyzer
version: "1.0.0"
type: system
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: LOW
requiresConfirmation: false
---

# 📊 Prompt Route Analyzer

Scans all prompt frontmatter and summarizes route coverage by type and market mode.

## 🔢 Input:
- `prompt-registry.json` entries (array of objects)

## ⚙️ Output:
- Count of total prompts
- Count by `marketMode`, `type`, and missing fields
- Suggestions for prompt coverage by phase

## 🧪 Test Input:
```json
{
  "prompts": [
    {"id": "morning-blueprint", "type": "prompt", "marketMode": "premarket"},
    {"id": "status-update", "type": "prompt", "marketMode": "intraday"},
    {"id": "cognitive-reset", "type": "prompt", "marketMode": "intraday"}
  ]
}
```

## ✅ Expected Output:
```json
{
  "total": 3,
  "byMarketMode": {
    "premarket": 1,
    "intraday": 2
  },
  "byType": {
    "prompt": 3
  },
  "missingFields": []
}
```

## 📎 References
- `system/registry/prompt-registry.json`
- `system/schemas/metadata.schema.json`
