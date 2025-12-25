const FileModel = require('../models/FileModel');
const logModel = require('../models/LogModel');

class FileController {
  static async getFiles(req, res) {
    try {
      const targetPath = req.query.path;
      const result = await FileModel.getFiles(targetPath);
      
      logModel.addLog('info', `Listed files in: ${result.path}`);
      res.json(result);
    } catch (error) {
      logModel.addLog('error', 'Failed to list files', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async readFile(req, res) {
    try {
      const filePath = req.query.path;
      if (!filePath) {
        return res.status(400).json({ error: 'Path parameter is required' });
      }

      const result = await FileModel.readFile(filePath);
      logModel.addLog('info', `Read file: ${result.path}`);
      res.json(result);
    } catch (error) {
      logModel.addLog('error', 'Failed to read file', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async writeFile(req, res) {
    try {
      const { path: filePath, content } = req.body;
      if (!filePath) {
        return res.status(400).json({ error: 'Path is required' });
      }

      await FileModel.writeFile(filePath, content);
      logModel.addLog('success', `Wrote file: ${filePath}`);
      res.json({
        message: 'File written successfully',
        path: filePath
      });
    } catch (error) {
      logModel.addLog('error', 'Failed to write file', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteFile(req, res) {
    try {
      const filePath = req.query.path;
      if (!filePath) {
        return res.status(400).json({ error: 'Path parameter is required' });
      }

      const result = await FileModel.deleteFile(filePath);
      logModel.addLog('success', `Deleted: ${result.path}`);
      res.json({
        message: 'Deleted successfully',
        path: result.path
      });
    } catch (error) {
      logModel.addLog('error', 'Failed to delete', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async createDirectory(req, res) {
    try {
      const { path: dirPath } = req.body;
      if (!dirPath) {
        return res.status(400).json({ error: 'Path is required' });
      }

      const result = await FileModel.createDirectory(dirPath);
      logModel.addLog('success', `Created directory: ${result.path}`);
      res.json({
        message: 'Directory created successfully',
        path: result.path
      });
    } catch (error) {
      logModel.addLog('error', 'Failed to create directory', error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = FileController;
