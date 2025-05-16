---
title: Market Regimes Reference  
description: Classifies major market behavior patterns used for daily framing and execution alignment  
tags: [system, macro, behavior]  
author: Simon Plant  
last_updated: 2025-05-05  
version: 1.0  
category: system  
usage: Reference before market open to align trade setups with macro context. Produces regime clarity (trend, chop, squeeze, gamma, event). Consumes daily news, price action, and volatility.
status: stable  
requires: []  
linked_outputs: []  
input_format: markdown  
output_format: markdown  
ai_enabled: false  
---

## MARKET REGIMES GUIDE

**Purpose:** Define actionable market states and align trade behavior accordingly.

---
### 1. Trending Up
**Indicators**: Higher highs/lows, 8d > 21d > 34d stack, VIX falling
**Allowed Setups**: Big Idea Long, Failed Breakdown Reclaim, Breakout Pullbacks
**Bias**: Long-only bias unless overextended
**Sizing**: Full or Double
**Avoid**: Fading strength unless at macro resistance

---
### 2. Trending Down
**Indicators**: Lower highs/lows, moving average death cross, rising VIX
**Allowed Setups**: Breakdown + Backtest, Fade Into Overhead Supply
**Bias**: Short bias or defensive long
**Sizing**: Full Short, Small Longs only
**Avoid**: Long breakouts or laggard chases

---
### 3. Choppy / Rangebound
**Indicators**: Mean reversion, MA convergence, failed breakout/breakdown
**Allowed Setups**: Cashflow Scalps, VWAP fades, Small range trades
**Bias**: Neutral
**Sizing**: 1/4 to 1/2 only
**Avoid**: Conviction swings or heavy tiering

---
### 4. Event-Driven / Volatile
**Indicators**: CPI, NFP, FOMC, earnings clusters, large gap opens
**Allowed Setups**: Only setups with hard stops and strong catalyst alignment
**Bias**: Flexible / nimble
**Sizing**: Small only unless post-event confirmation
**Avoid**: Overexposure. No front-running major catalysts.

---
### 5. Squeeze or Short-Covering Rally
**Indicators**: Bearish sentiment + sharp reversals, low put/call, high short interest
**Allowed Setups**: Failed breakdowns, reclaim ramps, momo chase setups
**Bias**: Opportunistic long
**Sizing**: 1/4 to Full
**Avoid**: Fading strong tape unless macro rejection aligns

---
### 6. Consolidation (Base-Building)
**Indicators**: Tight range after downtrend, failed breakdowns, volume contraction
**Allowed Setups**: Watchlist Builders, Accumulation Trades, Pre-Breakout Entries
**Bias**: Cautiously long
**Sizing**: Small until breakout
**Avoid**: Premature breakouts without confirmation

---
### 7. Distribution (Top-Building)
**Indicators**: Failed breakouts, bearish divergences, high-volume rejections
**Allowed Setups**: Shorts into failed highs, Risk-Off Rotation Plays
**Bias**: Cautiously bearish
**Sizing**: Small to medium short
**Avoid**: New longs near highs without confirmation

> Use regime classification in premarket planning to select valid setups, bias, and exposure cap. Used by Copilot and Trade Validator to approve/reject trades.
