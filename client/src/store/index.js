import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth/auth.slice';
import dataSlice from './data/data.slice';

import denunciasSlice from './denuncias/denuncias.slice';
import denunciaLegajoSlice from './denuncias/denunciaLegajo/denunciaLegajo.slice';
import ratificarDenunciaSlice from './denuncias/ratificarDenuncia/ratificarDenuncia.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    data: dataSlice,
    /**
     * Denuncias Slices
     */
    denuncias: denunciasSlice,
    denunciaLegajo: denunciaLegajoSlice,
    ratificarDenuncia: ratificarDenunciaSlice,
  },
});
