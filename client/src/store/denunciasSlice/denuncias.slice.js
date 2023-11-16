import { createSlice } from '@reduxjs/toolkit';
import {
  deleteDenunciaThunk,
  getDenunciaByIdThunk,
  getDenunciasThunk,
  ratificarDenunciaThunk,
} from './denuncias.thunks';
import { parseDDMMYYYY } from '@/utils/parseDate';

const initialState = {
  loading: true,
  denuncias: [],
  totalRecords: 0,
  currentDenuncia: null,
  selectedIdDenuncia: 0,
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
          adjuntos: 
          {
            ...payload.data.adjuntos
          },
          datosDenunciaPropiedad: 
          {
            ...payload.data.datosDenunciaPropiedad
          }, 
          datosViolenciaDeGenero: 
          {
            ...payload.data.datosViolenciaDeGenero
          }, 
          datosIncidentesViales: 
          {
            ...payload.data.datosIncidentesViales
          }
        };
      })
      // Ratificar Denuncia
      .addCase(ratificarDenunciaThunk.fulfilled, () => {
        
      })
  },
});

export const { setIdDenuncia } = denunciasSlice.actions;

export default denunciasSlice.reducer;
