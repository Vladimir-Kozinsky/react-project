import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.item}>
            <div className={s.ava}>
                <img src="https://www.atlanticrecords.com/sites/g/files/g2000003466/f/styles/recent_album/public/202102/FINAL_AvaMax_MH%26MH.jpg?itok=wrkotbRf" alt="avatar" />
                <div>Name</div>
            </div>
            
            <div className={s.text}>
                {props.message}
            </div>  
            <div className={s.likes}>
                <img src="data:image/jpeg;base64,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" alt="" />
                {props.likesCounter}
            </div>            
                
            </div>
    )

}

export default Post;