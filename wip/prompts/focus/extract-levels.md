---
id: extract-levels
title: Level Extractor
description: Extracts and analyzes key price levels from processed analyst inputs
author: Intent Trader Team
version: 1.0.0
release: 0.5.1
created: 2025-05-15
updated: 2025-05-15
category: focus
status: stable
tags: [focus, technical-levels, support, resistance, moving-averages]
requires: [prompts/premarket/analyze-dp.md]
outputs: [levelFramework]
input_format: json
output_format: json
ai_enabled: true
---

# Level Extractor

This component extracts, analyzes, and structures key price levels from processed analyst inputs, creating a comprehensive level framework for technical analysis and trade decisions.

## Purpose

The Level Extractor serves as a technical foundation component within the Intent Trader workflow, organizing critical price levels into a structured framework. It:

1. **Extracts technical levels** from processed analyst inputs
2. **Classifies levels** by type, significance, and confidence
3. **Organizes levels** hierarchically for efficient navigation
4. **Analyzes level relationships** to identify clusters and significant zones
5. **Integrates moving averages** into the level framework
6. **Provides context** for each level to support trading decisions

This structured level framework allows traders to identify key decision points, validate trade ideas against technical structure, and make more informed entry and exit decisions.

## Input Parameters

- `analyzerOutput` (required): Output from analyst processing (e.g., `/analyze-dp`)
  - Must contain a `levels` object with indices and possibly stocks
- `indices` (optional): Specific indices to extract (default: all)
  - Array of index symbols (e.g., ["es", "spx", "ndx"])
- `stocks` (optional): Specific stocks to extract (default: all)
  - Array of stock symbols (e.g., ["AAPL", "MSFT", "GOOGL"])
- `includeMAs` (optional): Whether to include moving averages (default: true)
  - Boolean value
- `classify` (optional): Whether to apply advanced level classification (default: true)
  - Boolean value
- `spxOffset` (optional): ES to SPX conversion offset (default: 20)
  - Number to add to ES levels to get SPX equivalent

## Output Format

The component produces a structured level framework:

```json
{
  "indices": {
    "es": {
      "support": [
        {
          "price": "number",
          "type": "major/significant/minor/provisional",
          "significance": "number (1-10)",
          "notes": "string",
          "source": "string (analyst name)",
          "consensus": "strong/moderate/weak/none",
          "context": {
            "distance": "number (points from current price)",
            "percentageDistance": "number",
            "priorTests": "number",
            "testOutcomes": ["respect", "breach", "reversal"],
            "timeframe": "string"
          }
        }
      ],
      "resistance": [
        {
          "price": "number",
          "type": "major/significant/minor/provisional",
          "significance": "number (1-10)",
          "notes": "string",
          "source": "string (analyst name)",
          "consensus": "strong/moderate/weak/none",
          "context": {
            "distance": "number (points from current price)",
            "percentageDistance": "number",
            "priorTests": "number",
            "testOutcomes": ["respect", "breach", "reversal"],
            "timeframe": "string"
          }
        }
      ],
      "zones": [
        {
          "type": "bullish/bearish/neutral/congestion",
          "min": "number",
          "max": "number",
          "significance": "number (1-10)",
          "description": "string"
        }
      ],
      "movingAverages": {
        "ma8": {
          "value": "number",
          "slope": "rising/falling/flat",
          "priceRelationship": "above/below/at",
          "distance": "number"
        },
        "ma21": {"value": "number", "slope": "string", "priceRelationship": "string", "distance": "number"},
        "ma50": {"value": "number", "slope": "string", "priceRelationship": "string", "distance": "number"},
        "ma200": {"value": "number", "slope": "string", "priceRelationship": "string", "distance": "number"}
      },
      "currentPrice": "number",
      "keyDecisionLevels": ["number", "number"],
      "orderFlow": {
        "liquidityZones": [{"price": "number", "type": "buy/sell", "strength": "string"}],
        "volumeNodes": [{"price": "number", "significance": "string"}]
      }
    },
    "spx": {/* similar structure to ES */},
    "ndx": {/* similar structure to ES */}
  },
  "stocks": {
    "AAPL": {/* similar structure to indices */},
    "MSFT": {/* similar structure to indices */}
  },
  "summary": {
    "mostSignificantLevels": [
      {"index": "string", "price": "number", "type": "support/resistance", "significance": "number"}
    ],
    "currentMarketPosition": {
      "es": "above support / below resistance / at support / at resistance",
      "spx": "string",
      "ndx": "string"
    },
    "keyZones": [
      {"index": "string", "zone": {"min": "number", "max": "number"}, "description": "string"}
    ]
  },
  "metadata": {
    "processingTime": "number",
    "priceCurrency": "USD",
    "priceTimestamp": "datetime",
    "sourcesUsed": ["string"],
    "levelsExtracted": "number",
    "significantLevelsThreshold": "number"
  }
}
```

## Error Handling

The extractor handles various error conditions and edge cases:

### Input Validation Errors
- **Missing Required Input**: Returns error if analyzerOutput or levels object is missing
- **Invalid Indices/Stocks**: Validates against available data, uses all if invalid
- **Invalid spxOffset**: Ensures spxOffset is a number, uses default if invalid

### Processing Errors
- **Empty Levels Object**: Returns empty framework with appropriate metadata
- **Missing Price Data**: Uses available reference prices or falls back to reasonable defaults
- **Malformed Level Data**: Filters out invalid levels and proceeds with valid ones

### Recovery Strategies
- **Partial Processing**: Returns successfully processed levels even when others fail
- **Graceful Degradation**: Falls back to simpler classification when advanced logic fails
- **Default Application**: Applies reasonable defaults for missing parameters

