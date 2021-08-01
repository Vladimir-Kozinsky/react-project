import { stopSubmit } from "redux-form"
import { usersAPI, SecurityAPI } from "../API/API"
import { ThunkType } from "../app/hooks"
import { getProfilePhoto } from "./profileReduser"

const GET_DATA_AUTH = 'GET-DATA-AUTH'
const SET_USER_DATA = 'SET-USER-DATA'
const SET_CAPTCHA_URL = 'SET-CAPTCHA-URL'

export type initialStateType = {
    authdata: {
        id: number | null,
        email: string | null,
        login: string | null,
    },
    isAuth: boolean,
    captchaUrl: string | null,
    setCaptchaUrlSucces: boolean,
}

let initialState: initialStateType = {
    authdata: {
        id: null,
        email: null,
        login: null,
    },
    isAuth: false,
    captchaUrl: null,
    setCaptchaUrlSucces: false,

}

type ActionType = getDataACActionType | setCaptchaUrlActionType | setDataACActionType

const authReduser = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case GET_DATA_AUTH:
            return {
                ...state,
                authdata: { ...action.authdata },
                isAuth: true
            }
        case SET_USER_DATA:
            return {
                ...state,
                authdata: { ...action.payload },
                isAuth: false
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    }
}

type getDataACActionType = {
    type: typeof GET_DATA_AUTH,
    authdata: getDataACActionAuthdataType
}

type getDataACActionAuthdataType = {
    id: number | null,
    email: string | null,
    login: string | null,
}

export const getDataAC = (authdata: any): getDataACActionType => {
    return { type: GET_DATA_AUTH, authdata }
}

type setCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    captchaUrl: string | null,
}

export const setCaptchaUrl = (captchaUrl: string | null): setCaptchaUrlActionType => {
    return { type: SET_CAPTCHA_URL, captchaUrl }
}

type setDataACActionPayloadType = {
    id: number | null,
    email: string | null,
    login: string | null,
}

type setDataACActionType = {
    type: typeof SET_USER_DATA,
    payload: setDataACActionPayloadType
}

export const setDataAC = (id: number | null, email: string | null, login: string | null): setDataACActionType => {
    return { type: SET_USER_DATA, payload: { id, email, login } }
}

export const getAuth = (): ThunkType => {
    return async (dispatch) => {
        const response = await usersAPI.getUserAuth();
        if (response.data.resultCode === 0) {
            dispatch(getDataAC(response.data.data));
            dispatch(getProfilePhoto(response.data.data.id));
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return (dispatch, getState) => {
        usersAPI.login(email, password, rememberMe, captcha).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuth())
                dispatch(setCaptchaUrl(null))
            } else {
                if (response.data.resultCode === 10) {
                    dispatch(getCaptchaUrl());
                }
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error ";
                dispatch(stopSubmit('login', { _error: message }));
            }
        })
    }
}

export const logout = (): ThunkType => {
    return (dispatch) => {
        usersAPI.logout().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setDataAC(null, null, null))
            }
        })
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return (dispatch) => {
        SecurityAPI.getCaptchaUrl().then(response => {
            dispatch(setCaptchaUrl(response.data.url))
        })
    }
}

export default authReduser;