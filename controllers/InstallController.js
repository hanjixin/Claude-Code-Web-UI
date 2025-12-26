const installModel = require('../models/InstallModel');

exports.check = (req, res) => {
  try {
    const status = installModel.getInstallStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: '检查安装状态失败' });
  }
};

exports.startInstall = (req, res) => {
  try {
    installModel.setStep(1);
    res.json({ success: true, step: 1 });
  } catch (error) {
    res.status(500).json({ error: '开始安装失败' });
  }
};

exports.completeInstall = (req, res) => {
  try {
    const config = req.body;
    installModel.setInstalled(config);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '完成安装失败' });
  }
};

exports.reset = (req, res) => {
  try {
    installModel.reset();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '重置安装状态失败' });
  }
};
