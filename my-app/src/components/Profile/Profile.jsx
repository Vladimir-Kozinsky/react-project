import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.css';
import Preloader from '../common/Preloader';
import ProfileInfo from './Profileinfo/ProfileInfo';




const Profile = (props) => {
  if (!props.profileInfo) {
    return <Preloader />
  }
  return (
    <div className={s.profilePage}>
      <div className={s.profileImage}>
        <img src="https://img.freepik.com/free-vector/watercolor-pastel-sky-background_23-2148898822.jpg?size=626&ext=jpg&ga=GA1.2.1149860058.1620777600"></img>
      </div>

      <ProfileInfo profileInfo={props.profileInfo} 
      status={props.status} 
      setStatus={props.setStatus} 
      updateStatus={props.updateStatus} />
      <MyPostsContainer />
    </div>
  )
}

export default Profile;