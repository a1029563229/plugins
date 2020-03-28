import KoaRouter from 'koa-router';

import add from './add';

const router = new KoaRouter();
add(router);

export default router.routes();
