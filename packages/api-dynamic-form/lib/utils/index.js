import crypto from 'crypto';

import { HTTPError } from './error';
import validate from './validate';
import Pagination from './pagination';

export const noop = () => { };

export const getNow = () => {
  const timezone = 16; // 目标时区时间，东八区
  const offsetGMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
  const nowDate = new Date().getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
  const targetDate = new Date(nowDate + offsetGMT * 60 * 1000 + timezone * 60 * 60 * 1000);
  return targetDate;
};

export const encryptoByHash = (message) => {
  const sha = crypto.createHash('sha512');
  sha.update(message);
  return sha.digest('hex');
};

export const getRandom = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

export const getRandomItem = (list) => {
  const len = list.length;
  const i = getRandom(0, len);
  return list[i];
};

export { validate, HTTPError, Pagination };
