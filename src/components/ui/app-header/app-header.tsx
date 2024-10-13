import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  Logo,
  ListIcon,
  BurgerIcon,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={'primary'} />
          <Link to='/' className={styles.link}>
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </Link>
        </>
        <>
          <ListIcon type={'primary'} />
          <Link to='/feed' className={styles.link}>
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </>
      </div>
      <div className={styles.logo}>
        <Link to='/' className={styles.link}>
          <Logo className='' />
        </Link>
      </div>
      <div className={styles.link_position_last}>
        <ProfileIcon type={'primary'} />
        <p className='text text_type_main-default ml-2'>
          <Link to='/profile' className={styles.link}>
            {userName || 'Личный кабинет'}
          </Link>
        </p>
      </div>
    </nav>
  </header>
);
