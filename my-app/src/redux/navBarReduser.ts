import actions from "redux-form/lib/actions"
import { usersAPI } from "./../API/API"

const SET_FRIENDS = "SET_FRIENDS"

export type initialStateType = {
    sidebar: Array<initialStateSideBarType>
}
type initialStateSideBarType = {
    id: number,
    friend: string,
}
let initialState = {
    friends: []
}

let navBarReduser = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_FRIENDS:
            return {
                ...state,
                friends: [...action.friends]
            }
    }
    return state;
}

const setFriends = (friends: any) => {
    return { type: SET_FRIENDS, friends }
}

export const getFriends = () => {
    return async (dispatch: any, getState: any) => {
        const getFriendsData = await usersAPI.getFriends(true);
        dispatch(setFriends(getFriendsData.items))
    }
}

export default navBarReduser;