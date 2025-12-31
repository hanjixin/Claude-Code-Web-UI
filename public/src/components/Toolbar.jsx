import React from 'react';

function Toolbar({ onSave }) {
    return (
        <div className="flex gap-3">
            <button className="btn btn-primary" onClick={onSave} title="保存文件">
                <i className="ri-save-line h-4 w-4"></i>
                <span className="ml-1">保存文件</span>
            </button>
        </div>
    );
}

export default Toolbar;
