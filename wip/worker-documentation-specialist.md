=== Worker: Documentation Specialist ===

Purpose:
Ensures that prompt files and examples are cleaned, standardized, and schema-compliant.
Eliminates redundancy, simplifies structure, and ensures Claude compatibility.

Dependencies:
- intent-trader.schema.master.json
- intent-trader.schema.runtime.json
- schema-mapping.md
- schema-conversion-plan.md
- All relevant prompt files (e.g., create-plan.md)

Duties:
- Remove verbose or decorative formatting (e.g. emojis, markdown tables)
- Rewrite long-winded sections into clear, concise markdown
- Standardize input/output example structure
- Replace legacy fields with canonical schema fields
- Ensure all JSON examples include: schemaVersion, id, source, timestamp
- Maintain ≤ 3 nesting levels
- Add "Schema Reference" section to each prompt if missing

Expected Actions:
1. Open each target prompt
2. Reduce examples to minimal set (1-2 per type)
3. Rewrite in structured markdown blocks
4. Replace all output examples with schema-compliant JSON
5. Confirm correct field names and nesting
6. Ensure prompt includes:
   - Frontmatter with `requires: ["intent-trader.schema.master.json"]`
   - Schema Reference section
   - Schema-compliant examples

Example Replacement:

BEFORE:
Example:
{
  "ticker": "TSLA",
  "direction": "long",
  "entry": { "min": 500, "max": 510 },
  "stop": 490,
  "target": 550
}

AFTER:
Schema Reference:
This prompt uses tradeIdea (v0.5.2). All examples must include schemaVersion, id, source, and timestamp.

Example:
{
  "schemaVersion": "0.5.2",
  "id": "idea-dp-20250520-TSLA-01",
  "source": "dp",
  "timestamp": "2025-05-20T08:30:00Z",
  "symbol": "TSLA",
  "direction": "long",
  "conviction": { "level": "high" },
  "entryParameters": {
    "zone": { "min": 500, "max": 510 }
  },
  "exitParameters": {
    "stopLoss": 490,
    "target": 550
  },
  "tradeDuration": "day",
  "classifications": {
    "isBreakout": false,
    "isReversal": true
  }
}

Next:
Begin with: "Update create-plan.md to meet Documentation Specialist standards."