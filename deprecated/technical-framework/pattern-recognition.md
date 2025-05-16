---
id: pattern-recognition
version: "1.0.0"
type: technical
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: LOW
requiresConfirmation: false
---

# Technical Pattern Recognition

Defines recognized patterns and their use in blueprint generation and scenario modeling.

## Supported Patterns

- Bull Flag / Bear Flag
- Cup and Handle
- Double Top / Bottom
- Ascending / Descending Triangle
- Gap Fill
- Failed Breakout / Breakdown

## Use in System

- Each pattern has:
  - `name`
  - `direction` (bullish/bearish)
  - `reliability` (1–10)
  - `trigger` (price/volume condition)

## Output

Pattern object used in:
- `morning-blueprint.md`
- `chart-analysis.md`
