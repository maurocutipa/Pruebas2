import { createSlice } from '@reduxjs/toolkit';
import {
  crearDenunciaLegajoThunk,
  getAccionTomadaThunk,
  getDenunciadosParaLegajoThunk,
  getProfesionalesParaLegajoThunk,
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
  detenidosForm: {
    form: {
      id: '',
      denunciado: '',
      lugarDetencion: '',
      fechaHoraDetencion: '',
      juezDetencion: '',
    },
    estaModificando: false,
  },
  denunciaALegajoForm: {
    fiscalia: '',
    resumenHechos: [],
    delitos: [],
    detenidos: [],
  },
  // Datos usados para crear el legajo
  legajoData: {
    denunciados: [],
    profesionales: []
  },
  dataParaPdf: {
    fiscalia: '',
    resumenHechos: [],
    delitos: [],
  },
  seTomoAccion: false,
};

const deleteElementFromArray = (array, id) => {
  return array.filter((element) => element.id !== id);
};

// a function to replace a specific element in an array using map
const replaceElementInArray = (array, newElement) => {
  const id = newElement.id;
  return array.map((element) => (element.id === id ? newElement : element));
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

      // state.denunciaALegajoForm.resumenHechos =
      //   state.denunciaALegajoForm.resumenHechos.map((r) =>
      //     r.id === resumen.id ? resumen : r
      //   );
      state.denunciaALegajoForm.resumenHechos = replaceElementInArray(
        state.denunciaALegajoForm.resumenHechos,
        resumen
      );
      state.resumenHechosForm.estaModificando = false;
    },
    eliminarResumenHecho: (state, { payload }) => {
      // state.denunciaALegajoForm.resumenHechos =
      //   state.denunciaALegajoForm.resumenHechos.filter(
      //     (resumen) => resumen.id !== payload
      //   );

      state.denunciaALegajoForm.resumenHechos = deleteElementFromArray(
        state.denunciaALegajoForm.resumenHechos,
        payload
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
      // state.denunciaALegajoForm.delitos = state.denunciaALegajoForm.delitos.map(
      //   (d) => (d.id === payload.id ? payload : d)
      // );

      state.denunciaALegajoForm.delitos = replaceElementInArray(
        state.denunciaALegajoForm.delitos,
        payload
      );

      state.delitoAsignadoForm.estaModificando = false;
    },
    eliminarDelitoAsignado: (state, { payload }) => {
      // state.denunciaALegajoForm.delitos =
      //   state.denunciaALegajoForm.delitos.filter((d) => d.id !== payload);
      state.denunciaALegajoForm.delitos = deleteElementFromArray(
        state.denunciaALegajoForm.delitos,
        payload
      );
    },
    setDelitoAsignadoForm: (state, { payload }) => {
      state.delitoAsignadoForm.form = payload;
      state.delitoAsignadoForm.estaModificando = true;
    },
    /**
     * Formulario detenidos
     */
    modificarDetenido: (state, { payload }) => {
      // state.denunciaALegajoForm.detenidos =
      //   state.denunciaALegajoForm.detenidos.map((d) =>
      //     d.id === payload.id ? payload : d
      //   );

      state.denunciaALegajoForm.detenidos = replaceElementInArray(
        state.denunciaALegajoForm.detenidos,
        payload
      );
      state.detenidosForm.estaModificando = false;
    },
    eliminarDetenido: (state, { payload }) => {
      // state.denunciaALegajoForm.detenidos =
      //   state.denunciaALegajoForm.detenidos.filter((d) => d.id !== payload);

      state.denunciaALegajoForm.detenidos = deleteElementFromArray(
        state.denunciaALegajoForm.detenidos,
        payload
      );
    },
    setDetenidoForm: (state, { payload }) => {
      state.detenidosForm.form = payload;
      state.detenidosForm.estaModificando = true;
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
    agregarDetenido: (state, { payload }) => {
      state.denunciaALegajoForm.detenidos.push(payload);
    },
    /**
     * Data para PDF
     */
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
      .addCase(
        getProfesionalesParaLegajoThunk.fulfilled,
        (state, { payload }) => {
          state.legajoData.profesionales = payload.profesionales;
        }
      )
      .addCase(
        getProfesionalesParaLegajoThunk.rejected,
        (state, { payload }) => {
          console.log(payload)
          state.legajoData.profesionales = [];
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
  // Resumen Hechos
  setResumenHechosForm,
  modificarResumenHecho,
  eliminarResumenHecho,
  // Delitos
  setDelitoAsignadoForm,
  modificarDelitoAsignado,
  eliminarDelitoAsignado,
  // Detenidos
  setDetenidoForm,
  modificarDetenido,
  eliminarDetenido,
  // Formulario Final
  agregarResumenHecho,
  agregarDelito,
  agregarFiscalia,
  agregarDetenido,
  // Extra
  generarDataParaPdf,
  resetState,
} = denunciaLegajoSlice.actions;

export default denunciaLegajoSlice.reducer;
