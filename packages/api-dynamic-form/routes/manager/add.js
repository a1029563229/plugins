import Manager, { ROLES } from '@/models/Manager';
import { validateRule } from '@/lib/middleWare';
import { encryptoByHash } from '@/lib/utils';

const rule = {
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
  role: {
    type: 'enum',
    required: true,
    enum: Object.values(ROLES),
  },
};

const route = (router) => {
  router.put('/manager', validateRule(rule), async (ctx) => {
    const params = ctx.request.body;
    const { password } = params;
    const encryptoPwd = encryptoByHash(password);
    const manager = new Manager({
      ...params,
      password: encryptoPwd,
    });
    try {
      const reply = await manager.save();
      ctx.body = reply;
    } catch (err) {
      ctx.throw(409, err);
    }
  });
};

export default route;
