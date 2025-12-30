const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');
const pty = require('node-pty');
const routes = require('./routes');
const logModel = require('./models/LogModel');
const envModel = require('./models/EnvModel');

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

        console.log(`[WebSocket] Executing command: ${command} in ${cwd}`);

        const customEnv = envModel.getEnvObject();
        const execEnv = { ...process.env, ...customEnv };

        try {
          childProcess = pty.spawn('/bin/bash', ['-c', command], {
            name: 'xterm-256color',
            cols: 80,
            rows: 30,
            cwd,
            env: execEnv
          });

          console.log(`[WebSocket] PTY spawned with PID: ${childProcess.pid}`);

          childProcess.onData((data) => {
            console.log(`[WebSocket] PTY data:`, data);
            ws.send(JSON.stringify({ type: 'output', content: data }));
          });

          childProcess.onExit(({ exitCode, signal }) => {
            console.log(`[WebSocket] PTY exited with code: ${exitCode}, signal: ${signal}`);
            ws.send(JSON.stringify({ type: 'close', code: exitCode }));
            childProcess = null;
          });
        } catch (ptyError) {
          console.error(`[WebSocket] PTY spawn failed, using stdio pipe:`, ptyError);

          try {
            childProcess = spawn('/bin/bash', ['-c', command], {
              cwd,
              env: execEnv,
              stdio: ['pipe', 'pipe', 'pipe'],
              shell: true
            });

            console.log(`[WebSocket] Process spawned with PID: ${childProcess.pid}`);

            childProcess.stdout.on('data', (data) => {
              console.log(`[WebSocket] stdout:`, data.toString());
              ws.send(JSON.stringify({ type: 'output', content: data.toString() }));
            });

            childProcess.stderr.on('data', (data) => {
              console.log(`[WebSocket] stderr:`, data.toString());
              ws.send(JSON.stringify({ type: 'output', content: data.toString() }));
            });

            childProcess.on('close', (code) => {
              console.log(`[WebSocket] Process closed with code: ${code}`);
              ws.send(JSON.stringify({ type: 'close', code }));
              childProcess = null;
            });

            childProcess.on('error', (error) => {
              console.error(`[WebSocket] Process error:`, error);
              ws.send(JSON.stringify({ type: 'error', content: error.message }));
              childProcess = null;
            });
          } catch (spawnError) {
            console.error(`[WebSocket] Spawn also failed:`, spawnError);
            ws.send(JSON.stringify({ type: 'error', content: spawnError.message }));
          }
        }
      } else if (data.type === 'input' && childProcess) {
        console.log(`[WebSocket] Sending input:`, data.content);
        if (childProcess.write) {
          childProcess.write(data.content);
        } else if (childProcess.stdin) {
          childProcess.stdin.write(data.content);
        }
      } else if (data.type === 'resize' && childProcess && childProcess.resize) {
        const { cols, rows } = data;
        console.log(`[WebSocket] Resizing PTY to: ${cols}x${rows}`);
        childProcess.resize(cols, rows);
      } else if (data.type === 'kill' && childProcess) {
        childProcess.kill();
        ws.send(JSON.stringify({ type: 'info', content: '进程已终止' }));
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
