import KoaRouter from 'koa-router';

import add from './add';
import query from './query';

const router = new KoaRouter();
add(router);
query(router);

export default router.routes();
