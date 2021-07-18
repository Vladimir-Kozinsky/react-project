import { connect } from 'react-redux';
import { addPostTextActionCreator, updateLikesCountAC } from '../../../redux/profileReduser';
import MyPosts from './MyPosts';


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (value) => {
            dispatch(addPostTextActionCreator(value));
        },
        updateLikesCount: (postId) => {
            dispatch(updateLikesCountAC(postId))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;