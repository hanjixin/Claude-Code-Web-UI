window.Sidebar = function Sidebar({ activeNav, currentPath, files, selectedFile, sidebarWidth, onNavigate, onFileClick, onDelete, onCreateDirectory, onCreateFile, onLoadFiles, onLoadLogs, onClearLogs }) {
    const getFileIcon = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase();
        const iconMap = {
            'js': { name: 'ri-code-s-slash-line', color: 'text-yellow-400' },
            'jsx': { name: 'ri-code-s-slash-line', color: 'text-yellow-400' },
            'ts': { name: 'ri-code-s-slash-line', color: 'text-blue-400' },
            'tsx': { name: 'ri-code-s-slash-line', color: 'text-blue-400' },
            'html': { name: 'ri-html5-line', color: 'text-orange-400' },
            'css': { name: 'ri-css3-line', color: 'text-blue-500' },
            'json': { name: 'ri-braces-line', color: 'text-yellow-300' },
            'md': { name: 'ri-markdown-line', color: 'text-gray-300' },
            'py': { name: 'ri-code-line', color: 'text-green-500' },
            'sh': { name: 'ri-terminal-line', color: 'text-green-400' }
        };
        return iconMap[ext] || { name: 'ri-file-line', color: 'text-gray-400' };
    };

    return (
        <aside className="sidebar flex flex-col" style={{ width: sidebarWidth }}>
            <div className="sidebar-header">
                {activeNav === 'editor' && (
                    <>
                        <h2 className="text-sm font-semibold text-gray-300 mb-3">文件浏览器</h2>
                        <div className="flex gap-2 mb-3">
                            <button className="btn btn-primary flex-1" onClick={() => onLoadFiles('.')}>
                                <i className="ri-home-line h-3.5 w-3.5 mr-1"></i>首页
                            </button>
                            <button className="btn btn-secondary" onClick={onCreateDirectory}>
                                <i className="ri-folder-add-line h-3.5 w-3.5"></i>
                            </button>
                            <button className="btn btn-secondary" onClick={onCreateFile}>
                                <i className="ri-file-add-line h-3.5 w-3.5"></i>
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="input flex-1"
                                placeholder="输入路径..."
                                value={currentPath}
                                onChange={e => onNavigate(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={() => onLoadFiles(currentPath)}>
                                <i className="ri-search-line h-3.5 w-3.5"></i>
                            </button>
                        </div>
                    </>
                )}
                {activeNav === 'logs' && (
                    <>
                        <h2 className="text-sm font-semibold text-gray-300 mb-3">日志管理</h2>
                        <div className="flex gap-2 mb-3">
                            <button className="btn btn-primary flex-1" onClick={onLoadLogs}>
                                <i className="ri-refresh-line h-3.5 w-3.5 mr-1"></i>刷新
                            </button>
                            <button className="btn btn-danger" onClick={onClearLogs}>
                                <i className="ri-delete-bin-line h-3.5 w-3.5"></i>清空
                            </button>
                        </div>
                    </>
                )}
            </div>

            {activeNav === 'editor' && (
                <div className="file-tree overflow-y-auto flex-1">
                    <div className="file-item" onClick={() => onLoadFiles(currentPath.split('/').slice(0, -1).join('/') || '.')}>
                        <i className="ri-arrow-left-s-line h-4 w-4 text-gray-500"></i>
                        <span>上一级</span>
                    </div>
                    {files
                        .sort((a, b) => {
                            if (a.isDirectory === b.isDirectory) {
                                return a.name.localeCompare(b.name);
                            }
                            return a.isDirectory ? -1 : 1;
                        })
                        .map((file, index) => {
                            const icon = file.isDirectory === true
                                ? { name: 'ri-folder-line', color: 'text-yellow-500' }
                                : getFileIcon(file.name);
                            return (
                                <div
                                    key={index}
                                    className={`file-item group ${selectedFile?.path === file.path ? 'file-item-selected' : ''}`}
                                    onClick={() => file.isDirectory ? onFileClick(file.path) : onFileClick(file)}
                                >
                                    <i className={`${icon.name} h-4 w-4 ${icon.color}`}></i>
                                    <span className="truncate flex-1">{file.name}</span>
                                    <button
                                        className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500"
                                        onClick={e => { e.stopPropagation(); onDelete(file); }}
                                    >
                                        <i className="ri-delete-bin-line h-3.5 w-3.5"></i>
                                    </button>
                                </div>
                            );
                        })}
                </div>
            )}

            {activeNav === 'logs' && (
                <div className="log-container overflow-y-auto flex-1">
                    <div className="text-center text-gray-500 py-8">
                        <i className="ri-file-list-3-line h-12 w-12 mx-auto mb-2 opacity-50"></i>
                        <p>日志功能开发中</p>
                    </div>
                </div>
            )}
        </aside>
    );
};