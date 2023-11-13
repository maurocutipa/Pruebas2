import { createSlice } from '@reduxjs/toolkit';
import { getDenunciadosParaLegajoThunk } from './legajo.thunks';

const initialState = {
  loading: false,
  // Datos usados para crear el legajo
  legajoData: {
    denunciados: [],
  },
};

export const legajoSlice = createSlice({
  name: 'legajo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getDenunciadosParaLegajoThunk.fulfilled,
      (state, { payload }) => {
        state.legajoData.denunciados = payload.denunciados;
      }
    );
  },
});

export default legajoSlice.reducer;
