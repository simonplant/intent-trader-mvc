# Field Mapping Document for Schema Migration

This document details the mapping between the existing state files and the canonical schema structure, highlighting field transformations, conversions, and special handling requirements.

## 1. trade-plan-state.json Mapping

The current `trade-plan-state.json` contains a nested structure with a top-level `tradePlan` object. This will be flattened and transformed to match the canonical schema.

### Base Object Fields (Required for All Objects)

These fields will be added to all canonical schema objects:

| Canonical Field | Source | Transformation |
|----------------|--------|----------------|
| `schemaVersion` | N/A | Hard-coded to "0.5.2" |
| `id` | Generated | Format: `plan-YYYYMMDD` from `tradePlan.date` |
| `source` | N/A | Set to "system" for migrated data |
| `timestamp` | `tradePlan.timestamp` | If missing, use current date-time in ISO 8601 format |
| `origin` | N/A | New object with `sourceCommand: "/migrate-schema", createdBy: "schema-migrator"` |

### TradePlan Object Mapping

| Canonical Field | Legacy Field | Transformation |
|----------------|--------------|----------------|
| `date` | `tradePlan.date` | Direct mapping |
| `marketFramework` | `tradePlan.marketFramework` | Transform to canonical object with its own ID |
| `levelFramework` | `tradePlan.levelFramework` | Transform to canonical object with its own ID |
| `tradeIdeas` | `tradePlan.tradeIdeas` | Transform each idea to canonical format |
| `scenarioPlanning` | `tradePlan.scenarioPlanning` | Transform to array of canonical scenario objects |
| `riskManagement` | `tradePlan.riskManagement` | Transform to canonical risk management object |
| `metadata` | `tradePlan.metadata` | Transform to canonical metadata object |

### MarketFramework Mapping

| Canonical Field | Legacy Field | Transformation |
|----------------|--------------|----------------|
| `bias` | `marketFramework.bias` | Direct mapping (validate against enum) |
| `biasCondition` | `marketFramework.biasCondition` | Direct mapping |
| `mode` | `marketFramework.mode` | Direct mapping (validate against enum) |
| `modeConfidence` | `marketFramework.modeConfidence` | Direct mapping |
| `character` | `marketFramework.character` | Direct mapping |
| `catalysts` | `marketFramework.catalysts` | Ensure array format |
| `keyMovers` | `marketFramework.keyMovers` | Transform to canonical format (add required fields) |

### LevelFramework Mapping

| Canonical Field | Legacy Field | Transformation |
|----------------|--------------|----------------|
| `indices.es.support` | `levelFramework.indices.es.support` | Transform each level object: `level` → `price`, `consensus` → `strength` |
| `indices.es.resistance` | `levelFramework.indices.es.resistance` | Transform each level object |
| `indices.spx.support` | `levelFramework.indices.spx.support` | Transform each level object |
| `indices.spx.resistance` | `levelFramework.indices.spx.resistance` | Transform each level object |
| `stocks` | `levelFramework.stocks` | Convert from object to array, transform properties |
| `zones` | N/A | New empty array (no direct source) |
| `keyDecisionPoint` | N/A | Set to null (no direct source) |

### TradeIdea Mapping

Each trade idea from `primary`, `secondary`, and `watchlist` arrays will be consolidated into a single `tradeIdeas` array with proper canonical structure:

| Canonical Field | Legacy Field | Transformation |
|----------------|--------------|----------------|
| `symbol` | `ticker` | Direct mapping |
| `direction` | `direction` | Convert to lowercase, validate against enum |
| `conviction` | `conviction` | Convert string to object with `level` and `phrases` |
| `entryParameters.zone` | `entry.min`, `entry.max` | Create zone object with min/max values |
| `entryParameters.condition` | `entry.condition` | Direct mapping |
| `entryParameters.strategy` | N/A | Default to "limit" |
| `exitParameters.stopLoss` | `risk.stop` | Direct mapping |
| `exitParameters.target` | `targets[0].price` | Map first target price |
| `exitParameters.strategy` | `management` | Direct mapping |
| `exitParameters.trimLevels` | `targets` | Transform to array of `{price, percentage}` objects |
| `rationale` | `technicalContext` | Direct mapping |
| `tradeDuration` | `tradeType` | Map to canonical duration ("day", "swing", etc.) |
| `setup` | `tradeType` | Derive from trade type or defaulted |
| `status` | N/A | Default to "active" |
| `confirmationStatus` | N/A | Default to "unconfirmed" |
| `classifications.*` | Various | Extract boolean flags from text fields |
| `positionSizing.recommendation` | `risk.riskAllocation` | Map allocation to canonical sizing values |
| `priority` | Category | `primary` → 1, `secondary` → 2, `watchlist` → 3 |
| `category` | Category | Direct mapping from source array |
| `isFavorite` | `conviction` | True if conviction is "high" |