## Processing Logic

The Level Extractor applies the following methodology:

### 1. Input Validation and Preprocessing

The system first validates the input and prepares it for processing:

```javascript
function validateAndPreprocess(input) {
  // Validate required fields
  if (!input || !input.analyzerOutput || !input.analyzerOutput.levels) {
    throw new Error("Missing required input: analyzerOutput.levels");
  }

  // Extract and normalize parameters
  const {
    analyzerOutput,
    indices = [],
    stocks = [],
    includeMAs = true,
    classify = true,
    spxOffset = 20
  } = input;

  // Validate spxOffset
  const normalizedOffset = Number.isFinite(spxOffset) ? spxOffset : 20;

  // Extract available indices and stocks
  const availableIndices = Object.keys(analyzerOutput.levels.indices || {});
  const availableStocks = (analyzerOutput.levels.stocks || []).map(stock => stock.ticker);

  // Determine which indices and stocks to process
  const indicesToProcess = indices.length > 0
    ? indices.filter(idx => availableIndices.includes(idx))
    : availableIndices;

  const stocksToProcess = stocks.length > 0
    ? stocks.filter(stock => availableStocks.includes(stock))
    : availableStocks;

  // Get current prices if available
  const currentPrices = extractCurrentPrices(analyzerOutput);

  return {
    levels: analyzerOutput.levels,
    indicesToProcess,
    stocksToProcess,
    includeMAs,
    classify,
    normalizedOffset,
    currentPrices,
    analyzerOutput
  };
}

function extractCurrentPrices(analyzerOutput) {
  const prices = {};

  // Try to extract from market context if available
  if (analyzerOutput.marketContext) {
    // Extract index prices if available
    if (analyzerOutput.marketContext.indices) {
      Object.entries(analyzerOutput.marketContext.indices).forEach(([index, data]) => {
        if (data.price) prices[index] = data.price;
      });
    }

    // Extract stock prices if available
    if (analyzerOutput.marketContext.stocks) {
      Object.entries(analyzerOutput.marketContext.stocks).forEach(([ticker, data]) => {
        if (data.price) prices[ticker] = data.price;
      });
    }
  }

  return prices;
}
```

### 2. Level Classification and Enhancement

The system classifies and enhances each level with additional context:

```javascript
function classifyAndEnhanceLevels(levels, currentPrice, classify) {
  if (!levels || !Array.isArray(levels)) return [];

  return levels.map(level => {
    // Start with the original level
    const enhancedLevel = { ...level };

    // Extract price (required)
    const price = level.value || level.price;
    if (!price) return null; // Skip invalid levels

    // Set standardized price property
    enhancedLevel.price = price;

    // Apply classification if requested
    if (classify) {
      const classification = classifyLevel(level, currentPrice);
      enhancedLevel.type = classification.type;
      enhancedLevel.significance = classification.significance;
    } else {
      // Basic classification based on available data
      enhancedLevel.type = level.type || 'minor';
      enhancedLevel.significance = level.significance || 5;
    }

    // Add source attribution if available
    enhancedLevel.source = level.source || 'analyst';
    enhancedLevel.consensus = level.consensus || 'none';

    // Add distance from current price if available
    if (currentPrice) {
      enhancedLevel.context = {
        distance: price - currentPrice,
        percentageDistance: ((price - currentPrice) / currentPrice) * 100,
        priorTests: level.priorTests || 0,
        testOutcomes: level.testOutcomes || [],
        timeframe: level.timeframe || 'daily'
      };
    }

    return enhancedLevel;
  }).filter(level => level !== null); // Remove invalid levels
}

function classifyLevel(level, currentPrice) {
  // Default classification
  const classification = {
    type: 'minor',
    significance: 5
  };

  // Classify based on provided type if available
  if (level.type) {
    // Map common type descriptions to standardized types
    const typeMap = {
      'major': 'major',
      'key': 'major',
      'critical': 'major',
      'significant': 'significant',
      'important': 'significant',
      'secondary': 'minor',
      'minor': 'minor',
      'tertiary': 'minor',
      'provisional': 'provisional',
      'potential': 'provisional'
    };

    // Apply mapping or default to 'minor'
    classification.type = typeMap[level.type.toLowerCase()] || 'minor';
  }

  // Classify based on notes if available
  if (level.notes) {
    const notes = level.notes.toLowerCase();

    // Check for key phrases indicating significance
    if (notes.includes('major') || notes.includes('key') || notes.includes('critical')) {
      classification.type = 'major';
      classification.significance = Math.max(classification.significance, 8);
    } else if (notes.includes('significant') || notes.includes('important')) {
      classification.type = 'significant';
      classification.significance = Math.max(classification.significance, 7);
    }

    // Check for strength indicators
    if (notes.includes('strong')) {
      classification.significance += 1;
    }

    // Check for weakness indicators
    if (notes.includes('weak') || notes.includes('minor')) {
      classification.significance -= 1;
    }

    // Check for prior tests mentions
    if (notes.includes('tested') || notes.includes('multiple') || notes.includes('previous')) {
      classification.significance += 1;
    }
  }

  // Classify based on value if provided
  if (level.significance) {
    // Direct significance value
    classification.significance = level.significance;

    // Adjust type based on significance value
    if (classification.significance >= 8) {
      classification.type = 'major';
    } else if (classification.significance >= 6) {
      classification.type = 'significant';
    } else if (classification.significance >= 4) {
      classification.type = 'minor';
    } else {
      classification.type = 'provisional';
    }
  }

  // Ensure significance is within valid range (1-10)
  classification.significance = Math.max(1, Math.min(10, classification.significance));

  return classification;
}
```

### 3. Moving Average Processing

The system processes moving average data when available:

