import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.css';
import Preloader from '../common/Preloader/Preloader';
import ProfileInfo from './Profileinfo/ProfileInfo';
import { ProfileInfoReduxForm } from './Profileinfo/ProfileInfoForm';
import React, { useEffect, useState } from 'react';
import UserItem from '../Dialogs/UserItem/UserItem';
import { follow } from '../../redux/usersReduser';
import { FormDataValuesType } from './Profileinfo/ProfileInfoForm'
import { prependOnceListener } from 'process';

type PropsType = {
  profileInfo: {
    userId: string | null
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
  status: string
  updateStatus: (status: string) => void
  isOwner: any
  savePhoto: (photo: string, userId: string) => void
  saveProfileInfo: (formData: FormDataValuesType) => void
  users: Array<UserType>
  follow: (userId: string) => void
  unfollow: (userId: string) => void
  userId: string | null
}
type UserType = {
  id: string,
  name: string,
  status: string,
  photos: UserPhotosType,
  followed: boolean
}

type UserPhotosType = {
  small: string,
  large: string
}


const Profile: React.FC<PropsType> = ({ profileInfo, status, updateStatus,
  isOwner, savePhoto, saveProfileInfo, users, follow, unfollow, userId }) => {

  let selectedUser = users.find(item => item.id.toString() == profileInfo.userId)

  let [editMode, setEditMode] = useState(false)

  useEffect(() => {
    setEditMode(false)
  }, [profileInfo])

  const onSubmit = (formData: FormDataValuesType) => {
    saveProfileInfo(formData)
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
          updateStatus={updateStatus}
          isOwner={isOwner}
          savePhoto={savePhoto}
          setEditMode={setEditMode}
          follow={follow}
          unfollow={unfollow}
          userId={userId} />}

      {!editMode && <MyPostsContainer />}
    </div>
  )
}

export default Profile;