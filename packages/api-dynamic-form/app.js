import Koa from "koa";
import KoaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";

import { queryParser } from "@/lib/middleWare";
import { tableRoutes } from "./routes";

const app = new Koa();
const router = new KoaRouter();

router.get("/", (ctx) => {
  ctx.body = "Micro Service Member!!!!!";
});

app.use(cors());
app.use(queryParser());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(tableRoutes).use(router.allowedMethods());

module.exports = app;
