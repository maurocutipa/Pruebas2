import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, refresh } from '@/api/auth.api';

// data: { message, data: { uid, username, roles }}
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await login(body);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
