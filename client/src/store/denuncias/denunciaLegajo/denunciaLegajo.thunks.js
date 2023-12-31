/* eslint-disable no-unreachable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDenunciadosParaLegajo,
  crearDenunciaLegajo,
  getAccionTomada,
  getProfesionalesParaLegajo,
} from '@/api/legajo.api';

export const getDenunciadosParaLegajoThunk = createAsyncThunk(
  'denunciaLegajo/getDenunciadosParaLegajo',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getDenunciadosParaLegajo(id);

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProfesionalesParaLegajoThunk = createAsyncThunk(
  'legajos/getProfesionalesParaLegajo',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getProfesionalesParaLegajo(id);
      
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const crearDenunciaLegajoThunk = createAsyncThunk(
  'denunciaLegajo/crearDenunciaLegajo',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await crearDenunciaLegajo(formData);

      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAccionTomadaThunk = createAsyncThunk(
  'legajo/getAccionTomada',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await getAccionTomada(formData);

      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
