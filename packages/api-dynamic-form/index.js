require('module-alias/register');
require('babel-core/register');

const app = require('./app');

const host = '0.0.0.0';
const port = 4400;

app.listen(port, host, () => {
  console.log(`Server is listening in ${host}:${port}`);
});
