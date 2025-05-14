---
id: blueprint-generation
version: "1.0.0"
type: blueprint
created: 2025-05-14T05:06:19.454045Z
updated: 2025-05-14T05:06:19.454045Z
cognitiveLoad: MEDIUM
requiresConfirmation: true
---

# ⚙️ Blueprint Generation Process

This component defines how a blueprint is constructed from daily inputs.

## Input Sources

- Overnight news, earnings, and premarket context
- Technical levels from chart and pattern analysis
- Cognitive state of the trader
- Previous blueprint and status states

## Generation Logic

1. Analyze market context and volatility
2. Rank key levels by significance
3. Identify setups with valid risk/reward
4. Generate 3 primary outcome scenarios
5. Tag setups by priority and complexity

## Output

Blueprint object saved to state as `blueprint-state.json`
