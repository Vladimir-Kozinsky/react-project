import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    return (
        <div className={s.profileInfo}>
            <div className={s.profileImage}>
                <img src={props.profileInfo.photos.large} alt="photo" />
            </div>

            <div className={s.personalInfo}>
                <div className={s.userName}>
                    name  
                </div>
                <div className={s.userStatus}>
                    status - {props.profileInfo.aboutMe}
                </div>
                <div className={s.lookingForAJob}>
                true
                </div>
                <div className={s.lookingForAJobDescription}>
                не ищу, а дурачусь
                </div>
                <div className={s.contacts}>
                    contacts
                </div>
                
              
            </div>

        </div>
    )
}

export default ProfileInfo;