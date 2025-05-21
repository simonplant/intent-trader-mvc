#!/bin/bash
# Intent Trader Migration Script
# Moves files from /wip to their proper locations in the application structure
# v0.5.2 Migration

# Set the base directory to the current directory
BASE_DIR=$(pwd)
echo "Running migration script in: $BASE_DIR"

# Create function to check if a directory exists and create it if it doesn't
create_dir_if_not_exists() {
    if [ ! -d "$1" ]; then
        echo "Creating directory: $1"
        mkdir -p "$1"
    fi
}

# Create function to move a file and verify
move_file() {
    SOURCE="$1"
    DEST="$2"

    # Check if source file exists
    if [ ! -f "$SOURCE" ]; then
        echo "⚠️ WARNING: Source file does not exist: $SOURCE"
        return 1
    fi

    # Create destination directory if it doesn't exist
    create_dir_if_not_exists "$(dirname "$DEST")"

    # Check if destination file already exists
    if [ -f "$DEST" ]; then
        echo "⚠️ Destination file already exists: $DEST"
        echo "Creating backup of existing file"
        cp "$DEST" "${DEST}.bak"
    fi

    # Move the file
    echo "Moving: $SOURCE -> $DEST"
    cp "$SOURCE" "$DEST"

    # Verify file was moved successfully
    if [ -f "$DEST" ]; then
        echo "✅ Successfully moved file to: $DEST"
        return 0
    else
        echo "❌ FAILED to move file to: $DEST"
        return 1
    fi
}

# Function to display section header
section() {
    echo ""
    echo "========================================"
    echo "🔄 $1"
    echo "========================================"
}

# Function to track migration statistics
initialize_stats() {
    SUCCESSFUL_MOVES=0
    FAILED_MOVES=0
    TOTAL_FILES=0
}

# Function to update and display statistics
update_stats() {
    STATUS=$1
    if [ $STATUS -eq 0 ]; then
        SUCCESSFUL_MOVES=$((SUCCESSFUL_MOVES + 1))
    else
        FAILED_MOVES=$((FAILED_MOVES + 1))
    fi
    TOTAL_FILES=$((TOTAL_FILES + 1))
}

# Initialize statistics
initialize_stats

# Step 1: Create any missing directories
section "Creating Required Directories"

# Schema directories
create_dir_if_not_exists "$BASE_DIR/data/schemas/templates"
create_dir_if_not_exists "$BASE_DIR/data/schemas/samples"

# System directories
create_dir_if_not_exists "$BASE_DIR/system/utilities"
create_dir_if_not_exists "$BASE_DIR/system/workflow"

# Step 2: Move Critical Files (Command Prompts, Analysis Prompts, Runtime Components)
section "Moving Critical Files"

# Command Prompts
move_file "$BASE_DIR/wip/add-position.md" "$BASE_DIR/prompts/execute/add-position.md"
update_stats $?

move_file "$BASE_DIR/wip/close-position.md" "$BASE_DIR/prompts/manage/close-position.md"
update_stats $?

move_file "$BASE_DIR/wip/create-plan.md" "$BASE_DIR/prompts/focus/create-plan.md"
update_stats $?

move_file "$BASE_DIR/wip/list-positions.md" "$BASE_DIR/prompts/manage/list-positions.md"
update_stats $?

move_file "$BASE_DIR/wip/log-session.md" "$BASE_DIR/prompts/review/log-session.md"
update_stats $?

move_file "$BASE_DIR/wip/update-position.md" "$BASE_DIR/prompts/manage/update-position.md"
update_stats $?

# Analysis Prompts
move_file "$BASE_DIR/wip/analyze-dp.md" "$BASE_DIR/prompts/plan/analyze-dp.md"
update_stats $?

move_file "$BASE_DIR/wip/analyze-mancini.md" "$BASE_DIR/prompts/plan/analyze-mancini.md"
update_stats $?

move_file "$BASE_DIR/wip/summarize-mancini.md" "$BASE_DIR/prompts/plan/summarize-mancini.md"
update_stats $?

# Utility Prompts
move_file "$BASE_DIR/wip/chart-analysis.md" "$BASE_DIR/prompts/utilities/chart-analysis.md"
update_stats $?

