// import api from '.';
import { internalApi, publicApi } from '.';

const URLS = {
  getAll: '/denuncias/get-all',
  getDatosDeFiltros: '/denuncias/get-datos-filtros',
  getResumenDenuncia: (id) => `/denuncias/get-resumen-ratificar/${id}`,
  getDenunciaById: (id) => `/denuncias/get/${id}`,
  deleteDenuncia: (id) => `/denuncias/delete/${id}`,
  ratificarDenuncia: (id) => `/denuncias/ratificar-denuncia/${id}`,
  estaRatificada: (id) => `/denuncias/esta-ratificada/${id}`,
  //parte web
  form: '/denuncias/create',
  formDenunciaIntrafamiliar: '/denuncias/familiar-create',
  consultarDenuncia: '/denuncias/consultar'
};

export const getAllDenuncias = (body) => {
  return internalApi.post(URLS.getAll, body);
};

export const getDatosDeFiltros = () => {
  return internalApi.get(URLS.getDatosDeFiltros);
};

export const getDenunciaById = (id) => {
  return internalApi.get(URLS.getDenunciaById(id));
};

export const deleteDenuncia = (id) => {
  return internalApi.delete(URLS.deleteDenuncia(id));
};

export const ratificarDenuncia = (id) => {
  return internalApi.patch(URLS.ratificarDenuncia(id));
};

export const getResumenDenuncia = (id) => {
  return internalApi.get(URLS.getResumenDenuncia(id));
};

export const estaRatificada = (id) => {
  return internalApi.get(URLS.estaRatificada(id));
};

//parte web

export const crearDenuncia = (body) => {
  return publicApi.post(URLS.form, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const crearDenunciaIntrafamiliar = (body) => {
  return publicApi.post(URLS.formDenunciaIntrafamiliar, body, { 'Content-Type': 'application/json' });
}

export const consultarDenuncia = (body) => {
  return publicApi.post(URLS.consultarDenuncia, body, { 'Content-Type': 'application/json' })
}