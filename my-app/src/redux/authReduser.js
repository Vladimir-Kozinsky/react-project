import { stopSubmit } from "redux-form";
import { usersAPI, SecurityAPI } from "../API/API";

const GET_DATA_AUTH = 'GET-DATA-AUTH';
const SET_USER_DATA = 'SET-USER-DATA';
const SET_CAPTCHA_URL = 'SET-CAPTCHA-URL';

let initialState = {
    authdata: {
        id: null,
        email: null,
        login: null,
    },
    isAuth: false,
    captchaUrl: null,
    setCaptchaUrlSucces: false,

}


const authReduser = (state = initialState, action) => {
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

export const getDataAC = (authdata) => {
    return { type: GET_DATA_AUTH, authdata }
}

export const setCaptchaUrl = (captchaUrl) => {
    return { type: SET_CAPTCHA_URL, captchaUrl }
}


export const getAuth = () => {
    return (dispatch) => {
        return usersAPI.getUserAuth().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getDataAC(response.data.data))
            }
        })
    }
}

export const setDataAC = (id, email, login) => {
    return { type: SET_USER_DATA, payload: { id, email, login } }
}

export const login = (email, password, rememberMe, captcha) => {
    return (dispatch) => {

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
export const logout = () => {
    return (dispatch) => {
        usersAPI.logout().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setDataAC(null, null, null))
            }
        })
    }
}


export const getCaptchaUrl = () => {
    return (dispatch) => {
        SecurityAPI.getCaptchaUrl().then(response => {
            dispatch(setCaptchaUrl(response.data.url))
        })
    }
}

export default authReduser;