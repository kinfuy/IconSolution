import request from './config';
export interface ResponseOption {
  status: number;
  message: string;
  data: string | number | object | Array<any>;
}

const buildGenerateApi = (data?: any): Promise<ResponseOption> => {
  return request.post('/pkg/build', data);
};

const createGenerateApi = (data?: any): Promise<ResponseOption> => {
  return request.post('/pkg/create', data);
};
export { buildGenerateApi, createGenerateApi };
