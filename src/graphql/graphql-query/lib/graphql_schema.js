const PURE_TYPE = [String, Number];

function getSchemaFieldsSet(schemaFields) {
  if (Array.isArray(schemaFields)) {
    return schemaFields.join(" ");
  }

  return getSchemaFieldsSetFromObject(schemaFields);
}

function getSchemaFieldsSetFromObject(schemaFieldsObj) {
  const schemaSet = [];
  for (let key in schemaFieldsObj) {
    const fieldTypeOrFields = schemaFieldsObj[key];
    if (PURE_TYPE.includes(fieldTypeOrFields)) {
      schemaSet.push(key);
    } else {
      schemaSet.push(`${key} { ${getSchemaFieldsSet(fieldTypeOrFields)} }`)
    }
  }

  return schemaSet.join(' ');
}

function getSchemaQuerySet(params) {
  if (!params) return "";
  return getParamsSchema(params);
}

function getParamsSchema(params) {
  let paramStr = ' ( ';
  for (let key in params) {
    const pureValue = params[key];
    if (!pureValue) continue;
    const value = typeof pureValue === "string" ? `\"${pureValue}\"` : pureValue;
    paramStr += `${key}: ${value}, `
  }
  paramStr = paramStr.slice(0, paramStr.length - 2);
  paramStr += ' )';
  return paramStr;
}

class GQLSchema {
  static toSchema(gqlSchemas) {
    const schemaStr = `{ ${gqlSchemas.map(gqlSchema => gqlSchema.format()).join('\n')} }`;
    return schemaStr;
  }

  constructor(schema) {
    this.schema = schema;
  }

  format() {
    const { schema } = this;
    const schemaKeys = Object.keys(schema);
    // 序列化查询字符串
    const schemaStr = schemaKeys.reduce((schemaSet, schemaKey) => `${schemaSet} ${schemaKey}${getSchemaQuerySet(schema[schemaKey].params)} { ${getSchemaFieldsSet(schema[schemaKey].query || schema[schemaKey])} }`, '').trimLeft();
    return schemaStr;
  }
}

module.exports = GQLSchema;