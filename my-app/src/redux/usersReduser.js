import usersAPI from "../API/API";

const FOLLOWED = 'FOLLOWED';
const UNFOLLOWED = 'UNFOLLOWED';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS = 'SET-TOTAL-USERS';
const IS_FETCHING = 'IS-FETCHING';
const TOGGLE_IS_PROGRESS = 'TOGGLE-IS-PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []

}

const usersReduser = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOWED:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }

        case UNFOLLOWED:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return { ...state, users: [...action.users] }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS: {
            return { ...state, totalUsersCount: action.totalUsersCount }
        }
        case IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_PROGRESS: {
            return {
                ...state, followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        }
        default:
            return state;
    }

}

export const followSuccess = (userId) => {
    return { type: FOLLOWED, userId }
}

export const unfollowSuccess = (userId) => {
    return { type: UNFOLLOWED, userId }
}
export const setUsers = (users) => {
    return { type: SET_USERS, users }
}
export const setCurrentPage = (currentPage) => {
    return { type: SET_CURRENT_PAGE, currentPage }
}
export const setTotalUsersCount = (totalUsersCount) => {
    return { type: SET_TOTAL_USERS, totalUsersCount }
}
export const toggleFetching = (isFetching) => {
    return { type: IS_FETCHING, isFetching }
}
export const toggleIsProgress = (followingInProgress, userId) => {
    return { type: TOGGLE_IS_PROGRESS, followingInProgress, userId }
}

export const requestUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        })
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleIsProgress(true, userId))
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleIsProgress(false, userId))
            })
    }

}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleIsProgress(true, userId))
        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleIsProgress(false, userId))
            })
    }

}

export default usersReduser;