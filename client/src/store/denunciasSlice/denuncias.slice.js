import { createSlice } from '@reduxjs/toolkit';
import {
  deleteDenunciaThunk,
  getDenunciaThunk,
  getDenunciasThunk,
  getDatosDeFiltrosThunk,
} from './denuncias.thunks';

const initialState = {
  loading: true,
  denuncias: [],
  totalRecords: 0,
  selectedDenuncia: null,
  selectedIdDenuncia: 0,
  datosDeFiltros: {
    seccionales: [],
    tiposDenuncia: [],
    delegacionesFiscales: [],
  },
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
      // Get Datos de Filtros
      .addCase(getDatosDeFiltrosThunk.fulfilled, (state, { payload }) => {
        state.datosDeFiltros = payload;
      })
      // Delete Denuncia
      .addCase(deleteDenunciaThunk.fulfilled, (state, { payload }) => {
        state.denuncias = state.denuncias.filter(
          (denuncia) => denuncia.idDenuncia != payload.data.id
        );
      })
      .addCase(getDenunciaThunk.fulfilled, (state, { payload }) => {
        state.selectedDenuncia = payload;
        console.log(state.selectedDenuncia);
      });
  },
});

export const { setIdDenuncia } = denunciasSlice.actions;

export default denunciasSlice.reducer;
