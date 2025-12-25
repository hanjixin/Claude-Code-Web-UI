const logModel = require('../models/LogModel');

class LogController {
  static getLogs(req, res) {
    const limit = parseInt(req.query.limit) || 100;
    const logs = logModel.getLogs(limit);
    res.json({ logs });
  }

  static clearLogs(req, res) {
    logModel.clearLogs();
    logModel.addLog('info', 'Logs cleared');
    res.json({ message: 'Logs cleared successfully' });
  }

  static getLogById(req, res) {
    const logId = parseInt(req.params.id);
    const log = logModel.getLogById(logId);

    if (!log) {
      return res.status(404).json({ error: 'Log not found' });
    }

    res.json(log);
  }
}

module.exports = LogController;
