const path = require("path");
const fs = require("fs");

const DEFAULT_ALLOW_FILE = ["png", "jpg", "jpeg", "gif"];

class Watcher {
  constructor() {
    this.processes = [];
    this._init();
  }

  _init() {
    const imagesDir = path.join(__dirname, "../../images");
    fs.watch(imagesDir, { recursive: true }, (eventType, filename) => {
      if (
        eventType !== "rename" ||
        !DEFAULT_ALLOW_FILE.some((suffix) => filename.endsWith(suffix))
      ) {
        return;
      }

      const file = path.join(imagesDir, filename);
      this.processes.forEach((processFn) => processFn(file));
    });
  }

  process(fn) {
    this.processes.push(fn);
  }
}

module.exports = Watcher;
