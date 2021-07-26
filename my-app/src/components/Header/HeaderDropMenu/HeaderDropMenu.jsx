import s from './HeaderDropMenu.module.css';
import settingImg from './../../common/header/settingImg.png';
import logoutIcon from './../../common/header/logoutIcon.png';
import homeIcon from './../../common/header/homeIcon.png';
import profileIcon from './../../common/header/profileIcon.png';
import inboxIcon from './../../common/header/inboxIcon.png';
import { NavLink } from 'react-router-dom';
import DropBoxItem from './DropBoxItem/DropBoxItem';

const HeaderDropMenu = (props) => {

    return (
        <div className={s.headerDropMenuContainer}>

            {props.isAuth === true
                ? <div className={s.userPhotoContainer}>
                    <div className={s.userPhoto}>{props.avararPhoto
                        ? <img src={props.avararPhoto} alt="" />
                        : <span>Photo</span>}
                    </div>
                    <div className={s.dropMenu}>

                        <DropBoxItem
                            settingImg={profileIcon}
                            path={"/profile"}
                            itemName={props.authdata.login} />
                            <DropBoxItem
                            settingImg={inboxIcon}
                            path={"/dialogs"}
                            itemName={"Inbox"} />
                        <DropBoxItem
                            settingImg={homeIcon}
                            path={"/profile"}
                            itemName={"Home"} />
                        <DropBoxItem
                            settingImg={settingImg}
                            path={"/setting"}
                            itemName={"Setting"} />
                        <DropBoxItem
                            settingImg={logoutIcon}
                            path={null}
                            itemName={"Log out"}
                            onClickCallback={props.logout}
                        />

                    </div>
                </div>

                : <NavLink to="/login"><div>login</div></NavLink>}
        </div>
    )
}


export default HeaderDropMenu;