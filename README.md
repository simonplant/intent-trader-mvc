# Intent Trader

*A schema-driven, phase-based AI trading assistant*

**Version: 0.5.2** | Released: May 20, 2025

## Introduction

Intent Trader is a comprehensive AI-powered trading assistant designed to enhance your trading workflow through structured decision-making processes. Built on a foundation of schema-validated data structures, command-driven interfaces, and phase-based trading workflows, Intent Trader helps traders systematically analyze, plan, execute, and review their trading activities.

The system integrates multiple sources of market intelligence, including DP morning calls, Mancini newsletters, technical analysis, and real-time market data to create unified trading plans tailored to current market conditions. Intent Trader's architecture is designed for consistency, reproducibility, and continuous improvement in trading performance.

### Core Architecture

- **Commands**: A standardized set of slash commands for all trading operations
- **Schema**: Canonical data structures ensuring consistency across all components
- **Runtime**: The execution environment handling command routing, validation, and state management

## Versioning

### Current Runtime Schema: v0.5.2

Intent Trader follows semantic versioning with the following guarantees:

- **Major version (0.x.x)**: Breaking changes to core schemas or command interfaces
- **Minor version (x.5.x)**: Feature additions and non-breaking enhancements
- **Patch version (x.x.2)**: Bug fixes and documentation updates

Release cadence is monthly for feature releases and as-needed for patches.

## System Overview

Intent Trader organizes the trading workflow into five cognitive domains, representing the natural progression of a trading day:

| Domain | Purpose | Representative Commands |
|--------|---------|-------------------------|
| **PLAN** | Gather intelligence, analyze market context | `/analyze-dp`, `/summarize-mancini` |
| **FOCUS** | Create actionable plans, set priorities | `/create-plan`, `/extract-focus` |
| **EXECUTE** | Size positions, make entry decisions | `/size-position`, `/add-position` |
| **MANAGE** | Track and adjust active positions | `/update-position`, `/close-position` |
| **REVIEW** | Record outcomes, synthesize learnings | `/log-session` |

### Trade Lifecycle

A typical trade progresses through the system as follows:

1. **Intelligence Gathering**: Analyze DP morning call or Mancini newsletter
2. **Plan Creation**: Generate a unified trading plan with specific setups
3. **Setup Validation**: Confirm setups with technical analysis (charts)
4. **Position Sizing**: Calculate appropriate risk-based position sizes
5. **Trade Execution**: Enter positions and record details
6. **Position Management**: Update stops, take partial profits, close positions
7. **Session Logging**: Record comprehensive session data
8. **Performance Analysis**: Review outcomes and extract learnings

## Command Reference

### PLAN Phase Commands

| Command | Description | Input | Output |
|---------|-------------|-------|--------|
| `/clean-dp-transcript` | Clean DP morning call transcripts | Transcript text | Cleaned transcript |
| `/analyze-dp` | Process DP morning call | Transcript text | Market context, focus ideas, levels |
| `/summarize-mancini` | Extract data from Mancini newsletter | Newsletter text | Structured newsletter summary |
| `/analyze-mancini` | Process Mancini newsletter summary | Structured summary | Market mode assessment, level framework |

### FOCUS Phase Commands

| Command | Description | Input | Output |
|---------|-------------|-------|--------|
| `/create-plan` | Generate unified trade plan | Previous analyses | Complete trading plan with scenarios |
| `/extract-focus` | Extract high-conviction ideas | Source, minimum conviction | Prioritized focus ideas |
| `/extract-levels` | Extract key technical levels | Source, indices | Structured level framework |

### EXECUTE Phase Commands

| Command | Description | Input | Output |
|---------|-------------|-------|--------|
| `/size-position` | Calculate position size | Symbol, entry, stop, setup type | Recommended position size with alternatives |
| `/add-position` | Track new position | Symbol and position details | Created position record |

### MANAGE Phase Commands

| Command | Description | Input | Output |
|---------|-------------|-------|--------|
| `/update-position` | Update position details | Symbol, action, value | Updated position record |
| `/close-position` | Close position and record outcome | Symbol, exit price, reason | Closed position with performance metrics |
| `/list-positions` | Show current positions | Filters (optional) | Current position summary |

