const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const routes = require('./routes');
const logModel = require('./models/LogModel');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3000;

// 中间件配置
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 设置 CSP 策略以支持 Monaco Editor
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com; style-src 'self' 'unsafe-inline' https://unpkg.com; worker-src 'self' blob:; font-src 'self' https://unpkg.com data:; connect-src 'self' https://unpkg.com;"
  );
  next();
});

// 使用路由配置
app.use(routes);

// WebSocket 连接处理
wss.on('connection', (ws) => {
  let childProcess = null;

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'command') {
        const { command, workingDir } = data;
        const cwd = workingDir ? path.resolve(workingDir) : process.cwd();

        const { spawn } = require('child_process');
        childProcess = spawn('/bin/zsh', ['-c', command], {
          cwd,
          env: { ...process.env }
        });

        childProcess.stdout.on('data', (data) => {
          ws.send(JSON.stringify({ type: 'output', content: data.toString() }));
        });

        childProcess.stderr.on('data', (data) => {
          ws.send(JSON.stringify({ type: 'error', content: data.toString() }));
        });

        childProcess.on('close', (code) => {
          ws.send(JSON.stringify({ type: 'close', code }));
          childProcess = null;
        });

        childProcess.on('error', (error) => {
          ws.send(JSON.stringify({ type: 'error', content: error.message }));
          childProcess = null;
        });
      } else if (data.type === 'input' && childProcess && childProcess.stdin) {
        childProcess.stdin.write(data.content + '\n');
      } else if (data.type === 'kill' && childProcess) {
        childProcess.kill('SIGTERM');
        ws.send(JSON.stringify({ type: 'info', content: '进程已终止' }));
      } else if (data.type === 'resize') {
        if (childProcess && childProcess.stdin && childProcess.stdin.setRawMode) {
          childProcess.stdin.setRawMode(true);
        }
      }
    } catch (error) {
      ws.send(JSON.stringify({ type: 'error', content: error.message }));
    }
  });

  ws.on('close', () => {
    if (childProcess) {
      childProcess.kill();
    }
  });
});

// 主页面路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动服务器
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  logModel.addLog('info', `Server started on port ${PORT}`);
});
