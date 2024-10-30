import React from 'react';
import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSelector } from '../../slices/userSlice';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useSelector(userSelector)?.name} />
);
