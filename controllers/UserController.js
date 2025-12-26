const userModel = require('../models/UserModel');

exports.getConfig = (req, res) => {
  try {
    const config = userModel.getConfig();
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: '获取配置失败' });
  }
};

exports.updateConfig = (req, res) => {
  try {
    const updates = req.body;
    const config = userModel.updateConfig(updates);
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: '更新配置失败' });
  }
};

exports.getUsername = (req, res) => {
  try {
    const username = userModel.getUsername();
    res.json({ username });
  } catch (error) {
    res.status(500).json({ error: '获取用户名失败' });
  }
};

exports.setUsername = (req, res) => {
  try {
    const { name } = req.body;
    userModel.setUsername(name);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '设置用户名失败' });
  }
};
