import actions from "redux-form/lib/actions"
import { usersAPI } from "./../API/API"

const SET_FRIENDS = "SET_FRIENDS"
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

export type initialStateType = {
    friends: {
        items: Array<initialStateSideBarType>
        currentPage: number
        totalCount: number
    },
    friendsBlockSize: number

}
type initialStateSideBarType = {
    id: number,
    friend: string,
    photos: {
        small: string,
        large: string
    }

}
let initialState = {
    friends: {
        items: [],
        currentPage: 1,
        totalCount: 0,
    },
    friendsBlockSize: 10
}

type ActionType = setFriendsType | setCurrentPageType

let navBarReduser = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case SET_FRIENDS:
            return {
                ...state,
                ...state.friends,
                items: [...state.]
                totalCount: action.setFriendsData.totalCount

            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                ...state.friends,
                currentPage = action.currentPage,
            }
    }
    return state;
}

type setFriendsType = {
    type: typeof SET_FRIENDS,
    setFriendsData: {
        items: Array<initialStateSideBarType>
        totalCount: number,
        error: string
    }
}

type setFriendsDataType = {
    items: Array<initialStateSideBarType>
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

export const getFriends = (isFolowed: boolean, currentPage: number) => {
    return async (dispatch: any, getState: any) => {
        const getFriendsData = await usersAPI.getFriends(isFolowed, currentPage);
        dispatch(setFriends(getFriendsData))
        dispatch(setCurrentPage(currentPage))
    }
}

export default navBarReduser;