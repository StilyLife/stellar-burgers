import React from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
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
import { useDispatch, useSelector } from '../../services/store';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useEffect } from 'react';
import { getIngredientsApiThunk } from '../../slices/ingridientsSlice';
import { orderFeedSelector, ordersFeedSelector } from '../../slices/feedSlice';
import { getUser } from '../../slices/userSlice';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const background = location.state?.background;
  const orderData = useSelector(orderFeedSelector);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredientsApiThunk());
  }, []);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/feed/:number'
            element={
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-large ${styles.detailHeader}`}
                >
                  {'#' + String(orderData?.number).padStart(6, '0')}
                </p>
                <OrderInfo />
              </div>
            }
          />
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
            <Route
              path='orders/:number'
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path='/ingredients/:id'
            element={
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-large ${styles.detailHeader}`}
                >
                  Детали ингредиента
                </p>
                <IngredientDetails />
              </div>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal
                  title={'#' + String(orderData?.number).padStart(6, '0')}
                  onClose={() => navigate(background)}
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal
                    title='Детали заказа'
                    onClose={() => navigate(background)}
                  >
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title='Детали ингредиентов'
                  onClose={() => navigate(background)}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
