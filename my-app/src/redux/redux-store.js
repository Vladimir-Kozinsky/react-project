import { combineReducers, createStore } from "redux";
import profileReduser from './profileReduser';
import dialogsReduser from './dialogsReduser';
import navBarReduser from './navBarReduser';
import usersReduser from "./usersReduser";

let redusers = combineReducers({
    profilePage: profileReduser,
    messagesPage: dialogsReduser,
    navBarPage: navBarReduser,
    usersPage: usersReduser,
});

let store = createStore(redusers);
window.store = store;

export default store;

