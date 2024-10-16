import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export interface ingredientsState {
  ingredients: TIngredient[];
  error: string | null | undefined;
  loading: boolean;
}

const initialState: ingredientsState = {
  ingredients: [],
  error: null,
  loading: false
};

export const getIngredientsApiThunk = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    ingredientsLoadingSelector: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsApiThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredientsApiThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredientsApiThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { ingredientsSelector, ingredientsLoadingSelector } =
  ingredientsSlice.selectors;
