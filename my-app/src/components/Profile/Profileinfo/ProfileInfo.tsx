import s from './ProfileInfo.module.css';
import webLogo from './../../common/profile/contactsLogos/webLogo.jpg';
import facebookLogo from './../../common/profile/contactsLogos/facebookLogo.png';
import instaLogo from './../../common/profile/contactsLogos/instLogo.svg';
import vkLogo from './../../common/profile/contactsLogos/vkLogo.png';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import React from 'react';
import editImg from './../../common/profile/editImg.png'

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
            small: string | null
            large?: string | undefined
        }
    }
    status: string
    updateStatus: (status: string) => void
    isOwner: any
    savePhoto: (photo: string) => void
    setEditMode: (editMode: boolean) => void
    isFollowed: boolean | undefined
    follow: (userId: string) => void
    unfollow: (userId: string) => void

}

const ProfileInfo: React.FC<PropsType> = ({ profileInfo, status, updateStatus,
    isOwner, savePhoto, setEditMode, isFollowed, follow, unfollow }) => {

    const onMainPhotoSelect = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    return (
        <div className={s.profileInfo}>
            <div className={s.profileImage}>
                <img src={profileInfo.photos.large} alt="photo" />
                {isOwner && <input type={"file"} onChange={onMainPhotoSelect} />}
            </div>

            <div className={s.personalInfo}>
                <div className={s.userName}>
                    {profileInfo.fullName}
                    <div className={s.editBtn}>
                        {isOwner && <img onClick={() => setEditMode(true)} src={editImg} alt="" />}
                    </div>
                    {isOwner
                        ? ''
                        : <div className={s.flwBtnContainer}>
                            {isFollowed ? <button onClick={() => { unfollow(profileInfo.userId ? profileInfo.userId : " ") }} >Unfollow</button>
                                : <button onClick={() => { follow(profileInfo.userId ? profileInfo.userId : " ") }}>Follow</button>}
                        </div>}

                </div>

                <ProfileStatus status={status} updateStatus={updateStatus} />
                <div>
                    <div className={s.lookingForAJob}>
                        <div className={s.lookingForAJobDiv}>LookingForAJob:</div>{(profileInfo.lookingForAJob) ? <div className={s.lookingForAJobText}>Yes</div> : <div className={s.lookingForAJobText}>No</div>}
                    </div>

                    <div className={s.lookingForAJobDescription}>
                        <div className={s.lookingForAJobDescriptionDiv}>Job Description:</div>{profileInfo.lookingForAJobDescription
                            ? profileInfo.lookingForAJobDescription
                            : "No filled"}
                    </div>
                    <div className={s.contacts}>
                        <div className={s.contactsText}>Contacts:</div>
                        <div className={s.contactLogoFacebook}><img src={facebookLogo} alt="" /></div>
                        <div className={s.contactLogoVk}><img src={vkLogo} alt="" /></div>
                        <div className={s.contactLogoWeb}><img src={webLogo} alt="" /></div>
                        <div className={s.contactLogoInsta}><img src={instaLogo} alt="" /></div>
                        <div className={s.linkFacebook}>{profileInfo.contacts.facebook
                            ? profileInfo.contacts.facebook
                            : "No"}</div>

                        <div className={s.linkVk}>{profileInfo.contacts.vk
                            ? profileInfo.contacts.vk
                            : "No"}</div>

                        <div className={s.linkInsta}>{profileInfo.contacts.instagram
                            ? profileInfo.contacts.instagram
                            : "No"}</div>

                        <div className={s.linkWeb}>{profileInfo.contacts.website
                            ? profileInfo.contacts.website
                            : "No"}</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfileInfo;