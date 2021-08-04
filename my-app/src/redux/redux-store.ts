import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import profileReduser from './profileReduser';
import dialogsReduser from './dialogsReduser';
import navBarReduser from './navBarReduser';
import usersReduser from "./usersReduser";
import authReduser from "./authReduser";
import { reducer as formReducer } from 'redux-form';
import appReduser from "./appReduser";

let rootReduser = combineReducers({
    profilePage: profileReduser,
    messagesPage: dialogsReduser,
    navBarPage: navBarReduser,
    usersPage: usersReduser,
    auth: authReduser,
    form: formReducer,
    app: appReduser
});



export type RootState = ReturnType<typeof rootReduser>
export type AppDispatch = typeof store.dispatch

let store = createStore(rootReduser, applyMiddleware(thunkMiddleware));
//window.store = store;

export default store;

