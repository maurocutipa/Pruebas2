import api from '.';

const URLS = {
  login: '/auth/login',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
};

// @body: email: string, password: string
export const login = (body) => {
  return api.post(URLS.login, body, { withCredentials: true });
};

export const logout = () => {
  return api.post(URLS.logout, {}, { withCredentials: true });
};

export const refresh = () => {
  return api.get(URLS.refresh, { withCredentials: true });
};
