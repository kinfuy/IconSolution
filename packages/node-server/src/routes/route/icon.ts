import { resolve } from "path";
import { createIcon } from "../../controller/icon";
import type { RouteDecoratorConfig } from "../../type/route";

const prefix = "/icon";
const routes: Array<RouteDecoratorConfig> = [
  {
    routerPath: "/create",
    method: "post",
    controller: createIcon,
    paramVerify: [
      {
        key: "name",
        errorMsg: "name is required",
        require: true,
        validator: (value) => {
          return new Promise((resolve, reject) => {
            const reg = /^[^0-9][A-z-]{2,50}$/;
            if (reg.test(value.name)) {
              resolve(true);
            } else {
              reject("name仅支持英文字母和-");
            }
          });
        },
      },
      {
        key: "path",
        errorMsg: "path is required",
        require: true,
      },
      {
        key: "description",
        errorMsg: "description is required",
        require: true,
      },
      {
        key: "keywords",
        errorMsg: "keywords is required",
        require: true,
        validator: (value) => {
          return new Promise((resolve, reject) => {
            if (typeof value.keywords === "string") {
              resolve(true);
            } else {
              reject("keywords is string");
            }
          });
        },
      },
    ],
  },
];
export const IconRouter = {
  prefix,
  routes,
};
