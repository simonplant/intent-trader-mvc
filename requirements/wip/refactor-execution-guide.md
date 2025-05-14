---
title: Intent Trader Refactor Execution Guide
description: Step-by-step prompt sequence and file prep plan for implementing the Enhanced Intent Trader Framework in a clean ChatGPT session
author: Claude 3.7 Sonnet
version: 2.0
last_updated: 2025-05-13
category: systemops
---

# ✅ Let's Do This — Implementing the Enhanced Intent Trader Framework

This guide presents a structured execution plan to implement the complete Enhanced Intent Trader Framework using ChatGPT and a prompt-based workflow approach. It breaks down the complex implementation into manageable phases with specific file preparations and prompts for each stage.

---

## 🧭 PHASE 0: Session Preparation and Foundation

### 🧼 New Chat Preparation
- ✅ Upload `intent-trader.zip` (latest build with current structure)
- ✅ Upload `final-implementation-plan.md` (our synthesized plan)
- ✅ Upload `wip-consolidation-plan.md` (original plan)
- ✅ Upload `gan-qa-review.md` (feedback on enhancements)
- ✅ Create and upload a small `schemas.zip` with sample schemas if available

### 🏗️ Initial Session Setup Prompt
```plaintext
I'm implementing the Enhanced Intent Trader Framework following our final implementation plan. Let's start with creating the foundational structure and schemas. Please help me establish the core architecture components for Phase 0.

For context, this is a trading system that combines technical analysis with cognitive tracking to create blueprints that adapt to market conditions and trader state.

First, I need to create:
1. Directory structure
2. Core schema files (metadata.schema.json, blueprint.schema.json)
3. Basic registry discovery script

Please provide implementation-ready content for these components.
```

---

## 🧩 PHASE 1: Schema Foundation & Blueprint Structure

### 📂 Files to Prepare
- Create empty `/system/schemas/` directory
- Create empty `/system/templates/` directory
- Create empty `/system/registry/` directory

### 🔄 Implementation Prompt
```plaintext
Let's implement the core schemas that will form the foundation of our system. 

Please create complete, implementation-ready versions of:

1. system/schemas/metadata.schema.json - The unified metadata schema for all documents
2. system/schemas/blueprint.schema.json - Schema for the blueprint structure
3. system/schemas/status.schema.json - Schema for status updates
4. system/schemas/cognitive-load.schema.json - Schema for tracking cognitive state

Each schema should include:
- Complete JSON Schema structure with appropriate types, properties, and validation
- Comments explaining key fields
- Example values where helpful
```

### 🧪 Registry Script Implementation
```plaintext
Now I need to create the registry discovery script that will automatically catalog all prompts and templates in the system.

Please create a complete implementation-ready version of:
system/registry/registry.js

This script should:
- Scan directories for markdown files with front matter
- Extract metadata from front matter
- Build a structured registry of all system components
- Write the registry to system/registry/prompt-registry.json
- Include helper functions for looking up prompts by type, market mode, etc.

Please provide the complete JavaScript implementation with error handling.
```

---

## 📝 PHASE 2: Blueprint System Implementation

### 📂 Files to Prepare
- Create empty `/system/blueprints/` directory
- Create empty `/prompts/premarket/` directory
- Create empty `/prompts/intraday/` directory

### 🔄 Blueprint Framework Prompt
```plaintext
Let's implement the blueprint system that forms the core of our trading framework.

Please create implementation-ready versions of:

1. system/blueprints/structure.md - The blueprint component definition document
2. system/blueprints/generation.md - The blueprint generation process documentation
3. system/blueprints/adaptation.md - The blueprint adaptation framework
4. system/blueprints/extraction-source-map.json - Source mapping for extraction

Each document should:
- Include proper front matter following our metadata schema
- Provide comprehensive documentation of the component
- Include examples where appropriate
```

### 🔄 Blueprint Prompt Implementation
```plaintext
Now I need to create the actual prompts that will generate and update the trading blueprints.

Please create implementation-ready versions of:

1. prompts/premarket/morning-blueprint.md - The prompt for generating the daily blueprint
2. prompts/intraday/blueprint-update.md - The prompt for updating blueprints during the trading day

Each prompt should:
- Include proper front matter following our metadata schema
- Implement a structured prompt format with clear instructions
- Include test vectors for validation
- Incorporate cognitive awareness as described in our final implementation plan
```

---

## 🧠 PHASE 3: Cognitive Framework Implementation

### 📂 Files to Prepare
- Create empty `/system/cognitive/` directory
- Create empty `/system/protocols/` directory

