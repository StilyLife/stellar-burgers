import {
  initialState,
  constructorSlice,
  TconstructorSlice,
  addIngredient,
  deleteIngredient,
  moveUp,
  moveDown,
  removeConstructor
} from './contructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe('constructorSlice', () => {
  const testIngredientMain: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const testConstructorIngredientSauce: TConstructorIngredient = {
    id: '643d69a5c3f7b9001cfa0942',
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  const testConstructorIngredient: TConstructorIngredient = {
    ...testIngredientMain,
    id: ''
  };

  it('addIngredient', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addIngredient(testIngredientMain)
    );

    testConstructorIngredient.id = newState.ingredients[0].id;

    expect(newState.ingredients).toEqual([testConstructorIngredient]);
  });

  it('addIngredient with bun', () => {
    const testBun: TIngredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    const newState = constructorSlice.reducer(
      initialState,
      addIngredient(testBun)
    );

    expect(newState.bun).toEqual({ ...testBun, id: expect.any(String) });
  });

  it('deleteIngredient', () => {
    const initialStateTest: TconstructorSlice = {
      ...initialState,
      ingredients: [testConstructorIngredientSauce]
    };
    const action = deleteIngredient(testConstructorIngredientSauce);
    const state = constructorSlice.reducer(initialStateTest, action);

    expect(state.ingredients).toEqual([]);
  });

  it('moveUp', () => {
    const initialStateTest: TconstructorSlice = {
      ...initialState,
      ingredients: [testConstructorIngredient, testConstructorIngredientSauce]
    };

    const action = moveUp(1);
    const state = constructorSlice.reducer(initialStateTest, action);
    expect(state.ingredients).toEqual([
      testConstructorIngredientSauce,
      testConstructorIngredient
    ]);
  });

  it('moveDown', () => {
    const initialStateTest: TconstructorSlice = {
      ...initialState,
      ingredients: [testConstructorIngredient, testConstructorIngredientSauce]
    };

    const action = moveDown(0);
    const state = constructorSlice.reducer(initialStateTest, action);
    expect(state.ingredients).toEqual([
      testConstructorIngredientSauce,
      testConstructorIngredient
    ]);
  });

  it('removeConstructor', () => {
    const initialStateTest: TconstructorSlice = {
      ingredients: [testConstructorIngredient, testConstructorIngredientSauce],
      bun: {
        _id: '643d69a5c3f7b9001cfa093c',
        id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
    };

    const action = removeConstructor();
    const state = constructorSlice.reducer(initialStateTest, action);
    expect(state).toEqual(initialState);
  });
});
