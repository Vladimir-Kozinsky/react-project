import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import profileReduser from './profileReduser';
import dialogsReduser from './dialogsReduser';
import navBarReduser from './navBarReduser';
import usersReduser from "./usersReduser";
import authReduser from "./authReduser";

let redusers = combineReducers({
    profilePage: profileReduser,
    messagesPage: dialogsReduser,
    navBarPage: navBarReduser,
    usersPage: usersReduser,
    auth: authReduser,
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;

