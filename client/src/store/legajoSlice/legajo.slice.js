import { createSlice } from '@reduxjs/toolkit';
import {
  crearDenunciaLegajoThunk,
  getAccionTomadaThunk,
  getDenunciadosParaLegajoThunk,
} from './legajo.thunks';

const initialState = {
  resumenHechosForm: {
    form: {
      id: '',
      denunciado: '',
      descripcion: '',
    },
    estaModificando: false,
  },
  delitoAsignadoForm: {
    form: {
      id: '',
      denunciado: '',
      delito: '',
    },
    estaModificando: false,
  },
  denunciaALegajoForm: {
    fiscalia: '',
    resumenHechos: [],
    delitos: [],
  },
  // Datos usados para crear el legajo
  legajoData: {
    denunciados: [],
  },
  seTomoAccion: false,
};

export const legajoSlice = createSlice({
  name: 'legajo',
  initialState,
  reducers: {
    /**
     * Formulario resumen de hechos
     */
    modificarResumenHecho: (state, { payload }) => {
      const { fiscalia, ...resumen } = payload;

      state.denunciaALegajoForm.fiscalia = fiscalia;

      state.denunciaALegajoForm.resumenHechos =
        state.denunciaALegajoForm.resumenHechos.map((r) =>
          r.id === resumen.id ? resumen : r
        );
      state.resumenHechosForm.estaModificando = false;
    },
    eliminarResumenHecho: (state, { payload }) => {
      state.denunciaALegajoForm.resumenHechos =
        state.denunciaALegajoForm.resumenHechos.filter(
          (resumen) => resumen.id !== payload
        );
    },
    setResumenHechosForm: (state, { payload }) => {
      state.resumenHechosForm.form = payload;
      state.resumenHechosForm.estaModificando = true;
    },
    /**
     * Formulario delitos asignados
     */
    modificarDelitoAsignado: (state, { payload }) => {
      state.denunciaALegajoForm.delitos = state.denunciaALegajoForm.delitos.map(
        (d) => (d.id === payload.id ? payload : d)
      );
      state.delitoAsignadoForm.estaModificando = false;
    },
    eliminarDelitoAsignado: (state, { payload }) => {
      state.denunciaALegajoForm.delitos =
        state.denunciaALegajoForm.delitos.filter((d) => d.id !== payload);
    },
    setDelitoAsignadoForm: (state, { payload }) => {
      state.delitoAsignadoForm.form = payload;
      state.delitoAsignadoForm.estaModificando = true;
    },
    /**
     * Formulario Final: Convertir denuncia a legajo
     */
    agregarResumenHecho: (state, { payload }) => {
      const { fiscalia, ...resumen } = payload;

      state.denunciaALegajoForm.resumenHechos.push(resumen);
      state.denunciaALegajoForm.fiscalia = fiscalia;
    },
    agregarFiscalia: (state, { payload }) => {
      state.denunciaALegajoForm.fiscalia = payload;
    },
    agregarDelito: (state, { payload }) => {
      state.denunciaALegajoForm.delitos.push(payload);
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getDenunciadosParaLegajoThunk.fulfilled,
        (state, { payload }) => {
          state.legajoData.denunciados = payload.denunciados;
        }
      )
      // Convertir denuncia a legajo
      .addCase(crearDenunciaLegajoThunk.fulfilled, (state, { payload }) => {})
      .addCase(getAccionTomadaThunk.fulfilled, (state, { payload }) => {
        state.seTomoAccion = payload.seTomoAccion;
      });
  },
});

export const {
  setResumenHechosForm,
  modificarResumenHecho,
  eliminarResumenHecho,
  setDelitoAsignadoForm,
  modificarDelitoAsignado,
  eliminarDelitoAsignado,
  agregarResumenHecho,
  agregarDelito,
  agregarFiscalia,
  resetState,
} = legajoSlice.actions;

export default legajoSlice.reducer;
