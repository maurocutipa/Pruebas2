import { createSlice } from '@reduxjs/toolkit';
import { getDelitosThunk, getDenunciaDataThunk } from './data.thunks';

const competencias = [
  { idCompetencia: 'No penal', competencia: 'No penal' },
  { idCompetencia: 'Penal', competencia: 'Penal' },
  { idCompetencia: 'Menores', competencia: 'Menores' },
  { idCompetencia: 'Civiles', competencia: 'Civiles' },
  { idCompetencia: 'Contravención', competencia: 'Contravención' },
  { idCompetencia: 'Ambiental', competencia: 'Ambiental' },
  { idCompetencia: 'Archivo', competencia: 'Archivo' },
  { idCompetencia: 'Familia', competencia: 'Familia' },
  { idCompetencia: 'Otros', competencia: 'Otros' },
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
