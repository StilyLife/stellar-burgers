import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { userLoginThunk } from '../../slices/userSlice';
import { AppDispatch, useDispatch } from '../../services/store';

export const Login: FC = () => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const data = { email, password };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(userLoginThunk(data)).then(() => {
      if (location?.state?.from === '/login') {
        return navigate('/profile');
      }
      return navigate(location?.state?.from);
    });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
