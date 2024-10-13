import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useEffect } from 'react';
import { ingridientsThunk } from '../../slices/ingridientsSlice';
import { authTokenThunk, checkUserAuth } from '../../slices/userSlice';
import { useDispatch } from '../../services/store';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const clickModalClose = () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(authTokenThunk()).finally(() => dispatch(checkUserAuth()));
    dispatch(ingridientsThunk());
  }, []);
  let background = location.state && location.state.background;

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route path='/profile'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal
                  title={'Детали заказа'}
                  onClose={clickModalClose}
                  children={<OrderInfo />}
                />
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal
                  title={'Детали заказа'}
                  onClose={clickModalClose}
                  children={<OrderInfo />}
                />
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title={'Детали ингредиента'}
                  onClose={clickModalClose}
                  children={<IngredientDetails />}
                />
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
