const fs = require("fs");
const path = require("path");
const { app } = require("electron");

class Store {
  constructor() {
    const userDataPath = app.getPath("userData");
    this.path = path.join(userDataPath, "quickdo-data.json");
    this.data = this._load();
  }

  _load() {
    try {
      return JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } catch {
      return {};
    }
  }

  _save() {
    fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2), "utf-8");
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;
    this._save();
  }
}

module.exports = Store;
