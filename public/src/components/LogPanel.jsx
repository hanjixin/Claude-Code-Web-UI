import React from 'react';

function LogPanel({ command, workingDir, logs, onCommandChange, onWorkingDirChange, onExecute, onClear }) {
    return (
        <div className="h-80 border-t border-gray-700 flex flex-col">
            <div className="sidebar-header">
                <h2 className="text-sm font-semibold text-gray-300 mb-3">命令执行</h2>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        className="input flex-1" 
                        placeholder="输入命令..." 
                        value={command} 
                        onChange={(e) => onCommandChange(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && onExecute()}
                    />
                    <input 
                        type="text" 
                        className="input w-48" 
                        placeholder="工作目录..." 
                        value={workingDir} 
                        onChange={(e) => onWorkingDirChange(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={onExecute}>
                        <i className="ri-play-line h-3.5 w-3.5"></i>
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                    <span className="text-sm font-semibold text-gray-300">执行日志</span>
                    <button className="btn btn-secondary text-xs" onClick={onClear}>
                        <i className="ri-delete-bin-line h-3 w-3"></i>
                        <span className="ml-1">清空</span>
                    </button>
                </div>
                <div className="log-container flex-1 overflow-y-auto">
                    {logs.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">暂无日志</div>
                    ) : (
                        logs.map((log, index) => (
                            <div key={index} className={`log-entry log-${log.level}`}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-semibold uppercase">{log.level}</span>
                                    <span className="text-xs text-gray-400">{new Date(log.timestamp).toLocaleString()}</span>
                                </div>
                                <div className="text-sm">{log.message}</div>
                                {log.output && (
                                    <pre className="text-xs mt-2 text-gray-400 whitespace-pre-wrap">{log.output}</pre>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default LogPanel;
