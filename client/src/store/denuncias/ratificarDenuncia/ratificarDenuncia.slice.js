import { createSlice } from '@reduxjs/toolkit';
import {
  getResumenDenunciaThunk,
  ratificarDenunciaThunk,
} from './ratificarDenuncia.thunks';

const initialState = {
  resumenDenuncia: null,
  form: {
    firmaDenunciante: null,
    firmaFuncionario: null,
  },
};

export const ratificarDenunciaSlice = createSlice({
  name: 'ratificarDenuncia',
  initialState,
  reducers: {
    setFirmaDenunciante: (state, { payload }) => {
      state.form.firmaDenunciante = payload;
    },
    setFirmaFuncionario: (state, { payload }) => {
      state.form.firmaFuncionario = payload;
    },
    clearFirmaDenunciante: (state) => {
      state.form.firmaDenunciante = null;
    },
    clearFirmaFuncionario: (state) => {
      state.form.firmaFuncionario = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ratificarDenunciaThunk.fulfilled, () => {})
      .addCase(getResumenDenunciaThunk.fulfilled, (state, { payload }) => {
        state.resumenDenuncia = payload;
      });
  },
});

export const {
  setFirmaDenunciante,
  setFirmaFuncionario,
  clearFirmaDenunciante,
  clearFirmaFuncionario,
} = ratificarDenunciaSlice.actions;

export default ratificarDenunciaSlice.reducer;
