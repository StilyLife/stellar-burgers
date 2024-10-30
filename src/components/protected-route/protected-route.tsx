import React from 'react';
import { Preloader } from '@ui';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router';
import { userSelector, isAuthSelector } from '../../slices/userSlice';
import { useSelector } from 'react-redux';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector(isAuthSelector);
  const user = useSelector(userSelector);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from ?? { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
