import React from 'react';
import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { TBurgerIngredientProps } from './type';
import { BurgerIngredientUI } from '@ui';
import { addIngridient } from '../../slices/contructorSlice';
import { AppDispatch, useDispatch } from '../../services/store';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    let location = useLocation();
    const handleAdd = () => {
      dispatch(addIngridient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
