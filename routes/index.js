const express = require('express');
const FileController = require('../controllers/FileController');
const ClaudeController = require('../controllers/ClaudeController');
const LogController = require('../controllers/LogController');
const UserController = require('../controllers/UserController');
const EnvController = require('../controllers/EnvController');
const InstallController = require('../controllers/InstallController');
const AccessLogController = require('../controllers/AccessLogController');

const router = express.Router();

router.get('/api/install/status', InstallController.check);
router.post('/api/install/start', InstallController.startInstall);
router.post('/api/install/complete', InstallController.completeInstall);
router.post('/api/install/reset', InstallController.reset);

router.use((req, res, next) => {
  const accessLogModel = require('../models/AccessLogModel');
  accessLogModel.addAccessLog(
    req.method,
    req.path,
    req.ip || req.connection.remoteAddress,
    res.statusCode,
    req.get('User-Agent')
  );
  next();
});

router.get('/api/files', FileController.getFiles);
router.get('/api/files/read', FileController.readFile);
router.post('/api/files/write', FileController.writeFile);
router.delete('/api/files/delete', FileController.deleteFile);
router.post('/api/files/mkdir', FileController.createDirectory);

router.post('/api/claude/execute', ClaudeController.executeCode);
router.get('/api/claude/log/:logId', ClaudeController.getExecutionLog);

router.get('/api/logs', LogController.getLogs);
router.delete('/api/logs/clear', LogController.clearLogs);

router.get('/api/logs/access', AccessLogController.getAccessLogs);
router.get('/api/logs/execution', AccessLogController.getExecutionLogs);
router.get('/api/logs/all', AccessLogController.getAllLogs);
router.get('/api/logs/stats', AccessLogController.getStats);
router.get('/api/logs/detail/:id', AccessLogController.getLogById);
router.delete('/api/logs/access', AccessLogController.clearAccessLogs);
router.delete('/api/logs/execution', AccessLogController.clearExecutionLogs);
router.delete('/api/logs/all', AccessLogController.clearAllLogs);
router.get('/api/logs/:id', LogController.getLogById);

router.get('/api/user/config', UserController.getConfig);
router.put('/api/user/config', UserController.updateConfig);
router.get('/api/user/username', UserController.getUsername);
router.put('/api/user/username', UserController.setUsername);

router.get('/api/env', EnvController.getAll);
router.post('/api/env', EnvController.add);
router.put('/api/env/:id', EnvController.update);
router.delete('/api/env/:id', EnvController.delete);
router.get('/api/env/object', EnvController.getEnvObject);
router.delete('/api/env', EnvController.clear);
router.post('/api/env/import', EnvController.importFromSystem);

module.exports = router;
