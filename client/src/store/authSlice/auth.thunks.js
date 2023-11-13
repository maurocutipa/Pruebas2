import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, refresh } from '@/api/auth.api';

// data: { message, data: { uid, username, roles }}
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body, { rejectWithValue }) => {
    try {
      let dataFake = null;
      if (body.email !== 'admin@admin' || body.password !== 'admin') {
        throw new Error('Usuario o contraseña incorrecta');
      }

      // const { data } = await login(body);

      dataFake = { username: 'ADMIN', id: 123 };
      return { data: dataFake, message: 'Login exitoso' };
    } catch (error) {
      console.log(error.message);
      // return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);

// data: { message, data: { uid, username, roles }}
export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await refresh();
      return data;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

// data: { message: string }
export const logouthThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await logout();
      return data;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);
