import { getNow } from '@/lib/utils';

function withCreatedTime() {
  return async (ctx, next) => {
    const { body } = ctx.request;
    if (!body) {
      ctx.request.body = {};
    }
    ctx.request.body.createdTime = getNow();
    await next();
  };
}

function withUpdatedTime() {
  return async (ctx, next) => {
    const { body } = ctx.request;
    if (!body) {
      ctx.request.body = {};
    }
    ctx.request.body.updatedTime = getNow();
    await next();
  };
}

export { withCreatedTime, withUpdatedTime };
