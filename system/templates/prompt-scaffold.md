---
id: your-prompt-id
title: Your Prompt Title
description: Describe what this prompt does in 1–2 sentences.
author: Simon Plant
version: 1.0.0
release: 0.5.0
created: YYYY-MM-DD
updated: YYYY-MM-DD
category: system
status: draft
tags: [prompt, validation, template]
requires: []
outputs: []
input_format: prompt
output_format: markdown
ai_enabled: true
---

# Prompt Name (e.g., Validate Trade Intent)

This prompt is responsible for...

---

## Input Format

```json
{
  "symbol": "AAPL",
  "idea": "Momentum breakout",
  "entry": 188.50,
  "stop": 187.00,
  "target": 192.00
}
```

---

## Output Format

```json
{
  "valid": true,
  "reasons": ["Momentum confirmed", "Within blueprint scope"],
  "action": "Consider long with full position"
}
```

---

## Test Input

Paste this into ChatGPT or your runner to validate:

```json
{
  "symbol": "TSLA",
  "idea": "Failed breakdown at 600 with reclaim",
  "entry": 602,
  "stop": 598,
  "target": 615
}
```

---

## Related Files

- `status-update.md`
- `blueprint.schema.json`
- `command-map.md`
