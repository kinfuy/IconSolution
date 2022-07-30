import { UserService } from "../../database/services";
import { RESPONSE_CODE } from "../../libs/enum";
import type Koa from "koa";

export const register = async (ctx: Koa.Context) => {
  const { username, password } = ctx.state.parameter;
  console.log("log=>index=>7:user:%o", ctx.state.parameter);
  const userController = new UserService();
  userController.create({ username, password }).then(() => {
    ctx.body = {
      code: RESPONSE_CODE.SUCCESS,
      message: "注册成功",
    };
  });
};

export const login = async (ctx: Koa.Context) => {
  const user = ctx.state.parameter;
  console.log("log=>index=>7:user:%o", user);
  const userController = new UserService();
  userController.create(user).then(() => {
    ctx.body = {
      code: RESPONSE_CODE.SUCCESS,
      message: "注册成功",
    };
  });
};
