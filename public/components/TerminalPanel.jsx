window.TerminalPanel = function TerminalPanel({ terminalHeight, terminalOutput, terminalCommand, terminalStatus, onCommandChange, onExecute, onSendInput, onKillProcess, onResizeStart }) {
    return (
        <>
            <div
                className="terminal-resizer"
                onMouseDown={onResizeStart}
                style={{
                    height: '4px',
                    background: 'rgba(75, 85, 99, 0.5)',
                    cursor: 'row-resize',
                    marginTop: '0.5rem',
                    transition: 'background 0.2s ease'
                }}
            ></div>

            <div className="terminal-container flex-shrink-0" style={{ height: terminalHeight, marginTop: '0.5rem' }}>
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-300">终端</span>
                        {terminalStatus === 'running' && (
                            <button
                                className="btn btn-danger"
                                onClick={onKillProcess}
                                style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}
                            >
                                <i className="ri-stop-circle-line h-4 w-4"></i>
                                终止
                            </button>
                        )}
                    </div>
                    <div className={`terminal-status terminal-status-${terminalStatus}`}>
                        {terminalStatus === 'idle' ? '就绪' : terminalStatus === 'running' ? '运行中' : '错误'}
                    </div>
                </div>
                <div className="terminal-output" id="terminal-output">
                    {terminalOutput.length === 0 ? (
                        <div className="text-gray-500">终端就绪，输入命令开始...</div>
                    ) : (
                        terminalOutput.map((line, index) => (
                            <div key={index} className={`mb-1 ${line.type === 'error' ? 'text-red-400' : line.type === 'input' ? 'text-green-400' : line.type === 'info' ? 'text-blue-400' : ''}`}>
                                {line.content}
                            </div>
                        ))
                    )}
                </div>
                <div className="terminal-input-container flex-shrink-0">
                    <span className="terminal-prompt">{terminalStatus === 'running' ? '>' : '$'}</span>
                    <input
                        type="text"
                        className="terminal-input"
                        value={terminalCommand}
                        onChange={e => onCommandChange(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && (terminalStatus === 'running' ? onSendInput() : onExecute())}
                        placeholder={terminalStatus === 'running' ? '输入响应...' : '输入命令...'}
                        disabled={terminalStatus === 'error'}
                    />
                </div>
            </div>
        </>
    );
};