# Runtime Components
move_file "$BASE_DIR/wip/command-parser.md" "$BASE_DIR/system/runtime/command-parser.md"
update_stats $?

move_file "$BASE_DIR/wip/plugin-registry.json" "$BASE_DIR/system/runtime/plugin-registry.json"
update_stats $?

move_file "$BASE_DIR/wip/runtime-agent.md" "$BASE_DIR/system/runtime/runtime-agent.md"
update_stats $?

# Step 3: Move State Files
section "Moving State Files"

move_file "$BASE_DIR/wip/conversation-context-state.json" "$BASE_DIR/state/conversation-context.json"
update_stats $?

move_file "$BASE_DIR/wip/my-positions-state.json" "$BASE_DIR/state/my-positions.json"
update_stats $?

move_file "$BASE_DIR/wip/trade-plan-state.json" "$BASE_DIR/state/trade-plan-state.json"
update_stats $?

move_file "$BASE_DIR/wip/transaction-log-state.json" "$BASE_DIR/state/transaction-log.json"
update_stats $?

# Step 4: Move Schema and Template Files
section "Moving Schema and Template Files"

# Schema Files
move_file "$BASE_DIR/wip/tradePlan-runtime-schema.json" "$BASE_DIR/data/schemas/intent-trader-runtime-schema.json"
update_stats $?

# Template Files
move_file "$BASE_DIR/wip/conversation-context-template.json" "$BASE_DIR/data/schemas/templates/conversation-context-template.json"
update_stats $?

move_file "$BASE_DIR/wip/position-template.json" "$BASE_DIR/data/schemas/templates/position-template.json"
update_stats $?

move_file "$BASE_DIR/wip/trade-idea-template.json" "$BASE_DIR/data/schemas/templates/trade-idea-template.json"
update_stats $?

move_file "$BASE_DIR/wip/trade-plan-template.json" "$BASE_DIR/data/schemas/templates/trade-plan-template.json"
update_stats $?

move_file "$BASE_DIR/wip/transaction-entry-template.json" "$BASE_DIR/data/schemas/templates/transaction-entry-template.json"
update_stats $?

move_file "$BASE_DIR/wip/transaction-log-template.json" "$BASE_DIR/data/schemas/templates/transaction-log-template.json"
update_stats $?

# Step 5: Move Sample Files
section "Moving Sample Files"

move_file "$BASE_DIR/wip/samples/intent-trader-runtime-sample.json" "$BASE_DIR/data/schemas/samples/intent-trader-runtime-sample.json"
update_stats $?

move_file "$BASE_DIR/wip/samples/sample-conversation-context.json" "$BASE_DIR/data/schemas/samples/sample-conversation-context.json"
update_stats $?

move_file "$BASE_DIR/wip/samples/sample-level-framework.json" "$BASE_DIR/data/schemas/samples/sample-level-framework.json"
update_stats $?

move_file "$BASE_DIR/wip/samples/sample-market-framework.json" "$BASE_DIR/data/schemas/samples/sample-market-framework.json"
update_stats $?

move_file "$BASE_DIR/wip/samples/sample-session-log.json" "$BASE_DIR/data/schemas/samples/sample-session-log.json"
update_stats $?

move_file "$BASE_DIR/wip/samples/sample-trade-idea.json" "$BASE_DIR/data/schemas/samples/sample-trade-idea.json"
update_stats $?

move_file "$BASE_DIR/wip/samples/sample-trade-plan.json" "$BASE_DIR/data/schemas/samples/sample-trade-plan.json"
update_stats $?

move_file "$BASE_DIR/wip/samples/sample-trade-position.json" "$BASE_DIR/data/schemas/samples/sample-trade-position.json"
update_stats $?

# Step 6: Move Documentation Files
section "Moving Documentation Files"

create_dir_if_not_exists "$BASE_DIR/docs/planning"

move_file "$BASE_DIR/wip/conversion-report.md" "$BASE_DIR/docs/planning/conversion-report.md"
update_stats $?

move_file "$BASE_DIR/wip/field-mapping.md" "$BASE_DIR/docs/planning/field-mapping.md"
update_stats $?

move_file "$BASE_DIR/wip/migration-implementation-plan.md" "$BASE_DIR/docs/planning/migration-implementation-plan.md"
update_stats $?

