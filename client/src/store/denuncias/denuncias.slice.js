import { createSlice } from '@reduxjs/toolkit';
import {
  deleteDenunciaThunk,
  getDenunciaByIdThunk,
  getDenunciasThunk,
} from './denuncias.thunks';
import { parseDDMMYYYY } from '@/utils/parseDate';

const initialState = {
  loading: true,
  denuncias: [],
  totalRecords: 0,
  currentDenuncia: null,
  selectedIdDenuncia: 0,
  resumenDenuncia: null,
};

export const denunciasSlice = createSlice({
  name: 'denuncias',
  initialState,
  reducers: {
    setIdDenuncia: (state, { payload }) => {
      state.selectedIdDenuncia = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Denuncias
      .addCase(getDenunciasThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDenunciasThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.denuncias = payload.denuncias;
        state.totalRecords = payload.totalRecords;
      })
      // Delete Denuncia
      .addCase(deleteDenunciaThunk.fulfilled, (state, { payload }) => {
        state.denuncias = state.denuncias.filter(
          (denuncia) => denuncia.idDenuncia != payload.data.id
        );
      })
      // Get Denuncia By Id
      .addCase(getDenunciaByIdThunk.fulfilled, (state, { payload }) => {
        state.currentDenuncia = {
          denuncia: {
            ...payload.data.denuncia,
            fechaDenuncia: parseDDMMYYYY(payload.data.denuncia.fechaDenuncia),
          },
          intervinientes: {
            ...payload.data.intervinientes,
          },
          adjuntos: {
            ...payload.data.adjuntos,
          },
          datosDenunciaPropiedad: {
            ...payload.data.datosDenunciaPropiedad,
          },
          datosViolenciaDeGenero: {
            ...payload.data.datosViolenciaDeGenero,
          },
          datosIncidentesViales: {
            ...payload.data.datosIncidentesViales,
          },
          datosDelitoSexual: {
            ...payload.data.datosDelitoSexual,
          },
          datosViolenciaIntrafamiliar: {
            ...payload.data.datosViolenciaIntrafamiliar,
          }, 
          datosDenunciaAbigeato: {
            ...payload.data.datosDenunciaAbigeato,
          }, 
          datosDenunciaMaltratoAnimal: {
            ...payload.data.datosDenunciaMaltratoAnimal,
          },
          datosDenunciaDelitosPersonas: {
            ...payload.data.datosDenunciaDelitosPersonas,
          },
          datosDenunciaDanos: {
            ...payload.data.datosDenunciaDanos,
          } 
        };
      });
  },
});

export const { setIdDenuncia } = denunciasSlice.actions;

export default denunciasSlice.reducer;
