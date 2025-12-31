window.ChatPanel = function ChatPanel({ chatMessages, chatInput, onInputChange, onSendMessage }) {
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="tabs-container flex items-center justify-between px-4 py-2">
                <h2 className="text-sm font-semibold text-gray-300">Claude AI 对话</h2>
            </div>
            <div className="chat-container flex-1 overflow-hidden">
                <div className="chat-messages">
                    {chatMessages.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            <i className="ri-robot-line text-4xl mb-2"></i>
                            <p>开始与 Claude AI 对话</p>
                        </div>
                    ) : (
                        chatMessages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chat-message ${msg.role === 'user' ? 'chat-message-user' : 'chat-message-assistant'}`}
                            >
                                <div className="text-xs opacity-75 mb-1">
                                    {msg.role === 'user' ? '你' : 'Claude'}
                                </div>
                                <div>{msg.content}</div>
                            </div>
                        ))
                    )}
                </div>
                <div className="chat-input-container">
                    <textarea
                        className="chat-input"
                        rows="3"
                        value={chatInput}
                        onChange={e => onInputChange(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), onSendMessage())}
                        placeholder="输入消息，按 Enter 发送..."
                    ></textarea>
                    <div className="flex justify-end mt-2">
                        <button
                            className="btn btn-primary"
                            onClick={onSendMessage}
                            disabled={!chatInput.trim()}
                        >
                            <i className="ri-send-plane-line h-4 w-4"></i>
                            <span className="ml-1">发送</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};