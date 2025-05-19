I need to extract structured data from this Mancini newsletter for my trading system. Please process this newsletter and extract the following components:

1. Newsletter date and title
2. Market assessment (Mode 1/2, directional bias, market regime)
3. All ES price levels (supports and resistances with their context)
4. Failed Breakdown setups and other trading setup types
5. Bull and bear case scenarios
6. Any runner management information
7. Trading strategy recommendations
8. Educational concepts and terminology
9. Risk management approach

Format the output as clean JSON that I can copy directly into my trading system. The structure should match:

```json
{
  "newsletterDate": "YYYY-MM-DD",
  "newsletterTitle": "string",
  "marketRegime": {
    "directionalBias": "string (bullish/bearish/neutral)",
    "marketMode": "string (Mode 1/2 details, trend/range classification)",
    "regimeDuration": "string (how long this regime has been in place)",
    "keyPatterns": [
      {
        "pattern": "string (e.g., 'bull flag')",
        "boundaries": "string (e.g., '5882-85 support, 5925 resistance')",
        "significance": "string"
      }
    ],
    "volatilityCondition": "string",
    "institutionalBehavior": "string (accumulation/distribution patterns)",
    "fullMarketSection": "full text of market assessment section"
  },
  "levelsSection": "full text of levels section",
  "keyLevels": {
    "supports": [
      {"price": number, "context": "string", "significance": "string (major/minor)", "historicalContext": "string"}
    ],
    "resistances": [
      {"price": number, "context": "string", "significance": "string (major/minor)", "historicalContext": "string"}
    ],
    "ranges": [
      {"lowerBound": number, "upperBound": number, "context": "string"}
    ]
  },
  "setupTypes": {
    "failedBreakdowns": [
      {
        "level": number, 
        "context": "string",
        "timeReference": "string (e.g., '8:30AM Thursday')",
        "outcome": "string"
      }
    ],
    "failedBreakdownCriteria": "string (explanation of FB criteria)",
    "failedBreakdownVariations": "string (e.g., double/triple dip explanation)",
    "backTestSetups": [
      {
        "level": number,
        "context": "string",
        "timeReference": "string"
      }
    ],
    "breakdownSetups": [
      {
        "level": number,
        "context": "string",
        "winRate": "string (e.g., '40% expected win rate')"
      }
    ]
  },
  "scenarios": {
    "bullCase": "string",
    "bearCase": "string",
    "primaryScenario": "string (which case is more likely)",
    "keyTriggerLevels": [
      {"price": number, "scenario": "string (bull/bear)", "significance": "string"}
    ]
  },
  "runnerManagement": {
    "currentPositions": "string (details of current runners)",
    "trailingStopMethodology": "string",
    "profitTakingStrategy": "string (exact percentages and levels)"
  },
  "tradingStrategy": {
    "generalApproach": "string",
    "levelToLevelManagement": "string",
    "timeSpecificGuidance": "string (e.g., avoid 11am-2pm)",
    "marketTendencies": {
      "daySpecificPatterns": "string (e.g., 'Hangover Monday')",
      "eventInfluences": "string (e.g., OPEX effects)"
    }
  },
  "tradingEducation": {
    "goldenRule": "string (90/10 principle explanation)",
    "keyPrinciples": [
      {"name": "string", "explanation": "string"}
    ],
    "terminology": {
      "rubberBandEffect": "string",
      "beachBallUnderwater": "string",
      "acceptance": "string (what constitutes valid entries)"
    }
  },
  "riskManagement": {
    "positionSizing": "string",
    "stopLossGuidance": "string",
    "profitProtectionRules": "string"
  }
}
```

This structured format should capture both the raw data and the nuanced insights from the newsletter. If any section doesn't have information in the newsletter, you can omit that section or include it with minimal/empty values. Focus on extracting the maximum useful information while maintaining accuracy.

Here's the newsletter:

[PASTE NEWSLETTER HERE]
