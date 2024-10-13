import { combineReducers } from '@reduxjs/toolkit';
import { constructorReducer } from '../slices/contructorSlice';
import { feedReducer } from '../slices/feedSlice';
import { userReducer } from '../slices/userSlice';
import { ingridientsReducer } from '../slices/ingridientsSlice';
import { orderReducer } from '../slices/orderSlice';

export const rootReducer = combineReducers({
  constructorBuild: constructorReducer,
  feed: feedReducer,
  user: userReducer,
  ingridients: ingridientsReducer,
  order: orderReducer
});
