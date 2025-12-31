## 代码重构计划

### 1. 创建目录结构
```
src/
├── components/
├── utils/
└── styles/
```

### 2. 提取配置文件
- `src/utils/fileIcons.js` - 文件图标映射
- `src/utils/languageMap.js` - 语言类型映射

### 3. 提取样式
- `src/styles/main.css` - 所有 CSS 样式

### 4. 拆分组件
- `src/components/Sidebar.jsx` - 文件浏览器
- `src/components/FileTree.jsx` - 文件树
- `src/components/Editor.jsx` - 编辑器
- `src/components/Tabs.jsx` - 标签页
- `src/components/LogPanel.jsx` - 日志面板

### 5. 重构主应用
- `src/components/App.jsx` - 主组件（组合各子组件）

### 6. 简化入口
- `public/index.html` - 精简为入口文件，引用 src 下的模块

### 使用方式
- 保持 CDN 引入（React/Babel/Monaco）
- 通过 Babel 编译 src 下的模块
- 最终效果：index.html ~100行，逻辑分散到多个文件