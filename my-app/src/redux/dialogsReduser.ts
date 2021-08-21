import { reset } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { InferActionType, RootState } from "./redux-store"

type initialStateType = {
    dialogs: Array<dialogsType>
}

type dialogsType = {
    id: number,
    name: string,
    messages: Array<messagesType>
}

type messagesType = {
    id: number,
    message: string,
}

let initialState: initialStateType = {
    dialogs: [
        {
            id: 1, name: 'Sasha', messages: [
                { id: 1, message: 'Hello' },
                { id: 2, message: 'I am OK' },
                { id: 3, message: 'Have a nice day' },
            ],
        },
        {
            id: 2, name: 'Masha', messages: [
                { id: 1, message: 'Hello22222' },
                { id: 2, message: 'I am OK' },
                { id: 3, message: 'Have a nice day' },
            ],
        },
        {
            id: 3, name: 'Natasha', messages: [
                { id: 1, message: 'Hello' },
                { id: 2, message: 'I am OK33333' },
                { id: 3, message: 'Have a nice day' },
            ],
        },
    ],
}

type ActionType = InferActionType<typeof actions>

const dialogsReduser = (state = initialState, action: ActionType): initialStateType => {
    let id = action.id - 1;
    switch (action.type) {
        case 'ADD_MESSAGE':
            state.dialogs[id].messages?.push({ id: action.messageId, message: action.values }) //WRONG LINE but I dont know how to resolve
            return {
                ...state,
                dialogs: [...state.dialogs],
            };
        default:
            return state;
    }
}

export const actions = {
    setMessage: (values: string, id: number, messageId: number) => ({ type: 'ADD_MESSAGE', values, id, messageId } as const)
}

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionType>

export const addMessage = (values: string, id: number, messageId: number) => {
    return  (dispatch: any) => {
        dispatch(actions.setMessage(values, id, messageId));
        dispatch(reset('dialogMessage'))
    }
}

export default dialogsReduser;