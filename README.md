# Intent Trader: Your AI Trading Companion

Welcome to **Intent Trader** – your intelligent trading assistant that transforms how you approach the markets!

Have you ever felt overwhelmed trying to extract actionable insights from morning calls, manage your position sizing, and track trades all at once? Intent Trader solves these challenges by working alongside you throughout your trading day, helping you make more informed decisions with greater confidence and consistency.

Intent Trader intuitively organizes your trading workflow the way your brain naturally works – from planning opportunities and focusing on the best setups to executing with precision and managing positions effectively. It's like having a dedicated trading assistant who helps you capture the wisdom from analyst calls while applying proven risk management principles to every trade.

---

## Key Features

**Intent Trader transforms your trading experience by:**

- **Capturing Every Insight**: Automatically extracts actionable trade ideas from DP morning calls so you never miss a high-conviction opportunity
- **Creating Clear Roadmaps**: Generates structured trade plans that organize opportunities by conviction, helping you focus on what matters most
- **Taking the Guesswork Out of Position Sizing**: Calculates optimal position sizes based on risk parameters and your trading strategy
- **Keeping You On Track**: Tracks entries, exits, and performance so you can focus on execution instead of bookkeeping
- **Supporting Your Entire Process**: Guides you through each trading phase from pre-market prep to post-market review
- **Speaking Your Language**: Uses intuitive slash commands that make complex actions simple and quick

---

## Power Commands at Your Fingertips

Intent Trader gives you access to powerful commands across your entire trading day:

### Pre-Market Preparation
| Command | What It Does | Example |
|---------|--------------|---------|
| `/analyze-dp` | Extracts insights from DP morning calls | `/analyze-dp [transcript]` |
| `/create-plan` | Builds your daily trading roadmap | `/create-plan` |
| `/extract-focus` | Filters for high-conviction ideas | `/extract-focus dp high` |
| `/extract-levels` | Identifies key price levels to watch | `/extract-levels dp ES,SPX` |

### Market Hours Execution
| Command | What It Does | Example |
|---------|--------------|---------|
| `/size-position` | Calculates optimal position size | `/size-position AAPL long entry=225.50 stop=223.80` |
| `/add-position` | Tracks new trade entries | `/add-position AAPL long entry=225.50 size=100 stop=223.80` |
| `/analyze-levels` | Finds support/resistance for any ticker | `/analyze-levels SPX support` |
| `/list-positions` | Shows your active position dashboard | `/list-positions` |
| `/update-position` | Manages stops and partial exits | `/update-position AAPL move-stop value=224.50` |
| `/close-position` | Records completed trades | `/close-position AAPL exit_price=227.50` |

### Post-Market Review (Coming Soon)
| Command | What It Does | Example |
|---------|--------------|---------|
| `/log-trade` | Creates detailed trade records | `/log-trade AAPL` |
| `/run-debrief` | Analyzes your trading session | `/run-debrief` |

---

## Your Natural Trading Flow

Intent Trader mirrors how successful traders actually think, supporting each cognitive phase of your trading process:

### 1. PLAN - Set the Stage for Success
Begin your day by transforming analyst commentary into a clear market framework:
- Process DP morning calls with a single command
- Identify key levels that other traders are watching
- Understand the broader market context and sentiment
- Create a personalized roadmap for your trading day

### 2. FOCUS - Zero In On What Matters
Cut through the noise and prioritize the highest-probability opportunities:
- Automatically extract high-conviction trading ideas
- Rank setups by quality and probability of success
- Organize your watchlist in priority order
- Prepare for confident, targeted execution

### 3. EXECUTE - Enter with Confidence
Take the emotion out of trade entries with systematic validation:
- Calculate position sizes based on your risk tolerance
- Validate trades against your pre-defined criteria
- Time entries based on optimal market conditions
- Document your trades with complete context

### 4. MANAGE - Navigate Changing Conditions
Stay disciplined with active position management:
- Track all positions in a clean, organized dashboard
- Apply consistent rules to protect profits and manage risk
- Adjust stops based on price action developments
- Build around core positions when appropriate

### 5. REVIEW - Turn Experience Into Wisdom
Transform each trading day into lessons that improve future performance:
- Document completed trades with full context
- Assess how closely you followed your plan
- Identify patterns in your trading behavior
- Prepare for tomorrow with new insights

---

## Getting Started in Minutes

Getting started with Intent Trader is quick and easy:

1. **Upload the Intent Trader ZIP** archive to ChatGPT

2. **Initialize the system** with a single command:
   ```
   Please read and load ALL files from this codebase.
   Use INSTALL.md to load the application.
   Use system/runtime/entrypoint.md to initialize the appliction.
   Use system/runtime/runtime-agent.md as the routing layer for commands.
   Use system/runtime/command-map.md to map valid commands.
   Strictly route all prompts via this application's runtime code first.
   ```

