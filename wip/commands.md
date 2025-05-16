---
id: commands
title: Intent Trader System Commands
description: Quick reference for available system commands
author: Intent Trader Team
version: 0.1.0
release: 0.5.1
created: 2025-05-16
updated: 2025-05-16
category: system
status: stable
tags: [system, commands, help]
requires: []
outputs: []
input_format: none
output_format: markdown
ai_enabled: false
---

# Intent Trader Commands

## Available Commands

Intent Trader organizes commands according to the cognitive workflow:
Plan → Focus → Execute → Manage → Review

### PLAN Phase
- `/analyze-dp [transcript]` - Process DP morning call
- `/create-plan` - Generate unified trade plan

### FOCUS Phase
- `/extract-focus dp [min_conviction]` - Extract high-conviction ideas
- `/extract-levels dp [indices]` - Extract key technical levels

### EXECUTE Phase
- `/add-position [symbol]` - Track new position
- `/size-position [symbol]` - Calculate position size
- `/list-positions` - Show current positions

### MANAGE Phase
- `/update-position [symbol]` - Update position details
- `/close-position [symbol]` - Close position and record outcome

### REVIEW Phase
- `/log-session [date]` - Record complete session data

### SYSTEM
- `/help [command]` - Show available commands or help for specific command
- `/status` - Show current trading session state

## Command Usage Examples

```
# Morning preparation
/analyze-dp "Good morning traders. Today we're looking at a market that..."
/create-plan
/extract-focus dp high
/extract-levels dp SPX,NDX

# Trade execution
/size-position AAPL entry=182.50 stop=180.25 risk_amount=500
/add-position AAPL entry_price=182.50 stop_price=180.25 target_price=187.50

# Position management
/list-positions
/update-position AAPL current_price=184.75 stop_price=182.50
/close-position AAPL exit_price=187.25 exit_type=target

# End of day
/log-session
```

## Detailed Documentation

For comprehensive command documentation, refer to:
- `docs/command-reference.md` - Complete command reference with all parameters
- `docs/system-architecture.md` - System architecture and component relationships
