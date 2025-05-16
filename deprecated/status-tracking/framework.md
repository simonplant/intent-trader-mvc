---
id: status-framework
version: "1.0.0"
type: status
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: LOW
requiresConfirmation: false
---

# Status Tracking Framework

This document defines the lifecycle categories and status logic for managing trade setups and active positions.

## Status Categories

- `WATCHING`: Setup identified, awaiting price action or volume trigger
- `PENDING`: Conditions close to triggering entry
- `ACTIVE`: Position entered, trade is live
- `COMPLETED`: Trade exited (target or stop hit)
- `INVALIDATED`: Setup failed or negated by market action

## Usage Principles

- Every setup must begin in `WATCHING`
- Transitions should only occur based on validated triggers
- Status updates must reference the blueprint `setupId`
- Status should inform prompts, visualization, and execution

## Related Schema

- `status.schema.json` (defines structure)
