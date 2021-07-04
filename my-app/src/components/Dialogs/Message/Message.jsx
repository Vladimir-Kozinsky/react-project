import s from './Message.module.css';

const Message = (props) => {
    return (
        <div className={s.messagesItem}>{props.message}</div>
    )
}

export default Message;