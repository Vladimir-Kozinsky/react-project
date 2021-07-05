import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {

  return (
    <header className={s.header}>
      <div className={s.logo}>
        <img src="https://cdn.logo.com/hotlink-ok/logo-social.png"></img>
      </div>
      <div className={s.login}>
        {props.isAuth === true ? <span>{props.authdata.data.login}</span> :<NavLink to="/login"> <div>login</div>   </NavLink> }
        
      </div>

    </header>
  )
}

export default Header;