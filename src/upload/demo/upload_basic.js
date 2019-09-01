// fs 模块，用于读取目录与文件
const fs = require('fs');
// path 模块，用于解析和拼装路径
const path = require('path');
// Convert Windows backslash paths to slash paths
const slash = require('slash');
const OSS = require("ali-oss");

const DEFAULT_ALLOW_FILE = ["png", "jpg"];

/**
 * 读取目录下的图片文件，收集在 images 中
 * @param {*} entry 
 * @param {*} images 
 */
function readDir(entry, images = []) {
  const dirInfo = fs.readdirSync(entry);
  for (let i = 0; i < dirInfo.length; i++) {
    const item = dirInfo[i];
    // 拼装出文件/文件夹的路径
    const location = path.join(entry, item);
    const isDir = fs.statSync(location).isDirectory();
    // 如果为文件夹则继续递归向下查询
    if (isDir) {
      readDir(location, images);
      // 判断是否为所允许的图片格式
    } else if (DEFAULT_ALLOW_FILE.some(allowScheme => location.endsWith(allowScheme))) {
      images.push(location);
    }
  }
  return images;
}

// 定义检索的入口文件夹（ images 文件夹）
const staticDirPath = path.join(__dirname, '../../..', 'images');
const images = readDir(staticDirPath);

// 这些配置参数在上一章已经进行说明，不再复述
const client = new OSS({
  "region": "",
  "accessKeyId": "",
  "accessKeySecret": "",
  "bucket": "",
});

async function upload() {
  for (let i = 0; i < images.length; i++) {
    // slash 是为了兼容 windows 平台的路径划分符为 \ 的特性
    const local_url = slash(images[i]);
    // 阿里云 OSS 目标文件名
    // local_url.split() 是为了去除本地目录的前缀
    const remote_url = `images${local_url.split(staticDirPath)[1]}`;
    // 按顺序依次上传文件
    const result = await client.put(remote_url, local_url)
    console.log(`${result.url} 上传成功`);
  }
  console.log("所有文件上传成功");
}

upload();
