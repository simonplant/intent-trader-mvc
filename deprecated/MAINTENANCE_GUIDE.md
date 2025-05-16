# Intent Trader Maintenance Guide

This guide outlines the critical places that must be updated and kept in sync whenever changes are made to the Intent Trader codebase. Follow this to ensure consistency, extensibility, and system stability.

---

## 🔁 Core Files That Must Stay in Sync

Whenever you update **bootstrap logic, file structure, or supported file types**, update all of the following locations:

### 1. `INSTALL.md`
- Ensure the bootstrap loading instructions are complete and extensible.
- Reflect new folders, file types, or exclusion logic.
- Update fallback and warning rules for untracked files.

### 2. `README.md`
- Synchronize bootstrap instructions with `INSTALL.md`.
- Add any new directories to the Directory Structure section.
- Maintain alignment of boot protocol and runtime routing.

### 3. `system/systemops/runtime-agent.md`
- Validate that all commands referenced in `command-map.md` are implemented.
- If a new command or routing behavior is introduced, document it here.

### 4. `system/systemops/command-map.md`
- Update this map if new commands, prompt groups, or systems are added.
- Keep command syntax examples current.

### 5. `state/session-manifest.json`
- When changing phases, routes, or session logic, ensure this is updated and reflects the new system state defaults.

---

## ✅ Validator Logic

If you change:
- Required file types
- Required directories
- Load rules

Then update or regenerate:
- `/systemops/validator.md`
- Bootstrap test files in `/tests/`

---

## 🧪 Tests

Update or add test cases in `/tests/`:
- Add regression tests for new prompt structures
- Add new unit tests for validators or routing logic
- Update any test plan `.md` files to reflect current flow

---

## 🚨 CI/Zip Coverage (Optional)

If using CI:
- Update the CI bootstrap validator
- Ensure new file/folder types are not skipped or flagged incorrectly
- Confirm integrity of future `.zip` packages for GitHub or deployment

---

## 🗃️ Archive Best Practices

- Deprecated files should be moved to `/archive/` or tagged clearly in commit messages.
- Never silently delete files — always deprecate with context.

---

## 🧠 Versioning and Tags

- Tag new stable versions when all above are aligned.
- Update `README.md` and `INSTALL.md` to reflect current version.

---

## 🔒 Final Check Before Commit

Before pushing any change:
1. Confirm that `README.md` and `INSTALL.md` are aligned
2. Run the validator and tests
3. Regenerate `.zip` for upload or commit
4. Ensure `MAINTENANCE_GUIDE.md` remains current

---

This guide ensures the Intent Trader system stays coherent, scalable, and cleanly maintainable.