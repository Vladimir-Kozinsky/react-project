import dialogsReduser from "./dialogsReduser";
import profileReduser from "./profileReduser";




let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi, how are you?', likesCounter: 15 },
                { id: 2, message: 'It is my first post', likesCounter: 27 },
                { id: 3, message: 'It is my first post ad fff', likesCounter: 29 },
            ],
            newPostText: 'It camasutra'
        },
        messagesPage: {
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
        },
        navBarPage:{
            sidebar: [
            { id: 1, friend: 'Pasha' },
            { id: 2, friend: 'Sasha' },
            { id: 3, friend: 'Marina' },
            { id: 4, friend: 'Lola' },
        ]
        }
        
    },
    _callSubscriber() {
        console.log('sdsdsds');
    },
    getState() {
        return this._state;
    },
    subscriber(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReduser(this._state.profilePage, action);
        this._state.messagesPage = dialogsReduser(this._state.messagesPage, action);
        this._callSubscriber(this._state);
    },




    addMessage(newMessage) {
        let message = { id: 1, message: newMessage };

        this._state.messagesPage.messages.push(message);
        this._callSubscriber(this._state);
    },

}










export default store;