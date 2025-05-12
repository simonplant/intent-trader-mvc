#!/usr/bin/env python3
# validate-metadata.py — checks front matter format in prompts

import os
import re
import yaml

PROMPT_DIR = "./prompts"

def validate_front_matter(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.match(r"---\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return False, "Missing front matter"

    try:
        parsed = yaml.safe_load(match.group(1))
        required = ['title', 'description', 'phase', 'route', 'version']
        for field in required:
            if field not in parsed:
                return False, f"Missing {field}"
    except yaml.YAMLError:
        return False, "YAML parse error"

    return True, "OK"

for root, _, files in os.walk(PROMPT_DIR):
    for file in files:
        if file.endswith(".md"):
            path = os.path.join(root, file)
            valid, reason = validate_front_matter(path)
            print(f"{path}: {reason}")
