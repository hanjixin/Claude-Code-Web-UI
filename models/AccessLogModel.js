class AccessLogModel {
  constructor() {
    this.accessLogs = [];
    this.executionLogs = [];
    this.MAX_LOGS = 500;
  }

  addAccessLog(method, path, ip, statusCode, userAgent) {
    const logEntry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      method,
      path,
      ip,
      statusCode,
      userAgent,
      type: 'access'
    };
    this.accessLogs.unshift(logEntry);
    if (this.accessLogs.length > this.MAX_LOGS) {
      this.accessLogs.pop();
    }
    return logEntry;
  }

  addExecutionLog(command, cwd, userId) {
    const logEntry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      command,
      cwd,
      userId: userId || 'anonymous',
      status: 'running',
      output: '',
      error: '',
      type: 'execution'
    };
    this.executionLogs.unshift(logEntry);
    return logEntry;
  }

  updateExecutionLog(id, updates) {
    const index = this.executionLogs.findIndex(log => log.id === id);
    if (index !== -1) {
      this.executionLogs[index] = { ...this.executionLogs[index], ...updates };
      return this.executionLogs[index];
    }
    return null;
  }

  getAccessLogs(filters = {}) {
    let logs = [...this.accessLogs];
    
    if (filters.method) {
      logs = logs.filter(log => log.method === filters.method);
    }
    if (filters.path) {
      logs = logs.filter(log => log.path.includes(filters.path));
    }
    if (filters.statusCode) {
      logs = logs.filter(log => log.statusCode === parseInt(filters.statusCode));
    }
    if (filters.startDate) {
      logs = logs.filter(log => new Date(log.timestamp) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      logs = logs.filter(log => new Date(log.timestamp) <= new Date(filters.endDate));
    }
    
    const limit = filters.limit || 100;
    return logs.slice(0, limit);
  }

  getExecutionLogs(filters = {}) {
    let logs = [...this.executionLogs];
    
    if (filters.status) {
      logs = logs.filter(log => log.status === filters.status);
    }
    if (filters.command) {
      logs = logs.filter(log => log.command.includes(filters.command));
    }
    
    const limit = filters.limit || 100;
    return logs.slice(0, limit);
  }

  getAllLogs(filters = {}) {
    const accessLogs = this.getAccessLogs(filters);
    const executionLogs = this.getExecutionLogs(filters);
    
    const allLogs = [...accessLogs, ...executionLogs].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    const limit = filters.limit || 100;
    return allLogs.slice(0, limit);
  }

  getLogById(id) {
    return this.accessLogs.find(log => log.id === id) || 
           this.executionLogs.find(log => log.id === id);
  }

  clearAccessLogs() {
    this.accessLogs = [];
    return true;
  }

  clearExecutionLogs() {
    this.executionLogs = [];
    return true;
  }

  clearAllLogs() {
    this.accessLogs = [];
    this.executionLogs = [];
    return true;
  }

  getStats() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    const todayAccessLogs = this.accessLogs.filter(log => 
      log.timestamp.startsWith(today)
    );
    
    const todayExecutionLogs = this.executionLogs.filter(log => 
      log.timestamp.startsWith(today)
    );
    
    return {
      totalAccessLogs: this.accessLogs.length,
      todayAccessLogs: todayAccessLogs.length,
      totalExecutionLogs: this.executionLogs.length,
      todayExecutionLogs: todayExecutionLogs.length,
      runningExecutions: this.executionLogs.filter(log => log.status === 'running').length
    };
  }
}

module.exports = new AccessLogModel();
