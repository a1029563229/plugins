import { validate } from '../utils';

function validateRule(rule) {
  return async (ctx, next) => {
    const params = ctx.request.body;
    const { error } = await validate(rule, params);
    if (error) return ctx.throw(400, error);
    await next();
  };
}

export default validateRule;
