const gql_query = require('../index');

test('default query', () => {
  expect(gql_query({
    categoryList: ['title', 'description']
  })).toBe('{ categoryList { title description } }');
});

test('multiple query', () => {
  expect(gql_query({
    categoryList: ['title', 'description'],
    productList: ['title', 'price']
  })).toBe('{ categoryList { title description } productList { title price } }');
});

test('params query', () => {
  expect(gql_query({
    categoryList: {
      params: { page: 1, pageSize: 10 },
      query: ['title', 'description']
    }
  })).toBe('{ categoryList ( page: 1, pageSize: 10 ) { title description } }');
});