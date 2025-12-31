import React, { useEffect, useRef } from 'react';

function Editor({ fileContent, language }) {
    const editorRef = useRef(null);
    const monacoRef = useRef(null);

    useEffect(() => {
        if (typeof monaco !== 'undefined' && editorRef.current && !monacoRef.current) {
            monacoRef.current = monaco.editor.create(editorRef.current, {
                value: fileContent,
                language: language,
                theme: 'vs-dark',
                minimap: { enabled: false },
                automaticLayout: true
            });
        }

        return () => {
            if (monacoRef.current) {
                monacoRef.current.dispose();
                monacoRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (monacoRef.current) {
            monaco.editor.setModelLanguage(monacoRef.current.getModel(), language);
        }
    }, [language]);

    useEffect(() => {
        if (monacoRef.current) {
            monacoRef.current.setValue(fileContent);
        }
    }, [fileContent]);

    return <div ref={editorRef} style={{ height: '100%', width: '100%' }}></div>;
}

export default Editor;