### Special Transformations for TradeIdeas

1. **Classification Conversion**: 
   - Convert subjective text classifications into clear boolean flags
   - Extract pattern types (breakout, reversal, etc.) from description fields
   - Parse `tradeType` for specific classifications (day-after-trade, etc.)

2. **Position Sizing**:
   - Convert numeric `riskAllocation` to string recommendations
   - Map: ≥1.0 → "full", ≥0.75 → "half", ≥0.5 → "third", ≥0.25 → "quarter", else → "small"

3. **Risk Calculation**:
   - Calculate `plannedRMultiple` from stop and target percentages where available

## 2. my-positions.json Mapping

The current `my-positions.json` file contains an array of position objects that need to be transformed to match the canonical `tradePosition` schema.

### Base Object Fields (Added to All Position Objects)

| Canonical Field | Source | Transformation |
|----------------|--------|----------------|
| `schemaVersion` | N/A | Hard-coded to "0.5.2" |
| `id` | `id` or generated | Use existing ID or generate format: `pos-SYMBOL-YYYYMMDD` |
| `source` | N/A | Set to "manual" for user positions |
| `timestamp` | Current time | Generate ISO 8601 format timestamp |
| `origin` | N/A | New object with migration source info |

### TradePosition Mapping

| Canonical Field | Legacy Field | Transformation |
|----------------|--------------|----------------|
| `symbol` | `symbol` | Extract base symbol from potentially complex option symbols |
| `direction` | `direction` | Convert to lowercase, validate against enum |
| `entry.price` | `entry.price` | Direct mapping |
| `entry.date` | `entry.time` | Convert ISO timestamp to date string |
| `entry.shares` | `size.initial`, `size.unit` | Map if unit is "shares" |
| `entry.contracts` | `size.initial`, `size.unit` | Map if unit is "contracts" |
| `stop` | `risk.stop` | Direct mapping, may be null |
| `target` | N/A | Set to null (no direct source) |
| `setup` | N/A | Set to empty string (no direct source) |
| `status` | `status` | Map: "active" → "open", "closed" → "closed", etc. |
| `exitDate` | N/A | Set to null (no direct source) |
| `exitPrice` | N/A | Set to null (no direct source) |
| `profit` | N/A | Initialize empty profit object |
| `notes` | `notes` | Direct mapping |
| `conviction` | N/A | Default to `{ level: "medium" }` |
| `classifications.*` | `trade_type`, `notes` | Extract boolean flags from text fields |
| `isRunner` | N/A | Default to false |
| `isCorePosition` | `trade_type` | True if trade_type is "swing" |

### Special Handling for Position Classification

1. **Trade Type Interpretation**:
   - `trade_type: "day"` → `isRangePlay: true`
   - `trade_type: "swing"` → `isTrendFollow: true`

2. **Notes Text Analysis**:
   - Extract key pattern types mentioned in notes (breakout, reversal, etc.)
   - Flag positions accordingly

3. **Complex Symbol Parsing**:
   - Handle option symbols like "SPX 22-May-25 5870P" by extracting base symbol
   - Preserve contract details in notes field

## 3. Validation Requirements

Both migration utilities will include:

1. **Schema Validation**: 
   - Validate all objects against canonical schema definitions
   - Verify required fields are present and properly formatted
   - Check enum values match allowed options

2. **Rollback Capability**:
   - Create backups of original files before transformation
   - Restore from backup if validation fails
   - Maintain file integrity at all times

3. **Logging**:
   - Track all field transformations
   - Log validation errors with field specifics
   - Create detailed audit trail of migration process

4. **Idempotency**:
   - Recognize already-migrated files
   - Safely re-run migration without duplicating data
   - Add metadata to track migration status

## 4. Test Cases

The migration utilities should be tested with:

1. **Standard Data**:
   - Complete trade plan with all sections
   - Multiple positions of different types

2. **Edge Cases**:
   - Empty arrays/objects
   - Missing optional fields
   - Unexpected field values

3. **Validation Tests**:
   - Verify all required fields are populated
   - Check data types match schema requirements
   - Confirm enum values are properly constrained

4. **Rollback Tests**:
   - Force validation failures to test rollback
   - Verify file integrity after rollback

## 5. Backward Compatibility

The migration utilities maintain backward compatibility by:

1. Preserving all existing data values and content
2. Mapping fields directly where possible
3. Adding required schema fields without altering existing data
4. Ensuring migrated files work with runtime components
