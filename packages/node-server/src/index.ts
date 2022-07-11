import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import cors from 'koa2-cors';
import { port, host } from './../config/index';
import KoaError from './middleware/error';
import Router from './routes';
import Session from 'koa-session';
import { dbStart } from './database';
const app = new Koa();
// 错误处理
app.use(KoaError);
// 跨域
app.use(cors());

dbStart();

//设置session
app.keys = ['icon-solution'];
const CONFIG = {
  key: 'icon-solution',
  maxAge: 86400000,
};
app.use(Session(CONFIG, app));
// 挂载公共静态资源
app.use(koaStatic(__dirname + '../public'));
// 解析body
app.use(bodyParser());
// 路由挂载
const router = new Router(app);
router.registerRouters();

app.on('error', (err) => {
  console.error('server error', err);
});
app.listen({ port, host: host }, () => {
  console.log(`serve live at ${host}:${port}`);
});
