import s from './Dialogs.module.css';
import UserItem from './UserItem/UserItem';
import Message from './Message/Message';
import React from 'react';





const Dialogs = (props) => {

    let dialogs = props.messagesPage.dialogs.map(d => <UserItem name={d.name} id={d.id} />);
    let messages = props.messagesPage.messages.map(m => <Message message={m.message} />);

    let addMessage = () => {
        props.addMessage();
    }

    let changeMessageText = (e) => {
        let newText = e.target.value;
        props.changeMessageText(newText);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.users}>
                {dialogs}
            </div>
            <div className={s.messages}>
                {messages}
                <div className={s.newMessage}>
                    <div>
                        <textarea onChange={changeMessageText} value={props.messagesPage.newMessageText}></textarea>
                    </div>
                    <div>
                        <button onClick={addMessage} >Add</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;