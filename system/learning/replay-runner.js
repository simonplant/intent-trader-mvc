/**
 * Replay Runner Script
 * Compares executed trades against planned blueprint entries/exits
 * Outputs deviation and improvement actions
 */

const fs = require('fs');
const path = require('path');

// Load trade log
const tradeLogPath = path.resolve(__dirname, '../../logs/trade-log.json');
const tradeLog = JSON.parse(fs.readFileSync(tradeLogPath, 'utf8'));

// Replay output array
const replayOutput = [];

tradeLog.forEach((trade) => {
  const result = {
    setupId: trade.setupId,
    symbol: trade.symbol,
    type: trade.type,
    grade: trade.grade,
    replayScore: null,
    entryDeviation: null,
    exitPrecision: null,
    missedReason: trade.reasonMissed || null,
    cognitiveLoad: trade.cognitiveState?.load,
    feedback: []
  };

  if (trade.type === 'executed') {
    if (typeof trade.entryPlan === 'number' && typeof trade.actualEntry === 'number') {
      result.entryDeviation = Math.abs(trade.actualEntry - trade.entryPlan);
    }
    if (typeof trade.plannedExit === 'number' && typeof trade.actualExit === 'number') {
      result.exitPrecision = trade.actualExit - trade.plannedExit;
    }

    result.replayScore = 100;

    if (result.entryDeviation > 2) {
      result.feedback.push('Entry deviation > 2pts. Consider using earlier alerts.');
      result.replayScore -= 10;
    }
    if (result.exitPrecision < -2) {
      result.feedback.push('Exited too early. Review confidence/timing logic.');
      result.replayScore -= 10;
    }
    if (trade.cognitiveState?.load > 7) {
      result.feedback.push('High cognitive load. Consider simplifying blueprint.');
      result.replayScore -= 10;
    }
  }

  if (trade.type === 'missed') {
    result.feedback.push('Missed A+ setup. Root cause: ' + (trade.reasonMissed || 'unknown'));
    if (trade.cognitiveState?.load > 7) {
      result.feedback.push('High load caused setup to be ignored.');
    }
    result.replayScore = 60;
  }

  replayOutput.push(result);
});

// Output path
const outputPath = path.resolve(__dirname, '../../logs/replay-summary.json');
fs.writeFileSync(outputPath, JSON.stringify(replayOutput, null, 2));
console.log('✅ Replay summary saved to:', outputPath);