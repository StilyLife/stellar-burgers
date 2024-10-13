import React from 'react';
import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { deleteIngridient, moveIngrident } from '../../slices/contructorSlice';
import { useDispatch } from '../../services/store';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveUp = () => {
      dispatch(moveIngrident({ index: index, side: 'up' }));
    };
    const handleMoveDown = () => {
      dispatch(moveIngrident({ index: index, side: 'down' }));
    };

    const handleClose = () => {
      dispatch(deleteIngridient(index));
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
