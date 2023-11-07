import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice/auth.slice';
import denunciasSlice from './denunciasSlice/denuncias.slice';
import pasesSlice from './pasesSlice/pases.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    denuncias: denunciasSlice,
    pases: pasesSlice,
  },
});
