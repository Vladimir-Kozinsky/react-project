import s from './DropBoxItem.module.css';
import { NavLink } from "react-router-dom";
import React from 'react';

type PropsType = {
    settingImg: string
    path: string | null
    itemName: string
    logout?: () => void
}

const DropBoxItem: React.FC<PropsType> = ({ settingImg, path, itemName, logout }) => {
    return (
        <div className={s.dropMenuItem}>
            <div className={s.iconContainer} >
                <img src={settingImg} alt="img" />
            </div>
            <div className={s.linkContainer} >
                {path
                    ? <NavLink className={s.boxNavLink} to={path} >{itemName}</NavLink>
                    : <span className={s.boxNavLink} onClick={logout} >{itemName}</span>}
            </div>
        </div>
    )
}

export default DropBoxItem;