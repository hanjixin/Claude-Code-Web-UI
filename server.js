const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const logModel = require('./models/LogModel');

const app = express();
const PORT = 3000;

// 中间件配置
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 使用路由配置
app.use(routes);

// 主页面路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  logModel.addLog('info', `Server started on port ${PORT}`);
});

