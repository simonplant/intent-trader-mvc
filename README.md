# Intent Trader v0.5.0

Schema-first, plugin-enabled trading assistant powered by OpenAI + Promptsmith runtime.

---

## Core Features

- Blueprint system for premarket plan generation
- Status tracking and chart pattern recognition
- Cognitive load management and reset triggers
- Postmarket analysis, execution review, and learning loop
- Modular plugin runtime architecture with dispatcher
- Full lifecycle simulation and test scaffolding

---

## Quickstart

To launch Intent Trader v0.5.0 inside ChatGPT:

1. Upload `intent-trader-v0.5.0-final.zip` to a new ChatGPT conversation
2. Paste the following prompt into the chat:

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

## Directory Structure

```
system/
├── schemas/             # All JSON schemas (blueprint, status, etc)
├── blueprints/          # Blueprint generation logic
├── status-tracking/     # Trade status logic
├── cognitive/           # Cognitive tracking and scoring
├── technical-framework/ # Chart + level analysis
├── learning/            # Replay engine + improvement logic
├── systemops/           # Plugin registry, dispatcher, entrypoint
├── templates/           # Prompt authoring templates

prompts/
├── premarket/
├── intraday/
├── postmarket/
├── system/

state/
└── session-manifest.json

logs/
├── trade-log.json
├── replay-summary.json
└── test-session-output.json

playbooks/
├── phase-map.md
├── plugin-system-quickstart.md
└── bootstrap-prompt.md
```

---

## Final Artifacts

- `intent-trader-v0.5.0-final.zip` — complete runnable system
- `/playbooks/bootstrap-prompt.md` — ChatGPT launch instructions
- `/tests/full-session-test.md` — simulated lifecycle test

---

## 📄 License

MIT (or insert preferred license)