import api from '.';

const URLS = {
  getDenunciaData: '/denuncias/get-datos-filtros',
};

export const getDenunciaData = () => {
  return api.get(URLS.getDenunciaData);
};
