import usersAPI from "../API/API";

const GET_DATA_AUTH = 'GET-DATA-AUTH';


let initialState = {
    authdata: {
        id: null,
        email: null,
        login: null
    },
    isAuth: false
}


const profileReduser = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_AUTH:
            return {
                ...state,
                authdata: {...action.authdata},
                isAuth: true
            }
            
        default:
            return state;
    }

}

export const getDataAC = (authdata) => {
    return { type: GET_DATA_AUTH, authdata }
}


export const getAuth= () => {
  return (dispatch) => {
    usersAPI.getUserAuth().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getDataAC(response.data))
        }
    })
  }
}


export default profileReduser;