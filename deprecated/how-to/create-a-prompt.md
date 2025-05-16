# How To: Create a New Prompt

This guide shows you how to create schema-compliant, versioned prompts that integrate into the Intent Trader system.

---

## 1. Copy the Scaffold

Start from:

```
system/templates/prompt-scaffold.md
```

This includes:
- Standardized front matter
- Prompt sections for inputs, outputs, and test vectors

---

## 2. Set Front Matter

Update the following fields:
- `id`: unique kebab-case identifier (e.g. `validate-trade-intent`)
- `title`: human-readable title
- `description`: what the prompt does
- `version`: start at `1.0.0`
- `release`: set to system version (e.g., `0.5.0`)
- `created` and `updated`: use today’s date
- `category`: `premarket`, `intraday`, `postmarket`, `system`, or `doc`
- `status`: usually `draft` or `stable`

---

## 3. Define Input and Output Format

Use JSON code blocks to show:
- What data the prompt expects
- What it should return (structured if possible)

---

## 4. Add a Test Vector

Create one realistic `Test Input` example:
- This should reflect a real scenario
- Useful when testing with AI or scripted runner

---

## 5. Link Related Files

At the bottom, include links to:
- Related prompts
- Any schemas (`blueprint.schema.json`, etc.)
- Dependencies (`command-map.md`, `runtime-agent.md`)

---

## 6. Save the Prompt

Use the correct destination:
- `prompts/premarket/`
- `prompts/intraday/`
- `prompts/postmarket/`
- `prompts/system/`

---

## 7. Validate the Prompt

Before using:
- Test it in ChatGPT using the test vector
- Ensure metadata fields are present and clean
- Check schema alignment if applicable

You’re now ready to use or register this prompt in the system.
