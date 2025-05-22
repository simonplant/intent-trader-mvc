# Command Parser

**Version:** 0.5.2  
**Requires:** intent-trader-runtime-schema.json, runtime-agent.md  
**Tags:** runtime, commands, schema

## Purpose
The Command Parser processes user commands and converts them to schema-compliant objects. It integrates with the Runtime Agent to ensure all command outputs comply with schema constraints and adhere to the 3-level nesting limit.

## Command Processing Pipeline

The Command Parser follows this pipeline for processing commands:

1. **Parse Command**: Extract command name and arguments
2. **Route Command**: Direct to appropriate handler
3. **Execute Handler**: Run command-specific logic
4. **Transform Output**: Convert to runtime schema representation
5. **Validate Schema**: Ensure schema compliance
6. **Emit Result**: Return the validated schema object

## Schema-Aware Command Handlers

Each command handler is designed to produce schema-compliant output:

### Create Plan Command
```javascript
function handleCreatePlan(args) {
  // Extract command arguments
  const { date = getCurrentDateString() } = args;
  
  // Generate a unique ID
  const planId = `plan-${date.replace(/-/g, '')}`;
  
  // Create market framework
  const marketFrameworkId = createMarketFramework(date);
  
  // Create level framework
  const levelFrameworkId = createLevelFramework(date);
  
  // Create the plan object directly in runtime schema format
  const tradePlan = {
    schemaVersion: "0.5.2",
    id: planId,
    source: "system",
    timestamp: new Date().toISOString(),
    date: date,
    
    // Market framework top-level fields with defaults
    bias: "neutral",
    biasCondition: null,
    mode: "auto",
    modeConfidence: 50,
    marketCharacter: null,
    
    // Level framework top-level fields with defaults
    keyDecisionPoint: null,
    
    // References
    marketFrameworkId: marketFrameworkId,
    levelFrameworkId: levelFrameworkId,
    tradeIdeaIds: [],
    primaryIdeas: [],
    
    // Empty arrays/objects for other sections
    scenarios: [],
    
    // Metadata
    originCommand: "/create-plan",
    createdBy: "command-parser",
    generatedFrom: []
  };
  
  // Return the object with type information for the Runtime Agent
  return {
    status: "success",
    objectType: "tradePlan",
    data: tradePlan,
    message: `Created trade plan for ${date}`,
    id: planId
  };
}
```

### Analyze DP Command
```javascript
function handleAnalyzeDP(args) {
  // Extract command arguments
  const { date = getCurrentDateString() } = args;
  
  // Create a market framework from DP analysis
  const marketFrameworkId = createMarketFrameworkFromDP(date);
  
  // Create trade ideas from DP analysis
  const tradeIdeaIds = createTradeIdeasFromDP(date);
  
  // Get current plan or create new one
  const planId = `plan-${date.replace(/-/g, '')}`;
  const currentPlan = RuntimeAgent.getObject("tradePlan", planId);
  
  if (currentPlan) {
    // Update existing plan (using runtime schema format)
    const updatedPlan = {
      ...currentPlan,
      marketFrameworkId,
      tradeIdeaIds: [...currentPlan.tradeIdeaIds, ...tradeIdeaIds],
      // Update bias and other fields from DP analysis
      bias: getDPBias(),
      mode: getDPMode(),
      modeConfidence: getDPModeConfidence(),
      // Update metadata
      generatedFrom: [...currentPlan.generatedFrom, `dp-analysis-${date.replace(/-/g, '')}`]
    };
    
    return {
      status: "success",
      objectType: "tradePlan",
      data: updatedPlan,
      message: `Updated trade plan for ${date} with DP analysis`,
      id: planId
    };
  } else {
    // Create a new plan
    return handleCreatePlan({
      date,
      marketFrameworkId,
      tradeIdeaIds
    });
  }
}
```

