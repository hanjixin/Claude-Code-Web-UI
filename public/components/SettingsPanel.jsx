window.SettingsPanel = function SettingsPanel({ userConfig, onConfigChange, onSave }) {
    return (
        <div className="flex-1 overflow-auto p-6">
            <h2 className="text-xl font-semibold mb-6">个性化配置</h2>
            <div className="max-w-2xl space-y-6">
                <div className="env-item">
                    <h3 className="font-semibold mb-4">基本信息</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">用户名</label>
                            <input
                                type="text"
                                className="input w-full"
                                value={userConfig.username || ''}
                                onChange={e => onConfigChange({ ...userConfig, username: e.target.value })}
                                placeholder="输入用户名"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">邮箱</label>
                            <input
                                type="email"
                                className="input w-full"
                                value={userConfig.email || ''}
                                onChange={e => onConfigChange({ ...userConfig, email: e.target.value })}
                                placeholder="输入邮箱"
                            />
                        </div>
                    </div>
                </div>
                <div className="env-item">
                    <h3 className="font-semibold mb-4">工作目录</h3>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">默认工作目录</label>
                        <input
                            type="text"
                            className="input w-full"
                            value={userConfig.workingDir || '.'}
                            onChange={e => onConfigChange({ ...userConfig, workingDir: e.target.value })}
                            placeholder="输入工作目录路径"
                        />
                    </div>
                </div>
                <div className="env-item">
                    <h3 className="font-semibold mb-4">服务器配置</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">端口</label>
                            <input
                                type="number"
                                className="input w-full"
                                value={userConfig.port || 3000}
                                onChange={e => onConfigChange({ ...userConfig, port: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">主机</label>
                            <input
                                type="text"
                                className="input w-full"
                                value={userConfig.host || '0.0.0.0'}
                                onChange={e => onConfigChange({ ...userConfig, host: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className="env-item">
                    <h3 className="font-semibold mb-4">其他设置</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">自动启动</span>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={userConfig.autoStart || false}
                                onChange={e => onConfigChange({ ...userConfig, autoStart: e.target.checked })}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
                <button
                    className="btn btn-primary w-full"
                    onClick={() => onSave(userConfig)}
                >
                    <i className="ri-save-line h-4 w-4"></i>
                    <span className="ml-1">保存配置</span>
                </button>
            </div>
        </div>
    );
};