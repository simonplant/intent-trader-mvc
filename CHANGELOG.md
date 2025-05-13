# Changelog: Intent Trader

## [v0.4.1] - Final Patch 1 Restore
### Added
- Restored `dp-analysis.md`, `stack-rank-trades.md`, `unified-trade-plan.md`, and `mancini-analysis.md` prompts with full YAML metadata
- Recreated full system layout after environment reset

### Changed
- Synced all prompt files to `version: 0.4.1` across `premarket`, `intraday`, `postmarket`, and `system` directories
- Enforced `metadata-style.md` compliance across all front matter blocks

### Fixed
- Missing prompt files in previously uploaded `v0.4.1-final.zip` archive
- Rebuilt valid ZIP with structural integrity and full Phase 4 coverage

## v0.4.0-pre (Current)
- Full refactor of legacy `trading-system-prompts`
- Migrated all prompts to clean, modular structure
- Enforced YAML front matter across all `.md` files
- Copilot branding and emoji use purged
- JSON-first logging system implemented
- Knowledge base added for DP, Mancini, journal insights
- Daily reference and plan-execution prompts added
- GitHub + VS Code ready structure scaffolded
- Testing framework (QA) scaffolded in `/tests/`
