import { stopSubmit } from "redux-form"
import { usersAPI, SecurityAPI, ResultCodesEnum } from "../API/API"
import { ThunkType } from "../app/hooks"
import { getFriends } from "./navBarReduser"
import { getProfilePhoto } from "./profileReduser"
import { InferActionType } from "./redux-store"


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

export type ActionType = InferActionType<typeof actions>

const authReduser = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'GET_DATA_AUTH':
            return {
                ...state,
                authdata: { ...action.authdata },
                isAuth: true
            }
        case 'SET_USER_DATA':
            return {
                ...state,
                authdata: { ...action.payload },
                isAuth: false
            }
        case 'SET_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    }
}

export const actions = {
    getDataAC: (authdata: any) => ({ type: 'GET_DATA_AUTH', authdata } as const),
    setCaptchaUrl: (captchaUrl: string | null) => ({ type: 'SET_CAPTCHA_URL', captchaUrl } as const),
    setDataAC: (id: number | null, email: string | null, login: string | null) => ({ type: 'SET_USER_DATA', payload: { id, email, login } } as const)
}

export const getAuth = (): ThunkType => {
    return async (dispatch, getState) => {
        const getUserAuthData = await usersAPI.getUserAuth();
        if (getUserAuthData.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.getDataAC(getUserAuthData.data));
            dispatch(getProfilePhoto(getUserAuthData.data.id))
            dispatch(getFriends(getState().auth.isAuth, getState().navBarPage.currentPage));
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
        const loginData = await usersAPI.login(email, password, rememberMe, captcha)
        console.log(loginData)
    }
}

// export const login = (): ThunkType => {
//     return async (dispatch) => {
//         const loginData = await usersAPI.getAll()
//         console.log(loginData)
//     }
// }

// export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
//     return async (dispatch, getState) => {
//         const loginData = await usersAPI.login(email, password, rememberMe, captcha)
//         if (loginData.resultCode === ResultCodesEnum.Success) {
//             dispatch(getAuth())
//             dispatch(actions.setCaptchaUrl(null))
//         } else {
//             if (loginData.resultCode === ResultCodesEnum.CaptchaRequired) {
//                 dispatch(getCaptchaUrl());
//             }
//             let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error ";
//             dispatch(stopSubmit('login', { _error: message }));
//         }
//     }
// }

export const logout = (): ThunkType => {
    return async (dispatch) => {
        const logoutData = await usersAPI.logout()
        if (logoutData.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setDataAC(null, null, null))
        }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        const getCaptchaUrlData = await SecurityAPI.getCaptchaUrl()
        dispatch(actions.setCaptchaUrl(getCaptchaUrlData.url))
    }
}

export default authReduser;