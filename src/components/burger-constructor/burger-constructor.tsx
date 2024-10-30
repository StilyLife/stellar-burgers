import React from 'react';
import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { userSelector } from '../../slices/userSlice';
import {
  deleteOrder,
  newOrder,
  orderLoadingSelector,
  orderSelector
} from '../../slices/orderSlice';
import {
  constructorSelector,
  removeConstructor
} from '../../slices/contructorSlice';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const constructorElements = useSelector(constructorSelector);
  const user = useSelector(userSelector);
  const orderModalData = useSelector(orderSelector);
  const orderRequest = useSelector(orderLoadingSelector);
  const dispatch = useDispatch();
  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorElements.bun || orderRequest) return;

    const itemId = [
      constructorElements.bun._id,
      ...constructorElements.ingredients.map((elem) => elem._id),
      constructorElements.bun._id
    ];
    dispatch(newOrder(itemId));
  };
  const closeOrderModal = () => {
    dispatch(deleteOrder());
    dispatch(removeConstructor());
  };

  const price = useMemo(
    () =>
      (constructorElements.bun ? constructorElements.bun.price * 2 : 0) +
      constructorElements.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorElements]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorElements}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