```javascript
function processMovingAverages(maData, currentPrice) {
  if (!maData) return {};

  const enhancedMAs = {};

  // Process each moving average
  Object.entries(maData).forEach(([key, value]) => {
    // Skip non-numeric values
    if (typeof value !== 'number') return;

    const slope = deriveSlope(key, value, currentPrice);
    const priceRelationship = currentPrice
      ? (currentPrice > value ? 'above' : (currentPrice < value ? 'below' : 'at'))
      : 'unknown';
    const distance = currentPrice ? currentPrice - value : null;

    enhancedMAs[key] = {
      value,
      slope,
      priceRelationship,
      distance
    };
  });

  return enhancedMAs;
}

function deriveSlope(maType, value, currentPrice) {
  // Without historical data, we can only make basic inferences

  // For shorter MAs (like ma8), if price is well above, we can infer rising slope
  if (maType === 'ma8' || maType === 'ma10') {
    if (currentPrice && currentPrice > value * 1.02) return 'rising';
    if (currentPrice && currentPrice < value * 0.98) return 'falling';
  }

  // For longer MAs, we need more data for accuracy
  return 'unknown';
}
```

### 4. Zone Identification

The system identifies meaningful price zones from individual levels:

```javascript
function identifyZones(support, resistance, currentPrice) {
  if (!support || !resistance) return [];

  const zones = [];

  // Look for congestion zones (areas with multiple supports/resistances close together)
  const allLevels = [...support, ...resistance].sort((a, b) => a.price - b.price);

  // Find clusters of levels (levels within 1% of each other)
  const clusters = [];
  let currentCluster = [];

  for (let i = 0; i < allLevels.length; i++) {
    if (currentCluster.length === 0) {
      currentCluster.push(allLevels[i]);
    } else {
      const lastPrice = currentCluster[currentCluster.length - 1].price;
      const currentPrice = allLevels[i].price;

      // If within 1% of the last price in cluster, add to current cluster
      if (Math.abs(currentPrice - lastPrice) / lastPrice < 0.01) {
        currentCluster.push(allLevels[i]);
      } else {
        // Otherwise, finalize current cluster and start a new one
        if (currentCluster.length > 1) {
          clusters.push([...currentCluster]);
        }
        currentCluster = [allLevels[i]];
      }
    }
  }

  // Add the last cluster if it has multiple levels
  if (currentCluster.length > 1) {
    clusters.push(currentCluster);
  }

  // Convert clusters to zones
  clusters.forEach(cluster => {
    const minPrice = Math.min(...cluster.map(level => level.price));
    const maxPrice = Math.max(...cluster.map(level => level.price));
    const avgSignificance = cluster.reduce((sum, level) => sum + level.significance, 0) / cluster.length;

    // Determine zone type
    let zoneType = 'congestion';

    if (currentPrice && currentPrice < minPrice) {
      zoneType = 'resistance';
    } else if (currentPrice && currentPrice > maxPrice) {
      zoneType = 'support';
    }

    zones.push({
      type: zoneType,
      min: minPrice,
      max: maxPrice,
      significance: Math.round(avgSignificance),
      description: `${zoneType} zone with ${cluster.length} levels`
    });
  });

  // Look for key areas between major supports and resistances
  for (let i = 0; i < support.length; i++) {
    if (support[i].type === 'major' || support[i].significance >= 8) {
      for (let j = 0; j < resistance.length; j++) {
        if (resistance[j].type === 'major' || resistance[j].significance >= 8) {
          // If major support and resistance are within reasonable range
          if (resistance[j].price > support[i].price &&
              (resistance[j].price - support[i].price) / support[i].price < 0.05) {

            zones.push({
              type: 'decision',
              min: support[i].price,
              max: resistance[j].price,
              significance: Math.max(support[i].significance, resistance[j].significance),
              description: 'Key decision zone between major support and resistance'
            });
          }
        }
      }
    }
  }

  return zones;
}
```

### 5. Key Decision Level Identification

The system identifies the most important levels for trading decisions:

```javascript
function identifyKeyDecisionLevels(support, resistance, currentPrice) {
  if (!support || !resistance || !currentPrice) return [];

  const keyLevels = [];

  // Find nearest support below current price
  const supportBelow = support
    .filter(level => level.price < currentPrice)
    .sort((a, b) => b.price - a.price); // Sort descending to get closest first

  if (supportBelow.length > 0) {
    keyLevels.push(supportBelow[0].price);
  }

  // Find nearest resistance above current price
  const resistanceAbove = resistance
    .filter(level => level.price > currentPrice)
    .sort((a, b) => a.price - b.price); // Sort ascending to get closest first

  if (resistanceAbove.length > 0) {
    keyLevels.push(resistanceAbove[0].price);
  }

  // Find most significant support
  const significantSupport = [...support].sort((a, b) => b.significance - a.significance);
  if (significantSupport.length > 0 && !keyLevels.includes(significantSupport[0].price)) {
    keyLevels.push(significantSupport[0].price);
  }

  // Find most significant resistance
  const significantResistance = [...resistance].sort((a, b) => b.significance - a.significance);
  if (significantResistance.length > 0 && !keyLevels.includes(significantResistance[0].price)) {
    keyLevels.push(significantResistance[0].price);
  }

  return keyLevels;
}
```

### 6. Index Processing

The system processes all specified indices:

