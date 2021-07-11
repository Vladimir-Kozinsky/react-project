const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: 'Sasha' },
        { id: 2, name: 'Marina' },
        { id: 3, name: 'Vasilina' },
        { id: 4, name: 'Andrey' },
        { id: 5, name: 'Kristy' },
    ],
    messages: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'I am OK' },
        { id: 3, message: 'Have a nice day' },
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