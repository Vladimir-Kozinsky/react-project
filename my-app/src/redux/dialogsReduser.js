const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';

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
    newMessageText: 'It camasutra'
}

const dialogsReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                newMessageText: '',
                messages: [...state.messages, { id: 4, message: state.newMessageText }]
            }
        case UPDATE_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newText,
            }
        default:
            return state;
    }
}


export const changeMessageText = (newText) => {
    return { type: UPDATE_MESSAGE_TEXT, newText: newText }
}

export const addMessage = () => {
    return {
        type: ADD_MESSAGE
    }
}

export default dialogsReduser;