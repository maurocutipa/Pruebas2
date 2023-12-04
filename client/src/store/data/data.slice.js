import { createSlice } from '@reduxjs/toolkit';
import { getDelitosThunk, getDenunciaDataThunk } from './data.thunks';

const competencias = [
  { idCompetencia: 'No penal', competencia: 'No penal' },
  { idCompetencia: 'Penal', competencia: 'Penal' },
  { idCompetencia: 'Menores', competencia: 'Menores' },
  { idCompetencia: 'Civil', competencia: 'Civil' },
  { idCompetencia: 'Contravención', competencia: 'Contravención' },
  { idCompetencia: 'Ambiental', competencia: 'Ambiental' },
  { idCompetencia: 'Archivo', competencia: 'Archivo' },
  { idCompetencia: 'Familia', competencia: 'Familia' },
  { idCompetencia: 'Otro', competencia: 'Otro' },
  { idCompetencia: 'Juzgado de Género', competencia: 'Juzgado de Género' },
];

const realizaciones = [
  { idRealizacion: 'WEB', realizacion: 'Web' },
  { idRealizacion: 'PRE', realizacion: 'Presencial' },
  { idRealizacion: 'OFI', realizacion: 'Oficio' },
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
  {
    idRemision: 'Otra dependencia pública',
    remision: 'Otra dependencia pública',
  },
  {
    idRemision: 'Dentro del Ministerio Público de la Acusación',
    remision: 'Dentro del Ministerio Público de la Acusación',
  },
];

const ratificaciones = [
  { idRatificacion: 'SI', ratificacion: 'SI' },
  { idRatificacion: 'NO', ratificacion: 'NO' },
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
          ratificaciones,
        };
      })
      .addCase(getDelitosThunk.fulfilled, (state, { payload }) => {
        state.data.delitos = payload.delitos;
      });
  },
});

export default dataSlice.reducer;
