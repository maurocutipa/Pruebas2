import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, logouthThunk, refreshThunk } from './auth.thunks';

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
      .addCase(logouthThunk.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.message = '';
      })
      .addCase(logouthThunk.rejected, (state) => {
        state.loading = false;
      });
  },
  // extraReducers: {
  //   // LOGIN THUNK: Seteamos el usuario, se almacena en cookies el token
  //   [loginThunk.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [loginThunk.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     state.message = payload.message;
  //     state.user = payload.data;
  //     console.log({ login: state.user });
  //   },
  //   [loginThunk.rejected]: (state, { payload }) => {
  //     state.loading = false;
  //     state.message = payload.message;
  //   },
  //   // REFRESH THUNK: Seteamos el usuario, se almacena en cookies el nuevo token
  //   [refreshThunk.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [refreshThunk.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     state.user = payload.data;
  //     console.log({ refresh: state.user });
  //   },
  //   [refreshThunk.rejected]: (state, { payload }) => {
  //     state.loading = false;
  //     state.message = payload.message;
  //   },
  //   // LOGOUT THUNK: Seteamos a null el usuario en el sistema, se elimina el token de cookies
  //   [logouthThunk.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [logouthThunk.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     state.message = payload.message;
  //     state.user = null;
  //     console.log({ logout: state.user });
  //   },
  //   [logouthThunk.rejected]: (state, { payload }) => {
  //     state.loading = false;
  //     state.message = payload.message;
  //   },
  // },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
