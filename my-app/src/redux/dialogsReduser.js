const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
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

const dialogsReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { id: 4, message: action.values }]
            }
        default:
            return state;
    }
}

export const addMessage = (values) => {
    return { type: ADD_MESSAGE, values }
}

export default dialogsReduser;