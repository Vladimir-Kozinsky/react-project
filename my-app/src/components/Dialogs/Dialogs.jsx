import s from './Dialogs.module.css';
import UserItem from './UserItem/UserItem';
import Message from './Message/Message';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';



const Dialogs = (props) => {
    let addMessage = (values) => {
        props.addMessage(values.changeMessageText);
    }

    let dialogs = props.messagesPage.dialogs.map(d => <UserItem
        name={d.name}
        id={d.id}
        messagesPage={props.messagesPage} />);

    if (!props.isAuth) return <Redirect to={"/login"} />
    return (
        <div className={s.dialogs}>
            <div className={s.users}>
                {dialogs}
            </div>
            <DialogReduxForm onSubmit={addMessage} />


        </div>
    )
}

const DialogForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={s.newMessage}>
            <div>
                <Field component="textarea" name="changeMessageText" />
            </div>
            <div>
                <button >Add</button>
            </div>
        </form>

    )
}

const DialogReduxForm = reduxForm({ form: 'dialogMessage' })(DialogForm)

export default Dialogs;