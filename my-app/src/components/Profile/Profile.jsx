import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.css';
import Preloader from '../common/Preloader';
import ProfileInfo from './Profileinfo/ProfileInfo';
import { Redirect } from 'react-router-dom';



const Profile = (props) => {
  if (!props.profileInfo) {
    return <Preloader />
  }
  if (!props.isAuth) return <Redirect to = {"/login"} />
  return (
    <div className={s.profilePage}>
      <div className={s.profileImage}>
        <img src="https://img.freepik.com/free-vector/watercolor-pastel-sky-background_23-2148898822.jpg?size=626&ext=jpg&ga=GA1.2.1149860058.1620777600"></img>
      </div>

      <ProfileInfo profileInfo={props.profileInfo} />
      <MyPostsContainer />
    </div>
  )
}

export default Profile;