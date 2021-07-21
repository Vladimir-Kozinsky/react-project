import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.css';
import Preloader from '../common/Preloader';
import ProfileInfo from './Profileinfo/ProfileInfo';
import { ProfileInfoReduxForm } from './Profileinfo/ProfileInfoForm';
import { useState } from 'react';




const Profile = (props) => {

  const onSubmit = (formData) => {
    props.saveProfileInfo(formData);
    if (props.updateProfileInfoSucces) {
    }
      
  }

  if (!props.profileInfo) {
    return <Preloader />
  }
  return (
    <div className={s.profilePage}>
      <div className={s.profileImage}>
        <img src="https://img.freepik.com/free-vector/watercolor-pastel-sky-background_23-2148898822.jpg?size=626&ext=jpg&ga=GA1.2.1149860058.1620777600"></img>
      </div>

      {props.editMode
        ? <ProfileInfoReduxForm initialValues={props.profileInfo}
          onSubmit={onSubmit}
          profileInfo={props.profileInfo} />
        : <ProfileInfo profileInfo={props.profileInfo}
          status={props.status}
          setStatus={props.setStatus}
          updateStatus={props.updateStatus}
          isOwner={props.isOwner}
          savePhoto={props.savePhoto}
          saveProfileInfo={props.saveProfileInfo}
          setEditMode={props.setEditMode} />}
      {!props.editMode && <MyPostsContainer />}
    </div>
  )
}

export default Profile;