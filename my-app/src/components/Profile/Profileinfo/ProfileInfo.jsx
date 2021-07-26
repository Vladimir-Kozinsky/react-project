import s from './ProfileInfo.module.css';
import webLogo from './../../common/profile/contactsLogos/webLogo.jpg';
import facebookLogo from './../../common/profile/contactsLogos/facebookLogo.png';
import instaLogo from './../../common/profile/contactsLogos/instLogo.svg';
import vkLogo from './../../common/profile/contactsLogos/vkLogo.png';
import ProfileStatus from './ProfileStatus/ProfileStatus';

const ProfileInfo = (props) => {

    const onMainPhotoSelect = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={s.profileInfo}>
            <div className={s.profileImage}>
                <img src={props.profileInfo.photos.large} alt="photo" />
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelect} />}
            </div>

            <div className={s.personalInfo}>
                <div className={s.userName}>
                    {props.profileInfo.fullName}
                </div>
                <ProfileStatus status={props.status} setStatus={props.setStatus} updateStatus={props.updateStatus} />
                <div>
                    <div className={s.lookingForAJob}>
                        <div className={s.lookingForAJobDiv}>LookingForAJob:</div>{(props.profileInfo.lookingForAJob) ? <div className={s.lookingForAJobText}>Yes</div> : <div className={s.lookingForAJobText}>No</div>}
                    </div>

                    <div className={s.lookingForAJobDescription}>
                        <div className={s.lookingForAJobDescriptionDiv}>Job Description:</div>{props.profileInfo.lookingForAJobDescription
                            ? props.profileInfo.lookingForAJobDescription
                            : "No filled"}
                    </div>
                    <div className={s.contacts}>
                        <div className={s.contactsText}>Contacts:</div>
                        <div className={s.contactLogoFacebook}><img src={facebookLogo} alt="" /></div>
                        <div className={s.contactLogoVk}><img src={vkLogo} alt="" /></div>
                        <div className={s.contactLogoWeb}><img src={webLogo} alt="" /></div>
                        <div className={s.contactLogoInsta}><img src={instaLogo} alt="" /></div>
                        <div className={s.linkFacebook}>{props.profileInfo.contacts.facebook
                            ? props.profileInfo.contacts.facebook
                            : "No"}</div>

                        <div className={s.linkVk}>{props.profileInfo.contacts.vk
                            ? props.profileInfo.contacts.vk
                            : "No"}</div>

                        <div className={s.linkInsta}>{props.profileInfo.contacts.instagram
                            ? props.profileInfo.contacts.instagram
                            : "No"}</div>

                        <div className={s.linkWeb}>{props.profileInfo.contacts.website
                            ? props.profileInfo.contacts.website
                            : "No"}</div>

                    </div>

                </div>
                {props.isOwner && <button onClick={() => props.setEditMode(true)}>Change info</button>}

            </div>
        </div>
    )
}

export default ProfileInfo;