import url from 'url';
import querystring from 'querystring';
import set from 'lodash/set';

/**
 * 解析 query 参数
 */
function queryParser() {
  return async (ctx, next) => {
    /* eslint-disable */
    if (ctx.request.method !== 'GET') return await next();
    const { url } = ctx.request;
    ctx.request.body = splitQueryToObject(url);
    await next();
  };
}

/**
 * 将 url 转化为对象
 * @param {*} urlStr
 */
function splitQueryToObject(urlStr) {
  const queryStr = url.parse(urlStr).query;
  const queryParams = {};
  if (queryStr) {
    const queryPs = querystring.parse(queryStr);
    // 将数字类型的字段转化为数字类型
    Object.keys(queryPs).map(queryField => set(queryParams, queryField, convertPureNumber(queryPs[queryField])));
  }

  return queryParams;
}

/**
 * 将纯数字的字符串转成数字
 */
function convertPureNumber(str) {
  if (!str) return '';

  const num = parseInt(str);
  if (str == num) {
    return num;
  }
  return str;
}

export default queryParser;
