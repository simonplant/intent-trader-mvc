---
id: status-transitions
version: "1.0.0"
type: status
created: 2025-05-14T05:33:53.066362Z
updated: 2025-05-14T05:33:53.066362Z
cognitiveLoad: MEDIUM
requiresConfirmation: true
---

# Status Transition Rules

Defines valid transitions between trade statuses and associated triggers.

## Valid State Transitions

| From        | To           | Trigger                          |
|-------------|--------------|----------------------------------|
| WATCHING    | PENDING      | Price approaches entry + volume |
| PENDING     | ACTIVE       | Entry conditions met            |
| PENDING     | INVALIDATED  | Pattern or level fails          |
| ACTIVE      | COMPLETED    | Target or stop hit              |
| ACTIVE      | INVALIDATED  | Setup breakdown or reversal     |

## Actions Per Transition

- `WATCHING → PENDING`: Highlight and notify
- `PENDING → ACTIVE`: Open position, assign size
- `ACTIVE → COMPLETED`: Log result, close tracking
- `ACTIVE → INVALIDATED`: Alert + rationale
- `PENDING → INVALIDATED`: Remove from watchlist
