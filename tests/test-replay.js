// tests/test-replay.js
const fs = require('fs');
const path = require('path');

const replayPath = path.resolve(__dirname, '../logs/replay-summary.json');

try {
  const replay = JSON.parse(fs.readFileSync(replayPath, 'utf8'));
  if (replay.length > 0) {
    console.log('✅ Replay generated:', replay.length, 'entries');
    const issues = replay.filter(r => r.feedback && r.feedback.length);
    console.log('🧠 Issues found in replay:', issues.length);
  } else {
    throw new Error('Replay summary is empty');
  }
} catch (err) {
  console.error('❌ Replay test failed:', err.message);
}
