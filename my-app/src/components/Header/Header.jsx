import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Clock from './clock/Clock';
import logo from './../common/header/logo.png';
import wallpaper from './../common/header/wallpaper.jpg';


const Header = (props) => {

  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.logo}>
          <img src={logo}></img>
        </div>
        <Clock />
        <div className={s.login}>


          




          {props.isAuth === true ? <div>
            <div className={s.menu}>
            <span className={s.menuButton} >{props.authdata.login}</span>
            <div className={s.dropMenuContent}>
              <a href="#">Link 1</a>
              <a href="#">Setting</a>
              <button onClick={props.logout} >Sing out</button>
            </div>
          </div>
            

            
          </div> : <NavLink to="/login"><div>login</div></NavLink>}
        </div>
        <div className={s.headerLinks}>
          <NavLink to="#"> Home</NavLink>
          <NavLink to="#"> Notification </NavLink>
        </div>
      </div>

      <div className={s.headerWallpaper}>
        <img src={wallpaper}></img>
      </div>

    </header>
  )
}

export default Header;