import s from './HeaderDropMenu.module.css';
import settingImg from './../../common/header/settingImg.png';
import logoutIcon from './../../common/header/logoutIcon.png';
import homeIcon from './../../common/header/homeIcon.png';
import profileIcon from './../../common/header/profileIcon.png';
import inboxIcon from './../../common/header/inboxIcon.png';
import { NavLink } from 'react-router-dom';
import DropBoxItem from './DropBoxItem/DropBoxItem';
import React from 'react';

type PropsType = {
    logout: (userId: string) => void,
    isAuth: boolean,
    avatarPhoto: null | string
    authdata: any
}

const HeaderDropMenu: React.FC<PropsType> = ({ logout, isAuth, authdata, avatarPhoto }) => {

    return (
        <div className={s.headerDropMenuContainer}>

            {isAuth === true
                ? <div className={s.userPhotoContainer}>
                    <div className={s.userPhoto}>{avatarPhoto
                        ? <img src={avatarPhoto} alt="" />
                        : <span>Photo</span>}
                    </div>
                    <div className={s.dropMenu}>
                        <DropBoxItem
                            settingImg={profileIcon}
                            path={"/profile"}
                            itemName={authdata.login}
                            logout={logout}
                            userId={authdata.userId} />
                        <DropBoxItem
                            settingImg={inboxIcon}
                            path={"/dialogs"}
                            itemName={"Inbox"}
                            logout={logout}
                            userId={authdata.userId} />
                        <DropBoxItem
                            settingImg={homeIcon}
                            path={"/profile"}
                            itemName={"Home"}
                            logout={logout}
                            userId={authdata.userId} />
                        <DropBoxItem
                            settingImg={settingImg}
                            path={"/setting"}
                            itemName={"Setting"}
                            logout={logout}
                            userId={authdata.userId} />
                        <DropBoxItem
                            settingImg={logoutIcon}
                            path={null}
                            itemName={"Log out"}
                            logout={logout}
                            userId={authdata.id}
                        />
                    </div>
                </div>
                : <div className={s.login}>
                    <div className={s.loginImgContainer}>
                        <img src={profileIcon} alt="" />
                    </div>
                    <div className={s.loginLinkContainer}>
                        <NavLink to="/login"><div>Login</div></NavLink>
                    </div>
                </div>}
        </div>
    )
}


export default HeaderDropMenu;