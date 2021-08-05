import s from './SidebarFriend.module.css';
import ava from './../../common/navBar/ava.jpg';
import React from 'react';

type PropsType = {
  name: string,
  photo: string
}

const SidebarFriend: React.FC<PropsType> = ({ name, photo }) => {
  return (
    <div className={s.sidebarFriend}>
      <div className={s.friendsImgContainer}>
        <img src={photo ? photo : ava} alt="avatar" />
      </div>
      <div className={s.nameContainer}>{name}</div>
    </div>

  )
}

export default SidebarFriend;