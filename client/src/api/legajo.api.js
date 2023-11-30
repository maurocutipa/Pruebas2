import { internalApi } from '.';

const URLS = {
  getDenunciadosParaLegajo: (id) => `/legajos/get-denunciados/${id}`,
  getAccionTomada: (id) => `/legajos/get-accion-tomada/${id}`,
  crearDenunciaLegajo: (id) => `/legajos/denuncia-legajo/${id}`,
  getLegajo: (id) => `/legajos/${id}`,
  archivarDenuncia: '/legajos/archivar-denuncia',
};

export const getDenunciadosParaLegajo = (id) => {
  return internalApi.get(URLS.getDenunciadosParaLegajo(id));
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
  return api.get(URLS.getLegajo(id), {
    withCredentials: true,
  });
};

export const archivarDenuncia = (body) => {
  return internalApi.post(URLS.archivarDenuncia, body);
};
