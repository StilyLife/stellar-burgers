import { combineReducers } from '@reduxjs/toolkit';
import { constructorReducer } from '../slices/contructorSlice';
import { feedReducer } from '../slices/feedSlice';
import { userReducer } from '../slices/userSlice';
import { ingredientsReducer } from '../slices/ingridientsSlice';
import { orderReducer } from '../slices/orderSlice';

export const rootReducer = combineReducers({
  constructorBuild: constructorReducer,
  feed: feedReducer,
  user: userReducer,
  ingridients: ingredientsReducer,
  order: orderReducer
});
