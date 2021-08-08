import { getAuth } from "./authReduser"
import { RootState } from "./redux-store"
import { ThunkAction } from "redux-thunk"

const SET_INITIALAZED = 'SET-INITIALAZED'

export type initialStateType = {
    initialazed: boolean,
}

let initialState: initialStateType = {
    initialazed: false,
}

type ActionType = initialazedSuccesActionType

const appReduser = (state = initialState, action: initialazedSuccesActionType): initialStateType => {
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

export const initialazedSucces = (): initialazedSuccesActionType => {
    return { type: SET_INITIALAZED }
}

type initialazedSuccesActionType = {
    type: typeof SET_INITIALAZED,
}


type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionType>

export const initialazeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuth());
        promise.then(() => {
            dispatch(initialazedSucces())
        })
    }
}

export default appReduser;