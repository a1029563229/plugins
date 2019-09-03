const shell = require('shelljs');
const path = require('path');
const slash = require('slash');

const generate = require('./generate');

const create = async app => {
  await generate();
  const cwd = process.cwd();
  const dirPath = slash(path.resolve(cwd, app));
  shell.exec(`git clone git@github.com:a1029563229/es6-template.git ${dirPath}`);
  console.log(`Create ${app} successfully!`);
}

module.exports = create;