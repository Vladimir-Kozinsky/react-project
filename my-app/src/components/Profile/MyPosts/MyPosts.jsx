import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { MaxLengthCreator } from '../../../utilits/validation/validation';
import { Textarea } from '../../common/formsControls/FormsControls';


let maxLength = MaxLengthCreator(50);


const MyPosts = (props) => {
    let posts = props.profilePage.posts.map(p => <Post updateLikesCount={props.updateLikesCount} postId={p.id} message={p.message} likesCounter={p.likesCounter} />)
    let addPost = (value) => {
        props.addPost(value.newPostText);
    }

    return (
        <div className={s.myPosts}>
            <div className={s.myPostContainer}>
                <ProfileReduxForm
                    profilePage={props.profilePage}
                    onSubmit={addPost}
                    avatarPhoto={props.avatarPhoto} />
            </div>

            <div className={s.postsContainer} >
                {posts}
            </div>

        </div>
    )
}

const ProfileForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div className={s.postContainer}>
                <div className={s.avaContainer}>
                    <img src={props.avatarPhoto} alt="avatar" />
                </div>
                <div className={s.postTextArea}>
                    <Field component={Textarea} name="newPostText" validate={[maxLength]} placeholder="Write posts" />
                </div>
                <div className={s.postButton}>
                    <button >Add</button>
                </div>


            </div>



        </form>
    )
}

const ProfileReduxForm = reduxForm({ form: 'profilePost' })(ProfileForm)

export default MyPosts;