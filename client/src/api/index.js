import axios from 'axios';

const axiosParams = {
  // baseURL: DEV_MODE ? BASE_URL_LOCAL : BASE_URL_PRODUCTION
  baseURL: 'http://localhost:4000/api',
};

const axiosInstance = axios.create(axiosParams);

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

export default api(axiosInstance);
