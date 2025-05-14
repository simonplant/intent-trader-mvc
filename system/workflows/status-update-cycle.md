---
id: status-update-cycle
version: "1.0.0"
type: workflow
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: MEDIUM
requiresConfirmation: true
---

# 🔃 Status Update Cycle

This file outlines when and how status updates should be processed during market hours.

## Update Triggers

- **On Market Open (6:30 AM PT)**:
  - Reset all overnight setups to `WATCHING`
  - Load current blueprint

- **Every 15 Minutes**:
  - Reassess setups marked as `PENDING`
  - Look for entries to move into `ACTIVE`

- **On Entry/Exit Events**:
  - Immediate transition to `ACTIVE` or `COMPLETED`
  - Log transition reason and timestamp

- **Midday Check (11:00 AM PT)**:
  - Reevaluate all `ACTIVE` and `PENDING` statuses
  - Update or invalidate stale setups

- **On News Event**:
  - Interrupt cycle, trigger forced reassessment

## Integration

- Feeds into:
  - `status-update.md`
  - `cognitive-reset.md`
  - `blueprint-update.md`
