---
title: Analyze Trade Plan vs. Execution  
description: Compares unified trade plan against actual trades, DP intent, and Mancini execution.  
tags: [postmarket, reconciliation, audit, journaling]  
author: Simon Plant  
last_updated: 2025-05-07  
version: 1.0  
category: postmarket  
usage: Run this after trading hours to compare your actual trading against the trade plan and moderator guidance.  
requires: [unified trade plan, trade log, optional: DP recap, Mancini recap]  
linked_outputs: [/logs/reconciliation/YYYY-MM-DD-analysis.md]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

# ANALYZE TRADE PLAN VS. EXECUTION

## 📥 INPUT PATHS

- Unified Trade Plan: `{{path_to_trade_plan}}`
- Daily Trade Log: `{{path_to_trade_log}}`
- Mancini Newsletter Recap: `{{path_to_mancini}}`
- Optional: Parsed DP recap/transcript (if available)

---

## ✅ TASKS

1. **Match planned trades** (ticker, direction, trigger, setup) against actual trades.
2. **Compare execution** vs. both DP’s stated intentions and Mancini’s plan and trades.
3. **Score each trade** for alignment (0–10), with commentary:
   - ✅ Perfect match
   - ❌ Missed planned setup
   - ⚠️ Unplanned trade or misaligned size/direction
4. **Identify missed opportunities** in dollar terms (especially Mancini setups).
5. **Output** reconciliation report as markdown for `/logs/reconciliation/{{date}}-analysis.md`.

---

## 🧠 RECONCILIATION LOGIC

### Setup Alignment Categories

- `perfect`: Executed as planned with proper size and trim
- `partial`: Taken but mistimed entry or exits
- `missed`: Setup triggered but not traded
- `emotional`: Trade outside of plan, size not justified

### Mancini ES Setup Evaluation

- Match plan setup: e.g., “Failed Breakdown of 5607”
- Confirm entry trigger (ES levels or SPX equivalent)
- Track trim levels and profit-taking behavior
- Calculate profit at $50/point per contract
- Score opportunity capture vs. plan

---

## 📊 OUTPUT TEMPLATE

```markdown
# Trade Plan vs. Execution Reconciliation — {{date}}

## TRADE ALIGNMENT SCORECARD

| Symbol | Planned? | Taken? | Score | Notes |
|--------|----------|--------|-------|-------|
| QQQ 475P | ✅ | ✅ | 7/10 | Entered late, trimmed early |
| TEM | ✅ | ❌ | 0/10 | Missed planned support bounce |
| NFLX Short | ✅ | ✅ | 8/10 | Timed well, trimmed fast |
| SPX FB 5607 | ✅ | ❌ | 0/10 | Missed Mancini core setup |

---

## MANCINI TRADE REVIEW

### Pre-FOMC Setup: Failed Breakdown 5607
- Entry: 5614
- Trims: 5635, 5650
- Runner: 5689
- Max Profit: ~$3,750/contract
- Alignment: ❌ Not taken

### FOMC Reaction Setup: FB 5611
- Entry: 5611
- Trims: 5620 → 5635
- Outcome: ~24 pts, $1,200/contract
- Alignment: ❌ Not taken

---

## MISSED OPPORTUNITY SUMMARY

- Missed ~$3,750 potential on FB of 5607 (per contract)
- Would translate to 5-10x on SPX options if converted

---

## FINAL THOUGHTS

- Adherence to DP’s macro guidance ✅
- Missed Mancini’s top setup ❌
- Post-FOMC execution was emotionally stable, tactical
- Improve speed of translation from Mancini levels to SPX options