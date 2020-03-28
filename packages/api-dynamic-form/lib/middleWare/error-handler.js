const errorHandler = () => async (ctx, next) => {
  try {
    await next();
  } catch(e) {
    ctx.throw(412, e.message);
  }
}

export default errorHandler;