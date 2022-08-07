import { getCaptcha, login, register } from "../../controller/user";
import { uploadfile } from "../../controller/source";
import type { RouteDecoratorConfig } from "../../type/route";
const prefix = "";
const routes: Array<RouteDecoratorConfig> = [
  {
    routerPath: "/captcha",
    method: "post",
    controller: getCaptcha,
    paramVerify: [
      {
        key: "email",
        require: true,
        errorMsg: "email is reqiured",
        validator: (value) => {
          const { email } = value;
          return new Promise((resolve, reject) => {
            const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (reg.test(email)) {
              resolve(true);
            } else {
              reject("邮箱格式不正确");
            }
          });
        },
      },
      {
        key: "password",
        require: true,
        errorMsg: "password is reqiured",
        validator(value) {
          const { password } = value;
          return new Promise((resolve, reject) => {
            if (password.length > 12 || password.length < 6) {
              reject("密码需在6-12位");
            } else {
              resolve(true);
            }
          });
        },
      },
    ],
  },
  {
    routerPath: "/login",
    method: "post",
    controller: login,
    paramVerify: [
      {
        require: true,
        key: "email",
        errorMsg: "email is required",
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
        key: "email",
        errorMsg: "email is required",
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
  {
    routerPath: "/uploadfile",
    method: "post",
    controller: uploadfile,
  },
];
export const BaseRouter = {
  prefix,
  routes,
};
