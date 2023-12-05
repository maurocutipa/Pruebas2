import { internalApi } from ".";

const URLS = {
  getPersonas:() => `/personas/get-all`,
  getGrupos: () => `/personas/get-grupos`,
};

export const getPersonas = (body) => {
  return internalApi.post(URLS.getPersonas(),body, {});
};

export const getGrupos = () => {
  return internalApi.get(URLS.getGrupos());
}
