import usersAPI from "../API/API";

const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const SET_PROFILE_INFO = 'SET-PROFILEINFO';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCounter: 15 },
        { id: 2, message: 'It is my first post', likesCounter: 27 },
        { id: 3, message: 'It is my first post ad fff', likesCounter: 29 },
    ],
    newPostText: 'It camasutra',
    profileInfo: null
}


const profileReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, { id: 5, message: state.newPostText, likesCounter: 29 }]
            }
        case UPDATE_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText,
            }
        case SET_PROFILE_INFO:
            return {
                ...state,
                profileInfo: action.profileInfo 
            }
        default:
            return state;
    }

}

export const changePostTextActionCreator = (newText) => {
    return { type: UPDATE_POST_TEXT, newText: newText }
}

export const addPostTextActionCreator = () => {
    return {
        type: ADD_POST
    }
}
export const setProfileInfo = (profileInfo) => {
    return { type: SET_PROFILE_INFO, profileInfo }
}
export const getUserInfo = (userId) => {
    return (dispatch) => {
       usersAPI.userInfo(userId)
       .then(response => {
        dispatch(setProfileInfo(response.data));
    })
    }
}

export default profileReduser;