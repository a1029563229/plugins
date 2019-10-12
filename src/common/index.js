const fs = require('fs');
const path = require('path');

const IGNORE = ['.git'];

function readDir(entry, images = []) {
  const dirInfo = fs.readdirSync(entry);
  for (let i = 0; i < dirInfo.length; i++) {
    const item = dirInfo[i];
    if (IGNORE.indexOf(item) > -1) continue;
    const location = path.join(entry, item);
    const info = fs.statSync(location);
    if (info.isDirectory()) {
      readDir(location, images);
    } else if (location.endsWith('.png') || location.endsWith('.jpg')) {
      images.push(location);
    }
  }
  return images;
}

module.exports = {
  readDir
}