import s from './Post.module.css';
import likeLogo from './../../../common/profile/posts/likeLogo.png';
import avaImg from './../../../common/navBar/ava.jpg';
import React from 'react';

type PropsType = {
    updateLikesCount: (postId: number) => void
    postId: number
    message: string
    likesCounter: number
}

const Post: React.FC<PropsType> = ({ updateLikesCount, postId, message, likesCounter }) => {
    let updateLikes = () => {
        updateLikesCount(postId)
    }
    return (
        <div className={s.item}>
            <div className={s.iconContainer}>
                <div className={s.avaContainer}>
                    <img src={avaImg} alt="avatar" />
                </div>
                <div className={s.postUserName}>Name</div>
            </div>
            <div className={s.post} >
                <div className={s.postContainer}>
                    <span>{message}</span>
                </div>
                <div className={s.likes}>
                    <div className={s.likeImg}>
                        <img onClick={updateLikes} src={likeLogo} alt="" />
                    </div>
                    <div className={s.likesCount}>{likesCounter}</div>
                </div>
            </div>
        </div>
    )
}

export default Post;