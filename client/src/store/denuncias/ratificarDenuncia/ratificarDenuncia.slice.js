import { createSlice } from '@reduxjs/toolkit';
import {
  estaRatificadaThunk,
  getResumenDenunciaThunk,
  ratificarDenunciaThunk,
} from './ratificarDenuncia.thunks';

const initialState = {
  resumenDenuncia: null,
  form: {
    firmaDenunciante: null,
    firmaFuncionario: null,
    estaRatificada: false,
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
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(ratificarDenunciaThunk.fulfilled, (state) => {
        state.form.firmaDenunciante = null;
        state.form.firmaFuncionario = null;
        state.form.estaRatificada = true;
      })
      .addCase(getResumenDenunciaThunk.fulfilled, (state, { payload }) => {
        state.resumenDenuncia = payload;
      })
      .addCase(estaRatificadaThunk.fulfilled, (state, { payload }) => {
        state.form.estaRatificada = payload.estaRatificada;
      });
  },
});

export const {
  setFirmaDenunciante,
  setFirmaFuncionario,
  clearFirmaDenunciante,
  clearFirmaFuncionario,
  resetState,
} = ratificarDenunciaSlice.actions;

export default ratificarDenunciaSlice.reducer;
