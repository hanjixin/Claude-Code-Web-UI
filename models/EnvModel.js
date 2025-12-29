class EnvModel {
  constructor() {
    this.envVars = [
      { id: 1, key: 'NODE_ENV', value: 'development', description: 'Node.js环境', secret: false },
      { id: 2, key: 'PORT', value: '3000', description: '服务端口', secret: false }
    ];
    this.nextId = 3;
  }

  getAll() {
    return [...this.envVars];
  }

  getById(id) {
    return this.envVars.find(env => env.id === id);
  }

  add(envVar) {
    const newEnv = {
      id: this.nextId++,
      key: envVar.key,
      value: envVar.value,
      description: envVar.description || '',
      secret: envVar.secret || false
    };
    this.envVars.push(newEnv);
    return newEnv;
  }

  update(id, updates) {
    const index = this.envVars.findIndex(env => env.id === id);
    if (index !== -1) {
      this.envVars[index] = { ...this.envVars[index], ...updates };
      return this.envVars[index];
    }
    return null;
  }

  delete(id) {
    const index = this.envVars.findIndex(env => env.id === id);
    if (index !== -1) {
      this.envVars.splice(index, 1);
      return true;
    }
    return false;
  }

  getEnvObject() {
    const envObj = {};
    this.envVars.forEach(env => {
      envObj[env.key] = env.value;
    });
    return envObj;
  }

  getPublicEnvObject() {
    const envObj = {};
    this.envVars.forEach(env => {
      if (!env.secret) {
        envObj[env.key] = env.value;
      }
    });
    return envObj;
  }

  clear() {
    this.envVars = [];
    this.nextId = 1;
    return true;
  }
}

module.exports = new EnvModel();
