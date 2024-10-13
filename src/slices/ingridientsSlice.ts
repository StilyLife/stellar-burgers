import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

type ingridientsState = {
  isLoading: boolean;
  data: TIngredient[];
};

const initialState: ingridientsState = {
  data: [],
  isLoading: false
};

const ingridientsSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  selectors: {
    getIngridientById: (state, action: PayloadAction<string | undefined>) => {
      state.data.find((element) => {
        element._id === action.payload;
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(ingridientsThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(ingridientsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(ingridientsThunk.rejected, (state, action) => {
      state.isLoading = false;
    });
  }
});

export const ingridientsReducer = ingridientsSlice.reducer;
export const { getIngridientById } = ingridientsSlice.selectors;
export const ingridientsThunk = createAsyncThunk('ingridients', async () =>
  getIngredientsApi()
);
