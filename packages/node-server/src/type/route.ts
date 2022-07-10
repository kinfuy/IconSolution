import Koa from 'koa';
export type RequestMethods = 'get' | 'post' | 'put' | 'delete';
export type DataType = 'number' | 'string' | 'boolean' | 'date' | 'object' | 'array' | 'function' | 'regExp' | 'undefined' | 'null';
export interface RuleItem {
  key: string;
  require?: boolean;
  /**
   * 自定义验证规则
   * @param 请求参数
   * @param callback 回调函数
   */
  validator?: (value: any, callback: Function) => void;
  errorMsg: string;
}
export interface RouteDecoratorConfig {
  method: RequestMethods;
  routerPath: string;
  controller: (ctx: Koa.Context) => void;
  middleWare?: Array<Koa.Middleware>;
  authCode?: Array<string>;
  paramVerify?: Array<RuleItem>;
}
export interface RouterConfig {
  authCode: Array<string>;
  paramVerify: Array<RuleItem>;
}
