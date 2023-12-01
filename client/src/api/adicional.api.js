import {internalApi, publicApi} from '.';

const URLS = {
  getProvincias: '/adicional/provincias',
  getDepartamentos: '/adicional/departamentos',
  getNacionalidades: '/adicional/nacionalidades',
  getBarrios: (id) => `/adicional/barrios/${id}`,
  getLocalidades: (id) => `/adicional/localidades/${id}`,
  getPadronElectoral: (numDni) => `/padron/dni/${numDni}`
};

export const getProvincias = () => {
  return publicApi.get(URLS.getProvincias);
};

export const getDepartamentos = () => {
  return publicApi.get(URLS.getDepartamentos);
};

export const getNacionalidades = () => {
  return publicApi.get(URLS.getNacionalidades);
};

export const getBarrios = (id) => {
  return publicApi.get(URLS.getBarrios(id));
};

export const getLocalidades = (id) => {
  return publicApi.get(URLS.getLocalidades(id));
};

export const getPadronElectoral = (numDni) => {
  return internalApi.get(URLS.getPadronElectoral(numDni));
};