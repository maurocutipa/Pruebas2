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
  { idCompetencia: 8, competencia: 'Familia' },
  { idCompetencia: 9, competencia: 'Otros' },
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

const remisiones = [
  { idRemision: 1, remision: 'Otra dependencia pública' },
  { idRemision: 2, remision: 'Dentro del Ministerio Público de la Acusación' },
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
          remisiones,
        };
      })
      .addCase(getDelitosThunk.fulfilled, (state, { payload }) => {
        state.data.delitos = payload.delitos;
      });
  },
});

export default dataSlice.reducer;
