import Koa from 'koa';
import { RouteDecoratorConfig } from '../type/route';
import { GeneralError } from './error';
/**
 * 路由预处理 挂载authCode paramVerify(参数校验规则)
 * @param routerConfig 路由配置
 * @returns
 */
export const pretreatment = (routerConfig: RouteDecoratorConfig) => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.state.routerConfig = {
      paramVerify: routerConfig.paramVerify ? routerConfig.paramVerify : [],
      authCode: routerConfig.authCode || [],
    };
    await next().catch((err) => {
      throw new GeneralError(err.errCode || err.code, err.errMsg || err.message);
    });
  };
};
