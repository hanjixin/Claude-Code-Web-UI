class UserModel {
  constructor() {
    this.config = {
      username: 'Admin',
      email: 'admin@example.com',
      avatar: '',
      theme: 'dark',
      language: 'zh-CN',
      createdAt: new Date().toISOString()
    };
  }

  getConfig() {
    return { ...this.config };
  }

  updateConfig(updates) {
    this.config = { ...this.config, ...updates };
    return this.config;
  }

  getUsername() {
    return this.config.username;
  }

  setUsername(name) {
    this.config.username = name;
  }

  getEmail() {
    return this.config.email;
  }

  setEmail(email) {
    this.config.email = email;
  }

  getAvatar() {
    return this.config.avatar;
  }

  setAvatar(avatar) {
    this.config.avatar = avatar;
  }

  getTheme() {
    return this.config.theme;
  }

  setTheme(theme) {
    this.config.theme = theme;
  }
}

module.exports = new UserModel();
