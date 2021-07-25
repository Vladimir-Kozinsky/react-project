import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Clock from './clock/Clock';
import logo from './../common/header/logo.png';
import wallpaper from './../common/header/wallpaper.jpg';
import settingImg from './../common/header/settingImg.png';


const Header = (props) => {


  return (
    <header className={s.header}>
      <div className={s.headerContainer}>

        <div className={s.headerLinks}>
          <NavLink to="#"> Home</NavLink>
          <NavLink to="#"> Notification </NavLink>
        </div>

        <div className={s.logo}>
          <img src={logo}></img>
        </div>

        <Clock />

        <div className={s.loginContainer}>
          {props.isAuth === true
            ? <div className={s.login}>
              <div className={s.avaPhoto}>{props.avararPhoto
                ? <img src={props.avararPhoto} alt="" />
                : <span>Photo</span>}
              </div>
              <div className={s.dropMenuContent}>
                <div className={s.dropMenubox}>

                  <NavLink className={s.boxNavLink} to="/profile" >{props.authdata.login}</NavLink>

                </div>

                <div className={s.dropMenubox}>



                </div>

                <div className={s.dropMenubox}>

                  <div className={s.dropMenuboxContainer}>
                    <div>
                      <img src={settingImg} alt="img" />
                    </div>
                    <div>
                      <NavLink className={s.boxNavLink} to="/setting" >Setting</NavLink>
                    </div>
                  </div>

                  <div className={s.dropMenuboxContainer}>
                    <div>
                      <img src={settingImg} alt="img" />
                    </div>
                    <div>
                      <span className={s.boxNavLink} onClick={props.logout} >Sing out</span>
                    </div>
                  </div>


                </div>
              </div>
            </div>

            : <NavLink to="/login"><div>login</div></NavLink>}
        </div>

      </div>

      <div className={s.headerWallpaper}>
        <img src={wallpaper}></img>
      </div>

    </header>
  )
}

export default Header;