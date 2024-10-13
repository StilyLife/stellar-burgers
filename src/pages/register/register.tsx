import React from 'react';
import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import { userRegisterThunk } from '../../slices/userSlice';
import { AppDispatch, useDispatch } from '../../services/store';

export const Register: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const data = { name: userName, email: email, password: password };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      dispatch(userRegisterThunk(data));
      navigate('/profile');
    } catch {}
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
