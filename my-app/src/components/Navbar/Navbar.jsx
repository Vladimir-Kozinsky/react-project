import { NavLink } from 'react-router-dom'
import s from './Navbar.module.css'
import SidebarFriend from './SidebarFriend/SidebarFriend'
import settingImg from './../common/header/settingImg.png'
import profileIcon from './../common/header/profileIcon.png'
import inboxIcon from './../common/header/inboxIcon.png'
import newsIcon from './../common/navBar/newsIcon.png'
import musicIcon from './../common/navBar/musicIcon.png'
import usersIcon from './../common/navBar/usersIcon.png'

const Navbar = (props) => {
  const pageCount = Math.ceil(props.totalCount / props.friendsBlockSize)

  let friends = props.friends.map(f => <SidebarFriend name={f.name} photo={f.photos.small} />)
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
            <NavLink to="/dialogs/" activeClassName={s.active}>Messages</NavLink>
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
        {props.currentPage === 1
          ? <div className={s.prevSlider} >
            <button className={s.prevMuteButton} ></button>
          </div>
          : <div className={s.slider}>
            <button className={s.prevButton} onClick={() => { props.getFriends(true, props.currentPage - 1) }}></button>
          </div>}
        
        {props.currentPage === pageCount
          ? <div className={s.nextSlider} >
            <button className={s.nextMuteButton} ></button>
          </div>
          : <div className={s.nextSlider}>
            <button className={s.nextButton} onClick={() => { props.getFriends(true, props.currentPage + 1) }}></button>
          </div>}
          {friends}
      </div>

      <div className={s.emptyBox}>

      </div>

    </nav>
  )
}




export default Navbar;