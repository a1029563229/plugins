const fs = require("fs");

function firstWordUpperCase(word) {
  return word[0].toLocaleUpperCase() + word.slice(1);
}

function run(str) {
  const affixRE = /(?<=\w+_\w+ .* ).*(?=("|')([\u4e00-\u9fa5]|（|\)))/g;
  str = str.replace(affixRE, "/");

  const fieldRE = /\w+_\w+/g;
  str = str.replace(fieldRE, (r) => {
    let t = firstWordUpperCase(r);
    let next = t.indexOf("_");
    while(next > -1) {
      t = t.slice(0, next) + firstWordUpperCase(t.slice(next + 1, t.length))
      next = t.indexOf("_");
    }
    return t + ` \`json:"${r}"\``;
  });

  str = str.replace(/Zzzzz|_zzzzz/g, "");
  str = str.replace(/\w*int.*\)/g, "int");
  str = str.replace(/\w*varchar.*\)|text/g, "string");
  str = str.replace(/datetime/g, "time.Time");
  str = str.replace(/\w*decimal.*\)/g, "float64");
  
  return str;
}

const nstr = run();

fs.writeFileSync("./output/order", nstr, "utf-8");