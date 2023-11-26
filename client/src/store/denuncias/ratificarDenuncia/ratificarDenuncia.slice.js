import { createSlice } from '@reduxjs/toolkit';
import {
  getResumenDenunciaThunk,
  ratificarDenunciaThunk,
} from './ratificarDenuncia.thunks';

const initialState = {
  loading: true,
  resumenDenuncia: null,
  form: {
    firmaDenunciante: null,
    firmaFuncionario: null,
  },
};

export const ratificarDenunciaSlice = createSlice({
  name: 'ratificarDenuncia',
  initialState,
  extraReducers: (builder) => {
    builder
      // Ratificar Denuncia
      .addCase(ratificarDenunciaThunk.fulfilled, () => {})
      .addCase(getResumenDenunciaThunk.fulfilled, (state, { payload }) => {
        state.resumenDenuncia = payload;
      });
  },
});

export default ratificarDenunciaSlice.reducer;
