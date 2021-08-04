import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Clock from './clock/Clock';
import logo from './../common/header/logo.png';
import HeaderDropMenu from './HeaderDropMenu/HeaderDropMenu';
import React from 'react';

type PropsType = {
  logout: () => void,
  isAuth: boolean,
  authdata: any,
  avatarPhoto: string
}

const Header: React.FC<PropsType> = ({ logout, isAuth, authdata, avatarPhoto }) => {
  return (
    <header className={s.header}>
      <div className={s.headerNavPanel}>
        <div className={s.headerContainer}>
          <div className={s.headerLinks}>
            <NavLink to="#"> Home</NavLink>
            <NavLink to="#"> Notification </NavLink>
          </div>
          <div className={s.logo}>
            <img src={logo}></img>
          </div>
          <Clock />
          <HeaderDropMenu
            logout={logout}
            isAuth={isAuth}
            authdata={authdata}
            avatarPhoto={avatarPhoto} />
        </div>
      </div>
      <div className={s.headerWallpaper}>
      </div>
    </header>
  )
}

export default Header;