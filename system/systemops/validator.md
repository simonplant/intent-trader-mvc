# Runtime Bootstrap Validator

This file defines the validation logic used to confirm that all required components of the Intent Trader system are present and correctly structured during initialization.

---

## Required Top-Level Files

- `README.md`
- `INSTALL.md` (optional but recommended)
- `state/session-manifest.json`
- `changelog.md` (optional but recommended)

## Required Directories and File Types

| Folder              | File Types         | Required? |
|---------------------|--------------------|-----------|
| `/system/`          | `.md`              | ✅ Yes    |
| `/prompts/`         | `.md`              | ✅ Yes    |
| `/docs/`            | `.md`              | ✅ Yes    |
| `/logs/`            | `.json`            | ✅ Yes    |
| `/system/schemas/`  | `.json`            | ✅ Yes    |
| `/tests/`           | `.md`, `.js`       | ✅ Yes    |

## Optional Extensibility (Allowed, Warn if Missing)

| Folder              | File Types         |
|---------------------|--------------------|
| `/examples/`        | `.md`, `.json`, `.yaml` |
| `/simulations/`     | `.md`, `.json`     |
| `/benchmarks/`      | `.json`, `.csv`    |
| `/archive/`         | Any (readonly)     |

## Ignored Files

- `.DS_Store`
- `.gitignore`
- `Thumbs.db`

## Error Conditions

| Check                            | Action               |
|----------------------------------|----------------------|
| Required file is missing         | Fail boot            |
| Unsupported file type            | Warn only            |
| Extra directory not mapped       | Warn only (log path) |
| Invalid JSON                     | Fail boot            |

---

## Usage

This file is not executed directly, but it defines the checks that must be performed during system initialization and bootstrap. Runtime Agent will enforce these rules and signal failure if any validation fails.

## Boot Result

- If all checks pass: `BOOT_SUCCESS`
- If any critical check fails: `BOOT_FAILURE`