/* eslint-disable no-unreachable */
export let data = [
  {
    Nro: 1,
    Realizacion: 'Realización 1',
    Seccional: 'Seccional 1',
    FechaDenuncia: new Date(`2023-10-02`).toLocaleDateString('es-AR'),
    TipoDenuncia: 'Tipo 1',
    Competencia: 'Competencia 1',
    Ratificada: 'Sí',
    FiscaliaAsignada: 'Fiscalía 1',
    NumLegajoAsignado: 123,
  },
  {
    Nro: 2,
    Realizacion: 'Realización 2',
    Seccional: 'Seccional 2',
    FechaDenuncia: new Date('2023-10-03').toLocaleDateString('es-AR'),
    TipoDenuncia: 'Tipo 2',
    Competencia: 'Competencia 2',
    Ratificada: 'No',
    FiscaliaAsignada: 'Fiscalía 2',
    NumLegajoAsignado: 124,
  },
  {
    Nro: 3,
    Realizacion: 'Realización 3',
    Seccional: 'Seccional 3',
    FechaDenuncia: new Date('2023-10-04').toLocaleDateString('es-AR'),
    TipoDenuncia: 'Tipo 3',
    Competencia: 'Competencia 3',
    Ratificada: 'Sí',
    FiscaliaAsignada: 'Fiscalía 3',
    NumLegajoAsignado: 125,
  },
  {
    Nro: 4,
    Realizacion: 'Realización 4',
    Seccional: 'Seccional 4',
    FechaDenuncia: new Date('2023-10-05').toLocaleDateString('es-AR'),
    TipoDenuncia: 'Tipo 4',
    Competencia: 'Competencia 4',
    Ratificada: 'No',
    FiscaliaAsignada: 'Fiscalía 4',
    NumLegajoAsignado: 126,
  },
  {
    Nro: 5,
    Realizacion: 'Realización 5',
    Seccional: 'Seccional 5',
    FechaDenuncia: new Date('2023-10-06').toLocaleDateString('es-AR'),
    TipoDenuncia: 'Tipo 5',
    Competencia: 'Competencia 5',
    Ratificada: 'Sí',
    FiscaliaAsignada: 'Fiscalía 5',
    NumLegajoAsignado: 127,
  },
  {
    Nro: 6,
    Realizacion: 'Realización 6',
    Seccional: 'Seccional 6',
    FechaDenuncia: new Date('2023-10-07').toLocaleDateString('es-AR'),
    TipoDenuncia: 'Tipo 6',
    Competencia: 'Competencia 6',
    Ratificada: 'No',
    FiscaliaAsignada: 'Fiscalía 6',
    NumLegajoAsignado: 128,
  },
  {
    Nro: 7,
    Realizacion: 'Realización 7',
    Seccional: 'Seccional 7',
    FechaDenuncia: new Date('2023-10-08').toLocaleDateString('es-AR'),
    TipoDenuncia: 'Tipo 7',
    Competencia: 'Competencia 7',
    Ratificada: 'Sí',
    FiscaliaAsignada: 'Fiscalía 7',
    NumLegajoAsignado: 129,
  },
  {
    Nro: 8,
    Realizacion: 'Realización 8',
    Seccional: 'Seccional 8',
    FechaDenuncia: new Date('2023-10-09').toLocaleDateString('es-AR'),
    TipoDenuncia: 'Tipo 8',
    Competencia: 'Competencia 8',
    Ratificada: 'No',
    FiscaliaAsignada: 'Fiscalía 8',
    NumLegajoAsignado: 130,
  },
  {
    Nro: 9,
    Realizacion: 'Realización 9',
    Seccional: 'Seccional 9',
    FechaDenuncia: new Date('2023-10-10').toLocaleDateString('es-AR'),
    TipoDenuncia: 'Tipo 9',
    Competencia: 'Competencia 9',
    Ratificada: 'Sí',
    FiscaliaAsignada: 'Fiscalía 9',
    NumLegajoAsignado: 131,
  },
  {
    Nro: 10,
    Realizacion: 'Realización 10',
    Seccional: 'Seccional 10',
    FechaDenuncia: new Date('2023-10-11').toLocaleDateString('es-AR'),
    TipoDenuncia: 'Tipo 10',
    Competencia: 'Competencia 10',
    Ratificada: 'No',
    FiscaliaAsignada: 'Fiscalía 10',
    NumLegajoAsignado: 132,
  },
];

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllDenuncias, getDatosDeFiltros } from '@/api/denuncias.api';

export const getDenunciasThunk = createAsyncThunk(
  'denuncias/getAll',
  async (body = {}, { rejectWithValue }) => {
    try {
      body = { ...body, limit: body.rows, offset: body.first };

      const { data } = await getAllDenuncias(body);

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDatosDeFiltrosThunk = createAsyncThunk(
  'denuncias/getDatosDeFiltros',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getDatosDeFiltros();

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDenunciaThunk = createAsyncThunk(
  'denuncias/get',
  async (idDenuncia, { rejectWithValue }) => {
    try {
      const denuncia = data.find((d) => d.Nro === idDenuncia);
      return denuncia;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDenunciaThunk = createAsyncThunk(
  'denuncias/delete',
  async (idDenuncia, { rejectWithValue }) => {
    try {
      // const deletedDenuncia = await ....
      return idDenuncia;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
