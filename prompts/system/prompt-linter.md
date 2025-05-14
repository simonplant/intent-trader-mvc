---
id: prompt-linter
version: "1.0.0"
type: system
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: MEDIUM
requiresConfirmation: true
---

# Prompt Metadata Linter

Checks prompt files for missing required metadata and schema violations.

## Input:
- Single prompt file's frontmatter
- Path to file

## Output:
- List of missing fields
- Validation errors if applicable

## Test Input:
```json
{
  "file": "prompts/intraday/status-update.md",
  "frontmatter": {
    "id": "status-update",
    "type": "prompt",
    "created": "2025-05-13T05:00:00Z"
  }
}
```

## Expected Output:
```json
{
  "file": "prompts/intraday/status-update.md",
  "errors": [
    "Missing required field: version",
    "Missing required field: updated",
    "Missing required field: cognitiveLoad",
    "Missing required field: requiresConfirmation"
  ]
}
```

## References
- `system/schemas/metadata.schema.json`
