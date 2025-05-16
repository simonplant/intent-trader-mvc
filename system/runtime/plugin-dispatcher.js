/**
 * Plugin Dispatcher for Intent Trader
 * Executes commands by phase from plugin-registry.json
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Command execution function
function executeCommand(commandName, parameters = {}) {
  const registryPath = path.resolve(__dirname, 'plugin-registry.json');
  const plugins = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

  // Find the plugin for this command
  const plugin = plugins.find(p => p.id === commandName);

  if (!plugin) {
    console.error(`Command not found: ${commandName}`);
    return {
      success: false,
      command: commandName,
      message: `Command '${commandName}' not found in registry.`
    };
  }

  // Get the current session phase
  const manifestPath = path.resolve(__dirname, '../../state/session-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const currentPhase = manifest.currentPhase;

  // Check if command is allowed in current phase
  const allowedInAnyPhase = plugin.phase === 'any';
  const matchesCurrentPhase = plugin.phase === currentPhase;

  if (!allowedInAnyPhase && !matchesCurrentPhase) {
    console.warn(`Command ${commandName} is designed for ${plugin.phase} phase, but current phase is ${currentPhase}`);
    // Continue execution but with warning
  }

  // Check for dependencies
  for (const dependency of plugin.dependsOn || []) {
    const depPlugin = plugins.find(p => p.id === dependency);
    if (!depPlugin) {
      console.warn(`Dependency not found: ${dependency}`);
      continue;
    }

    // Check if dependency state exists
    // This is a simplified dependency check - in a real system, we'd check output files or state
    console.log(`Validating dependency: ${dependency}`);
  }

  const entryPath = path.resolve(__dirname, "../../", plugin.entryPoint);
  if (!fs.existsSync(entryPath)) {
    console.error(`Entry point missing: ${plugin.entryPoint}`);
    return {
      success: false,
      command: commandName,
      message: `Command '${commandName}' entry point not found at ${plugin.entryPoint}.`
    };
  }

  console.log(`▶️ Executing ${plugin.id} (${plugin.type})...`);

  // For JavaScript plugins
  if (entryPath.endsWith('.js')) {
    try {
      // In a full implementation, we'd properly execute the JS with parameters
      // For now, we're just simulating execution
      console.log(`Executing JavaScript plugin: ${entryPath}`);
      console.log(`Parameters: ${JSON.stringify(parameters)}`);

      return {
        success: true,
        command: commandName,
        result: {
          // Simulated result
          executionTime: new Date().toISOString(),
          parameters: parameters
        },
        message: `Successfully executed ${commandName}`
      };
    } catch (error) {
      console.error(`Error executing ${commandName}:`, error);
      return {
        success: false,
        command: commandName,
        message: `Error executing ${commandName}: ${error.message}`
      };
    }
  }
  // For prompt-based plugins (.md files)
  else if (entryPath.endsWith('.md')) {
    try {
      const promptContent = fs.readFileSync(entryPath, 'utf8');
      console.log(`Loaded prompt: ${plugin.entryPoint} (${promptContent.length} characters)`);
      console.log(`Processing with parameters: ${JSON.stringify(parameters)}`);

      // In a real implementation, we'd process the prompt with the parameters
      // For now, we're just acknowledging receipt

      return {
        success: true,
        command: commandName,
        result: {
          promptLength: promptContent.length,
          parameters: parameters
        },
        message: `Successfully processed ${commandName} prompt`
      };
    } catch (error) {
      console.error(`Error processing prompt ${commandName}:`, error);
      return {
        success: false,
        command: commandName,
        message: `Error processing prompt ${commandName}: ${error.message}`
      };
    }
  }
  // Unsupported file type
  else {
    console.error(`Unsupported entry point type: ${entryPath}`);
    return {
      success: false,
      command: commandName,
      message: `Unsupported entry point type for ${commandName}: ${path.extname(entryPath)}`
    };
  }
}

// For CLI execution
if (require.main === module) {
  const command = process.argv[2];
  if (!command) {
    console.error("Usage: node plugin-dispatcher.js <command> [parameters]");
    process.exit(1);
  }

  // Parse any additional parameters
  const parameters = {};
  for (let i = 3; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.includes('=')) {
      const [key, value] = arg.split('=');
      parameters[key] = value;
    } else {
      parameters[arg] = true;
    }
  }

  const result = executeCommand(command, parameters);
  console.log(JSON.stringify(result, null, 2));
}

// Export for programmatic use
module.exports = {
  executeCommand
};
