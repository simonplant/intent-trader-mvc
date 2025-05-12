# Main Controller (Intent Trader)

This file routes all prompt interactions by phase and type, enforcing standardized behavior and style.

## Routes

| Route              | Phase       | Description                                  |
|-------------------|-------------|----------------------------------------------|
| /dp-analysis       | premarket   | Parses and extracts trade ideas from DP call |
| /mancini-analysis  | premarket   | Parses Mancini's letter and extracts levels  |
| /stack-rank-trades | premarket   | Prioritizes trades by confidence and setup   |
| /validate-trade    | intraday    | Validates if a trade matches the day’s plan  |
| /log-trade         | intraday    | Logs executed trade and rationale            |
| /check-alerts      | intraday    | Triggers if key levels or alerts are hit     |
| /compare-execution | postmarket  | Reviews trade plan vs. actual execution      |
| /performance-coach | postmarket  | Gives coaching based on tagging and behavior |
| /missed-trades     | postmarket  | Flags missed A+ setups based on plan         |
