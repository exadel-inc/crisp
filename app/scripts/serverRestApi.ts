import axios from 'axios';
import store from '../scripts/redux/store';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // useDispatch();
  // Do something before request is sent

  const _store = store.getState();
  let host: string = localStorage.getItem('host') || '';
  let token: string = localStorage.getItem('token') || '';

  config.url = `${host}/api/${config.url}`;
  config.headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  };

  if(token) {
    config.headers.Authorization = `${token} Bearer`;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export const authApi = (handlerCb?: Function | undefined, errorHandlerCb?: Function| undefined) => {
  const errorHandler = handlerCb || (async (resp: any) => {
    console.error('Error');

    return;
  });

  const handler = errorHandlerCb || (async (resp: any) => {
    if(resp.status > 199 && resp.status < 300) {
      return await resp.data.data;
    }

    return await errorHandler(resp);
  });

  return {
    login: async (data: any) => await handler(await axios.post('auth/login', data)),
    refreshAccessToken: async (data: any) => await handler(await axios.post('auth/refresh-access-token', data)),
    logout: async (data: any) => await handler(await axios.post('auth/logout', data)),
    register: async (data: any) => await handler(await axios.post('auth/register', data))
  };
};

export const restApi = (path: string, handlerCb?: Function | undefined, errorHandlerCb?: Function| undefined) => {
  const errorHandler = errorHandlerCb || (async (resp: any) => {
    console.error('Error');

    return;
  });

  const handler = handlerCb || (async (resp: any) => {
    if(resp.status > 199 && resp.status < 300) {
      return await resp.data.data;
    }

    return await errorHandler(resp);
  });

  return {
    getById: async (id: string) => await handler(await axios.get(`${path}/${id}`)),
    getAll: async () => await handler(await axios.get(`${path}`)),
    post: async (data: any) => await handler(await axios.post(`${path}`, data)),
    put: async (id: string, data: any) => await handler(await axios.put(`${path}/${id}`, data)),
    del: async (id: string) => await handler(await axios.delete(`${path}/${id}`))
  };
};
