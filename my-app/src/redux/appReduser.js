import { getAuth } from "./authReduser";

const SET_INITIALAZED = 'SET-INITIALAZED';


let initialState = {
    initialazed: false,
}


const appReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALAZED:
            return {
                ...state,
                initialazed: true,
            }
        default:
            return state;
    }

}

export const initialazedSucces = () => {
    return { type: SET_INITIALAZED }
}


export const initialazeApp = () => {
    return (dispatch) => {
        let promise = dispatch(getAuth());

        promise.then(() => {
            dispatch(initialazedSucces())
        })

    }
}


export default appReduser;