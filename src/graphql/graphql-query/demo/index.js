const gql_query = require('../index');

const query = gql_query({
  categoryList: ['_id', 'level', 'title', 'description', 'post'],
  product: ['_id', 'level', 'title', 'description', 'post']
});

console.log(query); // output ↓
/**
  { categoryList { _id level title description post }  product { _id level title description post } }
*/