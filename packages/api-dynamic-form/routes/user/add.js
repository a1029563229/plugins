import { validateRule } from '@/lib/middleWare';
import { RE_MOBILE } from '@/lib/utils/reg';
import User from '@/models/User';

const rule = {
  source: {
    type: 'enum',
    required: true,
    enum: ['W', 'A', 'C'],
  },
  role: {
    type: 'enum',
    required: true,
    enum: [1, 2],
  },
  nickName: {
    validator: (rule, value, callback, values) => {
      if (values.mobile && !value) return callback();
      if (!value) return callback('nickName 和 mobile 必填其中一项');
      if (value.length > 12) return callback('nickName 最长为 12 位');
      return callback();
    },
  },
  mobile: {
    asyncValidator: async (rule, value, callback, values) => {
      return new Promise(async (resolve, reject) => {
        if (values.nickName && !value) return resolve();
        if (!value) return reject('nickName 和 mobile 必填其中一项');
        if (!RE_MOBILE.test(value)) return reject('手机格式不合格');
        const isExist = await User.exists({ mobile: value });
        if (isExist) return reject(`mobile: ${value} 已存在`);
        resolve();
      });
    },
  },
  openId: {
    asyncValidator: async (rule, value, callback, values) => {
      return new Promise(async (resolve, reject) => {
        if (values.source !== 'W' && !value) return resolve();
        if (values.source !== 'W' && value) return reject('source 不为 W 时，openId 不可填入');
        if (values.source === 'W' && !value) return reject('source 为 W 时，openId 为必填项');
        const isExist = await User.exists({ openId: value });
        if (isExist) return reject(`openId: ${value} 已存在`);
        return resolve();
      });
    },
  },
  avatarUrl: { type: 'string' },
  gender: { type: 'number' },
  language: { type: 'string' },
  country: { type: 'string' },
  province: { type: 'string' },
  city: { type: 'string' },
};
const START_ID = 10000;

async function getUserId() {
  const count = await User.countDocuments();
  return `a${START_ID + count}`;
}

const route = (router) => {
  router.put('/user', validateRule(rule), async (ctx) => {
    const params = ctx.request.body;
    const userId = await getUserId();
    const user = new User({
      ...params,
      userId,
    });
    try {
      const reply = await user.save();
      ctx.body = reply;
    } catch (error) {
      ctx.throw(444, error.message);
    }
  });
};

export default route;