```javascript
function processIndices(levels, indicesToProcess, currentPrices, includeMAs, classify, spxOffset) {
  const processedIndices = {};

  // Process each index
  indicesToProcess.forEach(index => {
    const indexLevels = levels.indices[index];
    if (!indexLevels) return;

    const currentPrice = currentPrices[index];

    // Enhanced support levels
    const enhancedSupport = classifyAndEnhanceLevels(
      indexLevels.support,
      currentPrice,
      classify
    );

    // Enhanced resistance levels
    const enhancedResistance = classifyAndEnhanceLevels(
      indexLevels.resistance,
      currentPrice,
      classify
    );

    // Process moving averages if requested
    const movingAverages = includeMAs && indexLevels.movingAverages
      ? processMovingAverages(indexLevels.movingAverages, currentPrice)
      : {};

    // Identify zones
    const zones = identifyZones(enhancedSupport, enhancedResistance, currentPrice);

    // Identify key decision levels
    const keyDecisionLevels = identifyKeyDecisionLevels(
      enhancedSupport,
      enhancedResistance,
      currentPrice
    );

    // Special handling for ES->SPX conversion if needed
    let derivedLevels = {};
    if (index === 'es' && !indicesToProcess.includes('spx')) {
      derivedLevels.spx = deriveSpxLevels(
        enhancedSupport,
        enhancedResistance,
        movingAverages,
        zones,
        keyDecisionLevels,
        currentPrice,
        spxOffset
      );
    }

    // Create final index object
    processedIndices[index] = {
      support: enhancedSupport,
      resistance: enhancedResistance,
      zones,
      movingAverages,
      currentPrice,
      keyDecisionLevels
    };

    // Add derived levels if any
    Object.assign(processedIndices, derivedLevels);
  });

  return processedIndices;
}

function deriveSpxLevels(support, resistance, movingAverages, zones, keyDecisionLevels, currentPrice, offset) {
  // Apply offset to all price-based fields

  // Transform support levels
  const spxSupport = support.map(level => ({
    ...level,
    price: level.price + offset,
    context: level.context ? {
      ...level.context,
      distance: level.context.distance ? level.context.distance + offset : null
    } : null
  }));

  // Transform resistance levels
  const spxResistance = resistance.map(level => ({
    ...level,
    price: level.price + offset,
    context: level.context ? {
      ...level.context,
      distance: level.context.distance ? level.context.distance + offset : null
    } : null
  }));

  // Transform zones
  const spxZones = zones.map(zone => ({
    ...zone,
    min: zone.min + offset,
    max: zone.max + offset
  }));

  // Transform moving averages
  const spxMAs = {};
  Object.entries(movingAverages).forEach(([key, ma]) => {
    spxMAs[key] = {
      ...ma,
      value: ma.value + offset,
      distance: ma.distance ? ma.distance + offset : null
    };
  });

  // Transform key decision levels
  const spxKeyLevels = keyDecisionLevels.map(level => level + offset);

  // Transform current price if available
  const spxCurrentPrice = currentPrice ? currentPrice + offset : null;

  return {
    support: spxSupport,
    resistance: spxResistance,
    zones: spxZones,
    movingAverages: spxMAs,
    currentPrice: spxCurrentPrice,
    keyDecisionLevels: spxKeyLevels,
    derived: true,
    derivedFrom: 'es',
    derivedOffset: offset
  };
}
```

### 7. Stock Processing

The system processes all specified stocks:

```javascript
function processStocks(levels, stocksToProcess, currentPrices, includeMAs, classify) {
  const processedStocks = {};

  // Check if stocks data is available
  if (!levels.stocks || !Array.isArray(levels.stocks)) return processedStocks;

  // Process each stock
  stocksToProcess.forEach(ticker => {
    const stockData = levels.stocks.find(stock => stock.ticker === ticker);
    if (!stockData) return;

    const currentPrice = currentPrices[ticker];

    // Extract stock levels (handling different possible structures)
    let supportLevels = [];
    let resistanceLevels = [];
    let movingAverageData = {};

    // Handle different possible data structures
    if (stockData.support) {
      // Direct support array
      supportLevels = stockData.support;
    } else if (stockData.levels && stockData.levels.support) {
      // Nested in levels object
      supportLevels = stockData.levels.support;
    }

    if (stockData.resistance) {
      // Direct resistance array
      resistanceLevels = stockData.resistance;
    } else if (stockData.levels && stockData.levels.resistance) {
      // Nested in levels object
      resistanceLevels = stockData.levels.resistance;
    }

    if (stockData.movingAverages) {
      // Direct movingAverages object
      movingAverageData = stockData.movingAverages;
    }

    // Enhanced support levels
    const enhancedSupport = classifyAndEnhanceLevels(
      supportLevels,
      currentPrice,
      classify
    );

    // Enhanced resistance levels
    const enhancedResistance = classifyAndEnhanceLevels(
      resistanceLevels,
      currentPrice,
      classify
    );

    // Process moving averages if requested
    const movingAverages = includeMAs && movingAverageData
      ? processMovingAverages(movingAverageData, currentPrice)
      : {};

    // Identify zones
    const zones = identifyZones(enhancedSupport, enhancedResistance, currentPrice);

    // Identify key decision levels
    const keyDecisionLevels = identifyKeyDecisionLevels(
      enhancedSupport,
      enhancedResistance,
      currentPrice
    );

    // Create final stock object
    processedStocks[ticker] = {
      support: enhancedSupport,
      resistance: enhancedResistance,
      zones,
      movingAverages,
      currentPrice,
      keyDecisionLevels
    };
  });

  return processedStocks;
}
```

### 8. Summary Generation

The system generates a comprehensive summary of the level framework:

