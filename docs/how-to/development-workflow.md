# Intent Trader Development Workflow

## Improved Development Workflow

This workflow addresses the challenges of developing a complex system like Intent Trader using AI assistants while maintaining state and ensuring reliable progress.

### 1. State Management Approach

1. **Master State Document (`plan-for-today.md`)**
   - Acts as the central state manager for implementation progress
   - Contains detailed task breakdowns with checkboxes for status tracking
   - Links to specific prompt instructions for each implementation step
   - Includes templates for expected outputs
   - Updated after each implementation step to maintain state

2. **Prompt-Generating Prompts**
   - Self-contained instruction templates for each implementation step
   - Can be executed in fresh conversations to avoid context limitations
   - Include all necessary context and requirements
   - Specify expected outputs and validation criteria

3. **Implementation Log**
   - Tracks completed components and their storage locations
   - Maintains a history of implementation decisions
   - Records any issues encountered and their resolutions

### 2. File Generation Process

1. **Development Sequence**
   - Consult `plan-for-today.md` to identify the next implementation step
   - Copy the relevant prompt instructions to a new conversation
   - Generate the implementation as an artifact
   - Download the artifact to local filesystem
   - Update `plan-for-today.md` to mark the step as complete
   - Update the implementation log with details

2. **Artifact Generation**
   - Each implementation file is created as a complete, usable artifact
   - Files include proper frontmatter and content structure
   - File paths are clearly specified for local placement
   - Implementation notes are included when relevant

### 3. Local Implementation

1. **File Placement**
   - Save artifacts to your local `~/Documents/code/intent-trader/` directory
   - Organize according to the project structure
   - Follow provided file paths for consistency

2. **Git Integration**
   - Commit completed components with descriptive messages
   - Organize commits by implementation phase
   - Push to GitHub repository for backup and sharing
   - Use branches for experimental features if needed

### 4. Implementation Phases

We'll implement the system following the cognitive workflow structure:

1. **PLAN Phase (Highest Priority)**
   - Morning call processor
   - Conviction classification
   - Unified trade plan generator

2. **FOCUS Phase (High Priority)**
   - Setup prioritization
   - Level extraction
   - Opportunity ranking

3. **EXECUTE & MANAGE Phases (High Priority)**
   - Position tracking
   - Position management
   - Risk calculation

4. **REVIEW Phase (Stretch Goal)**
   - Trade logging
   - Session debrief
   - Pattern recognition

### 5. Testing & Iteration

1. **Component Testing**
   - Test each component with sample data after implementation
   - Verify output formats match the expected templates
   - Check for any issues or edge cases

2. **Workflow Testing**
   - Test end-to-end workflows across multiple components
   - Verify data flows correctly between components
   - Ensure all commands work as expected

3. **Feedback & Refinement**
   - Report any issues or feedback
   - Request updates to specific components as needed
   - Generate refined versions as artifacts

## Practical Implementation

For each implementation step:

1. **Before Implementation**
   - Review the current state in `plan-for-today.md`
   - Identify the next component to implement
   - Find the corresponding prompt instructions

2. **During Implementation**
   - Start a new conversation with the prompt instructions
   - Generate the implementation as an artifact
   - Ensure it meets all requirements and validation criteria

3. **After Implementation**
   - Download the artifact to your local filesystem
   - Update `plan-for-today.md` to mark the step as complete
   - Update the implementation log with details
   - Commit the changes to Git

This workflow provides a reliable process for developing the Intent Trader system while addressing the limitations of AI assistants in maintaining context over long conversations.
