import {
  initialState,
  userSlice,
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  getOrders
} from './userSlice';
import { TUser, TOrder } from '@utils-types';
import { setCookie, deleteCookie } from '../utils/cookie';

describe('userSlice', () => {
  beforeAll(() => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: ''
    });
  });

  it('registerUser.fulfilled', () => {
    const testUser: TUser = {
      email: 'test@test.com',
      name: 'Test User'
    };

    const testResponse = {
      success: true,
      user: testUser,
      accessToken: 'testAccessToken',
      refreshToken: 'testRefreshToken'
    };

    const action = {
      type: registerUser.fulfilled.type,
      payload: testResponse
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(testUser);
    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
  });

  it('registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'error' }
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.user).toBe(null);
    expect(state.isAuth).toBe(false);
    expect(state.error).toBe('error');
  });

  it('registerUser.pending', () => {
    const action = {
      type: registerUser.pending.type
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe(null);
    expect(state.isAuth).toBe(true);
  });

  it('loginUser.fulfilled', () => {
    const testUser: TUser = {
      email: 'test@test.com',
      name: 'Test User'
    };

    const testResponse = {
      success: true,
      user: testUser,
      accessToken: 'testAccessToken',
      refreshToken: 'testRefreshToken'
    };

    const action = {
      type: loginUser.fulfilled.type,
      payload: testResponse
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(testUser);
    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
  });

  it('loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'error' }
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.user).toBe(null);
    expect(state.isAuth).toBe(false);
    expect(state.error).toBe('error');
  });

  it('loginUser.pending', () => {
    const action = {
      type: loginUser.pending.type
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe(null);
    expect(state.isAuth).toBe(true);
  });

  it('logoutUser.fulfilled', () => {
    const action = {
      type: logoutUser.fulfilled.type
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.user).toBe(null);
    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
  });

  it('logoutUser.rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: 'error' }
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe('error');
  });

  it('logoutUser.pending', () => {
    const action = {
      type: logoutUser.pending.type
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe(null);
  });

  it('getUser.fulfilled', () => {
    const testUser: TUser = {
      email: 'test@test.com',
      name: 'Test User'
    };

    const testResponse = {
      success: true,
      user: testUser
    };

    const action = {
      type: getUser.fulfilled.type,
      payload: testResponse
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(testUser);
    expect(state.isAuth).toBe(true);
    expect(state.error).toBe(null);
  });

  it('getUser.rejected', () => {
    const action = {
      type: getUser.rejected.type,
      error: { message: 'error' }
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.user).toBe(null);
    expect(state.error).toBe('error');
  });

  it('getUser.pending', () => {
    const action = {
      type: getUser.pending.type
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe(null);
    expect(state.isAuth).toBe(true);
  });

  it('updateUser.fulfilled', () => {
    const testUser: TUser = {
      email: 'test@test.com',
      name: 'Test User'
    };

    const testResponse = {
      success: true,
      user: testUser
    };

    const action = {
      type: updateUser.fulfilled.type,
      payload: testResponse
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(testUser);
    expect(state.error).toBe(null);
  });

  it('updateUser.rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'error' }
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe('error');
  });

  it('updateUser.pending', () => {
    const action = {
      type: updateUser.pending.type
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe(null);
    expect(state.isAuth).toBe(true);
  });

  it('getOrders.fulfilled', () => {
    const testOrders: TOrder[] = [
      {
        _id: '1',
        ingredients: ['1', '2', '3'],
        status: 'done',
        name: 'test',
        createdAt: 'test',
        updatedAt: 'test',
        number: 1
      }
    ];

    const action = {
      type: getOrders.fulfilled.type,
      payload: testOrders
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.orders).toEqual(testOrders);
    expect(state.error).toBe(null);
  });

  it('getOrders.rejected', () => {
    const action = {
      type: getOrders.rejected.type,
      error: { message: 'error' }
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe('error');
  });

  it('getOrders.pending', () => {
    const action = {
      type: getOrders.pending.type
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe(null);
    expect(state.isAuth).toBe(true);
  });
});
