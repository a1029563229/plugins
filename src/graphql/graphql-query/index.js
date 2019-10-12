const GQLSchema = require('./lib/graphql_schema');

const gql_query = schema => {
  const gqlSchemas = [new GQLSchema(schema)];
  const queryStr = GQLSchema.toSchema(gqlSchemas);
  return queryStr;
}

module.exports = gql_query;