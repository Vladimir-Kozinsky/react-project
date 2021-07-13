import usersAPI from "../API/API";

const GET_DATA_AUTH = 'GET-DATA-AUTH';
const SET_USER_DATA = 'SET-USER-DATA';


let initialState = {
    authdata: {
        id: null,
        email: null,
        login: null,
    },
    isAuth: false,

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

        default:
            return state;
    }

}

export const getDataAC = (authdata) => {
    return { type: GET_DATA_AUTH, authdata }
}


export const getAuth = () => {
    return (dispatch) => {
        usersAPI.getUserAuth().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getDataAC(response.data))
            }
        })
    }
}

export const setDataAC = (id, email, login) => {
    return { type: SET_USER_DATA, payload: { id, email, login } }
}

export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        usersAPI.login(email, password, rememberMe).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuth())
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


export default authReduser;