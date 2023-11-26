/* eslint-disable no-unreachable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ratificarDenuncia, getResumenDenuncia } from '@/api/denuncias.api';

export const ratificarDenunciaThunk = createAsyncThunk(
  'ratificarDenuncia/ratificarDenuncia',
  async (idDenuncia, { rejectWithValue }) => {
    try {
      await ratificarDenuncia(idDenuncia);

      return idDenuncia;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getResumenDenunciaThunk = createAsyncThunk(
  'ratificarDenuncia/getResumenDenuncia',
  async (idDenuncia, { rejectWithValue }) => {
    try {
      const { data } = await getResumenDenuncia(idDenuncia);

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
