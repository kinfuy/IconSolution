import type Koa from "koa";

/**
 * 通用业务错误
 */
export class GeneralError extends Error {
  errCode = "";
  errMsg = "";
  constructor(errCode: string, errMsg: string) {
    super();
    this.errCode = errCode;
    this.errMsg = errMsg;
  }
}
/**
 * 错误捕获
 */
export default async (ctx: Koa.Context, next: Koa.Next) => {
  console.log("有请求来了");
  try {
    await next();
  } catch (err: any) {
    if (err instanceof GeneralError) {
      ctx.status = 200;
      ctx.body = {
        code: err.errCode,
        message: err.errMsg || err.message,
      };
    } else {
      ctx.status = err.status || 500;
      ctx.body = err.message || "系统错误！";
    }
  }
};
