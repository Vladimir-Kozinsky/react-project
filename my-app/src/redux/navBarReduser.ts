import { ThunkAction } from 'redux-thunk';
import { usersAPI } from "./../API/API"
import { RootState } from "./redux-store"

const SET_FRIENDS = "SET_FRIENDS"
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

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

export type InitialState = typeof initialState;

type ActionType = setFriendsType | setCurrentPageType

let navBarReduser = (state = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case SET_FRIENDS:
            return {
                ...state,
                friends: { ...action.setFriendsData },
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            }
        default:
            return state;
    }
}

type setFriendsType = {
    type: typeof SET_FRIENDS,
    setFriendsData: setFriendsDataType
}

type setFriendsDataType = {
    items: Array<itemsType>
    totalCount: number,
    error: string
}

const setFriends = (setFriendsData: setFriendsDataType): setFriendsType => {
    return { type: SET_FRIENDS, setFriendsData }
}

type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

const setCurrentPage = (currentPage: number): setCurrentPageType => {
    return { type: SET_CURRENT_PAGE, currentPage }
}

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionType>

export const getFriends = (isFolowed: boolean, currentPage: number): ThunkType => {
    return async (dispatch, getState) => {
        const setFriendsData = await usersAPI.getFriends(isFolowed, currentPage);
        dispatch(setFriends(setFriendsData))
        dispatch(setCurrentPage(currentPage))
        console.log(getState().navBarPage)
    }
}

export default navBarReduser;