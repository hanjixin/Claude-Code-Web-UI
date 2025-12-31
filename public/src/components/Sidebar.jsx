import React from 'react';
import FileTree from './FileTree.jsx';

function Sidebar({ currentPath, files, selectedFile, onNavigate, onFileClick, onDelete, onCreateDirectory, onCreateFile }) {
    return (
        <aside className="w-72 sidebar flex flex-col">
            <div className="sidebar-header">
                <h2 className="text-sm font-semibold text-gray-300 mb-3">文件浏览器</h2>
                <div className="flex gap-2 mb-3">
                    <button className="btn btn-primary flex-1" onClick={() => onNavigate('.')}>
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
                        onChange={(e) => onNavigate(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={() => onNavigate(currentPath)}>
                        <i className="ri-search-line h-3.5 w-3.5"></i>
                    </button>
                </div>
            </div>

            <div className="file-tree overflow-y-auto">
                <FileTree 
                    files={files}
                    selectedFile={selectedFile}
                    onFileClick={onFileClick}
                    onDelete={onDelete}
                    onNavigateUp={() => onNavigate(currentPath.split('/').slice(0, -1).join('/') || '.')}
                />
            </div>
        </aside>
    );
}

export default Sidebar;
