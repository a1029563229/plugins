import omit from 'lodash/omit';

class Pagination {
  Schema = null;

  page = 1;

  pageSize = 10;

  constructor(Schema, params = { page: 1, pageSize }) {
    this.Schema = Schema;
    this.set(params.page, params.pageSize);
  }

  set(page = 1, pageSize = 10) {
    this.page = page;
    this.pageSize = pageSize;
  }

  async getCount(schema) {
    const count = await this.Schema.countDocuments(schema);
    return count;
  }

  async query(ctx, theSchema = {}, sorter = {}) {
    const { page, pageSize } = this;
    const schema = omit(theSchema, ['page', 'pageSize']);
    const start = (page - 1) * pageSize;
    const totalCount = await this.getCount(schema);
    const reply = await this.Schema.find(schema).sort(sorter).skip(start).limit(pageSize);
    ctx.set({
      'x-pagination-page': page,
      'x-pagination-pageSize': pageSize,
      'x-pagination-total': totalCount,
    });
    return reply;
  }
}

export default Pagination;
