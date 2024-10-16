import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser, TOrder } from '@utils-types';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  getOrdersApi,
  TRegisterData
} from '../utils/burger-api';
import { deleteCookie, setCookie } from '../utils/cookie';

export interface userState {
  user: TUser | null;
  isAuth: boolean;
  error: string | null | undefined;
  orders: TOrder[];
}

export const initialState: userState = {
  user: null,
  isAuth: false,
  error: null,
  orders: []
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);

export const loginUser = createAsyncThunk('users/loginUser', loginUserApi);
export const logoutUser = createAsyncThunk('users/logoutUser', logoutApi);
export const getUser = createAsyncThunk('users/getUser', getUserApi);
export const updateUser = createAsyncThunk('users/updateUser', updateUserApi);
export const getOrders = createAsyncThunk('users/getOrders', getOrdersApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    userSelector: (state) => state.user,
    isAuthSelector: (state) => state.isAuth,
    userOrderSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
        state.isAuth = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
        state.isAuth = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message; //
        state.isAuth = false;
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.error = null;
        state.user = null;
        state.isAuth = true;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.error = null; //
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message; //
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message; //
      })
      .addCase(getOrders.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message; //
      });
  }
});

export const userReducer = userSlice.reducer;
export const { userSelector, isAuthSelector, userOrderSelector } =
  userSlice.selectors;
