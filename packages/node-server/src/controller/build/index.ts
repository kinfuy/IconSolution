import { emptyDir } from 'fs-extra';
import Koa from 'koa';
import { outputPath, svgLibPath, outputComponentSPath } from '../../../config/path';
import { RESPONSE_CODE } from '../../libs/enum';
import { generateEntry, generateGlobalType, getSvgFiles, transformToVueComponent } from './build';
import { IconPkgService } from '../../database/services/iconPkg';
import { iconPkg } from '../../database/entity/iconPkg';

export const buildIconLibs = async (ctx: Koa.Context) => {
  ctx.body = {
    code: RESPONSE_CODE.SUCCESS,
    message: '打包成功',
  };
  await emptyDir(outputPath);
  const files = await getSvgFiles(svgLibPath);
  await Promise.all(files.map((file) => transformToVueComponent(file, outputComponentSPath)));
  await generateEntry(files, outputPath);
  await generateGlobalType(files, outputPath);
};

export const createIconLibs = async (ctx: Koa.Context) => {
  const { name, version } = ctx.state.parameter;
  const iconServe = new IconPkgService();
  const find = await iconServe.find();
  console.log('log=>index=>25:find:%o', find);
  ctx.body = {
    code: RESPONSE_CODE.SUCCESS,
    message: '打包成功',
  };
};
