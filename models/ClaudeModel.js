const { spawn } = require('child_process');
const path = require('path');
const logModel = require('./LogModel');

class ClaudeModel {
  static executeCommand(command, workingDir) {
    const cwd = workingDir ? path.resolve(workingDir) : process.cwd();
    
    const executionLog = logModel.addExecutionLog(command, cwd);
    
    const claudeProcess = spawn('claude', command.split(' '), {
      cwd,
      shell: true,
      env: { ...process.env }
    });

    claudeProcess.stdout.on('data', (data) => {
      const output = data.toString();
      logModel.updateExecutionLog(executionLog.id, {
        output: executionLog.output + output
      });
      console.log(`Claude stdout: ${output}`);
    });

    claudeProcess.stderr.on('data', (data) => {
      const error = data.toString();
      logModel.updateExecutionLog(executionLog.id, {
        error: executionLog.error + error
      });
      console.error(`Claude stderr: ${error}`);
    });

    claudeProcess.on('close', (code) => {
      logModel.updateExecutionLog(executionLog.id, {
        status: code === 0 ? 'success' : 'failed',
        exitCode: code,
        endTime: new Date().toISOString()
      });
      
      logModel.addLog(code === 0 ? 'success' : 'error',
        `Claude Code execution ${code === 0 ? 'success' : 'failed'}`,
        { command, exitCode: code }
      );
    });

    claudeProcess.on('error', (err) => {
      logModel.updateExecutionLog(executionLog.id, {
        status: 'failed',
        error: executionLog.error + `\nProcess error: ${err.message}`,
        endTime: new Date().toISOString()
      });
      
      logModel.addLog('error', 'Claude Code execution failed', err.message);
    });

    return executionLog;
  }
}

module.exports = ClaudeModel;
