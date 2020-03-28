import KoaRouter from "koa-router";
import { validateRule } from "@/lib/middleWare";
import axios from "@/lib/axios";
import SQLParser from "./SQLParser";

const rule = {
  name: {
    required: true,
  },
  cn_name: {
    required: true,
  },
  sql: {
    required: true,
  },
  request_url: {
    required: true,
  },
};
const router = new KoaRouter();
router.put("/table", validateRule(rule), async ctx => {
  const params = ctx.request.body;
  const parser = new SQLParser(params.sql);
  let body = {};
  try {
    const goDoc = parser.getGoDoc();
    const jsonDoc = parser.getJSONDoc();
    const showDoc = parser.getShowDoc();
    body = {
      ...params,
      go_doc: goDoc,
      json_doc: jsonDoc,
      show_doc: showDoc,
    };
  } catch (e) {
    console.log(e);
    return ctx.throw(400, "sql 语句有误，请检查格式是否正确");
  }

  const result = await axios.put("/table", body);
  ctx.body = result;
});

export default router.routes();