### Add Trade Idea Command
```javascript
function handleAddTradeIdea(args) {
  // Extract command arguments
  const { symbol, direction, conviction, entryZoneMin, entryZoneMax, stopLoss, target } = args;
  
  // Get the current date
  const date = getCurrentDateString();
  
  // Generate a unique ID for the idea
  const ideaId = `idea-manual-${date.replace(/-/g, '')}-${symbol}-${getNextIdeaIndex(symbol, date)}`;
  
  // Create a trade idea object directly in runtime schema format
  const tradeIdea = {
    schemaVersion: "0.5.2",
    id: ideaId,
    source: "manual",
    timestamp: new Date().toISOString(),
    symbol,
    direction,
    conviction: {
      level: conviction || "medium",
      phrases: []
    },
    // Flattened entry parameters
    entryZoneMin: entryZoneMin,
    entryZoneMax: entryZoneMax,
    entryCondition: null,
    entryStrategy: "limit",
    // Flattened exit parameters
    stopLoss: stopLoss,
    target: target,
    exitStrategy: null,
    trimLevels: [],
    
    // Other fields
    rationale: null,
    tradeDuration: "day",
    setup: null,
    status: "active",
    confirmationStatus: "unconfirmed",
    
    // Classification flags
    isBreakout: false,
    isReversal: false,
    isFlagPattern: false,
    isFailedBreakdown: false,
    isEarningsPlay: false,
    isDayAfterTrade: false,
    isTrendFollow: false,
    isRangePlay: false,
    isGapFill: false,
    isMomentumPlay: false,
    
    // Other fields
    positionSizing: "quarter",
    sizingRationale: null,
    plannedRMultiple: (target - entryZoneMax) / (entryZoneMax - stopLoss),
    priority: 3,
    category: "secondary",
    frequency: null,
    isFavorite: false,
    
    // Origin fields
    originCommand: "/add-trade-idea",
    createdBy: "command-parser"
  };
  
  // Add to current plan if it exists
  const planId = `plan-${date.replace(/-/g, '')}`;
  const currentPlan = RuntimeAgent.getObject("tradePlan", planId);
  
  if (currentPlan) {
    // Update the plan with the new idea ID
    const updatedPlan = {
      ...currentPlan,
      tradeIdeaIds: [...currentPlan.tradeIdeaIds, ideaId]
    };
    
    // Recalculate primary ideas
    updatedPlan.primaryIdeas = updatedPlan.tradeIdeaIds
      .map(id => RuntimeAgent.getObject("tradeIdea", id))
      .filter(idea => idea && (idea.category === "primary" || idea.conviction.level === "focus-trade"))
      .map(idea => ({
        id: idea.id,
        symbol: idea.symbol,
        direction: idea.direction,
        convictionLevel: idea.conviction.level,
        setup: idea.setup
      }));
    
    // Update the plan
    RuntimeAgent.updateObject("tradePlan", planId, updatedPlan);
  }
  
  // Return the trade idea
  return {
    status: "success",
    objectType: "tradeIdea",
    data: tradeIdea,
    message: `Added ${direction} trade idea for ${symbol}`,
    id: ideaId
  };
}
```

## Schema-Compliant Command Output

All commands ensure their output adheres to the flattened schema constraints:

1. **Object Flattening**: Deep objects are flattened to no more than 3 levels
2. **Reference Management**: Objects reference each other by ID rather than embedding
3. **Field Restructuring**: Nested fields are moved to the top level where appropriate
4. **Runtime Validation**: All outputs are validated against runtime schema

## Schema Reference Field Mapping

The Command Parser maintains mappings between master schema and runtime schema fields:

