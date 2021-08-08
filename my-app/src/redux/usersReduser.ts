import { ThunkAction } from "redux-thunk";
import usersAPI, { ResultCodesEnum } from "../API/API";
import { updateObjectInArray } from "../utilits/validation/object-helper";
import { RootState } from "./redux-store";

const FOLLOWED = 'FOLLOWED';
const UNFOLLOWED = 'UNFOLLOWED';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS = 'SET-TOTAL-USERS';
const IS_FETCHING = 'IS-FETCHING';
const TOGGLE_IS_PROGRESS = 'TOGGLE-IS-PROGRESS';

// export type initialStateType = {
// users: UserType,
// pageSize: number,
//     totalUsersCount: number,
//     currentPage: number,
//     isFetching: boolean,
//     followingInProgress: []
// }

type UserType = {
    id: number,
    name: string,
    status: string,
    photos: UserPhotosType,
    followed: boolean
}
type UserPhotosType = {
    small: string,
    large: string
}

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>

}
export type InitialState = typeof initialState;

type ActionType = followSuccessType | unfollowSuccessType | setUsersType | setCurrentPageType
    | setTotalUsersCountType | toggleFetchingType | toggleIsProgressType

type ThunkType = ThunkAction<void, RootState, unknown, ActionType>

const usersReduser = (state = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case FOLLOWED:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            }
        case UNFOLLOWED:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
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

type followSuccessType = {
    type: typeof FOLLOWED,
    userId: number
}
export const followSuccess = (userId: number): followSuccessType => {
    return { type: FOLLOWED, userId }
}
type unfollowSuccessType = {
    type: typeof UNFOLLOWED,
    userId: number
}
export const unfollowSuccess = (userId: number): unfollowSuccessType => {
    return { type: UNFOLLOWED, userId }
}
type setUsersType = {
    type: typeof SET_USERS,
    users: Array<setUsersUserType>
};
type setUsersUserType = {
    id: number,
    name: string,
    status: string,
    photos: setUserPhotosType,
    followed: boolean
}
type setUserPhotosType = {
    small: string,
    large: string
}

export const setUsers = (users: any): setUsersType => {
    return { type: SET_USERS, users }
}

type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => {
    return { type: SET_CURRENT_PAGE, currentPage }
}
type setTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS,
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountType => {
    return { type: SET_TOTAL_USERS, totalUsersCount }
}
type toggleFetchingType = {
    type: typeof IS_FETCHING,
    isFetching: boolean
}
export const toggleFetching = (isFetching: boolean): toggleFetchingType => {
    return { type: IS_FETCHING, isFetching }
}
type toggleIsProgressType = {
    type: typeof TOGGLE_IS_PROGRESS,
    followingInProgress: boolean,
    userId: number
}
export const toggleIsProgress = (followingInProgress: boolean, userId: number): toggleIsProgressType => {
    return { type: TOGGLE_IS_PROGRESS, followingInProgress, userId }
}

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return (dispatch) => {
        dispatch(toggleFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        })
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsProgress(true, userId))
        const followData = await usersAPI.follow(userId)
        if (followData.resultCode === ResultCodesEnum.Success) {
            dispatch(followSuccess(userId))
        }
        dispatch(toggleIsProgress(false, userId))
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsProgress(true, userId))
        const unfollowData = await usersAPI.unfollow(userId)
        if (unfollowData.resultCode === ResultCodesEnum.Success) {
            dispatch(unfollowSuccess(userId))
        }
        dispatch(toggleIsProgress(false, userId))
    }
}

export default usersReduser;