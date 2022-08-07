import request from './config';
//🌸定义ResponseOption的规则，里面定义的规则在使用的时候必须有
export interface ResponseOption {
  code: string;
  message: string;
  data: any;
}
// 807🔥定义上传文件请求头
const defaultFileHeader = {
  headers: {
    'Content-Type': 'multipart/form-data' //类型
  }
};
//🌸data?代表data可传可不传，any是任意类型
export const buildGenerateApi = (data?: any): Promise<ResponseOption> => {
  return request.post('/pkg/build', data);
};

export const createGenerateApi = (data?: any): Promise<ResponseOption> => {
  return request.post('/pkg/create', data);
};

export const createIconApi = (data?: any): Promise<ResponseOption> => {
  return request.post('/icon/create', data);
};
// 请求验证码
export const reqGetCode = (data?: any): Promise<ResponseOption> => {
  return request.post('/captcha', data);
};
// 请求注册接口
export const reqGetSignIn = (data?: any): Promise<ResponseOption> => {
  return request.post('/register', data);
};
// 请求登录接口
export const reqGetLogin = (data?: any): Promise<ResponseOption> => {
  return request.post('/login', data);
};
// 上传图标页面-请求上传文件接口
export const uploadfileApi = (
  data: any,
  config = defaultFileHeader
): Promise<ResponseOption> => {
  return request.post('/uploadfile', data, config);
};
