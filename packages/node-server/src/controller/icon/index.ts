import Koa from 'koa';
import { IconService } from '../../database/services';
import { RESPONSE_CODE } from '../../libs/enum';

export const createIcon = async (ctx: Koa.Context) => {
  const iconServe = new IconService();
  const find = await iconServe.find();
  ctx.body = {
    code: RESPONSE_CODE.SUCCESS,
    message: '打包成功',
  };
};
