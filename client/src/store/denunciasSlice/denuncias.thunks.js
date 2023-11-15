/* eslint-disable no-unreachable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllDenuncias,
  getDenunciaById,
  deleteDenuncia,
  ratificarDenuncia
} from '@/api/denuncias.api';

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

export const getDenunciaByIdThunk = createAsyncThunk(
  'denuncias/get',
  async (idDenuncia, { rejectWithValue }) => {
    try {
      const { data } = await getDenunciaById(idDenuncia);
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDenunciaThunk = createAsyncThunk(
  'denuncias/deleteDenuncia',
  async (idDenuncia, { rejectWithValue }) => {
    try {
      const { data } = await deleteDenuncia(idDenuncia);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ratificarDenunciaThunk = createAsyncThunk(
  'denuncias/ratificarDenuncia',
  async (idDenuncia, { rejectWithValue }) => {
    try {
      await ratificarDenuncia(idDenuncia);

      return idDenuncia;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
