const { spawn, execSync } = require('child_process');
const path = require('path');
const logModel = require('./LogModel');
const envModel = require('./EnvModel');

class ClaudeModel {
  static executeCommand(command, workingDir, timeout = 60000) {
    const cwd = workingDir ? path.resolve(workingDir) : process.cwd();

    const executionLog = logModel.addExecutionLog(command, cwd);

    const customEnv = envModel.getEnvObject();
    const execEnv = { ...process.env, ...customEnv };

    try {
      const output = execSync(command, {
        cwd,
        encoding: 'utf8',
        timeout,
        shell: '/bin/zsh',
        env: execEnv
      });

      logModel.updateExecutionLog(executionLog.id, {
        status: 'success',
        output: output || '',
        exitCode: 0,
        endTime: new Date().toISOString()
      });

      logModel.addLog('success', 'Claude Code execution completed', { command, exitCode: 0 });

      return {
        ...executionLog,
        status: 'success',
        output: output || '',
        exitCode: 0,
        endTime: new Date().toISOString()
      };
    } catch (error) {
      const errorOutput = error.stdout || error.message;
      const exitCode = error.status || 1;

      logModel.updateExecutionLog(executionLog.id, {
        status: 'failed',
        output: errorOutput,
        error: error.stderr || error.message,
        exitCode,
        endTime: new Date().toISOString()
      });

      logModel.addLog('error', 'Claude Code execution failed', { command, error: error.message });
      console.log()
      return {
        ...executionLog,
        status: 'failed',
        output: errorOutput,
        error: error.stderr || error.message,
        exitCode,
        endTime: new Date().toISOString()
      };
    }
  }

  static getExecutionLog(logId) {
    return logModel.getExecutionLogs().find(log => log.id === logId);
  }
}

module.exports = ClaudeModel;
