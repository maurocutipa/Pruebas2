import { createSlice } from '@reduxjs/toolkit';
import {
  deleteDenunciaThunk,
  getDenunciaByIdThunk,
  getDenunciasThunk,
  getDatosDeFiltrosThunk,
} from './denuncias.thunks';
import dayjs from 'dayjs';

const initialState = {
  loading: true,
  denuncias: [],
  totalRecords: 0,
  currentDenuncia: null,
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
      // Get Denuncia By Id
      .addCase(getDenunciaByIdThunk.fulfilled, (state, { payload }) => {
        state.currentDenuncia = {
          ...payload.data.denuncia,
          fechaDenuncia: dayjs(payload.data.denuncia.fechaDenuncia).format(
            'YYYY-MM-DD'
          ),
        };
      });
  },
});

export const { setIdDenuncia } = denunciasSlice.actions;

export default denunciasSlice.reducer;
