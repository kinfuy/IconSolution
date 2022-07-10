import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
const errorHandler = (errMessage: string) => {
  console.log(errMessage);
};
const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000
});
// 取消重复请求
const pending: Array<any> = [];
const cancelToken = axios.CancelToken;
const removePending = (config: AxiosRequestConfig) => {
  pending.forEach((item, index) => {
    if (item.requestFlag === `${config.url}&${config.method}`) {
      item.cancel('取消重复请求');
      pending.splice(index, 1);
    }
  });
};

instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
//请求拦截器
instance.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    removePending(request);
    request.cancelToken = new cancelToken(cancel => {
      const requestFlag = `${request.url}&${request.method}`;
      pending.push({ requestFlag, cancel });
    });

    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  error => {
    if (error && error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        errorHandler('请求错误！');
        return Promise.reject(error.message);
      } else if (error.response.status >= 500) {
        errorHandler('服务器错误！');
        return Promise.reject(error.message);
      }
      errorHandler('服务器遇到未知错误！');
      return Promise.reject(error.message);
    }

    if (error.message === '取消重复请求') {
      errorHandler('您的操作过于频繁！');
      return Promise.reject(error);
    }
    console.log(error);
    errorHandler('连接到服务器失败 或 服务器响应超时！');
    return Promise.reject(error);
  }
);

export default instance;
