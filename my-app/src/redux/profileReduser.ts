import usersAPI from "../API/API"
import { ProfileAPI } from "../API/API"
import { stopSubmit } from "redux-form"
import { ThunkType } from "../app/hooks"

const ADD_POST = 'ADD-POST'
const SET_PROFILE_INFO = 'SET-PROFILEINFO'
const SET_STATUS = 'SET-STATUS'
// const SET_INITIALAZED = 'SET-INITIALAZED'
const SET_LIKE_COUNTER = 'SET-LIKE-COUNTER'
const SAVE_PHOTO_SACCESS = 'SAVE-PHOTO-SACCESS'
const SET_EDIT_MODE = 'SET-EDIT-MODE'
const SET_PROFILE_PHOTO = 'SET_PROFILE_PHOTO'

export type initialStateType = {
    posts: Array<initialStatePostsType>,
    profileInfo: initialStateProfileInfoType,
    status: string,
    editMode: boolean,
    profileSmallPhotoUrl: null | string,
    initialazed: boolean,
}

type initialStatePostsType = {
    id: number,
    message: string,
    likesCounter: number
}

type initialStateProfileInfoType = {
    userId: number | null,
    lookingForAJob: boolean | null,
    lookingForAJobDescription: string | null,
    fullName: string | null,
    contacts: initialStateProfileInfocontactsType,
    photos: initialStateProfileInfoPhotosType,
}

type initialStateProfileInfocontactsType = {
    github: string | null,
    vk: string | null,
    facebook: string | null,
    instagram: string | null,
    twitter: string | null,
    website: string | null,
    youtube: string | null,
    mainLink: string | null,
}

type initialStateProfileInfoPhotosType = {
    small: string | null,
    large: string | null
}

let initialState: initialStateType = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCounter: 15 },
        { id: 2, message: 'It is my first post', likesCounter: 27 },
        { id: 3, message: 'It is my first post ad fff', likesCounter: 29 },
    ],
    profileInfo: {
        userId: null,
        lookingForAJob: null,
        lookingForAJobDescription: null,
        fullName: null,
        contacts: {
            github: null,
            vk: null,
            facebook: null,
            instagram: null,
            twitter: null,
            website: null,
            youtube: null,
            mainLink: null,
        },
        photos: {
            small: null,
            large: null
        }
    },
    status: '',
    editMode: false,
    profileSmallPhotoUrl: null,
    initialazed: false,
}

type ActionType = addPostTextActionCreatorActionType | setProfileInfoType
    | savePhotoSuccessType | setEditModeType | setProfolePhotoType | setStatusType | setLikesCounterType

const profileReduser = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, { id: action.postId, message: action.value, likesCounter: 0 }]
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
        // case SET_INITIALAZED:
        //     return {
        //         ...state,
        //         initialazed: true
        //     }
        case SET_LIKE_COUNTER:
            let id = action.postId - 1;
            state.posts[id].likesCounter = action.count
            return {
                ...state,

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
        case SET_PROFILE_PHOTO:
            return {
                ...state,
                profileSmallPhotoUrl: action.smallPhotoUrl
            }


        default:
            return state;
    }

}

type addPostTextActionCreatorActionType = {
    type: typeof ADD_POST,
    value: string,
    postId: number
}
export const addPostTextActionCreator = (value: string, postId: number): addPostTextActionCreatorActionType => {
    return { type: ADD_POST, value, postId }
}
type setProfileInfoType = {
    type: typeof SET_PROFILE_INFO,
    profileInfo: setProfileInfoProfileInfoType
}

type setProfileInfoProfileInfoType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: setProfileInfoProfileInfoContacts,
    photos: setProfileInfoProfileInfoPhotosType,
}

type setProfileInfoProfileInfoContacts = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string,
}

type setProfileInfoProfileInfoPhotosType = {
    small: string,
    large: string
}
export const setProfileInfo = (profileInfo: any): setProfileInfoType => {
    return { type: SET_PROFILE_INFO, profileInfo }
}

type savePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SACCESS,
    photos: savePhotoSuccessPhotosType
}
type savePhotoSuccessPhotosType = {
    small: string,
    large: string
}
export const savePhotoSuccess = (photos: savePhotoSuccessPhotosType): savePhotoSuccessType => {
    return { type: SAVE_PHOTO_SACCESS, photos }
}

type setEditModeType = {
    type: typeof SET_EDIT_MODE,
    editMode: boolean
}
export const setEditMode = (editMode: boolean): setEditModeType => {
    return { type: SET_EDIT_MODE, editMode }
}

type setProfolePhotoType = {
    type: typeof SET_PROFILE_PHOTO,
    smallPhotoUrl: string
}
export const setProfolePhoto = (smallPhotoUrl: string): setProfolePhotoType => {
    return { type: SET_PROFILE_PHOTO, smallPhotoUrl }
}

type setStatusType = {
    type: typeof SET_STATUS,
    status: string
}

export const setStatus = (status: string): setStatusType => {
    return { type: SET_STATUS, status }
}

type setLikesCounterType = {
    type: typeof SET_LIKE_COUNTER,
    postId: number,
    count: number
}

export const setLikesCounter = (postId: number, count: number): setLikesCounterType => {
    return { type: SET_LIKE_COUNTER, postId, count }
}

export const getUserInfo = (userId: number): ThunkType => {
    return async (dispatch) => {
        const getProfile = await usersAPI.userInfo(userId)
        dispatch(setProfileInfo(getProfile));
    }
}
export const getProfilePhoto = (userId: number): ThunkType => {
    return (dispatch) => {
        ProfileAPI.userPhoto(userId)
            .then(response => {
                dispatch(setProfolePhoto(response.data.photos.small))
            })
    }
}

export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        const getUserStatusData = await ProfileAPI.getUserStatus(userId)
        dispatch(setStatus(getUserStatusData));
    }
}
export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        const updateStatusData = await ProfileAPI.updateStatus(status)
        if (updateStatusData.resultCode === 0) {
           // dispatch(setStatus(updateStatusData.data));
        }

    }
}



export const updateLikesCountAC = (postId: number): ThunkType => {
    return (dispatch, getState) => {
        for (let i = 0; i < getState().profilePage.posts.length; i++) {
            if (getState().profilePage.posts[i].id === postId) {
                let count = getState().profilePage.posts[i].likesCounter + 1;
                dispatch(setLikesCounter(postId, count))
            }
        }
    }
}

export const savePhoto = (photo: string): ThunkType => {
    return (dispatch) => {
        ProfileAPI.savePhoto(photo).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(savePhotoSuccess(response.data.data.photos))
                dispatch(setProfolePhoto(response.data.data.photos.small)) //update small photo in Header
            }
        })
    }
}

export const saveProfileInfo = (formData: any): ThunkType => {
    return (dispatch, getState) => {
        const userId = getState().auth.authdata.id
        ProfileAPI.sendProfileInfo(formData).then(response => {
            if (response.data.resultCode === 0) {
                if (userId) {
                    dispatch(getUserInfo(userId))
                    dispatch(setEditMode(false))
                }
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error ";
                dispatch(stopSubmit('profileInfo', { _error: message }));
                dispatch(setEditMode(true))
            }
        })
    }
}

export default profileReduser;