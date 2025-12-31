window.Header = function Header({ activeNav, setActiveNav, onSaveFile }) {
    return (
        <header className="header text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <i className="ri-code-s-slash-line text-2xl"></i>
                <h1 className="text-xl font-bold">Claude Code Web Manager</h1>
            </div>
            <div className="flex gap-2">
                <div
                    className={`header-nav-item ${activeNav === 'editor' ? 'header-nav-item-active' : ''}`}
                    onClick={() => setActiveNav('editor')}
                >
                    <i className="ri-code-line h-4 w-4"></i>
                    <span>编辑器</span>
                </div>
                <div
                    className={`header-nav-item ${activeNav === 'env' ? 'header-nav-item-active' : ''}`}
                    onClick={() => setActiveNav('env')}
                >
                    <i className="ri-settings-3-line h-4 w-4"></i>
                    <span>环境变量</span>
                </div>
                <div
                    className={`header-nav-item ${activeNav === 'settings' ? 'header-nav-item-active' : ''}`}
                    onClick={() => setActiveNav('settings')}
                >
                    <i className="ri-user-settings-line h-4 w-4"></i>
                    <span>个性化配置</span>
                </div>
                <div
                    className={`header-nav-item ${activeNav === 'claude' ? 'header-nav-item-active' : ''}`}
                    onClick={() => setActiveNav('claude')}
                >
                    <i className="ri-robot-line h-4 w-4"></i>
                    <span>Claude Code</span>
                </div>
                <div
                    className={`header-nav-item ${activeNav === 'logs' ? 'header-nav-item-active' : ''}`}
                    onClick={() => setActiveNav('logs')}
                >
                    <i className="ri-file-list-3-line h-4 w-4"></i>
                    <span>日志</span>
                </div>
            </div>
            <div className="flex gap-3">
                <button className="btn btn-primary" onClick={onSaveFile}>
                    <i className="ri-save-line h-4 w-4"></i>
                    <span className="ml-1">保存文件</span>
                </button>
            </div>
        </header>
    );
};