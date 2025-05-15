# Intent Trader

Intent Trader is an AI-integrated trading assistant designed to streamline and automate trading workflows for active traders. It organizes the entire trading day around a cognitive workflow (Plan → Focus → Execute → Manage → Review) while supporting the natural temporal sessions of trading (Pre-Market, Open Market, Post-Market).

---

## 🚀 Key Features

- **Analyst Insight Processing**: Extract actionable trade ideas from DP morning calls
- **Unified Trade Planning**: Create prioritized, structured trading plans
- **Position Management**: Track entries, exits, and performance
- **End-to-End Workflow**: Support for complete trading lifecycle
- **Command-Based Interface**: Intuitive slash commands for all trading activities

---

## 📝 Command Organization

### Pre-Market Session Commands

#### PLAN Phase
- `/analyze-dp [transcript]` - Process DP morning call
- `/create-plan` - Generate unified trade plan

#### FOCUS Phase
- `/extract-focus [source] [min_conviction]` - Extract high-conviction ideas
- `/extract-levels [source] [indices]` - Extract key technical levels

### Open Market Session Commands

#### EXECUTE Phase
- `/add-position [symbol]` - Track new position
- `/analyze-levels [symbol]` - Analyze ticker levels

#### MANAGE Phase
- `/list-positions` - Show current positions
- `/update-position [symbol]` - Update position details
- `/close-position [symbol]` - Close position and log results
- `/manage-runner [symbol]` - Apply runner management protocol

### Post-Market Session Commands

#### REVIEW Phase
- `/log-trade [symbol]` - Record trade performance
- `/run-debrief` - Analyze trading session

---

## 🔄 Cognitive Trading Workflow

Intent Trader organizes functionality according to the trader's cognitive process:

### 1. PLAN
Establish market framework and potential opportunities:
- Process analyst commentary
- Identify key technical levels
- Assess market context
- Create unified trade plan

### 2. FOCUS
Prioritize specific trade opportunities:
- Extract high-conviction ideas
- Rank opportunities by quality
- Create watchlist priorities
- Prepare for execution

### 3. EXECUTE
Enter positions based on prepared plans:
- Validate potential trades
- Size positions appropriately
- Execute with optimal timing
- Track new positions

### 4. MANAGE
Handle active positions toward optimal outcomes:
- Monitor active positions
- Apply systematic profit-taking
- Adjust stops based on price action
- Manage runners for extended trades

### 5. REVIEW
Analyze performance for continuous improvement:
- Log completed trades
- Assess plan adherence
- Identify patterns and lessons
- Prepare for next trading day

---

## 🚀 Getting Started

1. Upload the Intent Trader ZIP archive to ChatGPT
2. Initialize using:
   ```
   Please read and load ALL files from this ZIP archive.
   Use system/systemops/runtime-agent.md as the routing layer for commands.
   Use system/systemops/command-map.md to map valid commands.
   Use state/session-manifest.json to determine the current session phase.
   ```
3. Begin your trading day with:
   ```
   /analyze-dp [paste your morning call transcript]
   ```
4. Generate your trading plan:
   ```
   /create-plan
   ```
5. Start managing positions during market hours:
   ```
   /add-position AAPL long entry=225.50 size=100 stop=223.80 targets=227.50,229.00,232.00
   ```

---

## 🏗️ System Architecture

Intent Trader is built on a hybrid architecture that combines temporal trading sessions with a cognitive workflow:

### Temporal Sessions
- **Pre-Market Session**: Plan + Focus phases
- **Open Market Session**: Execute + Manage phases
- **Post-Market Session**: Review phase

### Domain Organization
- **PLAN Domain**: Market framework and opportunities
- **FOCUS Domain**: Setup prioritization and attention allocation
- **EXECUTE Domain**: Position entry and validation
- **MANAGE Domain**: Active position handling
- **REVIEW Domain**: Performance analysis and learning

### Component Structure
- **Processing Engines**: Analyze input and generate insights
- **Command Router**: Direct user inputs to appropriate modules
- **Entity Store**: Maintain session state and trading data
- **Output Formatters**: Present information in clear, actionable formats

---

## 💻 Development Status

Intent Trader v0.5.1 is the current MVP release, focusing on essential functionality for daily trading:

- **PLAN & FOCUS**: DP morning call analysis, trade idea extraction, unified plan creation
- **EXECUTE & MANAGE**: Position tracking, updates, and basic management
- **REVIEW**: Basic trade logging and session analysis

Future enhancements will include Mancini newsletter integration, advanced position management, and comprehensive performance analytics.

---

## 🌐 Resources

- **Command Reference**: See `/docs/commands.md`
- **User Guide**: See `/docs/how-to/run-daily-session.md`
- **Development Guide**: See `/docs/developer-handbook.md`

---

For more information or to start using Intent Trader, type `/help` after initialization.
