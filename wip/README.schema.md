# Intent Trader Schema Documentation

This directory defines the schema system for all data structures used in the Intent Trader system. It uses a dual-schema architecture to separate the needs of rich, internal modeling from lightweight, agent-facing interaction.

---

## 📘 Canonical Schema (`intent-trader.schema.master.json`)

The **canonical schema** is the authoritative source of truth for all trading-related data. It is used internally by the system for validation, documentation, authoring, and inter-object relationships.

- **File**: `intent-trader.schema.master.json`
- **Version**: `0.5.2`
- **Role**: Authoritative master schema (used by internal tools and workflows)
- **Depth**: May exceed 3 levels for proper object modeling
- **Metadata**: Includes `$id`, `$comment`, `schemaMetadata`, and enum descriptions
- **Use cases**:
  - Schema validation
  - Internal reasoning
  - Object lifecycle tracing
  - Prompt generation and diagnostics

---

## ⚡ Runtime Schema (`intent-trader.schema.runtime.json`)

The **runtime schema** is a derived, flattened version designed for consumption by LLM agents such as Claude or ChatGPT. It includes only essential fields and is optimized for token and context efficiency.

- **File**: `intent-trader.schema.runtime.json`
- **Version**: `0.5.2`
- **Role**: Flattened schema for AI runtime environments
- **Depth**: Max 3 nested levels (Claude-compatible)
- **Metadata**: Includes `$id`, `$comment`, `schemaMetadata`
- **Use cases**:
  - LLM-based trade planning and execution
  - Prompt context payloads
  - Lightweight mobile agent interfaces

---

## 🎯 Key Design Principles

- **Separation of concerns**: Internal complexity is retained in the master schema; external simplicity is prioritized in the runtime schema.
- **Single user focus**: Schemas are optimized for a single active trader using a local or AI-assisted system.
- **Boolean classifications**: Trade types, setups, and contexts are unambiguously represented as booleans (`isBreakout`, `isReversal`, etc.).
- **Consistent naming**: All fields use `camelCase` and structured names to ensure readability and ease of use.

---

## 🛠 Versioning & Synchronization

| Schema                   | Version | ID                                               | Source of Truth? |
|--------------------------|---------|--------------------------------------------------|------------------|
| `intent-trader.schema.master.json` | 0.5.2   | `https://schemas.intenttrader.ai/schema/master/v0.5.2` | ✅ Yes             |
| `intent-trader.schema.runtime.json`| 0.5.2   | `https://schemas.intenttrader.ai/schema/runtime/v0.5.2`| ❌ Derived         |

- All runtime schemas must be generated from the master schema via a deterministic transformation pipeline.
- Future schema versions will follow semantic versioning (`v0.5.2`, `v0.6.0`, etc.) and use changelogs to track field additions, removals, and semantic shifts.

---

## 📄 Changelog

### v0.5.2 (2025-05-20)
- Updated version numbers to 0.5.2
- Added detailed field descriptions to runtime schema
- Added missing classification fields to runtime schema (isEarningsPlay, isGapFill)
- Added schemaVersion defaults to master schema
- Added minimum value constraints to appropriate numeric fields
- Updated $id URLs to include version info
- Updated timestamp in schemaMetadata
- Improved consistency in property descriptions
- Introduced two-schema design (`master`, `runtime`)
- Added `$id`, `$comment`, and `schemaMetadata` fields
- Flattened runtime schema for LLM agents
- Canonical schema enriched with full enum descriptions and shared object definitions