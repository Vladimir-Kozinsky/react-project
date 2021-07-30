import s from './UserItem.module.css';
import { NavLink } from 'react-router-dom';
import ava from './../../common/navBar/ava.jpg';


const UserItem = (props) => {

    return (
        <div className={s.usersItem}>
            <div className={s.avaContainer}>
                <img src={ava} alt="" />
            </div>
            <div className={s.linkContainer} >
                <NavLink to={'/dialogs/' + props.id} activeClassName={s.active}>{props.name}</NavLink>
            </div>

        </div>

    )
}

export default UserItem;