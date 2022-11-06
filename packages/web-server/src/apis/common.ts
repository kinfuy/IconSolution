import request from './config';
//🌸定义ResponseOption的规则，里面定义的规则在使用的时候必须有
export interface ResponseOption {
  code: string;
  message: string;
  data: string | number | object | Array<any>;
}
//🌸data?代表data可传可不传，any是任意类型
export const buildGenerateApi = (data?: any): Promise<ResponseOption> => {
  return request.post('/pkg/build', data);
};

export const createGenerateApi = (data?: any): Promise<ResponseOption> => {
  return request.post('/pkg/create', data);
};

// 请求验证码
export const reqGetCode = (data?: any): Promise<ResponseOption> => {
  return request.post('/captcha', data);
};
// 请求注册
export const reqGetSignIn = (data?: any): Promise<ResponseOption> => {
  return request.post('/register', data);
};

export const createIconApi = (data?: any): Promise<ResponseOption> => {
  return request.post('/icon/create', data);
};
