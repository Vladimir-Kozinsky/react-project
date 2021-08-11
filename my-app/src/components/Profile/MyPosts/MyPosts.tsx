import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { MaxLengthCreator } from '../../../utilits/validation/validation';
import { Textarea } from '../../common/formsControls/FormsControls';
import Button from '../../common/buttons/Button';

let maxLength = MaxLengthCreator(50);

type PropsType = {
    updateLikesCount: (postId: number) => void
    posts: Array<PostsType>
    avatarPhoto: string
    addPost: (newPostText: string, postId: number) => void
}

type PostsType = {
    id: number,
    message: string,
    likesCounter: number
}

const MyPosts: React.FC<PropsType> = ({ updateLikesCount, posts, avatarPhoto, addPost }) => {

    //let revMessages = .reverse();
    let postsArr = posts.map(p => <Post updateLikesCount={updateLikesCount} postId={p.id} message={p.message} likesCounter={p.likesCounter} />)

    let addPostText = (value: FormDataValuesType) => {
        let postsArr = posts;
        let postId = postsArr.reduce((acc: any, curr: any) => acc.b > curr.b ? acc : curr);
        addPost(value.newPostText, postId.id + 1);
    }


    return (
        <div className={s.myPosts}>
            <div className={s.myPostContainer}>
                <ProfileReduxForm
                    onSubmit={addPostText}
                    avatarPhoto={avatarPhoto} />
            </div>

            <div className={s.postsContainer} >
                {postsArr}
            </div>

        </div>
    )
}

type ProfileInfoFormOwnProps = {
    avatarPhoto: string
}

type FormDataValuesType = {
    newPostText: string
}

const ProfileForm: React.FC<InjectedFormProps<FormDataValuesType, ProfileInfoFormOwnProps> & ProfileInfoFormOwnProps> = ({ avatarPhoto, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} >
            <div className={s.postContainer}>
                <div className={s.avaContainer}>
                    <img src={avatarPhoto} alt="avatar" />
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



const ProfileReduxForm = reduxForm<FormDataValuesType, ProfileInfoFormOwnProps>({ form: 'profilePost' })(ProfileForm)

export default MyPosts;