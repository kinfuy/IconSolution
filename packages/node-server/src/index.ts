import Koa from 'koa';
const app = new Koa();
import { join } from 'path';
import staticFiles from 'koa-static';

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './public';

app.use(staticFiles(join(__dirname, staticPath)));

app.use(async ctx => {
  ctx.body = 'Hello World';
});
app.listen(3000);
