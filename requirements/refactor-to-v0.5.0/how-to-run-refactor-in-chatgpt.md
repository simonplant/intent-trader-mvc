---
title: How to Run the Intent Trader Refactor in ChatGPT
version: v0.5.0
last_updated: 2025-05-09
---

# 🛠️ How to Execute the Refactor in ChatGPT

## 1. Create Your Project
- Go to [ChatGPT Projects](https://chat.openai.com/)
- Create new project: `intent-trader-refactor`
- Upload these core files:
  - `it-architecture-plan.md`
  - `it-implementation-protocol.md`
  - `prompt-dependency-map.md`
  - `implementation-chatgpt-guide.md`
  - `project-dashboard.md`
  - `system-project-plan.md`

## 2. Start With Phase 0
Prompt:
```
Let's begin Phase 0. Please extract all frontmatter rules, routing specs, and registry structure from the uploaded files. Output:
- /system/metadata-style.md
- /system/main-controller.md
- /system/prompt-registry.json
Ensure routing and phase coverage aligns with architecture.
```

## 3. Proceed Phase by Phase
For each phase:
- Upload any updated files from previous phases
- Run prompts based on `it-implementation-protocol.md`
- Ask for ZIP output at end of each phase
- Download ZIP and integrate into local repo or Claude

## 4. Validate and Commit
Locally or via Claude:
- Run schema validation scripts
- Stage Git commits per phase
- Maintain changelog

## 5. Release
After all phases:
- Tag release as `v0.5.0`
- Update changelog + logs/releases
