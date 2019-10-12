const parseXlsx = require('excel').default;
const set = require('lodash/set');
const drop = require('lodash/drop');
const path = require('path');
const fs = require('fs');

const excels = fs.readdirSync(path.join(__dirname, './input'));
for (let i = 0; i < excels.length; i++) {
  const excel = excels[i];
  if (excel.startsWith('.') || !excel.endsWith('xlsx')) continue;
  const filePath = path.join(__dirname, './input', excel);
  parseExcel(filePath);
}

function parseExcel(filePath) {
  const fileName = path.basename(filePath, '.xlsx');
  parseXlsx(filePath).then((data) => {
    const fields = data.shift().map(item => item.split('/')[0]);
    const jsonData = data.map(item => fields.reduce((o, field, i) => set(o, field, item[i]), {}));
    fs.writeFile(path.join(__dirname, './output', `${fileName}.json`), JSON.stringify(jsonData, null, 2), 'utf-8', (err) => {
      if (err) throw err;
    })
  });
}