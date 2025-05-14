---
title: Prompt Metadata Style Guide
description: System-wide metadata schema required for prompt execution, routing, version control, and runtime behavior formatting
category: system
version: v0.5.0
last_updated: 2025-05-13

title: [Prompt Title]                # Human-readable name
description: [One-line purpose]      # What this prompt does
phase: [premarket|intraday|postmarket|system]  # Prompt lifecycle stage
route: /[route-name]                # Slash command interface mapping
output: raw                         # Always raw markdown output
style:
  decorate: false                   # No markdown styling
  emojis: false                     # No emoji output
  tone: direct                      # [direct|coaching|diagnostic]
  format: text/plain                # Output format type
tags: [validation, trade, behavior] # Used for filtering and coverage
version: [SemVer version number]    # Local evolution of this file (e.g. v1.2.0)
release: v0.4.1
last_updated: YYYY-MM-DD            2025-05-13
---

# 🧠 Prompt Metadata Style Guide (`intent-trader`)

All prompt files MUST include the following **YAML front matter** to ensure:

- Proper lifecycle routing via `main-controller.md`
- Schema validation and test vector enforcement
- Prompt versioning and changelog tracking
- Controlled output format and style rendering

---

## ✅ Required Front Matter Structure

```yaml
---
title: [Prompt Title]                # Human-readable name
description: [One-line purpose]      # What this prompt does
phase: [premarket|intraday|postmarket|system]  # Prompt lifecycle stage
route: /[route-name]                # Slash command interface mapping
output: raw                         # Always raw markdown output
style:
  decorate: false                   # No markdown styling
  emojis: false                     # No emoji output
  tone: direct                      # [direct|coaching|diagnostic]
  format: text/plain                # Output format type
tags: [validation, trade, behavior] # Used for filtering and coverage
version: [vX.Y.Z]                   # Local evolution of this file (e.g. v1.2.0)
release: [vX.Y.Z]                   # Current system release bundle (e.g. v0.5.0)
last_updated: YYYY-MM-DD            # ISO-8601 date (e.g. 2025-05-09)
---
```

---

## 🔍 Field Enforcement Notes

| Field         | Required | Description |
|---------------|----------|-------------|
| `title`       | ✅        | Used in UI and route map |
| `description` | ✅        | One-line usage summary |
| `phase`       | ✅        | Drives routing and lifecycle binding |
| `route`       | ✅        | Maps the prompt to controller commands |
| `output`      | ✅        | Always `raw` |
| `style`       | ✅        | Controlled output formatting rules |
| `tags`        | ✅        | Required for filtering and registry |
| `version`     | ✅        | Tracks prompt-level changes (SemVer: vX.Y.Z) |
| `release`     | ✅        | Indicates current system release (e.g. v0.5.0) |
| `last_updated`| ✅        | Required for diff and prompt QA tools |

---

## 💡 Example

```yaml
---
title: Validate Trade vs Plan
description: Checks trade execution against planned levels
phase: intraday
route: /validate-trade
output: raw
style:
  decorate: false
  emojis: false
  tone: direct
  format: text/plain
tags: [validation, trade, intraday]
version: v1.2.0              # Local evolution of this file. Currently v1.2.0
release: v0.5.0              # Current system release bundle. Currently v0.5.0
last_updated: 2025-05-09
---
```

---

## 🧪 Versioning Best Practices

- Use `version:` to bump **only this prompt** when its logic changes.
- Use `release:` to tag **all prompts** for a system-wide version milestone.
- Maintain changelogs via `/logs/releases/v0.5.0.md`
- Use `prompt-diff` or `prompt-linter` to catch drift across versions.

---

## 🚫 Common Violations

- ❌ Omitting `release` or `version`
- ❌ Using `0.5.0` instead of `v0.5.0` (must use `v` prefix)
- ❌ Missing `last_updated`
- ❌ `emojis: true` (emojis are globally disabled)

---

## ✅ Enforcement Mechanisms

- All prompts must pass `/prompt-linter`
- All valid routes must appear in `/main-controller.md`
- All schema-bound outputs must validate JSON structure

---

## 🔁 Roadmap Compatibility

- `v0.5.0`: Refactored controller, prompt QA, schema alignment
- `v0.6.0`: Test harness integration, regression runner
- `v1.0.0`: Production agent-compatible runtime

---

This guide is the source of truth for all prompt metadata and should be referenced by CI, controller generators, and prompt auditing tools.
