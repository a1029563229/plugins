import Shop from '@/models/Shop';
import User, { ROLES } from '@/models/User';
import { validateRule } from '@/lib/middleWare';

const rule = {
  name: {
    type: 'string',
    required: true,
    min: 1,
    max: 10,
  },
  userId: {
    type: 'string',
    required: true,
  },
  logo: {
    type: 'string',
  },
  description: {
    type: 'string',
    max: 200,
  },
};

const route = (router) => {
  router.put('/shop', validateRule(rule), async (ctx) => {
    const params = ctx.request.body;
    const { userId } = params;
    const shop = new Shop(params);
    try {
      const reply = await shop.save();
      await User.updateOne({ userId }, { $set: { role: ROLES.STORE_MANAGER, shopId: reply._id } });
      ctx.body = reply;
    } catch (err) {
      ctx.throw(409, err);
    }
  });
};

export default route;
