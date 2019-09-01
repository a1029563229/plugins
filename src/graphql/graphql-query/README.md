# graphql-query
A formatter-utils for graphql-query

```javascript
const gql_query = require('shadows-graphql-query');
const query = gql_query({
  categoryList: ['_id', 'level', 'title', 'description', 'post'],
  product: ['_id', 'level', 'title', 'description', 'post']
});

console.log(query); 
/**
  { categoryList { _id level title description post }  product { _id level title description post } }
*/
```