### REVIEW Phase Commands

| Command | Description | Input | Output |
|---------|-------------|-------|--------|
| `/log-session` | Record complete session data | Date, market conditions | Comprehensive session log |

### UTILITY Commands

| Command | Description | Input | Output |
|---------|-------------|-------|--------|
| `/analyze-chart` | Analyze chart patterns and levels | Chart image, parameters | Technical analysis with setups and levels |
| `/help` | Show available commands | Command name (optional) | Command documentation |
| `/status` | Show current trading session state | None | Session status report |

## Schema Architecture

Intent Trader uses a dual-schema architecture:

1. **Canonical Schema (`intent-trader-master-schema.json`)**: The authoritative source of truth with complete object definitions
2. **Runtime Schema (`intent-trader-runtime-schema.json`)**: Optimized for LLM consumption with flattened structures

### Primary Schema Objects

| Object | Description | Generated By | Consumed By |
|--------|-------------|--------------|-------------|
| `baseObject` | Foundation for all other objects | (Base definition) | All components |
| `tradeIdea` | Trading setup with conviction, entry/exit | `/analyze-dp`, `/analyze-mancini` | `/create-plan` |
| `marketFramework` | Market bias, mode, character assessment | `/analyze-dp`, `/analyze-mancini` | `/create-plan` |
| `levelFramework` | Support/resistance levels for indices/stocks | `/extract-levels` | `/create-plan` |
| `tradePlan` | Complete trading plan with scenarios | `/create-plan` | All EXECUTE and MANAGE commands |
| `tradePosition` | Active or closed trading position | `/add-position`, `/update-position` | `/list-positions`, `/close-position` |
| `sessionLog` | Complete trading session record | `/log-session` | Review components |
| `conversationContext` | State tracking for active session | System | All commands |

### Schema Coverage Map

```
                                      ┌───────────────┐
┌───────────────┐                     │  tradeIdea    │
│ analyze-dp    ├────────────────────►│  conviction   │
└───────────────┘                     │  entryParams  │
                                      └───────┬───────┘
┌───────────────┐                             │
│ analyze-mancini├────────────────────────────┘
└───────────────┘                             │
                                              ▼
┌───────────────┐                     ┌───────────────┐         ┌───────────────┐
│ extract-levels ├────────────────────►│ levelFramework├────────►│  create-plan  │
└───────────────┘                     └───────────────┘         └───────┬───────┘
                                                                        │
                                      ┌───────────────┐                 │
                                      │ marketFramework◄────────────────┘
                                      └───────────────┘                 │
                                                                        ▼
                                                               ┌───────────────┐
                                                               │   tradePlan   │
                                                               └───────┬───────┘
                                                                       │
                  ┌───────────────┐                                    │
                  │size-position  ◄────────────────────────────────────┘
                  └───────┬───────┘                                    │
                          │                                            │
                          ▼                                            ▼
                  ┌───────────────┐                            ┌───────────────┐
                  │add-position   │                            │update-position│
                  └───────┬───────┘                            └───────┬───────┘
                          │                                            │
                          ▼                                            ▼
                  ┌───────────────┐                            ┌───────────────┐
                  │ tradePosition ◄───────────────────────────►│close-position │
                  └───────┬───────┘                            └───────────────┘
                          │
                          ▼
                  ┌───────────────┐
                  │  sessionLog   │◄──────────────────────────┐
                  └───────────────┘                           │
                                                              │
                                                     ┌───────────────┐
                                                     │  log-session  │
                                                     └───────────────┘
```

## Feature Matrix

### Implemented Capabilities

✓ - Fully Implemented | ⚠ - Partial Implementation | ✗ - Planned/Future

