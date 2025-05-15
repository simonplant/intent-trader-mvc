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

## Implementation Approach

I'm using a state-management workflow where:
1. The plan-for-today.md file is our master state document
2. Each component is implemented using a self-contained prompt from master-prompt-instructions.md
3. Implementations are created as artifacts
4. The state document is updated after each implementation
5. The implementation log is maintained to track progress

## Next Implementation Task

According to plan-for-today.md, our next task is to implement the Morning Call Processor (`/analyze-dp` command), which is the foundation of the PLAN phase. This component:
- Parses DP morning call transcripts
- Extracts market context, trade ideas, and key levels
- Classifies conviction levels of trade ideas
- Organizes information into a structured output

## Request

Please help me implement the Morning Call Processor using this prompt template from the master-prompt-instructions.md file:

[PASTE THE MORNING CALL PROCESSOR IMPLEMENTATION PROMPT HERE]

After generating the implementation, I'll save it to the appropriate file path, update the state document, and move to the next component.