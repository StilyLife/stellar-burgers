import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';

type orderState = {
  ingridients: string[];
  isLoading: boolean;
  data: TOrder | null;
  request: boolean;
  success: boolean;
  orders: TOrder[];
  orderView: TOrder[];
};

const initialState: orderState = {
  ingridients: [],
  isLoading: true,
  data: null,
  request: false,
  success: false,
  orders: [],
  orderView: []
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: {
      prepare: (payload: string[]) => ({
        payload: { ...payload }
      }),

      reducer: (state, action: PayloadAction<string[]>) => {
        state.ingridients = action.payload;
      }
    },
    resetOrder: {
      prepare: (payload?) => ({
        payload: { payload }
      }),

      reducer: (state) => {
        state.data = null;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderCreate.pending, (state) => {
        state.isLoading = false;
        state.request = true;
      })
      .addCase(orderCreate.fulfilled, (state, action) => {
        state.data = action.payload.order;
        state.isLoading = true;
        localStorage.removeItem('ingridients');
        state.success = action.payload.success;
        state.request = false;
      })
      .addCase(orderCreate.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(orderHistory.fulfilled, (state, action) => {
        state.isLoading = true;
        state.orders = action.payload;
      })
      .addCase(orderHistory.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(orderHistory.rejected, (state, action) => {
        state.isLoading = true;
      })
      .addCase(orderByNumber.fulfilled, (state, action) => {
        state.isLoading = true;
        state.orderView = action.payload.orders;
      })
      .addCase(orderByNumber.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(orderByNumber.rejected, (state, action) => {
        state.isLoading = true;
      });
  }
});

export const orderCreate = createAsyncThunk(
  'order-ingridients',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

export const orderHistory = createAsyncThunk('order-history', getOrdersApi);
export const orderByNumber = createAsyncThunk(
  'order-byNumber',
  async (data: number) => {
    const response = await getOrderByNumberApi(data);
    return response;
  }
);

export const orderReducer = orderSlice.reducer;
export const { resetOrder } = orderSlice.actions;
