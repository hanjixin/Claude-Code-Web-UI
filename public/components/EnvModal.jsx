window.EnvModal = function EnvModal({ show, onClose, onSave, envVar, pendingEnvVar }) {
    const [key, setKey] = useState(envVar?.key || pendingEnvVar?.key || '');
    const [value, setValue] = useState(envVar?.value || pendingEnvVar?.value || '');
    const [description, setDescription] = useState(envVar?.description || pendingEnvVar?.description || '');
    const [secret, setSecret] = useState(envVar?.secret ?? pendingEnvVar?.secret ?? false);

    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-semibold mb-4">{envVar ? '编辑环境变量' : '添加环境变量'}</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">键名</label>
                        <input
                            type="text"
                            className="input w-full"
                            value={key}
                            onChange={e => setKey(e.target.value)}
                            placeholder="例如: API_KEY"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">值</label>
                        <input
                            type={secret ? 'password' : 'text'}
                            className="input w-full"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder="输入值"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">描述</label>
                        <input
                            type="text"
                            className="input w-full"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="可选描述"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="secret"
                            checked={secret}
                            onChange={e => setSecret(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <label htmlFor="secret" className="text-sm text-gray-400">隐藏值</label>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <button className="btn btn-secondary" onClick={onClose}>取消</button>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            onSave({ key, value, description, secret });
                            onClose();
                        }}
                    >
                        保存
                    </button>
                </div>
            </div>
        </div>
    );
};