import { rootReducer } from './store';
import { constructorSlice } from '../slices/contructorSlice';
import { feedSlice } from '../slices/feedSlice';
import { ingredientsSlice } from '../slices/ingridientsSlice';
import { orderSlice } from '../slices/orderSlice';
import { userSlice } from '../slices/userSlice';

describe('rootReducer', () => {
  it('stores all slices', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toHaveProperty(constructorSlice.name);
    expect(state).toHaveProperty(feedSlice.name);
    expect(state).toHaveProperty(ingredientsSlice.name);
    expect(state).toHaveProperty(orderSlice.name);
    expect(state).toHaveProperty(userSlice.name);
  });
});
