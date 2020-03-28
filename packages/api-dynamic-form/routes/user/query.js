import { validateRule } from '@/lib/middleWare';
import { Pagination } from '@/lib/utils';
import User from '@/models/User';

const rule = {
  userId: {
    type: 'string',
    required: true,
  },
};

const route = (router) => {
  router.get('/user', validateRule(rule), async (ctx) => {
    const { userId } = ctx.request.body;
    const user = await User.findOne({ userId });
    if (!user) ctx.throw(404, 'user is not exists.');
    ctx.body = user;
  });

  router.get('/user/list', async (ctx) => {
    const params = ctx.request.body;
    const pagination = new Pagination(User, params);
    const reply = await pagination.query(ctx, params);
    ctx.body = reply;
  });
};

export default route;
