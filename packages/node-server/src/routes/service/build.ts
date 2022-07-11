import { RESPONSE_CODE } from '../../libs/enum';
import { RouteDecoratorConfig } from '../../type/route';
import { buildIconLibs } from '../../controller/build';
const prefix = '/build';
const service: Array<RouteDecoratorConfig> = [
  {
    routerPath: '/pkg',
    method: 'post',
    controller: buildIconLibs,
  },
];
export const BuildService = {
  prefix: prefix,
  routes: service,
};
