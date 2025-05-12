# Prompt Metadata Style Guide (intent-trader)

All prompt files MUST include the following YAML front matter for execution and style enforcement.

```yaml
---
title: [Prompt Title]
description: [What this prompt does in one sentence.]
phase: [premarket|intraday|postmarket|system]
route: /[route-name]
output: raw
style:
  decorate: false
  emojis: false
  tone: direct
  format: text/plain
tags: [validation, trade, coaching, system]
version: 0.4.0-pre
---
```

- All prompts are output-only (no emojis or decoration)
- Controlled through centralized routing in `main-controller.md`
