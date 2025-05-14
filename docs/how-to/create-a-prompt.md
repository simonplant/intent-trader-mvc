# 🧠 How To: Create a New Prompt

Follow this flow to author schema-compliant prompts that integrate cleanly with the runtime system.

---

## 1. Copy the Scaffold

Start from:

```
system/templates/prompt-scaffold.md
```

It includes frontmatter for:
- `id`, `version`, `type`, `created`, `cognitiveLoad`, etc.

---

## 2. Define Inputs and Outputs

Each prompt should clearly define:
- Inputs required (e.g. trade setup, cognitive state, price level)
- Expected output shape (JSON or plain text)

---

## 3. Add a Test Vector

Use the `📤 Output Format` and `🧪 Test Input` sections to define one real use case.

---

## 4. Save to a Phase Folder

Choose the correct location:
- `prompts/premarket/`
- `prompts/intraday/`
- `prompts/postmarket/`
- `prompts/system/`

---

## 5. Validate It

Load it in ChatGPT and run a dry prompt. Check it aligns with:
- `metadata.schema.json`
- Related schemas like `status.schema.json` or `cognitive-load.schema.json`
