import { createSlice } from '@reduxjs/toolkit';
import { getDelitosThunk, getDenunciaDataThunk } from './data.thunks';

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

const estados = [
  {
    idEstado: 1,
    estado: 'Generado',
  },
  {
    idEstado: 2,
    estado: 'Sin generar',
  },
];

const initialState = {
  loading: true,
  data: {
    seccionales: [],
    tiposDenuncia: [],
    delegacionesFiscales: [],
    competencias: [],
    realizaciones: [],
    delitos: [],
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
        state.data = {
          ...state.data,
          ...payload,
          competencias,
          realizaciones,
          estados,
        };
      })
      .addCase(getDelitosThunk.fulfilled, (state, { payload }) => {
        state.data.delitos = payload.delitos;
      });
  },
});

export default dataSlice.reducer;