| Feature | Status | Command | Schema Objects |
|---------|--------|---------|----------------|
| DP Morning Call Analysis | ✓ | `/analyze-dp` | `marketFramework`, `tradeIdea`, `levelFramework` |
| Mancini Newsletter Analysis | ✓ | `/analyze-mancini` | `marketFramework`, `tradeIdea`, `levelFramework` |
| Trade Plan Generation | ✓ | `/create-plan` | `tradePlan` |
| Position Sizing | ✓ | `/size-position` | Uses `tradeIdea` data |
| Position Management | ✓ | `/add-position`, `/update-position`, `/close-position` | `tradePosition` |
| Session Logging | ✓ | `/log-session` | `sessionLog` |
| Chart Analysis | ⚠ | `/analyze-chart` | Feeds into `levelFramework` |
| Scenario Planning | ✓ | Part of `/create-plan` | Within `tradePlan` |
| Risk Management | ✓ | Integrated in multiple commands | Across multiple schemas |
| Performance Analytics | ⚠ | Part of `/log-session` | Within `sessionLog` |
| Trade Alerts | ✗ | Planned | Future schema |
| Backtesting | ✗ | Planned | Future schema |

## Architecture Summary

Intent Trader follows a modular component architecture:

### Core Components

- **Command Router**: Routes slash commands to appropriate handlers based on command-map.md
- **Schema Validator**: Ensures all data structures conform to canonical schemas
- **Prompt System**: Structured prompts for each trading operation phase
- **State Manager**: Maintains session state, positions, and plan data
- **Analysis Engine**: Processes market data and analyst commentary

### Data Flow

1. User input (command or data) → Command Router
2. Command Router → Specific Prompt
3. Prompt execution → Schema-validated output
4. Output stored in State Manager
5. State available to subsequent commands

## Example Workflows

### Morning Setup Workflow

```
1. /clean-dp-transcript [raw transcript]
2. /analyze-dp [cleaned transcript]
3. /create-plan
4. /extract-focus source=dp min_conviction=high
```

### Trade Execution Workflow

```
1. /size-position AAPL long entry=225.50 stop=223.80 setup=bull-flag conviction=high
2. /add-position AAPL long entry=225.50 size=100 stop=223.80 targets=227.50,229.00,232.00 setup=bull-flag
3. /update-position AAPL move-stop value=224.50 notes="Moving stop to breakeven after first target hit"
4. /close-position AAPL exit_price=227.50 reason="target" notes="First target reached"
```

### End-of-Day Workflow

```
1. /list-positions status=all
2. /log-session date="2025-05-20" market_mode="Mode 2" cognitive_load=6.4 decision_quality=NORMAL
```

## Installation & Startup

### Quick Start

1. Upload the Intent Trader ZIP file to the chat environment
2. The system will auto-initialize based on INSTALL.md
3. Verify initialization with expected output:
   ```
   Runtime initialized.
   Commands loaded: [count]
   Active command map: [command-map]
   Session manifest loaded: [session-state]
   Emoji enforcement: active
   Audit logging: active
   Awaiting your next instruction.
   ```

### Manual Initialization

If automatic initialization fails:

1. Request to load INSTALL.md first
2. Follow the initialization protocol manually
3. Verify the command map is loaded
4. Test with a simple command like `/help`

## Schema Compliance

All components in Intent Trader are designed to be schema-compliant:

1. **Inputs**: Command parameters are validated against schema requirements
2. **Processing**: Transformations maintain schema integrity
3. **Outputs**: Generated data structures conform to canonical schemas
4. **Storage**: Persisted state maintains schema version compatibility

This ensures that:
- Commands can rely on predictable data structures
- Analyses maintain consistency across trading days
- Position tracking remains reliable
- Historical data can be meaningfully compared

## Support & Community

### Documentation

- Complete command reference in `/docs/command-reference.md`
- Schema documentation in `/data/schemas/README.schema.md`
- Architecture details in `/docs/architecture/system-architecture.md`

### Roadmap

The Intent Trader roadmap is available in `/docs/planning/` with upcoming versions:
- v0.5.3: Enhanced chart analysis, improved pattern recognition
- v0.5.4: Position performance analytics, comparative analysis

### Feedback & Contributions

We welcome feedback and contributions to improve Intent Trader:
- Feature requests via `/feedback` command
- Bug reports through issue tracking
- Documentation improvements

## License & Attribution

Intent Trader is proprietary software.
© 2025 Intent Trader Team. All rights reserved.
