import { createSlice } from "@reduxjs/toolkit";
import {
    getPersonasThunks,
    getGruposThunks
  } from './personas.thunks';


const initialState = {
  loading: true,
  personas: [],
  grupos: [],
  notificaciones: []
};

export const personasSlice = createSlice({
  name: "personas",
  initialState,
  reducers: {
    setNotificaciones: (state, { payload }) => {
      state.notificaciones = payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Get All Personas
      .addCase(getPersonasThunks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPersonasThunks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.personas = payload
      })
      .addCase(getPersonasThunks.rejected, (state) => {
        state.loading = false;
      })
      // Get Grupos
      .addCase(getGruposThunks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGruposThunks.fulfilled, (state, { payload }) => {
        state.grupos = payload
        state.loading = false;
      })
      .addCase(getGruposThunks.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const { setNotificaciones } = personasSlice.actions;


export default personasSlice.reducer;
