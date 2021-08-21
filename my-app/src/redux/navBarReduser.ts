import { type } from 'os';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from "./../API/API"
import { InferActionType, RootState } from "./redux-store"

export type InitialState = {
    friends: friendsType,
    currentPage: number,
    friendsBlockSize: number
};

type friendsType = {
    items: Array<itemsType>
    totalCount: number,
    error: string,
}

type itemsType = {
    id: number,
    name: string,
    photos: {
        small: string,
        large: string
    }
    status: string,
    followed: boolean
}

let initialState = {
    friends: {
        items: [] as Array<itemsType>,
        totalCount: 1,
        error: '',
    },
    currentPage: 1,
    friendsBlockSize: 10
}

type ActionType = InferActionType<typeof actions>

let navBarReduser = (state = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case 'SET_FRIENDS':
            return {
                ...state,
                friends: { ...action.setFriendsData },
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage,
            }
        default:
            return state;
    }
}

export const actions = {
    setFriends: (setFriendsData: friendsType) => ({ type: 'SET_FRIENDS', setFriendsData } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
}

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionType>

export const getFriends = (isFolowed: boolean, currentPage: number): ThunkType => {
    return async (dispatch, getState) => {
        const setFriendsData = await usersAPI.getFriends(isFolowed, currentPage);
        dispatch(actions.setFriends(setFriendsData))
        dispatch(actions.setCurrentPage(currentPage))
        console.log(getState().navBarPage)
    }
}

export default navBarReduser;