import api from '.';

const URLS = {
  getDenunciadosParaLegajo: (id) => `/legajos/get-denunciados/${id}`,
  getAccionTomada: (id) => `/legajos/get-accion-tomada/${id}`,
  crearDenunciaLegajo: (id) => `/legajos/denuncia-legajo/${id}`,
};

export const getDenunciadosParaLegajo = (id) => {
  return api.get(URLS.getDenunciadosParaLegajo(id));
};

export const getAccionTomada = (id) => {
  return api.get(URLS.getAccionTomada(id));
};

export const crearDenunciaLegajo = (formData) => {
  return api.post(URLS.crearDenunciaLegajo(formData.idDenuncia), formData, {
    withCredentials: true,
  });
};
