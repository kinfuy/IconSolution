import { emptyDir } from 'fs-extra';
import Koa from 'koa';
import { outputPath, svgLibPath, outputComponentSPath } from '../../../../config/path';
import { RESPONSE_CODE } from '../../../libs/enum';
import { generateEntry, generateGlobalType, getSvgFiles, transformToVueComponent } from './build';
import { AppDataSource } from '../../index';
import { iconPkg } from '../../entity';

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
  const pkg = new iconPkg();
  pkg.createTime = new Date();
  pkg.author = 'test';
  pkg.description = 'test lib';
  pkg.frame = 'vue';
  pkg.gitPath = 'test.git';
  pkg.gitToken = 'sadasdasfasf';
  pkg.keywords = 'icon,svg';
  pkg.license = 'MIT';
  pkg.name = name;
  pkg.version = version;
  console.log('log=>index=>34:pkg:%o', pkg);
  await AppDataSource.manager.save(pkg);
  ctx.body = {
    code: RESPONSE_CODE.SUCCESS,
    message: '打包成功',
  };
};
