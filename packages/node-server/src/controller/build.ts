import Koa from 'koa';
import glob from 'fast-glob';
import { emptyDir, mkdir, readFile, writeFile } from 'fs-extra';
import { format } from 'prettier';
import type { BuiltInParserName } from 'prettier';
import { rootPath, svgLibPath, outputPath } from '../../config/path';
import { basename, resolve } from 'path';
import { RESPONSE_CODE } from '../libs/enum';
import * as changeCase from 'change-case';
const getSvgFiles = () => {
  return glob('*.svg', { cwd: svgLibPath, absolute: true });
};
export const getName = (file: string) => {
  const filename = basename(file).replace('.svg', '');
  const componentName = changeCase.pascalCase(filename);
  return {
    filename,
    componentName,
  };
};
const formatCode = (code: string, parser: BuiltInParserName = 'typescript') =>
  format(code, {
    parser,
    semi: false,
    singleQuote: true,
  });
const transformToVueComponent = async (file: string) => {
  const content = await readFile(file, 'utf-8');
  const { filename, componentName } = getName(file);
  const vue = formatCode(
    `
<template>
${content}
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: "${componentName}",
  })
</script>`,
    'vue'
  );
  await mkdir(`${outputPath}/libs`).catch(() => {});
  writeFile(resolve(`${outputPath}/libs`, `${filename}.vue`), vue, 'utf-8');
};
const generateEntry = async (files: string[]) => {
  const code = formatCode(
    files
      .map((file) => {
        const { filename, componentName } = getName(file);
        return `export { default as ${componentName} } from './${filename}.vue'`;
      })
      .join('\n')
  );
  await writeFile(resolve(outputPath, 'libs/index.ts'), code, 'utf-8').catch((err) => {});
};

const generateGlobalType = async (files: string[]) => {
  const code = files
    .map((file) => {
      const { componentName } = getName(file);
      return `${componentName}: typeof import('')['${componentName}']`;
    })
    .join('\n');
  const globalType = formatCode(`declare module 'vue'{  export interface GlobalComponents {${code}}} export {};`);
  await mkdir(outputPath).catch(() => {});
  await writeFile(resolve(outputPath, 'global.d.ts'), globalType, 'utf-8');
};
export const buildIconLibs = async (ctx: Koa.Context) => {
  ctx.body = {
    code: RESPONSE_CODE.SUCCESS,
    message: '打包成功',
  };
  await emptyDir(outputPath);
  const files = await getSvgFiles();
  await Promise.all(files.map((file) => transformToVueComponent(file)));
  await generateEntry(files);
  await generateGlobalType(files);
};
