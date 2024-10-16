import React from 'react';
import { TTabMode, TIngredient } from '@utils-types';
import { useState, useRef, useEffect, FC, SyntheticEvent } from 'react';
import { useSelector } from '../../services/store';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useInView } from 'react-intersection-observer';
import {
  ingredientsSelector,
  ingredientsReducer
} from '../../slices/ingridientsSlice';
import { useDispatch } from 'react-redux';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector(ingredientsSelector);
  const mains = ingredients.filter((ingredient) => ingredient.type === 'main');
  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);
  const dispatch = useDispatch();

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
