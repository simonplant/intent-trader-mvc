# Intent Trader System Architecture

## 1. Architecture Overview

Intent Trader is an AI-integrated trading assistant designed to streamline the workflow of active day and swing traders who follow specific trading methodologies and analysts. The system organizes trading activities around a dual structure that combines temporal market sessions with the trader's cognitive workflow.

![Architecture Overview](architecture-diagram.png)

**Core Design Principles:**
- Cognitive workflow alignment (Plan → Focus → Execute → Manage → Review)
- Temporal market session integration (Pre-Market, Open Market, Post-Market)
- Command-driven interface for consistent interaction
- Two-tier data architecture separating system and presentation layers
- Progressive implementation with focused MVP capabilities

*For detailed entity definitions and relationships, see `domain-model.md`*

## 2. Architectural Patterns

### Two-Tier Data Architecture
Intent Trader implements a strict two-tier data flow that separates system data from presentation:

**System Tier (JSON)**
- Structured data for machine processing
- Strict schema enforcement and validation
- Used for downstream component communication
- Schema version tracking for compatibility

**Human Tier (Markdown)**
- Generated from system tier data
- Optimized for readability and decision-making
- Cross-validated with system tier data
- No direct feedback into system processes

### Command-Driven Interface
The system exposes functionality through a consistent command interface:
- Commands follow `/command-name parameter=value` syntax
- All commands route through central command router
- Commands are validated before execution
- Each command produces a consistent response format

### Cognitive Workflow Alignment
Components are organized to match the trader's natural thought process:
- PLAN: Morning analysis and context building
- FOCUS: Opportunity identification and prioritization
- EXECUTE: Trade entry and position creation
- MANAGE: Active position management
- REVIEW: Performance analysis and learning

### Temporal Session Organization
Commands and workflows are additionally organized by market session:
- Pre-Market: Analysis, planning, and preparation
- Open Market: Execution, management, and adaptation
- Post-Market: Review, logging, and improvement

## 3. Component Architecture

Intent Trader uses a modular component architecture implementing the domain model entities. Components interact through well-defined interfaces with clear responsibilities.

### 3.1 Processing Engines

**Analyst Input Processors**
- **Morning Call Processor**: Transforms DP commentary into structured data
  - Includes Transcript Cleaner for preprocessing
  - Extracts market context, focus ideas, and technical levels
- **Newsletter Processor**: Two-stage processing for Mancini analysis
  - Summarizer extracts key data
  - Analyzer converts to actionable strategy

**Plan Generation Engine**
- Creates unified trade plans from multiple analyst sources
- Integrates levels, setups, and market context
- Implements scenario planning and risk allocation

**Position Management Engine**
- Tracks position lifecycle from creation to closure
- Implements size calculation, stop management, and trimming protocols
- Maintains performance metrics throughout position lifecycle

**Performance Analysis Engine**
- Records and analyzes trading outcomes
- Extracts patterns and learning opportunities
- Maintains historical performance data

### 3.2 Core Services

**Command Router**: Central orchestration point for all commands
- Maps commands to implementations via `command-map.md`
- Validates parameters before execution
- Enforces phase-appropriate command execution

**Entity Store**: Persistent storage system for domain entities
- Position tracking in `my-positions.json` and `moderator-positions.json`
- Trade plans in `trade-plan-state.json`
- Session context in `session-manifest.json`

**Schema Validator**: Ensures data integrity across the system
- Validates command parameters via `validator.md`
- Enforces schema compliance for state files
- Prevents inconsistent state mutations

### 3.3 User Interface

**Command Parser**: Processes user commands in slash format
- Extracts parameters and validates format
- Routes to appropriate handler via runtime agent

**Response Formatter**: Creates consistent, readable outputs
- Formats JSON data for human consumption
- Implements appropriate visualization for different data types

## 4. Implementation Strategy

Intent Trader follows an incremental implementation strategy focused on delivering immediate value while building toward the complete system vision.

### 4.1 Current Implementation Focus

The v0.5.1 implementation focuses on these core capabilities:

**Plan & Focus Phases**
- Processing DP morning calls and extracting trade ideas
- Analyzing Mancini newsletters through two-stage processing
- Creating unified trading plans with level integration
- Prioritizing setups by conviction and technical alignment

**Execute & Manage Phases**
- Position sizing based on risk parameters and setup type
- Position tracking and management throughout lifecycle
- Stop adjustment and partial exit handling
- Current position reporting and visualization

**Utilities & System Functions**
- Chart analysis for technical validation
- System maintenance and scaffolding utilities
- Runtime command handling and validation

### 4.2 Enhancement Path

Future enhancements will focus on:

