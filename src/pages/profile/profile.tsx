import React from 'react';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { ProfileUI } from '@ui-pages';
import { getCookie } from '../../utils/cookie';
import { resetProfile } from '../../slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formValue, setFormValue] = useState({
    name: user.data?.name || '',
    email: user.data?.email || '',
    password: user.password
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user.data?.name || '',
      email: user.data?.email || '',
      password: user.password
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user.data?.name ||
    formValue.email !== user.data?.email ||
    formValue.password !== user.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newUser = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password
    };
    const newPassword = {
      password: formValue.password,
      token: JSON.stringify(getCookie('accessToken'))
    };
    dispatch(resetProfile(newUser));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.data?.name || '',
      email: user.data?.email || '',
      password: user.password
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
