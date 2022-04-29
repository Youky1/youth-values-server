const Koa = require("koa");
const createRouter = require("./router");

// 中间件引入
const Cors = require("koa-cors");
const Body = require("koa-body");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

// 使用中间件
app
  .use(Cors())
  .use(Body({ strict: false }))
  .use(router.routes());

// 注册路由
createRouter(router);

const port = 8000;
app.listen(port);
console.log(`Running in http://localhost:${port}`);