```javascript
const schemaFieldMappings = {
  tradePlan: {
    // Market framework field mapping
    "marketFramework.bias": "bias",
    "marketFramework.biasCondition": "biasCondition",
    "marketFramework.mode": "mode",
    "marketFramework.modeConfidence": "modeConfidence",
    "marketFramework.character": "marketCharacter",
    // Level framework field mapping
    "levelFramework.keyDecisionPoint": "keyDecisionPoint",
    // Risk management field mapping
    "riskManagement.accountSize": "accountSize",
    "riskManagement.maxRiskPercent": "maxRiskPercent",
    "riskManagement.dailyRiskAmount": "dailyRiskAmount",
    "riskManagement.positionSizing": "positionSizingStrategy",
    "riskManagement.stopPlacement": "stopPlacementStrategy",
    "riskManagement.trailStrategy": "trailStrategy",
    // Scenario field mapping
    "scenarioPlanning": "scenarios"
  },
  tradeIdea: {
    // Entry parameters field mapping 
    "entryParameters.zone.min": "entryZoneMin",
    "entryParameters.zone.max": "entryZoneMax",
    "entryParameters.condition": "entryCondition",
    "entryParameters.strategy": "entryStrategy",
    // Exit parameters field mapping
    "exitParameters.stopLoss": "stopLoss",
    "exitParameters.target": "target",
    "exitParameters.strategy": "exitStrategy",
    // Classification field mapping
    "classifications.isBreakout": "isBreakout",
    "classifications.isReversal": "isReversal",
    // etc. for all classification fields
    // Position sizing field mapping
    "positionSizing.recommendation": "positionSizing",
    "positionSizing.reasoning": "sizingRationale",
    // Risk field mapping
    "risk.plannedRMultiple": "plannedRMultiple"
  }
};
```

## Command Expansion

The Command Parser processes shorthand commands and expands them to full schema objects:

```javascript
function expandCommand(commandText) {
  // Handle shorthand commands
  if (commandText.startsWith("$")) {
    // Stock symbol shorthand
    const match = commandText.match(/\$([A-Z]+)\s+(long|short)(?:\s+(.+))?/i);
    if (match) {
      const [_, symbol, direction, args] = match;
      
      // Parse additional arguments
      const parsedArgs = args ? parseArgString(args) : {};
      
      return {
        command: "add-trade-idea",
        args: {
          symbol,
          direction: direction.toLowerCase(),
          ...parsedArgs
        }
      };
    }
  }
  
  // Handle regular commands
  if (commandText.startsWith("/")) {
    const parts = commandText.slice(1).split(" ");
    const command = parts[0];
    const argString = parts.slice(1).join(" ");
    const args = parseArgString(argString);
    
    return { command, args };
  }
  
  // Handle natural language (requires intent detection)
  return detectCommandIntent(commandText);
}

function parseArgString(argString) {
  // Parse key-value pairs like "key=value key2=value2"
  const args = {};
  const pairs = argString.match(/([a-zA-Z0-9_]+)=([^ ]+)/g) || [];
  
  pairs.forEach(pair => {
    const [key, value] = pair.split("=");
    args[key] = parseValue(value);
  });
  
  return args;
}

function parseValue(value) {
  // Convert string values to appropriate types
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return parseFloat(value);
  return value;
}
```

## Integration with Runtime Agent

The Command Parser integrates with the Runtime Agent for validation and schema compliance:

```javascript
function executeCommand(commandText) {
  // Expand the command
  const { command, args } = expandCommand(commandText);
  
  // Get the appropriate handler
  const handler = commandHandlers[command];
  if (!handler) {
    return {
      status: "error",
      message: `Unknown command: ${command}`
    };
  }
  
  try {
    // Execute the handler
    const result = handler(args);
    
    // Validate the result using the Runtime Agent
    if (result.objectType && result.data) {
      const validationResult = RuntimeAgent.validateObject(result.objectType, result.data);
      
      if (!validationResult.valid) {
        return {
          status: "error",
          message: "Schema validation failed",
          details: validationResult.errors
        };
      }
      
      // Store the object using the Runtime Agent
      RuntimeAgent.createObject(result.objectType, result.data);
    }
    
    return result;
  } catch (error) {
    return {
      status: "error",
      message: `Error executing command: ${error.message}`
    };
  }
}
```

## Implementation Notes

1. All command handlers produce schema-compliant output at runtime
2. Objects reference each other by ID rather than embedding
3. Field mappings maintain compatibility between master and runtime schemas
4. Command expansion handles shorthand and natural language input