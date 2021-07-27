import s from './SidebarFriend.module.css';
import ava from './../../common/navBar/ava.jpg';

const SidebarFriend = (props) => {

  return (

    <div className={s.sidebarFriend}>
      <div className={s.friendsImgContainer}>
        <img src={ava} alt="avatar" />
      </div>
      <div className={s.nameContainer}>{props.friend}</div>
    </div>

  )
}

export default SidebarFriend;