```javascript
function generateSummary(indices, stocks) {
  const mostSignificantLevels = [];
  const currentMarketPosition = {};
  const keyZones = [];

  // Process indices for summary
  Object.entries(indices).forEach(([index, data]) => {
    // Skip derived indices for significant levels
    if (data.derived) return;

    // Find most significant support and resistance
    const allLevels = [
      ...data.support.map(level => ({...level, levelType: 'support', index})),
      ...data.resistance.map(level => ({...level, levelType: 'resistance', index}))
    ];

    // Sort by significance (descending)
    allLevels.sort((a, b) => b.significance - a.significance);

    // Take top levels (up to 2 per index)
    const topLevels = allLevels.slice(0, 2);

    // Add to most significant levels
    mostSignificantLevels.push(
      ...topLevels.map(level => ({
        index,
        price: level.price,
        type: level.levelType,
        significance: level.significance
      }))
    );

    // Determine current market position if current price is available
    if (data.currentPrice) {
      // Get nearest support below and resistance above
      const nearestSupport = data.support
        .filter(level => level.price < data.currentPrice)
        .sort((a, b) => b.price - a.price)[0];

      const nearestResistance = data.resistance
        .filter(level => level.price > data.currentPrice)
        .sort((a, b) => a.price - b.price)[0];

      // Determine market position
      if (nearestSupport && nearestResistance) {
        const distToSupport = data.currentPrice - nearestSupport.price;
        const distToResistance = nearestResistance.price - data.currentPrice;

        if (distToSupport < distToResistance * 0.2) {
          currentMarketPosition[index] = 'at support';
        } else if (distToResistance < distToSupport * 0.2) {
          currentMarketPosition[index] = 'at resistance';
        } else if (distToSupport < distToResistance) {
          currentMarketPosition[index] = 'closer to support';
        } else {
          currentMarketPosition[index] = 'closer to resistance';
        }
      } else if (nearestSupport) {
        currentMarketPosition[index] = 'above support';
      } else if (nearestResistance) {
        currentMarketPosition[index] = 'below resistance';
      } else {
        currentMarketPosition[index] = 'indeterminate';
      }
    }

    // Add significant zones
    if (data.zones && data.zones.length > 0) {
      // Sort by significance (descending)
      const sortedZones = [...data.zones].sort((a, b) => b.significance - a.significance);

      // Take top zones (up to 2 per index)
      const topZones = sortedZones.slice(0, 2);

      // Add to key zones
      keyZones.push(
        ...topZones.map(zone => ({
          index,
          zone: {
            min: zone.min,
            max: zone.max
          },
          description: zone.description
        }))
      );
    }
  });

  // Process stocks for summary (similar logic as indices)
  Object.entries(stocks).forEach(([ticker, data]) => {
    // Find most significant support and resistance
    const allLevels = [
      ...data.support.map(level => ({...level, levelType: 'support', index: ticker})),
      ...data.resistance.map(level => ({...level, levelType: 'resistance', index: ticker}))
    ];

    // Sort by significance (descending)
    allLevels.sort((a, b) => b.significance - a.significance);

    // Take top levels (up to 2 per stock)
    const topLevels = allLevels.slice(0, 2);

    // Add to most significant levels
    mostSignificantLevels.push(
      ...topLevels.map(level => ({
        index: ticker,
        price: level.price,
        type: level.levelType,
        significance: level.significance
      }))
    );

    // Determine current market position if current price is available
    if (data.currentPrice) {
      // Get nearest support below and resistance above
      const nearestSupport = data.support
        .filter(level => level.price < data.currentPrice)
        .sort((a, b) => b.price - a.price)[0];

      const nearestResistance = data.resistance
        .filter(level => level.price > data.currentPrice)
        .sort((a, b) => a.price - b.price)[0];

      // Determine market position
      if (nearestSupport && nearestResistance) {
        const distToSupport = data.currentPrice - nearestSupport.price;
        const distToResistance = nearestResistance.price - data.currentPrice;

        if (distToSupport < distToResistance * 0.2) {
          currentMarketPosition[ticker] = 'at support';
        } else if (distToResistance < distToSupport * 0.2) {
          currentMarketPosition[ticker] = 'at resistance';
        } else if (distToSupport < distToResistance) {
          currentMarketPosition[ticker] = 'closer to support';
        } else {
          currentMarketPosition[ticker] = 'closer to resistance';
        }
      } else if (nearestSupport) {
        currentMarketPosition[ticker] = 'above support';
      } else if (nearestResistance) {
        currentMarketPosition[ticker] = 'below resistance';
      } else {
        currentMarketPosition[ticker] = 'indeterminate';
      }
    }

    // Add significant zones
    if (data.zones && data.zones.length > 0) {
      // Sort by significance (descending)
      const sortedZones = [...data.zones].sort((a, b) => b.significance - a.significance);

      // Take top zones (up to 2 per stock)
      const topZones = sortedZones.slice(0, 2);

      // Add to key zones
      keyZones.push(
        ...topZones.map(zone => ({
          index: ticker,
          zone: {
            min: zone.min,
            max: zone.max
          },
          description: zone.description
        }))
      );
    }
  });

  // Sort most significant levels by significance
  mostSignificantLevels.sort((a, b) => b.significance - a.significance);

  // Limit to top 10 significant levels
  const topSignificantLevels = mostSignificantLevels.slice(0, 10);

  return {
    mostSignificantLevels: topSignificantLevels,
    currentMarketPosition,
    keyZones
  };
}
```

### 9. Result Generation

The system generates the final structured output:

