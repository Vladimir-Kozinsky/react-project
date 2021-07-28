import s from './Post.module.css';
import likeLogo from './../../../common/profile/posts/likeLogo.png';
import avaImg from './../../../common/navBar/ava.jpg';

const Post = (props) => {

    let updateLikesCount = () => {
        props.updateLikesCount(props.postId)
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
                    <span>{props.message}</span>
                </div>
                <div className={s.likes}>

                    <div className={s.likeImg}>
                        <img onClick={updateLikesCount} src={likeLogo} alt="" />
                    </div>
                    <div className={s.likesCount}>{props.likesCounter}</div>

                </div>
            </div>


        </div>
    )

}

export default Post;