/review-execution-vs-plan

## Context
Today’s date: {{today}}
Trading session type: {{full | half | pre-holiday | post-holiday}}

## Inputs
- Upload or summarize the **Unified Trade Plan** (including DP/Mancini bias, setups, key levels, and positioning guidance)
- Upload or summarize the **actual trading execution**, including:
  - Moderator trade alerts
  - Personal trades or lack thereof
  - Market behavior and key level reactions

## Output
Please provide a structured markdown analysis that includes:

1. **Plan Summary**
   - Bias, levels, setups, and trade sizing guidance

2. **Market Action**
   - What actually happened? Did price respect the levels?
   - Any headline, macro, or sector surprises?

3. **Execution Review**
   - DP, Kira, Rickman actions – aligned or diverging from plan?
   - My execution – trades taken or avoided, and rationale
   - Was anything missed? Did any surprise trades emerge?

4. **Plan vs. Actual Table**
   | Element             | Plan                        | Actual                        | Result       |
   |---------------------|-----------------------------|-------------------------------|--------------|
   | Bias                | e.g. Bullish if 5262 holds  | Held above → bullish follow  |  Aligned   |
   | Key Levels          | Support 5232, Resist 5325   | Stayed rangebound 5250–5300  |  Partial   |
   | Trade Ideas         | Trim $TQQQ, no chases       | Trims followed; no adds      |  Confirmed |
   | Big Ideas           | None                        | None attempted                | Aligned   |
   | Personal Execution  | Stay flat                   | No trades taken               | Discipline|

5. **Takeaways**
   - What worked or didn’t
   - Notes to future self (e.g. patience, edge quality, caution signals)

6. **Optional Export**
   - Format as markdown log with `# Intent Trader Daily Log` heading
   - Use date-based filename: `log-YYYY-MM-DD.md`
