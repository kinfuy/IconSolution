import Koa from 'koa';
import { RouterConfig } from '../type/route';
import { GeneralError } from './error';
import { RESPONSE_CODE } from '../libs/enum';
/**
 * 权限校验中间件
 */
export const Auth = async (ctx: Koa.Context, next: Koa.Next) => {
  const { authCode } = ctx.state.routerConfig as RouterConfig;
  if (authCode) {
    throw new GeneralError(RESPONSE_CODE.ERROR_AUTH, '权限验证失败！');
  }
  await next().catch((err) => {
    throw new GeneralError(err.errCode || err.code, err.errMsg || err.message);
  });
};
