import crypto from 'crypto';
import KoaRouter from 'koa-router';

import { validateRule } from '@/lib/middleWare';
import { encryptoByHash } from '@/lib/utils';
import User from '@/models/User';
import Token from '@/models/Token';
import Manager from '@/models/Manager';

const LOGIN_TYPE = {
  OPEN_ID: 1,
  PASSWORD: 2,
};

const loginRule = {
  type: {
    type: 'enum',
    required: true,
    enum: [LOGIN_TYPE.OPEN_ID, LOGIN_TYPE.PASSWORD],
  },
  openId: {
    validator: (rule, value, callback, values) => {
      if (values.type === LOGIN_TYPE.OPEN_ID && !value) return callback('openId 不能为空');
      return callback();
    },
  },
  password: {
    validator: (rule, value, callback, values) => {
      if (values.type === LOGIN_TYPE.PASSWORD) return callback('暂时还不支持其他登录方式');
      return callback();
    },
  },
};

const loginManagementRule = {
  accountNumber: {
    type: 'string',
    required: true,
    min: 9,
    max: 20,
  },
  password: {
    type: 'string',
    required: true,
    min: 6,
    max: 20,
  },
};

function getToken(val) {
  const sha = crypto.createHash('sha512');
  sha.update(`yl@f!2%s${val}:${Date.now()}`);
  return sha.digest('hex');
}

async function saveToken({ token, userId }) {
  const tokenDoc = new Token({
    token,
    userId,
  });
  await tokenDoc.save();
}

const router = new KoaRouter();
router.post('/login', validateRule(loginRule), async (ctx) => {
  const params = ctx.request.body;
  // Login by openId.
  if (params.type === LOGIN_TYPE.OPEN_ID) {
    const { openId } = params;
    const user = await User.findOne({ openId });
    if (!user) ctx.throw(404, 'openId Invalid');
    const { userId } = user;
    const token = getToken(userId);
    try {
      await Token.findOneAndDelete({ userId });
      await saveToken({ token, userId });
      ctx.body = { token };
    } catch (error) {
      ctx.throw(409, error.message);
    }
  }
});

router.post('/auth', async (ctx) => {
  const { headers } = ctx.request;
  const token = headers['x-auth-token'];
  if (!token) ctx.throw(401, 'No Auth Header');

  const tokenDoc = await Token.findOne({ token });
  if (!tokenDoc) ctx.throw(401, 'Auth failed');
  ctx.body = { userId: tokenDoc.userId };
});

router.post('/login/management', validateRule(loginManagementRule), async (ctx) => {
  const { accountNumber, password } = ctx.request.body;
  const manager = await Manager.findOne({ accountNumber });
  if (!manager) ctx.throw(409, '用户不存在');
  const encryptPwd = encryptoByHash(password);
  if (encryptPwd !== manager.password) ctx.throw(400, '密码错误');
  const token = getToken(accountNumber);
  try {
    ctx.body = { token };
  } catch (error) {
    ctx.throw(409, error.message);
  }
});

export default router.routes();
