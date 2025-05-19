---
id: INSTALL.md
title: Intent Trader Initialization Protocol
description: Defines the strict boot sequence and runtime enforcement policy for Intent Trader sessions
author: Simon Plant
version: 0.2.1
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

Parse and load if present:

- `README.md`
- `INSTALL.md`
- `state/session-manifest.json`
- Any additional `.md` or `.json` files in root or `/state/`

### Step 2 — Core System Markdown

Recursively load all `.md` files from:

- `/system/`
- `/prompts/`
- `/docs/`
- `/tests/`
- Any other folders present

### Step 3 — Structured JSON

Recursively load all `.json` files from:

- `/config/`
- `/logs/`
- `/system/schemas/`

### Step 4 — Tests

From `/tests/`, load:
- All `.md` files (test planning and specs)
- All `.js` files (test execution logic)

---

## Optional: Extensible Load Support

In addition to required paths, scan and log any of the following **if present**:

- Any `.md`, `.json`, `.js`, `.yaml`, or `.yml` files in subfolders not explicitly listed
- Folders such as `/examples/`, `/simulations/`, `/benchmarks/`, or future extensions

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
- `system/runtime/entrypoint.md`
- `system/runtime/runtime-agent.md` (Routing Engine)
- `system/runtime/command-map.md` (Command Map)

---

## Runtime Enforcement

- All commands **must** route through `runtime-agent.md`.
- Only patterns defined in `command-map.md` are valid.
- **Never assume or synthesize command behavior.**
- Any input beginning with `/` must be routed via `runtime-agent.md` and matched in `command-map.md`.
  If not matched, return:

Unknown command. Not handled by runtime.

- Report missing or malformed required files immediately.
- No emoji, symbolic bullets, or decorative unicode are allowed in any user-facing text. This includes characters like ✅, 🔥, 📈, ⛔️, and any non-standard alphanumerics.

- If any emoji or decorative unicode is found in output or code:
	- Flag the issue
	- Report file and line number
	- Suggest removal

- **Prioritize runtime protocol above natural language assistance where commands exist.**
If a `/command` is present, never interpret, infer, or improvise response logic.

---

## Ready Check

Once initialization completes, return:

Runtime initialized.
Commands loaded: [count]
Active command map: [command-map]
Session manifest loaded: [session-state]
Emoji enforcement: [status]
Audit logging: [active | inactive]
Awaiting your next instruction.

---

## Compatibility

This protocol supports **Intent Trader v0.5.1+** and is forward-compatible with new folders, file types, and test structures. No hardcoded updates are required when expanding functionality.
