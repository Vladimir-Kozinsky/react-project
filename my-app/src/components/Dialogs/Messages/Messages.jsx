import Message from "../Message/Message";


const Messages = (props) => {
    let someUsers = props.messagesPage.dialogs.filter(item => item.id === props.id);
    let messages = someUsers[0].messages.map(m => <Message message={m.message} />);

    return (
        <div>
            {messages}
        </div>
    )
}

export default Messages;