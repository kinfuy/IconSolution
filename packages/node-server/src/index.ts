import { join, resolve } from "path";
import Koa from "koa";
import koaBody from "koa-body";
import koaStatic from "koa-static";
import cors from "koa2-cors";
import Session from "koa-session";
import { host, port } from "./../config/index";
import KoaError from "./middleware/error";
import Router from "./routes";
import { dbStart } from "./database";
const app = new Koa();
// 错误处理
app.use(KoaError);
// 跨域
app.use(cors());

dbStart();

//设置session
app.keys = ["icon-solution"];
const CONFIG = {
  key: "icon-solution",
  maxAge: 86400000,
};
app.use(Session(CONFIG, app));
// 挂载公共静态资源
app.use(koaStatic(`${__dirname}../public`));
// 解析body
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: join(__dirname, "../source"),
      keepExtensions: true,
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => {
        // 文件上传前的设置
        console.log(`name: ${name}`);
        console.log(file);
      },
    },
  })
);
// 路由挂载
const router = new Router(app);
router.registerRouters();

app.on("error", (err) => {
  console.error("server error", err);
});
app.listen({ port, host }, () => {
  console.log(`serve live at ${host}:${port}`);
});
