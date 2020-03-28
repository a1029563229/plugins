function firstWordUpperCase(word) {
  return word[0].toLocaleUpperCase() + word.slice(1);
}

class SQLParser {
  constructor(sql) {
    this.sql = sql;
    this.goDoc = "";
    this.jsonDoc = "";
    this.showDoc = "";
  }

  getGoDoc() {
    if (this.goDoc) return this.goDoc;

    let str = this.sql;
    str = str.replace(/`/g, "");
    const affixRE = /(?<=\w+_?\w+ .* ).*(?=("|')([\u4e00-\u9fa5\w]|（|\)))/g;
    str = str.replace(affixRE, "/");
    const fieldRE = /\w+_?\w+(?= \w)/g;
    str = str.replace(fieldRE, r => {
      let t = firstWordUpperCase(r);
      let next = t.indexOf("_");
      while (next > -1) {
        t = t.slice(0, next) + firstWordUpperCase(t.slice(next + 1, t.length));
        next = t.indexOf("_");
      }
      return `${t} \`json:"${r}"\``;
    });

    str = str.replace(/\w*int.*\)(?= )/g, "int");
    str = str.replace(/\w*varchar.*\)|text(?= )/g, "string");
    str = str.replace(/datetime(?= )/g, "time.Time");
    str = str.replace(/\w*decimal.*\)(?= )/g, "float64");
    this.goDoc = str;
    return this.goDoc;
  }

  getJSONDoc() {
    if (!this.goDoc) this.getJSONDoc();
    if (this.jsonDoc) return this.jsonDoc;

    const doc = this.goDoc;
    let fieldStrs = doc.match(/\w.*(?=,\n)/g);
    fieldStrs = fieldStrs.map(fieldStr => {
      const field = {
        key: "",
        name: "",
        type: "",
      };
      field.key = fieldStr.match(/(?<=`json:").*(?="`)/)[0];
      const nameMatch = fieldStr.match(/(?<=\/\/("|')).*(?=("|'))/);
      // field.name = nameMatch ? nameMatch[0] : "";
      field.name = nameMatch ? nameMatch[0] : fieldStr;
      const typeMatch = fieldStr.match(/(?<="` ).*(?= \/\/)/);
      field.type = typeMatch ? typeMatch[0] : fieldStr;
      return field;
    });

    this.jsonDoc = JSON.stringify(fieldStrs);
    return this.jsonDoc;
  }

  getShowDoc() {
    if (!this.jsonDoc) this.getJSONDoc();
    if (this.showDoc) return this.showDoc;

    // const jsonDoc = JSON.parse(this.jsonDoc);
    // this.showDoc = this.jsonDoc
    return "";
  }
}

export default SQLParser;
