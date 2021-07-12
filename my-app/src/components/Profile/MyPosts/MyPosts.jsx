import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { RequiredField, MaxLengthCreator } from '../../../utilits/validation/validation';
import { Textarea } from '../../common/formsControls/FormsControls';


let maxLength = MaxLengthCreator(50);


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
            <div className={s.errorBorderRed}>
                <Field component={Textarea} name="newPostText" validate={[RequiredField, maxLength ]} placeholder="Write posts" />
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