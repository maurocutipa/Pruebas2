/* eslint-disable no-unreachable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDenunciadosParaLegajo,
  crearDenunciaLegajo,
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

      console.log(data);
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
