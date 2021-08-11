import React from 'react';
import { connect } from 'react-redux';
import { addPostTextActionCreator, updateLikesCountAC } from '../../../redux/profileReduser';
import { RootState } from '../../../redux/redux-store';
import MyPosts from './MyPosts';


type MapStateToPropsType = {
    posts: Array<PostsType>
    avatarPhoto: string
}

type MapDispatchToPropsType = {
    updateLikesCount: (postId: number) => void
    addPost: (newPostText: string, postId: number) => void
}

type PostsType = {
    id: number,
    message: string,
    likesCounter: number
}

type OwnProps = {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps

const MyPostsContainer: React.FC<PropsType> = ({ posts, avatarPhoto, updateLikesCount, addPost }) => {
    return (
        <MyPosts posts={posts}
            addPost={addPost}
            updateLikesCount={updateLikesCount}
            avatarPhoto={avatarPhoto} />
    )
}

let mapStateToProps = (state: RootState) => {
    return {
        posts: state.profilePage.posts,
        avatarPhoto: state.profilePage.profileSmallPhotoUrl
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (value, postId) => {
            dispatch(addPostTextActionCreator(value, postId));
        },
        updateLikesCount: (postId) => {
            dispatch(updateLikesCountAC(postId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsContainer);