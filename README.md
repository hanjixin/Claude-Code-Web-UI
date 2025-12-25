# Claude Code Web Manager

一个基于 Node.js Express 的 Web 界面，用于管理 Claude Code 执行、查看日志和进行文件操作。

## 功能特性

- **Claude Code 执行**：通过 Web 界面执行 Claude Code 命令
- **实时日志查看**：自动刷新执行日志，查看输出和错误信息
- **文件浏览器**：浏览项目文件夹，查看目录结构
- **文件操作**：
  - 读取文件内容
  - 编辑和保存文件
  - 删除文件
  - 创建新目录
- **美观的界面**：现代化的响应式设计

## 安装

1. 安装依赖：
```bash
npm install
```

## 运行

启动服务器：
```bash
npm start
```

或使用 nodemon 进行开发（需要先安装 nodemon）：
```bash
npm run dev
```

服务器将在 http://localhost:3000 启动。

## API 端点

### 文件操作

- `GET /api/files?path=<路径>` - 获取目录或文件信息
- `GET /api/files/read?path=<路径>` - 读取文件内容
- `POST /api/files/write` - 写入文件
  - Body: `{ "path": "文件路径", "content": "内容" }`
- `DELETE /api/files/delete?path=<路径>` - 删除文件或目录
- `POST /api/files/mkdir` - 创建目录
  - Body: `{ "path": "目录路径" }`

### Claude Code 执行

- `POST /api/claude/execute` - 执行 Claude Code 命令
  - Body: `{ "command": "命令", "workingDir": "工作目录（可选）" }`

### 日志管理

- `GET /api/logs?limit=<数量>` - 获取日志列表
- `GET /api/logs/:id` - 获取特定日志详情
- `DELETE /api/logs/clear` - 清空所有日志

## 使用说明

1. **执行 Claude Code**：
   - 在"Claude Code 执行"面板输入命令
   - 可选择指定工作目录
   - 点击"执行 Claude Code"按钮

2. **浏览文件**：
   - 在"文件浏览器"面板输入路径（默认为当前目录 "."）
   - 点击"浏览"查看文件列表
   - 点击目录可以进入该目录
   - 点击"编辑"可以将文件加载到编辑器

3. **编辑文件**：
   - 在"文件编辑"面板输入文件路径
   - 点击"读取"加载文件内容
   - 编辑内容后点击"保存"
   - 点击"删除"可以删除文件

4. **创建目录**：
   - 在"目录操作"面板输入新目录路径
   - 点击"创建目录"

5. **查看日志**：
   - 日志会自动每 5 秒刷新一次
   - 可以手动点击"刷新"按钮
   - 点击"清空"可以清除所有日志

## 注意事项

- 确保系统已安装 Claude Code CLI 工具
- 文件操作具有完整的系统权限，请谨慎使用
- 建议在安全的本地环境中使用
- 执行 Claude Code 命令时会在后台运行，可以通过日志查看执行进度

## 技术栈

- **后端**：Node.js, Express
- **前端**：原生 HTML/CSS/JavaScript
- **功能**：文件系统操作、进程管理、实时日志
