import { createSlice } from '@reduxjs/toolkit';
import { getPasesThunk } from './pases.thunks';

const initialState = {
  loading: false,
  pases: [],
};

export const pasesSlice = createSlice({
  name: 'pases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPasesThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.pases = payload;
    });
  },
});

// export const { setIdDenuncia } = denunciasSlice.actions;

export default pasesSlice.reducer;
