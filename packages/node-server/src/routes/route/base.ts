import { login, register } from "../../controller/user";
import type { RouteDecoratorConfig } from "../../type/route";
const prefix = "/";
const routes: Array<RouteDecoratorConfig> = [
  {
    routerPath: "/login",
    method: "post",
    controller: login,
    paramVerify: [
      {
        require: true,
        key: "username",
        errorMsg: "username is required",
      },
      {
        key: "password",
        require: true,
        errorMsg: "password is reqiured",
      },
    ],
  },
  {
    routerPath: "/register",
    method: "post",
    controller: register,
    paramVerify: [
      {
        require: true,
        key: "username",
        errorMsg: "username is required",
      },
      {
        key: "password",
        require: true,
        errorMsg: "password is reqiured",
      },
      {
        key: "code",
        require: true,
        errorMsg: "code is reqiured",
      },
    ],
  },
];
export const BaseRouter = {
  prefix,
  routes,
};
