/* eslint-disable no-unreachable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDenunciaData } from '@/api/data.api';

export const getDenunciaDataThunk = createAsyncThunk(
  'denuncias/getDenunciaData',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getDenunciaData();

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
