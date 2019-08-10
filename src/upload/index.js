const fs = require("fs");
const path = require("path");
const OSS = require("ali-oss");

const config = require("@/config");
const staticDirPath = path.join(__dirname, "../../images");
const images = readDir(staticDirPath);
const IGNORE = [".git"];

class OSSUploader {
  constructor(config) {
    this.config = config;
    this._init();
  }

  _init() {
    this.client = new OSS(config);
  }

  readDir(entry, images = []) {
    const dirInfo = fs.readdirSync(entry);
    for (let i = 0; i < dirInfo.length; i++) {
      const item = dirInfo[i];
      if (IGNORE.indexOf(item) > -1) continue;
      const location = path.join(entry, item);
      const info = fs.statSync(location);
      if (info.isDirectory()) {
        readDir(location, images);
      } else if (location.endsWith(".png") || location.endsWith(".jpg")) {
        images.push(location);
      }
    }
    return images;
  }

  async put() {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const objectName = `images${image.split(staticDirPath)[1]}`;
      const localFile = image;
      if (objectName.indexOf("\\") > -1) {
        objectName = objectName.replace(/\\/g, "/");
      }
      // await client.put(objectName, localFile);
      console.log(
        `http://xuedaowang.oss-cn-shenzhen.aliyuncs.com/${objectName} 上传成功`
      );
    }
    console.log("所有文件上传成功");
  }
}

module.exports = OSSUploader;