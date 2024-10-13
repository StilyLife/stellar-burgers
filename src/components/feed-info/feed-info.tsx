import React from 'react';
import { FC } from 'react';
import { TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const data = useSelector((state) => state.feed.data);
  const pendingOrders = getOrders(data.orders, 'pending');
  const readyOrders = getOrders(data.orders, 'done');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={data}
    />
  );
};