move_file "$BASE_DIR/wip/migration-test-plan.md" "$BASE_DIR/docs/planning/migration-test-plan.md"
update_stats $?

move_file "$BASE_DIR/wip/migration-utilities.md" "$BASE_DIR/docs/planning/migration-utilities.md"
update_stats $?

move_file "$BASE_DIR/wip/schema-audit-report.md" "$BASE_DIR/docs/planning/schema-audit-report.md"
update_stats $?

move_file "$BASE_DIR/wip/schema-conversion-plan.md" "$BASE_DIR/docs/planning/schema-conversion-plan.md"
update_stats $?

move_file "$BASE_DIR/wip/schema-implementation-guide.md" "$BASE_DIR/docs/planning/schema-implementation-guide.md"
update_stats $?

move_file "$BASE_DIR/wip/schema-mapping.md" "$BASE_DIR/docs/planning/schema-mapping.md"
update_stats $?

move_file "$BASE_DIR/wip/schema-validation-report.md" "$BASE_DIR/docs/planning/schema-validation-report.md"
update_stats $?

move_file "$BASE_DIR/wip/template-usage-guide.md" "$BASE_DIR/docs/planning/template-usage-guide.md"
update_stats $?

move_file "$BASE_DIR/wip/validation-report.md" "$BASE_DIR/docs/planning/validation-report.md"
update_stats $?

# Step 7: Move Code Files
section "Moving Code Files"

move_file "$BASE_DIR/wip/migration-code.js" "$BASE_DIR/system/utilities/migration-code.js"
update_stats $?

move_file "$BASE_DIR/wip/migration-test.js" "$BASE_DIR/system/utilities/migration-test.js"
update_stats $?

move_file "$BASE_DIR/wip/migration-utilities.js" "$BASE_DIR/system/utilities/migration-utilities.js"
update_stats $?

# Step 8: Move Workflow Files
section "Moving Workflow Files"

move_file "$BASE_DIR/wip/workflow/implementation-todo-list.md" "$BASE_DIR/docs/planning/implementation-todo-list.md"
update_stats $?

move_file "$BASE_DIR/wip/workflow/master-workflow-controller.md" "$BASE_DIR/system/workflow/master-workflow-controller.md"
update_stats $?

move_file "$BASE_DIR/wip/workflow/project-manager-update.md" "$BASE_DIR/docs/planning/project-manager-update.md"
update_stats $?

move_file "$BASE_DIR/wip/workflow/updated-workplan.md" "$BASE_DIR/docs/planning/updated-workplan.md"
update_stats $?

move_file "$BASE_DIR/wip/workflow/worker-prompt-core.md" "$BASE_DIR/system/workflow/worker-prompt-core.md"
update_stats $?

move_file "$BASE_DIR/wip/workflow/worker-prompt-docs.md" "$BASE_DIR/system/workflow/worker-prompt-docs.md"
update_stats $?

move_file "$BASE_DIR/wip/workflow/worker-prompt-nlp.md" "$BASE_DIR/system/workflow/worker-prompt-nlp.md"
update_stats $?

move_file "$BASE_DIR/wip/workflow/worker-prompt-testing.md" "$BASE_DIR/system/workflow/worker-prompt-testing.md"
update_stats $?

# Step 9: Display Migration Summary
section "Migration Summary"
echo "Total files processed: $TOTAL_FILES"
echo "✅ Successfully moved: $SUCCESSFUL_MOVES"
if [ $FAILED_MOVES -gt 0 ]; then
    echo "❌ Failed to move: $FAILED_MOVES"
else
    echo "✅ All files moved successfully!"
fi

# Step 10: Verification suggestions
section "Post-Migration Verification Steps"
echo "Please perform the following verification steps:"
echo "1. Run '/validate-prompt chart-analysis' to verify chart analysis functionality"
echo "2. Test the trade idea lifecycle: chart → plan → position → log"
echo "3. Run a schema validation test on all schema files"
echo "4. Update CHANGELOG.md with v0.5.2 details"
echo "5. Run '/version-tag v0.5.2 \"Finalized schema integration: chart-analysis, README overhaul, tradeIdea pipeline compliant\"'"

echo ""
echo "Migration script completed at $(date)"
echo "========================================"
echo "Thank you for using the Intent Trader Migration Script!"
echo "========================================"
echo ""