/* eslint-disable no-unreachable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDenunciadosParaLegajo,
  crearDenunciaLegajo,
  getAccionTomada,
} from '@/api/legajo.api';

export const getDenunciadosParaLegajoThunk = createAsyncThunk(
  'legajo/getDenunciadosParaLegajo',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getDenunciadosParaLegajo(id);

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const crearDenunciaLegajoThunk = createAsyncThunk(
  'legajo/crearDenunciaLegajo',
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
