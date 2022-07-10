import { RESPONSE_CODE } from '../../libs/enum';
import { RouteDecoratorConfig } from '../../type/route';
const prefix = '/build';
const service: Array<RouteDecoratorConfig> = [
  {
    routerPath: '/pkg',
    method: 'post',
    controller: (ctx) => {
      ctx.body = 'build';
    },
  },
];
export const BuildService = {
  prefix: prefix,
  routes: service,
};
