import React from 'react';
import { FC, useEffect } from 'react';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { Preloader } from '@ui';
import { feedThunk } from '../../slices/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.feed);
  const orders: TOrder[] = data.orders;
  useEffect(() => {
    dispatch(feedThunk());
  }, []);
  const handleUpdate = () => {
    dispatch(feedThunk());
  };

  if (isLoading) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleUpdate} />;
};