3. **Process the morning call** to extract trading opportunities:
   ```
   /analyze-dp [paste your morning call transcript]
   Run prompts/plan/analyze-mancini-preprocessor.md
   /analyze-mancini preprocessedData='[PASTE JSON HERE]'
   ```

4. **Generate your trading plan** for the day:
   ```
   /create-plan
   ```

5. **Calculate the right position size** before entering a trade:
   ```
   /size-position AAPL long entry=225.50 stop=223.80 setup=bull-flag conviction=high
   ```

6. **Track your positions** during market hours:
   ```
   /add-position AAPL long entry=225.50 size=100 stop=223.80 targets=227.50,229.00,232.00
   ```

You'll be up and running in less than 5 minutes, transforming how you trade from day one!

---

## Intelligent Architecture That Works Like You Do

Intent Trader's architecture mirrors both how markets operate and how traders think:

### Aligned with Market Sessions
Intent Trader organizes functionality around the natural rhythm of the trading day:
- **Pre-Market Session**: Plan development and opportunity identification
- **Open Market Session**: Execution decisions and position management
- **Post-Market Session**: Performance review and learning

### Built Around Your Cognitive Process
The system's domain structure matches how traders mentally process the markets:
- **PLAN Domain**: Creating your market framework and opportunity map
- **FOCUS Domain**: Prioritizing setups and allocating attention
- **EXECUTE Domain**: Validating entries and sizing positions
- **MANAGE Domain**: Handling active trades through their lifecycle
- **REVIEW Domain**: Analyzing outcomes and extracting lessons

### Modular Components Working Together
- **Processing Engines**: Specialized analyzers that transform raw data into actionable insights
- **Command Router**: Intelligent system that directs your commands to the right components
- **Entity Store**: Secure storage for tracking your positions, plans, and trading data
- **Output Formatters**: Clear presentation of information optimized for trader decision-making

This thoughtful design ensures Intent Trader feels like a natural extension of your trading process rather than just another tool.

---

## Current Features & What's Coming Next

### Intent Trader v0.5.1 (Current Release)
Our current version focuses on the core functionality most critical to your trading success:

- **Morning Call Analysis**: Automatically extract actionable insights from DP's commentary
- **Conviction Classification**: Identify high/medium/low conviction trade ideas
- **Unified Trade Planning**: Generate structured trading plans with priorities and levels
- **Risk-Based Position Sizing**: Calculate optimal position sizes based on your risk parameters
- **Position Tracking**: Maintain a complete dashboard of your active trades
- **Core Position Management**: Support for DP's "trading around a core" methodology

### Coming in v0.5.2 (Next Release)
We're excited about these powerful enhancements coming in our next update:

- **Mancini Newsletter Integration**: Extract insights from Mancini's market analysis
- **Runner Management Protocol**: Implement the 75/15/10 rule for systematic profit-taking
- **Advanced Stop Techniques**: Sophisticated trailing stop methodologies
- **Failed Breakdown Detection**: Specialized pattern identification for high-probability setups
- **Comprehensive Performance Analytics**: Detailed analysis of your trading patterns

These upcoming features will further enhance your trading process, giving you even more powerful tools to navigate the markets with confidence.

---

## Smart Position Sizing That Protects Your Capital

One of Intent Trader's most powerful features is its intelligent position sizing system that:

- **Eliminates Emotional Sizing**: Calculates precise position sizes based on your risk parameters and trading charter
- **Adapts to Trade Quality**: Automatically adjusts size based on setup type and conviction level
- **Offers Alternatives**: Provides both conservative and aggressive options for different market conditions
- **Supports Strategic Building**: Implements DP's "trading around a core" methodology for progressive position building
- **Prevents Sizing Errors**: Warns about impractical position sizes for options and higher-priced instruments
- **Enforces Your Guardrails**: Respects maximum risk limits from your trading charter

Simply run this command before any trade to get optimal sizing recommendations:
```
/size-position AAPL long entry=225.50 stop=223.80 setup=bull-flag conviction=high
```

You'll receive clear guidance on position size, risk exposure, and strategic alternatives – taking the guesswork out of one of trading's most critical decisions.

---

## Resources & Support

### Helpful Resources
- **Command Reference**: Detailed guide for every command in `/docs/commands.md`
- **User Guide**: Step-by-step instructions in `/docs/how-to/run-daily-session.md`
- **Development Guide**: Technical information in `/docs/developer-handbook.md`

### Getting Help
Type `/help` at any time during your session to:
- See available commands
- Get usage examples
- Access command-specific guidance
- Find troubleshooting information

### Join Our Community
Connect with other Intent Trader users to share strategies, tips, and insights. Follow our updates to be the first to know about new features and improvements.

---

Ready to transform your trading? Type `/help` to begin your journey with Intent Trader!

---
