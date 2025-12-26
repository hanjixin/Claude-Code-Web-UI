const accessLogModel = require('../models/AccessLogModel');

exports.getAccessLogs = (req, res) => {
  try {
    const filters = {
      method: req.query.method,
      path: req.query.path,
      statusCode: req.query.statusCode,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      limit: parseInt(req.query.limit) || 100
    };
    const logs = accessLogModel.getAccessLogs(filters);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: '获取访问日志失败' });
  }
};

exports.getExecutionLogs = (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      command: req.query.command,
      limit: parseInt(req.query.limit) || 100
    };
    const logs = accessLogModel.getExecutionLogs(filters);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: '获取执行日志失败' });
  }
};

exports.getAllLogs = (req, res) => {
  try {
    const filters = {
      limit: parseInt(req.query.limit) || 100
    };
    const logs = accessLogModel.getAllLogs(filters);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: '获取日志失败' });
  }
};

exports.getLogById = (req, res) => {
  try {
    const { id } = req.params;
    const log = accessLogModel.getLogById(parseFloat(id));
    if (!log) {
      return res.status(404).json({ error: '日志不存在' });
    }
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: '获取日志详情失败' });
  }
};

exports.clearAccessLogs = (req, res) => {
  try {
    accessLogModel.clearAccessLogs();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '清空访问日志失败' });
  }
};

exports.clearExecutionLogs = (req, res) => {
  try {
    accessLogModel.clearExecutionLogs();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '清空执行日志失败' });
  }
};

exports.clearAllLogs = (req, res) => {
  try {
    accessLogModel.clearAllLogs();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '清空所有日志失败' });
  }
};

exports.getStats = (req, res) => {
  try {
    const stats = accessLogModel.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: '获取统计信息失败' });
  }
};
