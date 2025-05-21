# Runtime Agent

**Version:** 0.5.2
**Requires:** intent-trader-runtime-schema.json
**Tags:** runtime, schema, validation

## Purpose

The Runtime Agent is responsible for managing the schema validation, object references, and runtime state throughout the Intent Trader system. This agent ensures that all data structures conform to the runtime-optimized schemas for Claude compatibility.

## Schema Validation and Reference Management

The Runtime Agent performs the following tasks:

1. **Schema Validation**

   - Validates all objects against their runtime schema
   - Ensures maximum nesting depth of 3 levels
   - Rejects objects that violate schema constraints
   - Provides helpful error messages when validation fails

2. **Reference Management**

   - Maintains a registry of object references
   - Resolves references when objects are requested
   - Updates references when objects are modified
   - Handles reference integrity during state transitions

3. **Runtime Optimization**
   - Flattens deeply nested structures
   - Converts between master schema and runtime schema
   - Provides methods for working with reduced-complexity objects

## Runtime Schema Handling

### Object Reference Resolution

```javascript
// Example reference resolution logic
function resolveReferences(object, referenceType) {
  if (!object) return null;

  // Handle different reference types
  switch (referenceType) {
    case "marketFramework":
      return state.marketFrameworks[object.marketFrameworkId] || null;
    case "levelFramework":
      return state.levelFrameworks[object.levelFrameworkId] || null;
    case "tradeIdea":
      return object.tradeIdeaIds.map((id) => state.tradeIdeas[id] || null);
    default:
      return null;
  }
}

// Example usage
const plan = state.tradePlans["plan-20250520"];
const marketFramework = resolveReferences(plan, "marketFramework");
```

### Object Transformation

```javascript
// Converting master schema to runtime schema
function toRuntimeSchema(object, type) {
  if (!object) return null;

  switch (type) {
    case "tradePlan":
      return {
        // Base properties
        schemaVersion: object.schemaVersion,
        id: object.id,
        source: object.source,
        timestamp: object.timestamp,
        date: object.date,

        // Market framework fields
        bias: object.marketFramework?.bias || null,
        biasCondition: object.marketFramework?.biasCondition || null,
        mode: object.marketFramework?.mode || null,
        modeConfidence: object.marketFramework?.modeConfidence || null,
        marketCharacter: object.marketFramework?.character || null,

        // Level framework field
        keyDecisionPoint: object.levelFramework?.keyDecisionPoint || null,

        // References
        marketFrameworkId: object.marketFramework?.id || null,
        levelFrameworkId: object.levelFramework?.id || null,
        tradeIdeaIds: object.tradeIdeas?.map((idea) => idea.id) || [],

        // Simplified primary ideas
        primaryIdeas:
          object.tradeIdeas
            ?.filter((idea) => idea.category === "primary")
            ?.map((idea) => ({
              id: idea.id,
              symbol: idea.symbol,
              direction: idea.direction,
              convictionLevel: idea.conviction?.level || null,
              setup: idea.setup,
            })) || [],

        // Other fields
        scenarios: object.scenarioPlanning || [],
        accountSize: object.riskManagement?.accountSize || null,
        maxRiskPercent: object.riskManagement?.maxRiskPercent || null,
        dailyRiskAmount: object.riskManagement?.dailyRiskAmount || null,
        positionSizingStrategy: object.riskManagement?.positionSizing || null,
        stopPlacementStrategy: object.riskManagement?.stopPlacement || null,
        trailStrategy: object.riskManagement?.trailStrategy || null,

        // Metadata
        generatedFrom: object.metadata?.generatedFrom || [],
        originCommand: object.origin?.sourceCommand || null,
        createdBy: object.origin?.createdBy || null,
      };
    // Add other object types here
    default:
      return object;
  }
}

// Converting runtime schema back to master schema
function toMasterSchema(runtimeObject, type) {
  if (!runtimeObject) return null;

  // Implementation for converting back to master schema
  // ...
}
```

## Runtime Validation

The Runtime Agent performs the following validation checks:

1. **Schema Compliance**: Validates objects against their schema
2. **Nesting Depth**: Ensures maximum nesting depth of 3 levels
3. **Runtime Compatibility**: Checks field constraints for Claude compatibility
4. **Reference Integrity**: Ensures references point to valid objects

### Validation Implementation

