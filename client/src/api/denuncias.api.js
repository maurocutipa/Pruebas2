import api from '.';

const URLS = {
  getAll: '/denuncias/get-all',
  getDatosDeFiltros: '/denuncias/get-datos-filtros',
};

export const getAllDenuncias = (body) => {
  return api.post(URLS.getAll, body);
};

export const getDatosDeFiltros = () => {
  return api.get(URLS.getDatosDeFiltros);
};
