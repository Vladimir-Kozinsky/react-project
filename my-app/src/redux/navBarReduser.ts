import actions from "redux-form/lib/actions"
import { usersAPI } from "./../API/API"

const SET_FRIENDS = "SET_FRIENDS"
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

export type initialStateType = {
    friends: Array<initialStateSideBarType>,
    currentPage: number
}
type initialStateSideBarType = {
    id: number,
    friend: string,
    totalCount: number | null
}
let initialState = {
    friends: [],
    currentPage: 1,
    totalCount: null,
    friendsBlockSize: 10
}

let navBarReduser = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_FRIENDS:
            return {
                ...state,
                friends: [...action.getFriendsData.items],
                totalCount: action.getFriendsData.totalCount

            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            }
    }
    return state;
}

const setFriends = (getFriendsData: any) => {
    return { type: SET_FRIENDS, getFriendsData }
}

type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

const setCurrentPage = (currentPage: number): setCurrentPageType => {
    return { type: SET_CURRENT_PAGE, currentPage }
}

export const getFriends = (isFolowed: boolean, currentPage: number) => {
    return async (dispatch: any, getState: any) => {
        const getFriendsData = await usersAPI.getFriends(isFolowed, currentPage);
        dispatch(setFriends(getFriendsData))
        dispatch(setCurrentPage(currentPage))
    }
}

export default navBarReduser;