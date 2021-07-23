import usersAPI from "../API/API";
import { ProfileAPI } from "../API/API";
import { stopSubmit } from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_PROFILE_INFO = 'SET-PROFILEINFO';
const SET_STATUS = 'SET-STATUS';
const SET_INITIALAZED = 'SET-INITIALAZED';
const SET_LIKE_COUNTER = 'SET-LIKE-COUNTER';
const SAVE_PHOTO_SACCESS = 'SAVE-PHOTO-SACCESS';
const SET_EDIT_MODE = 'SET-EDIT-MODE';



let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCounter: 15 },
        { id: 2, message: 'It is my first post', likesCounter: 27 },
        { id: 3, message: 'It is my first post ad fff', likesCounter: 29 },
    ],
    profileInfo: null,
    status: '',
    editMode: false,
}

const profileReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, { id: 5, message: action.value, likesCounter: 0 }]
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
        case SET_INITIALAZED:
            return {
                ...state,
                initialazed: true
            }
        case SET_LIKE_COUNTER:
            for (let i = 0; i < state.posts.length; i++) {
                if (state.posts[i].id === action.postId) {
                    let count = state.posts[i].likesCounter + 1;
                    return {
                        ...state,
                        ...state.posts[i].likesCounter = count
                    }
                }
            }
        case SAVE_PHOTO_SACCESS:
            return {
                ...state,
                profileInfo: { ...state.profileInfo, photos: action.photos }
            }
        case SET_EDIT_MODE:
            return {
                ...state,
                editMode: action.editMode
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

export const savePhotoSuccess = (photos) => {
    return { type: SAVE_PHOTO_SACCESS, photos }
}
export const setEditMode = (editMode) => {
    return { type: SET_EDIT_MODE, editMode }
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
            if (response.data.data.resultCode === 0) {
                dispatch(setStatus(response.data.data));
            }
        })
    }
}

export const setLikesCounter = (postId) => {
    return { type: SET_LIKE_COUNTER, postId }
}

export const updateLikesCountAC = (postId) => {
    return (dispatch) => {
        dispatch(setLikesCounter(postId))
    }
}
export const savePhoto = (photo) => {
    return (dispatch) => {
        ProfileAPI.savePhoto(photo).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(savePhotoSuccess(response.data.data.photos))
            }
        })
    }
}

export const saveProfileInfo = (formData) => {
    return (dispatch, getState) => {
        const userId = getState().auth.authdata.id
        ProfileAPI.sendProfileInfo(formData).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getUserInfo(userId))
                dispatch(setEditMode(false))
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error ";
                dispatch(stopSubmit('profileInfo', { _error: message }));
                dispatch(setEditMode(true))
            }
        })
    }
}



export default profileReduser;