### 🔄 Cognitive System Prompt
```plaintext
Let's implement the cognitive tracking system that will monitor and adapt to the trader's mental state.

Please create implementation-ready versions of:

1. system/cognitive/state-tracking.md - The cognitive state tracking methodology
2. system/cognitive/load-calculation.md - The cognitive load calculation algorithm
3. system/cognitive/adaptation-matrix.md - The adaptation decision matrix
4. system/protocols/cognitive-reset.md - The cognitive reset protocol

Each document should:
- Include proper front matter following our metadata schema
- Provide comprehensive documentation with clear methodologies
- Include examples and use cases
- Reference the cognitive-load.schema.json where appropriate
```

### 🔄 Cognitive Prompts Implementation
```plaintext
Now I need to create the prompts that will implement cognitive tracking and reset functionality.

Please create implementation-ready versions of:

1. prompts/intraday/status-update.md - Status tracking prompt with cognitive state
2. prompts/intraday/cognitive-reset.md - Cognitive reset prompt
3. prompts/intraday/midday-reset.md - Midday plan reset prompt

Each prompt should:
- Include proper front matter following our metadata schema
- Implement a structured prompt format with clear instructions
- Include test vectors for validation
- Incorporate both technical and cognitive elements
```

---

## 📊 PHASE 4: Status Tracking Framework

### 📂 Files to Prepare
- Create empty `/system/status-tracking/` directory
- Create empty `/system/workflows/` directory

### 🔄 Status Framework Prompt
```plaintext
Let's implement the status tracking framework that will monitor trade ideas and execution.

Please create implementation-ready versions of:

1. system/status-tracking/framework.md - Status categories and methodology
2. system/status-tracking/transitions.md - State transition rules
3. system/status-tracking/visualization.md - Status visualization guidelines
4. system/workflows/status-update-cycle.md - Update frequency and triggers

Each document should:
- Include proper front matter following our metadata schema
- Provide comprehensive documentation with clear methodologies
- Include examples and state diagrams where appropriate
- Reference the status.schema.json where appropriate
```

### 🔄 Status Integration Prompt
```plaintext
Now I need to integrate the status tracking with both blueprints and cognitive frameworks.

Please create implementation-ready versions of:

1. system/workflows/blueprint-status-link.md - Blueprint/status integration
2. system/workflows/cognitive-status-link.md - Cognitive/status integration

Each document should:
- Document the bidirectional flow between systems
- Include proper front matter following our metadata schema
- Provide examples of how status updates influence blueprints and vice versa
- Include workflow diagrams
```

---

## 📡 PHASE 5: Moderator Signal Framework

### 📂 Files to Prepare
- Create empty `/system/moderator-signals/` directory

### 🔄 Moderator Framework Prompt
```plaintext
Let's implement the moderator signal framework that will process trading alerts and notifications.

Please create implementation-ready versions of:

1. system/moderator-signals/classification.md - Signal classification system
2. system/moderator-signals/hierarchy.md - Priority weighting system
3. system/moderator-signals/processing.md - Signal processing workflow
4. system/workflows/alert-integration.md - Alert processing workflow

Each document should:
- Include proper front matter following our metadata schema
- Provide comprehensive documentation with clear taxonomies
- Include examples of different signal types and their handling
- Reference the moderator-signal.schema.json where appropriate
```

### 🔄 Moderator Prompt Implementation
```plaintext
Now I need to create the prompt that will process moderator signals and alerts.

Please create an implementation-ready version of:
prompts/intraday/process-moderator-alerts.md

This prompt should:
- Include proper front matter following our metadata schema
- Implement a structured prompt format with clear instructions
- Include classification logic for incoming alerts
- Incorporate priority weighting
- Include test vectors for validation
- Link alerts to both blueprint and cognitive systems
```

---

## 📈 PHASE 6: Technical Framework Integration

### 📂 Files to Prepare
- Create empty `/system/technical-framework/` directory

### 🔄 Technical Framework Prompt
```plaintext
Let's implement the technical analysis framework that will identify patterns and levels.

Please create implementation-ready versions of:

1. system/technical-framework/pattern-recognition.md - Pattern recognition system
2. system/technical-framework/mancini-integration.md - Mancini framework integration
3. system/technical-framework/level-significance.md - Level significance taxonomy
4. system/chart-legend.md - Updated chart annotation system

Each document should:
- Include proper front matter following our metadata schema
- Provide comprehensive documentation with clear pattern taxonomies
- Include examples of pattern identification and significance assessment
- Include visual references where appropriate
```

### 🔄 Technical Prompts Implementation
```plaintext
Now I need to create the prompts that will implement technical analysis functionality.

Please create implementation-ready versions of:

1. prompts/premarket/mancini-chart-map.md - Mancini level mapping prompt
2. prompts/intraday/chart-analysis.md - Chart pattern analysis prompt

Each prompt should:
- Include proper front matter following our metadata schema
- Implement a structured prompt format with clear instructions
- Include test vectors for validation
- Incorporate cognitive awareness where appropriate
```

