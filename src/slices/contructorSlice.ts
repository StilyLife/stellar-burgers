import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 } from 'uuid';

type TConstructorState = {
  ingredients: TConstructorIngredient[];
  bun: TIngredient | null;
};
type TMove = {
  index: number;
  side: string;
};

const data = localStorage.getItem('ingridients');
const initialState: TConstructorState = JSON.parse(
  data || '{"bun":null,"ingredients":[]}'
);

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngridient: {
      prepare: (payload: TIngredient) => ({
        payload: { ...payload, id: v4() }
      }),
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
        localStorage.setItem('ingridients', JSON.stringify(state));
      }
    },
    clearStorage: {
      prepare: (payload?) => ({
        payload: { payload }
      }),
      reducer: (state) => {
        state.bun = null;
        state.ingredients = [];
        localStorage.removeItem('ingridients');
      }
    },
    deleteIngridient: {
      prepare: (payload: number) => ({
        payload: payload
      }),
      reducer: (state, action: PayloadAction<number>) => {
        state.ingredients.splice(action.payload, 1);
        localStorage.setItem('ingridients', JSON.stringify(state));
      }
    },
    moveIngrident: {
      prepare: (payload: TMove) => ({
        payload: payload
      }),
      reducer: (state, action: PayloadAction<TMove>) => {
        switch (action.payload.side) {
          case 'up':
            [
              state.ingredients[action.payload.index - 1],
              state.ingredients[action.payload.index]
            ] = [
              state.ingredients[action.payload.index],
              state.ingredients[action.payload.index - 1]
            ];
            break;
          case 'down':
            [
              state.ingredients[action.payload.index],
              state.ingredients[action.payload.index + 1]
            ] = [
              state.ingredients[action.payload.index + 1],
              state.ingredients[action.payload.index]
            ];
        }
        localStorage.setItem('ingridients', JSON.stringify(state));
      }
    }
  },
  selectors: {
    getConstructor: (state) => state,
    getOrder: (state) => {
      const data = [];
      data.push(state.bun);
      state.ingredients.forEach((e) => {
        data.push(e);
      });
      return data;
    }
  }
});

export const constructorReducer = constructorSlice.reducer;
export const { getConstructor, getOrder } = constructorSlice.selectors;
export const { addIngridient, clearStorage, deleteIngridient, moveIngrident } =
  constructorSlice.actions;
