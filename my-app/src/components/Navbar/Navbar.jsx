import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import SidebarFriend from './SidebarFriend/SidebarFriend';
import settingImg from './../common/header/settingImg.png';
import profileIcon from './../common/header/profileIcon.png';
import inboxIcon from './../common/header/inboxIcon.png';
import newsIcon from './../common/navBar/newsIcon.png';
import musicIcon from './../common/navBar/musicIcon.png';
import usersIcon from './../common/navBar/usersIcon.png';

const Navbar = (props) => {

  let friends = props.state.navBarPage.sidebar.map(f => <SidebarFriend friend={f.friend} />)
  return (
    <nav className={s.navBar}>

      <div className={s.navBarLinks}>
        <div className={s.item}>
          <div className={s.itemImgContainer}>
            <img src={profileIcon} alt="" />
          </div>
          <div className={s.itemLinkContainer}>
            <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.itemImgContainer}>
            <img src={inboxIcon} alt="" />
          </div>
          <div className={s.itemLinkContainer}>
            <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.itemImgContainer}>
            <img src={newsIcon} alt="" />
          </div>
          <div className={s.itemLinkContainer}>
            <NavLink to="/news" activeClassName={s.active}>News</NavLink>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.itemImgContainer}>
            <img src={musicIcon} alt="" />
          </div>
          <div className={s.itemLinkContainer}>
            <NavLink to="/music" activeClassName={s.active}>Music</NavLink>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.itemImgContainer}>
            <img src={settingImg} alt="" />
          </div>
          <div className={s.itemLinkContainer}>
            <NavLink to="/setting" activeClassName={s.active}>Setting</NavLink>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.itemImgContainer}>
            <img src={usersIcon} alt="" />
          </div>
          <div className={s.itemLinkContainer}>
            <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
          </div>
        </div>
      </div>


      <div className={s.sidebarFriends}>
        {friends}
      </div>

      <div className={s.emptyBox}>

      </div>

    </nav>
  )
}

export default Navbar;