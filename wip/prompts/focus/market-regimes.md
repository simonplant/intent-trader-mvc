---
id: market-regimes
title: Market Regimes Reference
description: Classifies major market behavior patterns used for daily framing and execution alignment
author: Intent Trader Team
version: 1.0.0
release: 0.5.1
created: 2025-05-05
updated: 2025-05-15
category: system
status: stable
tags: [system, macro, behavior, regime, market-context]
requires: []
outputs: []
input_format: markdown
output_format: markdown
ai_enabled: false
---

# Market Regimes Guide

## Purpose

This guide defines actionable market states to help align trading behavior with current market conditions. Using these regime classifications in premarket planning helps select valid setups, determine directional bias, and set appropriate exposure caps. This framework is used by the Intent Trader system to validate trade ideas and optimize execution parameters.

## Regime Classifications

### 1. Trending Up

**Characteristics:**
- Higher highs and higher lows on daily timeframe
- Moving average alignment (8d > 21d > 34d) with positive slopes
- VIX falling or stable at lower levels
- Sector rotation supports bullish thesis

**Trading Strategy:**
- **Allowed Setups:** Big Idea Long, Failed Breakdown Reclaim, Breakout Pullbacks
- **Directional Bias:** Long-only unless significantly overextended
- **Position Sizing:** Full size or up to 125% for high-conviction setups
- **Risk Management:** Wider stops acceptable, trail winners actively
- **Avoid:** Fading strength unless at significant macro resistance

### 2. Trending Down

**Characteristics:**
- Lower highs and lower lows on daily timeframe
- Moving average alignment (8d < 21d < 34d) with negative slopes
- VIX rising or elevated
- Bearish breadth and sector performance

**Trading Strategy:**
- **Allowed Setups:** Breakdown + Backtest, Fade Into Overhead Supply
- **Directional Bias:** Short bias or defensive long only
- **Position Sizing:** Full size for shorts, reduced size (25-50%) for longs
- **Risk Management:** Tighter stops for any long positions
- **Avoid:** Long breakouts or laggard chases

### 3. Choppy / Rangebound

**Characteristics:**
- Price oscillating within defined range
- Moving average convergence, flat slopes
- Failed breakouts and breakdowns common
- VIX typically stable but can spike on range tests

**Trading Strategy:**
- **Allowed Setups:** Cashflow Scalps, VWAP fades, Range boundary trades
- **Directional Bias:** Neutral, favor mean reversion
- **Position Sizing:** Reduced to 25-50% of normal size
- **Risk Management:** Quick exits, tight stops, take profits at range extremes
- **Avoid:** Conviction swings or heavy tiering

### 4. Event-Driven / Volatile

**Characteristics:**
- Catalyst-driven environment (CPI, NFP, FOMC, earnings)
- Large gap opens and increased volatility
- Potential for quick reversals and liquidity issues
- Wide intraday ranges

**Trading Strategy:**
- **Allowed Setups:** Only setups with precise entries and hard stops
- **Directional Bias:** Flexible and nimble, follow confirmation
- **Position Sizing:** Small (25%) initial size, add on confirmation
- **Risk Management:** Absolute stop levels, avoid mental stops
- **Avoid:** Overexposure and front-running major catalysts

### 5. Squeeze or Short-Covering Rally

**Characteristics:**
- Bearish sentiment with sharp reversals
- Low put/call ratio and high short interest
- Consecutive up days with strong closes
- Previously weak stocks showing relative strength

**Trading Strategy:**
- **Allowed Setups:** Failed breakdowns, reclaim ramps, momentum chases
- **Directional Bias:** Opportunistic long
- **Position Sizing:** Start 25-50%, increase to full on confirmation
- **Risk Management:** Use key technical levels as references
- **Avoid:** Fading strong tape unless at major technical resistance

### 6. Consolidation (Base-Building)

**Characteristics:**
- Tight range following a downtrend
- Failed breakdowns with support holding
- Volume contraction and decreased volatility
- Higher lows forming without higher highs yet

**Trading Strategy:**
- **Allowed Setups:** Watchlist builders, accumulation trades, pre-breakout entries
- **Directional Bias:** Cautiously long
- **Position Sizing:** Small (25-50%) until breakout confirmation
- **Risk Management:** Key support levels for stops, partial profits into strength
- **Avoid:** Premature breakout anticipation without volume confirmation

### 7. Distribution (Top-Building)

**Characteristics:**
- Failed breakouts at new highs
- Bearish divergences on momentum indicators
- High-volume rejections at resistance
- Defensive sectors outperforming

**Trading Strategy:**
- **Allowed Setups:** Shorts into failed highs, risk-off rotation plays
- **Directional Bias:** Cautiously bearish
- **Position Sizing:** Small to medium for shorts (25-75%)
- **Risk Management:** Define clear invalidation levels, scale out into weakness
- **Avoid:** New longs near highs without strong catalyst or volume confirmation

## Integration with Intent Trader

These regime classifications integrate with the Intent Trader workflow as follows:

1. **PLAN Phase:** Market regime is identified during morning analysis
2. **FOCUS Phase:** Setup prioritization is influenced by regime compatibility
3. **EXECUTE Phase:** Position sizing and entry criteria adjusted to regime
4. **MANAGE Phase:** Stop management and target projections align with regime
5. **REVIEW Phase:** Performance is evaluated in context of regime adherence

For optimal performance, ensure regime classification is updated daily and reviewed when significant market conditions change intraday.
