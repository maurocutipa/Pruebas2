/* eslint-disable no-unreachable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDelitos, getDenunciaData } from '@/api/data.api';

export const getDenunciaDataThunk = createAsyncThunk(
  'data/getDenunciaData',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getDenunciaData();

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDelitosThunk = createAsyncThunk(
  'data/getDelitos',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getDelitos();

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
