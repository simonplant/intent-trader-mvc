---
title: KB Update Recommendations – May 6, 2025  
description: Knowledge base updates based on today’s execution and behavior  
tags: [kb, system, update]  
author: Simon Plant  
last_updated: 2025-05-06  
version: 1.0  
category: log  
usage: Feed into behavior-kb.md and copilot-confirm.md  
status: proposed  
requires: []  
linked_outputs: [copilot-confirm, trading-behaviors]  
input_format: markdown  
output_format: markdown  
ai_enabled: true  
---

# KB UPDATES – Tuesday, May 6, 2025

## Additions to Behavior KB

### impulse-entry
New criteria:
- Entries triggered by headline momentum not in premarket plan
- 0DTE trades without confirmation bar or level break

### mod-capitulation exit
New cue:
- If all 3 mods exit same trade, automatic downgrade to tier-zero unless you see technical reversal confirmation

### QQQ swing structure
Updated:
- Treat 475/480 as tactical levels with flexibility for tier-based consolidation
- Match strikes with mod positioning where practical

## Copilot Adjustments
- Add filter to throttle 0DTE exposure to no more than 1/3 position risk unless in high-probability flush setup
- Add rule: If trade is mod-aligned and high conviction, do not layer multiple expiries unless swing + scalp is planned