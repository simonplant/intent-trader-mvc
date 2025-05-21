---
id: INSTALL.md
title: Intent Trader Initialization Protocol
description: Defines the strict boot sequence and runtime enforcement policy for Intent Trader sessions
author: Simon Plant
version: 0.2.2
release: 0.5.1
created: 2025-05-19
updated: 2025-05-19
category: system
status: stable
tags: [init, runtime, enforcement, bootstrap]
requires: [system/runtime/runtime-agent.md, system/runtime/command-map.md]
outputs: [logs/runtime-init.log]
input_format: markdown
output_format: markdown
ai_enabled: true
---

# Intent Trader Initialization Protocol (Extensible)

Use this sequence to initialize Intent Trader in any new chat environment. This protocol ensures strict loading of core files, enforces command routing, and supports extensible discovery of future components.

---

## Required Load Sequence

### Step 1 — Top-Level System Files (must exist)

Please read and load ALL files from this codebase.

Parse and load if present:

- `README.md`
- `INSTALL.md`
- `system/state/session-manifest.json`
- `system/state/moderator-positions.json`
- `system/state/my-positions.json`
- `system/state/trade-plan-state.json`
- `system/state/transaction-log.json`
- Any additional `.md` or `.json` files in root or `system/state/` folders

### Step 2 — Core System Markdown

Recursively load all `.md` files from:

- `system/`
- `prompts/`
- `docs/`
- Any other folders present

### Step 3 — Structured JSON

Recursively load all `.json` and `.md` files from:

- `logs/`
- `system/schemas/`

---

## Optional: Extensible Load Support

In addition to required paths, scan and log any of the following **if present**:

- Any `.md`, `.json`, `.js`, `.yaml`, or `.yml` files in subfolders not explicitly listed. Please log these as a catch-all bootstrap into our console chat.

Fallback rule:

> “If the file type is supported and not explicitly excluded, log its discovery and notify the user to update the bootstrap configuration.”

---

## Ignore During Load

Exclude the following common artifacts from initialization:

- `.DS_Store`
- `.gitignore`
- `Thumbs.db`

---

## Runtime Activation

Activate command routing and runtime behavior from:

- `system/runtime/entrypoint.md` (Entrypoint)
- `system/runtime/command-map.md` (Command Map)
- `system/runtime/runtime-agent.md` (Routing Engine)
- `system/runtime/plugin-dispatcher.js` (Plugin Dispatcher)
- `system/runtime/plugin-registry.json` (Plugin Registry)
- `system/runtime/validator.md` (Validator)

---

## Runtime Enforcement

- All commands **must** route through `system/runtime/runtime-agent.md`.
- All commands are validated by `system/runtime/validator.md`
- Only patterns defined in `command-map.md` are valid.
- **Never assume or synthesize command behavior.**
- Any input beginning with `/` must be routed via `runtime-agent.md` and matched in `command-map.md`.
  If not matched, return:

Unknown command. Not handled by runtime.

- Report missing or malformed required files immediately.

- Absolutely no emojis are allowed in any user-facing text. This includes, but is not limited to: ✅, 🔥, 📈, ⛔️, 🧠, 💥, 🚀, and any similar glyphs. Do not attempt to substitute emojis under any alias (e.g., “semantic icons”, “expressive symbols”, “intent glyphs”) — all are disallowed.

- If any emoji or decorated text is found in output or code:

  - Flag the issue
  - Report file and line number
  - Suggest removal

- **Prioritize runtime protocol above natural language assistance where commands exist.**
  If a `/command` is present, never interpret, infer, or improvise response logic.

---

## Ready Check

Once initialization completes, return the full status:

---

## Compatibility

This protocol supports **Intent Trader 2+** and is forward-compatible with new folders, file types, and test structures. No hardcoded updates are required when expanding functionality.
