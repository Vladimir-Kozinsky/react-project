import { NavLink } from 'react-router-dom'
import s from './Navbar.module.css'
import SidebarFriend from './SidebarFriend/SidebarFriend'
import settingImg from './../common/header/settingImg.png'
import profileIcon from './../common/header/profileIcon.png'
import inboxIcon from './../common/header/inboxIcon.png'
import newsIcon from './../common/navBar/newsIcon.png'
import musicIcon from './../common/navBar/musicIcon.png'
import usersIcon from './../common/navBar/usersIcon.png'
import React from 'react'
import ButtonBox from '../common/buttons/SliderButton/ButtonBox'


type PropsType = {
  friends: {
    items: Array<itemsType>
    totalCount: number,
    error: string
  }
  currentPage: number
  friendsBlockSize: number
  getFriends: (isFollow: boolean, currentPage: number) => void
  isAuth: boolean
}

type itemsType = {
  id: string,
  name: string,
  photos: {
    small: string,
    large: string
  }
  status: string,
  followed: boolean
}

const Navbar: React.FC<PropsType> = ({ friends, currentPage, friendsBlockSize, getFriends, isAuth }) => {
  const pageCount = Math.ceil(friends.totalCount / friendsBlockSize)

  let friendsArr = friends.items.map(f => <SidebarFriend name={f.name} photo={f.photos.small} id={f.id} />)
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
      {isAuth
        ? <div className={s.sidebarFriends}>
          {/* {currentPage === 1
          ? <div className={s.prevSlider} >
            <button className={s.prevMuteButton} ></button>
          </div>
          : <div className={s.slider}>
            <button className={s.prevButton} onClick={() => { getFriends(true, currentPage - 1) }}></button>
          </div>}
        {currentPage === pageCount
          ? <div className={s.nextSliderMute} >
            <button className={s.nextMuteButton} ></button>
          </div>
          : <div className={s.nextSlider}>
            <button className={s.nextButton} onClick={() => { getFriends(true, currentPage + 1) }}></button>
          </div>} */}
          <div className={s.friendsBox} >
            {friendsArr}
          </div>
          <ButtonBox currentPage={currentPage} getFriends={getFriends} />
        </div>
        : ''}
      <div className={s.emptyBox}>
      </div>
    </nav>
  )
}




export default Navbar;