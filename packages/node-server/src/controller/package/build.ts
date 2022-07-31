import { basename, resolve } from "path";
import glob from "fast-glob";
import { mkdir, readFile, writeFile } from "fs-extra";
import { format } from "prettier";
import * as changeCase from "change-case";
import type { BuiltInParserName } from "prettier";
export const getSvgFiles = (path: string) => {
  return glob("*.svg", { cwd: path, absolute: true });
};
export const getName = (file: string) => {
  const filename = basename(file).replace(".svg", "");
  const componentName = changeCase.pascalCase(filename);
  return {
    filename,
    componentName,
  };
};
export const formatCode = (
  code: string,
  parser: BuiltInParserName = "typescript"
) =>
  format(code, {
    parser,
    semi: false,

    singleQuote: true,
  });
export const transformToVueComponent = async (
  file: string,
  outputLibPath: string
) => {
  const content = await readFile(file, "utf-8");
  const { filename, componentName } = getName(file);
  const vue = formatCode(
    `<template>${content}</template><script lang="ts">import { defineComponent } from 'vue' export default defineComponent({ name: "${componentName}"}) </script>`,

    "vue"
  );
  await mkdir(outputLibPath).catch(() => {});
  writeFile(resolve(outputLibPath, `${filename}.vue`), vue, "utf-8");
};
export const generateEntry = async (files: string[], outputPath: string) => {
  const code = formatCode(
    files
      .map((file) => {
        const { filename, componentName } = getName(file);
        return `export { default as ${componentName} } from './${filename}.vue'`;
      })
      .join("\n")
  );
  await writeFile(resolve(outputPath, "libs/index.ts"), code, "utf-8").catch(
    (err) => {}
  );
};

export const generateGlobalType = async (
  files: string[],
  outputPath: string
) => {
  const code = files
    .map((file) => {
      const { componentName } = getName(file);
      return `${componentName}: typeof import('')['${componentName}']`;
    })
    .join("\n");
  const globalType = formatCode(
    `declare module 'vue'{  export interface GlobalComponents {${code}}} export {};`
  );
  await mkdir(outputPath).catch(() => {});
  await writeFile(resolve(outputPath, "global.d.ts"), globalType, "utf-8");
};
