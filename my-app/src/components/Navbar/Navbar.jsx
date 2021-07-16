import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import SidebarFriend from './SidebarFriend/SidebarFriend';



const Navbar = (props) => {

  let friends = props.state.navBarPage.sidebar.map(f => <SidebarFriend friend={f.friend} />)
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/profile"  activeClassName={s.active}>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" activeClassName={s.active}>News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/music" activeClassName={s.active}>Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/setting" activeClassName={s.active}>Setting</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
      </div>
      <div className={s.sidebarFriends}>

        {friends}


      </div>
    </nav>
  )
}

export default Navbar;