import { resolve } from 'path';
export const rootPath = resolve(__dirname, '..');
export const svgLibPath = resolve(rootPath, 'svg');
export const outputPath = resolve(rootPath, 'version');
export const outputComponentSPath = resolve(outputPath, 'libs');
