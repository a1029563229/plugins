const fs = require("fs");
const path = require("path");
const OSS = require("ali-oss");
const slash = require("slash");
const chalk = require("chalk");
const clip = require("@ayykamp/napi-clip");

const Watcher = require("./Watcher");

const IGNORE = [".git"];
const DEFAULT_ALLOW_FILE = ["png", "jpg", "jpeg", "gif"];

class OSSUploader {
  constructor(config) {
    this.config = config;
    this.staticDirPath = path.join(__dirname, "../../images");
    this.allowFile = config.allowFile
      ? config.allowFile.split(",")
      : DEFAULT_ALLOW_FILE;
    this._init();
  }

  _init() {
    this.client = new OSS(this.config);
    this.images = this.readDir(this.staticDirPath);
  }

  readDir(entry, images = []) {
    const dirInfo = fs.readdirSync(entry);
    for (let i = 0; i < dirInfo.length; i++) {
      const item = dirInfo[i];
      if (IGNORE.indexOf(item) > -1) continue;
      const location = path.join(entry, item);
      const info = fs.statSync(location);
      if (info.isDirectory()) {
        this.readDir(location, images);
      } else if (
        this.allowFile.some((scheme) => location.endsWith(`.${scheme}`))
      ) {
        images.push(location);
      }
    }
    return images;
  }

  async putItem(image) {
    if (!fs.existsSync(image)) {
      return;
      // return console.log(chalk.red(`file ${image} not exists`));
    }

    const objectName = slash(`images${image.split(this.staticDirPath)[1]}`);
    const result = await this.client.put(objectName, image);
    clip.setText(result.url);
    console.log(`${result.url} 上传成功`);
  }

  watch() {
    console.log(chalk.blue("watch imageDir..."));
    const watcher = new Watcher();
    watcher.process(async (file) => {
      await this.putItem(file);
    });
  }
}

module.exports = OSSUploader;
