import s from './Dialogs.module.css';
import UserItem from './UserItem/UserItem';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Route } from 'react-router-dom';
import Message from './Message/Message';
import Button from '../common/buttons/Button';


type PropsType = {
    dialogs: Array<dialodsType>,
    isAuth: boolean,
    addMessage: (changeMessageText: string, id: number, messageId: number) => void,
    avatarPhoto: string | null
}

const Dialogs: React.FC<PropsType> = ({ dialogs, isAuth, addMessage, avatarPhoto }) => {

    let dialogsNewArr = dialogs.map((d: { name: string; id: number; }) => <UserItem
        name={d.name}
        id={d.id} />);

    if (!isAuth) return <Redirect to={"/login"} />

    return (
        <div className={s.dialogs}>
            <div className={s.users}>
                {dialogsNewArr}
            </div>

            <div className={s.messagesContainer}>
                <Route path="/dialogs/:id?" render={() => <Messages
                    dialogs={dialogs}
                    addMessage={addMessage}
                    avatarPhoto={avatarPhoto} />} />
            </div>
        </div>
    )
}

type MessagesPropsType = {
    dialogs: Array<dialodsType>,
    addMessage: (changeMessageText: string, id: number, messageId: number) => void,
    avatarPhoto: string | null

}
type dialodsType = {
    id: number,
    name: string,
    messages: any

}
// type messagesType = {
//     id: number,
//     message: string
// }

const Messages: React.FC<MessagesPropsType> = ({ dialogs, addMessage, avatarPhoto }) => {
    let addNewMessage = (values: any) => {
        let messageArr = dialogs[Number(id) - 1].messages;
        let messageId = messageArr.reduce((acc: any, curr: any) => acc.b > curr.b ? acc : curr);
        addMessage(values.changeMessageText, Number(id), messageId.id + 1);
    }

    let params = window.location.pathname;
    let id = params.replace(/\D+/, '');
    if (id === '') {
        id = "1";
    }
    let messages = dialogs[Number(id) - 1].messages.map((m: { id: number; message: string; }) => <Message
        message={m.message}
        avatarPhoto={avatarPhoto} />);
    //let revMessages = messages.reverse();
    return (
        <div>
            <div className={s.messages}>
                {messages}
            </div>
            <div className={s.newMessage}>
                <DialogReduxForm onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

const DialogForm = (props: any) => {

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