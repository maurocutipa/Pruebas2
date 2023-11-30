import axios from 'axios';

const axiosInternalParams = {
  baseURL: 'http://localhost:4000/api',
};

const axiosPublicParams = {
  baseURL: 'http://192.200.0.53:3000/api',
};

const axiosInternalInstance = axios.create(axiosInternalParams);
const axiosPublicInstance = axios.create(axiosPublicParams);

const api = (axios) => {
  return {
    get: (url, config = {}) =>
      axios.get(url, { ...config, withCredentials: true }),
    delete: (url, config = {}) =>
      axios.delete(url, { ...config, withCredentials: true }),
    post: (url, body, config = {}) =>
      axios.post(url, body, { ...config, withCredentials: true }),
    patch: (url, body, config = {}) =>
      axios.patch(url, body, { ...config, withCredentials: true }),
    put: (url, body, config = {}) =>
      axios.put(url, body, { ...config, withCredentials: true }),
  };
};

export const internalApi = api(axiosInternalInstance);
export const publicApi = api(axiosPublicInstance);
