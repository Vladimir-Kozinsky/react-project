import s from './UserItem.module.css';
import { NavLink } from 'react-router-dom';
import { Route, withRouter } from 'react-router-dom';

import Messages from '../Messages/Messages';

const UserItem = (props) => {
   
    return (
        <div>
            <div className={s.usersItem}>
                <NavLink to={'/dialogs/' + props.id} activeClassName={s.active}>{props.name}</NavLink>
            </div>
            <div className={s.messages}>
                <Route path="/dialogs/1" render={() => <Messages messagesPage={props.messagesPage} id={props.id} />} />
                {/* {messages} */}
                
            </div>
        </div>

    )
}

export default UserItem;