# Intent Trader System

Intent Trader is a structured AI prompt system that supports the entire discretionary trading workflow. It synthesizes analyst commentary, technical levels, market context, and trade behavior into a unified, schema-bound command interface for full-session support.

---

## Project Goals

- Deliver a working MVP for full-session trading support
- Interpret and synthesize DP and Mancini insights
- Prepare a personalized and executable trade plan
- Manage positions and discipline in real time
- Debrief and learn from outcomes and behavioral patterns

---

## Cognitive Phases

This system is built on the lifecycle of an independent trader who consumes external inputs (analyst commentary) and executes with personal responsibility.

Plan → Focus → Execute → Manage → Review

| Phase     | Purpose                                                                 |
|-----------|-------------------------------------------------------------------------|
| Plan      | Analyze DP and Mancini content into a unified trade plan                |
| Focus     | Translate plan into alerts, charts, OCOs, and personal readiness         |
| Execute   | Validate and initiate entries based on sizing and plan alignment         |
| Manage    | Adjust stops, size, and runners in real time                             |
| Review    | Log trades, reflect, compare versus plan and analyst ideas               |

---

## Session Mapping

This framework overlays onto real-world trading hours:

- Pre-Market Session: Plan and Focus
  (Transcripts, newsletter parsing, chart preparation, alerts, preflight checklist)

- Open Market Session: Execute and Manage
  (Position entry, stop adjustments, trimming, core and runner management)

- Post-Market Session: Review
  (Trade logs, execution scoring, pattern recognition, journaling)

---

## Directory Structure

```
intent-trader/
├── docs/                     # System design, SOPs, rollout plans
├── prompts/
│   ├── premarket/            # Plan and focus commands and processors
│   ├── intraday/             # Execution and management prompts
│   ├── postmarket/           # Logging, review, debrief
│   └── utilities/            # Supporting commands and helpers
├── system/
│   ├── schemas/              # Structured JSON entities
│   ├── market-context/       # Mode, regime, macro info
│   ├── position-tracking/    # Size, stops, core-runner logic
│   ├── trade-analysis/       # Pattern detection, plan adherence
│   └── systemops/            # Command router, validator
└── logs/
    ├── trades/
    ├── positions/
    └── performance/
```

---

## MVP Scope (v0.5.1)

The v0.5.1 release delivers an end-to-end loop for:

- DP and Mancini parsing and plan generation
- Focus system for charts, alerts, OCOs, readiness
- Entry validation with sizing logic
- Core, runner, and stop tracking
- Execution logging and review scoring

---

## Testing

- Simulated inputs: historical transcripts, newsletters
- Prompt replay: `/create-plan`, `/validate-trade`, `/run-debrief`
- Output validation: plan structure, trade execution, review scoring

---

## Status

- Domain model complete and versioned
- Command structure fully defined and mapped
- Folder and file structure synchronized
- Processor prototyping in progress
- Schema and test harness scaffolding underway