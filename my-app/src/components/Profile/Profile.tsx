import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.css';
import Preloader from '../common/Preloader';
import ProfileInfo from './Profileinfo/ProfileInfo';
import { ProfileInfoReduxForm } from './Profileinfo/ProfileInfoForm';
import React from 'react';
import UserItem from '../Dialogs/UserItem/UserItem';
import { follow } from '../../redux/usersReduser';

type PropsType = {
  profileInfo: {
    userId: number | null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: {
      github: string | null
      vk: string | null
      facebook: string | null
      instagram: string | null
      twitter: string | null
      website: string | null
      youtube: string | null
      mainLink: string | null
    }
    photos: {
      small: string | null,
      large?: string | undefined
    }
  }
  isAuth: boolean
  status: string
  setStatus: (status: string) => void
  updateStatus: (status: string) => void
  isOwner: any
  savePhoto: (photo: string) => void
  saveProfileInfo: (formData: any) => void
  editMode: boolean
  setEditMode: (editMode: boolean) => void
  users: Array<UserType>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}
type UserType = {
  id: number,
  name: string,
  status: string,
  photos: UserPhotosType,
  followed: boolean
}

type UserPhotosType = {
  small: string,
  large: string
}


const Profile: React.FC<PropsType> = ({ profileInfo, isAuth, status, setStatus, updateStatus,
  isOwner, savePhoto, saveProfileInfo, editMode, setEditMode, users, follow, unfollow }) => {

  let selectedUser = users.find(item => item.id == profileInfo.userId)

  const onSubmit = (formData: any) => {
    saveProfileInfo(formData);
    // if (props.updateProfileInfoSucces) {
    // }
  }
  if (!profileInfo) {
    return <Preloader />
  }
  return (
    <div className={s.profilePage}>
      {editMode
        ? <ProfileInfoReduxForm initialValues={profileInfo} setEditMode={setEditMode}
          onSubmit={onSubmit} />
        : <ProfileInfo isFollowed={selectedUser?.followed} profileInfo={profileInfo}
          status={status}
          setStatus={setStatus}
          updateStatus={updateStatus}
          isOwner={isOwner}
          savePhoto={savePhoto}
          setEditMode={setEditMode}
          follow={follow}
          unfollow={unfollow} />}

      {!editMode && <MyPostsContainer />}
    </div>
  )
}

export default Profile;