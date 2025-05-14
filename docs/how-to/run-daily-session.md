# 📈 How To: Run a Full Trading Session

This guide follows the official lifecycle for running a complete session using the Intent Trader system.

---

## ☀️ Premarket (Before Open)

1. Upload `intent-trader.zip` to ChatGPT
2. Paste the full startup block from `bootstrap-prompt.md`
3. ChatGPT loads all files (README, system/, prompts/, session manifest)
4. Run:

```txt
/blueprint new
```

5. Confirm:
   - `state/session-manifest.json` is accurate
   - Levels and setups match `extraction-source-map.json`
   - Load state is below threshold to proceed

---

## 🔁 Intraday Monitoring

During active trading, use:

```txt
/status update
/chart analysis
/cognitive reset
/midday reset
```

These calls update setup status, trigger adaptation, or alert for reset events based on load or distraction.

---

## 📉 Postmarket Reconciliation

After market close:

1. Log trades:
   ```txt
   /compare execution
   /missed trades
   ```

2. Run replay:
   ```txt
   /replay
   ```

3. Apply system improvements:
   ```txt
   /feedback
   ```

4. Review updated files:
   - `logs/trade-log.json`
   - `logs/replay-summary.json`
   - `logs/test-session-output.json`

---

## 🧪 End-of-Day QA

Optional post-close tasks:

```txt
/analyze performance
/analyze prompts
```

Use:
- `route-analyzer.md`
- `prompt-linter.md`

To validate prompt metadata and ensure no schema violations exist.

---

## ✅ Summary

By following this SOP:
- You will track, evaluate, and improve every session
- You will adapt your prompt stack based on real trading performance
- You will maintain system hygiene using replay and QA tools---

## 🧠 Intraday Self-Generated Setups

If you identify a trade from chart review or live price action:

```txt
/validate trade
/log intent
/status update
```

This allows you to sanity check and document ideas that emerge organically, ensuring emotional control and full traceability.