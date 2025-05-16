---
id: blueprint-structure
version: "1.0.0"
type: blueprint
created: 2025-05-14T05:06:19.454045Z
updated: 2025-05-14T05:06:19.454045Z
cognitiveLoad: LOW
requiresConfirmation: false
---

# 📐 Blueprint Structure Definition

This document defines the standard structure for a trading blueprint in the Intent Trader system.

## Sections

- `date`: Trading day date (YYYY-MM-DD)
- `marketContext`: Summary of premarket context and events
- `levels`: Key support/resistance levels and pivots
- `setups`: Trade setups with entry/stop/target definitions
- `scenarios`: Outcome scenarios (bullish, bearish, neutral)

Each section must conform to the `blueprint.schema.json` format and support metadata integration.

## Validation

This file is validated using: `system/schemas/metadata.schema.json`