```javascript
function generateResult(indices, stocks, params) {
  // Generate summary
  const summary = generateSummary(indices, stocks);

  // Count total levels extracted
  const indexLevelCount = Object.values(indices).reduce((count, index) => {
    return count + index.support.length + index.resistance.length;
  }, 0);

  const stockLevelCount = Object.values(stocks).reduce((count, stock) => {
    return count + stock.support.length + stock.resistance.length;
  }, 0);

  const totalLevels = indexLevelCount + stockLevelCount;

  // Generate metadata
  const metadata = {
    processingTime: new Date().getTime(),
    priceCurrency: 'USD',
    priceTimestamp: new Date().toISOString(),
    sourcesUsed: params.analyzerOutput.analyst ? [params.analyzerOutput.analyst] : ['analyst'],
    levelsExtracted: totalLevels,
    significantLevelsThreshold: 8
  };

  return {
    indices,
    stocks,
    summary,
    metadata
  };
}
```

### 10. Main Processing Function

The main function orchestrates the entire extraction process:

```javascript
function extractLevels(input) {
  try {
    // Validate and preprocess input
    const params = validateAndPreprocess(input);
    const {
      levels,
      indicesToProcess,
      stocksToProcess,
      includeMAs,
      classify,
      normalizedOffset,
      currentPrices,
      analyzerOutput
    } = params;

    // Process indices
    const processedIndices = processIndices(
      levels,
      indicesToProcess,
      currentPrices,
      includeMAs,
      classify,
      normalizedOffset
    );

    // Process stocks
    const processedStocks = processStocks(
      levels,
      stocksToProcess,
      currentPrices,
      includeMAs,
      classify
    );

    // Generate final result
    return generateResult(processedIndices, processedStocks, params);
  } catch (error) {
    // Handle errors
    return {
      indices: {},
      stocks: {},
      summary: {
        mostSignificantLevels: [],
        currentMarketPosition: {},
        keyZones: []
      },
      metadata: {
        processingTime: new Date().getTime(),
        error: error.message,
        status: 'error'
      }
    };
  }
}
```

## Level Classification Framework

The Level Extractor applies this standardized classification system:

### Type Classification

| Type | Description | Significance Range | Characteristics |
|------|-------------|-------------------|-----------------|
| **Major** | Primary support/resistance with high significance | 8-10 | Multiple tests, strong reactions, referenced by multiple analysts |
| **Significant** | Important levels with good reliability | 6-7 | Several tests, notable reactions, clear technical basis |
| **Minor** | Secondary levels with moderate impact | 4-5 | Limited testing, moderate reactions, contextual importance |
| **Provisional** | Newly formed or untested levels | 1-3 | Recent formation, untested, theoretical basis |

### Significance Scoring Factors

The significance score (1-10) is calculated based on:

1. **Prior testing frequency**: More tests increase significance
2. **Reaction strength**: Stronger price reactions increase significance
3. **Analyst emphasis**: Explicit importance noted by analysts increases significance
4. **Technical confluence**: Alignment with other indicators increases significance
5. **Historical behavior**: Consistent level behavior increases significance
6. **Time relevance**: More recent validity increases significance

## Zone Classifications

The system identifies these zone types:

### By Price Action
- **Bullish Zone**: Area of expected upward momentum
- **Bearish Zone**: Area of expected downward pressure
- **Neutral Zone**: Area of balanced forces
- **Congestion Zone**: Area of price consolidation

### By Structure
- **Range Zone**: Area between established support and resistance
- **Breakout Zone**: Area above resistance or below support
- **Decision Zone**: Area of potential trend determination
- **Liquidity Zone**: Area with high order concentration

## Example Usage

```
/extract-levels --analyzerOutput=<output from analyze-dp> --indices=["es", "spx"] --includeMAs=true --classify=true
```

## Test Vector

**Input**:
```json
{
  "analyzerOutput": {
    "levels": {
      "indices": {
        "es": {
          "support": [
            {"value": 5900, "type": "support", "notes": "trapped several times now"},
            {"value": 5850, "type": "support", "notes": "major support if 5900 fails"}
          ],
          "resistance": [
            {"value": 5926, "type": "resistance", "notes": "top of the bull flag"},
            {"value": 5945, "type": "resistance", "notes": "secondary resistance"},
            {"value": 5970, "type": "resistance", "notes": "measured move target if we break out"}
          ],
          "movingAverages": {
            "ma8": 5890,
            "ma21": 5870,
            "ma50": 5800,
            "ma200": 5650
          }
        },
        "spx": {
          "support": [
            {"value": 5920, "type": "support", "notes": "comparable to ES 5900"},
            {"value": 5870, "type": "support", "notes": "major support if 5920 fails"}
          ],
          "resistance": [
            {"value": 5946, "type": "resistance", "notes": "top of the bull flag"},
            {"value": 5965, "type": "resistance", "notes": "secondary resistance"},
            {"value": 5990, "type": "resistance", "notes": "measured move target if we break out"}
          ]
        }
      },
      "stocks": [
        {
          "ticker": "TSLA",
          "levels": {
            "support": [{"value": 300, "type": "support"}],
            "resistance": [{"value": 320, "type": "resistance"}]
          },
          "movingAverages": {"ma8": 309, "ma21": 300}
        },
        {
          "ticker": "AMD",
          "levels": {
            "support": [{"value": 112, "type": "support"}],
            "resistance": [{"value": 120, "type": "resistance"}]
          },
          "movingAverages": {"ma8": 117, "ma21": 115}
        }
      ]
    },
    "marketContext": {
      "indices": {
        "es": {
          "price": 5915
        },
        "spx": {
          "price": 5935
        }
      },
      "stocks": {
        "TSLA": {
          "price": 310
        },
        "AMD": {
          "price": 116
        }
      }
    },
    "analyst": "dp",
    "processedAt": "2025-05-15T09:30:00Z"
  },
  "indices": ["es", "spx"],
  "stocks": ["TSLA", "AMD"],
  "includeMAs": true,
  "classify": true,
  "spxOffset": 20
}
```

