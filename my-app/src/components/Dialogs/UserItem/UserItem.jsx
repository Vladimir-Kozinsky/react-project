import s from './UserItem.module.css';
import { NavLink } from 'react-router-dom';

const UserItem = (props) => {
    return (
        <div className={s.usersItem}>
            <NavLink to={'/dialogs/' + props.id} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    )
}

export default UserItem;