# graphql-query
A formatter-utils for graphql-query

```javascript
const gql_query = require('shadows-graphql-query');

// simple query
const queryStr = gql_query({
  categoryList: ['title', 'description']
});
/**
  { categoryList { title description } }
*/

// multiple query
const queryStr = gql_query({
  categoryList: ['title', 'description'],
  productList: ['title', 'price']
});
/**
  { categoryList { title description } productList { title price } }
*/

// params query
const queryStr = gql_query({
  categoryList: {
    params: { page: 1, pageSize: 10 },
    query: ['title', 'description']
  }
});
/**
  { categoryList ( page: 1, pageSize: 10 ) { title description } }
*/

```