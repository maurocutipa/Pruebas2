import {internalApi} from '.';

const URLS = {
  getDenunciaData: '/denuncias/get-datos-filtros',
  getDelitos: '/data/get-delitos',
};

export const getDenunciaData = () => {
  return internalApi.get(URLS.getDenunciaData);
};

export const getDelitos = () => {
  return internalApi.get(URLS.getDelitos);
};