```javascript
function validateRuntimeObject(object, type) {
  // Basic validation
  if (!object) return { valid: false, errors: ["Object is null or undefined"] };
  if (!object.schemaVersion)
    return { valid: false, errors: ["Missing schema version"] };
  if (object.schemaVersion !== "0.5.2")
    return { valid: false, errors: ["Invalid schema version"] };

  // Schema-specific validation
  switch (type) {
    case "tradePlan":
      return validateTradePlan(object);
    case "tradeIdea":
      return validateTradeIdea(object);
    // Add other types
    default:
      return { valid: false, errors: [`Unknown object type: ${type}`] };
  }
}

function validateTradePlan(plan) {
  const errors = [];

  // Required fields
  if (!plan.id) errors.push("Missing id");
  if (!plan.date) errors.push("Missing date");
  if (!plan.bias) errors.push("Missing bias");

  // Reference integrity
  if (
    plan.marketFrameworkId &&
    !state.marketFrameworks[plan.marketFrameworkId]
  ) {
    errors.push(`Invalid marketFrameworkId: ${plan.marketFrameworkId}`);
  }

  if (plan.levelFrameworkId && !state.levelFrameworks[plan.levelFrameworkId]) {
    errors.push(`Invalid levelFrameworkId: ${plan.levelFrameworkId}`);
  }

  // Validate tradeIdeaIds
  if (plan.tradeIdeaIds) {
    plan.tradeIdeaIds.forEach((ideaId) => {
      if (!state.tradeIdeas[ideaId]) {
        errors.push(`Invalid tradeIdeaId: ${ideaId}`);
      }
    });
  }

  // Nesting depth check for scenarios
  if (plan.scenarios) {
    const scenariosDepth = getObjectNestingDepth(plan.scenarios);
    if (scenariosDepth > 3) {
      errors.push(
        `Scenarios nesting depth (${scenariosDepth}) exceeds maximum (3)`
      );
    }
  }

  return { valid: errors.length === 0, errors };
}

// Utility to check nesting depth
function getObjectNestingDepth(obj, depth = 0) {
  if (!obj || typeof obj !== "object") return depth;

  return (
    1 +
    Math.max(
      0,
      ...Object.values(obj).map((value) => {
        if (Array.isArray(value)) {
          return Math.max(
            0,
            ...value.map((item) => getObjectNestingDepth(item, depth))
          );
        }
        return getObjectNestingDepth(value, depth);
      })
    )
  );
}
```

## Error Handling

The Runtime Agent provides detailed error messages for schema validation failures:

```javascript
function handleValidationError(validationResult, objectType, objectId) {
  if (validationResult.valid) return;

  const errorMessage =
    `Validation failed for ${objectType} (${objectId}):\n` +
    validationResult.errors.map((err) => `- ${err}`).join("\n");

  console.error(errorMessage);

  // Add to error log
  state.errors.push({
    timestamp: new Date().toISOString(),
    type: "validation",
    objectType,
    objectId,
    errors: validationResult.errors,
  });

  // Return formatted error
  return {
    status: "error",
    message: errorMessage,
    details: validationResult.errors,
  };
}
```

## Runtime API

The Runtime Agent exposes the following API for other components:

```javascript
const RuntimeAgent = {
  // Object management
  getObject: (type, id) => {
    /* ... */
  },
  createObject: (type, data) => {
    /* ... */
  },
  updateObject: (type, id, data) => {
    /* ... */
  },
  deleteObject: (type, id) => {
    /* ... */
  },

  // Validation
  validateObject: (type, data) => {
    /* ... */
  },

  // Schema conversion
  toRuntimeSchema: (object, type) => {
    /* ... */
  },
  toMasterSchema: (runtimeObject, type) => {
    /* ... */
  },

  // Reference management
  resolveReferences: (object, referenceType) => {
    /* ... */
  },
  updateReferences: (objectType, objectId) => {
    /* ... */
  },
};
```

## Integration with Command Parser

The Runtime Agent integrates with the Command Parser to validate and transform command outputs:

```javascript
// Example integration
function processCommand(command, args) {
  // Execute command logic
  const result = CommandParser.execute(command, args);

  // Validate and transform output
  if (result.objectType && result.data) {
    const validationResult = RuntimeAgent.validateObject(
      result.objectType,
      result.data
    );

    if (!validationResult.valid) {
      return handleValidationError(
        validationResult,
        result.objectType,
        result.data.id
      );
    }

    // Transform to runtime schema if needed
    if (result.needsTransform) {
      result.data = RuntimeAgent.toRuntimeSchema(
        result.data,
        result.objectType
      );
    }

    // Update state
    return RuntimeAgent.createObject(result.objectType, result.data);
  }

  return result;
}
```

### 🔧 Command Map Integrity Check (Strict Enumeration)

To verify the active commands during runtime init, apply the following logic:

```python
import re

def load_command_map(path):
    with open(path, 'r') as f:
        return [
            line.strip() for line in f
            if re.match(r'^/[a-zA-Z0-9_-]+$', line.strip())  # Valid command format
            and not line.strip().startswith(('#', '//', '<!--'))  # Not commented
        ]

commands = load_command_map('system/runtime/command-map.md')
print(f"Runtime initialized.\nValid commands: {len(commands)}\nCommands: {commands}")
```

## Implementation Notes

1. All components that produce schema objects must use the Runtime Agent for validation
2. The Runtime Agent automatically converts between master and runtime schemas
3. Reference integrity is maintained throughout object lifecycle
4. Maximum nesting depth of 3 levels is enforced for Claude compatibility
