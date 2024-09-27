import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    pending: (state) => {
      state.isLoading = true;
    },
    fulfilled: (state, action) => {
      state.user = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    rejected: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { reset, pending, fulfilled, rejected, logout } =
  authSlice.actions;

export default authSlice.reducer;
