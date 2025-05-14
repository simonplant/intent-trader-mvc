# 🔁 How To: Respond to Real-World Trading Events

This guide maps actual intraday trading inputs (from news, VTF, price action, etc.) to the correct response flow using the Intent Trader system.

---

## 📡 1. Trade Alert (VTF, DP/mods)

**Trigger:** "DP just called out AAPL 185 reclaim long"

**Actions:**
- `/blueprint scan` → Is it already tracked?
- `/status update` → Has it triggered already?
- `/cognitive reset` → Are you in a good mental state?
- `/risk check` (future prompt) → Am I overtrading this symbol?
- `/log intent` → Capture whether you took it or not

---

## 🎤 2. Mic Commentary (VTF Live)

**Trigger:** "Mic says watch for reversal on NVDA"

**Actions:**
- `/chart analysis` → Check patterns or levels
- `/status update` → Confirm setup status
- Optional: `/run-phase intraday` to refresh all setups
- Log changes to setup sentiment or cancelation

---

## 🐦 3. Mancini Twitter Update

**Trigger:** "@AdamMancini4: 5185 = key rejection level"

**Actions:**
- Manually check vs `extraction-source-map.json`
- If blueprint is outdated: `/simplify blueprint` or re-run `/blueprint new`
- Optionally: update `session-manifest.json` for new ES/SPX zone

---

## 📰 4. News or Catalyst Drop

**Trigger:** Benzinga alert: “TSLA halts production on Model Y”

**Actions:**
- `/cognitive reset` — avoid overreaction
- `/chart analysis` — run to reassess pattern
- `/missed trades` — if you freeze and don't act
- `/compare execution` — if you did act, log deviation

---

## 🔁 5. Price Reversal or Directional Flip

**Trigger:** "SPX broke through morning lows and reversed bullish"

**Actions:**
- `/chart analysis` → test for failed breakdown
- `/status update` on key setups
- `/log intent` — did you enter? avoid? miss?

---

## 💥 6. Rejection at Key Level

**Trigger:** "NVDA failed at 975 resistance again"

**Actions:**
- Log in `status-update.md`
- Optionally run `/compare execution` if you were involved
- Update levels if critical rejection: blueprint or level map

---

## 🔄 7. Cognitive Shift or Fatigue

**Trigger:** "Felt scattered after midday, started revenge trading"

**Actions:**
- Run: `/cognitive reset`
- Log in: `logs/trade-log.json` with performance notes
- Optional: add new entry to `missed-trades.md` or `journal.md`

---

## ✍️ 8. Blueprint Feels Wrong or Overcomplicated

**Trigger:** "Too many setups in morning plan, losing clarity"

**Actions:**
- Run: `/simplify blueprint`
- Use: `adaptation-matrix.md` to guide what to remove
- Update: `session-manifest.json` and `blueprint.md`

---

## 🧪 Optional Events

- **Market-wide shifts:** rerun `/run-phase intraday`
- **Daily recap:** run `/replay` + `/feedback` after close
---

## 💡 9. Self-Originated Trade Idea (Chart Review, Momentum Signal)

**Trigger:** "I see a bull flag breakout on PLTR with strong 2-minute momentum"

**Actions:**
- `/validate trade` — Run system + cognitive checklist
- `/status update` — Check if it's already tracked or in motion
- `/cognitive reset` — Make sure you're in a clear headspace
- `/log intent` — Log the idea regardless of execution

This keeps you honest, avoids emotional trades, and builds a trail of your instinctual signals for later replay.