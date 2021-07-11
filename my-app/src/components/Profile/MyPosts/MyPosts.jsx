import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';





const MyPosts = (props) => {
    let posts = props.profilePage.posts.map(p => <Post message={p.message} likesCounter={p.likesCounter} />)
    let addPost = (value) => {
        props.addPost(value.newPostText);
    }

    return (
        <div className={s.myPosts}>
            <ProfileReduxForm onSubmit={addPost} />
            {posts}
        </div>
    )
}

const ProfileForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field component="textarea" name="newPostText" />
            </div>
            <div>
                <button >Add</button>
                <button>Remove</button>
            </div>

        </form>
    )
}

const ProfileReduxForm = reduxForm({ form: 'profilePost' })(ProfileForm)

export default MyPosts;