**Expected Output**:
```json
{
  "indices": {
    "es": {
      "support": [
        {
          "price": 5900,
          "type": "major",
          "significance": 8,
          "notes": "trapped several times now",
          "source": "analyst",
          "consensus": "none",
          "context": {
            "distance": -15,
            "percentageDistance": -0.25,
            "priorTests": 3,
            "testOutcomes": [],
            "timeframe": "daily"
          }
        },
        {
          "price": 5850,
          "type": "major",
          "significance": 8,
          "notes": "major support if 5900 fails",
          "source": "analyst",
          "consensus": "none",
          "context": {
            "distance": -65,
            "percentageDistance": -1.1,
            "priorTests": 0,
            "testOutcomes": [],
            "timeframe": "daily"
          }
        }
      ],
      "resistance": [
        {
          "price": 5926,
          "type": "major",
          "significance": 8,
          "notes": "top of the bull flag",
          "source": "analyst",
          "consensus": "none",
          "context": {
            "distance": 11,
            "percentageDistance": 0.19,
            "priorTests": 0,
            "testOutcomes": [],
            "timeframe": "daily"
          }
        },
        {
          "price": 5945,
          "type": "significant",
          "significance": 6,
          "notes": "secondary resistance",
          "source": "analyst",
          "consensus": "none",
          "context": {
            "distance": 30,
            "percentageDistance": 0.51,
            "priorTests": 0,
            "testOutcomes": [],
            "timeframe": "daily"
          }
        },
        {
          "price": 5970,
          "type": "significant",
          "significance": 7,
          "notes": "measured move target if we break out",
          "source": "analyst",
          "consensus": "none",
          "context": {
            "distance": 55,
            "percentageDistance": 0.93,
            "priorTests": 0,
            "testOutcomes": [],
            "timeframe": "daily"
          }
        }
      ],
      "zones": [
        {
          "type": "decision",
          "min": 5900,
          "max": 5926,
          "significance": 8,
          "description": "Key decision zone between major support and resistance"
        }
      ],
      "movingAverages": {
        "ma8": {
          "value": 5890,
          "slope": "rising",
          "priceRelationship": "above",
          "distance": 25
        },
        "ma21": {
          "value": 5870,
          "slope": "unknown",
          "priceRelationship": "above",
          "distance": 45
        },
        "ma50": {
          "value": 5800,
          "slope": "unknown",
          "priceRelationship": "above",
          "distance": 115
        },
        "ma200": {
          "value": 5650,
          "slope": "unknown",
          "priceRelationship": "above",
          "distance": 265
        }
      },
      "currentPrice": 5915,
      "keyDecisionLevels": [5900, 5926]
    },
    "spx": {
      "support": [
        {
          "price": 5920,
          "type": "major",
          "significance": 8,
          "notes": "comparable to ES 5900",
          "source": "analyst",
          "consensus": "none",
          "context": {
            "distance": -15,
            "percentageDistance": -0.25,
            "priorTests": 0,
            "testOutcomes": [],
            "timeframe": "daily"
          }
        },
        {
          "price": 5870,
          "type": "major",
          "significance": 8,
          "notes": "major support if 5920 fails",
          "source": "analyst",
          "consensus": "none",
          "context": {
            "distance": -65,
            "percentageDistance": -1.1,
            "priorTests": 0,
            "testOutcomes": [],
            "timeframe": "daily"
          }
        }
      ],
      "resistance": [
        {
          "price": 5946,
          "type": "major",
          "significance": 8,
          "notes": "top of the bull flag",
          "source": "analyst",
          "consensus": "none",
          "context": {
            "distance": 11,
            "percentageDistance": 0.19,
            "priorTests": 0,
            "testOutcomes": [],
            "timeframe": "daily"
          }
        },
        {
          "price": 5965,
          "type": "significant",
          "significance": 6,
          "notes": "secondary resistance",
          "source": "analyst",
          "consensus": "none",
          "context": {
            "distance": 30,
            "percentageDistance": 0.51,
            "priorTests": 0,
            "testOutcomes": [],
            "timeframe": "daily"
          }
        },
        {
          "price": 5990,
          "type": "significant",
          "significance": 7,
          "notes": "measured move target if we break out",
          "source": "analyst",
          "consensus": "none",
          "context": {
            "distance": 55,
            "percentageDistance": 0.93,
            "priorTests": 0,
            "testOutcomes": [],
            "timeframe": "daily"
          }
        }
      ],
      "zones": [
        {
          "type": "decision",
          "min": 5920,
          "max": 5946,
          "significance": 8,
          "description": "Key decision zone between major support and resistance"
        }
      ],
      "movingAverages": {},
      "currentPrice": 5935,
      "keyDecisionLevels": [5920, 5946]
    }
  },
  "stocks": {
    "TSLA": {
      "support": [
        {
          "price": 300,
          "type": "significant",
          "significance": 6,
          "source": "analyst",
          "consensus": "none",
          "context": {
            "distance": -10,
            "percentageDistance": -3.23,
            "priorTests": 0,
            "testOutcomes": [],
            "timeframe": "daily"
          }
        }
      ],
      "resistance": [
        {
          "price": 320,
          "type": "significant",
          "significance": 6,
          "source": "analyst",
          "consensus": "none",
          "context": {
            "distance": 10,
            "percentageDistance": 3.23,
            "priorTests": 0,
            "testOutcomes": [],
            "timeframe": "daily"
          }
        }
      ],
      "zones": [
        {
          "type": "congestion",
          "min": 300,
          "max": 320,
          "significance": 6,
          "description": "congestion zone with 2 levels"
        }
      ],
      "movingAverages": {
        "ma8": {
          "value": 309,
          "slope": "rising",
          "priceRelationship": "above",
          "distance": 1
        },
        "ma21": {
          "value": 300,
          "slope": "unknown",
          "priceRelationship": "above",
          "distance": 10
        }
      },
      "currentPrice": 310,
      "keyDecisionLevels": [300, 320]
    },
    "AMD": {
      "support": [
        {
          "price": 112,
          "type": "significant",
          "significance": 6,
          "source": "analyst",
          "consensus": "none",
          "context": {
            "distance": -4,
            "percentageDistance": -3.45,
            "priorTests": 0,
            "testOutcomes": [],
            "timeframe": "daily"
          }
        }
      ],
      "resistance": [
        {
          "price": 120,
          "type": "significant",
          "significance": 6,
          "source": "analyst",
          "consensus": "none",
          "context": {
            "distance": 4,
            "percentageDistance": 3.45,
            "priorTests": 0,
            "testOutcomes": [],
            "timeframe": "daily"
          }
        }
      ],
      "zones": [
        {
          "type": "congestion",
          "min": 112,
          "max": 120,
          "significance": 6,
          "description": "congestion zone with 2 levels"
        }
      ],
      "movingAverages": {
        "ma8": {
          "value": 117,
          "slope": "rising",
          "priceRelationship": "below",
          "distance": -1
        },
        "ma21": {
          "value": 115,
          "slope": "unknown",
          "priceRelationship": "above",
          "distance": 1
        }
      },
      "currentPrice": 116,
      "keyDecisionLevels": [112, 120]
    }
  },
  "summary": {
    "mostSignificantLevels": [
      {
        "index": "es",
        "price": 5900,
        "type": "support",
        "significance": 8
      },
      {
        "index": "es",
        "price": 5926,
        "type": "resistance",
        "significance": 8
      },
      {
        "index": "spx",
        "price": 5920,
        "type": "support",
        "significance": 8
      },
      {
        "index": "spx",
        "price": 5946,
        "type": "resistance",
        "significance": 8
      },
      {
        "index": "es",
        "price": 5850,
        "type": "support",
        "significance": 8
      },
      {
        "index": "spx",
        "price": 5870,
        "type": "support",
        "significance": 8
      },
      {
        "index": "es",
        "price": 5970,
        "type": "resistance",
        "significance": 7
      },
      {
        "index": "spx",
        "price": 5990,
        "type": "resistance",
        "significance": 7
      }
    ],
    "currentMarketPosition": {
      "es": "closer to resistance",
      "spx": "closer to resistance",
      "TSLA": "closer to resistance",
      "AMD": "at resistance"
    },
    "keyZones": [
      {
        "index": "es",
        "zone": {
          "min": 5900,
          "max": 5926
        },
        "description": "Key decision zone between major support and resistance"
      },
      {
        "index": "spx",
        "zone": {
          "min": 5920,
          "max": 5946
        },
        "description": "Key decision zone between major support and resistance"
      }
    ]
  },
  "metadata": {
    "processingTime": 1721083440000,
    "priceCurrency": "USD",
    "priceTimestamp": "2025-05-15T14:30:40Z",
    "sourcesUsed": ["dp"],
    "levelsExtracted": 12,
    "significantLevelsThreshold": 8
  }
}
```

