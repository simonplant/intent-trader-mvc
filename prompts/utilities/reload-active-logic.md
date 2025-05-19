---
id: reload-active-logic
title: Reload Active Runtime Logic
description: Flush stale context and rebuild the runtime environment from uploaded authoritative files
author: Intent Trader Team
version: 0.1.1
release: 0.5.1
created: 2025-05-16
updated: 2025-05-16
category: system
status: stable
tags: [system, runtime, reset, enforcement, determinism]
requires: [system/runtime/command-map.md, system/runtime/runtime-agent.md]
outputs: [systemReport]
input_format: none
output_format: markdown
ai_enabled: true
---

# /reload-active-logic

## Purpose

This system-wide command enforces *fresh execution discipline* across the entire AI runtime environment. It prevents stale assumptions, context blending, and memory-based laziness that corrupt deterministic behavior during development.

## What It Does

Upon invocation, this command:

1. **Flushes all cached system memory**:
   - No reuse of ZIP-derived logic
   - No blended prompt assumptions
   - No hallucinated links between prompts and commands

2. **Rebuilds the execution graph from file system reality**:
   - Re-parse the installer `INSTALL.md` to ensure all files are present.
   - Re-parse the entrpoint file `system/runtime/entrypoint.md` fro the initialization sequence.
   - Re-parse `command-map.md` as the single source of truth for routable commands
   - Load all referenced prompt files and validate their metadata (`id`, `requires`, `outputs`, etc.)
   - Resolve all `requires:` and `outputs:` chains explicitly — throw if any are missing

3. **Enforces execution determinism**:
   - Rejects execution if any routed file is missing
   - Prioritizes **uploaded reality over remembered suggestions**
   - Blocks fallback behavior like guessing routes, commands, or behaviors from prior memory

## Use Cases

Run this command:
- After uploading any new file or ZIP
- After editing a prompt or routing map
- If the system gives you incorrect, inferred, or stale answers
- As a start-of-session initializer for all serious development work

## Output

Returns a `systemReport`:
- Loaded commands
- Verified prompt files
- Any unresolved requires or missing outputs
- Summary of what was flushed, what was rebuilt