import React from 'react';
import { FC, useEffect, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { orderByNumber } from '../../slices/orderSlice';
import { OrderInfoUI } from '../ui/order-info';
import { useDispatch, useSelector } from '../../services/store';

export const OrderInfo: FC = () => {
  const orderNumber = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderByNumber(Number(orderNumber.number)));
  }, []);
  const orderViewData = useSelector((state) => state.order.orderView);
  const orderData = orderViewData[0];

  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingridients.data
  );

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
