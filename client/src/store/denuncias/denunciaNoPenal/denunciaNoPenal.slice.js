import { createSlice } from '@reduxjs/toolkit';
import { crearDenunciaNoPenalThunk } from './denunciaNoPenal.thunks';
// import {} from './denunciaNoPenal.thunks';

const initialState = {
  form: {
    idDenuncia: '',
    competencia: '',
    remision: '',
    asunto: '',
    observaciones: '',
  },
};

export const denunciaNoPenalSlice = createSlice({
  name: 'denunciaNoPenal',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(crearDenunciaNoPenalThunk.fulfilled);
  },
});

export const { resetState } = denunciaNoPenalSlice.actions;

export default denunciaNoPenalSlice.reducer;
