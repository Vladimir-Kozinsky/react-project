import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Clock from './clock/Clock';
import logo from './../common/header/logo.png';
import wallpaper from './../common/header/wallpaper.jpg';
import HeaderDropMenu from './HeaderDropMenu/HeaderDropMenu';


const Header = (props) => {

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
            logout={props.logout}
            isAuth={props.isAuth}
            authdata={props.authdata}
            avararPhoto={props.avararPhoto} />



        </div>

      </div>



      <div className={s.headerWallpaper}>
        <img src={wallpaper}></img>
      </div>

    </header>
  )
}

export default Header;