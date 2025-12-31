import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import Editor from './Editor.jsx';
import Toolbar from './Toolbar.jsx';
import LogPanel from './LogPanel.jsx';
import { languageMap, defaultLanguage } from './utils/languageMap.js';

function App() {
    const [currentPath, setCurrentPath] = useState('.');
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [logs, setLogs] = useState([]);
    const [command, setCommand] = useState('');
    const [workingDir, setWorkingDir] = useState('.');

    const loadFiles = async (path = '.') => {
        try {
            const response = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
            const data = await response.json();
            
            if (data.type === 'directory') {
                setFiles(data.files);
                setCurrentPath(data.path);
            }
        } catch (error) {
            console.error('加载文件失败:', error);
        }
    };

    const loadFileContent = async (file) => {
        try {
            setSelectedFile(file);
            const response = await fetch(`/api/files/read?path=${encodeURIComponent(file.path)}`);
            const data = await response.json();
            
            const ext = file.name.split('.').pop().toLowerCase();
            setLanguage(languageMap[ext] || defaultLanguage);
            setFileContent(data.content);
        } catch (error) {
            console.error('加载文件内容失败:', error);
        }
    };

    const saveFile = async () => {
        if (!selectedFile) return;
        
        try {
            await fetch('/api/files/write', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: selectedFile.path, content: fileContent })
            });
            alert('文件保存成功');
        } catch (error) {
            console.error('保存文件失败:', error);
            alert('保存文件失败');
        }
    };

    const createDirectory = async () => {
        const dirName = prompt('请输入目录名称:');
        if (!dirName) return;
        
        try {
            await fetch('/api/files/mkdir', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: `${currentPath}/${dirName}` })
            });
            loadFiles(currentPath);
        } catch (error) {
            console.error('创建目录失败:', error);
            alert('创建目录失败');
        }
    };

    const createFile = async () => {
        const fileName = prompt('请输入文件名称:');
        if (!fileName) return;
        
        try {
            await fetch('/api/files/write', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: `${currentPath}/${fileName}`, content: '' })
            });
            loadFiles(currentPath);
        } catch (error) {
            console.error('创建文件失败:', error);
            alert('创建文件失败');
        }
    };

    const deleteItem = async (file) => {
        if (!confirm(`确定要删除 ${file.name} 吗?`)) return;
        
        try {
            await fetch(`/api/files/delete?path=${encodeURIComponent(file.path)}`, {
                method: 'DELETE'
            });
            loadFiles(currentPath);
            
            if (selectedFile && selectedFile.path === file.path) {
                setSelectedFile(null);
                setFileContent('');
            }
        } catch (error) {
            console.error('删除失败:', error);
            alert('删除失败');
        }
    };

    const loadLogs = async () => {
        try {
            const response = await fetch('/api/logs');
            const data = await response.json();
            setLogs(data.logs || []);
        } catch (error) {
            console.error('加载日志失败:', error);
        }
    };

    const executeCommand = async () => {
        if (!command.trim()) return;
        
        try {
            const response = await fetch('/api/claude/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command, workingDir })
            });
            const data = await response.json();
            
            if (data.status === 'running') {
                setCommand('');
                loadLogs();
            }
        } catch (error) {
            console.error('执行命令失败:', error);
            alert('执行命令失败');
        }
    };

    const clearLogs = async () => {
        try {
            await fetch('/api/logs/clear', { method: 'DELETE' });
            setLogs([]);
        } catch (error) {
            console.error('清空日志失败:', error);
        }
    };

    useEffect(() => {
        loadFiles();
        loadLogs();
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <header className="header text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Claude Code Web Manager</h1>
                <Toolbar onSave={saveFile} />
            </header>

            <div className="flex flex-1 overflow-hidden">
                <Sidebar 
                    currentPath={currentPath}
                    files={files}
                    selectedFile={selectedFile}
                    onNavigate={(path) => loadFiles(path)}
                    onFileClick={(file) => file.isDirectory ? loadFiles(file.path) : loadFileContent(file)}
                    onDelete={deleteItem}
                    onCreateDirectory={createDirectory}
                    onCreateFile={createFile}
                />

                <main className="flex-1 flex flex-col main-content">
                    <div className="flex-1 flex flex-col">
                        <div className="tabs-container flex items-center justify-between px-4 py-2">
                            <span className="text-sm text-gray-300">
                                {selectedFile ? selectedFile.path : '未选择文件'}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">语言:</span>
                                <select 
                                    className="input text-xs py-1 px-2 w-32"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    <option value="plaintext">Plain Text</option>
                                    <option value="javascript">JavaScript</option>
                                    <option value="typescript">TypeScript</option>
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                    <option value="scss">SCSS</option>
                                    <option value="json">JSON</option>
                                    <option value="markdown">Markdown</option>
                                    <option value="xml">XML</option>
                                    <option value="yaml">YAML</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                    <option value="c">C</option>
                                    <option value="cpp">C++</option>
                                    <option value="go">Go</option>
                                    <option value="rust">Rust</option>
                                    <option value="php">PHP</option>
                                    <option value="ruby">Ruby</option>
                                    <option value="shell">Shell</option>
                                    <option value="sql">SQL</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex-1 editor-container">
                            <Editor fileContent={fileContent} language={language} />
                        </div>
                    </div>

                    <LogPanel 
                        command={command}
                        workingDir={workingDir}
                        logs={logs}
                        onCommandChange={setCommand}
                        onWorkingDirChange={setWorkingDir}
                        onExecute={executeCommand}
                        onClear={clearLogs}
                    />
                </main>
            </div>
        </div>
    );
}

export default App;
