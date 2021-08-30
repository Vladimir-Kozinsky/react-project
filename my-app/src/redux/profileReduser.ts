import usersAPI, { ResultCodesEnum } from "../API/API"
import { ProfileAPI } from "../API/API"
import { reset, stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { InferActionType, RootState } from "./redux-store"

export type initialStateType = {
    posts: Array<initialStatePostsType>,
    profileInfo: initialStateProfileInfoType,
    status: string,
    profileSmallPhotoUrl: null | string,
    initialazed: boolean,
}

type initialStatePostsType = {
    id: number,
    message: string,
    likesCounter: number
}

type initialStateProfileInfoType = {
    userId: string | null,
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
    large?: string | undefined
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
            large: ''
        }
    },
    status: '',
    profileSmallPhotoUrl: null,
    initialazed: false,
}

export type ActionType = InferActionType<typeof actions>

const profileReduser = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, { id: action.postId, message: action.value, likesCounter: 0 }]
            }
        case 'SET_PROFILE_INFO':
            return {
                ...state,
                profileInfo: action.profileInfo
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SET_LIKE_COUNTER':
            let id = action.postId - 1;
            state.posts[id].likesCounter = action.count
            return {
                ...state,
                posts: [...state.posts]

            }
        case 'SAVE_PHOTO_SACCESS':
            return {
                ...state,
                profileInfo: { ...state.profileInfo, photos: action.photos }
            }
        case 'SET_PROFILE_PHOTO':
            return {
                ...state,
                profileSmallPhotoUrl: action.smallPhotoUrl
            }
        default:
            return state;
    }
}

export const actions = {
    setPost: (value: string, postId: number) => ({ type: 'ADD_POST', value, postId } as const),
    setProfileInfo: (profileInfo: any) => ({ type: 'SET_PROFILE_INFO', profileInfo } as const),
    savePhotoSuccess: (photos: initialStateProfileInfoPhotosType) => ({ type: 'SAVE_PHOTO_SACCESS', photos } as const),
    setProfolePhoto: (smallPhotoUrl: string) => ({ type: 'SET_PROFILE_PHOTO', smallPhotoUrl } as const),
    setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
    setLikesCounter: (postId: number, count: number) => ({ type: 'SET_LIKE_COUNTER', postId, count } as const),
}

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionType>

export const getUserInfo = (userId: string): ThunkType => {
    return async (dispatch) => {
        const getProfile = await usersAPI.userInfo(userId)
        dispatch(actions.setProfileInfo(getProfile));
    }
}
export const getProfilePhoto = (userId: string): ThunkType => {
    return async (dispatch) => {
        const userPhotoData = await ProfileAPI.userPhoto(userId)
        dispatch(actions.setProfolePhoto(userPhotoData.photos.small))
    }
}

export const getStatus = (userId: string): ThunkType => {
    return async (dispatch) => {
        const getUserStatusData = await ProfileAPI.getUserStatus(userId)
        dispatch(actions.setStatus(getUserStatusData));
    }
}
export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        const updateStatusData = await ProfileAPI.updateStatus(status)
        if (updateStatusData.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setStatus(status));
        }
    }
}



export const updateLikesCount = (postId: number) => {
    return (dispatch: any, getState: any) => {
        for (let i = 0; i < getState().profilePage.posts.length; i++) {
            if (getState().profilePage.posts[i].id === postId) {
                let count = getState().profilePage.posts[i].likesCounter + 1;
                dispatch(actions.setLikesCounter(postId, count))
            }
        }
    }
}

export const savePhoto = (photo: string): ThunkType => {
    return async (dispatch) => {
        const savePhotoData = await ProfileAPI.savePhoto(photo)
        if (savePhotoData.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.savePhotoSuccess(savePhotoData.data.photos))
            console.log(savePhotoData.data.photos)
            dispatch(actions.setProfolePhoto(savePhotoData.data.photos.small)) //update small photo in Header
        }
    }
}

type FormDataValuesType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: {
        facebook: string
        vk: string
        instagram: string
        website: string
    }
}

export const saveProfileInfo = (formData: FormDataValuesType) => {
    return async (dispatch: any, getState: any) => {
        const userId = getState().auth.authdata.id
        const sendProfileInfoData = await ProfileAPI.sendProfileInfo(formData)
        if (sendProfileInfoData.resultCode === ResultCodesEnum.Success) {
            if (userId) {
                dispatch(getUserInfo(userId))
                // dispatch(actions.setEditMode(false))
            }
        } else {
            let message = sendProfileInfoData.messages.length > 0 ? sendProfileInfoData.messages[0] : "Some error ";
            dispatch(stopSubmit('profileInfo', { _error: message }));
            // dispatch(actions.setEditMode(true))
        }
    }
}

export const addPost = (value: string, postId: number) => {
    return (dispatch: any) => {
        dispatch(actions.setPost(value, postId));
        dispatch(reset('profilePost'))
    }
}

export default profileReduser;