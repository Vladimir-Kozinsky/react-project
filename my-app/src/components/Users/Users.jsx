import s from './Users.module.css';
import Preloader from '../common/Preloader';
import { NavLink } from 'react-router-dom';

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            {props.isFetching ? <Preloader /> : null}

            <div>
                {pages.map(p => {
                    return <span onClick={() => { props.onPageChanged(p); }} className={props.currentPage === p && s.selectedPage} > {p} </span>
                })}
            </div>
            {
                props.users.map(u => <div className={s.user}>
                    <div className={s.avaBlock}>
                        <div className={s.ava}>
                            <NavLink to={"/profile/" + u.id} >
                                <img src={u.photos.small} alt="photo" />
                            </NavLink>

                        </div>
                        <div className={s.followButton}>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.follow(u.id)
                                    

                                }} className={s.button}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.unfollow(u.id)

                                }} className={s.button}>Follow</button>}
                        </div>
                    </div>
                    <div className={s.infoBlock}>
                        <div>{u.name}</div>
                        <div>{u.status} </div>
                        <div>{"u.location.country"} {"u.location.city"}</div>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default Users;