const ADD_MESSAGE = 'ADD-MESSAGE';


type initialStateType = {
    dialogs: Array<dialogsType>
}

type dialogsType = {
    id: number,
    name: string,
    messages?: Array<messagesType>
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


const dialogsReduser = (state = initialState, action: any):initialStateType => {
    let id = action.id - 1;
    switch (action.type) {
        case ADD_MESSAGE:
            state.dialogs[id].messages?.push({ id: action.messageId, message: action.values }) //WRONG but I dont know how to resolve
            return {
                ...state,
                dialogs: [...state.dialogs],
            };
        default:
            return state;
    }
}

type addMessageActionType = {
    type: typeof ADD_MESSAGE
    values: string,
    id: number,
    messageId: number,
}

export const addMessage = (values: string, id: number, messageId: number): addMessageActionType => {
    return { type: ADD_MESSAGE, values, id, messageId }
}

export default dialogsReduser;