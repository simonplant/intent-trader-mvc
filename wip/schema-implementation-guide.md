---
missing front matter
---

Intent Trader Schema Implementation Guide (v0.5.2)

Purpose

This guide defines the process to refactor all existing prompt files, commands, and system objects to adopt the standardized data schemas defined in:
	•	Canonical schema: intent-trader-master-schema.json
	•	Runtime schema: trading-intent.runtime.json

⸻

Strategic Goals
	1.	Eliminate local schemas in prompt files
	2.	Enforce schema validation across all input/output
	3.	Enable full traceability and interoperability
	4.	Ensure LLM compatibility via runtime schema (≤ 3 levels)
	5.	Support system evolution through versioned schema design

⸻

Canonical Structure Requirements

Each core object (tradeIdea, tradePlan, tradePosition, marketFramework, etc.) must include:

Field	Type	Required	Notes
schemaVersion	string	✅	Always "0.5.2"
id	string	✅	Follows ID spec (idea-..., plan-...)
source	string	✅	One of: dp, mancini, manual, etc.
timestamp	ISO8601	✅	Creation timestamp in UTC
origin	object	⬜	Used to track lineage across pipelines

See schema-mapping.md for full mappings and classification inference logic ￼.

⸻

Prompt File Conversion Plan

1. File Updates

For each file (analyze-dp.md, create-plan.md, etc.):
	•	Update frontmatter:

requires: [
  "system/schemas/intent-trader-master-schema.json",
  "system/schemas/intent-trader-runtime-schema.json"
]
version: "0.5.2"


	•	Replace local structures with references to canonical schema
	•	Replace output formats with examples using canonical field names
	•	Flatten any overly nested JSON to runtime-compatible depth

⸻

2. Schema Reference Section

Add to each prompt file:

## Schema Reference

This component uses the Intent Trader canonical schema (v0.5.2) for all data structures. All objects must include:

- `schemaVersion`
- `id`
- `source`
- `timestamp`

For additional mappings and classifications, refer to:
	•	Schema Mapping Doc ￼
	•	Conversion Plan ￼

⸻

Schema Usage Patterns

Prompt	Type	Schema Object	Notes
/analyze-dp	analyzer	tradeIdea[]	Add origin.sourceCommand
/analyze-mancini	analyzer	tradeIdea[] + marketFramework + levelFramework
/create-plan	generator	tradePlan	Flatten nested plan objects
/status	monitor	tradePosition[]	Ensure status, exitDate, etc.
/log-session	recorder	sessionLog	Must include all DP/Mancini IDs
/convert	migrator	All	Rewrites legacy into schema-compliant format


⸻

Versioning Strategy
	•	Current: v0.5.2
	•	All schemas must include schemaVersion: "0.5.2"
	•	Future versions must increment based on:
	•	Breaking changes → 0.x+1.0
	•	Additive fields → patch version (e.g. 0.5.3)
	•	Minor refactors → minor version bump (e.g. 0.6.0)
	•	Historical objects must retain their schemaVersion

⸻

Validation & QA Workflow
	1.	Add inline validation logic for each command
	2.	Unit test every schema-producing prompt for:
	•	Required fields
	•	Enum integrity
	•	ISO date formatting
	•	No nesting > 3 levels (runtime)
	3.	Use the validation function in schema-mapping.md ￼as your starting point
	4.	Document all schema-breaking changes in changelog

⸻

Next Suggested Steps
	1.	Refactor prompt files
	•	Start with create-plan.md as canonical
	•	Then update analyze-dp.md and analyze-mancini.md
	2.	Update all commands and logging mechanisms
	3.	Add schema metadata and references to all outputs
	4.	Enable runtime validation
	•	Use AJV or Zod for validation in dev
	•	Lint against nesting limits for runtime schema
