const express = require('express');
const FileController = require('../controllers/FileController');
const ClaudeController = require('../controllers/ClaudeController');
const LogController = require('../controllers/LogController');

const router = express.Router();

// 文件操作路由
router.get('/api/files', FileController.getFiles);
router.get('/api/files/read', FileController.readFile);
router.post('/api/files/write', FileController.writeFile);
router.delete('/api/files/delete', FileController.deleteFile);
router.post('/api/files/mkdir', FileController.createDirectory);

// Claude命令执行路由
router.post('/api/claude/execute', ClaudeController.executeCode);

// 日志管理路由
router.get('/api/logs', LogController.getLogs);
router.delete('/api/logs/clear', LogController.clearLogs);
router.get('/api/logs/:id', LogController.getLogById);

module.exports = router;
