# Intent Trader

Intent Trader is an AI-integrated trading assistant designed to streamline and automate premarket, intraday, and postmarket workflows for active traders. It integrates daily trading routines, expert commentary analysis, and structured command routing.

---

## 🚀 Initialization Overview

To launch Intent Trader in a fresh ChatGPT session, follow the extensible bootstrap protocol described below. This ensures proper loading of core logic, prompts, session state, and runtime enforcement.

# Intent Trader Initialization Protocol (Extensible)

Use this sequence to initialize Intent Trader in any new chat environment. This protocol supports strict loading of core files and extensible discovery of future components.

---

## 🗂 Required Load Sequence

**Step 1 — Top-Level System Files (must exist)**
Load these into memory:
- `README.md`
- `INSTALL.md` (if present)
- `state/session-manifest.json`
- `changelog.md` (if present)

**Step 2 — Core System Markdown**
Recursively load all `.md` files from:
- `/system/`
- `/prompts/`
- `/docs/`

**Step 3 — Structured JSON**
Recursively load all `.json` files from:
- `/logs/`
- `/system/schemas/`

**Step 4 — Tests**
From `/tests/`, load:
- All `.md` (test planning/specs)
- All `.js` (test execution logic)

---

## Optional: Extensible Load Support

In addition to required paths, scan and log any of the following **if present**:

- Any other `.md`, `.json`, `.js`, `.yaml`, or `.yml` files in subfolders not explicitly listed
- New folders like `/examples/`, `/simulations/`, `/benchmarks/`, etc.

Use a fallback rule:
> “If file type is supported and not excluded, log it and notify the user to update the bootstrap.”

---

## Ignore These During Load

Exclude common artifacts from the loading process:
- `.DS_Store`
- `.gitignore`
- `Thumbs.db`

---

## Runtime Activation

Activate runtime and command routing via:

- **Routing Engine:** `system/systemops/runtime-agent.md`
- **Command Map:** `system/systemops/command-map.md`
- **Session Context:** `state/session-manifest.json`

---

## Runtime Enforcement

- All commands **must** route via `runtime-agent.md`
- Use only patterns defined in `command-map.md`
- **Never assume or synthesize paths**
- Report any missing required files immediately

---

## Ready Check

Once complete, return:
```
Runtime initialized. Awaiting next instruction.
```

---

## Compatibility

This protocol supports **Intent Trader v0.5.0+** and is extensible for new folders, formats, and test types without requiring hardcoded updates.

---

## Directory Structure Overview

- `/system/` – Core logic and operational agents
- `/prompts/` – Trade idea generators and validation modules
- `/docs/` – Documentation and usage guides
- `/logs/` – Structured trade logs
- `/tests/` – QA test specs and execution logic
- `/state/` – Current session manifest and runtime data

---

## Start Interacting

After successful runtime initialization, submit commands through the Runtime Agent interface (`system/systemops/runtime-agent.md`) using command structures defined in the Command Map (`system/systemops/command-map.md`).

For help, type `/help` once initialized.