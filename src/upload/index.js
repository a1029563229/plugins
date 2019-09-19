const fs = require("fs");
const path = require("path");
const OSS = require("ali-oss");
const cache = require('./.cache/record.json');

const IGNORE = [".git"];
const DEFAULT_ALLOW_FILE = ["png", "jpg"];
const record = {};

class OSSUploader {
  constructor(config) {
    this.config = config;
    this.staticDirPath = path.join(
      __dirname,
      "../../",
      config.localResourceDir || "images"
    );
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
        this.allowFile.some(scheme => location.endsWith(`.${scheme}`))
      ) {
        images.push(location);
      }
    }
    return images;
  }

  async put() {
    const images = this.images;
    const staticDirPath = this.staticDirPath;
    const client = this.client;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const objectName = `images${image.split(staticDirPath)[1]}`;
      const localFile = image;
      if (objectName.indexOf("\\") > -1) {
        objectName = objectName.replace(/\\/g, "/");
      }
      // 通过 mtimeMs 对比文件是否改动
      record[localFile] = fs.statSync(localFile).mtimeMs;
      if (cache[localFile] && cache[localFile] === record[localFile]) continue;
      const result = await client.put(objectName, localFile);
      console.log(`${result.url} 上传成功`);
    }
    
    // 记录文件变更时间
    fs.writeFileSync(path.join(__dirname, './.cache/record.json'), JSON.stringify(record, null, 2), 'utf-8');
    console.log("所有文件上传成功");
  }
}

module.exports = OSSUploader;
