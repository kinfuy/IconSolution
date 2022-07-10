import { RESPONSE_CODE } from '../../libs/enum';
import { RouteDecoratorConfig } from '../../type/route';
const prefix = '/';
const service: Array<RouteDecoratorConfig> = [
  {
    routerPath: '/login',
    method: 'post',
    controller: (ctx) => {
      ctx.body = 'build';
    },
  },
];
export const BaseService = {
  prefix: prefix,
  routes: service,
};
