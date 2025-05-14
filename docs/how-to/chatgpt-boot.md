# 💬 How To: Launch in ChatGPT Using intent-trader.zip

This guide walks you through running the Intent Trader system inside ChatGPT via ZIP upload.

---

## ✅ Step 1: Upload

Drag and drop `intent-trader.zip` into your ChatGPT thread.

---

## ✅ Step 2: Paste This Prompt

```
Please read and load ALL files from this ZIP archive.

Start with:
- README.md
- state/session-manifest.json

Then load:
- all .md files in /system/
- all .md files in /prompts/
- all .json files in /logs/ and /system/schemas/

Once loaded:
Use system/systemops/runtime-agent.md as the EXCLUSIVE routing layer for all future commands.
Use system/systemops/command-map.md to map valid commands and execution flows.
Use state/session-manifest.json to determine the current session phase and context.

I want to interact with my Intent Trader system inside this chat.
Respond only using the rules defined in runtime-agent.md
and route inputs using command-map.md.

Let’s begin.
```

---

## 🔁 Now You Can Say:

- `/run-phase intraday`
- `/status update`
- `/replay`
- or ask questions like:
  > “What trades did I miss today?”
