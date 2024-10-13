import React from 'react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { useSelector } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const ingridientId = useParams();
  const data = useSelector((state) =>
    state.ingridients.data.find((e) => e._id === ingridientId.id)
  );
  const ingredientData = data;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
