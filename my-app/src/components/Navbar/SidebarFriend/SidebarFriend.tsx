import s from './SidebarFriend.module.css';
import ava from './../../common/navBar/ava.jpg';
import React from 'react';
import { NavLink } from 'react-router-dom';

type PropsType = {
  name: string,
  photo: string,
  id: string
}

const SidebarFriend: React.FC<PropsType> = ({ name, photo, id }) => {
  return (
    <div className={s.sidebarFriend}>
      <div className={s.friendsImgContainer}>
        <img src={photo ? photo : ava} alt="avatar" />
      </div>
      <div className={s.nameContainer}>
        <NavLink to={"/profile/" + id} >
          {name}
        </NavLink>
      </div>
    </div>
  )
}

export default SidebarFriend;