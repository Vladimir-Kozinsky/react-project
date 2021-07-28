import { connect } from 'react-redux';
import { addPostTextActionCreator, updateLikesCountAC } from '../../../redux/profileReduser';
import MyPosts from './MyPosts';

const MyPostsContainer = (props) => {
    return (
        <MyPosts profilePage={props.profilePage}
        addPost={props.addPost}
        updateLikesCount={props.updateLikesCount} />
    )
}

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



export default connect(mapStateToProps, mapDispatchToProps)(MyPostsContainer) ;