const FOLLOWED = 'FOLLOWED';
const UNFOLLOWED = 'UNFOLLOWED';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS = 'SET-TOTAL-USERS';
const IS_FETCHING = 'IS-FETCHING';

let initialState = {
    users: [  ],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: true,

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
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS: {
            return {...state, totalUsersCount: action.totalUsersCount }
        }
        case IS_FETCHING: {
            return {...state, isFetching: action.isFetching }
        }
        
        default:
            return state;
    }

}

export const follow = (userId) => {
    return { type: FOLLOWED, userId }
}

export const unfollow = (userId) => {
    return { type: UNFOLLOWED, userId }
}
export const setUsers = (users) => {
    return { type: SET_USERS, users }
}
export const setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
}
export const setTotalUsersCount = (totalUsersCount) => {
    return {type: SET_TOTAL_USERS, totalUsersCount}
}
export const toggleFetching = (isFetching) => {
    return {type: IS_FETCHING, isFetching}
}


export default usersReduser;