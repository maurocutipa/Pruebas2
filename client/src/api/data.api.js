import api from '.';

const URLS = {
  getDenunciaData: '/denuncias/get-datos-filtros',
  getDelitos: '/data/get-delitos',
};

export const getDenunciaData = () => {
  return api.get(URLS.getDenunciaData);
};

export const getDelitos = () => {
  return api.get(URLS.getDelitos);
};
