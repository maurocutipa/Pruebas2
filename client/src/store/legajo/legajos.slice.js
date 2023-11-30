import { createSlice } from '@reduxjs/toolkit';
import {
  getLegajoThunk
} from './legajos.thunks';

const initialState = {
  loading: true,
  currentLegajo: null,
};

export const legajosSlice = createSlice({
  name: 'legajos',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      // Get All Denuncias
      .addCase(getLegajoThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLegajoThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentLegajo = payload;
      })
  },
});

export default legajosSlice.reducer;
