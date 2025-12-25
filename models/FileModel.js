const fs = require('fs').promises;
const path = require('path');

class FileModel {
  static async getFiles(targetPath = '.') {
    const fullPath = path.resolve(targetPath);
    const stats = await fs.stat(fullPath);

    if (stats.isFile()) {
      return {
        type: 'file',
        path: fullPath,
        name: path.basename(fullPath),
        size: stats.size
      };
    }

    const files = await fs.readdir(fullPath, { withFileTypes: true });
    const fileList = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(fullPath, file.name);
        try {
          const stats = await fs.stat(filePath);
          return {
            name: file.name,
            path: filePath,
            isDirectory: file.isDirectory(),
            size: stats.size,
            modified: stats.mtime
          };
        } catch (err) {
          return {
            name: file.name,
            path: filePath,
            isDirectory: file.isDirectory(),
            error: err.message
          };
        }
      })
    );

    return {
      type: 'directory',
      path: fullPath,
      files: fileList
    };
  }

  static async readFile(filePath) {
    const fullPath = path.resolve(filePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    return {
      path: fullPath,
      content
    };
  }

  static async writeFile(filePath, content) {
    const fullPath = path.resolve(filePath);
    await fs.writeFile(fullPath, content || '', 'utf-8');
    return {
      path: fullPath
    };
  }

  static async deleteFile(filePath) {
    const fullPath = path.resolve(filePath);
    const stats = await fs.stat(fullPath);

    if (stats.isDirectory()) {
      await fs.rm(fullPath, { recursive: true, force: true });
    } else {
      await fs.unlink(fullPath);
    }

    return {
      path: fullPath
    };
  }

  static async createDirectory(dirPath) {
    const fullPath = path.resolve(dirPath);
    await fs.mkdir(fullPath, { recursive: true });
    return {
      path: fullPath
    };
  }
}

module.exports = FileModel;
