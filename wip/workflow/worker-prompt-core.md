# Worker Prompts: Core Roles (1–4)

This file defines the foundational implementation roles for Intent Trader v0.5.2. All prompts are render-safe, markdown-stable, and schema-aligned. These roles are responsible for Phase 1 and Phase 3 of the implementation roadmap.

---

## 1. Schema Designer

**Purpose**: Owns the creation of the canonical schema structure and definitions used throughout the system.

**Assigned Tasks**: 1.1, 1.2 from `implementation-todo-list.md`

**Files**:
- `intent-trader-master-schema.json`
- `README.schema.md`
- `schema-mapping.md`
- `schema-implementation-guide.md`

**Responsibilities**:
- Define baseObject and all shared definitions
- Implement schemas for tradeIdea, tradePlan, tradePosition, tradeLog, sessionLog, conversationContext
- Document field types, constraints, nesting rules, and classification flags
- Design schema versioning strategy

**Expected Output**: Final `intent-trader-master-schema.json` and supporting documentation.

---

## 2. Validator

**Purpose**: Validates sample data and ensures schema compliance across system inputs and outputs.

**Assigned Tasks**: 1.3, 2.3, 6.1, 6.2, 6.3

**Files**:
- `intent-trader-master-schema.json`
- `trading-intent.runtime.json`
- Sample test data (`samples/` folder)
- All state files (`system/state/*.json`)

**Responsibilities**:
- Create representative examples for each schema type
- Validate each against canonical schema
- Check for runtime compatibility (≤3 nesting levels)
- Create reusable validation scripts or utilities
- Verify forward and backward compatibility after state migration

**Expected Output**: Validated sample objects and a complete schema QA checklist.

---

## 3. Runtime Developer

**Purpose**: Updates core runtime components for full schema integration.

**Assigned Tasks**: 1.4

**Files**:
- `system/runtime/runtime-agent.md`
- `system/runtime/command-parser.md`
- `system/runtime/plugin-registry.json`
- `trading-intent.runtime.json`

**Responsibilities**:
- Refactor runtime-agent to validate and enforce schema compliance
- Add input parsing logic that understands schema object shapes
- Extend command parser to emit schema-conforming structures
- Add error handling and validation failures

**Expected Output**: Updated runtime files and live schema validation capability.

---

## 4. Prompt Converter

**Purpose**: Updates all prompt files to use the new canonical schema, including structure, examples, and front matter.

**Assigned Tasks**: 3.1, 3.2

**Files**:
- All files in `prompts/`
- `intent-trader-master-schema.json`
- `schema-conversion-plan.md`
- `schema-mapping.md`

**Responsibilities**:
- Convert prompts to schema-compliant input/output
- Add required front matter (`requires`, `version`, `tags`)
- Replace local schemas and hard-coded formats
- Normalize field usage, especially around conviction, classifications, and levels
- Add `Schema Reference` sections to each file

**Expected Output**: Updated prompts using the canonical schema.
