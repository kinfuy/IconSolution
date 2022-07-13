import { RouteDecoratorConfig } from '../../type/route';
const prefix = '/';
const routes: Array<RouteDecoratorConfig> = [
  {
    routerPath: '/login',
    method: 'post',
    controller: (ctx) => {
      ctx.body = 'build';
    },
  },
];
export const BaseRouter = {
  prefix: prefix,
  routes: routes,
};
