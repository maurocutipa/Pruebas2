import { internalApi } from '.';

const URLS = {
  getProfesionalesParaLegajo: (id) => `/legajos/get-profesionales/${id}`,
  getDenunciadosParaLegajo: (id) => `/legajos/get-denunciados/${id}`,
  getAccionTomada: (id) => `/legajos/get-accion-tomada/${id}`,
  crearDenunciaLegajo: (id) => `/legajos/denuncia-legajo/${id}`,
  getLegajo: (id) => `/legajos/${id}`,
  archivarDenuncia: '/legajos/archivar-denuncia',
  crearDenunciaNoPenal: `/legajos/crear-denuncia-no-penal`,
};

export const getDenunciadosParaLegajo = (id) => {
  return internalApi.get(URLS.getDenunciadosParaLegajo(id));
};

export const getProfesionalesParaLegajo = (id) => {
  console.log(id)
  return internalApi.get(URLS.getProfesionalesParaLegajo(id));
};

export const getAccionTomada = (id) => {
  return internalApi.get(URLS.getAccionTomada(id));
};

export const crearDenunciaLegajo = (formData) => {
  return internalApi.post(
    URLS.crearDenunciaLegajo(formData.idDenuncia),
    formData
  );
};

export const getLegajo = (id) => {
  return internalApi.get(URLS.getLegajo(id));
};

export const archivarDenuncia = (body) => {
  return internalApi.post(URLS.archivarDenuncia, body);
};

export const crearDenunciaNoPenal = (body) => {
  return internalApi.post(URLS.crearDenunciaNoPenal, body);
};
