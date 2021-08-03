import React from 'react';
import s from './Message.module.css';

type PropsType = {
    avatarPhoto: string,
    message: string
}
const Message:React.FC<PropsType> = ({ avatarPhoto, message }) => {
    return (
        <div className={s.messagesItem}>
            <div className={s.avaContainer}>
                <img src={avatarPhoto} alt="" />
            </div>
            <div className={s.messageComtainer}>
                {message}
            </div>
        </div>
    )
}

export default Message;