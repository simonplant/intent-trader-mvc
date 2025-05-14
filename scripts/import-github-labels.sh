#!/bin/bash

# === CONFIG ===
REPO="simonplant/intent-trader"
TOKEN="${GITHUB_TOKEN:?Please export your GitHub token as GITHUB_TOKEN}"
LABEL_FILE="import-github-labels.json"

# === CHECKS ===
if ! command -v jq &> /dev/null; then
  echo "jq is required but not installed. Install via 'brew install jq' or similar."
  exit 1
fi

if [ ! -f "$LABEL_FILE" ]; then
  echo "Label file '$LABEL_FILE' not found."
  exit 1
fi

echo "Starting label import into $REPO..."

# === IMPORT LOOP ===
cat "$LABEL_FILE" | jq -c '.[]' | while read -r label; do
  name=$(echo "$label" | jq -r '.name')
  echo "Creating label: $name"
  curl -s -X POST "https://api.github.com/repos/$REPO/labels" \
    -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Content-Type: application/json" \
    -d "$label" | jq '.name, .message' 2>/dev/null
done

echo "✅ Label import complete."