import s from './Post.module.css';
import likeLogo from './../../../common/profile/posts/likeLogo.png';
import avaImg from './../../../common/profile/posts/ava.png';

const Post = (props) => {

    let updateLikesCount = () => {
        props.updateLikesCount(props.postId)
    }
    return (
        <div className={s.item}>
            <div className={s.ava}>
                <img src={avaImg} alt="avatar" />
                <div className={s.postUserName}>Name</div>
            </div>

            <div className={s.post}>
                <div className={s.postText}>
                    {props.message}
                </div>
                
            </div>
            <div className={s.likes}>
                <div className={s.likesCount}>{props.likesCounter}</div>
                <div className={s.likeImg}>
                    <img onClick={updateLikesCount} src={likeLogo} alt="" />
                </div>


            </div>

        </div>
    )

}

export default Post;