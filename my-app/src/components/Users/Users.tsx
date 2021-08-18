import s from './users.module.css';
import Preloader from '../common/Preloader';
import { NavLink } from 'react-router-dom';
import Paginator from './Paginator/Paginator';
import ava from './../common/navBar/ava.jpg';

type PropsType = {
    isFetching: boolean
    totalUsersCount: number
    pageSize: number
    onPageChanged: (p: number) => void
    currentPage: number
    users: Array<UserType>,
    followingInProgress: Array<Number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}
type UserType = {
    id: number,
    name: string,
    status: string,
    photos: {
        small: string,
        large: string
    }
    followed: boolean
}

const Users: React.FC<PropsType> = ({ isFetching, totalUsersCount, pageSize,
    onPageChanged, currentPage, users, followingInProgress, unfollow, follow }) => {
    return (
        <div className={s.usersPage}>
            {isFetching ? <Preloader /> : null}

            <Paginator totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
                currentPage={currentPage} />
            {
                users.map((u: UserType) => <div className={s.user}>
                    <div className={s.avaBlock}>
                        <div className={s.ava}>
                            <NavLink to={"/profile/" + u.id} >
                                <img src={u.photos.small ? u.photos.small : ava} alt="photo" />
                            </NavLink>
                        </div>
                        <div className={s.followButton}>
                            {u.followed
                                ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                    unfollow(u.id)
                                }} className={s.button}>Unfollow</button>

                                : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                    follow(u.id)
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