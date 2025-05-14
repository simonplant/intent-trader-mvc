# Intent Trader Developer Guide

This guide is for contributors and maintainers of the Intent Trader codebase. It outlines how to safely update the system, test changes, and ensure consistency.

---

## 🔁 Core Principles

- All bootstrap, routing, and prompt logic must be kept in sync.
- Changes must be reflected across `README.md`, `INSTALL.md`, `validator.md`, and `command-map.md`.
- Never add files without updating the bootstrap validator and load sequence.

---

## 🧪 Testing Workflow

1. Update or create prompts, agents, or schemas.
2. Write test specs under `/tests/`:
   - `.md` for documentation
   - `.js` for executable test logic
3. Run full bootstrap and validate:
   - All required files load
   - Validator passes
   - No warnings for missing or unsupported types

---

## 📦 Packaging

- Create a zip file with the base folder `intent-trader/` at the root.
- Confirm structure using validator.
- Use consistent versioning (e.g., `v0.5.1` for patches).

---

## 🧠 Resources

- `docs/MAINTENANCE_GUIDE.md`: Full checklist before commit
- `system/systemops/validator.md`: Load + structure rules
- `system/systemops/runtime-agent.md`: Routing logic
- `state/session-manifest.json`: Controls session phase and system context