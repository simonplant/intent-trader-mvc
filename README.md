# Intent Trader (v0.4.0-pre)

Intent Trader is a modular, analytics-ready AI trading assistant designed for high-performance, independent traders.

## 🔧 What It Does
- Parses elite market intelligence (DP, Mancini, VTF)
- Builds a unified daily trade plan by confidence and size
- Validates trades in real time for plan alignment
- Logs execution and tags emotional behaviors
- Coaches you postmarket based on missed trades and performance
- Prepares your mind and account for sustainable alpha

## 🗂️ Project Structure

| Folder         | Purpose                                          |
|----------------|--------------------------------------------------|
| `/prompts/`    | Phase-based prompts (premarket, intraday, post) |
| `/system/`     | Controllers, specs, metadata style               |
| `/logs/`       | JSON-formatted trades, behaviors, reviews        |
| `/knowledge/`  | DP + Mancini models, setups, lessons             |
| `/docs/`       | Daily reference, audits, process flows           |
| `/tests/`      | QA testing of prompt metadata and file health    |

## 🚀 Getting Started

```bash
cd ~/Documents/code/
unzip intent-trader-v0.4.0-pre-snapshot.zip
code intent-trader.code-workspace
```

Use `/dp-analysis`, `/mancini-analysis`, and `/stack-rank-trades` to begin your day.

## 🧪 QA Testing

```bash
python3 tests/validate-metadata.py
```

More tests will follow in `/tests/` as simulation support is added.

## 👨‍💻 Development Status
This is a private alpha. Use at your own risk. Structured for aggressive iteration. Feedback welcome.

## License
MIT-style, personal and non-commercial use only.
