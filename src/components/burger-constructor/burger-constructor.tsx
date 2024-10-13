import React from 'react';
import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { orderCreate, resetOrder } from '../../slices/orderSlice';
import { clearStorage } from '../../slices/contructorSlice';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const constructorItems = useSelector((state) => state.constructorBuild);
  const location = useLocation();
  const orderData = useSelector((state) => state.order);
  const orderRequest = orderData.request;
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const onOrderClick = () => {
    if (!user) {
      return navigate('/login');
    } else {
      if (!constructorItems.bun || orderRequest) return;
      const data: string[] = [];
      data.push(constructorItems.bun._id);
      data.push(constructorItems.bun._id);
      constructorItems.ingredients.forEach((e) => {
        data.push(e._id);
      });
      dispatch(orderCreate(data)).finally(() => {
        dispatch(clearStorage());
      });
    }
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderData.data}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
