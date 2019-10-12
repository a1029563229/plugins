# 实用工具集

## 命令集合
上传 oss 文件：npm run upload

## 配置集合
配置需要在 config 文件夹下新建 config.json 文件

### OSS

```es6
    {
      "oss": {
        "region": "", // bucket 所在的 region，例如深圳的节点为 oss-cn-shenzhen，可在阿里云查询 oss 对应的 region
        "accessKeyId": "", // 阿里云 oss 提供的 accessKeyId
        "accessKeySecret": "", // 阿里云 oss 提供的 accessKeyId
        "bucket": "", // 阿里云 oss 的 bucket
        "localResourceDir": "", // 读取的本地图片文件夹；default: images
        "allowFile": "" // 允许的图片格式，用逗号隔开；default: png,jpg
      }
    }
```
