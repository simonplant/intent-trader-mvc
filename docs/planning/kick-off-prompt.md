# Intent Trader Implementation Project

I'm implementing Intent Trader, an AI-assisted trading system that follows a cognitive workflow (Plan → Focus → Execute → Manage → Review) to help with day trading. I've already established the architecture, domain model, and implementation plan.

## Current Status

I have:
- A comprehensive domain model structured around the cognitive workflow phases
- A complete command catalog aligned to this workflow
- Detailed system architecture documentation
- A structured implementation plan (plan-for-today.md)
- Master prompt instructions for each component
- An implementation log template

## Implementation Progress

I've successfully completed:
- Morning Call Processor (`/analyze-dp` command) implementation, which extracts market context, focus trade ideas, and technical levels from DP morning call transcripts

## Implementation Approach

I'm using a state-management workflow where:
1. The plan-for-today.md file is our master state document
2. Each component is implemented using a self-contained prompt from master-prompt-instructions.md
3. Implementations are created as artifacts
4. The state document is updated after each implementation
5. The implementation log is maintained to track progress

## Next Implementation Task

According to plan-for-today.md, our next task is to implement the Conviction Classification System, which is a core component that:
- Recognizes language patterns indicating conviction levels
- Classifies phrases into high/medium/low conviction categories
- Assigns standardized conviction levels with confidence scores
- Handles DP-specific terminology and phrasing

This component will be used by the Morning Call Processor to accurately classify trade ideas by conviction level.

## Request

Please help me implement the Conviction Classification System using this prompt template from the master-prompt-instructions.md file:

[PASTE THE CONVICTION CLASSIFICATION IMPLEMENTATION PROMPT HERE]

After generating the implementation, I'll save it to the appropriate file path (`system/focus/conviction-classifier.md`), update the state document, and move to the next component.