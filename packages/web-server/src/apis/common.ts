import request from './config';
export interface ResponseOption {
  status: number;
  message: string;
  data: string | number | object | Array<any>;
}

const buildGenerateApi = <T>(data?: T): Promise<ResponseOption> => {
  return request.post('/build/pkg', data);
};
export { buildGenerateApi };
