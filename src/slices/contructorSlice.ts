import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type constructorSlice = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
};

export const initialState: constructorSlice = {
  ingredients: [],
  bun: null
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    removeConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveUp: (state, action: PayloadAction<number>) => {
      [
        state.ingredients[action.payload],
        state.ingredients[action.payload - 1]
      ] = [
        state.ingredients[action.payload - 1],
        state.ingredients[action.payload]
      ];
    },
    moveDown: (state, action: PayloadAction<number>) => {
      [
        state.ingredients[action.payload],
        state.ingredients[action.payload + 1]
      ] = [
        state.ingredients[action.payload + 1],
        state.ingredients[action.payload]
      ];
    }
  },
  selectors: {
    constructorSelector: (state) => state
  }
});

export const constructorReducer = constructorSlice.reducer;
export const {
  addIngredient,
  deleteIngredient,
  removeConstructor,
  moveUp,
  moveDown
} = constructorSlice.actions;
export const { constructorSelector } = constructorSlice.selectors;
