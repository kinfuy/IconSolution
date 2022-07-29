import { RouteDecoratorConfig } from '../../type/route';
import { createIcon } from '../../controller/icon';
const prefix = '/icon';
const routes: Array<RouteDecoratorConfig> = [
  {
    routerPath: '/create',
    method: 'post',
    controller: createIcon,
    paramVerify: [
      {
        key: 'name',
        errorMsg: 'name is required',
        require: true,
        validator: (value) => {
          return new Promise((resolve, reject) => {
            const reg = /^[^0-9][A-z-]{2,50}$/;
            if (reg.test(value.name)) {
              resolve(true);
            } else {
              reject('name仅支持英文字母和-');
            }
          });
        },
      },
      {
        key: 'path',
        errorMsg: 'path is required',
        require: true,
      },
    ],
  },
];
export const IconRouter = {
  prefix: prefix,
  routes: routes,
};
