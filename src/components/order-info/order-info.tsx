import React from 'react';
import { FC, useEffect, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { getOrderByNumber, orderFeedSelector } from '../../slices/feedSlice';
import { OrderInfoUI } from '../ui/order-info';
import { useDispatch, useSelector } from '../../services/store';
import { ingredientsSelector } from '../../slices/ingridientsSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByNumber(Number(number)));
  }, []);
  const orderData = useSelector(orderFeedSelector);

  const ingredients: TIngredient[] = useSelector(ingredientsSelector);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
