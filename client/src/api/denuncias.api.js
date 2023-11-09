import api from '.';

const URLS = {
  getAll: '/denuncias/get-all',
  getDatosDeFiltros: '/denuncias/get-datos-filtros',
  deleteDenuncia: (id) => `/denuncias/delete/${id}`,
};

export const getAllDenuncias = (body) => {
  return api.post(URLS.getAll, body);
};

export const getDatosDeFiltros = () => {
  return api.get(URLS.getDatosDeFiltros);
};

export const deleteDenuncia = (id) => {
  return api.delete(URLS.deleteDenuncia(id));
};
