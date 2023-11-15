/* eslint-disable no-unreachable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDenunciadosParaLegajo } from '@/api/legajo.api';

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
