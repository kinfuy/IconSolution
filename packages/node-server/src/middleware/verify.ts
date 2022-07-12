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
  if (['GET', 'get'].includes(ctx.method)) {
    parameter = ctx.request.query;
  }
  if (['POST', 'post'].includes(ctx.method)) {
    parameter = ctx.request.body;
  }
  // 先校验空
  paramVerify.forEach((x) => {
    if (x.require && !parameter[x.key]) {
      throw new GeneralError(RESPONSE_CODE.ERROR_MISSING_PARAM, x.errorMsg);
    }
  });
  // 后校验自定义验证规则
  for (const verify of paramVerify) {
    if (verify.validator && typeOf(verify.validator) === 'function') {
      await verify.validator(parameter).catch((err) => {
        throw new GeneralError(RESPONSE_CODE.ERROR_PARAM, err);
      });
    }
  }
  ctx.state.parameter = parameter;
  await next().catch((err) => {
    throw new GeneralError(err.errCode || err.code, err.errMsg || err.message);
  });
};
