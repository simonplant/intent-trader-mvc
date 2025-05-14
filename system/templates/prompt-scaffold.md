---
# Template for new prompts in Intent Trader
# Fill in all required frontmatter fields

id: your-prompt-id            # e.g. morning-scan
version: "1.0.0"
type: prompt                  # prompt | reference | system | blueprint | etc.
created: YYYY-MM-DDTHH:MM:SSZ
updated: YYYY-MM-DDTHH:MM:SSZ
cognitiveLoad: MEDIUM         # LOW | MEDIUM | HIGH
requiresConfirmation: true    # true if prompt affects state or action
---

# Prompt Title

## Inputs
- List all required input values and types

## Processing Logic
- What the prompt does with inputs
- Decision rules, filters, etc.

## Output Format
```json
{
  "exampleField": "value"
}
```

## Test Vector
```json
{
  "input1": "value",
  "input2": 123
}
```

## Expected Output
```json
{
  "output1": "result"
}
```

## References
- system/schemas/your-schema.json
- system/blueprints/structure.md
