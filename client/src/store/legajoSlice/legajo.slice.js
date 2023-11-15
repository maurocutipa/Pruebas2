import { createSlice } from '@reduxjs/toolkit';
import { getDenunciadosParaLegajoThunk } from './legajo.thunks';

const initialState = {
  loading: false,
  denunciaALegajoForm: {
    id: '',
    fiscalia: '',
    resumenHechos: [],
    delitos: [],
  },
  // Datos usados para crear el legajo
  legajoData: {
    denunciados: [],
  },
};

export const legajoSlice = createSlice({
  name: 'legajo',
  initialState,
  reducers: {
    /**
     * Manejo del formulario: Convertir denuncia a legajo
     */
    agregarResumenHecho: (state, { payload }) => {
      const { fiscalia, ...resumen } = payload;

      state.denunciaALegajoForm.resumenHechos.push(resumen);

      legajoSlice.caseReducers.agregarFiscalia(state, {
        type: 'agregarFiscalia',
        payload: fiscalia,
      });
    },
    agregarFiscalia: (state, { payload }) => {
      state.denunciaALegajoForm.fiscalia = payload;
    },
    agregarDelito: (state, { payload }) => {
      state.denunciaALegajoForm.delitos.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getDenunciadosParaLegajoThunk.fulfilled,
      (state, { payload }) => {
        state.legajoData.denunciados = payload.denunciados;
      }
    );
  },
});

export const { agregarResumenHecho, agregarDelito } = legajoSlice.actions;

export default legajoSlice.reducer;
