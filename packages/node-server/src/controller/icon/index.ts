import { IconService } from "../../database/services";
import { RESPONSE_CODE } from "../../libs/enum";
import type Koa from "koa";

export const createIcon = async (ctx: Koa.Context) => {
  const iconServe = new IconService();
  const { name, description, keywords, path } = ctx.state.parameter;
  const find = await iconServe.find({ where: { name } });
  if (find.length > 0) {
    ctx.body = {
      code: RESPONSE_CODE.ERROR_FAIL,
      message: "该icon name已存在",
    };
    return;
  }
  try {
    await iconServe.save({
      name,
      path,
      description,
      keywords,
    });
    ctx.body = {
      code: RESPONSE_CODE.SUCCESS,
      message: "成功",
    };
  } catch (error) {
    console.log("log=>index=>28:error:%o", error);
    ctx.body = {
      code: RESPONSE_CODE.ERROR_FAIL,
      message: "失败",
    };
  }
};