1. **Enhanced Review Phase** capabilities
   - Comprehensive session logging
   - Pattern recognition for trader behaviors
   - Performance analytics and visualization

2. **Advanced Technical Analysis**
   - Character change detection
   - Mode determination
   - Pattern recognition enhancements

3. **Knowledge System Development**
   - Rule extraction and refinement
   - Continuous improvement framework
   - Trading behavior optimization

## 5. Data Flow Architecture

Intent Trader implements a structured data flow pipeline that transforms raw analyst inputs into actionable trading decisions and performance insights.

### 5.1 Primary Data Flow

```
Raw Input → Analyzers → [JSON Validation] → [JSON Storage] → Integration Points → Summary Generators → Human Output
                                               ↓                                     ↑
                                         System Storage                        Validation Check
```

### 5.2 State Persistence

The system maintains state across multiple structured files:

- `session-manifest.json`: Current session metadata and system status
- `my-positions.json`: Personal position tracking with full lifecycle
- `moderator-positions.json`: IC moderator position tracking
- `trade-plan-state.json`: Current trade plan with all components

State updates follow a structured validation process:
1. Command validation through `validator.md`
2. Business logic application in command handler
3. State file update with schema validation
4. Updated state reflected in subsequent commands

### 5.3 Data Transformation

The system implements these key transformations:

1. **Analyst → Structured Data**: Natural language to JSON
2. **Structured Data → Plan**: Multiple sources into unified plan
3. **Plan → Positions**: Plan elements to tracked positions
4. **Positions → Performance**: Position history to insights

## 6. Integration Points

Intent Trader integrates multiple data sources and components through well-defined interfaces.

### 6.1 Analyst Source Integration

**DP Morning Call Integration**
- Two-phase processing: cleaning and analysis
- Extracted components: market context, focus ideas, technical levels
- Integration point: `/create-plan` command

**Mancini Newsletter Integration**
- Two-phase processing: summary and analysis
- Extracted components: market mode, level framework, failed breakdowns
- Integration point: `/create-plan` command for unified strategy

### 6.2 Technical Analysis Integration

- Chart analysis capability via `/analyze-chart`
- Level extraction and prioritization
- Setup validation against technical patterns
- Trade timing optimization

### 6.3 Position Management Integration

- Size calculation based on risk parameters
- Position tracking through entire lifecycle
- Stop and target management
- Performance tracking and attribution

## 7. Runtime System

Intent Trader uses a robust runtime system for command processing and execution.

### 7.1 Runtime Agent Architecture

The core runtime agent (`runtime-agent.md`) orchestrates command execution:
- Receives commands in `/command param=value` format
- Validates against `command-map.md` entries
- Routes to appropriate implementation
- Returns structured response

### 7.2 Plugin System

The system uses a plugin-based architecture for command implementation:
- Each command defined in `plugin-registry.json`
- Commands associated with implementation files
- Phase-specific command organization
- Dependency tracking between components

### 7.3 Command Validation

All commands are validated before execution:
- Parameter format and type validation
- Required parameter enforcement
- Value range checking
- State consistency verification

### 7.4 Error Handling

The system implements a structured error handling approach:
- Parameter validation errors with specific guidance
- Processing errors with clear cause identification
- State errors with consistency recommendations
- Runtime errors with diagnostic information

## 8. System Utilities

Intent Trader includes system utilities for development and maintenance.

### 8.1 Command Scaffolding

The `/scaffold-command` utility streamlines command creation:
- Generates boilerplate for new commands
- Creates entries in registry, map, and validation files
- Ensures consistency across implementation
- Produces implementation template with proper metadata

### 8.2 System Synchronization

The `/sync-commands` utility maintains system consistency:
- Validates command registry against implementation
- Identifies missing components
- Generates patches for inconsistencies
- Supports automated repair

### 8.3 Runtime Reloading

The `/reload-active-logic` utility refreshes the runtime environment:
- Flushes stale context and cached behavior
- Reloads command definitions from authoritative files
- Rebuilds command routing tables
- Enforces deterministic behavior

## 9. Future Enhancements

The Intent Trader architecture will evolve with these planned enhancements:

### 9.1 Knowledge System

- Pattern recognition for trading behaviors
- Rule extraction from successful trades
- Learning framework for continuous improvement
- Adaptive strategy recommendations

### 9.2 Enhanced Analytics

- Multi-factor performance attribution
- Setup-specific win rate and expectancy analysis
- Psychological pattern recognition
- Visual performance dashboards

### 9.3 Advanced Technical Integration

- Real-time chart integration for setup validation
- Volume profile analysis
- Order flow insights
- Multi-timeframe alignment verification

This architecture provides the foundation for an evolving system that will grow to support the complete trading lifecycle with increasing sophistication and adaptation to trader behavior.