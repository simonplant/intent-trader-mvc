// tests/test-blueprint.js
const fs = require('fs');
const path = require('path');

const blueprintPath = path.resolve(__dirname, '../logs/trade-log.json');
const manifestPath = path.resolve(__dirname, '../state/session-manifest.json');

try {
  const tradeLog = JSON.parse(fs.readFileSync(blueprintPath, 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  const tracked = manifest.activePlugins.includes('blueprint-engine');
  const setupsLogged = tradeLog.filter(t => t.setupId && t.type).length;

  console.log('✅ Blueprint Plugin Enabled:', tracked);
  console.log('✅ Setups Logged:', setupsLogged);
} catch (err) {
  console.error('❌ Blueprint test failed:', err.message);
}
