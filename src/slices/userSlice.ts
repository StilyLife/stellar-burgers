import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  TLoginData,
  registerUserApi,
  TRegisterData,
  forgotPasswordApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

type userState = {
  isAuthChecked: boolean;
  isLoading: boolean;
  data: TUser | null;
  success: boolean;
  password: string;
};

const initialState: userState = {
  isAuthChecked: false,
  isLoading: true,
  data: null,
  success: false,
  password: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkUserAuth: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegisterThunk.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(userRegisterThunk.fulfilled, (state, action) => {
        state.isLoading = true;
        state.data = action.payload;
      })
      .addCase(userRegisterThunk.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userLoginThunk.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.isLoading = true;
        state.data = action.payload;
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(authTokenThunk.fulfilled, (state, action) => {
        if (state.data === action.payload) {
        } else {
          state.data = action.payload;
        }
        state.isLoading = true;
      })
      .addCase(authTokenThunk.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(authTokenThunk.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.isLoading = true;
        state.success = action.payload.success;
        state.data = null;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(resetProfile.pending, (state) => {})
      .addCase(resetProfile.fulfilled, (state, action) => {
        state.data = action.payload.user;
      })
      .addCase(resetProfile.rejected, (state, action) => {});
  }
});

export const userRegisterThunk = createAsyncThunk<TUser, TRegisterData>(
  'user-register',
  async (data, { rejectWithValue }) => {
    const response = await registerUserApi(data);

    if (!response?.success) {
      return rejectWithValue(response);
    }

    const { user, refreshToken, accessToken } = response;
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  }
);

export const userLoginThunk = createAsyncThunk<TUser, TLoginData>(
  'user-login',
  async (data) => {
    const response = await loginUserApi(data);
    const { user, refreshToken, accessToken } = response;
    localStorage.setItem('refreshToken', refreshToken);
    setCookie('accessToken', accessToken);
    return user;
  }
);

export const authTokenThunk = createAsyncThunk<TUser>(
  'auth-user',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await getUserApi();
      if (!response.success) {
        deleteCookie('accessToken');
        rejectWithValue('Ошибка валидности токена');
      }
      return response.user;
    } catch (error) {
      return rejectWithValue('Ошибка получения пользователя');
    }
  }
);

export const logoutThunk = createAsyncThunk('user-logout', async () => {
  const response = await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
  return response;
});

export const resetProfile = createAsyncThunk('reset-user', updateUserApi);

export const forgotPassword = createAsyncThunk(
  'forgot-password',
  forgotPasswordApi
);

export const userReducer = userSlice.reducer;
export const { checkUserAuth } = userSlice.actions;
