import React from 'react';
import { FC } from 'react';
import { ProfileMenuUI } from '@ui';
import { useLocation } from 'react-router-dom';
import { logoutUser } from '../../slices/userSlice';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
