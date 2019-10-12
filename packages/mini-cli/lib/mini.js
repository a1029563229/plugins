const program = require('commander');

program.version(require('../package.json').version)
  .usage('<command> [options]')

program
  .command('create <app-name>')
  .description('create a new project powered by shadows-mini-cli')
  .action((name) => {
    require('./create')(name);
  });

program.parse(process.argv);