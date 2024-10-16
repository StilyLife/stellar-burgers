import { FC } from 'react';
import React from 'react';
import { OrderCard } from '@components';
import styles from './orders-list.module.css';
import { OrdersListUIProps } from './type';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => (
  <div className={`${styles.content}`}>
    {orderByDate.map((order) => (
      <OrderCard order={order} key={order._id} />
    ))}
  </div>
);
