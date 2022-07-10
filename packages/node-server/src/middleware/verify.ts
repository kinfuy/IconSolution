import Koa from 'koa';
import { RouterConfig } from '../type/route';
import { typeOf } from '../utils/index';
import { GeneralError } from './error';
import { RESPONSE_CODE } from '../libs/enum';
/**
 * 参数校验中间件
 */
export const Verify = async (ctx: Koa.Context, next: Koa.Next) => {
  const { paramVerify } = ctx.state.routerConfig as RouterConfig;
  let parameter: any | undefined = undefined;
  if (ctx.method === 'GET' || ctx.method === 'get') {
    parameter = ctx.request.query;
  }
  if (ctx.method === 'POST' || ctx.method === 'post') {
    parameter = ctx.request.body;
  }
  // 先校验空
  paramVerify.forEach((x) => {
    if (x.require && !parameter[x.key]) {
      throw new GeneralError(RESPONSE_CODE.ERROR_MISSING_PARAM, x.errorMsg);
    }
  });
  // 后校验自定义验证规则
  paramVerify.forEach((x) => {
    if (x.validator && typeOf(x.validator) === 'function') {
      x.validator(parameter, (errorMsg?: string) => {
        if (errorMsg) throw new GeneralError(RESPONSE_CODE.ERROR_PARAM, errorMsg);
      });
    }
  });
  await next().catch((err) => {
    throw new GeneralError(err.errCode || err.code, err.errMsg || err.message);
  });
};
