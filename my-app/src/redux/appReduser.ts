import { getAuth } from "./authReduser"
import { RootState, InferActionType } from "./redux-store"
import { ThunkAction } from "redux-thunk"

export type initialStateType = {
    initialazed: boolean,
}

let initialState: initialStateType = {
    initialazed: false,
}


const appReduser = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'SET_INITIALAZED':
            return {
                ...state,
                initialazed: true,
            }
        default:
            return state;
    }
}

export type ActionType = InferActionType<typeof actions>

export const actions = {
    initialazedSucces: () => ({ type: 'SET_INITIALAZED' } as const)
}




type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionType>

export const initialazeApp = (): ThunkType => {
    return async (dispatch) => {
        let promise = dispatch(getAuth());
        promise.then(() => {
            dispatch(actions.initialazedSucces())
        })
    }
}

export default appReduser;