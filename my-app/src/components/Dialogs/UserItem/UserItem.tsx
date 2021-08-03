import s from './UserItem.module.css';
import { NavLink } from 'react-router-dom';
import ava from './../../common/navBar/ava.jpg';
import React from 'react';

type PropsType = {
    id: number,
    name: string
}

const UserItem: React.FC<PropsType> = ({id, name}) => {

    return (
        <div className={s.usersItem}>
            <div className={s.avaContainer}>
                <img src={ava} alt="" />
            </div>
            <div className={s.linkContainer} >
                <NavLink to={'/dialogs/' + id} activeClassName={s.active}>{name}</NavLink>
            </div>

        </div>

    )
}

export default UserItem;