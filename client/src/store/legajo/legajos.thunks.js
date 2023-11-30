/* eslint-disable no-unreachable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getLegajo
} from '@/api/legajo.api';

export const getLegajoThunk = createAsyncThunk(
  'legajos/getLegajo',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getLegajo(id);
      
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);