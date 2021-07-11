import { connect } from 'react-redux';
import { addPostTextActionCreator } from '../../../redux/profileReduser';
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
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;