import api from '.';

const URLS = {
  getDenunciadosParaLegajo: (id) => `/legajos/get-denunciados/${id}`,
};

export const getDenunciadosParaLegajo = (id) => {
  return api.get(URLS.getDenunciadosParaLegajo(id));
};
