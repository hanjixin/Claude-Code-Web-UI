window.EnvPanel = function EnvPanel({ envVars, onImport, onAdd, onEdit, onDelete }) {
    return (
        <div className="flex-1 overflow-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">环境变量配置</h2>
                <div className="flex gap-2">
                    <button
                        className="btn btn-secondary"
                        onClick={() => onImport('minimax')}
                    >
                        <i className="ri-download-line h-4 w-4"></i>
                        <span className="ml-1">导入MiniMax</span>
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => onImport('bigmodel')}
                    >
                        <i className="ri-download-line h-4 w-4"></i>
                        <span className="ml-1">导入BigModel</span>
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={onAdd}
                    >
                        <i className="ri-add-line h-4 w-4"></i>
                        <span className="ml-1">添加变量</span>
                    </button>
                </div>
            </div>
            <div className="space-y-3">
                {envVars.map(env => (
                    <div key={env.id} className="env-item">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-purple-400">{env.key}</span>
                                {env.secret && <i className="ri-lock-line text-gray-400" title="隐藏值"></i>}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="btn btn-secondary text-xs"
                                    onClick={() => onEdit(env)}
                                >
                                    <i className="ri-edit-line h-3 w-3"></i>
                                </button>
                                <button
                                    className="btn btn-danger text-xs"
                                    onClick={() => onDelete(env.id)}
                                >
                                    <i className="ri-delete-bin-line h-3 w-3"></i>
                                </button>
                            </div>
                        </div>
                        <div className="text-sm text-gray-400 mb-1">
                            值: {env.secret ? '••••••••' : env.value}
                        </div>
                        {env.description && (
                            <div className="text-xs text-gray-500">{env.description}</div>
                        )}
                    </div>
                ))}
                {envVars.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                        暂无环境变量，点击上方按钮添加
                    </div>
                )}
            </div>
        </div>
    );
};