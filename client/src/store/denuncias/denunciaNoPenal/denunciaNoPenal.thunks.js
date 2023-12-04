import { createAsyncThunk } from '@reduxjs/toolkit';
import { crearDenunciaNoPenal } from '@/api/legajo.api';

export const crearDenunciaNoPenalThunk = createAsyncThunk(
  'denunciaNoPenal/crearDenunciaNoPenal',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await crearDenunciaNoPenal(formData);

      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
