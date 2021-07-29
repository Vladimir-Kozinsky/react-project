import s from './Message.module.css';

const Message = (props) => {
    return (
        <div className={s.messagesItem}>
            <div className={s.avaContainer}>
                <img src={props.avatarPhoto} alt="" />
            </div>
            <div className={s.messageComtainer}>
                {props.message}
            </div>
        </div>
    )
}

export default Message;