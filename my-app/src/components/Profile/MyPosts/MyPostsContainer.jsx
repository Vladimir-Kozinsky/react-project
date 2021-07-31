import { connect } from 'react-redux';
import { addPostTextActionCreator, updateLikesCountAC } from '../../../redux/profileReduser';
import MyPosts from './MyPosts';

const MyPostsContainer = (props) => {
    return (
        <MyPosts profilePage={props.profilePage}
        addPost={props.addPost}
        updateLikesCount={props.updateLikesCount}
        avatarPhoto={props.avatarPhoto} />
    )
}

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
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



export default connect(mapStateToProps, mapDispatchToProps)(MyPostsContainer) ;