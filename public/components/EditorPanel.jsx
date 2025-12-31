window.EditorPanel = function EditorPanel({ selectedFile, language, onLanguageChange }) {
    return (
        <div className="flex-1 flex flex-col overflow-hidden" style={{ flex: '1 1 auto', minHeight: 0 }}>
            <div className="tabs-container flex items-center justify-between px-4 py-2 flex-shrink-0">
                <span className="text-sm text-gray-300">
                    {selectedFile ? selectedFile.path : '未选择文件'}
                </span>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">语言:</span>
                    <select
                        className="input text-xs py-1 px-2 w-32"
                        value={language}
                        onChange={e => onLanguageChange(e.target.value)}
                    >
                        <option value="plaintext">Plain Text</option>
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="json">JSON</option>
                        <option value="markdown">Markdown</option>
                        <option value="python">Python</option>
                        <option value="shell">Shell</option>
                    </select>
                </div>
            </div>
            <div className="flex-1 editor-container overflow-hidden">
                <div id="editor" style={{ height: '100%', width: '100%' }}></div>
            </div>
        </div>
    );
};