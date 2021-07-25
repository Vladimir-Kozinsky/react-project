import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Clock from './clock/Clock';
import logo from './../common/header/logo.png';
import wallpaper from './../common/header/wallpaper.jpg';


const Header = (props) => {

  const dropMenu = () => {
    document.getElementById('qq').style.display = 'block';
  }
  const hideMenu = () => {
    document.getElementById('qq').style.display = 'none';
  }

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
              <button className={s.avaButton}
                onClick={dropMenu}
                autoFocus={true}
                onBlur={hideMenu} >{props.avararPhoto
                  ? <img src={props.avararPhoto} alt="" />
                  : <span>Photo</span>}
              </button>
              <div id="qq" className={s.dropMenuContent}>
                <NavLink to="/profile" >{props.authdata.login}</NavLink>
                <a href="#">Link 1</a>
                <a href="#">Setting</a>
              </div>
              <button onClick={props.logout} >Sing out</button>
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