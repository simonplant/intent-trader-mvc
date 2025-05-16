/**
 * Plugin Dispatcher for Intent Trader
 * Executes plugins by phase from plugin-registry.json
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const phase = process.argv[2]; // e.g. "postmarket"
if (!phase) {
  console.error("Usage: node plugin-dispatcher.js <phase>");
  process.exit(1);
}

const registryPath = path.resolve(__dirname, 'plugin-registry.json');
const plugins = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

const matchingPlugins = plugins.filter(p => p.phase === phase);

if (matchingPlugins.length === 0) {
  console.log("No plugins registered for phase:", phase);
  process.exit(0);
}

matchingPlugins.forEach((plugin) => {
  const entryPath = path.resolve(__dirname, "../../", plugin.entryPoint);
  const isScript = entryPath.endsWith('.js');

  if (!fs.existsSync(entryPath)) {
    console.warn(`Entry point missing: ${plugin.entryPoint}`);
    return;
  }

  console.log(`▶️ Running ${plugin.id} (${plugin.type})...`);

  if (isScript) {
    exec(`node ${entryPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`${plugin.id} failed:
`, stderr);
      } else {
        console.log(`${plugin.id} completed:
`, stdout);
      }
    });
  } else {
    console.log(`Skipping non-executable prompt: ${plugin.entryPoint}`);
  }
});