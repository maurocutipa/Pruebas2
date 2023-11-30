import {publicApi} from '.';

const URLS = {
    getAutomovilesMarcas: '/adicional/automoviles-marcas',
    getAutomovilesTipos: '/adicional/automoviles-tipos',
    getBicicletasTipos: '/adicional/bicicletas-tipos',
    getCelularesMarcas: '/adicional/celulares-marcas',
};

export const getAutomovilesMarcas = () => {
    return publicApi.get(URLS.getAutomovilesMarcas);
};

export const getAutomovilesTipos = () => {
    return publicApi.get(URLS.getAutomovilesTipos);
};

export const getBicicletasTipos = () => {
    return publicApi.get(URLS.getBicicletasTipos);
};

export const getCelularesMarcas = () => {
    return publicApi.get(URLS.getCelularesMarcas);
};
