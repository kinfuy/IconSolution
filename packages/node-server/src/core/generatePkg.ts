import path from 'path';
import { readFile, writeFile } from 'fs/promises';
import { emptyDir, mkdir } from 'fs-extra';
import glob from 'fast-glob';
import { format } from 'prettier';
import type { BuiltInParserName } from 'prettier';

export const getSvgFiles = async () => {
  const rootPath = path.resolve(__dirname, './../svg');
  return glob('*.svg', { cwd: rootPath, absolute: true });
};

export const getName = (file: string) => {
  const filename = path.basename(file).replace('.svg', '');
  const componentName = filename;
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
  writeFile(path.resolve(exportPath, `${filename}.vue`), vue, 'utf-8');
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
  await writeFile(path.resolve(exportEntry, './libs/index.ts'), code, 'utf-8');
};

const generateGlobalType = async (files: string[]) => {
  const code = files
    .map((file) => {
      const { componentName } = getName(file);
      return `${componentName}: typeof import('@bairong/uxd-icon')['${componentName}']`;
    })
    .join('\n');
  const globalType = formatCode(`declare module 'vue'{  export interface GlobalComponents {${code}}} export {};`);
  await mkdir(exportLib);
  await writeFile(path.resolve(exportLib, 'global.d.ts'), globalType, 'utf-8');
};

export const buildSvgVue = async () => {
  console.info('generating vue components');
  await emptyDir(exportPath);
  const files = await getSvgFiles();
  console.info('generating vue files');
  await Promise.all(files.map((file) => transformToVueComponent(file)));
  console.info('generating entry file');
  await generateEntry(files);
  console.info('generating global.d.ts');
  await generateGlobalType(files);
  console.info('generating docs config');
};
