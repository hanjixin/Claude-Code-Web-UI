import React from 'react';
import { fileIcons, folderIcon, defaultFileIcon } from './utils/fileIcons.js';

function FileTree({ files, selectedFile, onFileClick, onDelete, onNavigateUp }) {
    const handleDelete = (e, file) => {
        e.stopPropagation();
        onDelete(file);
    };

    return (
        <>
            <div className="file-item" onClick={onNavigateUp}>
                <i className="ri-arrow-left-s-line h-4 w-4 text-gray-500"></i>
                <span>上一级</span>
            </div>
            {files.map((file, index) => {
                const icon = file.isDirectory === true 
                    ? folderIcon 
                    : (fileIcons[file.name.split('.').pop().toLowerCase()] || defaultFileIcon);
                return (
                    <div 
                        key={index}
                        className={`file-item group ${selectedFile?.path === file.path ? 'file-item-selected' : ''}`}
                        onClick={() => file.isDirectory ? onFileClick(file.path) : onFileClick(file)}
                        onDoubleClick={() => !file.isDirectory && onFileClick(file)}
                    >
                        <i className={`${icon.name} h-4 w-4 ${icon.color}`}></i>
                        <span className="truncate flex-1">{file.name}</span>
                        <button 
                            className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500" 
                            onClick={(e) => handleDelete(e, file)}
                        >
                            <i className="ri-delete-bin-line h-3.5 w-3.5"></i>
                        </button>
                    </div>
                );
            })}
        </>
    );
}

export default FileTree;
