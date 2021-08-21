import s from './users.module.css';
import Preloader from '../common/Preloader/Preloader';
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
                        <FollowUnfollowButton
                            userId={u.id}
                            followingInProgress={followingInProgress}
                            unfollow={unfollow}
                            follow={follow}
                            isFollowed={u.followed} />

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

type PropsButtonType = {
    followingInProgress: Array<Number>
    userId: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    isFollowed: boolean
}


const FollowUnfollowButton: React.FC<PropsButtonType> = ({ followingInProgress, userId, follow, unfollow, isFollowed }) => {
    return (
        <div className={s.followButton}>
            {isFollowed
                ? <button disabled={followingInProgress.some(id => id === userId)} onClick={() => {
                    unfollow(userId)
                }} className={s.button}>Unfollow</button>

                : <button disabled={followingInProgress.some(id => id === userId)} onClick={() => {
                    follow(userId)
                }} className={s.button}>Follow</button>}

        </div>
    )
}


export default Users;