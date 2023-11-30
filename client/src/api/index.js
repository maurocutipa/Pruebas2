import axios from 'axios';

const axiosParams = {
  // baseURL: DEV_MODE ? BASE_URL_LOCAL : BASE_URL_PRODUCTION
  baseURL: 'http://localhost:4000/api',
  baseURL_sistema1: 'http://192.200.0.53:3000/api',
};

const axiosInstance = axios.create(axiosParams);

const api = (axios,baseURL) => {

  const instance = axios.create({ baseURL });
  return {
    get: (url, config = {}) =>
      instance.get(url, { ...config, withCredentials: true }),
    delete: (url, config = {}) =>
      instance.delete(url, { ...config, withCredentials: true }),
    post: (url, body, config = {}) =>
      instance.post(url, body, { ...config, withCredentials: true }),
    patch: (url, body, config = {}) =>
      instance.patch(url, body, { ...config, withCredentials: true }),
    put: (url, body, config = {}) =>
      instance.put(url, body, { ...config, withCredentials: true }),
  };
};

// export default api(axiosInstance);
export const internalApi = api(axiosInstance, axiosParams.baseURL);
export const publicApi = api(axiosInstance, axiosParams.baseURL_sistema1);