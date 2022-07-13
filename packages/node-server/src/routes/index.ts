import Koa from 'koa';
import koaRouter from 'koa-router';
import { Verify } from './../middleware/verify';
import { BaseRouter, BuildRouter } from './route';
import { pretreatment } from './../middleware/preRouter';
import { Auth } from '../middleware/auth';
const router = new koaRouter();
const routers = [BaseRouter, BuildRouter];

class Router {
  private router: koaRouter<any, {}>;
  private app: Koa;
  constructor(app: Koa) {
    this.app = app;
    this.router = router;
  }
  /**
   * 注册路由
   * @param opt
   */
  registerRouters(opt?: any) {
    routers.forEach((route) => {
      const childRouter = new koaRouter();
      route.routes.forEach((x) => {
        if (x.paramVerify) {
          x.middleWare ? x.middleWare.unshift(Verify) : (x.middleWare = [Verify]);
        }
        if (x.authCode) {
          x.middleWare ? x.middleWare.unshift(Auth) : (x.middleWare = [Auth]);
        }
        x.middleWare
          ? childRouter[x.method](x.routerPath, pretreatment(x), ...x.middleWare, x.controller)
          : childRouter[x.method](x.routerPath, pretreatment(x), x.controller);
      });
      // 挂载子路由
      this.router.use(route.prefix, childRouter.routes()).use(childRouter.allowedMethods());
    });
    //  挂载路由
    this.app.use(this.router.routes()).use(this.router.allowedMethods());
  }
}
export default Router;
