import s from './Dialogs.module.css';
import UserItem from './UserItem/UserItem';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Route, withRouter } from 'react-router-dom';
import Message from './Message/Message';
import Button from '../common/buttons/Button';



const Dialogs = (props) => {



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

            <div className={s.messagesContainer}>
                <Route path="/dialogs/:id?" render={() => <Messages messagesPage={props.messagesPage}
                    addMessage={props.addMessage}
                    avatarPhoto={props.avatarPhoto} />} />
            </div>
        </div>
    )
}

const Messages = (props) => {

    let addMessage = (values) => {
        let messageArr = props.messagesPage.dialogs[id - 1].messages;
        let messageId = messageArr.reduce((acc, curr) => acc.b > curr.b ? acc : curr);
        props.addMessage(values.changeMessageText, id, messageId.id + 1);
    }

    let params = window.location.pathname;
    let id = params.replace(/\D+/, '');
    if (id === "") {
        id = 1;
    }
    let messages = props.messagesPage.dialogs[id - 1].messages.map(m => <Message
        id={m.id}
        message={m.message}
        avatarPhoto={props.avatarPhoto} />);
    //let revMessages = messages.reverse();

    return (
        <div>
            <div className={s.messages}>
                {messages}
            </div>
            <div className={s.newMessage}>
                <DialogReduxForm onSubmit={addMessage} />
            </div>
        </div>
    )
}

const DialogForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>

            <div className={s.buttonContainer} >
                <Button buttonName="Send" />
            </div>
            <div className={s.textareaContainer} >
                <Field component="textarea" name="changeMessageText" />
            </div>

        </form>

    )
}

const DialogReduxForm = reduxForm({ form: 'dialogMessage' })(DialogForm)

export default Dialogs;