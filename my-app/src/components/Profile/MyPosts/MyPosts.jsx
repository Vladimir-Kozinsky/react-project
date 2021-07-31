import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { MaxLengthCreator } from '../../../utilits/validation/validation';
import { Textarea } from '../../common/formsControls/FormsControls';
import Button from '../../common/buttons/Button';


let maxLength = MaxLengthCreator(50);


const MyPosts = (props) => {
    
    //let revMessages = .reverse();
    let posts = props.profilePage.posts.map(p => <Post updateLikesCount={props.updateLikesCount} postId={p.id} message={p.message} likesCounter={p.likesCounter} />)
    
    let addPost = (value) => {
        let postsArr = props.profilePage.posts;
        let postId = postsArr.reduce((acc, curr) => acc.b > curr.b ? acc : curr);

        props.addPost(value.newPostText, postId.id + 1);
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
                    <Button buttonName="Add" />
                </div>

            </div>
        </form>
    )
}



const ProfileReduxForm = reduxForm({ form: 'profilePost' })(ProfileForm)

export default MyPosts;