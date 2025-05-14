# 🧠 Intent Trader v0.5.0

Schema-first, plugin-enabled trading assistant powered by OpenAI + Promptsmith runtime.

## 🧩 Core Features

- 🔄 Blueprint system for premarket plan generation
- 📈 Status tracking and chart pattern recognition
- 🧠 Cognitive load management and reset triggers
- 📊 Postmarket analysis, execution review, and learning loop
- 🔌 Modular plugin runtime architecture with dispatcher
- ✅ Full lifecycle simulation and test scaffolding

## 🗂 Directory Structure

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
```

## 🚀 Quickstart

See [INSTALL.md](INSTALL.md) for setup, simulation, and test run instructions.

## 📄 License

MIT (or insert preferred license)
