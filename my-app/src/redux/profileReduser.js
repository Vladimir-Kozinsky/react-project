import usersAPI from "../API/API";
import { ProfileAPI } from "../API/API";

const ADD_POST = 'ADD-POST';
const SET_PROFILE_INFO = 'SET-PROFILEINFO';
const SET_STATUS = 'SET-STATUS';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCounter: 15 },
        { id: 2, message: 'It is my first post', likesCounter: 27 },
        { id: 3, message: 'It is my first post ad fff', likesCounter: 29 },
    ],
    profileInfo: null,
    status: '',
}

const profileReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, { id: 5, message: action.value, likesCounter: 29 }]
            }
        case SET_PROFILE_INFO:
            return {
                ...state,
                profileInfo: action.profileInfo
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }

}

export const addPostTextActionCreator = (value) => {
    return { type: ADD_POST, value }
}
export const setProfileInfo = (profileInfo) => {
    return { type: SET_PROFILE_INFO, profileInfo }
}
export const getUserInfo = (userId) => {
    return (dispatch) => {
        usersAPI.userInfo(userId)
            .then(response => {
                dispatch(setProfileInfo(response.data));
            })
    }
}

export const setStatus = (status) => {
    return { type: SET_STATUS, status }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        ProfileAPI.getUserStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data));
            })
    }
}
export const updateStatus = (status) => {
    return (dispatch) => {
        ProfileAPI.updateStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(response.data.data));
            }
        })
    }
}

export default profileReduser;