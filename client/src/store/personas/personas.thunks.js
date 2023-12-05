/* eslint-disable no-unreachable */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPersonas, getGrupos } from "@/api/personas.api";

export const getPersonasThunks = createAsyncThunk(
  "personas/getPersonas",
  async (body = {}, { rejectWithValue }) => {
    try {
      const { data } = await getPersonas(body);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getGruposThunks = createAsyncThunk(
  "personas/getGrupos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getGrupos();

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
