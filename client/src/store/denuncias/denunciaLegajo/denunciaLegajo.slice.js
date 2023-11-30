import { createSlice } from '@reduxjs/toolkit';
import {
  crearDenunciaLegajoThunk,
  getAccionTomadaThunk,
  getDenunciadosParaLegajoThunk,
} from './denunciaLegajo.thunks';

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
  dataParaPdf: {
    fiscalia: '',
    resumenHechos: [],
    delitos: [],
  },
  seTomoAccion: false,
};

export const denunciaLegajoSlice = createSlice({
  name: 'denunciaLegajo',
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
    generarDataParaPdf: (state, { payload }) => {
      state.dataParaPdf.resumenHechos =
        state.denunciaALegajoForm.resumenHechos.map((r) => ({
          descripcion: r.descripcion,
          denunciado: findDenunciado(state.legajoData.denunciados, r.denunciado)
            .nombreCompleto,
        }));

      state.dataParaPdf.delitos = state.denunciaALegajoForm.delitos.map(
        (d) => ({
          denunciado: findDenunciado(state.legajoData.denunciados, d.denunciado)
            .nombreCompleto,
          delito: findDelito(payload.delitos, d.delito).nombre,
        })
      );

      state.dataParaPdf.fiscalia = findFiscalia(
        payload.fiscalias,
        state.denunciaALegajoForm.fiscalia
      ).delegacionFiscal;
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
      .addCase(crearDenunciaLegajoThunk.fulfilled, (state) => {
        state.seTomoAccion = true;
      })
      .addCase(getAccionTomadaThunk.fulfilled, (state, { payload }) => {
        state.seTomoAccion = payload.seTomoAccion;
      });
  },
});

export const findDenunciado = (denunciados, id) => {
  return denunciados.find((denunciado) => denunciado.id === id);
};

export const findDelito = (delitos, id) => {
  return delitos.find((delito) => delito.idDelito === id);
};

export const findFiscalia = (fiscalias, id) => {
  return fiscalias.find((fiscalia) => fiscalia.idDelegacionFiscal === id);
};

// export const generateDataParaPdf = () => {

// }

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
  generarDataParaPdf,
  resetState,
} = denunciaLegajoSlice.actions;

export default denunciaLegajoSlice.reducer;
