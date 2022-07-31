import { UserService } from "../../database/services";
import { getTemplate, sendQQemail } from "../../utils/email";
import { RESPONSE_CODE } from "../../libs/enum";
import { createRandomCode, md5Crypto } from "../../utils/index";
import type Koa from "koa";

export const register = async (ctx: Koa.Context) => {
  const { email, password, code } = ctx.state.parameter;
  if (
    !ctx.session ||
    !ctx.session.register ||
    ctx.session.register.code !== code ||
    new Date().getTime() - ctx.session.register.createTime > 10 * 60 * 1000 // 10分钟
  ) {
    ctx.body = {
      code: RESPONSE_CODE.ERROR_VERIFY_CODE,
      message: "验证码错误或已经过期",
    };
    return;
  }

  const userController = new UserService();

  const user = await userController.find({ where: { email } });
  if (user.length > 0) {
    ctx.body = {
      code: RESPONSE_CODE.ERROR_FAIL,
      message: "邮箱已被注册",
    };
    return;
  }

  try {
    await userController.save({
      name: "跳舞的小羊",
      email,
      password: md5Crypto(password),
      avator: "/user/logo.png",
    });
    ctx.body = {
      code: RESPONSE_CODE.SUCCESS,
      message: "注册成功",
    };
  } catch (error) {
    ctx.body = {
      code: RESPONSE_CODE.ERROR_SYSTEM,
      message: error,
    };
  }
};

export const login = async (ctx: Koa.Context) => {
  const { email, password } = ctx.state.parameter;
  const userController = new UserService();
  const user = await userController.find({
    select: ["id", "email", "name", "avator"],
    where: { email, password: md5Crypto(password) },
  });
  if (user.length > 0) {
    if (ctx.session) {
      ctx.session.userinfo = user[0];
    }
    ctx.body = {
      code: RESPONSE_CODE.SUCCESS,
      message: "登录成功",
      data: user[0],
    };
  } else {
    ctx.body = {
      code: RESPONSE_CODE.ERROR_FAIL,
      message: "用户不存在",
    };
  }
};

export const getCaptcha = async (ctx: Koa.Context) => {
  const { email, password } = ctx.state.parameter;
  const code = createRandomCode(6);
  const options = getTemplate({
    to: email,
    msg: code,
  });
  if (ctx.session)
    ctx.session.register = {
      code,
      email,
      password: md5Crypto(password),
      createTime: new Date().getTime(),
    };

  sendQQemail(options);

  ctx.body = {
    code: RESPONSE_CODE.SUCCESS,
    message: "验证码发送成功",
  };
};
