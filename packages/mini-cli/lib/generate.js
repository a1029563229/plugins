var inquirer = require('inquirer');

const generate = async () => {
  const template = await inquirer.prompt({
    name: 'template',
    type: 'list',
    choices: [ "ES6 Default", "ES6 Default Again"]
  });
  return { ...template }
};

module.exports = generate;