---

## ⚙️ PHASE 7: Execution Framework

### 📂 Files to Prepare
- Create empty `/system/execution/` directory

### 🔄 Execution Framework Prompt
```plaintext
Let's implement the execution framework that will bridge planning and action.

Please create implementation-ready versions of:

1. system/execution/plan-to-execution.md - Blueprint to execution bridge
2. system/execution/real-time-adaptation.md - Framework for adapting to changes
3. system/execution/cognitive-load.md - Cognitive load management for execution
4. system/workflows/execution-quality.md - Execution quality measurement

Each document should:
- Include proper front matter following our metadata schema
- Provide comprehensive documentation with clear methodologies
- Include examples of execution processes and adaptation
- Link execution to both blueprint and cognitive systems
```

### 🔄 Execution Prompt Implementation
```plaintext
Now I need to create the prompt that will support execution optimization.

Please create an implementation-ready version of:
prompts/intraday/copilot-recenter.md

This prompt should:
- Include proper front matter following our metadata schema
- Implement a structured prompt format with clear instructions
- Include techniques for maintaining focus during execution
- Incorporate cognitive state awareness
- Include test vectors for validation
```

---

## 🔄 PHASE 8: Learning Framework

### 📂 Files to Prepare
- Create empty `/system/learning/` directory

### 🔄 Learning Framework Prompt
```plaintext
Let's implement the learning framework that will improve system performance over time.

Please create implementation-ready versions of:

1. system/learning/performance-metrics.md - Performance measurement framework
2. system/learning/blueprint-adaptation.md - Template adaptation from results
3. system/learning/cognitive-patterns.md - Cognitive pattern recognition
4. system/workflows/daily-learning-cycle.md - Daily learning workflow

Each document should:
- Include proper front matter following our metadata schema
- Provide comprehensive documentation with clear methodologies
- Include examples of learning processes and adaptation
- Define specific metrics for measuring improvement
```

### 🔄 Learning Prompt Implementation
```plaintext
Now I need to create the prompts that will implement the learning and adaptation functionality.

Please create implementation-ready versions of:

1. prompts/postmarket/performance-review.md - Enhanced performance analysis
2. prompts/postmarket/system-adaptation.md - System adaptation recommendations

Each prompt should:
- Include proper front matter following our metadata schema
- Implement a structured prompt format with clear instructions
- Include metrics collection and analysis
- Incorporate both technical and cognitive performance assessment
- Include test vectors for validation
```

---

## 🔗 PHASE 9: System Integration

### 📂 Files to Prepare
- Create empty `/system/integrator.md` file

### 🔄 Integration Framework Prompt
```plaintext
Let's implement the final integration framework that will orchestrate all system components.

Please create an implementation-ready version of:
system/integrator.md

This document should:
- Include proper front matter following our metadata schema
- Define the complete system workflow and component interactions
- Include detailed orchestration steps for each trading phase
- Document all integration points between components
- Include system visualization diagrams
- Provide comprehensive error handling and resilience strategies
```

### 🧪 System Test Implementation
```plaintext
Finally, let's create a comprehensive test plan to validate the complete system.

Please create an implementation-ready version of:
system/tests/system-validation.md

This document should:
- Define test scenarios covering all system components
- Include test vectors for critical integration points
- Define success criteria for each component
- Specify validation procedures for cognitive adaptation
- Include a full-day simulation test plan
```

---

## 🚀 Quick Reference Guide for Implementation

### File Structure Quick Creation
```plaintext
mkdir -p system/{schemas,templates,registry,blueprints,cognitive,protocols,status-tracking,workflows,moderator-signals,technical-framework,execution,learning,tests}
mkdir -p prompts/{premarket,intraday,postmarket}
```

### Key Implementation Sequence
1. **Core Schemas** → **Registry** → **Templates**
2. **Blueprint System** → **Cognitive Framework** → **Status Framework**
3. **Moderator Signals** → **Technical Framework** → **Execution Framework**
4. **Learning Framework** → **System Integration** → **Testing**

### Critical Phase Dependencies
- Blueprint system depends on core schemas
- Cognitive framework depends on cognitive-load schema
- Status tracking depends on blueprint and cognitive frameworks
- All prompts depend on their respective frameworks

### Session Management Tips
1. Start a new session for each major phase
2. Upload relevant documents at the start of each session
3. Use the `/zip` command to download completed components at the end of each phase
4. Break implementation into chunks of 3-5 files maximum per prompt

---

By following this execution guide, you can methodically implement the complete Enhanced Intent Trader Framework in a series of focused ChatGPT sessions, ensuring each component is properly integrated with the overall architecture.
