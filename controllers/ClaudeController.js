const ClaudeModel = require('../models/ClaudeModel');
const logModel = require('../models/LogModel');

class ClaudeController {
  static async executeCode(req, res) {
    try {
      const { command, workingDir } = req.body;
      if (!command) {
        return res.status(400).json({ error: 'Command is required' });
      }

      const executionLog = ClaudeModel.executeCommand(command, workingDir);
      
      res.json({
        message: 'Claude Code execution started',
        logId: executionLog.id,
        status: 'running'
      });
    } catch (error) {
      logModel.addLog('error', 'Failed to execute Claude Code', error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ClaudeController;
