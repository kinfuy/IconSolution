import { RouteDecoratorConfig } from '../../type/route';
import { buildIconLibs, createIconLibs } from '../../controller/build';
const prefix = '/pkg';
const routes: Array<RouteDecoratorConfig> = [
  {
    routerPath: '/build',
    method: 'post',
    controller: buildIconLibs,
  },
  {
    routerPath: '/create',
    method: 'post',
    paramVerify: [
      {
        key: 'name',
        require: true,
        errorMsg: 'name is required',
      },
      {
        key: 'svgs',
        errorMsg: 'svgs is required',
        require: true,
        validator: (value) => {
          return new Promise((resolve, reject) => {
            if (!Array.isArray(value.svgs)) {
              reject('svgs must be a array');
            }
            if (Array.isArray(value.svgs)) {
              value.svgs.forEach((x: string) => {
                if (typeof x != 'string') {
                  reject('svgs must be a string[]');
                }
              });
            }
            resolve(true);
          });
        },
      },
      {
        key: 'version',
        require: true,
        errorMsg: 'version is required',
      },
    ],
    controller: createIconLibs,
  },
];
export const BuildRouter = {
  prefix: prefix,
  routes: routes,
};
