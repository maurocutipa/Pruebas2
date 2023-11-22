import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, refreshThunk } from './auth.thunks';

const initialState = {
  user: null,
  loading: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
        state.user = payload.data;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.message = payload.message;
        state.loading = false;
      })
      // REFRESH TOKEN
      .addCase(refreshThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.data;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.loading = false;
      })
      // LOGOUT
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.message = '';
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