## Implementation Notes

The Level Extractor is designed to transform raw level data into a structured, hierarchical framework that supports informed trading decisions. Key design considerations include:

1. **Hierarchical Organization**: Levels are classified by type (major, significant, minor, provisional) and significance (1-10) to enable focus on the most important decision points.

2. **Context Enhancement**: Each level is enriched with additional context such as distance from current price, prior testing history, and analyst attribution.

3. **Zone Identification**: The system identifies meaningful price zones by analyzing clusters of levels and relationships between major supports and resistances.

4. **Decision Level Extraction**: Key decision levels are identified based on proximity to current price and overall significance.

5. **Moving Average Integration**: Moving averages are incorporated into the level framework with slope and price relationship analysis.

The implementation is optimized for the FOCUS phase of trading, providing a clear technical structure that can be used to validate trade ideas and identify potential entries and exits.

## Integration Details

### Multiple Analyst Integration

The Level Extractor is designed to integrate level data from multiple analysts when available:

1. **Consensus Strength Calculation**:
   - Identifies overlapping levels from different sources
   - Calculates consensus strength based on proximity and analyst agreement
   - Uses source credibility weighting when available

2. **Conflicting Level Resolution**:
   - Preserves both versions with appropriate source attribution
   - Calculates confidence scores for competing levels
   - Includes both in the framework with appropriate context

### Index Relationship Integration

The system handles relationships between related indices:

1. **ES-SPX Relationship**:
   - Automatically derives SPX levels from ES with configurable offset
   - Maintains relationship awareness in level comparisons
   - Adjusts significance based on index liquidity and trading volume

2. **Cross-Index Analysis**:
   - Identifies aligned levels across multiple indices
   - Calculates "global significance" based on multi-index confirmation
   - Highlights levels with cross-market importance

## Future Enhancements

Planned enhancements for future versions include:

1. **Historical Validation**: Automated back-testing of level significance against historical price action
2. **Volume Profile Integration**: Incorporation of volume profile data to enhance level significance assessment
3. **Market Microstructure Analysis**: Integration of order flow data to identify liquidity zones and potential stop clusters
4. **Dynamic Level Adaptation**: Real-time adjustment of level significance based on intraday price action

## Related Components

The Level Extractor works closely with:
- `prompts/premarket/analyze-dp.md` - Source of level data
- `prompts/premarket/create-plan.md` - Consumer of processed level framework
- `prompts/premarket/extract-focus.md` - Uses levels for trade idea validation
- `prompts/intraday/chart-analysis.md` - Uses levels for real-time analysis
