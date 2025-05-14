---
title: Intent Trader Refactor Project Dashboard
version: v0.5.0
last_updated: 2025-05-09
---

# 📊 Intent Trader Refactor Dashboard

## ✅ Overview

This dashboard tracks execution progress for the `intent-trader` refactor project across all major phases, aligned to architecture and implementation plans.

---

## 📦 Phase Status

| Phase # | Title                        | Status   | Output Folder             | Key Files |
|--------|------------------------------|----------|---------------------------|-----------|
| 0      | Metadata & Controller Setup  | ✅ Complete | /system/                  | metadata-style.md, main-controller.md |
| 1      | Schema Core Setup            | 🔄 In Progress | /schemas/                 | metadata.schema.json, blueprint.schema.json |
| 2      | Blueprint Generator          | ⬜ Not Started | /prompts/intraday/        | blueprint-update.md |
| 3      | Status + Cognitive System    | ⬜ Not Started | /prompts/intraday/, /schemas/ | status-update.md, cognitive-load.schema.json |
| 4      | Trade Comparison + Logging   | ⬜ Not Started | /prompts/postmarket/      | compare-execution.md, missed-trades.md |
| 5      | SystemOps & Resilience       | ⬜ Not Started | /prompts/system/          | route-analyzer.md, prompt-linter.md |

---

## 📂 Repo Structure (Target)

```
intent-trader/
├── system/
│   ├── metadata-style.md
│   ├── main-controller.md
│   ├── prompt-registry.json
│   └── system-project-plan.md
├── schemas/
│   ├── metadata.schema.json
│   ├── blueprint.schema.json
│   ├── status.schema.json
│   └── cognitive-load.schema.json
├── prompts/
│   ├── premarket/
│   ├── intraday/
│   ├── postmarket/
│   └── system/
├── logs/
│   └── releases/v0.5.0.md
├── changelog.md
└── project-dashboard.md
```
