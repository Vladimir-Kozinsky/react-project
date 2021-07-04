import React from 'react';
import { connect } from 'react-redux';
import { addPostTextActionCreator, changePostTextActionCreator } from '../../../redux/profileReduser';
import MyPosts from './MyPosts';


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostTextActionCreator());
        },
        changePostText: (newText) => {
            dispatch(changePostTextActionCreator(newText));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts)

export default MyPostsContainer;