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

## 🔄 Optional: Extensible Load Support

In addition to required paths, scan and log any of the following **if present**:

- Any other `.md`, `.json`, `.js`, `.yaml`, or `.yml` files in subfolders not explicitly listed
- New folders like `/examples/`, `/simulations/`, `/benchmarks/`, etc.

Use a fallback rule:
> “If file type is supported and not excluded, log it and notify the user to update the bootstrap.”

---

## 🧹 Ignore These During Load

Exclude common artifacts from the loading process:
- `.DS_Store`
- `.gitignore`
- `Thumbs.db`

---

## 🚦 Runtime Activation

Activate runtime and command routing via:

- **Routing Engine:** `system/systemops/runtime-agent.md`
- **Command Map:** `system/systemops/command-map.md`
- **Session Context:** `state/session-manifest.json`

---

## 🧠 Runtime Enforcement

- All commands **must** route via `runtime-agent.md`
- Use only patterns defined in `command-map.md`
- **Never assume or synthesize paths**
- Report any missing required files immediately

---

## ✅ Ready Check

Once complete, return:
```
Runtime initialized. Awaiting next instruction.
```

---

## 📌 Compatibility

This protocol supports **Intent Trader v0.5.0+** and is extensible for new folders, formats, and test types without requiring hardcoded updates.