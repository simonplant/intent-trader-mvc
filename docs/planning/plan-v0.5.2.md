---
id: plan-v0.5.3
title: Intent Trader v0.5.3 – Trade Analysis & Execution Reflection
version: 0.5.3
status: planning
release: upcoming
category: trade-analysis
created: 2025-05-20
author: Intent Trader Team
tags: [trade-analysis, journaling, performance, bias-correction, learning]
---

# Intent Trader Plan v0.5.3 — Trade Analysis & Execution Reflection

## Purpose

This release focuses on answering a critical trader question: **"What am I doing wrong?"**

It delivers a system of tools and reflections that show how a trader can:
- See what should have happened (ideal plan → perfect trade execution)
- Compare that to what actually happened (own trades, missed opportunities)
- Identify patterns in decision errors, emotional bias, and setup misuse

## Milestone Objective

**"I can clearly see where I failed to act, acted poorly, or acted without edge — and I know what to do differently tomorrow."**

---

## Phase Scope: Trade Analysis System

### Inputs Required
- `system/state/trade-plan-state.json` — plan of record
- `system/state/my-positions.json` — actual user trades
- `system/state/moderator-positions.json` — optional benchmark trades

### Features to Build

#### 1. Perfect Trade Simulator
- [ ] Compute theoretical max profit from user plan using ideal entries and targets
- [ ] Simulate full-size entry at best valid trigger zone
- [ ] Track ROI, % hit rate, and ideal outcome by idea

#### 2. Execution Gap Analyzer
- [ ] Compare user's trades to the plan: what was missed, skipped, ignored?
- [ ] Detect sizing errors (e.g., under-sized, not scaled in, over-tiered early)
- [ ] Highlight trades that match analyst levels but fail execution rules

#### 3. Moderator Benchmark Tracker
- [ ] Overlay Inner Circle executions vs. user and plan
- [ ] Highlight timing differences, side preference, exits, runner logic
- [ ] Tag trades where user fought the call or missed both sides

#### 4. Behavioral Journaling System
- [ ] For every missed or mis-executed trade, ask “Why?”
- [ ] Auto-tag bias signals (bearish-only, tilt trades, revenge size)
- [ ] Log emotional overlays (fear of bounce, anchored in red, outcome aversion)

---

## Files & Schema Additions

| File | Purpose |
|------|---------|
| `system/state/perfect-execution.json` | Max profit outcome based on plan alone |
| `system/state/execution-gap-report.json` | Difference between plan, user, and mod trades |
| `system/state/journal-prompts.json` | Structured questions and emotional triggers |

---

## Future Use Cases
- Use behavioral logs to trigger coaching moments
- Score daily plan adherence and execution confidence
- Track repeat errors and run a heatmap of avoidable losses

---

## Priority
**High — this system is necessary to stop avoidable losses and accelerate real learning.**

It will be the first time the system gives the trader real visibility into how they sabotage performance — and how they can stop.