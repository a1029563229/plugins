const PURE_TYPE = [ String, Number ];

function getSchemaFieldsSet(schemaFields) {
  if (Array.isArray(schemaFields)) {
    return schemaFields.join(" ");
  }

  return getSchemaFieldsSetFromObject(schemaFields);
}

function getSchemaFieldsSetFromObject(schemaFieldsObj) {
  const schemaSet = [];
  for (let key in schemaFieldsObj) {
    const fieldType = schemaFieldsObj[key];
    if (PURE_TYPE.includes(fieldType)) {
      schemaSet.push(key);
    } else {
      schemaSet.push(`${key} { ${getSchemaFieldsSet(fieldType)} }`)
    }
  }

  return schemaSet.join(' ');
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
    const schemaStr = schemaKeys.reduce((schemaSet, schemaKey) => `${schemaSet}
      ${schemaKey} { ${getSchemaFieldsSet(schema[schemaKey])} }`, '').trimLeft();
    return schemaStr;
  }
}

module.exports = GQLSchema;