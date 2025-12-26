const ClaudeModel = require('../models/ClaudeModel');
const logModel = require('../models/LogModel');

class ClaudeController {
  static async executeCode(req, res) {
    try {
      const { command, workingDir, timeout } = req.body;
      if (!command) {
        return res.status(400).json({ error: 'Command is required' });
      }

      const result = ClaudeModel.executeCommand(command, workingDir, timeout);
      
      res.json(result);
    } catch (error) {
      logModel.addLog('error', 'Failed to execute Claude Code', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getExecutionLog(req, res) {
    try {
      const { logId } = req.params;
      const log = ClaudeModel.getExecutionLog(logId);
      
      if (!log) {
        return res.status(404).json({ error: 'Execution log not found' });
      }
      
      res.json(log);
    } catch (error) {
      logModel.addLog('error', 'Failed to get execution log', error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ClaudeController;
