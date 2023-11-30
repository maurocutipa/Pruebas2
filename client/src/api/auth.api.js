import {internalApi,publicApi} from '.';

const URLS = {
  login: '/auth/login',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  //parte web
  captcha: '/captcha/captcha-status',
};

// @body: email: string, password: string
export const login = (body) => {
  return internalApi.post(URLS.login, body, { withCredentials: true });
};

export const logout = () => {
  return internalApi.post(URLS.logout, {}, { withCredentials: true });
};

export const refresh = () => {
  return internalApi.get(URLS.refresh, { withCredentials: true });
};

//parte web
export const captcha = (body) => {
  return publicApi.post(URLS.captcha, body);
};
