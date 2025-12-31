window.LogsPanel = function LogsPanel({ logs }) {
    return (
        <div className="log-container overflow-y-auto flex-1">
            {logs.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    <i className="ri-file-list-3-line h-12 w-12 mx-auto mb-2 opacity-50"></i>
                    <p>暂无日志</p>
                </div>
            ) : (
                logs.map((log, index) => (
                    <div key={index} className="file-item">
                        <i className="ri-file-text-line h-4 w-4 text-blue-500"></i>
                        <span className="truncate flex-1">{log.message}</span>
                    </div>
                ))
            )}
        </div>
    );
};