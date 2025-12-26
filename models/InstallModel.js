const fs = require('fs');
const path = require('path');

class InstallModel {
  constructor() {
    this.configPath = path.join(__dirname, '..', 'config', 'install.json');
    this.configDir = path.join(__dirname, '..', 'config');
    this.loadConfig();
  }

  loadConfig() {
    try {
      if (fs.existsSync(this.configPath)) {
        const data = fs.readFileSync(this.configPath, 'utf8');
        const savedConfig = JSON.parse(data);
        this.isInstalled = savedConfig.isInstalled || false;
        this.step = savedConfig.step || 0;
        this.config = {
          username: '',
          email: '',
          workingDir: '.',
          port: 3000,
          host: '0.0.0.0',
          autoStart: true,
          ...savedConfig.config
        };
      } else {
        this.reset();
      }
    } catch (error) {
      console.error('加载安装配置失败:', error);
      this.reset();
    }
  }

  saveConfig() {
    try {
      if (!fs.existsSync(this.configDir)) {
        fs.mkdirSync(this.configDir, { recursive: true });
      }
      const data = JSON.stringify({
        isInstalled: this.isInstalled,
        step: this.step,
        config: this.config
      });
      fs.writeFileSync(this.configPath, data, 'utf8');
    } catch (error) {
      console.error('保存安装配置失败:', error);
    }
  }

  isFirstRun() {
    return !this.isInstalled;
  }

  getInstallStatus() {
    return {
      isInstalled: this.isInstalled,
      step: this.step
    };
  }

  setInstalled(config) {
    this.isInstalled = true;
    this.step = 5;
    this.config = {
      ...this.config,
      ...config
    };
    this.saveConfig();
  }

  setStep(step) {
    this.step = step;
    this.saveConfig();
  }

  getConfig() {
    return { ...this.config };
  }

  reset() {
    this.isInstalled = false;
    this.step = 0;
    this.config = {
      username: '',
      email: '',
      workingDir: '.',
      port: 3000,
      host: '0.0.0.0',
      autoStart: true
    };
    this.saveConfig();
  }
}

module.exports = new InstallModel();
