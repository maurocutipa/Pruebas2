import api from '.';

const URLS = {
  getAll: '/denuncias/get-all',
  getDatosDeFiltros: '/denuncias/get-datos-filtros',
  getDenunciaById: (id) => `/denuncias/get/${id}`,
  deleteDenuncia: (id) => `/denuncias/delete/${id}`,
  ratificarDenuncia: (id) => `/denuncias/ratificar-denuncia/${id}`,
};

export const getAllDenuncias = (body) => {
  return api.post(URLS.getAll, body);
};

export const getDatosDeFiltros = () => {
  return api.get(URLS.getDatosDeFiltros);
};

export const getDenunciaById = (id) => {
  return api.get(URLS.getDenunciaById(id));
};

export const deleteDenuncia = (id) => {
  return api.delete(URLS.deleteDenuncia(id));
};

export const ratificarDenuncia = (id) => {
  return api.patch(URLS.ratificarDenuncia(id));
};
