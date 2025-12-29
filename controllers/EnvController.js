const envModel = require('../models/EnvModel');

exports.getAll = (req, res) => {
  try {
    const envVars = envModel.getAll();
    res.json(envVars);
  } catch (error) {
    res.status(500).json({ error: '获取环境变量失败' });
  }
};

exports.add = (req, res) => {
  try {
    const { key, value, description, secret } = req.body;
    if (!key || !value) {
      return res.status(400).json({ error: 'key和value为必填项' });
    }
    const envVar = envModel.add({ key, value, description, secret });
    res.json(envVar);
  } catch (error) {
    res.status(500).json({ error: '添加环境变量失败' });
  }
};

exports.update = (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const envVar = envModel.update(parseInt(id), updates);
    if (!envVar) {
      return res.status(404).json({ error: '环境变量不存在' });
    }
    res.json(envVar);
  } catch (error) {
    res.status(500).json({ error: '更新环境变量失败' });
  }
};

exports.delete = (req, res) => {
  try {
    const { id } = req.params;
    const success = envModel.delete(parseInt(id));
    if (!success) {
      return res.status(404).json({ error: '环境变量不存在' });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '删除环境变量失败' });
  }
};

exports.getEnvObject = (req, res) => {
  try {
    const envObj = envModel.getPublicEnvObject();
    res.json(envObj);
  } catch (error) {
    res.status(500).json({ error: '获取环境变量对象失败' });
  }
};

exports.clear = (req, res) => {
  try {
    envModel.clear();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '清空环境变量失败' });
  }
};

exports.importFromSystem = (req, res) => {
  try {
    const imported = [];
    const missing = [];
    const { platform } = req.body || {};

    if (platform === 'minimax') {
      const baseUrl = process.env.ANTHROPIC_BASE_URL || 'https://api.minimaxi.com/anthropic';
      const apiKey = process.env.ANTHROPIC_AUTH_TOKEN || process.env.ANTHROPIC_AUTH_TOKEN;

      envModel.add({
        key: 'ANTHROPIC_BASE_URL',
        value: baseUrl,
        description: 'MiniMax API 基础URL',
        secret: false
      });
      imported.push('ANTHROPIC_BASE_URL');

      if (apiKey) {
        envModel.add({
          key: 'ANTHROPIC_AUTH_TOKEN',
          value: apiKey,
          description: 'MiniMax API 密钥',
          secret: true
        });
        imported.push('ANTHROPIC_AUTH_TOKEN');
      } else {
        missing.push('ANTHROPIC_AUTH_TOKEN');
      }
    } else if (platform === 'bigmodel') {
      const baseUrl = process.env.ANTHROPIC_BASE_URL || 'https://open.bigmodel.cn/api/anthropic';
      const apiKey = process.env.ANTHROPIC_AUTH_TOKEN;

      envModel.add({
        key: 'ANTHROPIC_BASE_URL',
        value: baseUrl,
        description: 'BigModel API 基础URL',
        secret: false
      });
      imported.push('ANTHROPIC_BASE_URL');

      if (apiKey) {
        envModel.add({
          key: 'ANTHROPIC_AUTH_TOKEN',
          value: apiKey,
          description: 'BigModel API 密钥',
          secret: true
        });
        imported.push('ANTHROPIC_AUTH_TOKEN');
      } else {
        missing.push('ANTHROPIC_AUTH_TOKEN');
      }
    }

    res.json({ success: true, imported, missing, platform });
  } catch (error) {
    res.status(500).json({ error: '导入环境变量失败' });
  }
};
