import React from 'react';
import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import {
  deleteIngredient,
  moveUp,
  moveDown
} from '../../slices/contructorSlice';
import { useDispatch } from '../../services/store';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveUp = () => {
      dispatch(moveUp(index));
    };
    const handleMoveDown = () => {
      dispatch(moveDown(index));
    };

    const handleClose = () => {
      dispatch(deleteIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
