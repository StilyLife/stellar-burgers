import React from 'react';
import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { Preloader } from '@ui';
import { orderHistory } from '../../slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const data = useSelector((state) => state.order);
  const orders: TOrder[] = data.orders;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderHistory());
  }, []);
  if (!data.isLoading) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
