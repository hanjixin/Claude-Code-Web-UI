class LogModel {
  constructor() {
    this.logs = [];
    this.MAX_LOGS = 1000;
  }

  addLog(type, message, data = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type,
      message,
      data
    };
    this.logs.unshift(logEntry);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.pop();
    }
    console.log(`[${type}] ${message}`);
    return logEntry;
  }

  getLogs(limit = 100) {
    return this.logs.slice(0, limit);
  }

  clearLogs() {
    this.logs.length = 0;
    return true;
  }

  getLogById(logId) {
    return this.logs.find(l => l.id === logId);
  }

  addExecutionLog(command, cwd) {
    const logId = Date.now();
    const executionLog = {
      id: logId,
      command,
      cwd,
      output: '',
      error: '',
      status: 'running',
      startTime: new Date().toISOString()
    };

    this.logs.unshift(executionLog);
    return executionLog;
  }

  updateExecutionLog(logId, updates) {
    const logIndex = this.logs.findIndex(l => l.id === logId);
    if (logIndex !== -1) {
      this.logs[logIndex] = { ...this.logs[logIndex], ...updates };
      return this.logs[logIndex];
    }
    return null;
  }
}

module.exports = new LogModel();
