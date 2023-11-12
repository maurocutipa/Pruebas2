import { createSlice } from '@reduxjs/toolkit';
import { getDenunciaDataThunk } from './data.thunks';

const competencias = [
  { idCompetencia: 1, competencia: 'No penal' },
  { idCompetencia: 2, competencia: 'Penal' },
  { idCompetencia: 3, competencia: 'Menores' },
  { idCompetencia: 4, competencia: 'Civiles' },
  { idCompetencia: 5, competencia: 'Contravención' },
  { idCompetencia: 6, competencia: 'Ambiental' },
  { idCompetencia: 7, competencia: 'Archivo' },
];

const realizaciones = [
  { idRealizacion: 1, realizacion: 'Web' },
  { idRealizacion: 2, realizacion: 'Presencial' },
  { idRealizacion: 3, realizacion: 'Oficio' },
];

const initialState = {
  loading: true,
  data: {
    seccionales: [],
    tiposDenuncia: [],
    delegacionesFiscales: [],
    competencias: [],
    realizaciones: [],
  },
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Datos de Filtros
      .addCase(getDenunciaDataThunk.fulfilled, (state, { payload }) => {
        state.data = { ...payload, competencias, realizaciones };
      });
  },
});

export default dataSlice.reducer;
