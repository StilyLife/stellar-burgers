import React from 'react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { ingredientsSelector } from '../../slices/ingridientsSlice';
import { useSelector } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const ingredientData = useSelector(ingredientsSelector).find(
    (item) => item._id === useParams().id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
