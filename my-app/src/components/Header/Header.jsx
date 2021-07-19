import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Clock from './clock/Clock';

const Header = (props) => {

  return (
    <header className={s.header}>
      <div className={s.logo}>
        <img src="https://cdn.logo.com/hotlink-ok/logo-social.png"></img>
      </div>
      <div className={s.clock}><Clock /></div>
      
      <div className={s.login}>
        {props.isAuth === true ? <div>
          <span>{props.authdata.login}</span> <button onClick={props.logout} >logout</button>
        </div>  :<NavLink to="/login"> <div>login</div>   </NavLink> }
        
      </div>

    </header>
  )
}

export default Header;