import { ThunkAction } from "redux-thunk";
import usersAPI, { ResultCodesEnum } from "../API/API";
import { updateObjectInArray } from "../utilits/validation/object-helper";
import { getFriends } from "./navBarReduser";
import { InferActionType, RootState } from "./redux-store";

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


type ThunkType = ThunkAction<void, RootState, unknown, ActionType>

const usersReduser = (state = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case 'FOLLOWED':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            }
        case 'UNFOLLOWED':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            }
        case 'SET_USERS': {
            return { ...state, users: [...action.users] }
        }
        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'SET_TOTAL_USERS': {
            return { ...state, totalUsersCount: action.totalUsersCount }
        }
        case 'IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'TOGGLE_IS_PROGRESS': {
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

export type ActionType = InferActionType<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOWED', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOWED', userId } as const),
    setUsers: (users: any) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS', totalUsersCount } as const),
    toggleFetching: (isFetching: boolean) => ({ type: 'IS_FETCHING', isFetching } as const),
    toggleIsProgress: (followingInProgress: boolean, userId: number) => ({ type: 'TOGGLE_IS_PROGRESS', followingInProgress, userId } as const)
}

export const setCurrentPage = (currentPage: number): ThunkType => {
    return (dispatch) => {
        dispatch(actions.setCurrentPage(currentPage))
    }
}

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return (dispatch) => {
        dispatch(actions.toggleFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(actions.toggleFetching(false));
            dispatch(actions.setUsers(data.items));
            dispatch(actions.setTotalUsersCount(data.totalCount));
        })
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsProgress(true, userId))
        const followData = await usersAPI.follow(userId)
        if (followData.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.followSuccess(userId))
        }
        dispatch(actions.toggleIsProgress(false, userId))
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsProgress(true, userId))
        const unfollowData = await usersAPI.unfollow(userId)
        if (unfollowData.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.unfollowSuccess(userId))
        }
        dispatch(actions.toggleIsProgress(false, userId))
    }
}

export default usersReduser;