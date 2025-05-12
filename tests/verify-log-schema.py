#!/usr/bin/env python3
# verify-log-schema.py — checks structure of all JSON logs

import os
import json

LOG_DIR = "./logs"

required_keys = {
    "trade": ["date", "ticker", "contract", "entry", "exit", "direction", "confidence", "source", "size", "rationale"],
    "behavior": ["date", "tag", "notes", "behavior_tags"]
}

def verify_log_format(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        log_type = data.get("type")
        keys = required_keys.get(log_type, [])

        missing = [k for k in keys if k not in data]
        if missing:
            return f"MISSING {missing}"
        return "OK"
    except Exception as e:
        return f"ERROR: {e}"

for root, _, files in os.walk(LOG_DIR):
    for file in files:
        if file.endswith(".json"):
            path = os.path.join(root, file)
            result = verify_log_format(path)
            print(f"{path}: {result}")
