---
title: Intent Trader Refactor Execution Guide
description: Step-by-step prompt sequence and file prep plan for refactoring the Intent Trader system in a clean ChatGPT session
author: Simon Plant
version: 1.0
last_updated: 2025-05-09
category: systemops
---

# ✅ Let’s Do This — Refactoring the Intent Trader System via ChatGPT

This guide walks through a clean and structured **execution plan** to complete the full Intent Trader architectural overhaul using ChatGPT and prompt-based workflows.

---

## 🧭 PHASE 0: Setup and Clean Session Strategy

> Always begin major refactors in a clean thread to avoid memory leakage, misrouting, or prompt misalignment.

### 🧼 Prep Checklist for New Chat
- ✅ Upload `intent-trader.zip` (latest build)
- ✅ Upload `wip-consolidation plan.md` and `gan-qa-review.md`
- ✅ Upload `promptsmith-trading-system-ops.md`
- ✅ Upload `intent-blueprint-system.md` if scoped
- ✅ Upload `trading-system-change-requirements.md` (for reference)
- ✅ Say:
```plaintext
We're executing a full system refactor. Use PromptSmith:TradingSystemOps to manage prompt, schema, routing, and log layer cleanup.
```

---

## 🧩 PHASE 1: CONTROLLER + ROUTING CONSOLIDATION

### 📂 Files
- `main-controller.md`
- `controller.md`
- `command-router.js` (if applicable)

### Prompt
```plaintext
Please refactor and consolidate the controller and routing logic for phase-based prompt mapping. Remove obsolete `copilot-*`, normalize paths to `/premarket/`, `/intraday/`, `/postmarket/`, and `/systemops/`.
```

---

## 🧠 PHASE 2: PROMPT SYSTEM REORGANIZATION

### 📂 Files
- `prompts/`
- `prompts-old/`
- `prompt-spec-*.md`

### Prompt
```plaintext
Refactor prompts into correct phase-aligned folders. Convert cognitive JS modules into prompt templates where appropriate. Keep JS only for validation, formatting, or transformation.
```

---

## 📐 PHASE 3: SCHEMA CONSOLIDATION + VALIDATION

### 📂 Files
- `schemas/`
- `schema-registry.js`

### Prompt
```plaintext
Let’s consolidate all prompt, log, and output schemas. Please validate the schema registry and identify missing, unused, or duplicate schema definitions.
```

---

## 🧬 PHASE 4: BEHAVIOR + INTENT TRACKING FRAMEWORK

### 📂 Files
- `logs/behaviors/`
- `logs/trades/`
- `kb-update.md`
- `validate-behavior.md`

### Prompt
```plaintext
Please create or refactor a prompt-based behavioral analysis pipeline. Link logs to trade IDs and behaviors. Implement test vectors for coaching and performance improvement.
```

---

## 📊 PHASE 5: SYSTEM QA + TEST CASE DEFINITION

### 📂 Files
- All `prompts/`
- `logs/tests/`
- `gan-qa-review.md`

### Prompt
```plaintext
Let’s prepare schema-bound test cases for each prompt. Each prompt should include a `"test_case"` block with expected input and JSON output. Add schema versions to all metadata.
```

---

## 🧠 PHASE 6: COGNITIVE CALIBRATION + FAILOVER

### Prompt
```plaintext
Please implement a resilience layer across all runtime prompts. Add fallback guidance, confidence score reporting, and override recommendations to each user-facing prompt.
```

---

## ✅ FINAL VALIDATION

### Prompt
```plaintext
Please simulate a full day: premarket → intraday → postmarket across your refactored prompt system. Validate prompt routing, schema adherence, and behavioral output.
```

---

## 🔁 BONUS: REGRESSION + UPGRADE CONTROLS

### Prompt
```plaintext
Please add a prompt diff + changelog tracker. Let me compare changes in intent, schema, or instruction between any two prompt versions.
```

---

## 🔐 Meta-Prompt to Start Each Day

```plaintext
Load `PromptSmith:TradingSystemOps` and manage today's development across routing, prompt QA, schema alignment, and behavior integration. Log progress as system logs.
```

---

This is your full stack “Let’s Do This” guide.

You are now cleared for system evolution.
