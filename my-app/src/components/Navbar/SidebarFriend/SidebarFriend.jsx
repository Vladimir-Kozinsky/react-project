import s from './SidebarFriend.module.css';

const SidebarFriend = (props) => {
   
    return (
  
      <div className={s.sidebarFriend}>
            <img src="https://www.atlanticrecords.com/sites/g/files/g2000003466/f/styles/recent_album/public/202102/FINAL_AvaMax_MH%26MH.jpg?itok=wrkotbRf" alt="avatar" />
            <div>{props.friend}</div>
          </div>
  
    )
  }

export default SidebarFriend;