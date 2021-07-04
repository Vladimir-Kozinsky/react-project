import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';





const MyPosts = (props) => {

    let posts = props.profilePage.posts.map(p => <Post message={p.message} likesCounter={p.likesCounter} />)

   
    let addPost = () => {
        props.addPost();
    }

    let changePostText = (e) => {
        let newText = e.target.value;
        props.changePostText(newText)
    }

    return (
        <div className={s.myPosts}>
            <div>
                <textarea onChange={changePostText} value={props.profilePage.newPostText} ></textarea>
            </div>
            <div>
                <button onClick={addPost} >Add</button>
                <button>Remove</button>
            </div>
            {posts}
        </div>
    )
}

export default MyPosts;